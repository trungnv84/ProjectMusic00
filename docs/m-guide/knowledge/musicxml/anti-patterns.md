---
id: KNOW.MUSICXML.ANTI-PATTERNS
type: knowledge
status: active
version: "1.0"
tags: [compose, arrange, musicxml]
serves-steps: [3, 4]
sources: []
last-updated: "2026-09-07"
---

# MusicXML — anti-patterns (cấm)

> **AI:** Kiểm tra trước khi trả file. Vi phạm = output không chấp nhận được.

| # | Cấm | Thay bằng |
|---|-----|-----------|
| 1 | Khai báo score-part nhưng không có `<part>` đủ | Giảm part-list cho khớp số part viết được |
| 2 | Nhảy measure (1–5 rồi 56); comment `<!-- measures 6–55 -->` | Viết đủ measure 1→N |
| 3 | Comment kiểu “omitted for length” để biện minh schema invalid | Rút gọn nội dung nhạc, vẫn schema hợp lệ |
| 4 | XSD attrs trên `<score-partwise>` | Chỉ DTD DOCTYPE |
| 5 | `<midi-program>0</midi-program>` | 1–128 |
| 6 | `<duration>0</duration>` | Chia lại duration > 0 giữa các note |

Comment **được phép** nếu chỉ chú thích phong cách và element XML vẫn đầy đủ.
