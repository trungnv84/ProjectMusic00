(() => {
  if (window.__AI_COUNCIL_ADAPTER__) return;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // 🔴 CHỈ dùng cho UI controls (ô nhập, nút gửi)
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
    return String(s || '')
      .replace(/\s+/g, ' ')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .trim()
      .toLowerCase();
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

  // ========== Claude-SPECIFIC DOM STRUCTURE (nhận diện đúng row chat) ==========
  // Claude.ai 2024-2025: mỗi tin nhắn (user/assistant) là 1 row trong chat container
  // Tin nhắn user: thường có các class chứa "user", "human", data-role="user"
  // Tin nhắn assistant: thường có data-is-streaming, class chứa "assistant", "bot", "ai"
  // Nội dung tin assistant: thường nằm trong div.prose hoặc div.markdown

  const CLAUDE_USER_ROW_SELECTORS = [
    '[data-testid="human-message"]',
    '[data-message-role="user"]',
    '[data-role="user"]',
    '[class*="message-row"][class*="user" i]',
    '[class*="user-message"]',
    '[class*="HumanMessage"]',
    'div[class*="chat-row"][class*="user" i]'
  ];
  const CLAUDE_ASSISTANT_ROW_SELECTORS = [
    '[data-testid="ai-message"]',
    '[data-message-role="assistant"]',
    '[data-role="assistant"]',
    '[data-is-streaming]',
    '[class*="message-row"][class*="assistant" i]',
    '[class*="message-row"][class*="bot" i]',
    '[class*="AssistantMessage"]',
    'div[class*="chat-row"][class*="assistant" i]',
    'div[class*="chat-row"][class*="bot" i]'
  ];
  // Nội dung text chính trong 1 assistant row
  const CLAUDE_CONTENT_SELECTORS = [
    'div.prose', 'div.markdown', 'article',
    '[class*="message-content"]', '[class*="response-content"]',
    '[class*="message-body"]', '[class*="markdown-body"]'
  ];
  // User text content selectors
  const CLAUDE_USER_CONTENT_SELECTORS = [
    '[class*="message-content"]', '[class*="response-content"]',
    '[class*="message-body"]', 'div.prose', 'div.markdown',
    '[class*="human-content"]', '[class*="user-content"]'
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
    // Sắp xếp theo đúng thứ tự xuất hiện trong DOM (trước → sau = cũ → mới)
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
    // Thử các selector content bên trong
    for (const sel of contentSelectors) {
      const inner = el.querySelector(sel);
      if (inner && !isElementGone(inner)) {
        const t = extractText(inner);
        if (t.length >= 10) return t;
      }
    }
    // Fallback: chính el đó nếu là nội dung
    const fallback = extractText(el);
    if (fallback.length >= 10) return fallback;
    return '';
  }

  // ========== TRẢ VỀ CẢI TIẾN: trả về conversation theo thứ tự, tìm được cặp user-assistant tương ứng ==========
  function getConversationContext(promptNeedle) {
    const userRows = querySortedByDom(CLAUDE_USER_ROW_SELECTORS);
    const assistantRows = querySortedByDom(CLAUDE_ASSISTANT_ROW_SELECTORS);

    // Tìm user row matching prompt
    const needleN = normalizeForCompare(promptNeedle);
    let matchedUserIdx = -1;
    let matchedUserEl = null;
    for (let i = 0; i < userRows.length; i++) {
      const t = extractFirstValidText(userRows[i], CLAUDE_USER_CONTENT_SELECTORS);
      if (needleN && textFuzzyMatch(needleN, t)) {
        matchedUserIdx = i;
        matchedUserEl = userRows[i];
        break;
      }
    }

    // Tất cả assistant answers (sắp xếp theo DOM)
    const allAssistantTexts = [];
    const seenTexts = new Set();
    for (const row of assistantRows) {
      const t = extractFirstValidText(row, CLAUDE_CONTENT_SELECTORS);
      if (t && t.length >= 20 && !seenTexts.has(t)) {
        seenTexts.add(t);
        allAssistantTexts.push({ el: row, text: t });
      }
    }

    // Tìm assistant row NGAY SAU matched user el (nếu có)
    let answerAfterPrompt = null;
    if (matchedUserEl) {
      let bestEl = null;
      let bestIdx = Infinity;
      for (const { el } of allAssistantTexts) {
        const pos = matchedUserEl.compareDocumentPosition(el);
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) {
          // Tìm element "sau user mà gần nhất"
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

  // ========== DETECT UI STATE ==========
  const QUOTA_MARKERS = [
    /you've reached your limit/i, /you have reached/i, /limit reached/i,
    /rate limit/i, /too many request/i, /quota/i, /usage limit/i,
    /hết lượt/i, /hết token/i, /out of messages/i, /upgrade to/i,
    /capacity/i, /overloaded/i, /try again later/i, /pro only/i,
    /reach(ed)? the cap/i, /messages this hour/i, /daily limit/i
  ];

  function detectUiState() {
    const state = { loading: false, quotaError: false, sendDisabled: false, hasSendButton: false, errorBannerText: '' };
    try {
      const stopBtn = first([
        'button[aria-label*="Stop" i]', 'button[title*="Stop" i]',
        '[class*="stop"] button', 'button[class*="stop"]'
      ]);
      if (stopBtn) state.loading = true;
      if (!state.loading) {
        const streamingEls = document.querySelectorAll('[data-is-streaming="true"]');
        for (const el of streamingEls) if (!isElementGone(el)) { state.loading = true; break; }
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

  // ========== BACKWARD-COMPAT getAssistantAnswers() cho peek API cũ ==========
  function getAssistantAnswers() {
    const ctx = getConversationContext('');
    return ctx.allAnswers;
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

  // ========== checkPromptAlreadySent mới (dựa trên row user-specific) ==========
  function checkPromptAlreadySent(prompt) {
    const needleN = normalizeForCompare(prompt);
    if (!needleN) return false;
    const ctx = getConversationContext(prompt);
    if (ctx.matchedUserIdx >= 0) return true;
    // Fallback cũ: kiểm tra ô nhập
    try {
      const input = first([
        'div[contenteditable="true"]', 'textarea[placeholder*="message" i]',
        'textarea[placeholder*="reply" i]', 'textarea', 'textarea[placeholder]'
      ]);
      if (input) {
        const cur = normalizeForCompare(input.value || input.textContent || '');
        if (cur && (cur === needleN || (needleN.length > 30 && cur.length > needleN.length * 0.8))) {
          return 'in_input';
        }
      }
    } catch (_) { /* ignore */ }
    return false;
  }

  // ========== CHỜ KẾT QUẢ (với prompt cần đợi) ==========
  async function waitForAnswer(prompt, alreadySent, timeoutMs) {
    // Baseline trạng thái
    const ctxBefore = getConversationContext(prompt);
    const hasAnswerBefore = alreadySent && ctxBefore.answerAfterPrompt && ctxBefore.answerAfterPrompt.length > 40;
    // Nếu prompt đã gửi VÀ đã có câu trả lời đủ dài NGAY SAU prompt user đó → chấp nhận LUÔN
    if (hasAnswerBefore) {
      return { ok: true, text: ctxBefore.answerAfterPrompt, recovered: true, note: `prompt already had reply after send (${ctxBefore.answerAfterPrompt.length} chars) — accepted immediately` };
    }
    const baselineAnswers = new Set(ctxBefore.allAnswers);
    const deadline = Date.now() + timeoutMs;
    let last = '', stableSince = 0;

    while (Date.now() < deadline) {
      await sleep(1100);
      const ui = detectUiState();
      if (ui.quotaError) {
        return { ok: false, error: `Claude: hết lượt/quota (banner lỗi). ${ui.errorBannerText ? '→ ' + ui.errorBannerText : ''}` };
      }
      const ctx = getConversationContext(prompt);
      // Ưu tiên #1: có answer NGAY SAU prompt user (đúng cặp)
      const paired = ctx.answerAfterPrompt;
      if (paired && paired.length > 40) {
        if (paired === last) {
          if (!stableSince) stableSince = Date.now();
          if (!ui.loading && Date.now() - stableSince > 1200) return { ok: true, text: paired };
          if (Date.now() - stableSince > 2500) return { ok: true, text: paired };
        } else {
          last = paired;
          stableSince = 0;
        }
        continue;
      }
      // Ưu tiên #2: có answer MỚI xuất hiện (không có trong baseline)
      const newOnes = ctx.allAnswers.filter(t => !baselineAnswers.has(t) && t.length > 40);
      if (newOnes.length > 0) {
        const current = newOnes[newOnes.length - 1];
        if (current === last) {
          if (!stableSince) stableSince = Date.now();
          if (!ui.loading && Date.now() - stableSince > 1200) return { ok: true, text: current };
          if (Date.now() - stableSince > 2500) return { ok: true, text: current };
        } else {
          last = current;
          stableSince = 0;
        }
      }
    }

    // Fallback cuối
    const ctxEnd = getConversationContext(prompt);
    if (ctxEnd.answerAfterPrompt && ctxEnd.answerAfterPrompt.length > 120) {
      return { ok: true, text: ctxEnd.answerAfterPrompt, recovered: true, note: 'timeout fallback: paired reply after prompt (long enough)' };
    }
    const fb = ctxEnd.lastAnswer;
    const newAtEnd = ctxEnd.allAnswers.filter(t => !baselineAnswers.has(t) && t.length > 80);
    if (newAtEnd.length > 0) {
      return { ok: true, text: newAtEnd[newAtEnd.length - 1], recovered: true, note: 'timeout fallback: new content appeared since baseline' };
    }
    if (fb && fb !== ctxBefore.lastAnswer && fb.length > 80) {
      return { ok: true, text: fb, recovered: true, note: 'timeout fallback: last answer changed' };
    }

    const uiEnd = detectUiState();
    if (uiEnd.quotaError) {
      return { ok: false, error: `Claude: hết lượt/quota khi chờ kết quả. ${uiEnd.errorBannerText ? '→ ' + uiEnd.errorBannerText : ''}` };
    }
    if (uiEnd.loading) {
      return { ok: false, error: 'Claude: hết thời gian chờ (AI vẫn đang xử lý, tab có thể treo).' };
    }
    return { ok: false, error: `Claude: hết thời gian chờ. Hãy refresh tab hoặc kiểm tra giao diện. (Đã tìm thấy ${ctxEnd.assistantCount} assistant row; có pair=${ctxEnd.matchedUserIdx>=0?'Y':'N'})` };
  }

  // ========== MAIN RUN ==========
  async function run(prompt, timeoutMs) {
    const uiPre = detectUiState();
    if (uiPre.quotaError) {
      return { ok: false, error: `Claude: Hết lượt/quota (trước khi gửi). ${uiPre.errorBannerText ? '→ ' + uiPre.errorBannerText : ''}` };
    }

    const sentStatus = checkPromptAlreadySent(prompt);
    let didSend = false;

    if (sentStatus === true) {
      didSend = false;
    } else if (sentStatus === 'in_input') {
      const send = first([
        'button[aria-label*="Send" i]', 'button[title*="Send" i]',
        'button[type="submit"]', '[class*="send"] button', 'button[class*="send"]'
      ]);
      const input = first([
        'div[contenteditable="true"]', 'textarea[placeholder*="message" i]',
        'textarea[placeholder*="reply" i]', 'textarea', 'textarea[placeholder]'
      ]);
      if (send && !send.disabled) { send.click(); didSend = true; }
      else if (input) { input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true })); didSend = true; }
    } else {
      const input = first([
        'div[contenteditable="true"]', 'textarea[placeholder*="message" i]',
        'textarea[placeholder*="reply" i]', 'textarea', 'textarea[placeholder]'
      ]);
      if (!input) return { ok: false, error: 'Claude: không tìm thấy ô nhập.' };
      setInputValue(input, prompt);
      await sleep(350);
      const send = first([
        'button[aria-label*="Send" i]', 'button[title*="Send" i]',
        'button[type="submit"]', '[class*="send"] button', 'button[class*="send"]'
      ]);
      if (send && !send.disabled) send.click();
      else input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
      didSend = true;
    }

    const ans = await waitForAnswer(prompt, sentStatus === true, timeoutMs);
    if (!didSend && ans?.ok) {
      ans.note = (ans.note ? ans.note + '; ' : '') + 'skipped send (prompt already sent)';
    }
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
      return {
        ok: true,
        provider: 'claude',
        candidates: arr.map((t, i) => ({ index: i, text: t, length: t.length })).filter(c => c.length > 20)
      };
    } catch (_) { return { ok: false, candidates: [] }; }
  }

  function checkPromptSent(prompt) { return checkPromptAlreadySent(prompt); }
  function getUiState() { return detectUiState(); }
  function getLastUserMessage() {
    try {
      const rows = querySortedByDom(CLAUDE_USER_ROW_SELECTORS);
      if (rows.length === 0) return '';
      return extractFirstValidText(rows[rows.length - 1], CLAUDE_USER_CONTENT_SELECTORS) || '';
    } catch (_) { return ''; }
  }
  // API debug
  function _debugConversation(prompt) {
    return getConversationContext(prompt || '');
  }

  window.__AI_COUNCIL_ADAPTER__ = {
    run, peekLastAnswer, peekAllMessages,
    checkPromptSent, getUiState, getLastUserMessage,
    _debugConversation
  };
})();
