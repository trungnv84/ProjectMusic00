---
id: PROMPT.IMPROVER
type: prompt
status: proposed
needs-approval: true
version: "0.1"
tags: [prompt, improver]
serves-steps: [2]
sources:
  - "https://doi.org/10.1525/mp.2024.2322897"
  - "https://pubmed.ncbi.nlm.nih.gov/36991289/"
  - "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.906190/full"
last-updated: "2026-09-14"
---
# Prompt Improver — bổ sung chuẩn catchy

Khi user báo melody nhạt/rời rạc/không catchy, Improver phải kiểm tra riêng lỗi **low-information melody / weak hook** chứ không chỉ tìm exact repetition.

Improver phải hỏi qua artifact:
- Hook có rhythmic fingerprint không?
- Hook có contour identity không?
- Chorus có payoff không?
- Các phrase có near-repeat không?
- Candidate đầu tiên có được thử thách bằng candidate độc lập không?
- Có reference-song analysis trước khi invent không?
- Gate có evidence hay chỉ là checkbox tự khai?

Nếu chưa có, ưu tiên đề xuất:
1. `KNOW.MELODY.CATCHINESS`
2. multi-candidate Step 3 loop
3. catchiness evidence trong quality gate
4. near-repeat / fake-variation anti-patterns

Mọi reference external đã dùng phải có URL cụ thể trong proposal/changelog.
