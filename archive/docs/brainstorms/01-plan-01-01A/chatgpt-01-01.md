# ROUND 1 — SUY NGHĨ ĐỘC LẬP

Tôi **đồng ý với hướng xây một Song DSL/Music IR**, nhưng **không đồng ý với một số giả định cốt lõi trong bản hiện tại**. Nếu giữ nguyên thiết kế hiện tại rồi bắt đầu viết parser/schema, rất dễ rơi vào tình trạng DSL trở thành một **JSON khổng lồ được viết lại bằng cú pháp Markdown**, trong khi vẫn chưa giải quyết đúng bài toán biểu diễn âm nhạc.

## 1. Vấn đề cốt lõi

Bài toán thực sự không phải là:

> "Làm một format text mô tả bài hát."

Mà là:

> **Làm một ngôn ngữ biểu diễn quan hệ giữa Language → Time → Note → Harmony → Performance → Arrangement, có thể validate, transform và partial-edit mà không mất ngữ nghĩa.**

Đây là khác biệt rất lớn.

Một bài hát không phải một cây dữ liệu đơn giản:

```text
Song
 └─ Section
     └─ Line
         └─ Syllable
             └─ Note
```

Thực tế có rất nhiều quan hệ **chéo**:

```text
                SONG
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
     LYRICS    TIMELINE   HARMONY
        │         │         │
        └────┬────┴────┬────┘
             ▼         ▼
          SYLLABLE ←→ NOTE
             │         │
             ▼         ▼
           TONE      PITCH
             │         │
             └────┬────┘
                  ▼
             PERFORMANCE
                  │
                  ▼
             ARRANGEMENT
```

**Điểm này quan trọng hơn việc chọn JSON hay Markdown.**

---

# 2. Dữ kiện tôi thấy đúng trong PLAN hiện tại

### Đúng #1 — Cần Intermediate Representation

Đây là quyết định kiến trúc đúng.

Không nên:

```text
Natural Language → AI Music Provider → Audio
```

mà nên:

```text
Natural Language
       ↓
Song IR
       ↓
Validate / Transform / Edit
       ↓
Provider Adapter
       ↓
Audio / MIDI / MusicXML / Vocal Synth...
```

Song IR trở thành **nguồn dữ liệu độc lập với provider**.

---

### Đúng #2 — Cần machine-readable rules

Việc tách:

```text
Song DSL
+
Rule Packs
+
Validator
```

là hợp lý.

Đặc biệt với tiếng Việt, những thứ như:

```text
syllable count
rhyme
tone
tone contour
melody relationship
```

không nên giao hoàn toàn cho LLM.

---

### Đúng #3 — Cần partial edit

Đây là một trong những giá trị lớn nhất của hệ thống.

Ví dụ:

```text
KEEP melody
KEEP harmony
CHANGE lyrics
KEEP arrangement
```

hoặc:

```text
LOCK Chorus melody
CHANGE Verse 2 lyrics
REGENERATE vocal performance
```

Đây là thứ một representation trung gian tốt phải hỗ trợ.

---

### Đúng #4 — Markdown-like authoring là hướng đáng chọn

Tôi **nghiêng về Markdown-like DSL** hơn XML/JSON cho file người dùng trực tiếp viết.

Ví dụ:

```text
# Song: Đêm Mưa

@lang vi
@key Am
@bpm 78
@time 6/8
@genre vn_pop_ballad

## Verse 1

### Line

Mình [ngang] C4 1/8
còn [huyền] D4 1/8
thương [ngang] E4>F#4 1/4
nhau [ngang] G4 2/8
```

Đọc tự nhiên hơn rất nhiều so với:

```json
{
  "syllables": [
    {
      "text": "Mình",
      "tone": "ngang",
      "pitch": ["C4"]
    }
  ]
}
```

**Nhưng có một điều kiện rất quan trọng: Markdown chỉ nên là syntax authoring, không phải semantic model.**

---

# 3. Điều tôi KHÔNG đồng ý trong PLAN hiện tại

## 3.1. "Syllable là Atomic Unit của toàn bộ ngôn ngữ" — tôi cho rằng sai

Đây là vấn đề kiến trúc lớn nhất.

Syllable rất quan trọng, nhưng **không thể là atomic unit của toàn bộ Music IR**.

Ví dụ:

### Melody

```text
C4 ─── D4 ─── E4
```

không nhất thiết có quan hệ 1:1 với syllable.

### Drum

```text
Kick
    x       x
Snare
        x       x
HiHat
    x   x   x   x
```

không có syllable.

### Piano arpeggio

```text
C4 E4 G4 E4
```

không có syllable.

### Harmony

Một chord có thể kéo dài:

```text
| Cmaj7 -------------------- |
        syllable  syllable
```

### Automation

```text
volume
  │          /
  │        /
  │______/
```

cũng không thuộc syllable.

Vì vậy:

> **Syllable là atomic unit của lyric–vocal alignment, không phải atomic unit của toàn bộ Song IR.**

Tôi đề nghị sửa invariant #4 thành:

```text
Atomic musical event = Event

Lyric atomic unit = Syllable
Melody atomic unit = NoteEvent
Harmony atomic unit = ChordEvent
Performance atomic unit = PerformanceEvent
Automation atomic unit = AutomationEvent
```

Sau đó chúng liên kết với nhau.

---

# 4. Kiến trúc tôi nghiêng về

Thay vì:

```text
SONG
 └ SECTION
   └ LINE
     └ PHRASE
       └ SYLLABLE
         └ NOTE
```

tôi đề xuất:

```text
SONG
│
├── META
│
├── STRUCTURE
│   ├── INTRO
│   ├── VERSE
│   ├── PRE_CHORUS
│   ├── CHORUS
│   └── OUTRO
│
├── LYRICS
│   ├── Line
│   │   └── Syllable
│   └── Phrase
│
├── TIMELINE
│   ├── NoteEvent
│   ├── ChordEvent
│   ├── TempoEvent
│   ├── MeterEvent
│   └── Marker
│
├── PERFORMANCE
│   ├── VocalEvent
│   ├── InstrumentEvent
│   └── AutomationEvent
│
├── ARRANGEMENT
│   ├── Track
│   ├── Instrument
│   ├── Pattern
│   └── Mix
│
└── CONSTRAINTS
    ├── Language
    ├── Melody
    ├── Harmony
    ├── Genre
    └── Performance
```

Sau đó dùng **ID/reference** để nối chúng.

Ví dụ:

```text
Syllable s12
    ↓
Note n31
    ↓
Chord c08
    ↓
VocalEvent v15
```

Đây là điểm tôi cho rằng sẽ quyết định DSL có sống được lâu hay không.

---

# 5. Vì vậy tôi không chọn "4 Layer trên mỗi Syllable"

Thiết kế hiện tại:

```text
SYLLABLE
 ├── L1 Linguistic
 ├── L2 Composition
 ├── L3 Performance
 └── L4 Arrangement
```

rất đẹp khi nhìn trên giấy.

Nhưng khi bài hát lớn lên sẽ thành:

```text
syllable:
    text
    tone
    phoneme
    pitch
    duration
    chord
    velocity
    vibrato
    bend
    track
    instrument
    stem
    mix
    fx
    automation
    ...
```

Một dòng lyric có 10 syllable sẽ kéo theo hàng trăm field.

DSL sẽ nhanh chóng biến thành:

> **JSON database serialized thành text.**

Tôi không muốn đi theo hướng đó.

---

# 6. DSL nên giống Markdown, nhưng semantic model phải giống Graph

Đây là phương án tôi nghiêng về nhất.

### Authoring

```text
# Đêm Mưa

@lang vi
@key Am
@bpm 78
@time 6/8
@genre vn_pop_ballad

## Verse 1

### Line A

Mình [ngang] C4 1/8
còn [huyền] D4 1/8
thương [ngang] E4>F#4 1/4
nhau [ngang] G4 2/8
```

Nhưng các thành phần khác viết riêng:

```text
## Harmony

@chords
Am | F | C | G
```

```text
## Arrangement

@track vocal
  role: lead
  instrument: vocal

@track piano
  role: harmony
  instrument: acoustic_piano

@track strings
  role: pad
  instrument: strings
```

Và:

```text
## Performance

@vocal vocal

thương
  technique: portamento
  vibrato: 20% @ 5.5Hz
```

Như vậy người viết không phải nhét mọi thứ vào một dòng syllable.

---

# 7. Một quyết định rất quan trọng: Time phải là "trục chung"

Tôi cho rằng PLAN hiện tại đang thiếu một abstraction cực kỳ quan trọng:

> **Musical Time / Timeline**

Mọi thứ cuối cùng phải có thể quy về:

```text
time / beat / tick
```

Ví dụ:

```text
Syllable "thương"
    start = 2.0 beat
    duration = 0.5 beat

Note E4
    start = 2.0
    duration = 0.25

Note F#4
    start = 2.25
    duration = 0.25

Chord F
    start = 2.0
    end = 4.0
```

Khi đó mới dễ xử lý:

* melody
* harmony
* rhythm
* vocal
* instruments
* automation
* MIDI
* DAW
* quantization
* swing
* timing deviation

---

# 8. "Syllable → Note" cũng không nên là cấu trúc con

Nên là relation:

```text
syllable s12
    maps_to:
        n31
        n32
```

Để biểu diễn:

### Single note

```text
s12 → n31
```

### Melisma

```text
s12 → n31,n32,n33
```

### Một note chứa nhiều syllable

Một số kiểu hát có thể cần:

```text
s12,s13 → n40
```

hoặc một lyric segment kéo dài.

Do đó relation phải linh hoạt:

```text
LYRIC ↔ NOTE
```

thay vì:

```text
SYLLABLE
  └── NOTE[]
```

---

# 9. JSON cũng không nên là "Ground Truth"

Tôi cũng không hoàn toàn đồng ý với:

> JSON = Ground Truth duy nhất.

Ground Truth thực sự nên là:

```text
Canonical Semantic Model / AST
```

Sau đó:

```text
             ┌── Markdown DSL
             │
Canonical AST ├── JSON
             │
             ├── MusicXML
             │
             ├── MIDI
             │
             └── Provider Adapter
```

Tức là:

```text
.songdsl
   ↓
Parser
   ↓
Canonical AST
   ↓
Validator
```

JSON chỉ là một **serialization format** của AST.

Điều này rất quan trọng vì sau này JSON schema thay đổi nhưng semantic model vẫn có thể giữ ổn định.

---

# 10. "Lossless 100% JSON ↔ Inline" cũng cần sửa

Có một mâu thuẫn nhỏ.

Bạn muốn:

```text
Inline → JSON → Inline
```

lossless 100%.

Nhưng lại cho phép:

> comment có thể mất.

Vậy thì đó **không phải lossless**.

Nên phân biệt:

### Semantic lossless

```text
Inline
 ↓
AST
 ↓
JSON
```

Không được mất **semantic information**.

### Textual lossless

```text
Inline
 ↓
AST
 ↓
JSON
 ↓
AST
 ↓
Inline
```

không nhất thiết giữ:

* whitespace
* indentation
* comment position
* formatting

Nếu muốn giữ cả comment/format thì cần **Concrete Syntax Tree (CST)** hoặc source-map.

Tôi khuyên MVP chỉ yêu cầu:

> **Semantic round-trip = 100%.**

Không yêu cầu byte-for-byte round-trip.

---

# 11. Rule Engine cũng cần tách 3 loại

Hiện tại chỉ có:

```text
Hard
Soft
```

Tôi cho rằng cần ít nhất:

```text
HARD
SOFT
DERIVED
```

### HARD

```text
6 syllables
→ fail nếu line có 7
```

### SOFT

```text
melody jump quá lớn
→ -5 score
```

### DERIVED

Rule Engine tự sinh dữ liệu:

```text
tone = sắc
pitch = E4 → F#4

→ inferred_contour = rising
→ inferred_tone_alignment = good
```

Không nên bắt người viết DSL phải khai báo:

```text
melody_direction_vs_previous: up_step_2
```

vì đó là **derived data**.

Nếu người dùng ghi cả hai:

```text
pitch = E4
pitch = F#4

direction = down
```

thì validator phải báo:

```text
DERIVED FIELD CONFLICT
```

---

# 12. Một vấn đề lớn hơn: "Rule Engine hiểu âm nhạc" là chưa đúng

Rule Engine chỉ nên làm:

```text
evaluate predicates
calculate scores
generate diagnostics
apply transformations
```

Không nên kỳ vọng:

```text
YAML → Rule Engine → hiểu âm nhạc
```

YAML không tự biến thành knowledge.

Ví dụ:

```yaml
interval: ">= 4"
```

thì máy hiểu được.

Nhưng:

```yaml
"câu hát này nghe không tự nhiên"
```

thì không thể machine-check một cách đáng tin cậy.

Vì vậy phải phân loại:

```text
Machine-verifiable
        vs
AI-evaluable
        vs
Human-evaluable
```

Đây là một abstraction tôi cho rằng PLAN hiện tại đang thiếu.

---

# 13. Có một giả định cần bác bỏ mạnh: "AI đọc Rules = AI hiểu Rules"

Không đảm bảo.

LLM đọc:

```text
VI_TONE_HARD_001
```

không có nghĩa model sẽ luôn tuân thủ.

Cơ chế đáng tin cậy phải là:

```text
AI generates
      ↓
Parser
      ↓
Canonical AST
      ↓
Deterministic Validator
      ↓
Diagnostics
      ↓
AI correction
      ↓
Validator again
```

LLM chỉ là **generator/corrector**.

Validator mới là authority.

Điểm này tôi hoàn toàn giữ lại từ tầm nhìn ban đầu của PLAN.

---

# 14. Một vấn đề khoa học rất lớn: các luật Tone → Melody hiện tại đang bị khẳng định quá mạnh

Đây là phần tôi đánh dấu:

> 🔴 **CHƯA ĐỦ BẰNG CHỨNG**

Ví dụ:

```yaml
Sắc → không được xuống ≥ 4 semitone
Huyền → không được lên ≥ 4 semitone
```

Đây có thể là **heuristic hữu ích**, nhưng chưa nên biến thành Universal Linguistic Law.

Tương tự:

```text
77% similar motion
```

không nên trực tiếp trở thành:

```yaml
similar_motion_preferred_percent: 0.77
```

rồi suy ra:

> 77% là luật đúng cho mọi bài hát tiếng Việt.

Cần phân biệt:

```text
Research finding
        ↓
Hypothesis
        ↓
Heuristic
        ↓
Validated Rule
```

Tôi đề nghị mọi Rule Pack phải có:

```text
status:
  - experimental
  - provisional
  - validated
  - deprecated

evidence:
  source:
  dataset:
  sample_size:
  confidence:
```

Điều này cực kỳ quan trọng đối với dự án này.

---

# 15. Genre cũng không nên là "Rule Pack = Genre"

Genre thực tế là một **profile**, không phải luật tuyệt đối.

Ví dụ:

```text
Pop Ballad
```

không có nghĩa:

```text
phải có piano
phải có strings
phải C-Am-F-G
```

Nên mô hình:

```text
genre_profile
    ├── defaults
    ├── preferences
    ├── constraints
    ├── exclusions
    └── references
```

Ví dụ:

```text
defaults:
  piano: preferred
  strings: preferred

preferences:
  chord_progression: +0.8

constraints:
  tempo: 65..90

exclusions:
  none
```

Như vậy AI vẫn có không gian sáng tạo.

---

# 16. Tôi đề xuất 5 lớp Semantic thay vì 4 lớp hiện tại

Không phải:

```text
L1 Linguistic
L2 Composition
L3 Performance
L4 Arrangement
```

mà:

```text
L1 CONTENT
    Lyrics / phonology / semantics / rhyme / tone

L2 MUSICAL
    Note / rhythm / harmony / meter / key

L3 PERFORMANCE
    Vocal / articulation / expression / timing

L4 ARRANGEMENT
    Track / instrument / pattern / orchestration

L5 CONTROL
    Constraint / lock / preference / generation / edit semantics
```

**L5 là phần hiện tại còn thiếu.**

Ví dụ:

```text
LOCK melody
KEEP harmony
REGENERATE vocal
ALLOW lyric change
```

không thuộc linguistic/composition/performance/arrangement.

Nó là **control semantics**.

---

# 17. Phương án tôi nghiêng về

## 🥇 Phương án A — Markdown-like DSL + Canonical AST + Rule Packs

Tôi chọn phương án này.

```text
                    .songdsl
                       │
                       ▼
                    Parser
                       │
                       ▼
                Concrete Syntax Tree
                       │
                       ▼
                 Canonical AST
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Validator     Editor       Compiler
          │            │            │
          ▼            ▼            ▼
       Diagnostics   AST Patch    Adapters
                                    │
                    ┌───────────────┼──────────────┐
                    ▼               ▼              ▼
                   MIDI         MusicXML       AI Provider
```

Rules:

```text
rules/
 ├── language/
 ├── music/
 ├── performance/
 ├── arrangement/
 └── validation/
```

Authoring:

```text
.songdsl
```

Canonical machine format:

```text
AST
```

Serialization:

```text
.songjson
```

---

# 18. Phương án B — YAML làm DSL

Không chọn.

Ưu:

* dễ parse
* dễ viết
* ecosystem tốt.

Nhược:

* nhanh chóng biến thành configuration file;
* không có cảm giác "ngôn ngữ âm nhạc";
* expression/reference/relationship sẽ khó đọc;
* syntax verbose;
* dễ bị giới hạn khi DSL phát triển.

---

# 19. Phương án C — XML

Tôi loại.

Quá verbose:

```xml
<syllable>
  <text>thương</text>
  <tone>ngang</tone>
  <pitch>
    <note>E4</note>
    <note>FSharp4</note>
  </pitch>
</syllable>
```

Không phù hợp với mục tiêu:

> AI + musician + human authoring.

---

# 20. Phương án D — JSON

Chỉ nên là:

> **machine serialization / interchange format**

Không nên là authoring language.

---

# 21. Hình dạng DSL mà tôi đề xuất

Tôi sẽ đi theo hướng:

```text
# Đêm Mưa

@lang vi
@key Am
@scale natural_minor
@tempo 78
@meter 6/8
@genre vn_pop_ballad

## Verse 1

### Line A

Mình  [ngang]  C4      1/8
còn   [huyền]  D4      1/8
thương[ngang]  E4>F#4  1/4
nhau  [ngang]  G4      2/8

@rhyme A
@breath after

## Harmony

Am | F | C | G

## Arrangement

@track vocal
  role: lead

@track piano
  role: harmony

## Performance

@vocal
  vibrato: auto
  tone_contour: auto

## Constraints

@lock harmony
@prefer tone_melody_alignment
@allow melisma
```

Điểm quan trọng:

**Không nhét tất cả thông tin vào syllable.**

DSL phải cho phép:

```text
declaration
annotation
reference
relationship
constraint
event
```

là những primitive riêng.

---

# 22. Những điều chưa biết và phải nghiên cứu trước khi khóa grammar

Tôi sẽ **không cho team chốt grammar ngay**.

Có ít nhất 8 vấn đề cần prototype:

| Vấn đề                          | Mức độ      |
| ------------------------------- | ----------- |
| Syllable ↔ Note mapping         | 🔴 Critical |
| Timeline model                  | 🔴 Critical |
| Cross-reference                 | 🔴 Critical |
| Partial edit / LOCK semantics   | 🔴 Critical |
| Polyphony                       | 🔴 Critical |
| Non-vocal instruments           | 🔴 Critical |
| Rule expression language        | 🔴 Critical |
| Markdown-like grammar ambiguity | 🟠 High     |
| Comments/source preservation    | 🟠 High     |
| Provider capability mismatch    | 🟠 High     |

Đặc biệt **polyphony** phải test sớm.

Nếu DSL chỉ hoạt động tốt với:

```text
1 vocal melody
+
1 chord
```

thì nó chưa phải Universal Song IR.

---

# 23. Kết luận Round 1

### Tôi giữ

```text
Song DSL
Provider-independent
Rule Engine
Hard + Soft rules
Validation loop
Markdown-like authoring
JSON serialization
Adapter architecture
Partial edit
```

### Tôi thay đổi

```text
❌ Syllable = atomic unit toàn hệ thống
→ Syllable = atomic lyric unit

❌ 4 layer nằm trong mỗi syllable
→ các domain/event độc lập + references

❌ JSON = Ground Truth
→ Canonical AST = Ground Truth

❌ JSON ↔ DSL textual lossless
→ semantic lossless

❌ YAML = "AI hiểu luật"
→ YAML = machine-readable rule specification

❌ Hard/Soft chỉ có 2 loại
→ Hard / Soft / Derived

❌ Genre = rules tuyệt đối
→ Genre = profile + preference + constraint

❌ tone→melody rule hiện tại coi như sự thật
→ provisional/experimental cho đến khi có Gold Dataset
```

### Kiến trúc tôi nghiêng về

> **Markdown-like Song DSL → Parser → Canonical Music AST → Deterministic Rule Engine → Transform/Edit → Provider Adapters.**

Và tôi cho rằng **chưa nên viết grammar hoàn chỉnh ở bước này**.

Việc đúng tiếp theo là thiết kế **Canonical Semantic Model trước**, đặc biệt giải quyết 4 thứ: **Timeline, Event Model, Cross-Reference và Syllable↔Note mapping**. Khi 4 thứ này đúng, cú pháp Markdown-like phía trên tương đối dễ thiết kế. Ngược lại, nếu khóa grammar trước thì rất dễ phải phá DSL sau này.


Tôi sẽ giữ kết luận Round 1 như trên. **Điểm cần làm tiếp theo không phải viết syntax `.songdsl`, mà là khóa Semantic Model.**

Nếu sang Round 2, tôi đề xuất hội đồng tập trung đúng vào 6 câu hỏi:

1. **Canonical AST gồm những entity nào?**
2. **Timeline dùng beat/tick hay time-based, và có hỗ trợ cả hai không?**
3. **Syllable ↔ Note ↔ Chord liên kết thế nào để xử lý melisma, polyphony và lyric alignment?**
4. **LOCK / KEEP / CHANGE / REGENERATE được biểu diễn thế nào trong IR?**
5. **Rule Engine cần một Rule DSL riêng hay YAML chỉ là serialization của Rule AST?**
6. **Markdown-like syntax tối thiểu phải có những primitive nào để vừa dễ viết vừa không làm mất khả năng biểu diễn?**

Đặc biệt, tôi muốn **stress-test model bằng 5 case khó trước khi chốt grammar**:

* một câu vocal có **melisma**;
* một đoạn **đa bè/polyphonic**;
* một đoạn **không có vocal** nhưng có piano/drum;
* **đổi lyric nhưng khóa melody/harmony**;
* một bài có **tempo/key/meter change** giữa các section.

Nếu model vượt được 5 case này mà không phải tạo workaround đặc biệt, lúc đó mới đáng khóa `.songdsl`.
