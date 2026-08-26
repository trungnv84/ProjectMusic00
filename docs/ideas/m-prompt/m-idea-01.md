Đúng với mô hình bạn vừa chốt, tôi sẽ **tách tài liệu 1 và tài liệu 2 thành hai loại hoàn toàn khác nhau**:

* **Tài liệu 1 = “Prompt Specification / Prompt Builder”**: dạy AI **biến yêu cầu tự do của người dùng thành một prompt chuẩn**, có cấu trúc và đầy đủ thông tin.
* **Tài liệu 2 = “Music Composition Knowledge Base”**: cung cấp **kiến thức và quy luật để AI dùng prompt chuẩn đó mà sáng tác**, rồi xuất MusicXML 4.0.

Điểm quan trọng là **tài liệu 1 không nên chứa quá nhiều kiến thức sáng tác**. Nó chủ yếu định nghĩa *AI phải hỏi gì, suy luận gì, chuẩn hóa gì, và tạo prompt chuẩn như thế nào*.

---

# 1. Tổng thể hệ thống

Kiến trúc tôi đề xuất là:

```text
                NGƯỜI DÙNG
                    │
          Prompt tự do / yêu cầu
                    │
                    ▼
        ┌────────────────────────┐
        │        STEP 1          │
        │   PROMPT BUILDER AI    │
        │                        │
        │ Tài liệu 1             │
        │ + Prompt tự do         │
        └───────────┬────────────┘
                    │
                    ▼
             PROMPT NHÁP
                    │
               Người dùng
             review/chỉnh sửa
                    │
                    ▼
              PROMPT CHUẨN
                    │
                    ▼
        ┌────────────────────────┐
        │        STEP 2          │
        │    MUSIC COMPOSER AI   │
        │                        │
        │ Tài liệu 2             │
        │ + Prompt chuẩn         │
        └───────────┬────────────┘
                    │
                    ▼
              MusicXML 4.0
```

Đây là kiến trúc rất hợp lý vì nó tách:

> **“Người dùng muốn bài gì?”**

khỏi

> **“AI phải sáng tác bài đó như thế nào?”**

---

# 2. Tài liệu 1 phải chứa những gì?

Tài liệu 1 nên được xem như **hợp đồng của Prompt Builder**.

Nó không dạy AI sáng tác nhạc.

Nó dạy AI:

> “Từ yêu cầu tự do của người dùng, hãy biến nó thành một đặc tả bài hát hoàn chỉnh.”

Tôi sẽ tổ chức tài liệu 1 như sau:

```text
DOCUMENT_1_PROMPT_BUILDER/

00_overview
01_prompt_schema
02_required_fields
03_optional_fields
04_question_rules
05_inference_rules
06_normalization_rules
07_conflict_rules
08_default_rules
09_prompt_output_rules
10_validation_rules
11_examples
```

---

# 3. `01_prompt_schema` là phần quan trọng nhất

Bạn phải định nghĩa **Prompt chuẩn có cấu trúc cố định**.

Ví dụ:

```text
SONG_REQUEST

PROJECT
    title
    purpose

LANGUAGE
    language
    dialect
    pronunciation_preferences

LYRICAL_CONCEPT
    theme
    story
    viewpoint
    characters
    setting
    imagery
    symbolism
    emotional_arc

GENRE
    primary_genre
    subgenre
    reference_style
    era

SONG_STRUCTURE
    sections
    section_order
    section_lengths
    repetition_rules

LYRIC
    syllable_preferences
    rhyme_scheme
    poetic_style
    hook
    vocabulary_style

MELODY
    key
    scale
    tempo
    meter
    vocal_range
    melodic_character
    phrase_length
    contour

RHYTHM
    groove
    rhythmic_density
    syncopation
    note_density

HARMONY
    chord_style
    progression_style
    harmonic_density
    modulation

ARRANGEMENT
    instruments
    instrumentation
    texture
    dynamics

VOCAL
    voice_type
    range
    performance_style
    articulation

PRODUCTION
    dynamics
    stereo
    performance_character

OUTPUT
    format = MusicXML 4.0
    required_parts
    required_metadata
```

Đây chính là **“form” mà AI bước 1 phải điền**.

---

# 4. Tài liệu 1 phải quy định trường nào bắt buộc

Ví dụ:

```text
REQUIRED

language
genre
theme
emotional_direction
song_structure
vocal_type
tempo
meter
key_or_key_strategy
output_format
```

Những cái khác:

```text
OPTIONAL

instrumentation
specific chord progression
reference artist
exact vocal range
exact rhyme scheme
```

Nhưng có một nguyên tắc rất hay:

> **Không phải trường nào thiếu cũng hỏi người dùng.**

AI phải biết cái gì có thể suy luận.

Ví dụ người dùng nói:

> “Viết một bài pop ballad buồn về chia tay, giọng nữ.”

AI có thể tự suy luận:

```text
genre = pop_ballad
theme = breakup
mood = sad
vocal = female
tempo = moderate-slow
```

Nhưng có thể hỏi người dùng:

> “Bạn muốn kết thúc buồn hay có hy vọng?”

nếu điều đó ảnh hưởng đáng kể đến tác phẩm.

---

# 5. Vì vậy tài liệu 1 cần `question_rules`

Đây là phần cực kỳ quan trọng.

AI phải biết:

### Khi nào không được hỏi?

```text
Information can be safely inferred.
```

### Khi nào phải hỏi?

```text
Missing information materially changes the result.
```

### Khi nào tự chọn?

```text
Use default if:
    ambiguity is minor
    AND
    a reasonable conventional choice exists.
```

Ví dụ:

Người dùng nói:

> “Viết bài Ballad.”

Không cần hỏi:

> “Bạn muốn time signature là 4/4 hay 6/8?”

AI có thể tự chọn 4/4 hoặc 6/8 dựa vào phong cách.

Nhưng nếu người dùng nói:

> “Viết cho nam tenor nhưng tôi muốn nốt cao nhất là C5.”

thì đó là **ràng buộc cụ thể**, phải giữ nguyên.

---

# 6. `inference_rules`

Bạn nên tách riêng phần này.

Ví dụ:

```text
POP BALLAD
→ tempo usually moderate/slow
→ melody usually lyrical
→ verse lower intensity
→ chorus higher intensity
```

Hoặc:

```text
"bài hát dành cho trẻ em"
→ vocabulary simpler
→ shorter phrases
→ narrower melodic range
→ stronger repetition
```

Đây không phải luật sáng tác tuyệt đối.

Đây là **luật suy luận để điền prompt**.

---

# 7. `normalization_rules`

Cực kỳ cần thiết.

Người dùng có thể viết:

> “nhạc buồn kiểu nhẹ nhàng”

AI phải biến thành:

```text
MOOD:
    sadness = high
    intimacy = medium-high
    intensity = low-medium

MELODIC_CHARACTER:
    smooth
    lyrical

RHYTHMIC_CHARACTER:
    low density
```

Người dùng có thể viết:

> “kiểu nhạc Hàn Quốc nhẹ nhẹ”

AI không nên đưa nguyên câu đó vào prompt chuẩn. Nó phải chuẩn hóa thành các thuộc tính có thể sử dụng.

---

# 8. `conflict_rules`

Ví dụ người dùng yêu cầu:

> “Giọng nữ nhưng âm vực tenor nam.”

AI phải phát hiện:

```text
POTENTIAL CONFLICT
```

và đưa ra cảnh báo để người dùng chỉnh.

Tương tự:

```text
tempo = 60 BPM
+
dance-pop
```

không nhất thiết là bất khả thi, nhưng là trường hợp cần xem xét.

---

# 9. Cuối bước 1, AI nên trả ra một “Prompt chuẩn”

Tôi khuyên **không để Prompt chuẩn là văn xuôi tự do**.

Nên là một cấu trúc có cố định.

Ví dụ:

```text
SONG_REQUEST

LANGUAGE:
Vietnamese

GENRE:
Vietnamese Pop Ballad

THEME:
First love and separation

MOOD:
Melancholic
Nostalgic
Hopeful ending

VOCAL:
Female
Moderate range

TEMPO:
76 BPM

METER:
4/4

KEY:
G major

STRUCTURE:
Intro
Verse 1
Pre-Chorus
Chorus
Verse 2
Pre-Chorus
Chorus
Bridge
Final Chorus
Outro

LYRIC:
8–10 syllables per line
Natural Vietnamese prosody
Moderate rhyme density
Strong chorus hook

MELODY:
Lyrical
Mostly stepwise
Moderate range
Chorus higher than verse

HARMONY:
Contemporary pop-ballad

ARRANGEMENT:
Piano
Acoustic guitar
Bass
Drums
Strings

OUTPUT:
MusicXML 4.0

...
```

Người dùng nhìn cái này và sửa trực tiếp.

Đó chính là **Prompt chuẩn**.

---

# 10. Còn tài liệu 2 hoàn toàn khác

Tài liệu 2 là **Knowledge Base cho Composer AI**.

Nó phải trả lời câu:

> “Để thực hiện Prompt chuẩn này, AI cần biết những quy luật nào?”

Tôi sẽ chia như sau:

```text
DOCUMENT_2_MUSIC_KNOWLEDGE/

01_LANGUAGE/
02_POETRY/
03_LYRICS/
04_MELODY/
05_RHYTHM/
06_HARMONY/
07_FORM/
08_VOCAL/
09_ARRANGEMENT/
10_GENRE/
11_MIXING_PERFORMANCE/
12_MUSICXML/
13_VALIDATION/
14_EXAMPLES/
```

---

# 11. `01_LANGUAGE`

Đối với tiếng Việt:

```text
Vietnamese phonology
syllable structure
vowel characteristics
consonants
tone system
stress
prosody
pronunciation
```

Đặc biệt nếu bạn muốn AI phổ nhạc tiếng Việt tốt, đây sẽ là một khối kiến thức rất lớn.

---

# 12. `02_POETRY`

```text
meter
rhyme
rhyme position
verse construction
poetic imagery
metaphor
symbolism
narrative
repetition
hook
```

---

# 13. `03_LYRICS`

Nên tách riêng với thơ.

```text
lyric structure
syllable count
lyric rhythm
word emphasis
singability
vowel length
melisma suitability
phrase length
breath points
```

---

# 14. `04_MELODY`

Đây là một trong những kho kiến thức lớn nhất:

```text
scales
modes
intervals
melodic contour
motif
motif development
phrase
cadence
tension
release
range
leaps
stepwise motion
repetition
variation
sequence
```

---

# 15. `05_RHYTHM`

```text
meter
tempo
note durations
rests
syncopation
groove
accent
rhythmic density
polyrhythm
swing
```

---

# 16. `06_HARMONY`

```text
chords
chord functions
progressions
cadences
extensions
substitutions
voice leading
modulation
borrowed chords
tension
resolution
```

---

# 17. `07_FORM`

```text
Intro
Verse
Pre-Chorus
Chorus
Bridge
Breakdown
Build
Outro
```

và quan trọng hơn:

```text
energy_curve
section_contrast
repetition
variation
climax
```

---

# 18. `08_VOCAL`

```text
voice types
ranges
registers
breath
phrasing
vocal comfort
sustained notes
ornamentation
articulation
```

---

# 19. `09_ARRANGEMENT`

```text
instrument roles
instrument ranges
texture
voicing
doubling
rhythmic patterns
bass behavior
drum patterns
piano patterns
guitar patterns
strings
pads
```

---

# 20. `10_GENRE`

Tôi sẽ không viết:

```text
POP:
"Pop là..."
```

mà nên có cấu trúc:

```text
GENRE: POP

TEMPO:
...

MELODY:
...

RHYTHM:
...

HARMONY:
...

FORM:
...

INSTRUMENTATION:
...

VOCAL:
...

CHARACTERISTICS:
...
```

Và mỗi genre nên có:

```text
HARD CHARACTERISTICS
SOFT CHARACTERISTICS
COMMON PATTERNS
EXCEPTIONS
EXAMPLES
```

Điều này rất quan trọng vì **genre không phải luật tuyệt đối**.

---

# 21. `12_MUSICXML`

Phần này lại khác nữa.

Đây là **kỹ thuật biểu diễn kết quả**, không phải kiến thức sáng tác.

Nó phải chứa:

```text
MusicXML 4.0 structure
score-partwise
part
measure
attributes
divisions
pitch
duration
voice
type
dot
tie
notations
lyric
harmony
direction
sound
instrument
...
```

và quan trọng nhất:

> **Mapping Rule**

Ví dụ:

```text
LYRIC SYLLABLE
        ↓
MusicXML <lyric>

PITCH
        ↓
MusicXML <pitch>

DURATION
        ↓
MusicXML <duration>

CHORD
        ↓
MusicXML <harmony>

TEMPO
        ↓
MusicXML <direction> / <sound>
```

---

# 22. `13_VALIDATION`

Phần này tôi rất khuyến khích.

Có hai tầng:

### Syntax validation

```text
XML valid?
MusicXML 4.0 valid?
```

### Music validation

```text
lyrics aligned?
measure durations correct?
vocal range correct?
key correct?
meter correct?
song structure correct?
melody rules satisfied?
harmony rules satisfied?
```

---

# 23. Một thay đổi rất quan trọng: Tài liệu 2 không nên là “một cuốn sách”

Bạn đang nói:

> “Tài liệu 2”

Tôi sẽ coi nó là **một thư viện tài liệu** chứ không phải một file khổng lồ.

Ví dụ:

```text
DOCUMENT_2/
│
├── language/
│   ├── vietnamese_tone.md
│   ├── syllable.md
│   └── prosody.md
│
├── melody/
│   ├── interval.md
│   ├── contour.md
│   ├── phrase.md
│   └── motif.md
│
├── harmony/
│   ├── chord.md
│   ├── progression.md
│   └── cadence.md
│
├── genres/
│   ├── pop.md
│   ├── ballad.md
│   ├── rock.md
│   └── ...
│
└── musicxml/
    ├── musicxml_4_structure.md
    ├── lyric_mapping.md
    └── validation.md
```

---

# 24. Và mỗi tài liệu nhỏ nên có metadata

Đây là thứ sẽ giúp **bước 1 chọn kiến thức cho bước 2** cực kỳ hiệu quả.

Ví dụ:

```yaml
id: VN_MELODY_004
title: Vietnamese lexical tone and melodic contour
domain: vietnamese_language
subdomain: prosody
applies_to:
  - lyrics
  - melody
language: vi
priority: high
type: rule
```

Một tài liệu khác:

```yaml
id: GENRE_BALLAD_002
title: Pop Ballad melodic characteristics
domain: genre
subdomain: ballad
applies_to:
  - melody
  - form
  - arrangement
priority: medium
type: guideline
```

Khi đó AI bước 1 có thể xác định:

```text
Prompt chuẩn:
Vietnamese
Pop Ballad
Female
Sad
76 BPM
4/4
```

rồi hệ thống tìm:

```text
VN_MELODY_004
VN_PROSODY_002
GENRE_BALLAD_002
MELODY_PHRASE_005
VOCAL_FEMALE_003
HARMONY_POP_012
MUSICXML_4_001
```

và tạo thành **Knowledge Package cho bài hát đó**.

---

# 25. Đây là điểm tôi nghĩ sẽ làm hệ thống của bạn rất mạnh

Bạn có thể biến quy trình thành:

```text
             TÀI LIỆU 1
        PROMPT SPECIFICATION
                 │
                 ▼
          Prompt tự do
                 │
                 ▼
           AI Prompt Builder
                 │
                 ▼
          Prompt chuẩn
                 │
                 ├──────────────┐
                 │              │
                 ▼              ▼
          Người dùng sửa    Validate
                 │
                 ▼
             Prompt chuẩn
                 │
                 ▼
       Knowledge Retriever
                 │
                 ▼
             TÀI LIỆU 2
       MUSIC KNOWLEDGE BASE
                 │
                 ▼
        Knowledge Package
                 │
                 ▼
          AI MUSIC COMPOSER
                 │
                 ▼
           MusicXML 4.0
```

Và như vậy **Tài liệu 1 và Tài liệu 2 không trùng chức năng**:

|                             | Tài liệu 1               | Tài liệu 2 |
| --------------------------- | ------------------------ | ---------- |
| Mục đích                    | Tạo Prompt chuẩn         | Sáng tác   |
| Người dùng trực tiếp review | ✅                        | ❌          |
| Định nghĩa trường thông tin | ✅                        | ❌          |
| Quy tắc hỏi thêm            | ✅                        | ❌          |
| Suy luận yêu cầu            | ✅                        | ❌          |
| Kiến thức âm nhạc           | Chỉ tối thiểu            | ✅          |
| Quy luật sáng tác           | ❌                        | ✅          |
| Quy tắc tiếng Việt          | Chỉ để nhận diện yêu cầu | ✅          |
| MusicXML                    | Chỉ quy định output      | ✅          |
| Ví dụ bài hát               | Có thể có ít             | ✅          |

---

## Cấu trúc tôi khuyên dùng nhất

Tôi sẽ đặt tên thành:

```text
PROJECT/
│
├── 01_PROMPT_BUILDER/
│   ├── prompt_schema.md
│   ├── field_definitions.md
│   ├── inference_rules.md
│   ├── question_rules.md
│   ├── normalization_rules.md
│   ├── conflict_rules.md
│   ├── validation_rules.md
│   └── examples/
│
├── 02_MUSIC_KNOWLEDGE/
│   ├── language/
│   ├── poetry/
│   ├── lyrics/
│   ├── melody/
│   ├── rhythm/
│   ├── harmony/
│   ├── form/
│   ├── vocal/
│   ├── arrangement/
│   ├── genre/
│   ├── performance/
│   ├── musicxml/
│   └── validation/
│
└── 03_OUTPUT/
    └── MusicXML_4.0
```

### Và có một nguyên tắc then chốt:

**Prompt chuẩn phải là “hợp đồng” giữa bước 1 và bước 2.**

Bước 1 không được viết ra một prompt đẹp nhưng mơ hồ. Nó phải tạo ra một **đặc tả có cấu trúc, đầy đủ, không mâu thuẫn, có thể kiểm tra được**.

Bước 2 không được tự ý thay đổi đặc tả đó, mà phải coi nó là **specification của bài hát** và dùng Tài liệu 2 để hiện thực hóa specification thành MusicXML 4.0.

Theo hướng này, **Tài liệu 1 là “ngôn ngữ yêu cầu bài hát”**, còn **Tài liệu 2 là “kiến thức để hiện thực hóa bài hát”**. Bạn không cần Music Song DSL ở giữa ngay từ đầu.
