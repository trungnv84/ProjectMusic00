function compact(obj, maxCharsPerEntry = 500) {
  if (!obj || typeof obj !== 'object') return String(obj || '');
  const clean = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') {
      const t = v.replace(/\s+/g, ' ').trim();
      clean[k] = t.length > maxCharsPerEntry ? t.slice(0, maxCharsPerEntry) + '…[' + t.length + ']' : t;
    } else if (v && typeof v === 'object') clean[k] = compact(v, maxCharsPerEntry);
    else clean[k] = v;
  }
  return JSON.stringify(clean);
}

const JUDGE_SUCCINCT = `\n\n=== ĐỊNH DẠNG NGẮN GỌN (≤450 TỪ TỔNG) ===\n- Mục ## chỉ giữ 2-5 bullet, mỗi bullet 1-2 dòng.\n- Bỏ lời dẫn dư thừa, đi thẳng vào kết luận.\n- Nếu không chắc, viết gạch chân 1 dòng thay vì đoạn văn.`;

export function buildFinalJudgePrompt(question, round1, round2, round3, round4) {
  return `Bạn là CHỦ TỌA của Hội đồng 5 AI.\n\nVẤN ĐỀ:\n${question}\n\n=== ROUND 1 (suy nghĩ độc lập) ===\n${compact(round1)}\n\n=== ROUND 2 (phản biện) ===\n${compact(round2)}\n\n=== ROUND 3 (giải pháp) ===\n${compact(round3)}\n\n=== ROUND 4 (đánh giá) ===\n${compact(round4)}\n\nHãy tổng hợp khách quan. KHÔNG chọn theo đa số. Kiểm tra lập luận, bằng chứng, giả định, rủi ro; phát hiện khả năng cả hội đồng cùng sai.${JUDGE_SUCCINCT}\n\nKẾT QUẢ PHẢI CÓ 6 MỤC NGẮN:\n## KẾT LUẬN (1 phương án cuối, 1-2 dòng)\n## TẠI SAO CHỌN (2-3 lý do bullet)\n## CÁC PHƯƠNG ÁN ĐÃ LOẠI + lý do ngắn\n## RỦI RO (2-3 bullet, có cách giảm thiểu ngắn)\n## KẾ HOẠCH HÀNH ĐỘNG (3-5 bước cụ thể, 1 dòng mỗi bước)\n## THÔNG TIN CẦN BỔ SUNG (nếu có, ≤3 mục)`;
}

export function buildRedTeamPrompt(question, finalDecision) {
  const dec = typeof finalDecision === 'string' ? finalDecision.replace(/\s+/g, ' ').trim() : compact(finalDecision, 1500);
  return `Bạn là RED TEAM của Hội đồng 5 AI. Trả lời ≤250 TỪ, dùng BULLET.\n\nVẤN ĐỀ:\n${question}\n\nQUYẾT ĐỊNH HIỆN TẠI:\n${dec}\n\nHãy cố gắng chứng minh quyết định này SAI. Cho:\n- 2 giả định ẩn nguy hiểm nhất\n- 1 phản ví dụ cụ thể (nếu có)\n- 1 tình huống thất bại cạnh (edge case)\n→ Kết luận: quyết định còn đứng vững hay cần sửa điểm gì (ngắn gọn).`;
}
