const ROLE_LIBRARY = [
  'Strategic Analyst', 'Devil\'s Advocate', 'Solution Architect', 'Evaluator', 'Researcher',
  'Market Analyst', 'Financial Analyst', 'Risk Analyst', 'Fact Checker', 'Logic Checker',
  'Security Expert', 'Performance Expert', 'Reviewer', 'Trend Analyst', 'Counter-example Analyst'
];

const providerDefaults = {
  chatgpt: 'Strategic Analyst',
  claude: "Devil's Advocate",
  gemini: 'Researcher',
  grok: 'Trend Analyst',
  deepseek: 'Logic Checker'
};

export function chooseRoles(question, providers) {
  const q = question.toLowerCase();
  const programming = /(code|coding|bug|software|api|database|mongodb|typescript|javascript|go|php|architecture)/.test(q);
  const business = /(business|kinh doanh|đầu tư|investment|doanh thu|roi|thị trường)/.test(q);
  const legal = /(luật|pháp lý|hợp đồng|legal|contract|tranh chấp)/.test(q);

  // Seeded RNG cho xoay vòng role & thứ tự (vẫn ổn định cho cùng 1 question)
  const seed = Array.from(question).reduce((a, c) => a + c.charCodeAt(0), 0) || 1;
  const rand = (() => { let s = seed; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; })();
  const shuffled = [...providers].sort(() => rand() - 0.5);

  const roles = {};
  for (const p of providers) roles[p] = providerDefaults[p] || ROLE_LIBRARY[0];
  if (programming) {
    roles.chatgpt = 'Software Architect';
    roles.claude = 'Code Reviewer';
    roles.gemini = 'Researcher';
    roles.grok = 'Edge-case Finder';
    roles.deepseek = 'Debugger';
  } else if (business) {
    roles.chatgpt = 'Strategist';
    roles.claude = "Devil's Advocate";
    roles.gemini = 'Market Analyst';
    roles.grok = 'Trend Analyst';
    roles.deepseek = 'Financial Analyst';
  } else if (legal) {
    roles.chatgpt = 'Case Analyst';
    roles.claude = 'Legal Reasoner';
    roles.gemini = 'Researcher';
    roles.grok = 'Counter-example Analyst';
    roles.deepseek = 'Logic Checker';
  }
  // Xoay vòng role Round3 theo seed (mỗi question có thứ tự khác nhau)
  const round3RolesSeed = ['Solution Architect', 'Researcher / Fact Checker', 'Strategist', "Devil's Advocate", 'Trend / Counter-example Analyst'];
  const shuffledRoles = [...round3RolesSeed].sort(() => rand() - 0.5);
  providers.forEach((p, i) => { if (shuffledRoles[i]) roles[p + '__round3'] = shuffledRoles[i]; });

  // Judge & RedTeam xoay vòng theo seed (không còn cứng ChatGPT=Judge, Claude=RedTeam)
  roles.judge = shuffled[0] || 'chatgpt';
  roles.redTeam = shuffled[1] || 'claude';
  if (roles.redTeam === roles.judge) roles.redTeam = shuffled[2] || providers.find(p => p !== roles.judge) || 'claude';
  roles.speakingOrder = shuffled;
  return roles;
}

const SUCCINCT_RULE = `

=== NGẮN GỌN & TIẾT KIỆM TOKEN ===
TOÀN BỘ TRẢ LỜI ≤ 300 TỪ. KHÔNG dùng chào hỏi, không dùng disclaimer kiểu "tôi là AI", không lặp lại câu hỏi.
- Dùng BULLET LIST (- hoặc •) thay vì đoạn văn dài.
- Mỗi ý 1-2 câu, TIN GỌN, ĐỦ Ý.
- Ưu tiên từ khóa + kết luận; bỏ qua filler words ("do đó", "như vậy", "tóm lại",...).
- Nếu tham chiếu AI khác, viết ngắn gọn: GPT nói X, nhưng có vấn đề Y → kết luận Z.`;

function compactJSON(obj, maxCharsPerEntry = 600) {
  if (!obj || typeof obj !== 'object') return String(obj || '');
  const clean = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') {
      const trimmed = v.replace(/\s+/g, ' ').trim();
      clean[k] = trimmed.length > maxCharsPerEntry ? trimmed.slice(0, maxCharsPerEntry) + '…[' + trimmed.length + 'chữ]' : trimmed;
    } else if (v && typeof v === 'object') {
      clean[k] = compactJSON(v, maxCharsPerEntry);
    } else clean[k] = v;
  }
  return JSON.stringify(clean);
}

function commonHeader(providerRole, question) {
  return `Bạn là ${providerRole} trong Hội đồng 5 AI.\n\nVẤN ĐỀ:\n${question}\n\nQuy tắc: ưu tiên logic, bằng chứng, tính khả thi; không đồng ý chỉ vì AI khác đã nói; chỉ ra điều chưa chắc chắn.${SUCCINCT_RULE}`;
}

export function buildRoundPrompts(question, roles, round, data = {}) {
  const out = {};
  const providerList = (roles.speakingOrder && roles.speakingOrder.length === 5) ? roles.speakingOrder : ['chatgpt', 'claude', 'gemini', 'grok', 'deepseek'];
  const skipKeys = new Set(['judge', 'redTeam', 'speakingOrder', ...Object.keys(roles).filter(k => k.endsWith('__round3'))]);

  if (round === 'round1') {
    for (const provider of providerList) {
      const role = roles[provider] || 'Analyst';
      out[provider] = `${commonHeader(role, question)}\n\nROUND 1 - SUY NGHĨ ĐỘC LẬP. Danh sách ngắn gọn:\n- vấn đề cốt lõi (1 dòng)\n- 2-3 giả định chính\n- phân tích (2-3 bullet)\n- 1-2 phương án + nghiêng về cái nào\n- 1 điểm chưa chắc chắn`;
    }
  }
  if (round === 'round2') {
    const r1 = compactJSON(data.round1 || data, 500);
    for (const provider of providerList) {
      out[provider] = `${commonHeader("Devil's Advocate / Reviewer", question)}\n\nROUND 2 - PHẢN BIỆN CHÉO. Round 1 các AI:\n${r1}\n\nChỉ ra:\n- 2 điểm mạnh đáng giá\n- 2-3 lỗi / giả định yếu / rủi ro\n- 1 điều bỏ sót\n- kết luận ngắn sau phản biện`;
    }
  }
  if (round === 'round3') {
    const payload = compactJSON(data, 500);
    const r3Roles = {};
    for (const p of providerList) r3Roles[p] = roles[p + '__round3'] || roles[p] || 'Solution Architect';
    const taskByRole = {
      'Solution Architect': 'Tạo 1-3 phương án có thể thực thi. Bullet ngắn: lợi ích, chi phí, rủi ro.',
      'Researcher / Fact Checker': 'Chỉ ra 2-3 dữ kiện cần kiểm chứng + 2 giả định yếu cần điều chỉnh. Đề xuất phương án.',
      'Strategist': 'Hợp nhất lập luận thành 2 phương án chiến lược chính với trade-off ngắn.',
      "Devil's Advocate": 'Chỉ ra 2 điều kiện làm phương án thất bại + cách giảm rủi ro cho mỗi cái.',
      'Trend / Counter-example Analyst': 'Cho 1-2 counter-example và 1 kịch bản ngược làm thay đổi lựa chọn.'
    };
    for (const provider of providerList) {
      const roleName = r3Roles[provider];
      const task = taskByRole[roleName] || 'Đề xuất 2 phương án cải tiến và lý do ngắn.';
      out[provider] = `${commonHeader(roleName, question)}\n\nROUND 3 - ${roleName.toUpperCase()}\nDữ liệu:\n${payload}\n\n${task}`;
    }
  }
  if (round === 'round4') {
    const payload = compactJSON(data, 500);
    for (const provider of providerList) {
      out[provider] = `${commonHeader('Evaluator', question)}\n\nROUND 4 - ĐÁNH GIÁ. Dữ liệu:\n${payload}\n\n- Loại bỏ phương án không khả thi (nêu tên + 1 lý do)\n- Top 2 phương án: chấm điểm (1-10) cho 3 tiêu chí: hiệu quả, dễ thực thi, ít rủi ro\n- Xếp hạng cuối + 1 trade-off chính`;
    }
  }
  return out;
}
