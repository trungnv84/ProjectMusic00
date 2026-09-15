Có. Tôi đã đọc cả `for-ai.md` và `catchiness.md` hiện tại của repo. Theo tôi, hướng tiếp theo **không phải viết thêm thật nhiều “công thức melody”**, mà nên xây một **hệ thống các melodic objectives / musical qualities có thể được chọn ngẫu nhiên có điều kiện theo genre, section và lyric**.

 Hiện `catchiness.md` đã làm khá tốt một trục: **“melody có dễ nhớ không?”**. Nó đã có hook economy, contour, rhythmic hook, limited pitch set, repetition-with-variation, singability, hook position, contrast, motif coherence và final development.  GitHub

 Nhưng nếu AI luôn nhận mục tiêu kiểu `REQUIRE_CATCHY_HOOK`, rất dễ sinh ra bài nào cũng có cùng “kiểu catchy”. Trong khi `for-ai.md` của repo đã có tư tưởng khá phù hợp: Step 3 phải invent melody và qua `music_quality_gate`, đồng thời các knowledge page được catalog chọn theo nhu cầu thay vì nhét toàn bộ kho vào context.  GitHub

 Tôi sẽ thiết kế knowledge base theo kiểu sau.

 # 1\. Đừng coi "catchy" là mục tiêu duy nhất

 Tôi đề xuất có một **Melody Quality Matrix**:

```
MELODY OBJECTIVES
├── Memorability
│   ├── catchiness
│   ├── hook distinctiveness
│   └── motif identity
│
├── Singability
│   ├── vocal comfort
│   ├── phrase breathability
│   ├── lyric stress alignment
│   └── natural prosody
│
├── Expressiveness
│   ├── emotional contour
│   ├── tension / release
│   ├── yearning
│   ├── intimacy
│   └── dramatic impact
│
├── Groove
│   ├── rhythmic identity
│   ├── syncopation
│   ├── pocket
│   ├── danceability
│   └── rhythmic vocal phrasing
│
├── Harmonic relationship
│   ├── chord-tone emphasis
│   ├── tension notes
│   ├── melodic-harmonic contrast
│   └── harmonic color
│
├── Structural function
│   ├── verse storytelling
│   ├── pre-chorus escalation
│   ├── chorus payoff
│   ├── bridge contrast
│   └── final chorus development
│
├── Character
│   ├── innocence
│   ├── melancholy
│   ├── swagger
│   ├── sensuality
│   ├── urgency
│   ├── nostalgia
│   └── playfulness
│
└── Complexity
    ├── simplicity
    ├── melodic sophistication
    ├── interval variety
    ├── phrase asymmetry
    └── controlled unpredictability
```

 Điểm quan trọng là **một bài chỉ chọn một subset**, chứ không bắt mọi bài đạt tất cả.

---

 # 2\. Những knowledge page tôi rất khuyên thêm

 Nếu muốn làm thật nhiều, tôi sẽ chia `knowledge/melody/` thành khoảng **20–30 trang nhỏ**, mỗi trang chỉ giải quyết một câu hỏi.

 ## A. `singability.md`

 Đây là thứ tôi ưu tiên **ngay sau catchiness**.

 AI cần biết:

 - quãng nào dễ hát
- khi nào nên dùng stepwise motion
- leap lớn dùng ở đâu
- leap nên được giải quyết thế nào
- high notes nên đặt vào từ nào
- phrase length
- breath point
- register
- tessitura
- tránh melody đẹp trên giấy nhưng hát rất khó
- khác nhau giữa **“dễ hát”** và **“nhàm chán”**

 Ví dụ objective:

```
melody_objectives:
  - singable
  - moderate_tessitura
  - natural_breathing
```

---

 # 3\. `prosody.md`

 Cực kỳ quan trọng nếu hệ thống của bạn sinh **lyrics + melody**.

 Nó nên xử lý:

 - word stress
- syllable stress
- melodic accent
- rhythmic accent
- pitch accent
- important word → melodic emphasis
- grammatical words → thường không nên bị nhấn quá mạnh
- tiếng Việt đặc biệt cần chú ý **thanh điệu**

 Với tiếng Việt tôi còn tách thêm:

```
Vietnamese melodic prosody
├── thanh ngang
├── huyền
├── sắc
├── hỏi
├── ngã
└── nặng
```

 Không nên để AI tùy tiện đặt contour khiến thanh điệu tự nhiên của từ bị phá.

 Đây có thể là một trong những knowledge page **có giá trị nhất đối với project của bạn**.

---

 # 4\. `emotional-contour.md`

 Catchy không đồng nghĩa emotional.

 Một melody có thể cực kỳ dễ nhớ nhưng cảm xúc bằng 0.

 Trang này có thể định nghĩa:

 - rising contour → yearning / hope / anticipation
- falling contour → resignation / sadness / release
- arch → build → peak → release
- low-register opening → intimacy
- sustained high note → emotional emphasis
- repeated note → insistence / vulnerability
- descending sequence → reflection
- upward leap → emotional shock / declaration

 Không nên biến thành công thức cứng.

 Thay vào đó:

```
emotion → preferred melodic tendencies
```

 Ví dụ:

```
emotion: longing
tendencies:
  - moderate_upward_motion
  - unresolved_phrase_endings
  - occasional_large_leap
  - delayed_resolution
  - higher_register_at_emotional_peak
```

---

 # 5\. `tension-release.md`

 Tôi rất khuyên có riêng trang này.

 Đây là thứ giúp melody **có câu chuyện**.

 Các cơ chế:

 - consonance → dissonance → resolution
- stable → unstable → stable
- low → high → release
- short phrases → longer phrase
- tonic → tension → tonic
- rhythmic density increase → release
- ascending sequence → cadence
- suspended phrase ending → resolution

 Có thể định nghĩa:

```
Melodic tension sources
├── pitch
├── rhythm
├── register
├── harmony
├── duration
├── phrase length
└── expectation
```

---

 # 6\. `melodic-contrast.md`

 Rất cần cho Verse / Pre / Chorus.

 Không chỉ:

 > Verse thấp, Chorus cao.

 Mà nhiều dạng contrast:

 - register
- range
- rhythmic density
- note duration
- phrase length
- contour
- articulation
- repetition
- harmonic tension
- syllable density
- syncopation
- melodic predictability

 Ví dụ:

```
verse:
  - conversational
  - narrow_range
  - lower_register

pre_chorus:
  - increasing_range
  - increasing_density
  - rising_contour

chorus:
  - wider_range
  - stronger_rhythm
  - memorable_cell
```

---

 # 7\. `melodic-rhythm.md`

 Catchiness hiện đã đề cập rhythm, nhưng tôi vẫn sẽ tách **rhythmic melody** thành một knowledge page riêng.

 Các objective:

 - straight
- syncopated
- swung
- offbeat
- anticipatory
- delayed
- repetitive
- sparse
- dense
- triplet-based
- conversational
- dance-oriented

 Đặc biệt có thể có:

```
rhythmic identity
vs
rhythmic complexity
```

 Hai thứ này không giống nhau.

 Một melody có thể:

 - rất đơn giản nhưng rhythmic identity mạnh
- rất phức tạp nhưng không có identity

---

 # 8\. `phrase-architecture.md`

 Đây là một knowledge page tôi đánh giá rất cao.

 AI cần hiểu **một câu melody được xây như thế nào**.

 Ví dụ:

```
Phrase
├── pickup
├── statement
├── continuation
├── peak
└── cadence
```

 Các kiểu:

 - antecedent → consequent
- question → answer
- call → response
- repetition → variation
- sentence
- period
- asymmetrical phrase
- short → short → long
- 2+2
- 4+4
- 3+3+2
- delayed cadence

 Điều này sẽ giúp tránh tình trạng melody chỉ là một chuỗi note có vẻ hợp chord.

---

 # 9\. `motif-development.md` nên mở rộng mạnh

 Bạn đã reference nó trong `catchiness.md`, vậy tôi nghĩ nên biến nó thành **một knowledge page rất quan trọng**.

 Cho AI một vocabulary:

 - repetition
- sequence
- fragmentation
- extension
- truncation
- inversion
- retrograde-like transformation nếu phù hợp
- augmentation
- diminution
- displacement
- reharmonization
- register shift
- rhythmic transformation
- interval expansion
- interval contraction
- answer motif

 Quan trọng nhất:

 > **Motif development = cách tạo coherence mà không gây boredom.**

 Đây chính là cầu nối giữa catchy và musicality.

---

 # 10\. `melodic-predictability.md`

 Cái này rất hay để random.

 Một melody không phải lúc nào cũng cần predictable.

 Có thể có objective:

```
high predictability
medium predictability
controlled surprise
```

 Các cơ chế tạo surprise:

 - unexpected leap
- unexpected cadence
- rhythmic displacement
- chromatic passing note
- phrase extension
- deceptive melodic ending
- register jump
- silence/rest

 Nhưng:

 > Surprise chỉ hiệu quả khi listener đã có expectation.

 Tức là:

```
expectation → violation → resolution
```

---

 # 11\. `melodic-simplicity.md`

 Cũng rất đáng có.

 Một bài không nhất thiết phải "hay" bằng cách phức tạp.

 Các objective:

 - minimal
- sparse
- repetitive
- chant-like
- one-note emphasis
- two-note motif
- narrow-range melody
- long sustained tones

 Rất hợp với:

 - ambient pop
- indie
- folk
- singer-songwriter
- ballad
- minimalist music
- certain R&B

---

 # 12\. `melodic-complexity.md`

 Ngược lại.

 Các đặc tính:

 - wider intervals
- chromaticism
- irregular phrase lengths
- modulation
- modal mixture
- syncopation
- ornamentation
- melisma
- rapid note density
- unusual cadence

 Nhưng phải có:

```
complexity ≠ randomness
```

 Đây là một anti-pattern rất đáng ghi.

---

 # 13\. `vocal-character.md`

 Một melody còn phải **phù hợp với persona của vocalist**.

 Ví dụ:

```
vocal_character:
  intimate
  conversational
  powerful
  breathy
  theatrical
  playful
  restrained
  aggressive
```

 Rồi mapping:

```
intimate
→ narrow range
→ close intervals
→ lower dynamic
→ longer vowels

powerful
→ larger range
→ high register peaks
→ sustained notes
→ stronger rhythmic attacks
```

---

 # 14\. `melisma.md`

 Riêng một trang về:

 - syllabic
- neumatic
- melismatic
- one syllable → multiple notes
- where melisma works
- where it sounds excessive
- emotional vs decorative melisma

 Và đặc biệt:

 > Không phải cứ thêm nhiều nốt vào một vowel là “vocal impressive”.

---

 # 15\. `ornamentation.md`

 Có thể bao gồm:

 - grace notes
- turns
- passing tones
- neighbor tones
- slides
- approach notes
- repeated-note ornaments

 Và nên có genre weighting.

---

 # 16\. `range-register.md`

 Tách khỏi singability.

 Nó nên trả lời:

 > **Melody nên sống ở đâu?**

 Các biến:

```
range:
  narrow
  moderate
  wide

register:
  low
  middle
  high
  mixed
```

 Và chức năng:

```
low register → intimacy / heaviness
middle → conversational
high → intensity / openness
```

---

 # 17\. `cadence.md`

 Rất đáng làm.

 Các loại:

 - strong resolution
- weak resolution
- unresolved
- suspended
- deceptive
- open ending
- half cadence
- authentic-like closure
- melodic tonic landing
- non-tonic ending

 Và mapping theo section:

```
Verse      → often less final
Pre        → increasing tension
Chorus     → stronger payoff
Bridge     → unusual / suspended
Final      → strongest closure
```

---

 # 18\. `hook-types.md`

 Catchiness hiện đang nói về hook nói chung. Tôi sẽ tách taxonomy:

```
Hook
├── melodic hook
├── rhythmic hook
├── lyrical hook
├── vocal hook
├── instrumental hook
├── harmonic hook
├── production hook
└── call-and-response hook
```

 Điều này cực kỳ quan trọng.

 **Không phải bài nào cũng cần melodic hook.**

 Ví dụ có thể random:

```
primary_hook:
  type: rhythmic

secondary_hook:
  type: lyrical
```

 hoặc:

```
primary_hook:
  type: melodic

secondary_hook:
  type: vocal
```

---

 # 19\. `call-response.md`

 Rất hữu ích cho:

 - pop
- soul
- gospel
- R&B
- funk
- hip-hop
- dance
- folk

 Cơ chế:

```
A → B
statement → answer
lead → backing
question → response
```

 Nó tạo movement mà không cần melody quá phức tạp.

---

 # 20\. `vocal-rhythm.md`

 Khác với melodic rhythm.

 Tập trung vào:

 - syllable density
- syllable placement
- consonant attacks
- vowel sustain
- rests
- pickup
- syncopated lyric delivery
- rap-like subdivision
- behind-the-beat / ahead-of-beat feel

 Cực hữu ích nếu sau này project đi vào R&B / hip-hop / funk.

---

 # 21\. `melody-harmony-relationship.md`

 Một mảng lớn.

 Các kiểu:

```
melody follows chord tones
melody decorates chord tones
melody contrasts harmony
melody anticipates harmony
melody delays resolution
melody uses extensions
melody emphasizes tensions
```

 Ví dụ:

```
Chord tone melody
→ stable / accessible

Non-chord tension
→ color / yearning / sophistication

Suspension
→ tension → resolution
```

---

 # 22\. `modal-melody.md`

 Đừng chỉ nghĩ major/minor.

 Cho AI vocabulary:

 - Ionian
- Dorian
- Mixolydian
- Aeolian
- Phrygian
- Lydian

 Nhưng không chỉ là "dùng mode X".

 Nên mô tả **melodic behavior** của mode:

```
Dorian
→ characteristic 6
→ minor mood without pure Aeolian darkness

Mixolydian
→ dominant-like brightness
→ characteristic b7

Lydian
→ raised 4
→ floating / bright / unstable
```

---

 # 23\. `genre-melody-profiles.md`

 Đây có thể là **trang cực quan trọng để giải quyết đúng ý bạn nói: random vài yếu tố phù hợp với dòng nhạc.**

 Không nên viết:

 > Pop = catchy.

 Mà:

 ### Pop

 Có thể random 3–5:

```
- memorable melodic hook
- strong chorus contrast
- moderate singability
- rhythmic identity
- repetition with variation
- clear phrase architecture
- accessible range
```

 ### Ballad

```
- emotional contour
- long sustained notes
- expressive tension/release
- lyrical prosody
- controlled range expansion
- delayed resolution
```

 ### R&B

```
- syncopation
- melisma
- rhythmic displacement
- chord-tone awareness
- tension notes
- conversational phrasing
- call-response
```

 ### Rock

```
- strong rhythmic motif
- larger leaps
- chant-like repetition
- narrow/high-energy hook
- strong downbeat
- aggressive contour
```

 ### Folk

```
- singability
- repeated motifs
- narrow/moderate range
- storytelling phrase
- natural prosody
- simple cadence
```

 ### EDM

```
- rhythmic hook
- short vocal motif
- repetition
- anticipation
- drop-oriented phrase
- limited pitch material
```

 ### Jazz

```
- harmonic interaction
- chromaticism
- motivic development
- rhythmic displacement
- phrase asymmetry
- tension notes
```

---

 # 24\. `genre-objective-selection.md`

 Tôi còn đề xuất **một file đặc biệt** thay vì bắt AI tự suy nghĩ từ hàng chục knowledge page.

 Ví dụ:

```
genre: pop

objective_pool:
  primary:
    - catchiness
    - singability
    - melodic_contrast

  secondary:
    - rhythmic_identity
    - motif_development
    - emotional_contour
    - phrase_architecture
    - tension_release

  optional:
    - controlled_surprise
    - call_response
    - melisma
    - harmonic_color
```

 Sau đó algorithm:

```
1. Detect genre
2. Load genre profile
3. Select 1 primary objective
4. Select 2–4 secondary objectives
5. Select 0–2 optional objectives
6. Check conflicts
7. Apply objectives by section
8. Evaluate
```

 **Đây mới là phần tôi nghĩ sẽ biến hệ thống của bạn từ "AI đọc tài liệu sáng tác" thành một hệ thống composition policy thực sự.**

---

 # 25\. Thậm chí nên random theo SECTION

 Đây là điểm tôi nghĩ rất đáng làm.

 Đừng:

```
song_objectives:
  - catchy
  - emotional
  - singable
```

 Mà:

```
section_objectives:

  verse:
    - conversational
    - lyrical_prosody
    - moderate_singability

  pre_chorus:
    - rising_tension
    - increasing_range
    - rhythmic_acceleration

  chorus:
    - catchy
    - singable
    - strong_hook_identity

  bridge:
    - contrast
    - controlled_surprise
    - harmonic_color

  final_chorus:
    - hook_reinforcement
    - motif_development
    - emotional_payoff
```

 Như vậy **toàn bài mới có narrative**.

---

 # 26\. Một ý tưởng còn hay hơn: Objective Budget

 Đừng để AI tối ưu mọi thứ cùng lúc.

 Ví dụ:

```
objective_budget:
  primary: 1
  secondary: 3
  supporting: 2
```

 Ví dụ một bài:

```
primary:
  emotional_contour

secondary:
  singability
  rhythmic_identity
  tension_release

supporting:
  melodic_contrast
  motif_development
```

 Bài khác:

```
primary:
  catchiness

secondary:
  rhythmic_identity
  singability
  hook_distinctiveness

supporting:
  call_response
  controlled_surprise
```

 Điều này giải quyết một vấn đề lớn:

 > Nếu AI được yêu cầu "catchy + emotional + complex + singable + surprising + sophisticated + simple" cùng lúc, nó rất dễ tạo melody trung bình ở tất cả các mặt.

---

 # 27\. Nên có cả "negative objectives"

 Không chỉ:

```
REQUIRE_CATCHY
```

 mà:

```
AVOID_TOO_CATCHY
AVOID_TOO_COMPLEX
AVOID_TOO_PREDICTABLE
AVOID_TOO_MELISMATIC
AVOID_TOO_WIDE_RANGE
AVOID_TOO_MANY_LEAPS
AVOID_EXCESSIVE_SYNCOPATION
AVOID_SAME_CONTOUR_ACROSS_SECTIONS
AVOID_OVER_REPETITION
```

 Ví dụ một **cinematic ballad** có thể:

```
require:
  emotional_contour
  tension_release
  lyrical_prosody

avoid:
  excessive_hook_repetition
  dance_like_rhythm
  short_pop_hook
```

---

 # 28\. Thêm "trade-offs"

 Đây là thứ tôi nghĩ knowledge base của bạn sẽ rất mạnh nếu có.

 Ví dụ:

```
Catchiness ↑
→ repetition ↑
→ predictability ↑
→ risk of boredom ↑

Complexity ↑
→ surprise ↑
→ sophistication ↑
→ singability ↓

Range ↑
→ emotional impact ↑
→ accessibility ↓

Syncopation ↑
→ groove ↑
→ lyric clarity ↓

Melisma ↑
→ vocal expressiveness ↑
→ lyric intelligibility ↓

Chromaticism ↑
→ harmonic color ↑
→ immediate accessibility ↓
```

 Không nhất thiết phải định lượng thật.

 Chỉ cần AI biết **mỗi objective có cost**.

---

 # 29\. Một schema tôi rất khuyên bạn thêm

 Có thể tạo:

 `docs/m-guide/meta/melody-objectives.schema.md`

 Ví dụ:

```
melody_objective:
  id: emotional_contour

  category: expression

  question:
    - "Melody có truyền tải cảm xúc bằng contour không?"

  useful_for:
    - ballad
    - pop
    - singer_songwriter
    - cinematic

  compatible_with:
    - tension_release
    - singability
    - prosody

  conflicts_with:
    - extreme_complexity

  parameters:
    intensity:
      low: subtle
      medium: noticeable
      high: dramatic

  section_affinity:
    verse: medium
    pre_chorus: high
    chorus: high
    bridge: high

  evaluation:
    - contour_has_direction
    - emotional_peak_is_audible
    - contour_supports_lyric_meaning
```

 Sau đó mọi knowledge page tuân theo schema tương tự.

---

 # 30\. Và tôi sẽ sửa cách `catchiness.md` đang được gọi

 Hiện file này nói khá rõ:

 > đọc bắt buộc ở Step 3 trước khi viết Chorus.  GitHub

 Tôi nghĩ sau này **không nên có quá nhiều file đều là "đọc bắt buộc"**.

 Thay vào đó:

```
Step 3
   ↓
Song Request
   ↓
Genre / mood / section analysis
   ↓
Objective Selector
   ↓
Select 3–6 knowledge pages
   ↓
Generate melody strategy
   ↓
Invent melody
   ↓
Quality Gate
```

 Tức là `catchiness.md` trở thành **một candidate objective**, không còn là mặc định universal.

---

 # 31\. Tôi sẽ làm taxonomy khoảng 40 objective

 Nếu muốn làm "thật nhiều" thì đây là pool tôi đề xuất:

 ### Memorability

 - catchiness
- hook distinctiveness
- motif identity
- repetition
- repetition-with-variation

 ### Singability

 - singability
- vocal comfort
- breathability
- natural prosody
- lyric intelligibility
- register control

 ### Expression

 - emotional contour
- tension-release
- yearning
- intimacy
- dramatic intensity
- vulnerability
- triumph
- melancholy
- playfulness

 ### Rhythm

 - rhythmic identity
- groove
- syncopation
- anticipation
- rhythmic displacement
- rhythmic density
- conversational rhythm

 ### Structure

 - phrase architecture
- section contrast
- call-response
- question-answer
- buildup
- payoff
- final development

 ### Melody/Harmony

 - chord-tone alignment
- harmonic tension
- melodic-harmonic contrast
- modal color
- chromatic color
- cadence design

 ### Complexity

 - simplicity
- controlled complexity
- unpredictability
- asymmetry
- interval variety
- melodic density

 ### Vocal

 - melisma
- ornamentation
- sustained-note expression
- vocal agility
- chant-like delivery

 ### Character

 - innocence
- swagger
- sensuality
- nostalgia
- urgency
- serenity
- mystery
- aggression
- warmth
- playfulness

---

 # 32\. Nhưng đừng biến 40 cái này thành 40 file ngay

 Tôi sẽ chia thành **3 tầng**.

```
Tier 1 — Core musical mechanics
├── catchiness
├── singability
├── prosody
├── emotional-contour
├── tension-release
├── phrase-architecture
├── melodic-contrast
├── motif-development
├── melodic-rhythm
└── range-register

Tier 2 — Style / genre mechanics
├── genre-melody-profiles
├── modal-melody
├── vocal-character
├── melisma
├── ornamentation
├── call-response
├── vocal-rhythm
├── melody-harmony-relationship
└── cadence

Tier 3 — Optional specialization
├── controlled-surprise
├── melodic-simplicity
├── melodic-complexity
├── chant-like
├── cinematic
├── dance-oriented
├── jazz-melodic-language
└── etc.
```

 **Tier 1 nên làm trước.**

---

 # 33\. Quan trọng nhất: Random nhưng phải "constrained random"

 Tôi **không khuyên**:

```
random.sample(all_objectives, 5)
```

 Vì sẽ có những tổ hợp ngớ ngẩn.

 Ví dụ:

```
extreme_simplicity
+
extreme_complexity
+
extreme_melisma
+
minimal_range
+
extreme_interval_variety
```

 Thay vào đó:

```
genre
   ↓
allowed objectives
   ↓
weighted random
   ↓
compatibility filter
   ↓
section filter
   ↓
objective budget
   ↓
final objective set
```

 Ví dụ:

```
genre: indie_pop

primary:
  weighted:
    catchiness: 0.30
    emotional_contour: 0.25
    rhythmic_identity: 0.20
    singability: 0.15
    melodic_simplicity: 0.10

secondary:
  choose: 3

avoid_conflicts: true
```

 Như vậy mỗi lần generate vẫn **random**, nhưng random trong một không gian có chủ đích.

---

 # 34\. Một thay đổi kiến trúc tôi đặc biệt khuyên

 Thay vì chỉ có:

```
hook_melody_cell
motifs_declared
```

 tôi sẽ thêm:

```
melody_design:
  primary_objective:
  secondary_objectives:

  objective_evidence:
    - ...

  section_objectives:
    verse: [...]
    pre_chorus: [...]
    chorus: [...]
    bridge: [...]
    final_chorus: [...]

  intentional_tradeoffs:
    - ...

  avoided_objectives:
    - ...
```

 Khi đó `03-composition-notes.md` sẽ giải thích **tại sao melody này lại như vậy**, chứ không chỉ ghi nó đã có hook.

---

 ## Nếu là tôi xây tiếp repo này

 Tôi sẽ làm theo thứ tự:

 1. **`prosody.md`** — đặc biệt quan trọng với tiếng Việt.
2. **`singability.md`**
3. **`emotional-contour.md`**
4. **`tension-release.md`**
5. **`phrase-architecture.md`**
6. **`melodic-contrast.md`**
7. **`melodic-rhythm.md`**
8. **`range-register.md`**
9. **`melody-harmony-relationship.md`**
10. **`motif-development.md`**
11. **`hook-types.md`**
12. **`genre-melody-profiles.md`**
13. **`melody-objectives.schema.md`**
14. **`objective-selection.md`** ← cái này mới là "bộ não random có kiểm soát".
15. Sau đó mới mở rộng các objective chuyên biệt như melisma, modal melody, call-response, jazz, cinematic...

 Và tôi sẽ **không sửa `catchiness.md` thành một file khổng lồ**. File hiện tại đang có ranh giới khá tốt: nó giải quyết câu hỏi _"làm thế nào để melody memorable/catchy?"_ và đã có constraints + quality gate khá rõ.  GitHub

 Cái còn thiếu thực chất là **một layer ở phía trên `catchiness.md`**:

```
                  SONG INTENT
                      │
                      ▼
             OBJECTIVE SELECTOR
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
      Catchy      Emotional    Singable
          │           │           │
          └───────────┼───────────┘
                      ▼
               MELODY STRATEGY
                      │
                      ▼
                Melody Invention
                      │
                      ▼
                Quality Gate
```

 Đó sẽ là kiến trúc tôi ưu tiên, vì nó cho phép **hai bài cùng là Pop nhưng melody hoàn toàn khác triết lý**: bài A ưu tiên catchy + rhythmic identity, bài B ưu tiên emotional contour \+ tension/release, bài C ưu tiên singability + prosody + simplicity. AI vẫn có quy tắc, nhưng không bị biến thành một cái máy "lần nào cũng làm chorus catchy theo cùng một công thức".