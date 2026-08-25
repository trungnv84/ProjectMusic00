import { Orchestrator } from './orchestrator.js';
import { scanAllTabsWithProviderInfo } from './tab-controller.js';

const orchestrator = new Orchestrator();
orchestrator.recoverIfStale().catch(() => {});
orchestrator.startAutoResumePolling();

chrome.runtime.onInstalled.addListener(async () => {
  const stored = await chrome.storage.local.get('councilState');
  if (!stored.councilState) {
    await chrome.storage.local.set({ councilState: { status: 'idle', updatedAt: Date.now() } });
  }
  await orchestrator.recoverIfStale();
  orchestrator.startAutoResumePolling();
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
      if (message.type === 'RESUME_COUNCIL') {
        const result = await orchestrator.resume();
        sendResponse({ ok: true, result });
        return;
      }
      if (message.type === 'SKIP_AND_CONTINUE') {
        const result = await orchestrator.skipMissingAndContinue();
        sendResponse({ ok: true, result });
        return;
      }
      if (message.type === 'CAN_RESUME') {
        sendResponse({ ok: true, canResume: await orchestrator.canResume() });
        return;
      }
      if (message.type === 'RECOVER_SNAPSHOT') {
        const snapshots = await orchestrator.scanAllSnapshots();
        sendResponse({ ok: true, snapshots });
        return;
      }
      if (message.type === 'MANUAL_RESUME') {
        const result = await orchestrator.resumeManual(message.payload || {});
        sendResponse({ ok: true, result });
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
