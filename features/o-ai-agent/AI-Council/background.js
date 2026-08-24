import { Orchestrator } from './orchestrator.js';
import { scanAllTabsWithProviderInfo } from './tab-controller.js';

const orchestrator = new Orchestrator();

async function agentIngest(payload) {
  const entry = { sessionId: '8a40bc', timestamp: Date.now(), ...payload };
  try {
    const stored = await chrome.storage.local.get('debug8a40bc');
    const arr = Array.isArray(stored.debug8a40bc) ? stored.debug8a40bc : [];
    arr.push(entry);
    await chrome.storage.local.set({ debug8a40bc: arr.slice(-50) });
  } catch (_) { void _; }
  try {
    await fetch('http://127.0.0.1:7413/ingest/10d9d826-fa96-48d2-9291-4b72f24b3687', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '8a40bc' }, body: JSON.stringify(entry), keepalive: true });
  } catch (_) { void _; }
}

chrome.runtime.onInstalled.addListener(async (details) => {
  const stored = await chrome.storage.local.get('councilState');
  // #region agent log
  await agentIngest({ hypothesisId: 'G', runId: 'post-fix', location: 'background.js:onInstalled', message: 'onInstalled keep-or-init', data: { reason: details?.reason, hadState: Boolean(stored.councilState), prevStatus: stored.councilState?.status || null } });
  // #endregion
  if (!stored.councilState) {
    await chrome.storage.local.set({ councilState: { status: 'idle', updatedAt: Date.now() } });
  }
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
      if (message.type === 'DEBUG_INGEST') {
        await agentIngest(message.payload || {});
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
