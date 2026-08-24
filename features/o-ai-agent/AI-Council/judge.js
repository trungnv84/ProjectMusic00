export function buildFinalJudgePrompt(question, round1, round2, round3, round4) {
  return `Bạn là CHỦ TỌA của Hội đồng 5 AI.\n\nVẤN ĐỀ:\n${question}\n\n=== ROUND 1 ===\n${JSON.stringify(round1, null, 2)}\n\n=== ROUND 2 ===\n${JSON.stringify(round2, null, 2)}\n\n=== ROUND 3 ===\n${JSON.stringify(round3, null, 2)}\n\n=== ROUND 4 ===\n${JSON.stringify(round4, null, 2)}\n\nHãy tổng hợp khách quan. Không chọn theo đa số. Kiểm tra lập luận, bằng chứng, giả định, rủi ro, tính khả thi; phát hiện khả năng cả hội đồng cùng sai.\n\nKẾT QUẢ PHẢI CÓ:\n## KẾT LUẬN\n## TẠI SAO CHỌN PHƯƠNG ÁN NÀY\n## CÁC PHƯƠNG ÁN ĐÃ LOẠI\n## RỦI RO\n## KẾ HOẠCH HÀNH ĐỘNG\n## THÔNG TIN CẦN BỔ SUNG`;
}

export function buildRedTeamPrompt(question, finalDecision) {
  return `Bạn là RED TEAM của Hội đồng 5 AI.\n\nVẤN ĐỀ:\n${question}\n\nQUYẾT ĐỊNH HIỆN TẠI:\n${finalDecision}\n\nHãy cố gắng chứng minh quyết định này SAI. Tìm giả định ẩn, phản ví dụ, rủi ro cuối cùng và tình huống thất bại. Nếu không thể phá vỡ, giải thích tại sao quyết định vẫn đứng vững.`;
}
