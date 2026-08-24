# ROUND 3 – XÂY DỰNG GIẢI PHÁP (BỔ SUNG CHI TIẾT)

**Vai trò:** Solution Architect  
**Nhiệm vụ:** Đề xuất các phương án thực thi cụ thể, dựa trên các phản biện đã qua. Tôi đưa ra **3 phương án có thể triển khai**, kèm đánh giá chi tiết về lợi ích, chi phí, thời gian, độ khó, rủi ro, khả năng thành công và điều kiện cần.

---

## PHƯƠNG ÁN 1 – TĂNG CƯỜNG PLAN GỐC (NHẸ NHÀNG)

### Mô tả
Giữ nguyên cấu trúc 4 lớp trên mỗi syllable và phân cấp 6 cấp, nhưng:
- **Tách L3 (Performance) và L4 (Arrangement)** khỏi syllable, đưa lên scope Section/Track/Global.
- Syllable chỉ chứa **L1 (Linguistic) + L2 (Composition)** – pitch, duration, chord context.
- Bổ sung **Timeline ngầm** dựa trên thứ tự syllable và duration, không cần khai báo riêng.
- Vẫn dùng JSON là ground truth nhưng chỉ là serialization của AST nội bộ (chưa thay đổi lớn).
- Converter: **semantic lossless**, không yêu cầu byte‑for‑byte.

### Lợi ích
- ✅ Giảm 70% token so với PLAN gốc.
- ✅ Dễ triển khai, ít thay đổi kiến trúc.
- ✅ Con người và LLM vẫn viết được dễ dàng.
- ✅ Vẫn giữ được Rule Engine và partial edit (dựa trên index tạm thời).

### Chi phí & thời gian
- **Thời gian:** 4–6 tuần.
- **Công sức:** 1 kỹ sư Go/parser + 1 kỹ sư rule engine (2 người).
- **Chi phí:** Thấp (không cần thiết kế lại từ đầu).

### Độ khó
- **Trung bình** – parser phải xử lý scope inheritance và override cơ bản.

### Rủi ro
- 🟡 Timeline ngầm gây khó cho swing, automation, melisma timing chính xác.
- 🟡 Polyphony và counter‑melody không được hỗ trợ tốt.
- 🟡 Partial edit dễ vỡ nếu chỉ dùng index (thiếu stable ID).

### Khả năng thành công
- **85–90%** – vì đã có prototype tương tự trong các dự án khác.

### Điều kiện thành công
- Xây dựng được **scope inheritance** rõ ràng (Section → Line → Syllable).
- Có ít nhất **10 bài hát mẫu** để test tính đúng đắn của parser.
- Rule Engine hỗ trợ tối thiểu hard/soft cho syllable count, rhyme, tone‑melody.

---

## PHƯƠNG ÁN 2 – EVENT‑BASED + TIMELINE (KIẾN TRÚC ĐÚNG)

### Mô tả
Xây dựng lại từ đầu theo **Canonical Semantic Model**:
- Tách biệt các domain: **Timeline** (beat/tick tuyệt đối), **NoteEvent**, **ChordEvent**, **Syllable** (chỉ L1), **PerformanceEvent**, **AutomationEvent**.
- Mối quan hệ: Syllable ↔ NoteEvent (many‑to‑many), NoteEvent ↔ PerformanceEvent (1‑1), ChordEvent có start/end beat.
- Ground truth là **AST** (không phải JSON).
- DSL authoring chia thành các khối: meta, timeline, lyrics, performance, arrangement, control.
- Hỗ trợ đầy đủ polyphony, automation, swing, microtonality.

### Lợi ích
- ✅ Giải quyết triệt để mọi edge‑case (polyphony, melisma, key change, swing).
- ✅ Partial edit ổn định nhờ **persistent ID**.
- ✅ Kiến trúc bền vững, dễ mở rộng sang các thể loại phức tạp.
- ✅ Export MIDI/MusicXML chính xác tuyệt đối.

### Chi phí & thời gian
- **Thời gian:** 12–16 tuần.
- **Công sức:** 2 kỹ sư backend + 1 chuyên gia ngôn ngữ học/âm nhạc.
- **Chi phí:** Cao (thiết kế lại toàn bộ parser, validator, serializer).

### Độ khó
- **Cao** – cần thiết kế AST chuẩn, xử lý cross‑reference, quản lý ID, và parser phức tạp.

### Rủi ro
- 🔴 Over‑engineering nếu MVP chỉ cần vocal‑lead đơn giản.
- 🔴 LLM khó sinh ra các quan hệ (syllable → note) hơn cấu trúc cây.
- 🔴 Con người viết DSL có thể thấy “quan hệ” khó hiểu hơn.
- 🔴 Parser dễ bị lỗi nếu reference không hợp lệ.

### Khả năng thành công
- **60–70%** – phụ thuộc rất nhiều vào chất lượng thiết kế AST và khả năng của LLM.

### Điều kiện thành công
- Phải có **ít nhất 20–30 bài hát mẫu** có cấu trúc phức tạp để thử nghiệm.
- Phải có **prototype nhanh** trong 2 tuần đầu để kiểm chứng tính khả thi.
- LLM phải được fine‑tune hoặc prompting đặc biệt để tạo đúng cú pháp.

---

## PHƯƠNG ÁN 3 – HYBRID MVP (KHUYẾN NGHỊ)

### Mô tả
Kết hợp điểm mạnh của 2 phương án trên:
- **Mặc định** (simple mode): DSL chỉ cần L1+L2 trên syllable, L3/L4 được **tự động sinh** bởi rule engine dựa trên genre và context.
- **Nâng cao** (advanced mode): Cho phép ghi đè bằng `@override` hoặc `@inline` để chỉ định L3/L4 cụ thể cho từng syllable/note.
- Timeline được hỗ trợ **tùy chọn**: nếu có `@timeline` thì dùng beat tuyệt đối; nếu không, suy từ duration và thứ tự.
- Ground truth là **AST nội bộ**, JSON chỉ là serialization.
- Mỗi syllable có **stable ID** (hash từ vị trí) để hỗ trợ partial edit.
- Rule Engine hỗ trợ **Derived rules** và **priority/override** giữa các rule packs.

### Lợi ích
- ✅ Cân bằng giữa đơn giản (90% use case) và linh hoạt (10% phức tạp).
- ✅ Thời gian 8–10 tuần – vừa đủ để có MVP.
- ✅ Con người và LLM đều viết được (simple mode rất gần với lời bài hát).
- ✅ Có đường nâng cấp lên phương án 2 sau này (vì đã có AST + ID).
- ✅ Timeline optional giảm áp lực cho người mới.

### Chi phí & thời gian
- **Thời gian:** 8–10 tuần (chia 3 giai đoạn).
- **Công sức:** 2 kỹ sư (parser + validator) + 1 người thiết kế rule packs.
- **Chi phí:** Trung bình.

### Độ khó
- **Trung bình – Cao** – cần quản lý tốt inheritance và override, đồng thời đảm bảo parser không bị ambiguous.

### Rủi ro
- 🟡 Nếu override lạm dụng, DSL trở nên khó đọc.
- 🟡 Timeline optional có thể dẫn đến inconsistent nếu user không khai báo rõ ràng.
- 🟡 Auto‑apply L3/L4 từ rule engine có thể tạo ra âm thanh “máy móc” nếu chưa tối ưu.

### Khả năng thành công
- **80–85%** – dựa trên kinh nghiệm từ các DSL khác có chế độ simple/advanced.

### Điều kiện thành công
- Phải có **10–15 bài hát mẫu** đa dạng (V‑Pop, Bolero, dân ca) để xây dựng rule pack mặc định.
- Rule engine phải hỗ trợ **derived data** (tự suy direction, contour) để giảm tải cho người viết.
- Scope resolution phải rõ ràng: override → local → global.
- Phải có công cụ CLI để compile/test nhanh.

---

## BẢNG SO SÁNH CHI TIẾT

| Tiêu chí | PA1 – Incremental | PA2 – Event‑based | PA3 – Hybrid (⭐) |
|----------|-------------------|-------------------|-------------------|
| **Thời gian (tuần)** | 4–6 | 12–16 | 8–10 |
| **Độ khó** | Trung bình | Rất cao | Trung bình‑Cao |
| **Rủi ro** | Thấp | Cao | Trung bình |
| **Token saving** | 70% | 90% | 80% |
| **Polyphony** | Không | Có | Hạn chế (override) |
| **Timeline** | Ngầm | Tường minh | Tùy chọn |
| **Partial edit** | Index (rủi ro) | ID (tốt) | ID (tốt) |
| **Con người viết** | Dễ | Khó | Dễ (simple mode) |
| **LLM sinh** | Dễ | Khó | Dễ |
| **Bền vững** | Trung bình | Rất cao | Cao |
| **Khả năng thành công** | 85–90% | 60–70% | 80–85% |
| **Chi phí nâng cấp sau** | Cao | Thấp | Trung bình |

---

## KHUYẾN NGHỊ CUỐI CÙNG

**Tôi đề xuất chọn Phương án 3 – Hybrid MVP** với lộ trình cụ thể:

### Giai đoạn 1 (Tuần 1–3): Thiết kế semantic model cốt lõi
- Định nghĩa **AST** với các node: Song, Section, Line, Syllable (L1+L2), Track, Chord, Performance (optional).
- Xác định scope inheritance: Section → Line → Syllable.
- Thiết kế stable ID: `section_line_syl` (ví dụ: `verse1_0_2`).
- Xây dựng 10 bài hát mẫu ở dạng simple mode.

### Giai đoạn 2 (Tuần 4–6): Parser + Rule Engine cơ bản
- Viết **parser** (Go) đọc DSL → AST.
- Implement **validator** với hard rules (syllable count, rhyme, tone‑melody) và soft rules (melody smoothness).
- Hỗ trợ derived rules: tự tính `melody_direction` từ pitch.
- Tích hợp **YAML rule packs** cho tiếng Việt (phonology, poetic rules, tone mapping).

### Giai đoạn 3 (Tuần 7–10): Nâng cao + Adapters
- Hỗ trợ **advanced mode**: `@override` cho L3/L4.
- Bổ sung timeline optional (`@timeline`).
- Viết **adapter MIDI/MusicXML** (xuất cơ bản).
- Viết **adapter OpenUTAU** (vocal synth).
- Tạo CLI tool: `songc compile`, `songc validate`, `songc export`.

### Sau MVP (Tuần 11+):
- Thu thập feedback, bổ sung rule packs cho các thể loại khác.
- Cân nhắc nâng cấp lên event‑based nếu có nhu cầu polyphony mạnh.

---

## ĐIỀU KIỆN BẮT BUỘC ĐỂ THÀNH CÔNG

| Điều kiện | Cách đảm bảo |
|-----------|--------------|
| Có ít nhất **10 bài hát mẫu** đa dạng (V‑Pop, Bolero, dân ca) | Tập hợp từ nguồn mở hoặc tự sáng tác. |
| **Gold Test Suite** cho tone‑melody mapping | Hợp tác với chuyên gia ngôn ngữ học, xây dựng 50+ cặp đúng/sai. |
| Parser phải đạt **100% semantic roundtrip** | Tự động test với 100+ đoạn DSL. |
| Rule Engine phải xử lý **tối thiểu 500 rules** với hiệu năng < 1s/bài | Dùng Go, indexing, caching. |
| Adapter OpenUTAU phải xuất được file `.ustx` hợp lệ | Test với ít nhất 3 bài hát. |
| Con người (không kỹ thuật) viết được simple mode sau 15 phút hướng dẫn | Tiến hành user testing với 3–5 nhạc sĩ. |

---

**Solution Architect xác nhận:** Phương án 3 là cân bằng tối ưu giữa tốc độ, chất lượng và khả năng mở rộng. Đề nghị Hội đồng phê duyệt và bắt đầu ngay với Giai đoạn 1.