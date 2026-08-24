(() => {
  if (window.__AI_COUNCIL_ADAPTER__) return;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const isHiddenByStyle = el => {
    if (!el || !el.isConnected) return true;
    const cs = window.getComputedStyle(el);
    if (!cs) return false;
    return cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity || '1') === 0;
  };
  const visible = el => {
    if (!el || !el.isConnected) return false;
    if (el.offsetWidth || el.offsetHeight || el.getClientRects().length) return true;
    return !isHiddenByStyle(el);
  };
  const first = selectors => {
    const candidates = selectors.flatMap(s => [...document.querySelectorAll(s)]);
    return candidates.find(visible) || candidates.find(el => el && el.isConnected && !isHiddenByStyle(el)) || null;
  };
  const allText = selectors => selectors
    .flatMap(s => [...document.querySelectorAll(s)])
    .filter(el => el && el.isConnected && !isHiddenByStyle(el))
    .map(x => (x.innerText || '').trim())
    .filter(Boolean);
  async function run(prompt, timeoutMs) {
    const input = first(['div[contenteditable="true"]', 'textarea[placeholder*="message" i]', 'textarea[placeholder*="reply" i]']);
    if (!input) return { ok: false, error: 'Claude: không tìm thấy ô nhập.' };
    const before = allText(['[data-testid*="message"]', '[data-is-streaming]']).length;
    input.focus();
    if ('value' in input) {
      input.value = prompt;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      input.textContent = prompt;
      input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: prompt }));
    }
    await sleep(300);
    const send = first(['button[aria-label*="Send" i]', 'button[title*="Send" i]', 'button[type="submit"]']);
    if (send && !send.disabled) send.click(); else input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
    const deadline = Date.now() + timeoutMs;
    let last = '', stableSince = 0;
    while (Date.now() < deadline) {
      await sleep(1000);
      const arr = allText(['[data-testid*="message"]', '[data-is-streaming]', 'div.prose']);
      const current = arr[arr.length - 1] || '';
      if (arr.length > before && current.length > 20) {
        if (current === last) { if (!stableSince) stableSince = Date.now(); if (Date.now() - stableSince > 1800) return { ok: true, text: current }; }
        else { last = current; stableSince = 0; }
      }
    }
    return { ok: false, error: 'Claude: hết thời gian chờ.' };
  }
  function peekLastAnswer() {
    try {
      const arr = allText(['[data-testid*="message"]', '[data-is-streaming]', 'div.prose']);
      const text = arr[arr.length - 1] || '';
      if (text.length > 40) return { ok: true, recovered: true, text };
      return { ok: false, recovered: false };
    } catch (_) { return { ok: false, recovered: false }; }
  }
  function peekAllMessages() {
    try {
      const arr = allText(['[data-testid*="message"]', '[data-is-streaming]', 'div.prose']);
      return {
        ok: true,
        provider: 'claude',
        candidates: arr
          .map((t, i) => ({ index: i, text: t, length: t.length }))
          .filter(c => c.length > 20)
      };
    } catch (_) { return { ok: false, candidates: [] }; }
  }
  window.__AI_COUNCIL_ADAPTER__ = { run, peekLastAnswer, peekAllMessages };
})();
