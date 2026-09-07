Trước khi vào nội dung: prompt gọi tôi là "Code Reviewer" rồi lại "Software Architect" trong cùng một lượt — tôi sẽ trả lời với tư cách gộp **Kiến trúc sư + Reviewer kỹ thuật**, vì hai góc nhìn này bổ trợ nhau cho câu hỏi đang đặt ra (thiết kế cú pháp text + tính khả thi triển khai).

---

## ROUND 1 — SUY NGHĨ ĐỘC LẬP

### 1. Vấn đề cốt lõi cần quyết định
Không phải "có nên làm DSL hay không" (điều đó plan đã quyết ở Phần A) mà là câu hỏi hẹp hơn được đặt ra cuối cùng: **cú pháp bề mặt (surface syntax) của Inline Format (C.2) nên theo hướng "markup nhẹ kiểu Markdown" hay "cấu trúc lồng nhau kiểu XML/JSON"?** Đây là quyết định về *ergonomics* của ngôn ngữ, tách biệt với model dữ liệu (4 lớp × 6 cấp) đã mô tả ở Phần B — model dữ liệu đó gần như cố định dù chọn cú pháp nào.

### 2. Dữ kiện (facts) rút ra từ tài liệu
- Model dữ liệu có **4 lớp thông tin × 6 cấp scope**, mỗi syllable có thể mang tới ~20 field (tone, phoneme, pitch array, duration array, technique flags, vibrato, pitch-bend curve, track ref...).
- Yêu cầu bắt buộc: converter **lossless 2 chiều** giữa Inline ↔ JSON.
- Ví dụ C.2 đã tự phát minh ra một bộ ký hiệu riêng (`@meta`, `@section`, `[ngang]`, `↘ gliss(80ms)`, `vib(20%,5.5Hz)`, `bend=[...]`) — **đây không phải Markdown**, đây là một DSL dòng-lệnh (line-oriented DSL) mượn hình thức comment `//` và block `@directive` giống YAML/TOML/LilyPond hơn là Markdown thật (Markdown là heading/bold/list, không có khái niệm "field có kiểu + đơn vị + mảng").
- `tone_melody_mapping.yaml` tự ghi nhận `research_validated: false` — tác giả đã tự flag đây là giả thuyết chưa kiểm chứng.

### 3. Điều chưa biết (unknowns) — quan trọng, cần nói rõ trước khi thiết kế cú pháp
- Chưa biết **tần suất field nào thực sự được điền tay** bởi người soạn nhạc vs field nào AI/Rule Engine tự sinh mặc định (auto-fill). Đây là biến số quyết định cú pháp nên tối ưu cho *độ ngắn gọn khi đầy đủ* hay *độ dễ đọc khi rỗng phần lớn*.
- Chưa có **ngữ pháp hình thức (EBNF/PEG)** cho Inline Format — ví dụ C.2 chỉ là minh hoạ, chưa định nghĩa: dấu phân cách token là gì khi field optional bị bỏ qua? Thứ tự field có cố định không? Melisma `E4→F#4` với `1/16+3/16` — làm sao parser biết map phần tử thứ mấy của pitch array khớp phần tử nào của duration array khi có nhiều node optional xen giữa (technique, vibrato...)?
- Chưa rõ **ai/cái gì tính ra `pitch_bend_curve_ms_14bit`** khi người dùng không viết (nói "AI/Engine tự generate theo tone" — nhưng đó là một bài toán DSP không tầm thường, không chỉ là "đọc rule YAML").
- Con số "77% similar motion" (Kirby & Ladd 2016) và các ngưỡng cứng như "sắc xuống ≥4 semitone = fail" — **tôi không có quyền truy cập để xác minh trích dẫn này, không nên coi là sự thật đã kiểm chứng.** Đây đúng là loại thông tin dễ bị hallucinate nếu AI khác trong hội đồng đã "nói ra" nó — cần yêu cầu nguồn gốc cụ thể (DOI/link) hoặc test trên corpus thật trước khi hard-code.

### 4. Giả định đang được đưa vào ngầm (assumptions cần lộ ra)
- Giả định rằng syllable-level là đủ hạt (atomic) cho *mọi* rule — nhưng chính B.3 lại định nghĩa `NOTE_EVENT` là cấp 1, thấp hơn Syllable. Với melisma (1 syllable → nhiều note), câu hỏi "field nào thuộc Syllable, field nào thuộc từng Note" **chưa nhất quán**: ví dụ trong JSON schema C.1, `pitch_bend_curve` được gắn ở cấp Syllable dùng chung cho cả melisma 2 note — vậy mỗi note trong melisma không có bend curve riêng? Đây là mâu thuẫn giữa model B.3 (6 cấp, có Note riêng) và ví dụ hiện thực C.1 (gộp Note vào Syllable).
- Giả định người soạn nhạc sẽ chấp nhận gõ tay cú pháp dày đặc ký hiệu (`↘ gliss(80ms) vib(20%,5.5Hz) bend=[...]`) — thực tế nhiều khả năng 90% các field này sẽ do AI/Engine điền tự động, con người chỉ sửa một phần nhỏ. Nếu vậy, tối ưu độ ngắn gọn cho *người viết tay full field* là sai trọng tâm.

### 5. Phân tích: Markdown-style vs cấu trúc lồng JSON/XML — ai thắng, khi nào?

| Tiêu chí | Markdown-flavored (ký hiệu inline, mỗi dòng = 1 âm tiết) | JSON/XML lồng nhau |
|---|---|---|
| Mật độ thông tin/token (chi phí LLM) | Thắng rõ — đúng như C.2 đã chứng minh | Thua, tốn 2-5x token |
| Dễ đọc bằng mắt cho 1 dòng lyric tuyến tính | Thắng — vì bài hát vốn tuyến tính theo thời gian | Thua — JSON che cấu trúc tuyến tính sau `{}` |
| Biểu diễn scope lồng sâu (Song→Section→Line→Phrase→Syllable→Note, 6 cấp) | Yếu — text phẳng theo dòng không tự nhiên biểu diễn 6 tầng lồng nhau, phải dùng directive (`@section`) mô phỏng, dễ rối khi 1 Phrase chứa nhiều Syllable với optional field khác nhau độ dài | Thắng tự nhiên — JSON vốn sinh ra cho cấu trúc cây |
| Định nghĩa ngữ pháp hình thức, parser ổn định | Khó hơn — cú pháp dày ký hiệu dễ sinh ambiguity (ví dụ `E4→F#4` dùng `→` vừa cho melisma vừa có thể nhầm với direction field khác) | Dễ hơn — JSON Schema có sẵn công cụ validate |
| Độ "immutable" lâu dài (đầu tư 1 lần, dùng 1000 bài) | Rủi ro cao hơn — sửa cú pháp sau này = viết lại migration script phức tạp hơn sửa JSON schema (thêm field mới) | An toàn hơn — JSON dễ mở rộng field mà không phá cú pháp cũ |

→ Đây không phải câu hỏi "chọn 1 trong 2" — bản thân Phần C của plan **đã chọn cả hai** (JSON = ground truth, Inline = authoring). Vấn đề thật sự là: **Inline Format nên "giống Markdown" (loose, ký hiệu tối giản) hay nên là "DSL dòng lệnh có ngữ pháp chặt" (giống LilyPond/ABC notation)?** Tôi nghiêng về vế sau, và tôi cho rằng gọi nó là "giống Markdown" là **lệch hướng thiết kế**, vì:
- Markdown thành công vì nó cho phép *ambiguity graceful degradation* (không parse được vẫn đọc được bằng mắt là văn bản thường). Nhưng DSL âm nhạc của chúng ta cần **round-trip lossless 100%** — mục tiêu này đối lập triết lý với Markdown, vốn không có ngữ pháp hình thức chặt (nhiều Markdown parser cho cùng input ra output khác nhau).
- Tiền lệ tốt hơn để tham khảo là các ngôn ngữ text-based âm nhạc đã tồn tại và có parser ổn định nhiều năm: **ABC notation, LilyPond, Chord-over-lyrics (ChordPro)** — chúng đã giải quyết đúng bài toán "dòng lyric + ký hiệu nhạc xen kẽ, ngắn gọn, con người viết tay được, có parser hình thức". Nên học cú pháp từ nhóm này thay vì "Markdown".

### 6. Phương án
- **A. Markdown-thuần (loose markup):** dùng heading `#`, list `-`, bold cho nhấn — rủi ro cao vì thiếu ngữ pháp chặt cho dữ liệu có kiểu (pitch, duration, curve arrays).
- **B. DSL dòng-lệnh có EBNF chặt, lấy cảm hứng ABC/LilyPond/ChordPro** (thực chất là hướng C.2 đang đi, chỉ cần đặt tên đúng và viết ngữ pháp hình thức) — cân bằng được ngắn gọn + parse được chắc chắn.
- **C. Bỏ hẳn định dạng Inline riêng, dùng YAML làm authoring format** — tận dụng parser có sẵn (không phải tự viết), nhưng verbose hơn C.2 nhiều và không tối ưu token cho LLM.

### 7. Phương án nghiêng về
**Phương án B**, nhưng với 2 điều kiện tiên quyết trước khi viết bất kỳ dòng code parser nào:
1. Phải có **EBNF/PEG hình thức** cho Inline Format (không chỉ ví dụ minh hoạ) — nếu không, "lossless roundtrip" ở C.3 là lời hứa không kiểm chứng được.
2. Phải giải quyết mâu thuẫn **Syllable vs Note-level ownership** (mục 4 ở trên) trước khi cố định schema — nếu không sẽ phải phá vỡ tương thích ngược sau này (vi phạm chính Nguyên tắc bất biến A.3 #1 mà tài liệu tự đặt ra).

Là reviewer, tôi cũng đề nghị **MVP nên giới hạn phạm vi**: implement chuẩn L1+L2 (lời + giai điệu + tone rule) trước, để L3 (pitch-bend curve chi tiết) và L4 (mix/FX) ở dạng optional/loosely-typed trong bản đầu — verbose 4-lớp-đầy-đủ cho mọi syllable ngay từ ngày 1 là rủi ro "boil the ocean" cho một dự án chưa có test corpus thật.

### 8. Điểm chưa chắc chắn cần hội đồng làm rõ
- Trích dẫn nghiên cứu ngôn ngữ học (Kirby & Ladd 2016, tỉ lệ 77%) — cần nguồn xác thực, không nên hard-code ngưỡng semitone cụ thể (≥4) chỉ dựa trên số liệu chưa kiểm chứng này.
- Ai/thành phần nào chịu trách nhiệm sinh `pitch_bend_curve` khi thiếu — cần định nghĩa rõ đây là một sub-engine riêng (DSP), không nằm trong phạm vi "Rule Engine kiểm tra YAML".
- Quan hệ Syllable ↔ Note trong melisma chưa nhất quán giữa B.3 và C.1, cần chốt trước khi viết grammar.