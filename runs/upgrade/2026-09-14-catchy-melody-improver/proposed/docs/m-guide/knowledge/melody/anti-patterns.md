---
id: KNOW.MELODY.ANTI-PATTERNS
type: knowledge
status: proposed
needs-approval: true
version: "1.2"
tags: [compose, melody]
serves-steps: [3]
sources:
  - "https://doi.org/10.1525/mp.2024.2322897"
  - "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2017.00621/full"
last-updated: "2026-09-14"
---
# Giai điệu — anti-patterns

> **AI:** Exact repetition không phải lỗi duy nhất. Một melody vẫn có thể chán khi pitch khác nhưng **rhythm, onset density, contour family và cadence đều phẳng**.

Kế thừa toàn bộ anti-pattern hiện có và bổ sung:

| Anti-pattern | FAIL khi |
|---|---|
| `NEAR_REPEAT_FAMILY` | ≥3 phrase liên tiếp giữ cùng rhythm profile + contour profile + phrase length, dù pitch khác nhẹ |
| `CONSTANT_ONSET_GRID` | Một section dài dùng gần như một onset grid đều, không có pickup/rest/syncopation/cadential contrast phù hợp |
| `CADENCE_MONOTONY` | ≥3 phrase kết cùng kiểu cadence/register mà không có mục đích thẩm mỹ |
| `LOW_INFORMATION_HOOK` | Hook có cell khai báo nhưng không có rhythmic identity/contour identity đủ khác phần còn lại |
| `CHORUS_LIFT_WITHOUT_PAYOFF` | Chorus chỉ cao hơn Verse mà không tăng salience hoặc thay đổi phrase/rhythm/payoff |
| `FAKE_VARIATION` | Chỉ đổi 1–2 nốt/register để tránh exact-match nhưng trải nghiệm vẫn gần như cùng một phrase |
| `HOOK_TOO_LATE` | Bài không trình bày/foreshadow một recognizable hook hoặc hook concept đủ sớm trong form để người nghe ghi nhớ |
| `REFERENCE_SHADOW` | Melody quá gần feature pattern độc bản của một reference song thay vì chỉ dùng abstract principles |

## Hợp lệ
- A/A' có chủ đích.
- Repetition sau khi hook đã được establish.
- Sequence/fragmentation/inversion/augmentation/diminution.
- Repetition rhythm với thay đổi pitch/phrase ending để tạo identity + variation.

## Gate rule
`FAKE_VARIATION` và `LOW_INFORMATION_HOOK` phải được xem xét độc lập với exact skeleton repetition. Không được PASS chỉ vì “không có ≥3 câu giống hệt nhau”.

## Related
- `KNOW.MELODY.CATCHINESS`
- `KNOW.MELODY.QUALITY-GATE`
- `KNOW.MELODY.INVENTION`
