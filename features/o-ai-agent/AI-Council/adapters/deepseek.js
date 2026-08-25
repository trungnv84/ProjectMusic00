(() => {
  if (window.__AI_COUNCIL_ADAPTER__) return;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // 🔴 CHỈ dùng cho UI controls (ô nhập, nút gửi) — tab inactive thì fail here đúng
  const isHiddenByStyleStrict = el => {
    if (!el || !el.isConnected) return true;
    const cs = window.getComputedStyle(el);
    if (!cs) return false;
    return cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity || '1') === 0;
  };
  const visible = el => {
    if (!el || !el.isConnected) return false;
    if (el.offsetWidth || el.offsetHeight || el.getClientRects().length) return true;
    return !isHiddenByStyleStrict(el);
  };
  const first = selectors => {
    const candidates = selectors.flatMap(s => [...document.querySelectorAll(s)]);
    return candidates.find(visible) || candidates.find(el => el && el.isConnected && !isHiddenByStyleStrict(el)) || null;
  };

  // 🟢 Dùng cho EXTRACT TEXT — chấp nhận tab inactive
  // Tab inactive: getComputedStyle trả về 0, innerText có thể rỗng → dùng textContent + display check nhẹ
  const isElementGone = el => {
    if (!el || !el.isConnected) return true;
    // Chỉ loại nếu display:none / visibility:hidden (chắc chắn là user/pwa đã hide element)
    // Tránh kiểm tra offset/geometry vì tab inactive luôn return 0
    try {
      const cs = window.getComputedStyle(el);
      if (!cs) return false;
      if (cs.display === 'none' || cs.visibility === 'hidden') return true;
    } catch (_) { /* ignore */ }
    return false;
  };
  const extractText = el => {
    if (!el) return '';
    try {
      const a = (el.innerText || '').trim();
      const b = (el.textContent || '').trim();
      // innerText bị trống nếu tab inactive → dùng textContent dài hơn trong case đó
      if (a.length > b.length * 0.8) return a.replace(/\s+\n/g, '\n').trim();
      return b.replace(/\s+/g, ' ').trim();
    } catch (_) { return (el.textContent || el.innerText || '').trim(); }
  };

  const ASSISTANT_SELECTORS = [
    '.ds-markdown', '[class*="ds-markdown"]', '[class*="markdown-body"]',
    '[class*="prose"]', '[class*="message-content"]', '[class*="response"]',
    '[class*="chat"] [class*="content"]', 'div.prose', 'article'
  ];

  function getAssistantAnswers() {
    const pool = [];
    const seen = new Set();
    for (const sel of ASSISTANT_SELECTORS) {
      for (const el of document.querySelectorAll(sel)) {
        if (isElementGone(el)) continue;
        const t = extractText(el);
        if (!t || t.length < 20 || seen.has(t)) continue;
        seen.add(t);
        pool.push(t);
      }
    }
    return pool;
  }

  function setInputValue(input, prompt) {
    input.focus();
    if ('value' in input) {
      try {
        const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set
          || Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
        if (setter) setter.call(input, prompt);
        else input.value = prompt;
      } catch (_) { input.value = prompt; }
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      input.textContent = prompt;
      input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: prompt }));
    }
  }

  async function run(prompt, timeoutMs) {
    const input = first(['textarea', 'textarea[placeholder]', 'div[contenteditable="true"]']);
    if (!input) return { ok: false, error: 'DeepSeek: không tìm thấy ô nhập.' };

    const beforeArr = getAssistantAnswers();
    const before = beforeArr.length;
    const lastBefore = beforeArr[beforeArr.length - 1] || '';

    setInputValue(input, prompt);
    await sleep(350);

    const send = first([
      'button[aria-label*="Send" i]', 'button[title*="Send" i]',
      'button[type="submit"]', '[class*="send"] button', 'button[class*="send"]'
    ]);
    if (send && !send.disabled) send.click();
    else input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true, ctrlKey: false, shiftKey: false }));

    const deadline = Date.now() + timeoutMs;
    let last = '', stableSince = 0;

    while (Date.now() < deadline) {
      await sleep(1100);
      const arr = getAssistantAnswers();
      const current = arr[arr.length - 1] || '';
      const isNewMsg = arr.length > before || (current && current !== lastBefore && current.length > lastBefore.length * 0.9);
      if (isNewMsg && current.length > 40) {
        if (current === last) {
          if (!stableSince) stableSince = Date.now();
          if (Date.now() - stableSince > 2500) return { ok: true, text: current };
        } else {
          last = current;
          stableSince = 0;
        }
      }
    }

    const fallbackArr = getAssistantAnswers();
    const fb = fallbackArr[fallbackArr.length - 1] || '';
    if (fallbackArr.length > before && fb.length > 120) {
      return { ok: true, text: fb, recovered: true, note: 'accepted at timeout (content already long enough)' };
    }
    if (fb && fb !== lastBefore && fb.length > 80) {
      return { ok: true, text: fb, recovered: true, note: 'accepted at timeout (new content present)' };
    }
    return { ok: false, error: 'DeepSeek: hết thời gian chờ. Hãy thử refresh tab hoặc kiểm tra giao diện DeepSeek.' };
  }

  function peekLastAnswer() {
    try {
      const arr = getAssistantAnswers();
      const text = arr[arr.length - 1] || '';
      if (text.length > 40) return { ok: true, recovered: true, text };
      return { ok: false, recovered: false };
    } catch (_) { return { ok: false, recovered: false }; }
  }

  function peekAllMessages() {
    try {
      const arr = getAssistantAnswers();
      return {
        ok: true,
        provider: 'deepseek',
        candidates: arr
          .map((t, i) => ({ index: i, text: t, length: t.length }))
          .filter(c => c.length > 20)
      };
    } catch (_) { return { ok: false, candidates: [] }; }
  }

  window.__AI_COUNCIL_ADAPTER__ = { run, peekLastAnswer, peekAllMessages };
})();
