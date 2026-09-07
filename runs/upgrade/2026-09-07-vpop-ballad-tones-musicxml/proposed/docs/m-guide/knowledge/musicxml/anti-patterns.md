---
id: KNOW.MUSICXML.ANTI-PATTERNS
type: knowledge
status: active
version: "1.1"
tags: [compose, arrange, musicxml]
serves-steps: [3, 4]
sources:
  - "https://forums.steinberg.net/t/issues-with-musicxml-export/895215"
  - "https://musescore.org/en/comment/1138937"
  - "https://musescore.org/en/comment/1221926"
  - "https://github.com/w3c-cg/musicxml/issues"
last-updated: "2026-09-07"
---

# MusicXML — anti-patterns (cấm)

> **AI:** Kiểm tra trước khi trả file. Vi phạm = output không chấp nhận được.  
> **Quy tắc vàng:** Mọi MusicXML trả ra phải **schema-valid**. Không được dùng comment để biện minh cho schema invalid.

---

## Danh sách anti-patterns (cấm)

| # | Cấm | Thay bằng | Nguồn / Ví dụ |
|---|-----|-----------|---------------|
| 1 | Khai báo score-part nhưng không có `<part>` đủ | Giảm part-list cho khớp số part viết được | |
| 2 | Nhảy measure (1–5 rồi 56) | Viết đủ measure 1→N, không bỏ trống | |
| 3 | Comment kiểu "omitted for length" để biện minh schema invalid | Rút gọn nội dung nhạc, vẫn schema hợp lệ | |
| 4 | Dùng XSD attributes trên `<score-partwise>` | Chỉ dùng DTD DOCTYPE | |
| 5 | `<midi-program>0</midi-program>` | 1–128 | |
| 6 | `<duration>0</duration>` | Chia lại duration > 0 giữa các note | |
| 7 | **Ký tự `&` trong part-name hoặc text** | Dùng `&amp;` hoặc thay bằng "and" | — `Piano & Solo Violin` → `Piano and Solo Violin` hoặc `Piano &amp; Solo Violin` |
| 8 | **`<kind/>` rỗng (thiếu "major"/"minor")** | Ghi rõ `<kind>major</kind>` hoặc `<kind>minor</kind>` | — chord symbol bị lỗi import |
| 9 | **`<display-octave>` ngoài khoảng 0–9** | Chỉ dùng 0–9; kiểm tra offset trước khi xuất | — `-1` gây validation fail |
| 10 | **Lyric `<extend>` không đúng cú pháp** | Chỉ dùng `<extend type="start"/>` và `<extend type="stop"/>` đúng schema | — extender lines gây lỗi export |
| 11 | **Dấu cách/control character trong ID** | Chỉ dùng `[a-zA-Z0-9_-]` trong ID; không có space | — line 18 column 50 error |
| 12 | **Thiếu `<credit>` hoặc `<credit-words>` cho tiêu đề** | Luôn có ít nhất một credit cho title và composer | MusicXML 4.0 requirement |

---

## Quy tắc bổ sung

### Q1. Kiểm tra schema trước khi trả
- Dùng công cụ kiểm tra MusicXML schema (ví dụ: `xmllint --schema musicxml.xsd file.xml`) trước khi gửi.
- Nếu không có công cụ, kiểm tra thủ công các anti-pattern trên.

### Q2. Xử lý ký tự đặc biệt trong text
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&apos;`

### Q3. Chord symbol kind phải có giá trị
- Không được để `<kind/>` rỗng.
- Giá trị hợp lệ: `major`, `minor`, `augmented`, `diminished`, `dominant`, `major-seventh`, `minor-seventh`, v.v.

### Q4. display-octave chỉ dùng 0–9
- `display-octave` là chỉ số octave hiển thị (0 = C4, 1 = C5, ...). Không dùng số âm.

---

## Cách áp dụng khi xuất MusicXML (Bước 3 & 4)

1. **Trước khi xuất:** chạy kiểm tra 12 anti-pattern trên.
2. **Nếu phát hiện vi phạm:** sửa theo cột "Thay bằng".
3. **Sau khi xuất:** kiểm tra schema (nếu có công cụ) hoặc dùng validator online.
4. **Comment được phép:** nếu chỉ chú thích phong cách và element XML vẫn đầy đủ.

---

## Conflicts / related
- `conflicts-with:` (không)
- `related:`
  - `KNOW.MUSICXML.RULES` — quy tắc xuất chuẩn
  - `PIPE.STEP-03` và `PIPE.STEP-04` — áp dụng khi xuất file
