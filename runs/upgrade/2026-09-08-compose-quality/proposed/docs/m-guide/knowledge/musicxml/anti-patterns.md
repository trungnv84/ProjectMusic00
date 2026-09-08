---
id: KNOW.MUSICXML.ANTI-PATTERNS
type: knowledge
status: active
version: "1.2"
tags: [compose, arrange, musicxml]
serves-steps: [3, 4]
sources:
  - "https://forums.steinberg.net/t/issues-with-musicxml-export/895215"
  - "https://musescore.org/en/comment/1138937"
  - "https://musescore.org/en/comment/1221926"
last-updated: "2026-09-08"
---

# MusicXML — anti-patterns

> **AI:** Kiểm tra trước khi trả file. Vi phạm **constraint** = output không chấp nhận. Mục **hint** là khuyến nghị importer-friendly. Anti-pattern **giai điệu/lời** nằm ở `KNOW.MELODY.ANTI-PATTERNS` / `KNOW.LYRICS.LYRIC-MELODY-FIT` — không thay bằng checklist này.

## Constraints (cấm)

| # | Cấm | Thay bằng |
|---|-----|-----------|
| 1 | Khai báo score-part nhưng không có `<part>` đủ | Giảm part-list cho khớp số part viết được |
| 2 | Nhảy measure (1–5 rồi 56); comment thay measure | Viết đủ measure 1→N |
| 3 | Comment “omitted for length” biện minh schema invalid | Rút gọn nội dung, vẫn schema hợp lệ |
| 4 | XSD attrs trên `<score-partwise>` | Chỉ DTD DOCTYPE |
| 5 | `<midi-program>0</midi-program>` | 1–128 |
| 6 | `<duration>0</duration>` | duration > 0; chia lại giữa các note |
| 7 | Ký tự `&` thô trong text / part-name | `&amp;` hoặc chữ “and” |
| 8 | `<kind/>` rỗng khi đã dùng harmony/chord | `<kind>major</kind>` / `minor` / … hợp lệ |
| 9 | ID có space / control character | Chỉ `[A-Za-z0-9_-]` (và quy ước XML ID) |
| 10 | Lyric `<extend>` sai schema | Dùng đúng `type="start"` / `stop` khi cần extender |

Comment **được phép** nếu chỉ chú thích và element XML vẫn đầy đủ.

## Hints (importer-friendly, không harden schema)

| # | Khuyến nghị | Lý do |
|---|-------------|--------|
| H1 | Giữ `display-octave` / `octave` trong khoảng thực tế hợp lý cho lead sheet (thường khoảng 1–6 cho vocal) | Tránh octave cực đoan làm importer lỗi; schema MusicXML cho phép integer rộng hơn — **không** cấm tuyệt đối mọi giá trị ngoài 0–9 |
| H2 | Nên có `<credit>` / `<credit-words>` cho title (và composer nếu biết) | Tốt cho metadata; **không** phải điều kiện bắt buộc schema partwise tối thiểu của kho này |
| H3 | Escape đầy đủ `& < > " '` trong text | Tránh XML hỏng |
| H4 | **Pretty-print** MusicXML (xuống dòng + indent) — tránh minify cả score thành 1–3 dòng | Dễ review, diff, và debug importer; bắt buộc cho handoff Bước 3 trong kho này |

## Cách áp dụng

1. Kiểm tra bảng constraint trước khi xuất Bước 3/4.
2. Áp hint khi có thể (đặc biệt H2, H3, **H4**).
3. Nếu có validator (`xmllint`, v.v.) thì chạy thêm.
4. Chạy riêng [musical quality gate](../melody/musical-quality-gate.md) — structural OK không đủ.

## Related

- `KNOW.MUSICXML.RULES`, `KNOW.MUSICXML.VALIDATION-CHECKLIST`, `PIPE.STEP-03`, `PIPE.STEP-04`
