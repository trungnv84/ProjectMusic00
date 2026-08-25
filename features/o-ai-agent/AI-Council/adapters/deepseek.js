(() => {
  if (window.__AI_COUNCIL_ADAPTER__) return;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

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

  const isElementGone = el => {
    if (!el || !el.isConnected) return true;
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
      if (a.length > b.length * 0.8) return a.replace(/\s+\n/g, '\n').trim();
      return b.replace(/\s+/g, ' ').trim();
    } catch (_) { return (el.textContent || el.innerText || '').trim(); }
  };

  function normalizeForCompare(s) {
    return String(s || '').replace(/\s+/g, ' ').replace(/[\u200B-\u200D\uFEFF]/g, '').trim().toLowerCase();
  }

  function textFuzzyMatch(needle, haystack) {
    const n = normalizeForCompare(needle);
    const h = normalizeForCompare(haystack);
    if (!n || !h) return false;
    if (n === h) return true;
    if (n.length > 30 && h.length > n.length * 0.6) {
      let common = 0;
      const uniq = [...new Set(n.split(''))].filter(c => c.trim());
      for (const c of uniq) if (h.includes(c)) common++;
      if (uniq.length > 0 && common / uniq.length > 0.75) return true;
      if (h.includes(n.slice(0, Math.min(60, n.length)))) return true;
    }
    return false;
  }

  // ========== DeepSeek-SPECIFIC ROW SELECTORS ==========
  const USER_ROW_SELECTORS = [
    '[class*="user-message"]', '[class*="UserMessage"]',
    '[class*="message-user"]', '[class*="bubble-user"]',
    '[class*="chat"][class*="user" i]',
    '[data-testid*="user-message"]'
  ];
  const ASSISTANT_ROW_SELECTORS = [
    '.ds-markdown', '[class*="ds-markdown"]',
    '[class*="assistant-message"]', '[class*="bot-message"]',
    '[class*="ai-response"]', '[class*="message-assistant"]',
    '[class*="markdown-body"]', '[class*="chat"][class*="assistant" i]',
    '[class*="generating"]', '[class*="streaming"]'
  ];
  const CONTENT_SELECTORS = [
    'div.prose', 'div.markdown', 'article',
    '[class*="message-content"]', '[class*="response-content"]',
    '[class*="message-body"]', '[class*="markdown-body"]'
  ];
  const USER_CONTENT_SELECTORS = [
    '[class*="message-content"]', '[class*="response-content"]',
    '[class*="message-body"]', 'div.prose', 'div.markdown',
    '[class*="user-bubble"]', '[class*="user-content"]'
  ];

  function querySortedByDom(selectors) {
    const results = [];
    const seenEls = new Set();
    for (const sel of selectors) {
      for (const el of document.querySelectorAll(sel)) {
        if (seenEls.has(el)) continue;
        seenEls.add(el);
        if (isElementGone(el)) continue;
        results.push(el);
      }
    }
    results.sort((a, b) => {
      if (a === b) return 0;
      const pos = a.compareDocumentPosition(b);
      if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });
    return results;
  }

  function extractFirstValidText(el, contentSelectors) {
    if (!el) return '';
    for (const sel of contentSelectors) {
      const inner = el.querySelector(sel);
      if (inner && !isElementGone(inner)) {
        const t = extractText(inner);
        if (t.length >= 10) return t;
      }
    }
    const fallback = extractText(el);
    if (fallback.length >= 10) return fallback;
    return '';
  }

  function getConversationContext(promptNeedle) {
    const userRows = querySortedByDom(USER_ROW_SELECTORS);
    const assistantRows = querySortedByDom(ASSISTANT_ROW_SELECTORS);
    const needleN = normalizeForCompare(promptNeedle);
    let matchedUserIdx = -1;
    let matchedUserEl = null;
    for (let i = 0; i < userRows.length; i++) {
      const t = extractFirstValidText(userRows[i], USER_CONTENT_SELECTORS);
      if (needleN && textFuzzyMatch(needleN, t)) {
        matchedUserIdx = i;
        matchedUserEl = userRows[i];
        break;
      }
    }
    const allAssistantTexts = [];
    const seenTexts = new Set();
    for (const row of assistantRows) {
      const t = extractFirstValidText(row, CONTENT_SELECTORS);
      if (t && t.length >= 20 && !seenTexts.has(t)) {
        seenTexts.add(t);
        allAssistantTexts.push({ el: row, text: t });
      }
    }
    let answerAfterPrompt = null;
    if (matchedUserEl) {
      let bestEl = null;
      let bestIdx = Infinity;
      for (const { el } of allAssistantTexts) {
        const pos = matchedUserEl.compareDocumentPosition(el);
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) {
          let idx = 0;
          for (let i = 0; i < assistantRows.length; i++) if (assistantRows[i] === el) { idx = i; break; }
          if (idx < bestIdx) { bestIdx = idx; bestEl = el; }
        }
      }
      if (bestEl) {
        const found = allAssistantTexts.find(x => x.el === bestEl);
        if (found) answerAfterPrompt = found.text;
      }
    }
    return {
      matchedUserIdx,
      answerAfterPrompt,
      lastAnswer: allAssistantTexts.length > 0 ? allAssistantTexts[allAssistantTexts.length - 1].text : '',
      allAnswers: allAssistantTexts.map(x => x.text),
      userCount: userRows.length,
      assistantCount: assistantRows.length
    };
  }

  // ========== UI STATE ==========
  const QUOTA_MARKERS = [
    /you've reached your limit/i, /you have reached/i, /limit reached/i,
    /rate limit/i, /too many request/i, /quota/i, /usage limit/i,
    /hết lượt/i, /hết token/i, /out of messages/i, /upgrade to/i,
    /capacity/i, /overloaded/i, /try again later/i, /pro only/i,
    /reach(ed)? the cap/i, /messages this hour/i, /daily limit/i,
    /too fast/i, /request limit/i, /hourly limit/i
  ];

  function detectUiState() {
    const state = { loading: false, quotaError: false, sendDisabled: false, hasSendButton: false, errorBannerText: '' };
    try {
      const stopBtn = first([
        'button[aria-label*="Stop" i]', 'button[title*="Stop" i]',
        '[class*="stop"] button', 'button[class*="stop"]', '[class*="cancel"] button'
      ]);
      if (stopBtn) state.loading = true;
      if (!state.loading) {
        const streaming = document.querySelectorAll('[class*="streaming"], [class*="generating"], [class*="thinking"]');
        for (const el of streaming) if (!isElementGone(el)) { state.loading = true; break; }
      }
      if (!state.loading) {
        const spinners = document.querySelectorAll('[class*="spin"], [class*="loader"], [role="progressbar"], svg[class*="spin"]');
        for (const s of spinners) if (!isElementGone(s)) { state.loading = true; break; }
      }
    } catch (_) { /* ignore */ }
    try {
      const send = first([
        'button[aria-label*="Send" i]', 'button[title*="Send" i]',
        'button[type="submit"]', '[class*="send"] button', 'button[class*="send"]'
      ]);
      if (send) { state.hasSendButton = true; state.sendDisabled = Boolean(send.disabled); }
    } catch (_) { /* ignore */ }
    try {
      const bannerSelectors = [
        '[role="alert"]', '[class*="error"]', '[class*="banner"]',
        '[class*="toast"]', '[class*="notice"]', '[class*="warning"]',
        'div[aria-live="polite"]', 'div[aria-live="assertive"]'
      ];
      for (const sel of bannerSelectors) {
        for (const el of document.querySelectorAll(sel)) {
          if (isElementGone(el)) continue;
          const t = extractText(el);
          if (!t) continue;
          if (QUOTA_MARKERS.some(r => r.test(t))) {
            state.quotaError = true; state.errorBannerText = t.slice(0, 300); break;
          }
        }
        if (state.quotaError) break;
      }
      if (!state.quotaError) {
        const bodyLower = (document.body.innerText || '').toLowerCase();
        if (QUOTA_MARKERS.some(r => r.test(bodyLower))) state.quotaError = true;
      }
    } catch (_) { /* ignore */ }
    return state;
  }

  function getAssistantAnswers() { return getConversationContext('').allAnswers; }

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

  function checkPromptAlreadySent(prompt) {
    const needleN = normalizeForCompare(prompt);
    if (!needleN) return false;
    const ctx = getConversationContext(prompt);
    if (ctx.matchedUserIdx >= 0) return true;
    try {
      const input = first(['textarea', 'textarea[placeholder]', 'div[contenteditable="true"]']);
      if (input) {
        const cur = normalizeForCompare(input.value || input.textContent || '');
        if (cur && (cur === needleN || (needleN.length > 30 && cur.length > needleN.length * 0.8))) return 'in_input';
      }
    } catch (_) { /* ignore */ }
    return false;
  }

  async function waitForAnswer(prompt, alreadySent, timeoutMs) {
    const ctxBefore = getConversationContext(prompt);
    const hasAnswerBefore = alreadySent && ctxBefore.answerAfterPrompt && ctxBefore.answerAfterPrompt.length > 40;
    if (hasAnswerBefore) {
      return { ok: true, text: ctxBefore.answerAfterPrompt, recovered: true, note: `prompt already had reply after send (${ctxBefore.answerAfterPrompt.length} chars) — accepted immediately` };
    }
    const baselineAnswers = new Set(ctxBefore.allAnswers);
    const deadline = Date.now() + timeoutMs;
    let last = '', stableSince = 0;

    while (Date.now() < deadline) {
      await sleep(1100);
      const ui = detectUiState();
      if (ui.quotaError) return { ok: false, error: `DeepSeek: hết lượt/quota (banner lỗi). ${ui.errorBannerText ? '→ ' + ui.errorBannerText : ''}` };
      const ctx = getConversationContext(prompt);
      const paired = ctx.answerAfterPrompt;
      if (paired && paired.length > 40) {
        if (paired === last) {
          if (!stableSince) stableSince = Date.now();
          if (!ui.loading && Date.now() - stableSince > 1200) return { ok: true, text: paired };
          if (Date.now() - stableSince > 2500) return { ok: true, text: paired };
        } else { last = paired; stableSince = 0; }
        continue;
      }
      const newOnes = ctx.allAnswers.filter(t => !baselineAnswers.has(t) && t.length > 40);
      if (newOnes.length > 0) {
        const current = newOnes[newOnes.length - 1];
        if (current === last) {
          if (!stableSince) stableSince = Date.now();
          if (!ui.loading && Date.now() - stableSince > 1200) return { ok: true, text: current };
          if (Date.now() - stableSince > 2500) return { ok: true, text: current };
        } else { last = current; stableSince = 0; }
      }
    }

    const ctxEnd = getConversationContext(prompt);
    if (ctxEnd.answerAfterPrompt && ctxEnd.answerAfterPrompt.length > 120) return { ok: true, text: ctxEnd.answerAfterPrompt, recovered: true, note: 'timeout fallback: paired reply after prompt (long enough)' };
    const newAtEnd = ctxEnd.allAnswers.filter(t => !baselineAnswers.has(t) && t.length > 80);
    if (newAtEnd.length > 0) return { ok: true, text: newAtEnd[newAtEnd.length - 1], recovered: true, note: 'timeout fallback: new content since baseline' };
    const fb = ctxEnd.lastAnswer;
    if (fb && fb !== ctxBefore.lastAnswer && fb.length > 80) return { ok: true, text: fb, recovered: true, note: 'timeout fallback: last answer changed' };

    const uiEnd = detectUiState();
    if (uiEnd.quotaError) return { ok: false, error: `DeepSeek: hết lượt/quota khi chờ kết quả. ${uiEnd.errorBannerText ? '→ ' + uiEnd.errorBannerText : ''}` };
    if (uiEnd.loading) return { ok: false, error: 'DeepSeek: hết thời gian chờ (AI vẫn đang xử lý, tab có thể treo).' };
    return { ok: false, error: `DeepSeek: hết thời gian chờ. Hãy refresh tab hoặc kiểm tra giao diện DeepSeek. (Tìm thấy ${ctxEnd.assistantCount} assistant row; pair=${ctxEnd.matchedUserIdx>=0?'Y':'N'})` };
  }

  async function run(prompt, timeoutMs) {
    const uiPre = detectUiState();
    if (uiPre.quotaError) return { ok: false, error: `DeepSeek: Hết lượt/quota (trước khi gửi). ${uiPre.errorBannerText ? '→ ' + uiPre.errorBannerText : ''}` };
    const sentStatus = checkPromptAlreadySent(prompt);
    let didSend = false;

    if (sentStatus === true) {
      didSend = false;
    } else if (sentStatus === 'in_input') {
      const send = first([
        'button[aria-label*="Send" i]', 'button[title*="Send" i]',
        'button[type="submit"]', '[class*="send"] button', 'button[class*="send"]'
      ]);
      const input = first(['textarea', 'textarea[placeholder]', 'div[contenteditable="true"]']);
      if (send && !send.disabled) { send.click(); didSend = true; }
      else if (input) {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true, ctrlKey: false, shiftKey: false }));
        didSend = true;
      }
    } else {
      const input = first(['textarea', 'textarea[placeholder]', 'div[contenteditable="true"]']);
      if (!input) return { ok: false, error: 'DeepSeek: không tìm thấy ô nhập.' };
      setInputValue(input, prompt);
      await sleep(350);
      const send = first([
        'button[aria-label*="Send" i]', 'button[title*="Send" i]',
        'button[type="submit"]', '[class*="send"] button', 'button[class*="send"]'
      ]);
      if (send && !send.disabled) send.click();
      else input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true, ctrlKey: false, shiftKey: false }));
      didSend = true;
    }

    const ans = await waitForAnswer(prompt, sentStatus === true, timeoutMs);
    if (!didSend && ans?.ok) ans.note = (ans.note ? ans.note + '; ' : '') + 'skipped send (prompt already sent)';
    return ans;
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
      return { ok: true, provider: 'deepseek', candidates: arr.map((t, i) => ({ index: i, text: t, length: t.length })).filter(c => c.length > 20) };
    } catch (_) { return { ok: false, candidates: [] }; }
  }

  function checkPromptSent(prompt) { return checkPromptAlreadySent(prompt); }
  function getUiState() { return detectUiState(); }
  function getLastUserMessage() {
    try {
      const rows = querySortedByDom(USER_ROW_SELECTORS);
      if (rows.length === 0) return '';
      return extractFirstValidText(rows[rows.length - 1], USER_CONTENT_SELECTORS) || '';
    } catch (_) { return ''; }
  }
  function _debugConversation(prompt) { return getConversationContext(prompt || ''); }

  window.__AI_COUNCIL_ADAPTER__ = { run, peekLastAnswer, peekAllMessages, checkPromptSent, getUiState, getLastUserMessage, _debugConversation };
})();
