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
| 2 | Chorus copy | `CHORUS` / `CHORUS_2` / `FINAL_CHORUS` gần như cùng pitch sequence mà Final **không** có ≥1 kỹ thuật phát triển thật — chỉ nâng register không đủ |
| 3 | Bridge giả | Bridge chỉ đổi vùng pitch / vòng hợp âm nhưng giữ cùng syllable→note count + cùng nhịp câu như Verse |
| 4 | Triple loop | Melody loop + harmony loop + rhythm loop **đồng thời** trên nhiều section mà không có variation có chủ đích |
| 5 | Tone offset máy móc | Dùng công thức kiểu `sắc=+1, huyền=-1` độc lập từng âm tiết và gọi đó là “đã xử lý thanh” |
| 6 | Hook thiếu / không memorable | Chorus không có câu nhạc chủ đạo dễ nhớ (pitch+rhythm cell khai báo được) trước khi lặp section; hoặc cell khai báo nhưng không muốn ngân nga (xem catchiness) |
| 7 | Patch-and-export | Sửa vài nốt rời trên bản đã FAIL chất lượng rồi coi là bài mới — cấm; phải invent lại ý nhạc |
| 8 | Template-from-docs | Lấy ví dụ pitch trong knowledge/style card làm giai điệu thật của bài |
| 9 | Phrase rời rạc (disjointed) | Các câu trong cùng section không chia sẻ DNA motif (contour / rhythm cell / interval pattern); nghe như chuỗi phrase độc lập không liên kết |
| 10 | Lặp không identity | Lặp lại cell dài hoặc lặp nhiều lần nhưng cell gốc **không** có đặc trưng catchy (không clear contour, không rhythmic identity, pitch set quá rộng / nhảy lung tung) — lặp nhàm ≠ hook |

Ví dụ tiêu cực: fixture `melody-too-repetitive` (skeleton kiểu `F–G–F–E–C` lặp) — đó là **phản ví dụ**, không phải mẫu để bắt chước. Tương tự, chuỗi phrase không motif ở run Nắng Sớm Tinh Khôi là phản ví dụ cho anti-pattern 9.

## Hints

- Lặp **có chủ đích** (A → A') sau khi hook/motif đã memorable thì được — ghi trong notes.
- Sequence / fragmentation / cadence change là biến thể hợp lệ; copy nguyên xi không phải “hook”.
- Trước khi lặp rộng: hỏi “cell này có muốn ngân nga không?” — nếu không thì invent lại (catchiness).

## Cách áp dụng

1. Invent theo melody-invention + catchiness; ghi `motifs_declared` + `hook_melody_cell` trong notes.
2. Sau XML, so skeleton các câu cùng section + kiểm coherence.
3. FAIL → đổi ý nhạc (kể cả hook cell), xuất lại cả lead sheet trong cùng Bước 3.

## Related

- `KNOW.MELODY.INVENTION`
- `KNOW.MELODY.CATCHINESS`
- `KNOW.MELODY.QUALITY-GATE`
- `KNOW.MELODY.COMPOSITION-PLANNING`
- `KNOW.MELODY.MOTIF-DEVELOPMENT`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`