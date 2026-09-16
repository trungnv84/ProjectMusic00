# META-PROMPT: BƯỚC 1 - NẮNG SỚM TINH KHÔI

## 1. MỤC TIÊU CỦA META-PROMPT
Meta-prompt này đóng vai trò hướng dẫn hệ thống AI ở **Bước 2 (Prompt Crafting)** đọc toàn bộ tài liệu catalog chuẩn (`docs/catalog/`, `docs/m-guide/`) và sinh ra 02 prompt điều hành chi tiết (`PROMPT_COMPOSE` và `PROMPT_ARRANGE`) cùng danh sách `DOC_REFS` tương ứng.

> **LƯU Ý NGHIÊM NGẶT**: Meta-prompt này KHÔNG sinh nhạc lý chi tiết, KHÔNG viết lời bài hát hay tạo mã MusicXML trực tiếp ở bước này.

---

## 2. THÔNG SỐ ĐẦU VÀO CỦA BÀI HÁT (SONG REQUIREMENTS)

| Hạng mục | Thông số cấu hình |
| :--- | :--- |
| **Title** | Nắng Sớm Tinh Khôi |
| **Language** | Vietnamese |
| **Concept** | Tình yêu trong sáng, vui tươi; góc nhìn ngôi thứ ba (người kể chuyện quan sát tình yêu tuổi trẻ) |
| **Emotion** | Trong sáng, tinh nghịch, rạng rỡ, ấm áp |
| **Genre** | V-Pop Ballad |
| **Reference Style** | `STYLE.VN.VPOP-BALLAD` |
| **Song Form** | `Verse 1` - `Pre-Chorus` - `Chorus` - `Verse 2` - `Pre-Chorus` - `Chorus` - `Bridge` - `Chorus` - `Outro` |
| **Rhythm & Tempo**| Nhịp 4/4, Tempo: 86 BPM (Bright V-Pop Ballad) |
| **Vocal Profile** | Giọng Nữ, Tầm âm trung (C4 đến D5), Climax Chorus vươn tới E5 ngắn |
| **Lyric Rules** | Hook ngắn, bắt tai, dễ nhớ; từ ngữ trong sáng, giàu hình ảnh; tránh sáo rỗng; **KHÔNG** chứa tên thương hiệu |
| **Harmony** | Giọng Đô Trưởng (C Major) / La thứ (A Minor); Tiến trình tươi sáng, mượt mà (C - G/B - Am7 - Fmaj7) |
| **Target Output** | MusicXML 4.0 chuẩn, tích hợp lời gắn chính xác theo nốt (`<lyric><text>...</text></lyric>`) |

---

## 3. CHỈ THỊ DÀNH CHO AI BƯỚC 2 (PROMPT CRAFTING INSTRUCTIONS)

Khi tiếp nhận Meta-Prompt này, AI ở Bước 2 phải thực hiện các nhiệm vụ sau:

### Nhiệm vụ 1: Tra cứu Catalog & Xác định `DOC_REFS`
AI Bước 2 cần quét danh mục tài liệu trong hệ thống và trích dẫn chính xác các tệp tham chiếu:
- `docs/catalog/styles/vpop-ballad.md` (Quy chuẩn phong cách V-Pop Ballad)
- `docs/catalog/forms/pop-standard-form.md` (Cấu trúc bài hát Pop)
- `docs/catalog/vocal/female-mezzo-range.md` (Tầm âm giọng nữ trung)
- `docs/catalog/harmony/bright-pop-progressions.md` (Tiến trình hợp âm tươi sáng)
- `docs/catalog/musicxml/musicxml-4.0-lyric-spec.md` (Cú pháp chuẩn MusicXML 4.0 gắn lời)

### Nhiệm vụ 2: Tạo `PROMPT_COMPOSE` (Chuyên biệt cho Sáng tác Melodic & Lời)
`PROMPT_COMPOSE` được tạo ra phải ép AI ở Bước 3 tuân thủ các quy tắc:
1. **Giai điệu & Lời hát**:
   - Viết lời tiếng Việt theo sát CONCEPT ngôi thứ ba và EMOTION tinh nghịch.
   - Giữ giọng nữ trong tầm âm C4 - D5, chọn nốt đắt E5 duy nhất tại Climax của Chorus.
   - Xây dựng **Hook** ngắn gọn (4-6 chữ), có tính lặp lại tiết tấu cao ở Chorus.
2. **Quy chuẩn mã hóa MusicXML 4.0**:
   - Sử dụng thẻ `<lyric><text>word</text></lyric>` gắn tương ứng với từng nốt nhạc.
   - Đảm bảo đúng trường độ, phách, vạch nhịp và nhịp 4/4 ở Tempo 86 BPM.

### Nhiệm vụ 3: Tạo `PROMPT_ARRANGE` (Chuyên biệt cho Hòa âm & Khí nhạc)
`PROMPT_ARRANGE` được tạo ra phải ép AI ở Bước 4 tuân thủ các quy tắc:
1. **Hòa âm & Cấu trúc**:
   - Tiến trình hợp âm chính: `C - G/B - Am7 - Fmaj7` (Verse/Chorus) và `Dm7 - Em7 - Fmaj7 - G7` (Pre-Chorus/Bridge).
   - Dynamic curve: Nhẹ nhàng ở Verse 1, tăng dần năng lượng ở Pre-Chorus, bùng nổ tươi sáng ở Chorus.
2. **Định hướng Phối khí**:
   - Acoustic Guitar rải ngón kết hợp Piano làm nền chính.
   - Thêm Bass và Drum groove nhẹ nhàng từ Chorus 1 để giữ nhịp vui tươi, tinh nghịch.

---

## 4. ĐỊNH DẠNG ĐẦU RA KỲ VỌNG CỦA BƯỚC 2
AI Bước 2 phải xuất kết quả theo cấu trúc sau:

```markdown
# STEP 02 OUTPUT: PROMPTS & DOC_REFS

## DOC_REFS
- [Tên tệp catalog 1]
- [Tên tệp catalog 2]

## PROMPT_COMPOSE
[Nội dung prompt chi tiết điều hành bước sáng tác giai điệu + lời MusicXML]

## PROMPT_ARRANGE
[Nội dung prompt chi tiết điều hành bước hòa âm phối khí]
```
