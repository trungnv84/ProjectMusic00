# BÁO CÁO TẮC CHIẾN RED TEAM (RED TEAM ATTACK REPORT)

**Hồ sơ tấn công:** PLAN-01-01 – Yêu cầu & Tổ chức Ngôn ngữ Text Thuần túy (Song DSL / Music IR)

**Đơn vị thực hiện:** Red Team / Adversarial Architecture Review Group

**Mục tiêu:** Công phá, tìm điểm gãy (Single Point of Failure), lỗ hổng logic, điểm nghẽn hiệu năng và tính khả thi thực tế của đề xuất PLAN-01-01.

**Trạng thái:** **CẢNH BÁO ĐỎ (CRITICAL VULNERABILITIES DETECTED)**

---

## I. TỔNG QUAN TẤN CÔNG (EXECUTIVE ATTACK SUMMARY)

Bản đề xuất PLAN-01-01 đưa ra một viễn cảnh "thiên đường kiến trúc" (Architectural Utopia) khi muốn biến âm nhạc thành code chuẩn như TypeScript. Tuy nhiên, Red Team nhận thấy đề xuất này đang mắc phải **bệnh "Over-engineering" nghiêm trọng** và xây dựng dựa trên nhiều **giả định ngây thơ về mặt kỹ thuật (Naïve Technical Assumptions)**.

Nếu triển khai nguyên bản theo PLAN-01-01, hệ thống chắc chắn sẽ sụp đổ ở 4 mảng: **Chi phí Token LLM, Độ trễ Validation Loop, Xung đột quy tắc Ngôn ngữ - Âm nhạc, và Giới hạn thực tế của Rendering Engine.**

---

## II. 5 ĐIỂM GÃY CỐT LÕI & LỖ HỔNG KIẾN TRÚC (CRITICAL BREAKPOINTS)

### 1. Thảm họa Token & Context Window Explosion (Lỗ hổng C.1 JSON Schema)

* **Lỗi kiến trúc:** Cấu trúc JSON ở C.1 quá phình to. Chỉ riêng **4 âm tiết** ("Mình còn thương nhau") đã tốn tới **~700 - 800 tokens** (chưa tính các trường meta toàn bài, tracks library).
* **Tác động thực tế:** Một bài hát chuẩn V-Pop trung bình có khoảng **300 - 400 âm tiết**.

$$\text{Dung lượng JSON} \approx 400 \times 200 \text{ tokens/syl} = 80,000 \text{ tokens (chỉ riêng cho phần Lời + Nốt)!}$$


* **Hậu quả:**
* Chi phí API gọi LLM (GPT-4o / Claude 3.5 Sonnet) sẽ tốn khoảng $0.5 - $1.2 USD cho **MỖI LẦN** AI sinh/sửa file.
*LLM sẽ bị **Context Rot (Suy giảm trí nhớ)** nghiêm trọng. Khi đọc đến cuối file 80k tokens, LLM sẽ quên sạch các constraint ở $L4$ hoặc Meta toàn bài ở đầu file, dẫn đến việc sửa lỗi chỗ này làm hỏng chỗ khác.



### 2. Bẫy vô tận "Validation Loop Hang" (Lỗ hổng A.3 Nguyên tắc 3)

* **Lỗi kiến trúc:** Nguyên tắc A.3 bắt buộc lặp 3 vòng: `AI sinh -> Rule Engine check -> AI sửa theo Error Msg`.
* **Tác động thực tế:** Trong âm nhạc và thơ ca, các luật thường **triệt tiêu lẫn nhau (Conflicting Constraints)**.
* *Ví dụ:* Luật L1 bắt câu 6-8 phải đúng vần "ương" + Luật L2 bắt Melody đi lên đúng nốt cao nhất bài + Luật L3 bắt thanh Huyền không được đi lên + Hợp âm L4 cố định Fmaj7.


* **Hậu quả:** LLM sẽ rơi vào trạng thái **Oscillation (Dao động sửa lỗi vòng tròn)**:
* Lần 1: Sửa vần L1 $\rightarrow$ Vi phạm hướng nốt L2.
* Lần 2: Sửa hướng nốt L2 $\rightarrow$ Bị cưỡng âm L1.
* Lần 3: Sửa cưỡng âm L1 $\rightarrow$ Sai nhịp L2.
* Đạt mốc 3 vòng lặp mà vẫn Fail Hard Rules $\rightarrow$ Hệ thống buộc phải trả về bản "Soft score cao nhất" (vốn vẫn dính Hard Error), khiến toàn bộ lời hứa "Compile Error chuẩn như TypeScript" hoàn toàn phá sản!



### 3. "Syllable Atomic Illusion" – Bẫy âm tiết đơn lẻ (Lỗ hổng B.1)

* **Lỗi kiến trúc:** Chọn **Syllable** làm đơn vị nguyên tử duy nhất và cô lập các thuộc tính L1-L4 trên từng Syllable.
* **Tác động thực tế:** Ngôn ngữ (đặc biệt là Tiếng Việt) và Âm nhạc **KHÔNG** vận hành theo kiểu từng âm tiết rời rạc:
* **Ngôn ngữ:** Ý nghĩa nằm ở **Từ ghép / Cụm từ** (Poly-syllable / Compound words). Nếu gắt gao check L1 ở từng Syllable mà không hiểu cụm từ, Rule Engine sẽ cho phép ngắt hơi (Breath Mark) giữa từ "Thương" và "Nhau", hoặc đổi hợp âm/ngắt nhịp ngay giữa từ "Thành phố", tạo ra trải nghiệm âm nhạc cực kỳ buồn cười và ngô nghê.
* **Thanh điệu thực tế (Tone Sandhi & Contextual Pitch):** Thanh điệu Tiếng Việt thay đổi đường nét cao độ phụ thuộc vào **âm tiết đứng trước và đứng sau nó**. L3 lưu đường cong pitch 14-bit cố định cho 1 âm tiết đơn lẻ là hoàn toàn sai về mặt ngữ âm học thực nghiệm (Experimental Phonetics).



### 4. Bẫy ảo tưởng Adapter "Lossless" (Lỗ hổng A.2 & A.3 Nguyên tắc 1)

* **Lỗi kiến trúc:** Giả định rằng từ $Performance IR (L1-L4)$ có thể dịch 1-1 qua các Adapter Suno, Udio, ACE-Step, OpenUTAU mà giữ nguyên 100% ý đồ.
* **Tác động thực tế:**
* **Suno / Udio:** Là các mô hình Diffusion/Autoregressive Audio Blackbox hoàn toàn. Chúng **KHÔNG CÓ API** nhận Nốt, Pitch Bend Curve, hay Micro-tuning! Việc viết Adapter sang Suno thực chất chỉ là... gom L1 thành Text và lồng vài Style Tag `[Pop, 78bpm, Sad]` vào Prompt!
* **Hậu quả:** Khái niệm "Song Compiler" bị gãy ở tầng Rendering. Người dùng bỏ ra 2 tiếng tinh chỉnh Pitch Bend 14-bit ở $L3$, nhưng khi xuất sang Suno/Udio thì Adapter đành phải **NÉM BỎ 90% DỮ LIỆU L2, L3, L4** đó đi!



### 5. Cú giật ảo tưởng về Performance & Precision (Lỗ hổng C.1 Data Type)

* **Lỗi kiến trúc:** Dùng chuỗi phân số (`"1/8"`, `"3/16"`) cho Duration và mảng mốc thời gian miligiây thô cho Pitch Bend.
* **Tác động thực tế:**
* Nếu dùng miligiây, khi thay đổi `global_bpm` từ 78 lên 120, toàn bộ mảng Pitch Bend ở $L3$ của hàng trăm âm tiết sẽ bị **lệch pha hoàn toàn với Grid nhịp**. Parser sẽ phải chạy thuật toán Re-sampling / Re-quantization liên tục.
* Việc lưu chuỗi phân số làm cho Parser phải làm toán đại số chuỗi (String Parsing & Fraction Arithmetic) ở C++ / Rust level trên hàng triệu Note Event, tạo ra điểm nghẽn hiệu năng (CPU Bottleneck) cực lớn.



---

## III. MÔ HÌNH MINH HỌA KỊCH BẢN TẤN CÔNG (ATTACK SCENARIO)

```
 [USER INPUT] ──► [LLM Director] ──► Sinh File JSON (80k Tokens / $1.0)
                                            │
                                            ▼
                                   [RULE ENGINE CHECK]
                                            │
                   ┌────────────────────────┴────────────────────────┐
                   ▼                                                 ▼
        [L1: Vần Lục Bát: PASS]                          [L2: Tone Contour: FAIL]
     ("thương" vần với "vương")                   (Thanh Sắc nốt đi xuống -> Cưỡng âm)
                   │                                                 │
                   └────────────────────────┬────────────────────────┘
                                            ▼
                               [LLM RE-GENERATE (Vòng 1)]
                                 (Sửa L2 để nốt đi lên)
                                            │
                                            ▼
                                   [RULE ENGINE CHECK]
                                            │
                   ┌────────────────────────┴────────────────────────┐
                   ▼                                                 ▼
        [L1: Vần Lục Bát: FAIL]                          [L2: Tone Contour: PASS]
  (Đổi chữ để nốt đi lên -> Mất vần)              (Nốt đi lên theo thanh điệu)
                                            │
                                            ▼
                              [LLM RE-GENERATE (Vòng 3)]
                                            │
                                            ▼
                     ❌ [FAIL MAXIMUM LOOPS - OSICLLATION DEADLOCK]
                    Hệ thống trả về bản dở nhất -> COMPILER SỤP ĐỔ

```

---

## IV. DESTRUCTIVE RECOMMENDATIONS (RED TEAM ĐỀ XUẤT ĐẬP ĐI XÂY LẠI)

Để PLAN-01-01 không biến thành một "dự án trên giấy" (Vaporware), Red Team yêu cầu nhóm Kiến trúc phải giải quyết triệt để các điểm sau ở PLAN-01-02:

1. **KHÓA NGAY JSON Schema khỏi Prompt của LLM:** Tuyệt đối không cho LLM đọc/viết JSON Schema $L1-L4$ trực tiếp. Bắt buộc LLM chỉ được giao tiếp qua **Inline Compact Format (`.songdsl`)** cực gọn (nhắm tới mục tiêu $< 1500$ tokens/bài). JSON Schema chỉ tồn tại trong bộ nhớ RAM của Rule Engine Engine (In-Memory Data Structure).
2. **Loại bỏ vòng lặp ngây thơ 3 bước:** Thay thế `Validation Loop 3 vòng` bằng thuật toán **Constraint Satisfaction Problem (CSP) / SAT Solver / Genetic Algorithm** cho phần Nốt/Giai điệu. LLM chỉ sinh Lời ($L1$) và Cấu trúc ($L4$), việc map Nốt ($L2$) khớp với Thanh điệu ($L1$) phải do **Algorithmic Engine (Code thuần)** tự tính toán và điền nốt, KHÔNG BẮT LLM LÀM VIỆC NÀY.
3. **Thừa nhận sự thật về Adapter Tier:** Phải tuyên bố công khai trong Spec: *Tier 3 (Suno/Udio) là Lossy Adapter*. Không hứa hẹn tính năng "Lock Melody / Precise Edit" trên các provider này. Bắt buộc cảnh báo người dùng: Chi tiết $L2/L3$ chỉ có tác dụng 100% trên **Tier 1 (OpenUTAU / DAW / MIDI / Synthesizer local)**.
4. **Thay đổi Data Primitive:** Đổi ngay `Duration Fraction` $\rightarrow$ `Ticks (PPQ)`, đổi `Pitch Bend Array Mils` $\rightarrow$ `Relative Pitch Curve Parameters`.