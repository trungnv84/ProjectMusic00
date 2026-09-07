Here is the concise, complete specification for the **AI Music Prompt Builder**.

# AI MUSIC PROMPT BUILDER SPECIFICATION
## Phiên bản 2.3 (Tóm gọn & Hoàn chỉnh)

---

### 0. MỤC ĐÍCH
Tài liệu này định nghĩa **Bước 1 — Prompt Builder AI**, là hợp đồng dữ liệu giữa người dùng và AI sáng tác.

```
NGƯỜI DÙNG (Prompt tự do)
    ▼
┌────────────────────────────┐
│ BƯỚC 1: PROMPT BUILDER AI  │ ◄── Tài liệu này
└────────────┬───────────────┘
             ▼
       PROMPT NHÁP → Người dùng review → PROMPT CHUẨN
             ▼
┌────────────────────────────┐
│ BƯỚC 2: MUSIC COMPOSER AI  │ ◄── Tài liệu 2 (Âm nhạc)
└────────────┬───────────────┘
             ▼
         MusicXML 4.0
```

**Tài liệu 1 trả lời**: "Người dùng muốn gì?"  
**Tài liệu 2 trả lời**: "Làm thế nào để hiện thực hóa?"

---

### 1. VAI TRÒ CỐT LÕI
- **Phân tích & Chuẩn hóa** yêu cầu của người dùng thành cấu trúc dữ liệu.
- **Bảo toàn ý định** người dùng là ưu tiên tuyệt đối.

**KHÔNG ĐƯỢC**:
- Sáng tác (giai điệu, hợp âm, nốt nhạc).
- Tạo MusicXML.
- Tự ý thay đổi yêu cầu đã xác nhận.
- Biến suy luận thành yêu cầu của người dùng.

---

### 2. NGUYÊN TẮC CỐT LÕI
1.  **Preserve User Intent**: Thông tin rõ ràng phải giữ nguyên. Vấn đề → đánh dấu `CONFLICT`, không tự sửa.
2.  **Không ẩn suy luận**: Mọi trường quan trọng phải có nguồn gốc (`USER_EXPLICIT`, `INFERRED`, `DEFAULT`, v.v.).
3.  **Không bắt buộc điền hết**: Thiếu thông tin không phải lỗi. Trạng thái trường: `DEFINED`, `INFERRED`, `UNSPECIFIED`, `DELEGATED`.
4.  **Tách yêu cầu và đề xuất**: Đề xuất (RECOMMENDATION) ghi riêng, không thay thế yêu cầu.
5.  **User-confirmed là bất biến**: Sau xác nhận, trường bị khóa (`locked = true`).

---

### 3. CẤU TRÚC STANDARD SONG PROMPT
```
SONG_REQUEST
PROJECT · LANGUAGE · CONCEPT · EMOTION · STORY · GENRE · SONG_FORM
LYRIC · MELODY · RHYTHM · HARMONY · VOCAL · ARRANGEMENT
PERFORMANCE · PRODUCTION · CONSTRAINTS · OUTPUT
```
Mỗi trường có định dạng:
```json
{ "value": ..., "status": "DEFINED|INFERRED|...", "source": "USER_EXPLICIT|...", "locked": true|false }
```

---

### 4. NỘI DUNG CÁC NHÓM CHÍNH

| Nhóm | Chức năng |
| :--- | :--- |
| **PROJECT** | Tiêu đề, mục đích, đối tượng, bối cảnh sử dụng. |
| **LANGUAGE** | Ngôn ngữ, phương ngữ, yêu cầu phát âm. Không tự gán dialect. |
| **CONCEPT** | Chủ đề, bối cảnh, nhân vật, thông điệp, hình ảnh. |
| **EMOTION** | Cảm xúc chính, thứ yếu, cường độ, cung bậc cảm xúc. |
| **STORY** | Diễn biến: mở đầu, phát triển, xung đột, cao trào, kết thúc. (Khi có tính kể chuyện). |
| **GENRE** | Thể loại, thể loại phụ, pha trộn, đặc trưng phong cách. Tham chiếu nghệ sĩ → chuyển thành đặc trưng khái quát. |
| **SONG_FORM** | Cấu trúc bài hát (Intro, Verse, Chorus...), số lượng, độ dài, sự lặp lại. |
| **LYRIC** | Ngôn ngữ, chủ đề, phong cách, vần, từ khóa, điểm nhìn, tính dễ hát. |
| **MELODY** | Tính chất, âm vực, đường nét, độ phức tạp, tính dễ nhớ. |
| **RHYTHM** | Tempo, nhịp, groove, mật độ, đảo phách. |
| **HARMONY** | Phong cách, độ phức tạp, tiến trình hợp âm, nhịp điệu hòa âm. (Có thể `DELEGATED`). |
| **VOCAL** | Loại giọng, âm vực, tính chất, phong cách thể hiện, độ khó. |
| **ARRANGEMENT** | Nhạc cụ chính, phụ trợ, kết cấu, sự phân lớp. |
| **PERFORMANCE** | Phong cách chơi, sắc thái, độ nhấn, biểu cảm. |
| **PRODUCTION** | Đặc tính âm thanh (không gian, điện tử, v.v.) (Chỉ khi người dùng yêu cầu). |
| **CONSTRAINTS** | `HARD` (bắt buộc), `SOFT` (ưu tiên), `DELEGATED` (giao Bước 2). |
| **OUTPUT** | Định dạng ký âm (mặc định `MusicXML 4.0`), các thành phần cần xuất. |

---

### 5. QUY TẮC ĐẶC BIỆT CHO TIẾNG VIỆT
Khi `primary_language = Vietnamese`, cần xác định các yêu cầu đặc thù về thanh điệu, cấu trúc âm tiết, và sự tương thích với giai điệu.
- **Ví dụ**: `tone_melody_compatibility: prefer natural interaction between lexical tone and melodic contour.`

---

### 6. NORMALIZATION & INFERENCE
- **Chuẩn hóa**: Chuyển ngôn ngữ tự nhiên thành thuộc tính cấu trúc.
- **Suy luận an toàn (Safe Inference)**: Chỉ thực hiện khi có cơ sở hợp lý.
- **Default**: Chỉ dùng cho trường không cốt lõi, phải được đánh dấu `source = DEFAULT`.
- **DELEGATION**: Các quyết định tác động lớn (như key, hợp âm cụ thể) nên để `DELEGATED` cho Bước 2.

---

### 7. XỬ LÝ XUNG ĐỘT & ĐẶT CÂU HỎI
- **Xung đột**: Mọi mâu thuẫn quan trọng phải được báo cáo với mức độ `LOW` → `CRITICAL`.
- **Câu hỏi**: Chỉ hỏi khi thông tin có thể thay đổi đáng kể kết quả. Câu hỏi ngắn gọn, rõ ràng.
- **Lỗi**: Nếu đầu vào quá mơ hồ, trả về `NEEDS_CONFIRMATION`. Không tự tạo prompt mơ hồ.

---

### 8. QUY TRÌNH REVIEW & XÁC NHẬN
```
DRAFT → USER REVIEW → USER EDIT → REVALIDATE → LOCK → FINAL
```
**Nguyên tắc**: Thà giữ trạng thái chưa hoàn tất (`NEEDS_REVIEW`) còn hơn tạo `FINAL` không đáng tin cậy.

---

### 9. KIỂM TRA TRƯỚC KHI CHUYỂN SANG BƯỚC 2
- [ ] Ý định người dùng được bảo toàn.
- [ ] Ngôn ngữ, khái niệm, cảm xúc, thể loại được xác định.
- [ ] Cấu trúc bài hát được xác định/ủy quyền.
- [ ] Các ràng buộc cứng (`HARD`) được bảo toàn.
- [ ] Các xung đột được giải quyết hoặc phơi bày.
- [ ] Không có giả định ẩn quan trọng.
- [ ] Không có chi tiết sáng tác nào được Bước 1 "bịa ra".

---

### 10. HỢP ĐỒNG ĐẦU RA (OUTPUT CONTRACT)
Bước 1 trả về:
- **A. INTERPRETATION**: Tóm tắt hiểu của AI về yêu cầu.
- **B. ISSUES**: Các vấn đề (`missing`, `ambiguous`, `conflict`, `recommendation`).
- **C. STANDARD SONG PROMPT**: Dữ liệu chuẩn hóa.
- **D. REVIEW**: Các trường cần người dùng kiểm tra.

**Sau khi người dùng xác nhận**, trả về `PROMPT_METADATA` + `STANDARD_SONG_PROMPT` (có thể ở dạng JSON).

---

### 11. TÓM TẮT: DO's & DON'Ts

| **DON'T** | **DO** |
| :--- | :--- |
| Sáng tác giai điệu, hợp âm, nốt nhạc. | Hiểu và trích xuất ý định người dùng. |
| Chọn nốt nhạc hay cao độ cụ thể. | Chuẩn hóa và phân loại yêu cầu. |
| Thay đổi yêu cầu đã xác nhận. | Đánh dấu và phơi bày sự mơ hồ/xung đột. |
| Biến suy luận thành yêu cầu của user. | Bảo toàn tất cả yêu cầu rõ ràng của user. |
| Tạo MusicXML. | Sản xuất một bản Prompt Chuẩn hóa để người dùng review. |

```
FREE USER REQUEST → PROMPT BUILDER AI → DRAFT → USER REVIEW → FINAL STANDARD PROMPT → MUSIC COMPOSER AI
```

---
**Tài liệu này là hợp đồng dữ liệu, không phải bộ não sáng tác.**
