import { PROVIDER_CONFIG, PROVIDER_ORDER, detectProvider } from './providers.js';

export async function scanProviderTabs() {
  const tabs = await chrome.tabs.query({});
  const found = {};
  for (const tab of tabs) {
    if (!tab.id || !tab.url) continue;
    const provider = detectProvider(tab.url);
    if (provider && !found[provider]) {
      found[provider] = { id: tab.id, title: tab.title || '', url: tab.url, provider };
    }
  }
  return PROVIDER_ORDER.filter(p => found[p]).map(p => found[p]);
}

export async function scanAllTabsWithProviderInfo() {
  const tabs = await chrome.tabs.query({});
  return tabs
    .filter((tab) => tab.id && tab.url)
    .map((tab) => ({
      id: tab.id,
      windowId: tab.windowId,
      title: tab.title || '',
      url: tab.url,
      provider: detectProvider(tab.url),
      active: Boolean(tab.active)
    }));
}
