# 1. Kết luận chung

Ý tưởng xây dựng một **Music Knowledge + Rule System** (Hệ thống tri thức âm nhạc + hệ thống luật) để AI có thể sáng tác, chuyển đổi và lưu trữ **Lyrics** (lời bài hát) → **Melody** (giai điệu) → **Harmony** (hòa âm) → **Rhythm** (tiết tấu) → **Arrangement** (phối khí) dưới dạng **Text** (văn bản) là **khả thi**, nhưng không nên được thiết kế như một “từ điển kiến thức âm nhạc khổng lồ” hoặc một hệ thống **Pure Text Rule-Based** (chỉ dùng văn bản và luật).

Kiến trúc phù hợp nhất là **Music Language Platform** (Nền tảng ngôn ngữ âm nhạc) theo hướng **Compiler Architecture** (Kiến trúc trình biên dịch) + **Hybrid Symbolic Architecture** (Kiến trúc ký hiệu lai):

```text
Natural Language / AI
(Ngôn ngữ tự nhiên / AI)
        ↓
AI Composer / Director
(Bộ sáng tác / điều phối AI)
        ↓
Music DSL / AST
(Ngôn ngữ DSL âm nhạc / cây cú pháp trừu tượng)
        ↓
Semantic Analysis
(Phân tích ngữ nghĩa)
        ↓
Rule Engine + Constraint Validator
(Bộ máy luật + bộ kiểm tra ràng buộc)
        ↓
Music IR
(Biểu diễn trung gian âm nhạc)
        ↓
Performance IR
(Biểu diễn trung gian trình diễn)
        ↓
MIDI / MusicXML / DAW / Audio Engine / AI Audio Model
(Chuẩn MIDI / chuẩn MusicXML / phần mềm DAW / bộ máy âm thanh / mô hình AI âm thanh)
```

Ý tưởng cốt lõi cần chuyển từ:

> “Một bộ Knowledge + Rules để bất kỳ AI nào tự sáng tác nhạc hoàn chỉnh”

thành:

> **“Một Music Language Platform (Nền tảng ngôn ngữ âm nhạc) có Semantics (ngữ nghĩa) rõ ràng, trong đó AI là tác nhân sáng tác, còn Compiler/Engine (trình biên dịch/bộ máy) đảm bảo tính đúng đắn và chuyển đổi.”**

---

# 2. Những điểm hội đồng thống nhất

## 2.1. Music IR + Schema + Rules là hướng đúng

Các AI đồng thuận rằng cần tách:

* **Knowledge** (tri thức): kiến thức về ngôn ngữ, thanh nhạc, nhạc cụ, thể loại, hòa âm, tiết tấu...
* **Rules** (luật): các quy tắc và ràng buộc.
* **Music IR** (biểu diễn trung gian âm nhạc): biểu diễn tác phẩm.
* **Transformation** (phép chuyển đổi): các quy luật chuyển đổi.
* **Validation** (kiểm tra tính hợp lệ).
* **Rendering** (kết xuất/hiện thực hóa đầu ra).

Không nên nhúng toàn bộ kiến thức vào một **DSL — Domain Specific Language** (ngôn ngữ miền chuyên biệt) duy nhất.

## 2.2. Text rất phù hợp làm Representation

**Text/DSL** (văn bản/ngôn ngữ DSL) có ưu điểm:

* nhẹ;
* dễ **Version Control** (quản lý phiên bản) bằng Git;
* dễ **Diff/Merge** (so sánh/gộp);
* dễ đọc và chỉnh sửa;
* dễ cho nhiều AI cùng thao tác;
* phù hợp với **Symbolic Music** (âm nhạc ký hiệu);
* có thể **Deterministic** (xác định và tái lập) hơn Audio;
* có thể lưu trữ lâu dài độc lập với một AI Model (mô hình AI).

Các thành phần âm nhạc có thể biểu diễn trong Text gồm:

* **Pitch** (cao độ);
* **Duration** (trường độ);
* **Beat** (phách);
* **Tempo** (tốc độ);
* **Key** (giọng);
* **Chord** (hợp âm);
* **Lyrics** (lời bài hát);
* **Structure** (cấu trúc);
* **Instrumentation** (phối khí/việc sử dụng nhạc cụ);
* **Articulation** (kỹ thuật diễn tấu);
* **Velocity** (cường độ/lực tác động MIDI);
* **Automation** (tự động hóa tham số);
* **Performance Metadata** (siêu dữ liệu trình diễn).

Tuy nhiên:

> **Text ≠ Audio** (Văn bản không đồng nghĩa với âm thanh).

---

# 3. Giới hạn quan trọng nhất: Text ≠ Audio

Các AI đều chỉ ra rằng **Text/Symbolic Representation** (biểu diễn văn bản/ký hiệu) rất tốt để biểu diễn cấu trúc âm nhạc, nhưng không tự động bảo toàn toàn bộ **Audio Fidelity** (độ trung thực âm thanh).

Text có thể mô tả tốt:

* **Pitch** (cao độ);
* **Duration** (trường độ);
* **Beat** (phách);
* **Tempo** (tốc độ);
* **Key** (giọng);
* **Chord** (hợp âm);
* **Lyrics** (lời bài hát);
* **Structure** (cấu trúc);
* **Instrumentation** (phối khí);
* **Articulation** (kỹ thuật diễn tấu);
* **Velocity** (cường độ);
* **Automation** (tự động hóa);
* **Performance Metadata** (siêu dữ liệu trình diễn).

Nhưng các yếu tố như:

* **Timbre** (âm sắc);
* **Micro-Timing** (sai lệch thời gian cực nhỏ);
* **Breathiness** (độ thở trong giọng hát);
* **Vocal Texture** (chất giọng);
* **Groove** (cảm giác nhịp điệu);
* **Distortion** (biến dạng âm thanh);
* **Room Response** (đáp ứng âm học của không gian);
* các sắc thái biểu cảm rất nhỏ

không thể kỳ vọng được biểu diễn hoàn hảo chỉ bằng một **Rule Set** (tập luật) dạng Text.

Vì vậy phải phân biệt:

```text
Music Representation
(Biểu diễn âm nhạc)
        ≠
Performance
(Trình diễn)
        ≠
Audio
(Âm thanh)
```

**Music DSL** (ngôn ngữ DSL âm nhạc) phải lưu được **ý định và cấu trúc**, còn **Audio Engine** (bộ máy âm thanh) chịu trách nhiệm hiện thực hóa thành âm thanh.

---

# 4. Không được đặt niềm tin vào LLM để tuân thủ Rules

Một giả định ban đầu bị phản biện mạnh là:

> “Nếu đưa đầy đủ Rules + Knowledge cho AI, AI sẽ tạo đúng.”

Điều này không đảm bảo.

**LLM — Large Language Model** (mô hình ngôn ngữ lớn) có thể:

* bỏ qua Rule;
* hiểu sai **Semantics** (ngữ nghĩa);
* tạo **Syntax** (cú pháp) sai;
* tạo **Rule Conflict** (xung đột luật);
* quên **Context** (ngữ cảnh) trước đó;
* suy diễn sai khi tác phẩm dài;
* phá **Consistency** (tính nhất quán) khi đổi Genre/Style (thể loại/phong cách).

Vì vậy:

> **LLM chỉ được xem là Composer/Planner/Proposal Engine (bộ sáng tác/bộ lập kế hoạch/bộ máy đề xuất), không phải Authority (nguồn quyết định cuối cùng).**

Authority phải nằm ở:

```text
Parser
(Bộ phân tích cú pháp)
+
Semantic Analyzer
(Bộ phân tích ngữ nghĩa)
+
Rule Engine
(Bộ máy luật)
+
Constraint Validator
(Bộ kiểm tra ràng buộc)
+
Deterministic Transformer
(Bộ chuyển đổi xác định)
```

Quy trình:

```text
AI Generate
(AI sinh nội dung)
      ↓
Parse
(Phân tích cú pháp)
      ↓
Validate
(Kiểm tra)
      ↓
Detect Errors
(Phát hiện lỗi)
      ↓
AI Repair
(AI sửa lỗi)
      ↓
Validate Again
(Kiểm tra lại)
      ↓
Accept
(Chấp nhận)
```

---

# 5. Temporal Model là thành phần bắt buộc

Âm nhạc không phải tập hợp các ô nhịp độc lập.

Cần có **Temporal Model** (mô hình thời gian) + **Context Model** (mô hình ngữ cảnh) xuyên suốt tác phẩm.

Các trạng thái cần quản lý gồm:

* **Musical Time** (thời gian âm nhạc);
* **Beat** (phách);
* **Bar** (ô nhịp);
* **Phrase** (câu nhạc);
* **Motif** (mô-típ);
* **Chord Progression** (tiến trình hợp âm);
* **Key** (giọng);
* **Modulation** (chuyển giọng);
* **Rhythmic State** (trạng thái tiết tấu);
* **Melodic Contour** (đường nét giai điệu);
* **Tension/Release** (căng thẳng/giải tỏa);
* **Instrumentation State** (trạng thái phối khí);
* **Vocal Register** (âm vực giọng hát);
* **Performance State** (trạng thái trình diễn).

Ví dụ:

```text
Bar 8
(Ô nhịp 8)
→ Dominant Preparation
(Chuẩn bị hợp âm dominant)

Bar 9
(Ô nhịp 9)
→ Modulation
(Chuyển giọng)

Bar 10
(Ô nhịp 10)
→ New Tonal Center
(Trung tâm âm mới)

Bar 11
(Ô nhịp 11)
→ Altered Rhythmic Pattern
(Mẫu tiết tấu biến đổi)
```

**Rule Engine** (bộ máy luật) phải hiểu **State Transition** (chuyển trạng thái), không chỉ kiểm tra từng **Bar** (ô nhịp) độc lập.

---

# 6. Không được nhầm “Valid” với “Good”

**Validator** (bộ kiểm tra) có thể chứng minh:

* đúng Key (giọng);
* đúng Chord (hợp âm);
* đúng Meter (số chỉ nhịp);
* đúng Syntax (cú pháp);
* không vi phạm Range (âm vực);
* không có Illegal Note (nốt không hợp lệ);
* Lyrics có thể gắn với Melody.

Nhưng Validator không thể tự chứng minh rằng:

* Melody hay;
* Hook hấp dẫn;
* Groove tốt;
* Vocal tự nhiên;
* Arrangement có cảm xúc;
* bài hát phù hợp thị hiếu;
* Production đạt chất lượng thương mại.

Do đó phải có hai tầng đánh giá:

```text
Correctness
(Tính đúng đắn)
    ↓
Rule / Semantic Validator
(Bộ kiểm tra luật/ngữ nghĩa)

Quality
(Chất lượng)
    ↓
Audio Rendering
(Kết xuất âm thanh)
+
Objective Metrics
(Các chỉ số đánh giá khách quan)
+
Human Listening
(Đánh giá bằng nghe của con người)
```

---

# 7. Rule System phải Modular

Một **Rule System** (hệ thống luật) duy nhất cho mọi loại nhạc rất dễ dẫn tới **Rule Explosion** (bùng nổ số lượng luật).

Có thể xuất hiện:

```text
Classical Rules
(Luật nhạc cổ điển)

Jazz Rules
(Luật Jazz)

Pop Rules
(Luật Pop)

Rock Rules
(Luật Rock)

EDM Rules
(Luật EDM)

Metal Rules
(Luật Metal)

Vocal Rules
(Luật thanh nhạc)

Instrument Rules
(Luật nhạc cụ)

Language Rules
(Luật ngôn ngữ)

Genre Combination Rules
(Luật kết hợp thể loại)
```

Không nên xây một **Monolithic Rule Engine** (bộ máy luật nguyên khối).

Nên có:

```text
Core Rules
(Luật lõi)
    +
Domain Rule Sets
(Bộ luật theo lĩnh vực)
    +
Genre Profiles
(Hồ sơ thể loại)
    +
Style Constraints
(Ràng buộc phong cách)
    +
Conflict Resolver
(Bộ xử lý xung đột)
```

Mỗi Rule phải có **Formal Semantics** (ngữ nghĩa hình thức), không chỉ là văn bản mô tả.

Ví dụ metadata của Rule:

```text
rule_id
(Mã luật)

scope
(Phạm vi áp dụng)

priority
(Độ ưu tiên)

applies_to
(Đối tượng áp dụng)

conflicts_with
(Xung đột với)

severity
(Mức độ nghiêm trọng)

version
(Phiên bản)

explanation
(Giải thích)

validator
(Bộ kiểm tra)
```

---

# 8. Versioning là yêu cầu kiến trúc từ ngày đầu

Nếu **Music IR** (biểu diễn trung gian âm nhạc) hoặc **Rule System** (hệ thống luật) thay đổi:

```text
Music IR v1
(Phiên bản 1)
       ↓
Music IR v2
(Phiên bản 2)
```

thì tác phẩm cũ không được tự nhiên trở thành Invalid (không hợp lệ).

Cần có:

* **Semantic Versioning** (phiên bản ngữ nghĩa);
* **Schema Version** (phiên bản schema);
* **Rule-Set Version** (phiên bản bộ luật);
* **Compatibility Policy** (chính sách tương thích);
* **Migration** (chuyển đổi phiên bản);
* **Backward Compatibility** (tương thích ngược);
* **Migration Test** (kiểm thử chuyển đổi).

Mỗi tác phẩm phải xác định được:

```text
IR Version
(Phiên bản IR)

Rule Version
(Phiên bản luật)

Knowledge Version
(Phiên bản tri thức)

Compiler Version
(Phiên bản trình biên dịch)
```

---

# 9. Kiến trúc cuối cùng được hội đồng ủng hộ

## Layer 1 — Knowledge Layer (Lớp tri thức)

Chứa:

* **Linguistics** (ngôn ngữ học);
* **Vocal Techniques** (kỹ thuật thanh nhạc);
* **Instruments** (nhạc cụ);
* **Music Theory** (lý thuyết âm nhạc);
* **Genre** (thể loại);
* **Style** (phong cách);
* **Arrangement Knowledge** (kiến thức phối khí);
* **Production Knowledge** (kiến thức sản xuất âm nhạc).

Knowledge không trực tiếp quyết định Output (đầu ra).

---

## Layer 2 — Rule Layer (Lớp luật)

Chứa:

```text
Constraint
(Ràng buộc)

Transformation
(Phép chuyển đổi)

Validation
(Kiểm tra tính hợp lệ)

Preference
(Ưu tiên)

Style
(Phong cách)

Conflict
(Xung đột)
```

Tách:

* **Hard Rules** (luật cứng);
* **Soft Rules** (luật mềm).

Ví dụ:

```text
Hard Rule:
Singer Range must be respected.
(Phải tuân thủ âm vực ca sĩ)

Soft Rule:
Melodic Leap > 8 semitones is discouraged.
(Khoảng nhảy giai điệu lớn hơn 8 bán âm bị hạn chế)
```

---

## Layer 3 — Music DSL (Ngôn ngữ DSL âm nhạc)

Đây là ngôn ngữ chính để AI và Compiler giao tiếp.

Các thực thể chính:

```text
Song
(Bài hát)

Section
(Đoạn)

Phrase
(Câu nhạc)

Bar
(Ô nhịp)

Beat
(Phách)

Note
(Nốt)

Syllable
(Âm tiết)

Chord
(Hợp âm)

Track
(Đường nhạc/kênh)

Instrument
(Nhạc cụ)

Performance
(Trình diễn)

Automation
(Tự động hóa)
```

---

# 10. Syllable nên là Atomic Unit

Đối với **Vocal Composition** (sáng tác thanh nhạc), **Syllable** (âm tiết) nên là **Atomic Unit** (đơn vị nguyên tử) liên kết giữa ngôn ngữ và âm nhạc.

Một Syllable có thể chứa:

```text
Linguistic
(Thông tin ngôn ngữ)

tone_id
(Mã thanh điệu)

onset
(Âm đầu)

nucleus
(Âm chính)

coda
(Âm cuối)

rhyme
(Vần)
```

```text
Composition
(Thông tin sáng tác)

pitch
(Cao độ)

duration
(Trường độ)

beat
(Phách)

chord
(Hợp âm)
```

```text
Performance
(Thông tin trình diễn)

velocity
(Cường độ)

articulation
(Kỹ thuật diễn tấu/phát âm)

vibrato
(Rung)

pitch_bend
(Uốn cao độ)

breath
(Hơi thở)
```

```text
Arrangement
(Thông tin phối khí)

track
(Đường nhạc/kênh)

instrument
(Nhạc cụ)

FX
(Hiệu ứng âm thanh)
```

Đây là một trong những điểm quan trọng giúp hệ thống xử lý tốt **Vietnamese Tone** (thanh điệu tiếng Việt) và các ngôn ngữ có đặc tính ngữ âm khác nhau.

---

# 11. AST / Semantic Model

**Music DSL** được **Parse** (phân tích cú pháp) thành **AST — Abstract Syntax Tree** (cây cú pháp trừu tượng).

Sau đó **Semantic Analyzer** (bộ phân tích ngữ nghĩa) kiểm tra:

```text
Syntax
(Cú pháp)
        ↓
Semantics
(Ngữ nghĩa)
        ↓
Temporal Consistency
(Tính nhất quán theo thời gian)
        ↓
Musical Constraints
(Ràng buộc âm nhạc)
        ↓
Linguistic Constraints
(Ràng buộc ngôn ngữ)
```

---

# 12. Performance IR phải tách khỏi Music IR

Đây là bước quan trọng sau **Music IR**.

```text
Music IR
(Biểu diễn âm nhạc)
    ↓
Performance IR
(Biểu diễn trình diễn)
    ↓
Renderer
(Bộ kết xuất)
```

**Music IR** trả lời:

> “Giai điệu là gì?”

**Performance IR** trả lời:

> “Giai điệu này phải được thể hiện như thế nào?”

Ví dụ:

```text
pitch = C4
(Cao độ = C4)

duration = 1/4
(Trường độ = 1/4)

velocity = 82
(Cường độ = 82)

vibrato = light
(Rung = nhẹ)

timing_offset = -12ms
(Độ lệch thời gian = -12ms)

attack = soft
(Độ tấn công = nhẹ)
```

Nhờ vậy hệ thống vẫn giữ **Text-Centric Architecture** (kiến trúc lấy văn bản làm trung tâm) nhưng giảm khoảng cách giữa **Score** (bản phổ) và **Performance** (trình diễn).

---

# 13. Audio không bị loại bỏ — chỉ được tách thành Adapter

Không nên cố xây một **Audio Representation** (biểu diễn âm thanh) để thay thế **Latent Audio Model** (mô hình âm thanh tiềm ẩn).

Thay vào đó:

```text
Music IR
(Biểu diễn âm nhạc)
     ↓
Performance IR
(Biểu diễn trình diễn)
     ↓
Adapters
(Bộ chuyển đổi tích hợp)
 ├─ MIDI
 │  (Chuẩn dữ liệu nhạc số)
 ├─ MusicXML
 │  (Chuẩn trao đổi bản phổ)
 ├─ LilyPond
 │  (Ngôn ngữ biên soạn bản phổ)
 ├─ DAW
 │  (Phần mềm sản xuất âm nhạc)
 ├─ VST
 │  (Chuẩn plugin âm thanh)
 ├─ Vocal Synth
 │  (Bộ tổng hợp giọng hát)
 └─ AI Audio Model
    (Mô hình AI âm thanh)
```

Kiến trúc **Adapter** giúp thay đổi công nghệ Rendering (kết xuất) mà không phá **Music DSL**.

---

# 14. Ba phương án chiến lược

## Phương án A — Pure Knowledge + LLM

(Tri thức + LLM thuần)

```text
Knowledge
(Tri thức)
+
Rules
(Luật)
+
Prompt
(Lời nhắc)
→
LLM
(Mô hình ngôn ngữ lớn)
```

**Không nên chọn.**

Ưu:

* nhanh xây;
* chi phí ban đầu thấp.

Nhược:

* không Deterministic (không đảm bảo kết quả xác định);
* dễ Hallucination (sinh thông tin sai);
* khó Validation (kiểm tra);
* không đảm bảo Format (định dạng);
* không phù hợp làm chuẩn lưu trữ cuối cùng.

---

## Phương án B — Music DSL + Deterministic Engine + AI

(Music DSL + bộ máy xác định + AI)

```text
AI
(AI sáng tác)
→
DSL
(Ngôn ngữ DSL)
→
Compiler
(Trình biên dịch)
→
Rule Engine
(Bộ máy luật)
→
Music IR
(Biểu diễn trung gian âm nhạc)
→
Performance IR
(Biểu diễn trung gian trình diễn)
→
Renderer
(Bộ kết xuất)
```

**Đây là kiến trúc nền tảng được ưu tiên.**

Ưu:

* kiểm soát tốt;
* Deterministic (xác định);
* Versionable (có thể quản lý phiên bản);
* Extensible (dễ mở rộng);
* nhiều AI có thể sử dụng;
* không phụ thuộc một LLM.

Nhược:

* chi phí xây dựng cao;
* cần Compiler;
* cần Validator;
* cần Test Suite;
* có nguy cơ Rule Explosion.

---

## Phương án C — Hybrid Symbolic + Audio Engine

(Ký hiệu lai + bộ máy âm thanh)

Đây thực chất là:

> **Phương án B + Rendering Layer mạnh**

```text
Music DSL
(Ngôn ngữ DSL âm nhạc)
     ↓
Deterministic Engine
(Bộ máy xác định)
     ↓
Performance IR
(Biểu diễn trình diễn)
     ↓
Audio Engine / AI Audio Model
(Bộ máy âm thanh / mô hình AI âm thanh)
```

Đây là phương án tốt nhất nếu mục tiêu cuối cùng là **Audio Output** (đầu ra âm thanh), chứ không chỉ lưu trữ **Symbolic Music** (âm nhạc ký hiệu).

---

# 15. Chiến lược triển khai

Không xây toàn bộ “từ điển âm nhạc” ngay từ đầu.

Không nên bắt đầu bằng:

```text
10.000 Genres
(10.000 thể loại)

100.000 Rules
(100.000 luật)

Toàn bộ Instruments
(Toàn bộ nhạc cụ)

Toàn bộ Vocal Techniques
(Toàn bộ kỹ thuật thanh nhạc)
```

Hãy xây một **Vertical Slice** (lát cắt chức năng hoàn chỉnh):

```text
1 Language
(1 ngôn ngữ)
+
1 Genre
(1 thể loại)
+
8–16 Bars
(8–16 ô nhịp)
+
Lyrics
(Lời bài hát)
+
Melody
(Giai điệu)
+
Harmony
(Hòa âm)
+
Rhythm
(Tiết tấu)
+
Arrangement
(Phối khí)
+
Validator
(Bộ kiểm tra)
+
MIDI
(Đầu ra MIDI)
+
Audio Rendering
(Kết xuất âm thanh)
```

Ví dụ:

```text
Vietnamese
(Tiếng Việt)

Pop Ballad
(Thể loại Pop Ballad)

8 Bars
(8 ô nhịp)
```

---

# 16. PoC — Proof of Concept

Mục tiêu của **PoC — Proof of Concept** (mẫu chứng minh khả thi):

```text
Natural Language
(Ngôn ngữ tự nhiên)
       ↓
AI
(AI sáng tác)
       ↓
.songdsl
(Tệp Music DSL)
       ↓
Parser
(Bộ phân tích cú pháp)
       ↓
Validator
(Bộ kiểm tra)
       ↓
Music IR
(Biểu diễn trung gian âm nhạc)
       ↓
Performance IR
(Biểu diễn trung gian trình diễn)
       ↓
MIDI
(Đầu ra MIDI)
       ↓
Audio
(Âm thanh)
       ↓
Human Listening
(Con người nghe đánh giá)
```

Mục tiêu PoC không phải chứng minh “AI đã có thể sáng tác hoàn hảo”.

Mục tiêu là chứng minh:

1. **Music DSL** có thể biểu diễn đầy đủ một tác phẩm mẫu.
2. **Parser** có thể đọc/ghi chính xác.
3. **Rule Engine** có thể kiểm tra các **Hard Rules**.
4. **AI** có thể sinh và sửa DSL thông qua vòng **Validation Loop** (vòng lặp kiểm tra).
5. **Music IR** có thể trở thành representation trung gian ổn định.
6. Có thể chuyển từ **Music IR → Performance IR → MIDI/Audio**.
7. Thay AI này bằng AI khác nhưng không phá hệ thống.

---

# 17. Bộ kiểm thử bắt buộc

Không nên đánh giá hệ thống chỉ bằng vài bài demo.

Cần xây **Test Suite** (bộ kiểm thử) gồm:

## Syntax Tests

(Kiểm thử cú pháp)

* DSL Parse (phân tích cú pháp DSL);
* Malformed Input (dữ liệu đầu vào sai);
* Schema Compatibility (tương thích schema).

## Semantic Tests

(Kiểm thử ngữ nghĩa)

* Pitch (cao độ);
* Range (âm vực);
* Rhythm (tiết tấu);
* Chord (hợp âm);
* Meter (số chỉ nhịp);
* Key (giọng).

## Linguistic Tests

(Kiểm thử ngôn ngữ)

* Syllable Alignment (căn chỉnh âm tiết);
* Vietnamese Tone (thanh điệu tiếng Việt);
* Rhyme (vần);
* Vowel/Consonant Constraints (ràng buộc nguyên âm/phụ âm).

## Temporal Tests

(Kiểm thử thời gian)

* Modulation (chuyển giọng);
* Syncopation (đảo phách);
* Phrase Continuation (tiếp nối câu nhạc);
* State Transition (chuyển trạng thái).

## Rule Tests

(Kiểm thử luật)

* Hard Rule Violation (vi phạm luật cứng);
* Soft Rule Preference (ưu tiên luật mềm);
* Rule Conflict (xung đột luật);
* Priority (độ ưu tiên).

## Transformation Tests

(Kiểm thử chuyển đổi)

* Lyrics → Melody (lời → giai điệu);
* Melody → Harmony (giai điệu → hòa âm);
* Harmony → Arrangement (hòa âm → phối khí).

## Regression Tests

(Kiểm thử hồi quy)

* IR Version (phiên bản IR);
* Rule Version (phiên bản luật);
* Compiler Version (phiên bản trình biên dịch).

## Perceptual Tests

(Kiểm thử cảm nhận)

* Listening Quality (chất lượng khi nghe);
* Musicality (tính âm nhạc);
* Vocal Naturalness (độ tự nhiên của giọng hát);
* Groove (cảm giác nhịp điệu);
* Style Consistency (tính nhất quán phong cách).

---

# 18. Những vấn đề còn phải giải quyết

## 18.1. AI Compliance

(Mức độ tuân thủ của AI)

Không thể tuyên bố “AI bất kỳ” sẽ tuân thủ DSL giống nhau.

Giải pháp:

> **AI có thể khác nhau, nhưng Compiler/Validator phải giống nhau.**

---

## 18.2. Audio Fidelity

(Độ trung thực âm thanh)

Không thể kỳ vọng **Symbolic System** (hệ thống ký hiệu) tự đạt chất lượng Audio thương mại.

Cần External Renderer (bộ kết xuất bên ngoài) hoặc AI Audio Model (mô hình AI âm thanh).

---

## 18.3. Rule Credibility

(Độ tin cậy của luật)

Rule phải được xây dựng và kiểm chứng bởi:

```text
Music Theory Expert
(Chuyên gia lý thuyết âm nhạc)
+
Composer
(Nhạc sĩ sáng tác)
+
Vocal Expert
(Chuyên gia thanh nhạc)
+
Instrument Expert
(Chuyên gia nhạc cụ)
+
AI / Software Engineer
(Kỹ sư AI / phần mềm)
```

Không nên để LLM tự sinh toàn bộ **Knowledge Base** (cơ sở tri thức) rồi coi đó là Truth (sự thật chuẩn).

---

## 18.4. Knowledge Provenance

(Nguồn gốc và khả năng truy xuất tri thức)

Mỗi Knowledge/Rule nên có:

```text
source
(Nguồn)

author
(Tác giả)

license
(Giấy phép)

version
(Phiên bản)

confidence
(Mức độ tin cậy)

review_status
(Trạng thái kiểm duyệt)
```

Điều này giúp kiểm soát:

* chất lượng;
* nguồn gốc;
* khả năng Audit (kiểm toán/truy vết);
* khả năng cập nhật.

---

## 18.5. Copyright / Legal

(Bản quyền / pháp lý)

Đây là vấn đề ngoài kỹ thuật nhưng không nên bỏ qua.

Cần Audit (kiểm tra) về:

* Knowledge Source (nguồn tri thức);
* Rule Source (nguồn luật);
* Corpus (tập dữ liệu);
* Training/Reference Material (tài liệu huấn luyện/tham chiếu);
* License (giấy phép);
* Output Policy (chính sách đầu ra);
* Jurisdiction (khu vực pháp lý áp dụng).

Tuy nhiên đây không phải lý do để thay đổi kiến trúc kỹ thuật cốt lõi trong giai đoạn PoC.

---

## 18.6. Ecosystem Compatibility

(Khả năng tương thích hệ sinh thái)

Hệ thống phải xác định ngay từ đầu cách giao tiếp với:

* **MIDI** (chuẩn dữ liệu nhạc số);
* **MusicXML** (chuẩn trao đổi bản phổ);
* **DAW — Digital Audio Workstation** (phần mềm sản xuất âm nhạc);
* **VST — Virtual Studio Technology** (chuẩn plugin âm thanh);
* **Vocal Synth** (bộ tổng hợp giọng hát);
* **AI Audio Model** (mô hình AI âm thanh).

Music DSL không nên cạnh tranh với toàn bộ hệ sinh thái hiện có; nó nên đóng vai trò **Intermediate Representation** (biểu diễn trung gian) và **Source Representation** (biểu diễn nguồn).

---

# 19. Kết luận cuối cùng

Hội đồng 5 AI thực tế đang hội tụ về một kết luận khá rõ:

> **Không nên xây một “Music Knowledge Base khổng lồ để AI tự viết nhạc”. Hãy xây một Music Language Platform (Nền tảng ngôn ngữ âm nhạc).**

Nền tảng này nên có:

```text
Knowledge
(Tri thức)
   ↓
Rules
(Luật)
   ↓
Music DSL
(Ngôn ngữ DSL âm nhạc)
   ↓
AST
(Cây cú pháp trừu tượng)
   ↓
Semantic Analysis
(Phân tích ngữ nghĩa)
   ↓
Temporal Model
(Mô hình trạng thái theo thời gian)
   ↓
Rule Engine
(Bộ máy luật)
   ↓
Music IR
(Biểu diễn trung gian âm nhạc)
   ↓
Performance IR
(Biểu diễn trung gian trình diễn)
   ↓
Rendering Adapters
(Bộ chuyển đổi kết xuất)
```

Nguyên tắc vận hành cuối cùng:

> **AI đề xuất.
> Parser phân tích.
> Compiler hiểu.
> Rule Engine kiểm tra.
> Validator xác nhận tính hợp lệ.
> IR lưu trữ.
> Renderer hiện thực hóa.
> Human + Audio Evaluation xác nhận chất lượng.**

Chiến lược tốt nhất là:

> **Hybrid Symbolic Compiler Architecture** (Kiến trúc trình biên dịch ký hiệu lai)

kết hợp:

* **Music DSL** (ngôn ngữ DSL âm nhạc);
* **Music IR** (biểu diễn trung gian âm nhạc);
* **Performance IR** (biểu diễn trung gian trình diễn);
* **Formal Rule System** (hệ thống luật hình thức);
* **Deterministic Validation** (kiểm tra xác định);
* **Temporal Model** (mô hình thời gian/ngữ cảnh);
* **Audio Rendering Layer** (lớp kết xuất âm thanh);
* **AI Composer** (AI sáng tác).

Không nên xây toàn bộ hệ thống cùng lúc. Hãy bắt đầu bằng một **Vertical Slice** (lát cắt chức năng hoàn chỉnh): **1 Language (ngôn ngữ) + 1 Genre (thể loại) + Lyrics → Melody → Harmony → Rhythm → Arrangement → Validator → MIDI → Audio**.

Sau khi chứng minh được **Music IR + Rule Engine + Validation Loop + Rendering** hoạt động ổn định, hệ thống mới mở rộng dần sang:

**nhiều ngôn ngữ → nhiều thể loại → nhiều nhạc cụ → nhiều kỹ thuật thanh nhạc → nhiều Rule Set → nhiều AI → nhiều Audio Renderer.**

Mục tiêu dài hạn không phải là tạo ra một “AI biết tất cả về âm nhạc”, mà là tạo ra một **chuẩn ngôn ngữ và compiler cho âm nhạc**, để nhiều AI khác nhau có thể cùng hiểu, sáng tác, kiểm tra, chuyển đổi và tái sử dụng cùng một tác phẩm mà không phụ thuộc vào một AI duy nhất.
