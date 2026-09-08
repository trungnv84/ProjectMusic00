---
id: KNOW.MUSICXML.VALIDATION-CHECKLIST
type: knowledge
status: active
version: "1.1"
tags: [compose, arrange, musicxml]
serves-steps: [3, 4]
sources:
  - "docs/m-guide/knowledge/musicxml/rules.md"
  - "docs/m-guide/knowledge/musicxml/anti-patterns.md"
  - "docs/m-guide/knowledge/melody/musical-quality-gate.md"
last-updated: "2026-09-08"
---
# MusicXML — checklist trước khi trả file

> **AI:** Đọc ở cuối Bước 3 và Bước 4. Đây là checklist vận hành; không thay thế validator/parser.

**Tách ba lớp:** `structural PASS` ≠ `musical quality PASS` ≠ `prosody PASS`. Chỉ structural ở đây; chất lượng sáng tác / khớp lời–nhạc → [musical-quality-gate](../melody/musical-quality-gate.md) + [lyric-melody-fit](../lyrics/lyric-melody-fit.md).

## Dùng ở bước nào

- Bước 3 / 4 — kiểm tra output cuối trước khi handoff.

## Constraints

- Các constraint active trong `KNOW.MUSICXML.RULES` và `KNOW.MUSICXML.ANTI-PATTERNS` phải đạt.
- Bước 3: thêm `music_quality_gate: PASS` (hoặc user override tường minh) trước khi step3 = done.

## Hints

### Structural

- XML well-formed; **pretty-print** (không minify cả bài một dòng).
- DOCTYPE/version đúng.
- `part-list` khớp các `<part>` thực tế.
- Measure continuity 1→N.
- Duration từng measure hợp lệ.
- `midi-program` nằm trong miền đã quy định.

### Musical (nhắc — chấm đủ ở quality gate)

- Key/time/tempo nhất quán với song request.
- Vocal range/tessitura hợp lý.
- Lyric mapping đủ và đúng thứ tự.
- Harmony không mâu thuẫn với progression đã khóa.
- Motif/hook/contrast/prosody: **không** đạt chỉ vì đủ section trong form.
- Bước 4 không vô tình thay đổi lyric/melody/harmony của Bước 3.

### Handoff

- File mở được bằng parser/importer thực tế nếu có.
- Notes mô tả tradeoff quan trọng + `music_quality_gate`.
- Không để placeholder hoặc comment thay thế dữ liệu âm nhạc bắt buộc.

## Cách áp dụng

1. Validate XML syntax + pretty-print.
2. Validate structural MusicXML constraints.
3. Validate musical quality gate + prosody audit (Bước 3).
4. Validate semantic song requirements.
5. Kiểm tra continuity sau mọi edit.
6. Chỉ xuất file sau khi structural đạt **và** (Bước 3) quality gate PASS.

## Related

- `KNOW.MUSICXML.RULES`
- `KNOW.MUSICXML.ANTI-PATTERNS`
- `KNOW.MUSICXML.STRUCTURE-VOICES`
- `KNOW.MELODY.QUALITY-GATE`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`
