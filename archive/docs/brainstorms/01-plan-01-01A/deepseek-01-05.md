# ROUND 1 – SUY NGHĨ ĐỘC LẬP

**Vai trò:** Debugger  
**Nhiệm vụ:** Phát hiện các vấn đề logic, bằng chứng còn thiếu, giả định yếu và điểm chưa chắc chắn trong PLAN‑01‑01, từ đó đưa ra phương án điều chỉnh với bằng chứng rõ ràng.

---

## Vấn đề cốt lõi

Kế hoạch đặt ra một tham vọng lớn: xây dựng một ngôn ngữ trung gian (Song DSL / Music IR) dạng text thuần túy có thể bao quát 6 khía cạnh của âm nhạc, vừa đọc/viết được bởi con người, vừa parse được bởi máy, vừa kiểm soát được bởi Rule Engine. Tầm nhìn tổng thể về một “Song Compiler” (giống TypeScript Compiler) với lớp IR độc lập provider là đúng hướng và giải quyết được các điểm yếu hiện tại (blackbox, thanh điệu, lock‑in, thiếu rule, prompt không ổn định). Tuy nhiên, **cách thức tổ chức thông tin** trong PLAN hiện tại có nhiều vấn đề.

---

## Dữ kiện từ PLAN (phần tôi kiểm tra)

1. **Atomic unit được chọn là âm tiết (syllable)** và mỗi syllable phải chứa đủ 4 lớp thông tin: L1 (linguistic), L2 (composition), L3 (performance), L4 (arrangement).
2. **Cấu trúc phân cấp 6 cấp** từ Song → Section → Line → Phrase → Syllable → Note.
3. **2 định dạng song song**: JSON schema (ground truth) và Inline compact format (`.songdsl`) với yêu cầu converter 2 chiều **lossless 100%**.
4. **Rule Engine** dùng YAML rule packs với Hard/Soft rules, có weight và cơ chế validation loop (AI sinh → rule kiểm → AI sửa, tối đa 3 vòng).
5. **5 nguyên tắc bất biến**, trong đó nhấn mạnh syllable là atomic unit và MusicXML/MIDI chỉ là target format.

---

## Điều chưa biết / chưa được chứng minh

| Hạng mục | Vấn đề |
|----------|--------|
| **Tính hiệu quả của atomic unit = syllable** | Chưa có bằng chứng thực nghiệm nào cho thấy việc nhồi 4 lớp thông tin vào mỗi syllable là khả thi với bài hát thực tế (>300 syllables). Chưa có thống kê về số field trung bình / syllable, và liệu con người có thể viết/sửa được hay không. |
| **Lossless converter 2 chiều** | Chưa chỉ rõ cách xử lý comment, annotation, optional fields, hay thông tin không có trong JSON (ví dụ: thứ tự syllable, nhóm từ ghép). Liệu có thực sự cần giữ lại toàn bộ whitespace và định dạng để gọi là lossless? |
| **Xử lý các thành phần không lời** | PLAN chỉ tập trung vào vocal. Không rõ intro, outro, instrumental bridge, drum pattern, automation, hay các track không có lyrics được biểu diễn như thế nào trong một ngôn ngữ lấy syllable làm trung tâm. |
| **Biến thể vùng miền (dialects) và microtonality** | Chưa đề cập đến cách xử lý thanh điệu khác nhau giữa Bắc‑Trung‑Nam, hay các nốt luyến ngoài 12‑TET (thường gặp trong bolero, dân ca). |
| **Rule Engine với derived rules** | PLAN chỉ có hard và soft rules. Không có cơ chế để engine tự suy luận ra các thông tin từ dữ liệu (ví dụ: từ pitch array → direction), mà bắt người viết phải khai báo, gây dư thừa. |
| **Tương thích với LLM** | Chưa có benchmark về việc LLM có thể sinh đúng inline compact format với số lượng rules và field phức tạp hay không. Liệu 3 vòng validation có đủ để sửa được lỗi? |

---

## Giả định cần kiểm tra

1. **Mọi khía cạnh âm nhạc đều có thể gán vào syllable** – Giả định này bỏ qua các thành phần phi lời và các sự kiện không đồng bộ với lời hát.
2. **Con người sẽ sẵn sàng viết DSL nếu nó đủ ngắn** – Chưa có bằng chứng rằng người dùng cuối (nhạc sĩ, ca sĩ) sẽ chấp nhận học một cú pháp phức tạp thay vì giao tiếp bằng ngôn ngữ tự nhiên với AI.
3. **Hard rules là đủ mạnh để ngăn "trại giọng"** – Các hard rule được đưa ra (sắc không xuống ≥4 semitone) có thể quá cứng và triệt tiêu những sáng tạo có chủ đích, đặc biệt trong các thể loại mang tính biểu cảm cao.
4. **Validated rules từ nghiên cứu có thể áp dụng trực tiếp** – Nghiên cứu Kirby & Ladd 2016 chỉ mang tính tham khảo, chưa được kiểm chứng trên corpus tiếng Việt đa dạng. Việc coi nó là baseline có thể dẫn đến false positive/negative.

---

## Phân tích các điểm yếu cấu trúc

### 1. Vấn đề “nhiều lớp trên một atomic unit”

Việc gán L1, L2, L3, L4 cho mỗi syllable tạo ra một cấu trúc dữ liệu cực kỳ nặng và dư thừa. Ví dụ:
- Trong một đoạn verse, hầu hết các syllable sẽ có cùng `track_id`, `instrument`, `mix`, `stem` (L4) và nhiều thuộc tính performance (L3) chỉ khác nhau ở một vài điểm nhấn.
- Melody (L2) có thể kéo dài qua nhiều syllable hoặc một syllable có nhiều nốt; việc gắn `pitch_array` và `duration_array` vào từng syllable đã tạo ra sự trùng lặp.
- Hợp âm (chord context) thay đổi theo ô nhịp, không theo syllable.

Hậu quả: File DSL sẽ có kích thước gấp 5‑10 lần so với một biểu diễn tối ưu, gây khó đọc, khó viết và tốn token khi dùng với LLM. Điều này trực tiếp mâu thuẫn với mục tiêu “tiết kiệm token” mà họ đặt ra cho inline format.

### 2. Thiếu Timeline abstraction

PLAN sử dụng cấu trúc phân cấp (Song → Section → Line → Syllable → Note) nhưng **không có trục thời gian chung** (beat, tick, time). Mọi thứ được sắp xếp theo thứ tự và duration, nhưng khi cần xử lý:
- Swing / delay / quantization
- Automation (volume, pan, effect change theo thời gian)
- Đồng bộ hóa với các track khác (drum, bass, pad)
- Key change, tempo change

thì việc chỉ dựa vào thứ tự và duration là không đủ. Cần một **timeline model** tường minh (start_beat, duration hoặc end_beat) cho từng sự kiện.

### 3. Yêu cầu “lossless converter 2 chiều” là không thực tế

PLAN yêu cầu inline ↔ JSON lossless 100%, nhưng lại cho phép comment có thể bị mất. Đó là mâu thuẫn. Nếu comment không được giữ, thì không phải lossless. Nếu comment được giữ, thì JSON sẽ phình to với các field `_comment`. Ngoài ra, việc decompile từ JSON sang inline sẽ khó tái tạo lại whitespace, thứ tự các dòng, và các cấu trúc phụ thuộc vào thói quen viết của con người.

Cần phân biệt rõ:
- **Semantic lossless** (không mất thông tin âm nhạc)
- **Syntactic lossless** (giữ nguyên cú pháp, whitespace, comment)

PLAN nên chọn semantic lossless cho MVP và tuyên bố rõ ràng.

### 4. Rule Engine: thiếu derived rules và priority

Hard và soft rules là cần thiết, nhưng PLAN chưa tính đến các **derived rules** – thông tin có thể suy ra từ dữ liệu, không cần người dùng khai báo. Ví dụ:
- Từ `pitch_array` và `duration_array`, có thể suy ra `melody_direction_vs_previous`.
- Từ `tone_id` và pitch, có thể suy ra `tone_alignment_score`.

Việc bắt người dùng khai báo các thông tin này vừa dư thừa, vừa tăng khả năng sai sót. Nếu người dùng khai báo mâu thuẫn với dữ liệu, validator phải có cơ chế phát hiện và xử lý (ưu tiên cái nào?). Cần một **priority/override mechanism** giữa các rules.

### 5. Thiếu các edge‑case quan trọng

PLAN bỏ sót một số tình huống thực tế:
- **Từ ghép và reduplication**: “thương nhau”, “lặng lẽ” – nếu tách rời syllable thì mất nghĩa và vần, nếu gộp thì mất khả năng gắn pitch riêng.
- **Melisma dài** (một syllable nhiều nốt) – có thể xử lý bằng `pitch_array`, nhưng nếu có 5‑6 nốt với kỹ thuật phức tạp, inline format sẽ trở nên rối.
- **Non‑lexical syllable**: “la‑la”, “ơ‑hờ”, hơi thở, tiếng ồn – không có tone_id, không nằm trong từ điển.
- **Code‑switching**: tiếng Anh lẫn trong lời Việt – tone_id của từ tiếng Anh = null, gây lỗi rule.
- **Polyphony và counter‑melody**: nhiều giọng hát cùng lúc – mỗi syllable gắn với track nào? Làm sao biểu diễn khi hai track có lời khác nhau?

---

## Phương án đề xuất (sau phân tích)

Tôi đề xuất **không giữ nguyên** PLAN hiện tại, mà thay đổi cấu trúc representation theo hướng:

### A. Chuyển từ “Syllable‑centric” sang “Event‑based + Timeline”

- **Atomic unit**: Sự kiện (Event) – bao gồm NoteEvent, ChordEvent, AutomationEvent, PerformanceEvent, và SyllableEvent (cho lời hát).
- **Timeline** là trục chung, mọi event đều có `start_beat` và `duration` (hoặc `end_beat`).
- **Quan hệ**: Syllable ↔ NoteEvent (many‑to‑many) để hỗ trợ melisma và các trường hợp nhiều syllable trên một nốt.
- Các lớp L1, L2, L3, L4 được tách ra và gán vào các event/scope phù hợp:
  - L1 (linguistic) – chỉ có trong SyllableEvent.
  - L2 (pitch, duration, key, scale) – gắn với NoteEvent và Section/Song.
  - L3 (vibrato, bend, technique) – gắn với PerformanceEvent, liên kết với NoteEvent hoặc SyllableEvent.
  - L4 (track, instrument, mix, fx) – gắn với Track và Section/Song.

### B. Ground truth = Canonical AST / Semantic Model, không phải JSON

- JSON chỉ là một serialization format (có thể thay bằng Protobuf, MessagePack, v.v…).
- AST là nguồn duy nhất để validator, transformer, adapter làm việc.

### C. Converter chỉ yêu cầu semantic lossless

- Không cần giữ comment, whitespace, thứ tự dòng.
- Nếu cần lưu comment, có thể dùng field `_metadata` hoặc `_annotations` ở cấp độ AST.

### D. Bổ sung derived rules và priority

- Cho phép rule engine tự tính toán các thông tin suy diễn và so sánh với dữ liệu khai báo.
- Nếu xung đột, ưu tiên khai báo của người dùng (có thể ghi đè) nhưng vẫn ghi log warning.

### E. Hỗ trợ dialect và microtonality

- Thêm field `dialect` (vi‑north, vi‑central, vi‑south) trong meta.
- Hỗ trợ pitch bằng `cent` (ví dụ: `C4+25c`) ngoài tên nốt.

### F. Xây dựng prototype với 5‑10 bài hát thực tế trước khi khóa grammar

- Thu thập corpus đa dạng (pop, ballad, bolero, dân ca) để kiểm tra tính đủ của mô hình event‑based.
- Thử nghiệm với con người (nhạc sĩ) viết DSL để đánh giá khả năng tiếp nhận.

---

## Phương án tôi nghiêng về

Tôi nghiêng về **Event‑based + Timeline + Canonical AST** như mô tả ở trên. Đây là cách tiếp cận bền vững và xử lý được đa dạng các tình huống âm nhạc, đồng thời vẫn giữ được các giá trị cốt lõi (IR độc lập provider, Rule Engine, Validation Loop, Partial Edit). Tuy nhiên, tôi thừa nhận rằng việc thiết kế một AST như vậy đòi hỏi nhiều công sức và có thể khiến DSL authoring trở nên phức tạp hơn đối với người dùng cuối. Vì vậy, tôi đề xuất một **hybrid MVP**: mặc định người dùng chỉ cần viết L1+L2 trên syllable (simple mode), còn L3, L4, timeline, track được tự động sinh từ genre profile và có thể được override bằng các annotation khi cần.

---

## Điểm chưa chắc chắn / cần thử nghiệm

| Điểm | Lý do chưa chắc chắn |
|------|----------------------|
| **Mức độ chấp nhận của người dùng** | Chưa có thử nghiệm thực tế với nhạc sĩ. Họ có thể vẫn thích prompt tự nhiên hơn là học DSL. |
| **Khả năng sinh của LLM với event‑based model** | LLM có thể khó tạo ra các quan hệ (references) và ID hơn là một cấu trúc cây đơn giản. Cần thử nghiệm với GPT‑4/Claude. |
| **Tối ưu token** | Event‑based model có thể tiết kiệm token hay không vẫn còn phụ thuộc vào cách trình bày. Cần đo lường cụ thể. |
| **Xác minh hard rules** | Các hard rule hiện tại (dựa trên 1 paper) có thể không đủ hoặc quá cứng. Cần xây dựng Gold Test Suite và thống kê lỗi trước khi khẳng định. |
| **Tính tương thích với Adapter** | Các provider hiện tại (Suno, Udio) không hỗ trợ IR chi tiết. Adapter sẽ phải down‑cast, làm mất giá trị của L3/L4. Phương án này chỉ thực sự có giá trị với OpenUTAU/DiffSinger hoặc tự train model. |

---

## Kết luận sau phân tích

PLAN‑01‑01 có tầm nhìn đúng, nhưng **cách tổ chức thông tin** đang là điểm yếu cốt lõi. Việc coi syllable là atomic unit và nhét 4 lớp vào mỗi syllable sẽ dẫn đến một DSL quá nặng, khó đọc/viết, và không xử lý được các tình huống phi‑vocal. Tôi đề xuất tái cấu trúc theo hướng **event‑based + timeline + canonical AST**, với converter semantic lossless, bổ sung derived rules và hỗ trợ dialect/microtonality. Quan trọng nhất: **phải có prototype thực tế với bài hát thật và người dùng thật trước khi khóa grammar**.

---

*Debugger sẽ tiếp tục đặt câu hỏi và phản biện trong các vòng sau, đặc biệt về khả năng triển khai event‑based model và chiến lược migration từ PLAN gốc.*