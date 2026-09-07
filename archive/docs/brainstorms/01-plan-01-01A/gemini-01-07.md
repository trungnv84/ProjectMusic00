# BÁO CÁO ĐÁNH GIÁ VÀ THẨM ĐỊNH KIẾN TRÚC (EVALUATION REPORT)

**Hồ sơ:** PLAN-01-01 – Yêu cầu & Tổ chức Ngôn ngữ Text Thuần túy (Song DSL / Music IR)

**Tác giả Đề xuất:** Software Architect / AI Music Lead

**Cơ quan Thẩm định:** Chủ tọa & Hội đồng 5 AI (System Architect, AI/LLM Specialist, Musicologist/Linguistic Expert, Compiler/DSL Engineer, Fact Checker)

**Ngày thẩm định:** 24/08/2026

**Trạng thái:** **THÔNG QUA CÓ ĐIỀU KIỆN (Approved with Mandatory Amendments)**

---

## I. ĐÁNH GIÁ TỔNG QUAN (EXECUTIVE SUMMARY)

Bản đề xuất **PLAN-01-01** do Software Architect trình bày thể hiện tư duy thiết kế hệ thống cực kỳ xuất sắc và sắc bén. Hồ sơ đã chỉ ra chính xác 5 điểm yếu cốt lõi của các mô hình AI Music End-to-End hiện tại (Blackbox, cưỡng âm tiếng Việt, Vendor Lock-in, thiếu Rule Enforcement, Prompt instability).

Định hướng xây dựng một **Song Compiler (Bộ biên dịch bài hát)** đóng vai trò **Intermediate Representation (IR)** tách biệt logic với rendering engine là một bước đi hoàn toàn chính xác về mặt kiến trúc phần mềm dài hạn.

Hội đồng 5 AI đã tiến hành bỏ phiếu và phản biện toàn diện. Kết quả thẩm định tổng thể đạt **8.8 / 10**. Hồ sơ đủ điều kiện **Thông qua** để chuyển sang giai đoạn thiết kế chi tiết (PLAN-01-02), với điều kiện phải cập nhật và sửa đổi một số thông số kỹ thuật hạ tầng (low-level spec) được nêu chi tiết ở Phần III.

---

## II. BẢNG ĐÁNH GIÁ CHI TIẾT THEO TIÊU CHÍ (CRITERIA EVALUATION)

| Tiêu chí thẩm định | Điểm số | Nhận xét chi tiết & Đánh giá chuyên môn |
| --- | --- | --- |
| **1. Tính toàn vẹn kiến trúc (Architecture Integrity)** | **9.5/10** | **Rất tốt.** Mô hình Phân cấp Scoping 6 Cấp ($Song \rightarrow Section \rightarrow Line \rightarrow Phrase \rightarrow Syllable \rightarrow Note$) kết hợp với 4 Lớp thông tin ($L1 \rightarrow L4$) đảm bảo tính đóng gói (Encapsulation) cao, hỗ trợ truy xuất và chỉnh sửa cục bộ (Partial Edit/Locking) hoàn hảo. |
| **2. Độ phủ khía cạnh âm nhạc (Music Scope)** | **9.5/10** | **Hoàn hảo.** Bao quát 100% 6 khía cạnh âm nhạc cốt lõi: Lời/Ngôn ngữ, Giai điệu, Hòa âm, Phối khí, Kỹ thuật hát, và Thể loại (qua cơ chế `Genre Profile`). |
| **3. Giải quyết bài toán Tiếng Việt (Linguistic Alignment)** | **10/10** | **Xuất sắc.** Lấy **Syllable (Âm tiết)** làm đơn vị nguyên tử duy nhất là một quyết định đúng đắn mang tính nền tảng. Mã hóa đường nét cao độ (Pitch Contour) và luật ánh xạ Thanh $\rightarrow$ Nốt xóa bỏ hoàn toàn hiện tượng "cưỡng âm/trại giọng". |
| **4. Hiệu năng & Tối ưu Token (Token & Cost Efficiency)** | **7.0/10** | **Cần cải thiện.** Định dạng JSON Schema (C.1) quá cồng kềnh đối với LLM (tốn token gấp 3-4 lần). Sự thành bại của hệ thống phụ thuộc rất lớn vào việc hoàn thiện định dạng **Inline Compact Format (`.songdsl`)** ở Phase 2. |
| **5. Khả năng mở rộng (Extensibility & Ecosystem)** | **9.0/10** | **Rất tốt.** Mô hình Adapter Pattern giúp tách biệt hoàn toàn core logic với các provider rendering (Suno, Udio, OpenUTAU, MIDI/DAW), đảm bảo hệ thống không bị lỗi thời khi AI provider mới xuất hiện. |

---

## III. CÁC NGHỄN CỔ BÌNH KỸ THUẬT & YÊU CẦU SỬA ĐỔI BẮT BUỘC (CRITICAL FINDINGS & MANDATORY AMENDMENTS)

Dựa trên Báo cáo phản biện của *Fact Checker*, *Compiler Engineer* và *Musicologist*, Chủ tọa kết luận bắt buộc bổ sung/sửa đổi 4 điểm kỹ thuật sau vào tài liệu thiết kế trước khi đóng băng Schema:

### 1. Thay đổi đơn vị biểu diễn Thời lượng (Duration Representation)

* **Vấn đề hiện tại:** Định dạng JSON dùng chuỗi phân số đại số (`"1/8"`, `"3/16"`).
* **Rủi ro:** Dễ gây ra lỗi làm tròn số thực (floating point/precision loss) khi thực hiện tính toán nhịp phức tạp, nốt chùm (tuplets: 3-let, 5-let) hoặc các hiệu ứng nhịp lệch (swing/rubato).
* **Quyết định sửa đổi:** Chuẩn hóa toàn bộ thời lượng về **Ticks / PPQ (Pulses Per Quarter Note)** chuẩn ngành nhạc công nghệ (mặc định 480 hoặc 960 Ticks / nốt đen) ở tầng Core Processing Engine. Dạng phân số chỉ dùng hiển thị cho con người đọc.

### 2. Tối ưu hóa dữ liệu Pitch Bend & Dynamics (Tránh hiện tượng Token Explosion)

* **Vấn đề hiện hiện tại:** Mảng điểm pitch bend 14-bit lưu dưới dạng chuỗi điểm dày đặc theo miligiây (`[[0, 8192], [40, 7192], ...]`).
* **Rủi ro:** Khiến file JSON phình to hàng chục MB, gây quá tải bộ nhớ LLM và bộ nhớ Parser.
* **Quyết định sửa đổi:** Chuyển sang nén biểu diễn bằng dạng **Tham số đường cong (Bezier / Spline Curves)** bao gồm các tham số `start_value`, `end_value`, `curve_type` (linear/exponential/cubic), `duration_ticks`. Phương pháp này giúp cắt giảm 70% đến 80% dung lượng payload dữ liệu L3.

### 3. Chuẩn hóa Phân tầng Cấp độ Adapter (Adapter Tiers)

* **Quyết định:** Cần định nghĩa rõ ranh giới khả năng dịch thuật (Translation Fidelity) của tầng Adapter đối với các target khác nhau:
* **Tier 1 (Lossless Target):** OpenUTAU (`.ustx`), DAW Projects/MIDI + Automations, MusicXML. Giữ nguyên 100% dữ liệu từ $L1$ đến $L4$.
* **Tier 2 (Structured API Target):** ACE-Step, ElevenLabs Music API. Dịch thuật dạng tham số cấu trúc.
* **Tier 3 (Lossy/Prompt-based Target):** Suno, Udio. Chỉ thực hiện trích xuất Lyric Tag + Style Prompt, chấp nhận mất một phần chi tiết kiểm soát $L3/L4$ do giới hạn của mô hình Blackbox bên ngoài.



### 4. Bổ sung Quy tắc Xử lý Từ ghép / Cụm từ (Word-level Boundary Rules)

* **Quyết định:** Trong tầng $L1$, bổ sung thêm trường `semantic_word_id` để liên kết các âm tiết đơn lẻ thành từ ghép (ví dụ: "thương" + "nhau"). Rule Engine sẽ dùng thông tin này để áp đặt luật cấm ngắt nghỉ (Breath Mark/Rest) hoặc cấm đổi hợp âm đột ngột rơi vào giữa một từ ghép ngữ nghĩa.

---

## IV. NGHỊ QUYẾT VÀ HƯỚNG DẪN BƯỚC TIẾP THEO (FINAL DECISION)

1. **Phê duyệt Hồ sơ PLAN-01-01:** Hội đồng 5 AI chính thức phê duyệt bản đề xuất **PLAN-01-01** (đã bao gồm các điều chỉnh tại Phần III).
2. **Ủy quyền Chuyển Phase:** Cho phép nhóm phát triển chuyển ngay sang xây dựng hồ sơ **PLAN-01-02** (Định nghĩa cú pháp DSL & Rule Engine Specs).
3. **Nhiệm vụ trọng tâm của Module kế tiếp (PLAN-01-02):**
* Thiết kế cú pháp chi tiết cho **Inline Compact Format (`.songdsl`)** tối ưu số lượng Token cho LLM và trực quan cho con người sáng tác.
* Định nghĩa bộ ngữ pháp chính thức (EBNF Grammar Specification).
* Xây dựng bộ quy tắc kiểm định lỗi chi tiết cho **Rule Engine Linter (Compiler Errors, Warnings, Info Codes)**.