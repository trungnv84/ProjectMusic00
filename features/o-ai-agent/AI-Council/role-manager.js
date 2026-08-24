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
  roles.judge = 'chatgpt';
  roles.redTeam = 'claude';
  return roles;
}

function commonHeader(providerRole, question) {
  return `Bạn là ${providerRole} trong Hội đồng 5 AI.\n\nVẤN ĐỀ:\n${question}\n\nQuy tắc: ưu tiên logic, bằng chứng, tính khả thi; không đồng ý chỉ vì AI khác đã nói; chỉ ra điều chưa chắc chắn.`;
}

export function buildRoundPrompts(question, roles, round, data = {}) {
  const out = {};
  if (round === 'round1') {
    for (const [provider, role] of Object.entries(roles)) {
      if (['judge', 'redTeam'].includes(provider)) continue;
      out[provider] = `${commonHeader(role, question)}\n\nROUND 1 - SUY NGHĨ ĐỘC LẬP\nTrình bày: vấn đề cốt lõi, dữ kiện, điều chưa biết, giả định, phân tích, phương án, phương án nghiêng về, điểm chưa chắc chắn.`;
    }
  }
  if (round === 'round2') {
    const r1 = JSON.stringify(data, null, 2);
    for (const [provider, role] of Object.entries(roles)) {
      if (['judge', 'redTeam'].includes(provider)) continue;
      out[provider] = `${commonHeader("Devil's Advocate / Reviewer", question)}\n\nROUND 2 - PHẢN BIỆN CHÉO\nDưới đây là kết quả Round 1 của các AI:\n${r1}\n\nPhản biện mạnh nhưng công bằng: điểm mạnh, điểm yếu, lỗi, giả định chưa chứng minh, rủi ro, điều bỏ sót và kết luận sau phản biện.`;
    }
  }
  if (round === 'round3') {
    out.deepseek = `${commonHeader('Solution Architect', question)}\n\nROUND 3 - XÂY DỰNG GIẢI PHÁP\n${JSON.stringify(data, null, 2)}\n\nTạo 1-3 phương án có thể thực thi. Đánh giá lợi ích, chi phí, thời gian, độ khó, rủi ro, khả năng thành công, điều kiện thành công.`;
    out.gemini = `${commonHeader('Researcher / Fact Checker', question)}\n\nROUND 3 - KIỂM TRA BẰNG CHỨNG VÀ BỔ SUNG\n${JSON.stringify(data, null, 2)}\n\nChỉ ra dữ kiện cần kiểm chứng và chỉnh các giả định yếu. Sau đó đề xuất phương án.`;
    out.chatgpt = `${commonHeader('Strategist', question)}\n\nROUND 3 - CHIẾN LƯỢC\n${JSON.stringify(data, null, 2)}\n\nHợp nhất lập luận và tạo các phương án chiến lược.`;
    out.claude = `${commonHeader("Devil's Advocate", question)}\n\nROUND 3 - THIẾT KẾ THEO GÓC NHÌN PHẢN BIỆN\n${JSON.stringify(data, null, 2)}\n\nChỉ ra điều kiện khiến từng phương án thất bại và cách giảm rủi ro.`;
    out.grok = `${commonHeader('Trend / Counter-example Analyst', question)}\n\nROUND 3 - KỊCH BẢN NGƯỢC\n${JSON.stringify(data, null, 2)}\n\nTìm counter-example và các kịch bản làm thay đổi lựa chọn.`;
  }
  if (round === 'round4') {
    const payload = JSON.stringify(data, null, 2);
    for (const provider of ['chatgpt', 'claude', 'gemini', 'grok', 'deepseek']) {
      out[provider] = `${commonHeader('Evaluator', question)}\n\nROUND 4 - ĐÁNH GIÁ\n${payload}\n\nChuẩn hóa phương án, loại bỏ phương án không khả thi, chấm điểm theo hiệu quả, chi phí, thực thi, tốc độ, rủi ro, mở rộng, bền vững. Tự đặt trọng số. Xếp hạng và nêu trade-off.`;
    }
  }
  return out;
}
