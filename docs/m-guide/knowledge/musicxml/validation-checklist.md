---
id: KNOW.MUSICXML.VALIDATION-CHECKLIST
type: knowledge
status: active
version: "1.0"
tags: [compose, arrange, musicxml]
serves-steps: [3, 4]
sources: ["docs/m-guide/knowledge/musicxml/rules.md", "docs/m-guide/knowledge/musicxml/anti-patterns.md"]
last-updated: "2026-09-07"
---
# MusicXML — checklist trước khi trả file

> **AI:** Đọc ở cuối Bước 3 và Bước 4. Đây là checklist vận hành; không thay thế validator/parser.

## Dùng ở bước nào

- Bước 3 / 4 — kiểm tra output cuối trước khi handoff.

## Constraints

- Các constraint active trong `KNOW.MUSICXML.RULES` và `KNOW.MUSICXML.ANTI-PATTERNS` phải đạt.

## Hints

### Structural

- XML well-formed.
- DOCTYPE/version đúng.
- `part-list` khớp các `<part>` thực tế.
- Measure continuity 1→N.
- Duration từng measure hợp lệ.
- `midi-program` nằm trong miền đã quy định.

### Musical

- Key/time/tempo nhất quán với song request.
- Vocal range/tessitura hợp lý.
- Lyric mapping đủ và đúng thứ tự.
- Harmony không mâu thuẫn với progression đã khóa.
- Bước 4 không vô tình thay đổi lyric/melody/harmony của Bước 3.

### Handoff

- File mở được bằng parser/importer thực tế nếu có.
- Notes mô tả tradeoff quan trọng.
- Không để placeholder hoặc comment thay thế dữ liệu âm nhạc bắt buộc.

## Cách áp dụng

1. Validate XML syntax.
2. Validate structural MusicXML constraints.
3. Validate semantic song requirements.
4. Kiểm tra continuity sau mọi edit.
5. Chỉ xuất file sau khi checklist đạt.

## Related

- `KNOW.MUSICXML.RULES`
- `KNOW.MUSICXML.ANTI-PATTERNS`
- `KNOW.MUSICXML.STRUCTURE-VOICES`
