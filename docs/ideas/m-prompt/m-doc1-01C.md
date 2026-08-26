# **ĐẶC TẢ AI PROMPT BUILDER (BƯỚC 1\) \- Phiên bản Rút gọn**

## **1\. MỤC ĐÍCH & PHẠM VI**

Tài liệu định nghĩa AI Bước 1 trong kiến trúc sáng tác âm nhạc 2 bước.

> * **Nhiệm vụ:** Hoạt động như một bộ phân tích yêu cầu (REQUIREMENT\_ANALYZER) và xây dựng prompt có cấu trúc (STRUCTURED\_PROMPT\_BUILDER). Chuyển đổi yêu cầu tự do của người dùng thành cấu trúc dữ liệu chuẩn (Standard Song Prompt).  
> * **Giới hạn cốt lõi:** AI Bước 1 **tuyệt đối không** tự sáng tác, không chọn nốt nhạc, không tự ý thay đổi yêu cầu đã xác nhận và không tạo tệp MusicXML. Đây là ranh giới nghiêm ngặt giữa Tài liệu 1 (What) và Tài liệu 2 (How).

## **2\. NGUYÊN TẮC HOẠT ĐỘNG (STATE & LOGIC)**

> * **Bảo toàn ý định (Immutable Intent):** Mọi thông tin người dùng xác nhận (USER\_CONFIRMED) sẽ bị khóa (locked \= true). AI chỉ được thay đổi khi có lệnh trực tiếp từ người dùng.  
> * **Minh bạch nguồn gốc (Traceability):** Mọi trường dữ liệu phải được gắn nhãn nguồn gốc: USER\_EXPLICIT, USER\_CONFIRMED, INFERRED (suy luận an toàn), DEFAULT, hoặc DELEGATED (giao phó cho AI Bước 2).  
> * **Xử lý Xung đột (Conflict Resolution):** Không được tự động ghi đè hoặc che giấu mâu thuẫn. Nếu có yêu cầu mâu thuẫn (VD: "nhạc buồn" nhưng "tempo 140 BPM"), phải báo cáo CONFLICT và đề xuất phương án giải quyết để người dùng duyệt.  
> * **Quy tắc Hỏi (Question Policy):** Chỉ đặt câu hỏi ngắn gọn khi thiếu thông tin chí mạng hoặc có xung đột lớn (HIGH/CRITICAL). Các thông tin thứ yếu nên được gán DELEGATED để giảm tải cho người dùng.  
> * **Xử lý Ngoại lệ (Exception Handling):**  
  * Nếu input quá mơ hồ (INPUT\_TOO\_VAGUE), trả về trạng thái NEEDS\_CONFIRMATION và yêu cầu bổ sung.  
  * Nếu yêu cầu vượt phạm vi (VD: đòi xuất MusicXML trực tiếp), từ chối nhẹ nhàng và tiếp tục xử lý các phần hợp lệ.  
> * *(Bổ sung)* **Quản lý Ngữ cảnh (Context Tracking):** Quá trình Review Loop chỉ cập nhật các trường bị ảnh hưởng (delta update), bảo lưu toàn bộ các cấu hình không liên quan đã được thiết lập ở các vòng lặp trước.

## **3\. CẤU TRÚC DỮ LIỆU ĐẦU RA (SCHEMA)**

Dữ liệu cuối cùng được chuẩn hóa thành 17 nhóm thuộc tính. Mỗi trường bao gồm các key: {value, status, source, locked, confidence}.

> * **Thông tin chung:** PROJECT (mục đích, đối tượng), CONCEPT (chủ đề, thông điệp), EMOTION (cảm xúc chính/phụ, diễn biến), STORY (cấu trúc kể chuyện).  
> * **Đặc tả Âm nhạc:** GENRE (thể loại), SONG\_FORM (cấu trúc bài), MELODY, RHYTHM, HARMONY, VOCAL, ARRANGEMENT, PERFORMANCE, PRODUCTION.  
> * **Ngôn ngữ (LANGUAGE & LYRIC):** Chỉ định ngôn ngữ chính.  
  * **Quy tắc riêng cho Tiếng Việt:** Phải ghi nhận các ràng buộc về tương thích thanh điệu (tone\_melody\_compatibility), dấu câu, và độ tự nhiên của phát âm. Việc xử lý nốt nhạc thực tế sẽ do Bước 2 đảm nhiệm.  
> * **Ràng buộc (CONSTRAINTS):** Nhóm quan trọng nhất, quy định mức độ ưu tiên: HARD (bắt buộc), SOFT (ưu tiên), PROHIBITED (cấm), DELEGATED (ủy quyền).  
> * **Đầu ra (OUTPUT):** Định dạng mặc định là MusicXML 4.0, kèm các yêu cầu về metadata.

## **4\. QUY TRÌNH THỰC THI & OUTPUT CONTRACT**

Hệ thống vận hành theo vòng lặp trạng thái: DRAFT → NEEDS\_REVIEW / NEEDS\_CONFIRMATION → USER\_REVIEWED → FINAL.  
Khi người dùng nhập Prompt, AI Bước 1 trả về Payload chứa 4 phần:

> 1. **INTERPRETATION:** Tóm tắt ngắn gọn ý định của người dùng.  
> 2. **ISSUES:** Các cảnh báo về missing, ambiguous, conflict, hoặc recommendation.  
> 3. **REVIEW CHECKLIST:** Danh sách các điểm cấu hình chính cần người dùng xác nhận.  
> 4. **STANDARD SONG PROMPT (Dữ liệu chuẩn):** Dữ liệu được serialize dưới dạng JSON/YAML.  
>    *(Bổ sung)* Payload JSON này bắt buộc phải bao gồm PROMPT\_METADATA (version, status, last\_modified) để sẵn sàng truyền trực tiếp qua API cho AI Bước 2\.