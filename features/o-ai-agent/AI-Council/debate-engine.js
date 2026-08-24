import { getAdapterScript } from './adapter-runtime.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));

export class DebateEngine {
  constructor(orchestrator) {
    this.orchestrator = orchestrator;
  }

  async activateTab(tabId) {
    try {
      await chrome.tabs.update(tabId, { active: true });
      await sleep(400);
    } catch (_) { void _; }
  }

  async ensureAdapter(tab, maxRetries = 3) {
    const script = getAdapterScript(tab.provider);
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [script]
      });
      if (results && results[0] && results[0].error) {
        if (attempt === maxRetries - 1) {
          throw new Error(`Adapter ${tab.provider} lỗi nạp: ${results[0].error.message || String(results[0].error)}`);
        }
        await sleep(300);
        continue;
      }
      let ready = false;
      for (let i = 0; i < 10; i++) {
        const [{ result }] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => Boolean(window.__AI_COUNCIL_ADAPTER__)
        });
        if (result) { ready = true; break; }
        await sleep(100);
      }
      if (ready) return;
      if (attempt < maxRetries - 1) await sleep(300);
    }
    throw new Error(`Adapter ${tab.provider} không sẵn sàng sau khi nạp.`);
  }

  async executeInTab(tab, func, args) {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func,
      args
    });
    const first = results && results[0];
    if (!first) throw new Error(`Không thể thực thi script trong tab ${tab.provider}.`);
    if (first.error) {
      const msg = first.error instanceof Error ? first.error.message : String(first.error);
      throw new Error(msg);
    }
    return first.result;
  }

  async ask(tab, prompt) {
    await this.activateTab(tab.id);
    await this.ensureAdapter(tab);

    const result = await this.executeInTab(tab, async (input) => {
      if (!window.__AI_COUNCIL_ADAPTER__) throw new Error('Adapter chưa được nạp.');
      return await window.__AI_COUNCIL_ADAPTER__.run(input.prompt, input.timeoutMs);
    }, [{ prompt, timeoutMs: 120000 }]);

    if (!result?.ok) throw new Error(result?.error || `Không đọc được kết quả từ ${tab.provider}`);
    return result.text;
  }

  async tryRecoverLastResponse(tab) {
    try {
      await this.activateTab(tab.id);
      await this.ensureAdapter(tab);
      const result = await this.executeInTab(tab, () => {
        const a = window.__AI_COUNCIL_ADAPTER__;
        if (!a || typeof a.peekLastAnswer !== 'function') return { ok: false, recovered: false };
        return a.peekLastAnswer();
      }, []);
      if (result && result.ok && result.recovered && result.text && result.text.length > 40) {
        return { recovered: true, text: result.text };
      }
      return { recovered: false };
    } catch (_) {
      return { recovered: false };
    }
  }

  async recoverSnapshot(tab) {
    try {
      await this.activateTab(tab.id);
      await this.ensureAdapter(tab);
      const result = await this.executeInTab(tab, () => {
        const a = window.__AI_COUNCIL_ADAPTER__;
        if (!a || typeof a.peekAllMessages !== 'function') return { ok: false, candidates: [] };
        return a.peekAllMessages();
      }, []);
      return {
        ok: Boolean(result && result.ok),
        provider: tab.provider,
        tabId: tab.id,
        candidates: (result && result.candidates) || []
      };
    } catch (err) {
      return {
        ok: false,
        provider: tab.provider,
        tabId: tab.id,
        candidates: [],
        error: err instanceof Error ? err.message : String(err)
      };
    }
  }
}
