---
id: KNOW.MUSICXML.RULES
type: knowledge
status: active
version: "1.0"
tags: [compose, arrange, musicxml]
serves-steps: [3, 4]
sources: []
last-updated: "2026-09-07"
---

# MusicXML 4.0 — quy tắc xuất

> **AI:** Đọc trước khi xuất bất kỳ file `.musicxml`. Ưu tiên validity schema.

## Constraints

- Format: MusicXML 4.0 **partwise**.
- Dùng DOCTYPE DTD partwise. **Không** thêm `xmlns:xsi` / `xsi:noNamespaceSchemaLocation` trên `<score-partwise>`.
- `số score-part trong part-list` = `số element <part>` thực tế.
- Mọi part: measure `number` liên tục từ 1 đến MAX (giống part vocal).
- `midi-program`: số nguyên **1–128** (không dùng 0). MIDI 0-based → cộng 1.
- Mọi `<duration>` > 0. Tổng duration trên cùng voice trong measure = `divisions × beats × (4 / beat-type)`.
- Bước 3: tối thiểu voice (+ lyrics) và hòa âm (harmony và/hoặc piano).
- Bước 4: thêm part đã hứa; không để part-list “ảo”.

## Hints

- Thiếu token: **giảm** số part, không để placeholder comment thay measure.
- Measure trung gian part phụ có thể dùng whole-note chord đơn giản — vẫn phải có đủ measure.

## DOCTYPE gợi ý

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC
  "-//Recordare//DTD MusicXML 4.0 Partwise//EN"
  "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
```
