---
id: KNOW.MELODY.ANTI-PATTERNS
type: knowledge
status: active
version: "1.0"
tags: [compose, melody]
serves-steps: [3]
sources:
  - "runs/compose/2026-09-08-vi-yeu-la-vui/"
  - "runs/upgrade/2026-09-08-compose-quality/fixtures/melody-too-repetitive.md"
last-updated: "2026-09-08"
needs-approval: true
---

# Giai điệu — anti-patterns (chất lượng sáng tác)

> **AI:** Đọc bắt buộc ở Bước 3 (pha 3a–3c). MusicXML hợp lệ **không** miễn các FAIL dưới đây. Vi phạm có hệ thống → `music_quality_gate: FAIL` → regenerate từ `03a-composition-plan.md`, **không** sửa vài nốt rồi xuất lại.

## Dùng ở bước nào

- Bước 3 — trước và sau khi viết lead sheet; kiểm trong quality gate.

## Constraints

| # | Anti-pattern | FAIL khi |
|---|--------------|----------|
| 1 | Skeleton lặp Verse | ≥3 câu liên tiếp (hoặc ≥50% câu Verse) dùng **cùng** pitch-cell + rhythm-cell, chỉ thay lời |
| 2 | Chorus copy | `CHORUS` / `CHORUS_2` / `FINAL_CHORUS` gần như cùng pitch sequence mà Final **không** có ≥1 kỹ thuật phát triển thật (xem motif-development) — chỉ nâng register không đủ |
| 3 | Bridge giả | Bridge chỉ đổi vùng pitch / vòng hợp âm nhưng giữ cùng syllable→note count + cùng nhịp câu như Verse |
| 4 | Triple loop | Melody loop + harmony loop + rhythm loop **đồng thời** trên nhiều section mà không có variation có chủ đích |
| 5 | Tone offset máy móc | Dùng công thức kiểu `sắc=+1, huyền=-1` độc lập từng âm tiết và gọi đó là “đã xử lý thanh” |
| 6 | Hook thiếu | Chorus không có câu nhạc chủ đạo dễ nhớ (pitch+rhythm cell khai báo được) trước khi lặp section |
| 7 | Patch-and-export | Sửa vài nốt rời trên bản đã FAIL chất lượng rồi coi là bài mới — cấm; phải quay lại plan |

Ví dụ tiêu cực chuẩn: [fixtures/melody-too-repetitive](../../../../runs/upgrade/2026-09-08-compose-quality/fixtures/melody-too-repetitive.md) (skeleton `F–G–F–E–C` / `F–F–F–E–C`).

## Hints

- Lặp **có chủ đích** (A → A') sau khi hook/motif đã memorable thì được — ghi rõ trong plan.
- Sequence / fragmentation / cadence change là biến thể hợp lệ; copy nguyên xi không phải “hook”.

## Cách áp dụng

1. Khai báo motif cells trong `03a`.
2. Sau khi có XML, so skeleton các câu cùng section.
3. Nếu khớp bảng FAIL → ghi gate FAIL và regenerate từ 3a.

## Related

- `KNOW.MELODY.QUALITY-GATE`
- `KNOW.MELODY.COMPOSITION-PLANNING`
- `KNOW.MELODY.MOTIF-DEVELOPMENT`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`
