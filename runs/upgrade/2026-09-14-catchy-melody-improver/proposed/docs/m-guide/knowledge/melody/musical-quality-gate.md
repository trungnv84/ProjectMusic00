---
id: KNOW.MELODY.QUALITY-GATE
type: knowledge
status: proposed
needs-approval: true
version: "1.3"
tags: [compose, melody, lyrics, vietnamese, harmony]
serves-steps: [3]
sources:
  - "https://doi.org/10.1525/mp.2024.2322897"
  - "https://pubmed.ncbi.nlm.nih.gov/36991289/"
  - "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.906190/full"
  - "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2017.00621/full"
last-updated: "2026-09-14"
---
# Music quality gate (cuối Bước 3)

`MusicXML PASS` ≠ `music_quality_gate PASS` ≠ `catchiness PASS`.

## Ngưỡng cứng bổ sung

| Id | Yêu cầu |
|---|---|
| `REQUIRE_CATCHINESS_REVIEW` | Có `catchiness_review` với reference analysis + ≥3 candidate + selected candidate |
| `REQUIRE_CATCHY_HOOK` | Hook đạt identity + rhythm + contour + singability ở mức chấp nhận được |
| `REQUIRE_HOOK_RHYTHMIC_IDENTITY` | Hook không chỉ là pitch contour trên onset grid chung của cả bài |
| `REQUIRE_CHORUS_PAYOFF` | Chorus tạo lift/payoff bằng ≥2 feature, trong đó ít nhất 1 feature là rhythmic/phrase/hook identity, không chỉ register |
| `REQUIRE_LISTENER_PROXIES` | Có hum/rhythm/sing-back/chorus/A-B/removal proxy results; không có FAIL ở test cốt lõi |
| `BLOCK_FAKE_VARIATION` | Không được PASS nếu chỉ dùng near-repeat để né exact repetition |
| `BLOCK_LOW_INFORMATION_HOOK` | Hook không được PASS chỉ vì có `hook_melody_cell` trên giấy |

## Catchiness score

Mỗi candidate chấm `0–4` cho:

`identity`, `rhythm`, `contour`, `chunkability`, `repetition_variation`, `singability`, `tension_release`, `chorus_payoff`.

Đề xuất ngưỡng:
- Không dimension nào dưới `2`.
- Trung bình ≥ `3.0`.
- `rhythm` + `identity` + `singability` trung bình ≥ `3.0`.
- Nếu `identity <= 1` hoặc `rhythm <= 1` hoặc `singability <= 1` → FAIL.

Các ngưỡng này là **đề xuất needs-approval**, không phải chân lý âm nhạc.

## Candidate selection

Không xuất candidate đầu tiên nếu có ≥2 candidate tốt hơn theo review. Phải ghi rõ lý do chọn.

## Self-assessment caution

AI tự chấm không phải bằng chứng khách quan về listener memory. Vì vậy gate phải yêu cầu evidence từ cấu trúc melody + proxy tests, và cuối Bước 3 vẫn phải để user nghe/duyệt.

## Related
- `KNOW.MELODY.CATCHINESS`
- `KNOW.MELODY.ANTI-PATTERNS`
- `KNOW.MELODY.INVENTION`
- `KNOW.MELODY.PHRASE-STRUCTURE`
