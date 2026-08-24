import { getAdapterScript } from './adapter-runtime.js';

export class DebateEngine {
  constructor(orchestrator) {
    this.orchestrator = orchestrator;
  }

  async ask(tab, prompt) {
    const injection = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: [getAdapterScript(tab.provider)]
    });
    void injection;

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (input) => {
        if (!window.__AI_COUNCIL_ADAPTER__) throw new Error('Adapter chưa được nạp.');
        return await window.__AI_COUNCIL_ADAPTER__.run(input.prompt, input.timeoutMs);
      },
      args: [{ prompt, timeoutMs: 120000 }]
    });

    if (!result?.ok) throw new Error(result?.error || `Không đọc được kết quả từ ${tab.provider}`);
    return result.text;
  }
}
