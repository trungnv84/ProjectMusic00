import { Orchestrator } from './orchestrator.js';
import { scanAllTabsWithProviderInfo } from './tab-controller.js';

const orchestrator = new Orchestrator();

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({ councilState: { status: 'idle', updatedAt: Date.now() } });
});

chrome.action.onClicked.addListener(async () => {
  await chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    try {
      if (message.type === 'SCAN_TABS') {
        sendResponse({ ok: true, tabs: await scanAllTabsWithProviderInfo() });
        return;
      }
      if (message.type === 'START_COUNCIL') {
        const result = await orchestrator.start(message.question, message.mode || 'balanced');
        sendResponse({ ok: true, result });
        return;
      }
      if (message.type === 'STOP_COUNCIL') {
        orchestrator.stop();
        sendResponse({ ok: true });
        return;
      }
      if (message.type === 'GET_STATE') {
        sendResponse({ ok: true, state: await orchestrator.getState() });
        return;
      }
      sendResponse({ ok: false, error: 'Unknown message type' });
    } catch (error) {
      sendResponse({ ok: false, error: error instanceof Error ? error.message : String(error) });
    }
  })();
  return true;
});
