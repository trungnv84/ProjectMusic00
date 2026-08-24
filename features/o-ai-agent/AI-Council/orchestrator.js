import { scanProviderTabs } from './tab-controller.js';
import { buildRoundPrompts, chooseRoles } from './role-manager.js';
import { DebateEngine } from './debate-engine.js';
import { buildFinalJudgePrompt, buildRedTeamPrompt } from './judge.js';

const ROUND_KEYS = ['round1', 'round2', 'round3', 'round4', 'round5', 'redTeam', 'final'];
const ROUND_LABELS = {
  round1: 'ROUND 1 - ĐỘC LẬP',
  round2: 'ROUND 2 - PHẢN BIỆN',
  round3: 'ROUND 3 - GIẢI PHÁP',
  round4: 'ROUND 4 - ĐÁNH GIÁ',
  round5: 'ROUND 5 - CHỦ TỌA',
  redTeam: 'ROUND 6 - RED TEAM',
  final: 'ROUND 7 - FINAL JUDGE'
};

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
    }
  }

  async scanAllSnapshots() {
    const tabs = await scanProviderTabs();
    if (tabs.length < 5) throw new Error(`Cần đủ 5 tab AI. Hiện có: ${tabs.map(x => x.provider).join(', ') || '0'}.`);
    const out = [];
    for (const tab of tabs) {
      out.push(await this.debate.recoverSnapshot(tab));
    }
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

    const firstMissing = ROUND_KEYS.find(k => !transcript[k]);
    const resumeCheckpoint = firstMissing ? { roundKey: firstMissing, done: [] } : null;

    this.running = true;
    const entryMsg = `🛠 KHÔI PHỤC THỦ CÔNG: ${Object.keys(transcript).length}/7 round đã được user gán kết quả.`;
    const logStart = [
      ...(await this.getState()).log || [],
      { at: Date.now(), message: entryMsg },
      { at: Date.now(), message: `Tiếp tục từ: ${resumeCheckpoint ? ROUND_LABELS[resumeCheckpoint.roundKey] : 'tất cả đã xong'}.` }
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
    }
  }

  async runAllRounds(question, roles, tabs, existingTranscript, resumeCheckpoint = null) {
    const transcript = { ...existingTranscript };

    const startIdx = resumeCheckpoint?.roundKey ? ROUND_KEYS.indexOf(resumeCheckpoint.roundKey) : 0;
    const effectiveStart = startIdx === -1 ? 0 : startIdx;

    if (effectiveStart === 0 && !transcript.round1) {
      transcript.round1 = await this.runRoundWithCheckpoint('round1',
        buildRoundPrompts(question, roles, 'round1'),
        tabs,
        (resumeCheckpoint && resumeCheckpoint.roundKey === 'round1') ? (resumeCheckpoint.done || []) : []
      );
      if (!this.running) return transcript;
    } else if (!transcript.round1 && effectiveStart > 0) {
      throw new Error('Không có kết quả Round 1 trong transcript, không thể resume.');
    }

    if (effectiveStart <= 1 && !transcript.round2) {
      transcript.round2 = await this.runRoundWithCheckpoint('round2',
        buildRoundPrompts(question, roles, 'round2', transcript.round1),
        tabs,
        (resumeCheckpoint && resumeCheckpoint.roundKey === 'round2') ? (resumeCheckpoint.done || []) : []
      );
      if (!this.running) return transcript;
    }

    if (effectiveStart <= 2 && !transcript.round3) {
      transcript.round3 = await this.runRoundWithCheckpoint('round3',
        buildRoundPrompts(question, roles, 'round3', { round1: transcript.round1, round2: transcript.round2 }),
        tabs,
        (resumeCheckpoint && resumeCheckpoint.roundKey === 'round3') ? (resumeCheckpoint.done || []) : []
      );
      if (!this.running) return transcript;
    }

    if (effectiveStart <= 3 && !transcript.round4) {
      transcript.round4 = await this.runRoundWithCheckpoint('round4',
        buildRoundPrompts(question, roles, 'round4', { round1: transcript.round1, round2: transcript.round2, round3: transcript.round3 }),
        tabs,
        (resumeCheckpoint && resumeCheckpoint.roundKey === 'round4') ? (resumeCheckpoint.done || []) : []
      );
      if (!this.running) return transcript;
    }

    const judgePrompt = buildFinalJudgePrompt(question, transcript.round1, transcript.round2, transcript.round3, transcript.round4);

    if (effectiveStart <= 4 && !transcript.round5) {
      transcript.round5 = await this.runRoundWithCheckpoint('round5',
        { [roles.judge]: judgePrompt },
        tabs,
        (resumeCheckpoint && resumeCheckpoint.roundKey === 'round5') ? (resumeCheckpoint.done || []) : []
      );
      if (!this.running) return transcript;
    }

    const redPrompt = buildRedTeamPrompt(question, transcript.round5?.[roles.judge] || '');

    if (effectiveStart <= 5 && !transcript.redTeam) {
      transcript.redTeam = await this.runRoundWithCheckpoint('redTeam',
        { [roles.redTeam]: redPrompt },
        tabs,
        (resumeCheckpoint && resumeCheckpoint.roundKey === 'redTeam') ? (resumeCheckpoint.done || []) : []
      );
      if (!this.running) return transcript;
    }

    const finalPrompt = `${judgePrompt}\n\n=== RED TEAM ===\n${transcript.redTeam?.[roles.redTeam] || ''}\n\nHãy xem xét phản biện Red Team. Nếu cần hãy thay đổi quyết định. Nếu không cần, giải thích vì sao. Đưa ra phiên bản quyết định cuối cùng.`;

    if (effectiveStart <= 6 && !transcript.final) {
      transcript.final = await this.runRoundWithCheckpoint('final',
        { [roles.judge]: finalPrompt },
        tabs,
        (resumeCheckpoint && resumeCheckpoint.roundKey === 'final') ? (resumeCheckpoint.done || []) : []
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

    for (const tab of tabs) {
      if (!this.running) throw new Error('Đã dừng cuộc họp.');
      const prompt = prompts[tab.provider];
      if (!prompt) continue;

      if (done.has(tab.provider) && outputs[tab.provider]) {
        await this.log(`↩ ${tab.provider}: Đã có kết quả trước đó, bỏ qua.`);
        continue;
      }

      const recovered = await this.debate.tryRecoverLastResponse(tab);
      if (recovered.recovered && recovered.text && outputs[tab.provider] !== recovered.text) {
        outputs[tab.provider] = recovered.text;
        await this.log(`♻ ${tab.provider}: Đã đọc lại nội dung có sẵn trên tab (không gửi lại prompt).`);
        await this.persist({
          transcript: { ...this.state.transcript, [roundKey]: outputs },
          checkpoint: { roundKey, done: Object.keys(outputs) }
        });
        continue;
      }

      await this.log(`→ ${tab.provider}: gửi nhiệm vụ.`);
      outputs[tab.provider] = await this.debate.ask(tab, prompt);
      await this.log(`← ${tab.provider}: nhận kết quả.`);
      await this.persist({
        transcript: { ...this.state.transcript, [roundKey]: outputs },
        checkpoint: { roundKey, done: Object.keys(outputs) }
      });
    }

    return outputs;
  }
}
