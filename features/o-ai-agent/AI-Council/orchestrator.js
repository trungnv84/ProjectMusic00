import { scanProviderTabs } from './tab-controller.js';
import { buildRoundPrompts, chooseRoles } from './role-manager.js';
import { DebateEngine } from './debate-engine.js';
import { buildFinalJudgePrompt, buildRedTeamPrompt } from './judge.js';

const ROUND_KEYS = ['round1', 'round2', 'round3', 'round4', 'round5', 'redTeam', 'final'];
const ALL_PROVIDERS = ['chatgpt', 'claude', 'gemini', 'grok', 'deepseek'];
const ROUND_LABELS = {
  round1: 'ROUND 1 - ĐỘC LẬP',
  round2: 'ROUND 2 - PHẢN BIỆN',
  round3: 'ROUND 3 - GIẢI PHÁP',
  round4: 'ROUND 4 - ĐÁNH GIÁ',
  round5: 'ROUND 5 - CHỦ TỌA',
  redTeam: 'ROUND 6 - RED TEAM',
  final: 'ROUND 7 - FINAL JUDGE'
};

function neededProvidersForRound(roundKey, roles, skipped = []) {
  const skip = new Set(skipped || []);
  if (roundKey === 'round5' || roundKey === 'final') {
    let judge = roles?.judge || 'chatgpt';
    if (skip.has(judge)) judge = ALL_PROVIDERS.find((p) => !skip.has(p)) || judge;
    return [judge];
  }
  if (roundKey === 'redTeam') {
    let red = roles?.redTeam || 'claude';
    const judge = roles?.judge || 'chatgpt';
    if (skip.has(red)) red = ALL_PROVIDERS.find((p) => !skip.has(p) && p !== judge) || red;
    return [red];
  }
  return ALL_PROVIDERS.filter((p) => !skip.has(p));
}

const MIN_ANSWER_LEN = 400;

function isQuotaError(msg) {
  const m = String(msg || '').toLowerCase();
  return /quota|rate limit|too many request|usage limit|hết lượt|hết token|limit reached|try again later|overloaded|out of messages|upgrade to|you've reached|you have reached|capacity/.test(m);
}

function isRoundComplete(roundVal, roundKey, roles, skipped = []) {
  const needed = neededProvidersForRound(roundKey, roles, skipped);
  if (!roundVal || typeof roundVal !== 'object' || needed.length === 0) return false;
  return needed.every((p) => roundVal[p] && String(roundVal[p]).trim().length >= MIN_ANSWER_LEN);
}

function stripWeakAndTrailingRounds(transcript, roles, skipped = []) {
  const out = { ...transcript };
  let seenIncomplete = false;
  for (const key of ROUND_KEYS) {
    if (seenIncomplete) {
      delete out[key];
      continue;
    }
    if (out[key] && typeof out[key] === 'object') {
      const cleaned = {};
      for (const [p, t] of Object.entries(out[key])) {
        if (String(t || '').trim().length >= MIN_ANSWER_LEN) cleaned[p] = t;
      }
      if (Object.keys(cleaned).length) out[key] = cleaned;
      else delete out[key];
    }
    if (!isRoundComplete(out[key], key, roles, skipped)) seenIncomplete = true;
  }
  return out;
}


export class Orchestrator {
  constructor() {
    this.running = false;
    this.state = { status: 'idle', phase: null, log: [], transcript: {}, startedAt: null, endedAt: null, error: null };
    this.debate = new DebateEngine(this);
  }

  async getState() {
    const stored = await chrome.storage.local.get('councilState');
    return stored.councilState || this.state;
  }

  async persist(patch) {
    this.state = { ...this.state, ...patch, updatedAt: Date.now() };
    await chrome.storage.local.set({ councilState: this.state });
  }

  async log(message) {
    const log = [...this.state.log, { at: Date.now(), message }];
    await this.persist({ log });
  }

  stop() {
    this.running = false;
    this.persist({ status: 'stopped' }).catch(() => {});
  }

  async recoverIfStale() {
    const stored = await chrome.storage.local.get('councilState');
    const s = stored.councilState;
    if (s) this.state = { ...s };
    const stale = Boolean(s && s.status === 'running' && !this.running);
    const roles = s?.assignments;
    const skipped = s?.skippedProviders || [];
    const fakeComplete = Boolean(s && s.status === 'completed' && ROUND_KEYS.some((k) => !isRoundComplete(s.transcript?.[k], k, roles, skipped)));
    if (stale) {
      await this.persist({ status: 'stopped' });
      await this.log('⏸ Cuộc họp bị gián đoạn (reload extension). Nhấn [⏯ Tiếp tục từ chỗ dừng] để chạy tiếp các tab còn thiếu.');
    } else if (fakeComplete) {
      const cleaned = stripWeakAndTrailingRounds(s.transcript || {}, roles, skipped);
      const firstIncomplete = ROUND_KEYS.find((k) => !isRoundComplete(cleaned[k], k, roles, skipped));
      const checkpoint = firstIncomplete ? { roundKey: firstIncomplete, done: Object.keys(cleaned[firstIncomplete] || {}) } : null;
      await this.persist({ status: 'stopped', transcript: cleaned, checkpoint, final: null });
      await this.log('⚠ Lần resume trước lấy nhầm tin nhắn cũ (câu trả lời quá ngắn). Đã gỡ kết quả giả. Nhấn [⏯ Tiếp tục từ chỗ dừng] để gửi lại prompt cho tab còn thiếu.');
    }
    return stale || fakeComplete;
  }

  async canResume() {
    const s = await this.getState();
    if (!s || !s.question) return false;
    const hasWork = (s.transcript && Object.keys(s.transcript).length > 0) || (s.checkpoint && s.checkpoint.roundKey);
    if (!hasWork) return false;
    if (s.status === 'completed') {
      const roles = s.assignments;
      return ROUND_KEYS.some((k) => !isRoundComplete(s.transcript?.[k], k, roles, s.skippedProviders || []));
    }
    const staleRunning = s.status === 'running' && !this.running;
    return (s.status === 'error' || s.status === 'stopped' || s.status === 'idle' || staleRunning);
  }

  async skipMissingAndContinue() {
    if (this.running) throw new Error('Một cuộc họp đang chạy.');
    const prev = await this.getState();
    if (!prev?.question) throw new Error('Không có cuộc họp để tiếp tục.');
    this.state = { ...prev };
    const roles = prev.assignments || {};
    const skipped = new Set(prev.skippedProviders || []);
    const transcript = stripWeakAndTrailingRounds(prev.transcript || {}, roles, [...skipped]);
    const firstIncomplete = ROUND_KEYS.find((k) => !isRoundComplete(transcript[k], k, roles, [...skipped]));
    if (!firstIncomplete) throw new Error('Không còn tab thiếu để bỏ qua.');
    const needed = neededProvidersForRound(firstIncomplete, roles, [...skipped]);
    const have = new Set(Object.keys(transcript[firstIncomplete] || {}));
    const failedKeys = Object.keys(prev.checkpoint?.failed || {}).filter((p) => needed.includes(p) && !have.has(p));
    const missing = failedKeys.length ? failedKeys : needed.filter((p) => !have.has(p));
    if (missing.length === 0) throw new Error('Không còn tab thiếu trong round hiện tại.');
    for (const p of missing) skipped.add(p);
    const skippedArr = [...skipped];
    await this.persist({
      status: 'stopped',
      transcript,
      skippedProviders: skippedArr,
      checkpoint: { roundKey: firstIncomplete, done: Object.keys(transcript[firstIncomplete] || {}) },
      error: null
    });
    await this.log(`⏭ Bỏ qua (hết quota/lỗi): ${missing.join(', ')}. Hội đồng chạy tiếp không có các tab này.`);
    return this.resume();
  }

  async start(question, mode = 'balanced') {
    if (this.running) throw new Error('Một cuộc họp đang chạy.');
    if (!question?.trim()) throw new Error('Câu hỏi không được để trống.');

    this.running = true;
    await this.debate.saveFocus();
    await this.persist({
      status: 'running',
      phase: 'scan',
      question: question.trim(),
      mode,
      log: [],
      transcript: {},
      startedAt: Date.now(),
      endedAt: null,
      error: null,
      final: null,
      checkpoint: null,
      skippedProviders: []
    });

    try {
      const tabs = await scanProviderTabs();
      const roles = chooseRoles(question, tabs.map((x) => x.provider));
      await this.persist({ assignments: roles, tabs });
      await this.log(`Đã tìm thấy ${tabs.length}/5 tab AI.`);
      if (tabs.length < 5) throw new Error(`Cần đủ 5 tab AI. Hiện có: ${tabs.map(x => x.provider).join(', ') || '0'}.`);

      const { round1, round2, round3, round4, round5, redTeam, final } = await this.runAllRounds(question, roles, tabs, {});
      void round1; void round2; void round3; void round4; void round5; void redTeam; void final;

      await this.persist({ status: 'completed', phase: 'done', endedAt: Date.now(), checkpoint: null });
      await this.log('Cuộc họp hoàn tất.');
      return this.state;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.persist({ status: 'error', error: message, phase: 'error', endedAt: Date.now() });
      await this.log(`Lỗi: ${message}`);
      throw error;
    } finally {
      this.running = false;
      await this.debate.focusDashboard();
    }
  }

  async resume() {
    if (this.running) throw new Error('Một cuộc họp đang chạy.');
    const prev = await this.getState();
    if (!prev?.question) throw new Error('Không có tiến độ nào để tiếp tục. Hãy bắt đầu mới.');
    const tabs = prev.tabs || (await scanProviderTabs());
    const roles = prev.assignments || chooseRoles(prev.question, tabs.map((x) => x.provider));
    const skipped = prev.skippedProviders || [];
    const transcript = stripWeakAndTrailingRounds(prev.transcript || {}, roles, skipped);
    const firstIncomplete = ROUND_KEYS.find((k) => !isRoundComplete(transcript[k], k, roles, skipped));
    if (prev.status === 'completed' && !firstIncomplete) throw new Error('Cuộc họp trước đã hoàn tất. Hãy bắt đầu mới.');

    const checkpoint = firstIncomplete
      ? { roundKey: firstIncomplete, done: Object.keys(transcript[firstIncomplete] || {}) }
      : (prev.checkpoint || null);

    if (tabs.length < 5) throw new Error(`Cần đủ 5 tab AI. Hiện có: ${tabs.map(x => x.provider).join(', ') || '0'}.`);

    this.running = true;
    await this.debate.saveFocus();
    await this.persist({
      status: 'running',
      phase: 'resume',
      question: prev.question,
      mode: prev.mode || 'balanced',
      log: [
        ...(prev.log || []),
        { at: Date.now(), message: '⏯  KHÔI PHỤC TIẾN ĐỘ từ checkpoint.' }
      ],
      transcript: { ...transcript },
      startedAt: prev.startedAt || Date.now(),
      endedAt: null,
      error: null,
      assignments: roles,
      tabs,
      final: prev.final || null,
      checkpoint,
      skippedProviders: skipped
    });

    try {
      await this.log(`Tiếp tục từ: ${checkpoint?.roundKey ? ROUND_LABELS[checkpoint.roundKey] + ' (đã xong: ' + (checkpoint.done || []).join(', ') + ')' : 'tổng hợp các round đã hoàn thành.'}`);

      const results = await this.runAllRounds(prev.question, roles, tabs, transcript, checkpoint);

      await this.persist({
        status: 'completed',
        phase: 'done',
        endedAt: Date.now(),
        final: results.final?.[roles.judge] || prev.final || '',
        transcript: results,
        checkpoint: null
      });
      await this.log('Cuộc họp hoàn tất (đã khôi phục tiến độ).');
      return this.state;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.persist({ status: 'error', error: message, phase: 'error', endedAt: Date.now() });
      await this.log(`Lỗi (khi resume): ${message}`);
      throw error;
    } finally {
      this.running = false;
      await this.debate.focusDashboard();
    }
  }

  async scanAllSnapshots() {
    if (this.running) throw new Error('Cuộc họp đang chạy. Đừng quét nội dung lúc này — sẽ làm gián đoạn các tab AI.');
    const tabs = await scanProviderTabs();
    if (tabs.length < 5) throw new Error(`Cần đủ 5 tab AI. Hiện có: ${tabs.map(x => x.provider).join(', ') || '0'}.`);
    await this.debate.saveFocus();
    const out = [];
    for (const tab of tabs) {
      const snap = await this.debate.recoverSnapshot(tab);
      out.push(snap);
    }
    await this.debate.focusDashboard();
    return out;
  }

  async resumeManual(payload) {
    if (this.running) throw new Error('Một cuộc họp đang chạy.');
    if (!payload) throw new Error('Thiếu payload khôi phục thủ công.');
    const question = String(payload.question || '').trim();
    const mode = String(payload.mode || 'balanced');
    const userTranscript = payload.transcript || {};
    if (!question) throw new Error('Cần nhập lại câu hỏi gốc để có thể tiếp tục các round sau.');

    const tabs = await scanProviderTabs();
    if (tabs.length < 5) throw new Error(`Cần đủ 5 tab AI. Hiện có: ${tabs.map(x => x.provider).join(', ') || '0'}.`);
    const roles = chooseRoles(question, tabs.map((x) => x.provider));

    const transcript = {};
    for (const key of ROUND_KEYS) {
      const roundVal = userTranscript[key];
      if (roundVal && typeof roundVal === 'object' && Object.keys(roundVal).length > 0) {
        const cleaned = {};
        for (const p of Object.keys(roundVal)) {
          if (roundVal[p] && String(roundVal[p]).trim().length > 0) {
            cleaned[p] = String(roundVal[p]).trim();
          }
        }
        if (Object.keys(cleaned).length > 0) transcript[key] = cleaned;
      }
    }

    const firstIncomplete = ROUND_KEYS.find(k => !isRoundComplete(transcript[k], k, roles));
    const resumeCheckpoint = firstIncomplete
      ? { roundKey: firstIncomplete, done: Object.keys(transcript[firstIncomplete] || {}) }
      : null;

    this.running = true;
    await this.debate.saveFocus();
    const entryMsg = `🛠 KHÔI PHỤC THỦ CÔNG: ${Object.keys(transcript).length}/7 round đã được user gán kết quả.`;
    const logStart = [
      ...(await this.getState()).log || [],
      { at: Date.now(), message: entryMsg },
      { at: Date.now(), message: `Tiếp tục từ: ${resumeCheckpoint ? ROUND_LABELS[resumeCheckpoint.roundKey] + ' (đã gán: ' + ((resumeCheckpoint.done || []).join(', ') || 'chưa AI nào') + ')' : 'tất cả đã xong'}.` }
    ];

    await this.persist({
      status: 'running',
      phase: 'manual-resume',
      question,
      mode,
      log: logStart,
      transcript: { ...transcript },
      startedAt: Date.now(),
      endedAt: null,
      error: null,
      assignments: roles,
      tabs,
      final: null,
      checkpoint: resumeCheckpoint
    });

    try {
      const results = await this.runAllRounds(question, roles, tabs, transcript, resumeCheckpoint);
      await this.persist({
        status: 'completed',
        phase: 'done',
        endedAt: Date.now(),
        final: results.final?.[roles.judge] || '',
        transcript: results,
        checkpoint: null
      });
      await this.log('Cuộc họp hoàn tất (khôi phục thủ công).');
      return this.state;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.persist({ status: 'error', error: message, phase: 'error', endedAt: Date.now() });
      await this.log(`Lỗi (khôi phục thủ công): ${message}`);
      throw error;
    } finally {
      this.running = false;
      await this.debate.focusDashboard();
    }
  }

  async runAllRounds(question, roles, tabs, existingTranscript, resumeCheckpoint = null) {
    const transcript = { ...existingTranscript };

    const startIdx = resumeCheckpoint?.roundKey ? ROUND_KEYS.indexOf(resumeCheckpoint.roundKey) : 0;
    const effectiveStart = startIdx === -1 ? 0 : startIdx;
    const skipped = this.state.skippedProviders || [];
    const roundComplete = (key) => isRoundComplete(transcript[key], key, roles, skipped);
    const doneFor = (key) => {
      const fromCk = (resumeCheckpoint && resumeCheckpoint.roundKey === key) ? (resumeCheckpoint.done || []) : [];
      const fromTx = Object.keys(transcript[key] || {});
      return [...new Set([...fromCk, ...fromTx])];
    };

    if (!roundComplete('round1')) {
      if (!transcript.round1 && effectiveStart > 0) throw new Error('Không có kết quả Round 1 trong transcript, không thể resume.');
      transcript.round1 = await this.runRoundWithCheckpoint('round1',
        buildRoundPrompts(question, roles, 'round1'),
        tabs,
        doneFor('round1')
      );
      if (!this.running) return transcript;
    }

    if (!roundComplete('round2')) {
      transcript.round2 = await this.runRoundWithCheckpoint('round2',
        buildRoundPrompts(question, roles, 'round2', transcript.round1),
        tabs,
        doneFor('round2')
      );
      if (!this.running) return transcript;
    }

    if (!roundComplete('round3')) {
      transcript.round3 = await this.runRoundWithCheckpoint('round3',
        buildRoundPrompts(question, roles, 'round3', { round1: transcript.round1, round2: transcript.round2 }),
        tabs,
        doneFor('round3')
      );
      if (!this.running) return transcript;
    }

    if (!roundComplete('round4')) {
      transcript.round4 = await this.runRoundWithCheckpoint('round4',
        buildRoundPrompts(question, roles, 'round4', { round1: transcript.round1, round2: transcript.round2, round3: transcript.round3 }),
        tabs,
        doneFor('round4')
      );
      if (!this.running) return transcript;
    }

    const judgePrompt = buildFinalJudgePrompt(question, transcript.round1, transcript.round2, transcript.round3, transcript.round4);
    const judgeId = neededProvidersForRound('round5', roles, skipped)[0] || roles.judge;

    if (!roundComplete('round5')) {
      transcript.round5 = await this.runRoundWithCheckpoint('round5',
        { [judgeId]: judgePrompt },
        tabs,
        doneFor('round5')
      );
      if (!this.running) return transcript;
    }

    const redPrompt = buildRedTeamPrompt(question, transcript.round5?.[judgeId] || transcript.round5?.[roles.judge] || '');
    const redId = neededProvidersForRound('redTeam', roles, skipped)[0] || roles.redTeam;

    if (!roundComplete('redTeam')) {
      transcript.redTeam = await this.runRoundWithCheckpoint('redTeam',
        { [redId]: redPrompt },
        tabs,
        doneFor('redTeam')
      );
      if (!this.running) return transcript;
    }

    const finalPrompt = `${judgePrompt}\n\n=== RED TEAM ===\n${transcript.redTeam?.[redId] || transcript.redTeam?.[roles.redTeam] || ''}\n\nHãy xem xét phản biện Red Team. Nếu cần hãy thay đổi quyết định. Nếu không cần, giải thích vì sao. Đưa ra phiên bản quyết định cuối cùng.`;

    if (!roundComplete('final')) {
      transcript.final = await this.runRoundWithCheckpoint('final',
        { [judgeId]: finalPrompt },
        tabs,
        doneFor('final')
      );
    }

    return transcript;
  }

  async runRoundWithCheckpoint(roundKey, prompts, tabs, alreadyDoneProviders) {
    const label = ROUND_LABELS[roundKey] || roundKey;
    await this.persist({ phase: label });
    await this.log(label);

    const done = new Set(alreadyDoneProviders || []);
    const outputs = {};
    const existing = this.state.transcript?.[roundKey] || {};
    for (const p of Object.keys(existing)) {
      if (existing[p] && String(existing[p]).trim().length >= MIN_ANSWER_LEN) {
        outputs[p] = existing[p];
        done.add(p);
      }
    }
    if (Object.keys(outputs).length > 0) {
      await this.persist({
        transcript: { ...this.state.transcript, [roundKey]: outputs },
        checkpoint: { roundKey, done: Object.keys(outputs) }
      });
    }

    const skipped = this.state.skippedProviders || [];
    const neededTabs = tabs.filter(t => prompts[t.provider] && !skipped.includes(t.provider));
    const failed = {};

    for (const tab of neededTabs) {
      if (!this.running) throw new Error('Đã dừng cuộc họp.');
      const provider = tab.provider;

      if (done.has(provider) && outputs[provider]) {
        await this.log(`↩ ${provider}: Đã có kết quả trước đó, bỏ qua.`);
        continue;
      }

      let success = false;
      let lastErr = null;

      for (let attempt = 1; attempt <= 2 && !success; attempt++) {
        try {
          await this.log(`→ ${provider}: gửi nhiệm vụ${attempt > 1 ? ` (lần ${attempt}/2)` : ''}.`);
          outputs[provider] = await this.debate.ask(tab, prompts[provider]);
          done.add(provider);
          await this.log(`← ${provider}: nhận kết quả.`);
          await this.persist({
            transcript: { ...this.state.transcript, [roundKey]: outputs },
            checkpoint: { roundKey, done: Object.keys(outputs) }
          });
          success = true;
        } catch (err) {
          lastErr = err instanceof Error ? err.message : String(err);
          await this.log(`⚠ ${provider}: Lỗi lần ${attempt}/2 — ${lastErr}`);
          if (isQuotaError(lastErr)) {
            await this.log(`⛔ ${provider}: Có vẻ hết lượt/quota free — không thử lại ngay.`);
            break;
          }
          if (attempt < 2) await new Promise(r => setTimeout(r, 1200));
        }
      }

      if (!success) {
        failed[provider] = lastErr || 'Không rõ lỗi';
        await this.persist({
          transcript: { ...this.state.transcript, [roundKey]: outputs },
          checkpoint: { roundKey, done: Object.keys(outputs), failed: { ...(this.state.checkpoint?.failed || {}), ...failed } }
        });
      }
    }

    if (Object.keys(failed).length > 0) {
      const okList = Object.keys(outputs);
      const failList = Object.entries(failed).map(([p, e]) => `${p}(${e})`).join(', ');
      const hint = okList.length > 0
        ? `Các tab đã xong: ${okList.join(', ')} (đã lưu checkpoint). Tab bị lỗi: ${failList}.`
        : `Các tab bị lỗi: ${failList}.`;
      throw new Error(
        `${label}: ${Object.keys(failed).length} tab AI không chạy xong. ${hint}\n` +
        (Object.values(failed).some(isQuotaError)
          ? `⛔ Có tab hết lượt free/quota. Đợi reset rồi nhấn [⏯ TIẾP TỤC], hoặc nhấn [⏭ Bỏ qua tab lỗi] để chạy tiếp với các AI còn lại.\n`
          : '') +
        `👉 CÁCH CHẠY TIẾP: Đóng alert này rồi nhấn [⏯ TIẾP TỤC / RESUME] (thử lại tab lỗi) hoặc [⏭ Bỏ qua tab lỗi]. Các tab ĐÃ XONG sẽ được bỏ qua.`
      );
    }

    return outputs;
  }
}
