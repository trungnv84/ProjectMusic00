import { scanProviderTabs } from './tab-controller.js';
import { buildRoundPrompts, chooseRoles } from './role-manager.js';
import { DebateEngine } from './debate-engine.js';
import { buildFinalJudgePrompt, buildRedTeamPrompt } from './judge.js';

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
      final: null
    });

    try {
      const tabs = await scanProviderTabs();
      const roles = chooseRoles(question, tabs.map((x) => x.provider));
      await this.persist({ assignments: roles, tabs });
      await this.log(`Đã tìm thấy ${tabs.length}/5 tab AI.`);
      if (tabs.length < 5) throw new Error(`Cần đủ 5 tab AI. Hiện có: ${tabs.map(x => x.provider).join(', ') || '0'}.`);

      const round1 = await this.runRound('ROUND 1 - ĐỘC LẬP', buildRoundPrompts(question, roles, 'round1'), tabs);
      if (!this.running) return this.state;

      const round2 = await this.runRound('ROUND 2 - PHẢN BIỆN', buildRoundPrompts(question, roles, 'round2', round1), tabs);
      if (!this.running) return this.state;

      const round3 = await this.runRound('ROUND 3 - GIẢI PHÁP', buildRoundPrompts(question, roles, 'round3', { round1, round2 }), tabs);
      if (!this.running) return this.state;

      const round4 = await this.runRound('ROUND 4 - ĐÁNH GIÁ', buildRoundPrompts(question, roles, 'round4', { round1, round2, round3 }), tabs);
      if (!this.running) return this.state;

      const judgePrompt = buildFinalJudgePrompt(question, round1, round2, round3, round4);
      const round5 = await this.runRound('ROUND 5 - CHỦ TỌA', { [roles.judge]: judgePrompt }, tabs);
      if (!this.running) return this.state;

      const redPrompt = buildRedTeamPrompt(question, round5[roles.judge]);
      const redTeam = await this.runRound('ROUND 6 - RED TEAM', { [roles.redTeam]: redPrompt }, tabs);
      if (!this.running) return this.state;

      const finalPrompt = `${judgePrompt}\n\n=== RED TEAM ===\n${redTeam[roles.redTeam] || ''}\n\nHãy xem xét phản biện Red Team. Nếu cần hãy thay đổi quyết định. Nếu không cần, giải thích vì sao. Đưa ra phiên bản quyết định cuối cùng.`;
      const final = await this.runRound('ROUND 7 - FINAL JUDGE', { [roles.judge]: finalPrompt }, tabs);

      await this.persist({ status: 'completed', phase: 'done', endedAt: Date.now(), final: final[roles.judge] || '', transcript: { round1, round2, round3, round4, round5, redTeam, final } });
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

  async runRound(label, prompts, tabs) {
    await this.persist({ phase: label });
    await this.log(label);
    const outputs = {};
    for (const tab of tabs) {
      if (!this.running) throw new Error('Đã dừng cuộc họp.');
      const prompt = prompts[tab.provider];
      if (!prompt) continue;
      await this.log(`→ ${tab.provider}: gửi nhiệm vụ.`);
      outputs[tab.provider] = await this.debate.ask(tab, prompt);
      await this.log(`← ${tab.provider}: nhận kết quả.`);
    }
    return outputs;
  }
}
