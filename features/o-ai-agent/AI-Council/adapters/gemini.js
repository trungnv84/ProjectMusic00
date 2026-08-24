(() => {
  if (window.__AI_COUNCIL_ADAPTER__) return;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const visible = el => el && !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  const first = selectors => selectors.flatMap(s => [...document.querySelectorAll(s)]).find(visible) || null;
  const allText = selectors => selectors.flatMap(s => [...document.querySelectorAll(s)]).filter(visible).map(x => (x.innerText || '').trim()).filter(Boolean);
  async function run(prompt, timeoutMs) {
    const input = first(['div[contenteditable="true"]', 'textarea[placeholder*="Enter a prompt" i]', 'rich-textarea [contenteditable="true"]']);
    if (!input) return { ok: false, error: 'Gemini: không tìm thấy ô nhập.' };
    const before = allText(['message-content', '.model-response-text', '[class*="model-response"]']).length;
    input.focus();
    input.textContent = prompt;
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: prompt }));
    await sleep(300);
    const send = first(['button[aria-label*="Send" i]', 'button[aria-label*="Submit" i]', 'button[mattooltip*="Send" i]']);
    if (send && !send.disabled) send.click(); else input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
    const deadline = Date.now() + timeoutMs;
    let last = '', stableSince = 0;
    while (Date.now() < deadline) {
      await sleep(1000);
      const arr = allText(['message-content', '.model-response-text', '[class*="model-response"]']);
      const current = arr[arr.length - 1] || '';
      if (arr.length > before && current.length > 20) {
        if (current === last) { if (!stableSince) stableSince = Date.now(); if (Date.now() - stableSince > 1800) return { ok: true, text: current }; }
        else { last = current; stableSince = 0; }
      }
    }
    return { ok: false, error: 'Gemini: hết thời gian chờ.' };
  }
  window.__AI_COUNCIL_ADAPTER__ = { run };
})();
