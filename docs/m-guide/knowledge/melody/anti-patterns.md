---
id: KNOW.MELODY.ANTI-PATTERNS
type: knowledge
status: active
version: "1.2"
tags: [compose, melody]
serves-steps: [3]
sources:
  - "runs/compose/2026-09-08-vi-yeu-la-vui/"
  - "runs/upgrade/2026-09-08-compose-quality/fixtures/melody-too-repetitive.md"
  - "runs/compose/2026-09-08-nang-som-tinh-khoi/"
  - "runs/upgrade/2026-09-14-nang-som-tinh-khoi-catchy/run-review.md"
  - "docs/m-guide/knowledge/melody/catchiness.md"
last-updated: "2026-09-14"
---

# Giai điệu — anti-patterns (chất lượng sáng tác)

> **AI:** Đọc bắt buộc ở Bước 3. MusicXML hợp lệ **không** miễn các FAIL dưới đây. Vi phạm có hệ thống → `music_quality_gate: FAIL` → **viết lại** lead sheet (đổi motif/hook trong cùng Bước 3), **không** sửa vài nốt rồi xuất lại. Xem [melody-invention](melody-invention.md) và [catchiness](catchiness.md).

## Dùng ở bước nào

- Bước 3 — khi invent và khi tự chấm quality gate.

## Constraints

| # | Anti-pattern | FAIL khi |
|---|--------------|----------|
| 1 | Skeleton lặp Verse | ≥3 câu liên tiếp (hoặc ≥50% câu Verse) dùng **cùng** pitch-cell + rhythm-cell, chỉ thay lời |
| 2 | Chorus copy | `CHORUS` / `CHORUS_2` / `FINAL_CHORUS` **≥90% note trùng pitch VÀ rhythm theo cùng thứ tự** (không chỉ "gần giống" định tính) mà Final **không** có ≥1 kỹ thuật phát triển thật (sequence, fragmentation, đổi cadence, augmentation/diminution, đảo khoảng…) — chỉ nâng register không đủ |
| 3 | Bridge giả | Bridge chỉ đổi vùng pitch / vòng hợp âm nhưng giữ cùng syllable→note count + cùng nhịp câu như Verse |
| 4 | Triple loop | Melody loop + harmony loop + rhythm loop **đồng thời** trên nhiều section mà không có variation có chủ đích |
| 5 | Tone offset máy móc | Dùng công thức kiểu `sắc=+1, huyền=-1` độc lập từng âm tiết và gọi đó là “đã xử lý thanh” |
| 6 | Hook thiếu / không memorable | Chorus không có câu nhạc chủ đạo dễ nhớ (pitch+rhythm cell khai báo được) trước khi lặp section; hoặc cell khai báo nhưng không muốn ngân nga (xem [catchiness](catchiness.md)) |
| 7 | Patch-and-export | Sửa vài nốt rời trên bản đã FAIL chất lượng rồi coi là bài mới — cấm; phải invent lại ý nhạc |
| 8 | Template-from-docs | Lấy ví dụ pitch trong knowledge/style card làm giai điệu thật của bài |
| 9 | Verse-pair clone qua reprise | Verse 2 (hoặc reprise bất kỳ) lặp **y hệt cả 4 câu** skeleton của Verse 1 chỉ đổi lời — kể cả khi mỗi câu riêng lẻ không phạm rule #1 (vì chỉ 2 câu liên tiếp/lần); phải so Verse 1 với Verse 2 theo **cặp câu tương ứng**, không chỉ trong nội bộ từng Verse |
| 10 | Phrase rời rạc (disjointed) | Các câu trong cùng section không chia sẻ DNA motif (contour / rhythm cell / interval pattern); nghe như chuỗi phrase độc lập không liên kết |
| 11 | Lặp không identity | Lặp lại cell dài hoặc lặp nhiều lần nhưng cell gốc **không** có đặc trưng catchy (không clear contour, không rhythmic identity, pitch set quá rộng / nhảy lung tung) — lặp nhàm ≠ hook |

Ví dụ tiêu cực: fixture `melody-too-repetitive` (skeleton kiểu `F–G–F–E–C` lặp) — đó là **phản ví dụ**, không phải mẫu để bắt chước. Ví dụ thật đã gặp: run `2026-09-08-nang-som-tinh-khoi` — Verse 1 (M1-M4) và Verse 2 (M17-M20) trùng pitch+rhythm 100% theo từng ô nhịp (rule #9); Chorus Final (M25-M28) trùng 100% Chorus 1 (M9-M12) không có kỹ thuật phát triển (rule #2) — xem `runs/upgrade/2026-09-14-nang-som-tinh-khoi-catchy/run-review.md`.

## Hợp lệ

- A/A' có chủ đích sau khi hook/motif đã memorable — ghi trong notes.
- Sequence / fragmentation / cadence change / inversion / augmentation / diminution là biến thể hợp lệ; copy nguyên xi không phải "hook".
- Repetition rhythm với thay đổi pitch/phrase ending để tạo identity + variation.

## Gate rule

`rule #10` (phrase rời rạc) và `rule #11` (lặp không identity) phải được xem xét **độc lập** với exact skeleton repetition (rule #1/#2). Không được PASS chỉ vì "không có ≥3 câu giống hệt nhau" — một melody vẫn có thể chán khi pitch khác nhưng rhythm, onset density, contour family và cadence đều phẳng.

## Cách áp dụng

1. Invent theo melody-invention + catchiness; ghi `motifs_declared` + `hook_melody_cell` trong notes.
2. Sau XML, so skeleton các câu cùng section (kể cả so Verse 1 với Verse 2 theo cặp câu — rule #9) + kiểm coherence.
3. FAIL → đổi ý nhạc (kể cả hook cell), xuất lại cả lead sheet trong cùng Bước 3.

## Related

- `KNOW.MELODY.INVENTION`
- `KNOW.MELODY.CATCHINESS`
- `KNOW.MELODY.QUALITY-GATE`
- `KNOW.MELODY.COMPOSITION-PLANNING`
- `KNOW.MELODY.MOTIF-DEVELOPMENT`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`
