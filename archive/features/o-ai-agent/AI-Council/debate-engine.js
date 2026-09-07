import { getAdapterScript } from './adapter-runtime.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));

export class DebateEngine {
  constructor(orchestrator) {
    this.orchestrator = orchestrator;
    this.savedFocusTabId = null;
  }

  async saveFocus() {
    try {
      const [active] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (active && active.id) this.savedFocusTabId = active.id;
    } catch (_) { void _; }
  }

  async restoreFocus() {
    if (this.savedFocusTabId != null) {
      try {
        await chrome.tabs.update(this.savedFocusTabId, { active: true });
        await sleep(300);
      } catch (_) { void _; }
    }
  }

  async activateTab(tabId) {
    try {
      await chrome.tabs.update(tabId, { active: true });
      await sleep(400);
    } catch (_) { void _; }
  }

  async notifyTab(tab, message, options = {}) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (text, config) => {
          const hostId = '__AI_COUNCIL_STATUS_TOAST__';
          const oldHost = document.getElementById(hostId);
          if (oldHost) oldHost.remove();

          const host = document.createElement('div');
          host.id = hostId;
          host.style.cssText = 'position:fixed;top:18px;right:18px;z-index:2147483647;width:min(360px,calc(100vw - 36px));font-family:system-ui,-apple-system,"Segoe UI",sans-serif;';
          const shadow = host.attachShadow({ mode: 'closed' });
          const tone = config.tone === 'error' ? '#ff6b6b' : config.tone === 'warning' ? '#f2b84b' : '#72a7ff';
          const box = document.createElement('div');
          box.style.cssText = `display:flex;align-items:flex-start;gap:10px;padding:12px 13px;border:1px solid ${tone};border-left:4px solid ${tone};border-radius:9px;background:#101827;color:#f4f7fb;box-shadow:0 8px 28px rgba(0,0,0,.34);font-size:13px;line-height:1.4;`;
          const label = document.createElement('div');
          label.textContent = `AI Council: ${text}`;
          label.style.flex = '1';
          const close = document.createElement('button');
          close.type = 'button';
          close.textContent = '×';
          close.title = 'Đóng thông báo';
          close.style.cssText = 'border:0;background:transparent;color:#b9c4d5;font-size:20px;line-height:16px;padding:0 0 0 4px;cursor:pointer;';
          close.addEventListener('click', () => host.remove());
          box.append(label, close);
          shadow.append(box);
          (document.documentElement || document.body).append(host);
          if (config.autoHideMs > 0) setTimeout(() => host.remove(), config.autoHideMs);
        },
        args: [message, { tone: options.tone || 'info', autoHideMs: options.autoHideMs ?? 0 }]
      });
    } catch (_) { void _; }
  }

  async findDashboardTab() {
    try {
      const url = chrome.runtime.getURL('dashboard.html');
      const tabs = await chrome.tabs.query({ url });
      return tabs && tabs[0] ? tabs[0] : null;
    } catch (_) { return null; }
  }

  async focusDashboard() {
    const tab = await this.findDashboardTab();
    if (tab && tab.id) {
      try {
        await chrome.tabs.update(tab.id, { active: true });
        await sleep(300);
        return true;
      } catch (_) { void _; }
    }
    await this.restoreFocus();
    return false;
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

  // ========== API MỚI: lấy UI state từ adapter ==========
  async getUiState(tab) {
    try {
      await this.ensureAdapter(tab, 1);
      return await this.executeInTab(tab, () => {
        const a = window.__AI_COUNCIL_ADAPTER__;
        if (!a || typeof a.getUiState !== 'function') return null;
        return a.getUiState();
      }, []);
    } catch (_) { return null; }
  }

  async checkPromptSent(tab, prompt) {
    try {
      await this.ensureAdapter(tab, 1);
      return await this.executeInTab(tab, (p) => {
        const a = window.__AI_COUNCIL_ADAPTER__;
        if (!a || typeof a.checkPromptSent !== 'function') return false;
        return a.checkPromptSent(p);
      }, [prompt]);
    } catch (_) { return false; }
  }

  // ========== REFRESH TAB KHI TREO ==========
  async refreshTabAndWait(tab, waitLoadMs = 8000) {
    try {
      // Đăng ký listener 1 lần: chờ tab load xong
      let done = false;
      const onUpdated = (tabId, info) => {
        if (tabId === tab.id && info.status === 'complete') done = true;
      };
      chrome.tabs.onUpdated.addListener(onUpdated);
      try {
        await chrome.tabs.reload(tab.id, { bypassCache: false });
      } catch (_) { /* ignore reload race */ }
      const start = Date.now();
      while (!done && Date.now() - start < waitLoadMs) await sleep(250);
      return done;
    } catch (_) {
      // Fallback: đợi tĩnh
      await sleep(waitLoadMs);
      return true;
    } finally {
      try { chrome.tabs.onUpdated.removeListener(onUpdated); } catch (_) { void _; }
    }
  }

  // ========== HÀM ASK CHÍNH (có auto-refresh, không gửi prompt trùng) ==========
  async ask(tab, prompt) {
    await this.activateTab(tab.id);
    await this.ensureAdapter(tab);
    await this.notifyTab(tab, 'Đang đợi câu trả lời', { autoHideMs: 0 });

    // Bước 0: Kiểm tra nhanh UI state trước khi gửi
    const preUi = await this.getUiState(tab);
    if (preUi && preUi.quotaError) {
      await this.notifyTab(tab, 'Hết token hoặc quota', { tone: 'error' });
      throw new Error(`${tab.provider}: Hết lượt/quota (banner lỗi trên UI).`);
    }

    // Bước 1: Gọi adapter run() — adapter đã tự kiểm tra prompt đã gửi chưa
    let result;
    try {
      result = await this.executeInTab(tab, async (input) => {
        if (!window.__AI_COUNCIL_ADAPTER__) throw new Error('Adapter chưa được nạp.');
        return await window.__AI_COUNCIL_ADAPTER__.run(input.prompt, input.timeoutMs);
      }, [{ prompt, timeoutMs: 120000 }]);
    } catch (execErr) {
      result = { ok: false, error: execErr instanceof Error ? execErr.message : String(execErr) };
    }

    if (result?.ok) {
      await this.notifyTab(tab, 'Đã nhận câu trả lời', { autoHideMs: 2500 });
      if (result.recovered) {
        try { await this.orchestrator.log(`⤴ ${tab.provider}: chấp nhận kết quả khôi phục (${result.note || 'timeout fallback'}).`); } catch (_) { void _; }
      }
      return result.text;
    }

    // ========== FALLBACK: adapter báo lỗi ==========
    const errMsg = result?.error || `Không đọc được kết quả từ ${tab.provider}.`;
    const isQuota = /quota|rate limit|too many request|usage limit|hết lượt|hết token|limit reached|try again later|overloaded|out of messages|upgrade to|you've reached|you have reached|capacity/i.test(errMsg);
    const isStillLoading = /vẫn đang xử lý|tab có thể treo|loading/i.test(errMsg);

    if (isQuota) {
      await this.notifyTab(tab, 'Hết token hoặc quota', { tone: 'error' });
    }

    // Fallback #1: re-activate tab (trường hợp user/tab switch làm innerText rỗng)
    try { await this.activateTab(tab.id); } catch (_) { void _; }
    await sleep(800);
    try { await this.ensureAdapter(tab, 1); } catch (_) { void _; }
    const retryVisible = await this.executeInTab(tab, async () => {
      if (!window.__AI_COUNCIL_ADAPTER__ || typeof window.__AI_COUNCIL_ADAPTER__.peekLastAnswer !== 'function') return null;
      return window.__AI_COUNCIL_ADAPTER__.peekLastAnswer();
    }, []).catch(() => null);
    if (retryVisible && retryVisible.ok && retryVisible.recovered && retryVisible.text && retryVisible.text.length > 120) {
      await this.notifyTab(tab, 'Đã khôi phục câu trả lời', { autoHideMs: 2500 });
      try {
        await this.orchestrator.log(`⤴ ${tab.provider}: adapter báo lỗi (${errMsg}), RE-ACTIVATE tab rồi lấy được bài cuối (${retryVisible.text.length} chữ). Dùng kết quả này.`);
      } catch (_) { void _; }
      return retryVisible.text;
    }

    // Fallback #2: AUTO-REFRESH TAB KHI TREO (chỉ khi KHÔNG phải quota, và đang loading hoặc adapter đã xác nhận prompt đã gửi)
    if (!isQuota) {
      const sentBeforeRefresh = await this.checkPromptSent(tab, prompt);
      const shouldRefresh = isStillLoading || sentBeforeRefresh === true || sentBeforeRefresh === 'in_input';
      if (shouldRefresh) {
        await this.notifyTab(
          tab,
          isStillLoading ? 'Tab bị treo. (reload 3s)' : 'Không đọc được câu trả lời. (reload 10s)',
          { tone: 'warning' }
        );
        try {
          await this.orchestrator.log(`🔄 ${tab.provider}: đang treo/loading (${errMsg}). Auto-refresh tab để thử khôi phục (KHÔNG gửi lại prompt).`);
        } catch (_) { void _; }

        await sleep(isStillLoading ? 3000 : 10000);
        await this.notifyTab(tab, 'Đang reload tab...', { autoHideMs: 0 });
        await this.refreshTabAndWait(tab, 10000);
        await sleep(1500); // chờ render giao diện sau refresh
        await this.activateTab(tab.id);
        try { await this.ensureAdapter(tab, 2); } catch (_) { void _; }

        // Sau refresh: KHÔNG BAO GIỜ gửi lại prompt (nếu đã gửi rồi). Chỉ thử peekLastAnswer, hoặc nếu UI chưa có thì cho chạy adapter 1 lần nữa (nếu prompt trong chat thì adapter tự skip send)
        const afterRefreshPeek = await this.tryRecoverLastResponse(tab);
        if (afterRefreshPeek && afterRefreshPeek.recovered && afterRefreshPeek.text && afterRefreshPeek.text.length > 120) {
          await this.notifyTab(tab, 'Đã khôi phục câu trả lời sau reload', { autoHideMs: 2500 });
          try {
            await this.orchestrator.log(`⤴ ${tab.provider}: sau auto-refresh, lấy được bài cuối (${afterRefreshPeek.text.length} chữ). Dùng kết quả này.`);
          } catch (_) { void _; }
          return afterRefreshPeek.text;
        }
        // Nếu chưa lấy được → cho adapter chạy lại (nó sẽ tự nhận biết prompt đã gửi rồi, KHÔNG gửi lại)
        try {
          const rerun = await this.executeInTab(tab, async (input) => {
            if (!window.__AI_COUNCIL_ADAPTER__) throw new Error('Adapter chưa được nạp sau refresh.');
            return await window.__AI_COUNCIL_ADAPTER__.run(input.prompt, input.timeoutMs);
          }, [{ prompt, timeoutMs: 60000 }]); // timeout ngắn hơn vì chỉ đợi, không gửi
          if (rerun?.ok) {
            await this.notifyTab(tab, 'Đã nhận câu trả lời sau reload', { autoHideMs: 2500 });
            try {
              await this.orchestrator.log(`⤴ ${tab.provider}: sau auto-refresh + adapter rerun (skip send), có kết quả (${rerun.text.length} chữ).`);
            } catch (_) { void _; }
            return rerun.text;
          }
        } catch (_) { void _; }
      }
    }

    // Fallback #3: tryRecoverLastResponse (cơ chế cũ, vẫn chạy)
    const recovery = await this.tryRecoverLastResponse(tab);
    if (recovery && recovery.recovered && recovery.text && recovery.text.length > 80) {
      await this.notifyTab(tab, 'Đã khôi phục câu trả lời', { autoHideMs: 2500 });
      try {
        await this.orchestrator.log(`⤴ ${tab.provider}: adapter báo lỗi (${errMsg}), đã khôi phục được bài cuối từ tab (${recovery.text.length} chữ). Dùng kết quả này.`);
      } catch (_) { void _; }
      return recovery.text;
    }

    // Cuối cùng: quăng lỗi rõ ràng
    if (isQuota) {
      throw new Error(`${tab.provider}: Hết lượt/quota free — đợi reset hoặc nâng cấp rồi nhấn Resume (KHÔNG gửi lại).`);
    }
    await this.notifyTab(tab, 'Không đọc được câu trả lời', { tone: 'error' });
    throw new Error(result?.error || errMsg);
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
