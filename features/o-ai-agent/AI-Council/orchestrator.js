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

function neededProvidersForRound(roundKey, roles) {
  if (roundKey === 'round5' || roundKey === 'final') return roles?.judge ? [roles.judge] : ['chatgpt'];
  if (roundKey === 'redTeam') return roles?.redTeam ? [roles.redTeam] : ['claude'];
  return ALL_PROVIDERS;
}

function isRoundComplete(roundVal, roundKey, roles) {
  const needed = neededProvidersForRound(roundKey, roles);
  if (!roundVal || typeof roundVal !== 'object' || needed.length === 0) return false;
  return needed.every((p) => roundVal[p] && String(roundVal[p]).trim().length > 0);
}

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

  async canResume() {
    const s = await this.getState();
    if (!s || !s.question) return false;
    if (s.status === 'completed') return false;
    const hasWork = (s.transcript && Object.keys(s.transcript).length > 0) || (s.checkpoint && s.checkpoint.roundKey);
    if (!hasWork) return false;
    return (s.status === 'error' || s.status === 'stopped' || s.status === 'idle');
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
      checkpoint: null
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
    if (prev.status === 'completed') throw new Error('Cuộc họp trước đã hoàn tất. Hãy bắt đầu mới.');

    const checkpoint = prev.checkpoint || null;
    const transcript = prev.transcript || {};
    const tabs = prev.tabs || (await scanProviderTabs());
    const roles = prev.assignments || chooseRoles(prev.question, tabs.map((x) => x.provider));

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
      checkpoint
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
    const tabs = await scanProviderTabs();
    if (tabs.length < 5) throw new Error(`Cần đủ 5 tab AI. Hiện có: ${tabs.map(x => x.provider).join(', ') || '0'}.`);
    await agentIngest({ runId: 'post-fix', hypothesisId: 'H', location: 'orchestrator.js:scanAllSnapshots:start', message: 'scan start', data: { providers: tabs.map(t => t.provider) } });
    await this.debate.saveFocus();
    const out = [];
    for (const tab of tabs) {
      const snap = await this.debate.recoverSnapshot(tab);
      await agentIngest({ runId: 'post-fix', hypothesisId: 'H', location: 'orchestrator.js:scanAllSnapshots:tab', message: 'scan tab done', data: { provider: tab.provider, ok: !!snap.ok, candidates: (snap.candidates || []).length, error: snap.error || null } });
      out.push(snap);
    }
    await this.debate.focusDashboard();
    await agentIngest({ runId: 'post-fix', hypothesisId: 'H', location: 'orchestrator.js:scanAllSnapshots:end', message: 'scan complete', data: { tabs: out.map(s => ({ provider: s.provider, ok: s.ok, n: (s.candidates || []).length })) } });
    return out;
  }

  async resumeManual(payload) {
    await agentIngest({ runId: 'post-fix', hypothesisId: 'A', location: 'orchestrator.js:resumeManual:enter', message: 'resumeManual entered', data: { running: this.running, hasPayload: !!payload, roundCounts: Object.fromEntries(Object.keys((payload && payload.transcript) || {}).map(k => [k, Object.keys(payload.transcript[k] || {})])) } });
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

    const firstMissing = ROUND_KEYS.find(k => !transcript[k]);
    const firstIncomplete = ROUND_KEYS.find(k => !isRoundComplete(transcript[k], k, roles));
    const resumeCheckpoint = firstIncomplete
      ? { roundKey: firstIncomplete, done: Object.keys(transcript[firstIncomplete] || {}) }
      : null;
    // #region agent log
    fetch('http://127.0.0.1:7413/ingest/10d9d826-fa96-48d2-9291-4b72f24b3687',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8a40bc'},body:JSON.stringify({sessionId:'8a40bc',runId:'pre-fix',hypothesisId:'A',location:'orchestrator.js:resumeManual',message:'checkpoint from partial transcript',data:{transcriptCounts:Object.fromEntries(ROUND_KEYS.map(k=>[k,transcript[k]?Object.keys(transcript[k]):[]])),firstMissing,resumeCheckpoint},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    // #region agent log
    fetch('http://127.0.0.1:7413/ingest/10d9d826-fa96-48d2-9291-4b72f24b3687',{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({sessionId:'8a40bc',runId:'post-fix',hypothesisId:'A',location:'orchestrator.js:resumeManual:complete',message:'partial round checkpoint',data:{firstMissing,firstIncomplete,resumeCheckpoint,complete:Object.fromEntries(ROUND_KEYS.map(k=>[k,isRoundComplete(transcript[k],k,roles)]))},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    await agentIngest({ runId: 'post-fix', hypothesisId: 'A', location: 'orchestrator.js:resumeManual:storage', message: 'partial round checkpoint storage', data: { firstMissing, firstIncomplete, resumeCheckpoint, complete: Object.fromEntries(ROUND_KEYS.map(k => [k, isRoundComplete(transcript[k], k, roles)])) } });

    this.running = true;
    this.skipAutoRecover = true;
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
      this.skipAutoRecover = false;
      await this.debate.focusDashboard();
    }
  }

  async runAllRounds(question, roles, tabs, existingTranscript, resumeCheckpoint = null) {
    const transcript = { ...existingTranscript };

    const startIdx = resumeCheckpoint?.roundKey ? ROUND_KEYS.indexOf(resumeCheckpoint.roundKey) : 0;
    const effectiveStart = startIdx === -1 ? 0 : startIdx;
    // #region agent log
    fetch('http://127.0.0.1:7413/ingest/10d9d826-fa96-48d2-9291-4b72f24b3687',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8a40bc'},body:JSON.stringify({sessionId:'8a40bc',runId:'pre-fix',hypothesisId:'B',location:'orchestrator.js:runAllRounds',message:'round skip plan',data:{startIdx,effectiveStart,checkpoint:resumeCheckpoint||null,willRun:{round1:effectiveStart===0&&!transcript.round1,round2:effectiveStart<=1&&!transcript.round2,round3:effectiveStart<=2&&!transcript.round3,round4:effectiveStart<=3&&!transcript.round4,round5:effectiveStart<=4&&!transcript.round5,redTeam:effectiveStart<=5&&!transcript.redTeam,final:effectiveStart<=6&&!transcript.final},counts:Object.fromEntries(ROUND_KEYS.map(k=>[k,transcript[k]?Object.keys(transcript[k]):[]]))},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    const roundComplete = (key) => isRoundComplete(transcript[key], key, roles);
    const doneFor = (key) => {
      const fromCk = (resumeCheckpoint && resumeCheckpoint.roundKey === key) ? (resumeCheckpoint.done || []) : [];
      const fromTx = Object.keys(transcript[key] || {});
      return [...new Set([...fromCk, ...fromTx])];
    };
    // #region agent log
    fetch('http://127.0.0.1:7413/ingest/10d9d826-fa96-48d2-9291-4b72f24b3687',{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({sessionId:'8a40bc',runId:'post-fix',hypothesisId:'B',location:'orchestrator.js:runAllRounds:complete',message:'incomplete rounds will run',data:{checkpoint:resumeCheckpoint||null,willRunIncomplete:Object.fromEntries(ROUND_KEYS.map(k=>[k,!roundComplete(k)])),doneFor:Object.fromEntries(ROUND_KEYS.map(k=>[k,doneFor(k)]))},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    await agentIngest({ runId: 'post-fix', hypothesisId: 'B', location: 'orchestrator.js:runAllRounds:storage', message: 'incomplete rounds will run', data: { checkpoint: resumeCheckpoint || null, willRunIncomplete: Object.fromEntries(ROUND_KEYS.map(k => [k, !roundComplete(k)])), doneFor: Object.fromEntries(ROUND_KEYS.map(k => [k, doneFor(k)])) } });

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

    if (!roundComplete('round5')) {
      transcript.round5 = await this.runRoundWithCheckpoint('round5',
        { [roles.judge]: judgePrompt },
        tabs,
        doneFor('round5')
      );
      if (!this.running) return transcript;
    }

    const redPrompt = buildRedTeamPrompt(question, transcript.round5?.[roles.judge] || '');

    if (!roundComplete('redTeam')) {
      transcript.redTeam = await this.runRoundWithCheckpoint('redTeam',
        { [roles.redTeam]: redPrompt },
        tabs,
        doneFor('redTeam')
      );
      if (!this.running) return transcript;
    }

    const finalPrompt = `${judgePrompt}\n\n=== RED TEAM ===\n${transcript.redTeam?.[roles.redTeam] || ''}\n\nHãy xem xét phản biện Red Team. Nếu cần hãy thay đổi quyết định. Nếu không cần, giải thích vì sao. Đưa ra phiên bản quyết định cuối cùng.`;

    if (!roundComplete('final')) {
      transcript.final = await this.runRoundWithCheckpoint('final',
        { [roles.judge]: finalPrompt },
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
    for (const p of Object.keys(existing)) { if (existing[p]) { outputs[p] = existing[p]; done.add(p); } }
    if (Object.keys(outputs).length > 0) {
      await this.persist({
        transcript: { ...this.state.transcript, [roundKey]: outputs },
        checkpoint: { roundKey, done: Object.keys(outputs) }
      });
    }

    const neededTabs = tabs.filter(t => prompts[t.provider]);
    const failed = {};
    // #region agent log
    fetch('http://127.0.0.1:7413/ingest/10d9d826-fa96-48d2-9291-4b72f24b3687',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8a40bc'},body:JSON.stringify({sessionId:'8a40bc',runId:'pre-fix',hypothesisId:'E',location:'orchestrator.js:runRoundWithCheckpoint:entry',message:'round tab plan',data:{roundKey,alreadyDoneProviders:alreadyDoneProviders||[],existingKeys:Object.keys(existing),needed:neededTabs.map(t=>t.provider),promptKeys:Object.keys(prompts||{})},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    // #region agent log
    fetch('http://127.0.0.1:7413/ingest/10d9d826-fa96-48d2-9291-4b72f24b3687',{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({sessionId:'8a40bc',runId:'post-fix',hypothesisId:'E',location:'orchestrator.js:runRoundWithCheckpoint:entry:nocors',message:'round tab plan nocors',data:{roundKey,skipAutoRecover:!!this.skipAutoRecover,alreadyDoneProviders:alreadyDoneProviders||[],existingKeys:Object.keys(existing),needed:neededTabs.map(t=>t.provider)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    await agentIngest({ runId: 'post-fix', hypothesisId: 'E', location: 'orchestrator.js:runRoundWithCheckpoint:storage', message: 'round tab plan', data: { roundKey, skipAutoRecover: !!this.skipAutoRecover, alreadyDoneProviders: alreadyDoneProviders || [], existingKeys: Object.keys(existing), needed: neededTabs.map(t => t.provider) } });

    for (const tab of neededTabs) {
      if (!this.running) throw new Error('Đã dừng cuộc họp.');
      const provider = tab.provider;

      if (done.has(provider) && outputs[provider]) {
        // #region agent log
        fetch('http://127.0.0.1:7413/ingest/10d9d826-fa96-48d2-9291-4b72f24b3687',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8a40bc'},body:JSON.stringify({sessionId:'8a40bc',runId:'pre-fix',hypothesisId:'E',location:'orchestrator.js:runRoundWithCheckpoint:skip',message:'skip already done tab',data:{roundKey,provider,outputLen:(outputs[provider]||'').length},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        // #region agent log
        fetch('http://127.0.0.1:7413/ingest/10d9d826-fa96-48d2-9291-4b72f24b3687',{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({sessionId:'8a40bc',runId:'post-fix',hypothesisId:'E',location:'orchestrator.js:runRoundWithCheckpoint:skip:nocors',message:'skip already done tab nocors',data:{roundKey,provider},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        await this.log(`↩ ${provider}: Đã có kết quả trước đó, bỏ qua.`);
        continue;
      }

      let success = false;
      let lastErr = null;

      const recovered = this.skipAutoRecover
        ? { recovered: false }
        : await this.debate.tryRecoverLastResponse(tab);
      if (recovered.recovered && recovered.text && outputs[provider] !== recovered.text) {
        // #region agent log
        fetch('http://127.0.0.1:7413/ingest/10d9d826-fa96-48d2-9291-4b72f24b3687',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8a40bc'},body:JSON.stringify({sessionId:'8a40bc',runId:'pre-fix',hypothesisId:'D',location:'orchestrator.js:runRoundWithCheckpoint:recover',message:'auto-recovered leftover tab text',data:{roundKey,provider,textLen:(recovered.text||'').length},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        outputs[provider] = recovered.text;
        done.add(provider);
        await this.log(`♻ ${provider}: Đã đọc lại nội dung có sẵn trên tab (không gửi lại prompt).`);
        await this.persist({
          transcript: { ...this.state.transcript, [roundKey]: outputs },
          checkpoint: { roundKey, done: Object.keys(outputs) }
        });
        continue;
      }

      for (let attempt = 1; attempt <= 2 && !success; attempt++) {
        try {
          await this.log(`→ ${provider}: gửi nhiệm vụ${attempt > 1 ? ` (lần ${attempt}/2)` : ''}.`);
          // #region agent log
          fetch('http://127.0.0.1:7413/ingest/10d9d826-fa96-48d2-9291-4b72f24b3687',{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({sessionId:'8a40bc',runId:'post-fix',hypothesisId:'E',location:'orchestrator.js:runRoundWithCheckpoint:ask',message:'sending prompt to remaining tab',data:{roundKey,provider,attempt,skipAutoRecover:!!this.skipAutoRecover},timestamp:Date.now()})}).catch(()=>{});
          // #endregion
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
          if (attempt < 2) await new Promise(r => setTimeout(r, 1200));
        }
      }

      if (!success) {
        failed[provider] = lastErr || 'Không rõ lỗi';
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
        `👉 CÁCH CHẠY TIẾP: Chỉ cần đóng alert này rồi nhấn nút [⏯ TIẾP TỤC / RESUME]. Các tab ĐÃ XONG sẽ ĐƯỢC BỎ QUA, chỉ các tab bị lỗi mới được chạy lại.`
      );
    }

    return outputs;
  }
}
