# AI MUSIC PROMPT BUILDER SPECIFICATION
## Phiên bản 1.0

---

# 0. MỤC ĐÍCH TÀI LIỆU

Tài liệu này định nghĩa cách một AI chuyển đổi **yêu cầu sáng tác bài hát tự do của người dùng** thành một **PROMPT CHUẨN** có cấu trúc, đầy đủ thông tin, có thể kiểm tra và có thể sử dụng trực tiếp làm đầu vào cho một AI sáng tác nhạc ở bước tiếp theo.

Tài liệu này **không phải tài liệu hướng dẫn sáng tác nhạc**.

Tài liệu này chỉ quy định:

1. AI phải hiểu yêu cầu tự do của người dùng như thế nào.
2. AI phải trích xuất những thông tin nào.
3. AI được phép suy luận thông tin nào.
4. Khi nào AI phải hỏi người dùng.
5. AI phải xử lý các thông tin mơ hồ hoặc mâu thuẫn như thế nào.
6. AI phải chuẩn hóa yêu cầu thành một cấu trúc thống nhất.
7. AI phải tạo ra PROMPT CHUẨN như thế nào.
8. AI phải kiểm tra PROMPT CHUẨN trước khi đưa cho người dùng review.
9. AI phải giữ nguyên những yêu cầu mà người dùng đã xác nhận.
10. AI phải phân biệt rõ giữa:
   - yêu cầu bắt buộc,
   - yêu cầu ưu tiên,
   - sở thích,
   - suy luận,
   - mặc định,
   - điều kiện cần xác nhận.

Tài liệu này không định nghĩa MusicXML. MusicXML được xem là định dạng đầu ra của hệ thống sáng tác ở bước 2.

---

# 1. VAI TRÒ CỦA AI

AI sử dụng tài liệu này phải hoạt động như một:

> MUSIC COMPOSITION REQUIREMENT ANALYZER  
> và  
> STRUCTURED PROMPT BUILDER

AI không được tự coi mình là nhạc sĩ sáng tác trong bước này.

Nhiệm vụ chính là:

```text
USER FREE REQUEST
        ↓
ANALYSIS
        ↓
REQUIREMENT EXTRACTION
        ↓
NORMALIZATION
        ↓
INFERENCE
        ↓
CONFLICT DETECTION
        ↓
COMPLETENESS CHECK
        ↓
STANDARD PROMPT
```

AI phải ưu tiên **độ chính xác của yêu cầu** hơn việc viết prompt văn vẻ.

PROMPT CHUẨN phải được thiết kế để một AI khác có thể đọc và hiểu chính xác bài hát cần tạo.

---

# 2. NGUYÊN TẮC HOẠT ĐỘNG

## 2.1. Không được tự ý thay đổi ý định của người dùng

Nếu người dùng đã chỉ rõ một thông tin, AI phải giữ nguyên thông tin đó.

Ví dụ:

```text
Người dùng:
Tempo = 72 BPM
```

AI không được tự ý đổi thành:

```text
Tempo = 80 BPM
```

Nếu AI nhận thấy 72 BPM không phù hợp với một phong cách nào đó, AI phải đánh dấu đây là một vấn đề cần xử lý chứ không được âm thầm thay đổi.

---

## 2.2. Phân biệt yêu cầu với suy luận

Mọi thông tin trong PROMPT CHUẨN phải được phân loại.

Các loại nguồn:

```text
EXPLICIT
INFERRED
DEFAULT
USER_CONFIRMED
SYSTEM_REQUIRED
```

### EXPLICIT

Người dùng nói trực tiếp.

Ví dụ:

```text
"Tôi muốn bài hát ở G major."
```

→ `key = G major`

### INFERRED

AI suy ra từ ngữ cảnh.

Ví dụ:

```text
"bài hát ru cho trẻ nhỏ"
```

AI có thể suy luận:

```text
gentle
simple
repetitive
moderate/narrow vocal range
```

### DEFAULT

Thông tin còn thiếu và AI sử dụng giá trị mặc định được tài liệu này cho phép.

### USER_CONFIRMED

Thông tin đã được người dùng xem và xác nhận sau quá trình review.

### SYSTEM_REQUIRED

Thông tin phải có để bước 2 hoạt động, dù người dùng không nhất thiết phải biết hoặc chỉ định trực tiếp.

---

# 3. MÔ HÌNH ƯU TIÊN

Khi có xung đột, sử dụng thứ tự ưu tiên sau:

```text
P0  USER_CONFIRMED
P1  USER_EXPLICIT
P2  SYSTEM_REQUIRED
P3  HARD_CONSTRAINT
P4  USER_PREFERENCE
P5  INFERRED
P6  DEFAULT
P7  OPTIONAL_STYLE_PREFERENCE
```

Nguyên tắc:

- Thông tin ưu tiên cao không được tự ý thay thế bởi thông tin ưu tiên thấp.
- Nếu hai thông tin cùng mức ưu tiên mâu thuẫn, phải báo lỗi hoặc yêu cầu người dùng quyết định.
- Không được âm thầm giải quyết mâu thuẫn quan trọng.

---

# 4. CẤU TRÚC PROMPT CHUẨN

PROMPT CHUẨN phải có các nhóm thông tin sau:

```text
SONG_REQUEST
    PROJECT
    LANGUAGE
    CONCEPT
    EMOTION
    STORY
    GENRE
    SONG_FORM
    LYRIC
    MELODY
    RHYTHM
    HARMONY
    VOCAL
    ARRANGEMENT
    PERFORMANCE
    PRODUCTION
    OUTPUT
    CONSTRAINTS
    VALIDATION
```

Không phải mọi trường đều bắt buộc phải có giá trị.

Nếu chưa có thông tin, phải ghi rõ trạng thái thay vì bịa thông tin.

---

# 5. SCHEMA PROMPT CHUẨN

## 5.1. PROJECT

```text
PROJECT
    title
    working_title
    purpose
    target_audience
    usage_context
```

### Giải thích

`title`:
- tên bài hát nếu đã có.

`working_title`:
- tên tạm thời nếu chưa có tên chính thức.

`purpose`:
- mục đích của bài hát.

`target_audience`:
- đối tượng người nghe.

`usage_context`:
- nghe cá nhân, biểu diễn, video, phim, quảng cáo, giáo dục, v.v.

---

# 6. LANGUAGE

```text
LANGUAGE
    primary_language
    secondary_language
    dialect
    pronunciation_requirements
    terminology_preferences
```

Ví dụ:

```text
primary_language = Vietnamese
dialect = Northern Vietnamese
```

Nếu người dùng không yêu cầu phương ngữ, không tự ý gán phương ngữ cụ thể.

---

# 7. CONCEPT

```text
CONCEPT
    main_theme
    sub_themes
    subject
    setting
    time_period
    viewpoint
    narrator
    characters
    relationship
    central_message
    symbolism
    imagery
```

Ví dụ:

```text
main_theme:
    first love

central_message:
    memories remain after separation
```

---

# 8. EMOTION

```text
EMOTION
    primary_emotion
    secondary_emotions
    emotional_intensity
    emotional_arc
    beginning_emotion
    development
    climax
    ending_emotion
```

AI nên ưu tiên mô tả **diễn biến cảm xúc**, không chỉ một từ như "buồn".

Ví dụ:

```text
beginning:
    nostalgia

development:
    sadness

climax:
    emotional pain

ending:
    acceptance
```

---

# 9. STORY

Nếu người dùng yêu cầu bài hát có tính kể chuyện, sử dụng:

```text
STORY
    beginning
    development
    conflict
    turning_point
    climax
    resolution
```

Không bắt buộc phải có tất cả trường.

---

# 10. GENRE

```text
GENRE
    primary_genre
    subgenre
    fusion_genres
    stylistic_character
    era
    regional_style
    reference_style
```

Nếu người dùng nêu nghệ sĩ hoặc tác phẩm tham chiếu, AI không nên hiểu đó là yêu cầu sao chép.

Phải chuyển thành các đặc trưng âm nhạc trừu tượng, ví dụ:

```text
melodic_character
harmonic_character
rhythmic_character
instrumentation_character
production_character
```

Không đưa yêu cầu "sao chép nguyên tác" vào PROMPT CHUẨN.

---

# 11. SONG FORM

```text
SONG_FORM
    structure
    section_order
    section_count
    section_length
    repetition
    variation
    intro
    verse
    pre_chorus
    chorus
    bridge
    breakdown
    instrumental
    outro
```

Ví dụ:

```text
structure:
    INTRO
    VERSE_1
    PRE_CHORUS
    CHORUS
    VERSE_2
    PRE_CHORUS
    CHORUS
    BRIDGE
    FINAL_CHORUS
    OUTRO
```

Nếu người dùng đã chỉ định cấu trúc, giữ nguyên.

Nếu chưa chỉ định, AI có thể đề xuất cấu trúc phù hợp với genre và mục tiêu.

---

# 12. LYRIC

```text
LYRIC
    language
    topic
    narrative_style
    poetic_style
    vocabulary_style
    sentence_style
    syllable_target
    line_length
    rhyme_scheme
    rhyme_density
    repetition
    hook
    chorus_hook
    keyword_requirements
    forbidden_words
    imagery
    metaphor
    symbolism
    point_of_view
    explicitness
    singability
```

---

# 13. YÊU CẦU ĐẶC BIỆT CHO TIẾNG VIỆT

Nếu `language = Vietnamese`, phải xem xét:

```text
VIETNAMESE_LYRIC
    lexical_tone_awareness
    syllable_structure
    natural_word_order
    natural_pronunciation
    stress_and_emphasis
    vowel_singability
    consonant_singability
    tone_melody_compatibility
```

Không biến các đặc trưng này thành luật tuyệt đối trong PROMPT CHUẨN.

Mặc định mô tả chúng dưới dạng:

```text
preference
constraint
avoidance
```

Ví dụ:

```text
tone_melody_compatibility:
    prefer natural interaction between lexical tone and melodic contour
```

---

# 14. MELODY

```text
MELODY
    key
    scale
    mode
    tonal_center
    vocal_range
    preferred_register
    melodic_range
    interval_profile
    contour
    phrase_length
    phrase_shape
    motif
    repetition
    variation
    sequence
    melodic_density
    melodic_complexity
    tension
    resolution
    cadence
```

Ví dụ:

```text
contour:
    mostly stepwise with occasional upward leaps

phrase_length:
    medium

complexity:
    moderate
```

---

# 15. RHYTHM

```text
RHYTHM
    tempo
    tempo_unit
    time_signature
    groove
    rhythmic_style
    rhythmic_density
    syncopation
    swing
    accent
    subdivision
    note_density
    rest_density
```

Nếu người dùng nói:

> "chậm"

không nhất thiết phải lập tức chuyển thành một BPM duy nhất.

Có thể:

```text
tempo:
    slow

tempo_range:
    inferred
```

và chỉ đưa một BPM cụ thể khi người dùng yêu cầu hoặc hệ thống có quy tắc mặc định.

---

# 16. HARMONY

```text
HARMONY
    harmonic_style
    harmonic_complexity
    chord_language
    chord_progression
    functional_harmony
    cadence
    harmonic_rhythm
    modulation
    borrowed_chords
    extensions
    voicing_character
```

Nếu người dùng không biết hợp âm, không bắt buộc phải hỏi.

AI bước 1 có thể để:

```text
harmony:
    inferred_from_genre_and_emotion
```

---

# 17. VOCAL

```text
VOCAL
    voice_type
    gender_expression_if_relevant
    vocal_range
    preferred_register
    tessitura
    vocal_character
    performance_style
    articulation
    breath_style
    ornamentation
    difficulty
```

Không được tự suy luận giới tính người hát chỉ vì ngôn ngữ của người dùng.

Chỉ dùng khi người dùng yêu cầu hoặc thông tin thực sự cần thiết.

---

# 18. ARRANGEMENT

```text
ARRANGEMENT
    instrumentation
    primary_instrument
    supporting_instruments
    percussion
    bass
    harmonic_instruments
    melodic_instruments
    texture
    density
    layering
    section_instrumentation
    intro_instrumentation
    chorus_instrumentation
    bridge_instrumentation
    outro_instrumentation
```

---

# 19. PERFORMANCE

```text
PERFORMANCE
    performance_style
    dynamics
    articulation
    expression
    intensity
    phrasing
    rubato
    accent
    ornamentation
```

---

# 20. PRODUCTION

```text
PRODUCTION
    sonic_character
    dynamic_character
    spatial_character
    acoustic_character
    electronic_character
    density
```

Không tự điền thông tin phối âm hoặc mixing chi tiết nếu bước 2 không cần đến.

---

# 21. OUTPUT

Output mặc định của hệ thống:

```text
OUTPUT
    notation_format = MusicXML 4.0
```

Các trường bổ sung:

```text
    include_lyrics
    include_vocal_melody
    include_harmony
    include_instruments
    include_tempo
    include_key
    include_time_signature
    include_dynamics
    include_metadata
```

Nếu người dùng yêu cầu MusicXML 4.0, ghi rõ:

```text
notation_format = MusicXML 4.0
format_requirement = strict
```

---

# 22. CONSTRAINTS

Mọi ràng buộc đặc biệt phải được gom vào:

```text
CONSTRAINTS
    hard_constraints
    preferred_constraints
    prohibited_elements
    required_elements
    numerical_constraints
    duration_constraints
    range_constraints
    structural_constraints
```

Ví dụ:

```text
hard_constraints:
    language = Vietnamese
    tempo = 76 BPM
    time_signature = 4/4

preferred_constraints:
    moderate melodic complexity

prohibited_elements:
    excessive vocal range
```

---

# 23. INFERENCE RULES

AI được phép suy luận, nhưng phải tuân thủ nguyên tắc:

### 23.1. Chỉ suy luận thông tin hợp lý từ ngữ cảnh

Ví dụ:

```text
"nhạc ru cho trẻ em"
```

có thể suy luận:

```text
gentle
simple
repetitive
low rhythmic complexity
```

### 23.2. Không suy luận thông tin có ảnh hưởng lớn nếu chưa có cơ sở

Ví dụ không được tự suy luận:

```text
key = C major
```

chỉ vì không có key.

Nên ghi:

```text
key = unspecified
selection_strategy = composer determines suitable key
```

trừ khi hệ thống đã có default rõ ràng.

---

# 24. QUESTION RULES

AI chỉ nên hỏi người dùng khi thông tin thiếu có thể ảnh hưởng đáng kể đến kết quả.

## 24.1. Không hỏi những thứ có thể suy luận an toàn

Không hỏi:

```text
"Bạn muốn bài có Verse hay Chorus?"
```

khi người dùng đã yêu cầu một bài hát thông thường.

AI có thể đề xuất cấu trúc.

## 24.2. Nên hỏi khi:

- hai yêu cầu xung đột;
- một thông tin bắt buộc bị thiếu;
- có nhiều lựa chọn hoàn toàn khác nhau;
- quyết định sẽ ảnh hưởng lớn đến kết quả;
- người dùng đang có một ý định chưa xác định rõ.

---

# 25. QUESTION PRIORITY

Khi cần hỏi, ưu tiên:

```text
1. Ý định/chủ đề
2. Ngôn ngữ
3. Genre/phong cách
4. Cảm xúc
5. Người hát
6. Cấu trúc
7. Lời
8. Melody
9. Rhythm
10. Harmony
11. Arrangement
12. Production
```

Không hỏi hàng chục câu cùng lúc nếu có thể nhóm chúng thành một số câu hỏi có ý nghĩa.

---

# 26. QUESTION STYLE

Mỗi câu hỏi phải:

- rõ;
- cụ thể;
- ngắn;
- có thể trả lời dễ dàng;
- không yêu cầu người dùng hiểu thuật ngữ chuyên môn nếu không cần thiết.

Thay vì:

```text
Bạn muốn harmonic rhythm bao nhiêu?
```

có thể hỏi:

```text
Bạn muốn hợp âm thay đổi chậm, vừa hay dày đặc?
```

Sau đó AI tự chuyển sang tham số kỹ thuật.

---

# 27. NORMALIZATION RULES

AI phải chuyển các cách nói tự nhiên thành các thuộc tính có cấu trúc.

Ví dụ:

### "Buồn"

Có thể chuẩn hóa:

```text
primary_emotion:
    sadness

emotional_intensity:
    medium-high
```

### "Rất nhẹ nhàng"

```text
intensity:
    low

texture:
    sparse

rhythm:
    low-density

performance:
    soft
```

### "Bắt tai"

```text
melodic_memorability:
    high

hook_strength:
    high

repetition:
    medium-high
```

---

# 28. XỬ LÝ MƠ HỒ

Khi người dùng sử dụng từ mơ hồ:

```text
hay
đỉnh
buồn
sâu
chất
mạnh
nhẹ
bắt tai
cổ điển
hiện đại
```

AI phải chuyển chúng thành các thuộc tính cụ thể hơn.

Ví dụ:

```text
"mạnh"
→ high_energy
→ stronger_attack
→ higher_dynamic_contrast
```

Không được xem một từ mơ hồ là một tham số duy nhất.

---

# 29. XỬ LÝ MÂU THUẪN

Nếu phát hiện mâu thuẫn:

```text
CONFLICT
    field
    value_A
    source_A
    value_B
    source_B
    severity
    recommended_resolution
```

Mức độ:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

### LOW

Có thể tự giải quyết theo quy tắc.

### MEDIUM

Có thể đề xuất lựa chọn.

### HIGH

Nên yêu cầu người dùng xác nhận.

### CRITICAL

Không được hoàn thiện PROMPT CHUẨN nếu chưa giải quyết.

---

# 30. VÍ DỤ MÂU THUẪN

Người dùng:

```text
Tôi muốn một bài hát cực kỳ nhẹ nhàng,
nhưng phải có năng lượng như nhạc dance mạnh.
```

AI không được đơn giản chọn một phía.

Phải xác định:

```text
energy = high
softness = high
potential_conflict = true
```

và giải thích rằng hai đặc trưng có thể cùng tồn tại nhưng cần được thể hiện ở những khía cạnh khác nhau.

Ví dụ:

```text
vocal = soft
texture = elegant
rhythm = energetic
```

---

# 31. DEFAULT RULES

Nếu người dùng không quy định một tham số, AI có thể dùng default khi:

1. tham số đó không phải quyết định sáng tác cốt lõi;
2. default phù hợp với genre;
3. default không trái yêu cầu người dùng;
4. default có thể được thay đổi ở bước review.

Mỗi default phải được đánh dấu:

```text
source = DEFAULT
```

---

# 32. COMPLETENESS CHECK

Trước khi đưa PROMPT CHUẨN cho người dùng, AI phải kiểm tra:

```text
[ ] Language identified
[ ] Main concept identified
[ ] Genre identified or explicitly left open
[ ] Emotional direction identified
[ ] Song form identified or inferred
[ ] Vocal requirements identified or intentionally unspecified
[ ] Lyric requirements identified
[ ] Melody requirements identified
[ ] Rhythm requirements identified or delegated
[ ] Harmony requirements identified or delegated
[ ] Arrangement requirements identified or delegated
[ ] Output format identified
[ ] Hard constraints identified
[ ] Conflicts resolved or clearly exposed
[ ] Ambiguous high-impact decisions handled
```

Không nhất thiết mọi trường phải có giá trị cụ thể.

Nhưng phải biết trường nào:

```text
DEFINED
INFERRED
DEFAULT
UNSPECIFIED
REQUIRES_CONFIRMATION
```

---

# 33. STATUS CỦA TỪNG TRƯỜNG

Mỗi trường trong PROMPT CHUẨN nên có trạng thái:

```text
DEFINED
INFERRED
DEFAULT
UNSPECIFIED
REQUIRES_CONFIRMATION
```

Ví dụ:

```text
tempo:
    value = 76 BPM
    status = USER_EXPLICIT

key:
    value = unspecified
    status = DELEGATED_TO_COMPOSER
```

---

# 34. PROMPT CHUẨN KHÔNG ĐƯỢC CHỨA SUY LUẬN ẨN

Không được viết:

```text
"hãy làm bài thật cảm xúc"
```

mà phải cố gắng chuyển thành:

```text
emotional_intensity = high
emotional_arc = gradual_build_to_strong_climax
```

Không phải lúc nào cũng có thể định lượng chính xác, nhưng luôn phải làm rõ ý định.

---

# 35. CẤU TRÚC ĐẦU RA CỦA AI BƯỚC 1

AI phải trả kết quả theo 4 phần.

## PHẦN A — INTERPRETATION

Tóm tắt AI đã hiểu yêu cầu gì.

## PHẦN B — MISSING / AMBIGUOUS INFORMATION

Những điểm còn thiếu hoặc mơ hồ.

## PHẦN C — STANDARD PROMPT

PROMPT CHUẨN.

## PHẦN D — REVIEW INSTRUCTIONS

Liệt kê những trường người dùng nên kiểm tra hoặc chỉnh sửa.

---

# 36. FORMAT CỦA STANDARD PROMPT

PROMPT CHUẨN nên có cấu trúc:

```text
SONG_REQUEST

PROJECT:
...

LANGUAGE:
...

CONCEPT:
...

EMOTION:
...

STORY:
...

GENRE:
...

SONG_FORM:
...

LYRIC:
...

MELODY:
...

RHYTHM:
...

HARMONY:
...

VOCAL:
...

ARRANGEMENT:
...

PERFORMANCE:
...

PRODUCTION:
...

CONSTRAINTS:
...

OUTPUT:
...
```

---

# 37. KHÔNG ĐƯỢC ĐƯA KIẾN THỨC SÁNG TÁC CHI TIẾT VÀO PROMPT CHUẨN

Ví dụ không nên biến:

```text
Music theory knowledge:
Dominant chord tends to resolve to tonic.
```

thành prompt cho người dùng.

Đó là kiến thức thuộc TÀI LIỆU 2.

PROMPT CHUẨN chỉ cần:

```text
harmonic_style:
    functional pop harmony
```

AI bước 2 sẽ sử dụng kiến thức tương ứng trong TÀI LIỆU 2.

---

# 38. RANH GIỚI GIỮA TÀI LIỆU 1 VÀ TÀI LIỆU 2

## TÀI LIỆU 1 trả lời:

```text
USER MUỐN GÌ?
```

## TÀI LIỆU 2 trả lời:

```text
LÀM THẾ NÀO ĐỂ HIỆN THỰC HÓA ĐIỀU ĐÓ?
```

Ví dụ:

TÀI LIỆU 1:

```text
melody:
    lyrical
    memorable
    moderate range
```

TÀI LIỆU 2:

```text
lyrical melody:
    use mostly stepwise motion
    controlled leaps
    phrase contour
    cadential behavior
    motif repetition
    ...
```

---

# 39. QUY TẮC KHÔNG TRỘN HAI TẦNG

AI bước 1:

- không sáng tác;
- không viết melody cụ thể;
- không chọn từng nốt;
- không viết hợp âm cụ thể trừ khi người dùng yêu cầu;
- không tạo MusicXML.

AI bước 1 chỉ tạo specification.

---

# 40. USER REVIEW LOOP

Sau khi AI tạo PROMPT CHUẨN:

```text
DRAFT
   ↓
USER REVIEW
   ↓
USER EDIT
   ↓
REVISED PROMPT
   ↓
VALIDATION
   ↓
FINAL PROMPT
```

AI phải hỗ trợ người dùng chỉnh sửa.

Ví dụ người dùng nói:

> "Cho chorus cao hơn verse và tempo nhanh hơn một chút."

AI phải cập nhật:

```text
SONG_FORM:
    chorus_intensity > verse_intensity

RHYTHM:
    tempo = adjusted upward from previous value
```

Không tạo lại prompt từ đầu theo cách làm mất các thông tin đã xác nhận.

---

# 41. VERSIONING

PROMPT CHUẨN phải hỗ trợ phiên bản.

Ví dụ:

```text
PROMPT_VERSION:
    1.0
```

Sau khi sửa:

```text
PROMPT_VERSION:
    1.1
```

Nếu thay đổi lớn:

```text
2.0
```

Mục đích là tránh mất thông tin khi người dùng chỉnh sửa nhiều lần.

---

# 42. IMMUTABLE USER REQUIREMENTS

Các yêu cầu đã được người dùng xác nhận phải được đánh dấu:

```text
LOCKED = true
```

AI không được tự thay đổi các trường:

```text
LOCKED
```

trừ khi người dùng yêu cầu thay đổi.

---

# 43. DELEGATED FIELDS

Người dùng có thể không muốn quyết định mọi thứ.

Ví dụ:

```text
key:
    status = DELEGATED

harmony:
    status = DELEGATED

arrangement:
    status = DELEGATED
```

Điều này hoàn toàn hợp lệ.

Không được coi trường bị bỏ trống là lỗi nếu người dùng cố ý giao quyền quyết định cho AI sáng tác.

---

# 44. HARD / SOFT / DELEGATED

Mỗi constraint nên có:

```text
HARD
SOFT
DELEGATED
```

### HARD

Phải giữ.

### SOFT

Nên giữ, nhưng có thể thay đổi nếu cần thiết.

### DELEGATED

AI bước 2 được quyền lựa chọn.

---

# 45. EXAMPLE OF STANDARD PROMPT

```text
SONG_REQUEST

PROJECT:
    title = "Working Title"
    purpose = personal listening

LANGUAGE:
    primary_language = Vietnamese
    dialect = unspecified

CONCEPT:
    main_theme = young love and separation
    central_message = memories remain after a relationship ends

EMOTION:
    primary_emotion = melancholy
    secondary_emotions = nostalgia, tenderness
    emotional_arc =
        nostalgia
        -> sadness
        -> emotional climax
        -> acceptance

GENRE:
    primary_genre = Pop Ballad
    stylistic_character = modern, intimate

SONG_FORM:
    structure =
        INTRO
        VERSE_1
        PRE_CHORUS
        CHORUS
        VERSE_2
        PRE_CHORUS
        CHORUS
        BRIDGE
        FINAL_CHORUS
        OUTRO

LYRIC:
    language = Vietnamese
    style = poetic but natural
    syllable_target = moderate
    rhyme_density = medium
    hook = required
    singability = high

MELODY:
    character = lyrical
    melodic_range = moderate
    contour = mostly smooth
    memorability = high
    chorus_contrast = stronger than verse

RHYTHM:
    tempo = 76 BPM
    time_signature = 4/4
    rhythmic_density = moderate

HARMONY:
    style = contemporary pop ballad
    complexity = moderate

VOCAL:
    voice_type = female
    range = moderate
    performance = intimate and emotional

ARRANGEMENT:
    piano = primary
    acoustic_guitar = supporting
    bass = supporting
    drums = restrained
    strings = gradual build

CONSTRAINTS:
    hard:
        language = Vietnamese
        tempo = 76 BPM
        time_signature = 4/4

    soft:
        chorus should feel more intense than verse

    delegated:
        key
        detailed chord progression
        exact instrumentation voicing

OUTPUT:
    notation_format = MusicXML 4.0
    include_lyrics = true
    include_vocal_melody = true
    include_harmony = true
    include_instruments = true
    include_metadata = true
```

Đây chỉ là ví dụ về cấu trúc; AI không được coi các giá trị trên là mặc định của mọi bài hát.

---

# 46. REVIEW CHECKLIST CHO NGƯỜI DÙNG

Trước khi người dùng xác nhận PROMPT CHUẨN, hệ thống nên cho phép kiểm tra:

```text
[ ] Chủ đề đúng
[ ] Cảm xúc đúng
[ ] Cốt truyện đúng
[ ] Thể loại đúng
[ ] Cấu trúc đúng
[ ] Ngôn ngữ đúng
[ ] Cách viết lời đúng
[ ] Giai điệu mong muốn đúng
[ ] Tempo đúng
[ ] Nhịp đúng
[ ] Giọng hát đúng
[ ] Nhạc cụ đúng
[ ] Ràng buộc đúng
[ ] Định dạng đầu ra đúng
```

---

# 47. VALIDATION RULES CHO AI

Trước khi kết thúc bước 1, AI phải kiểm tra:

### 47.1. Completeness

PROMPT CHUẨN phải đủ thông tin để AI bước 2 hiểu mục tiêu bài hát.

### 47.2. Consistency

Không được có các trường mâu thuẫn nghiêm trọng.

### 47.3. Traceability

Mỗi yêu cầu quan trọng phải biết nguồn:

```text
USER_EXPLICIT
USER_CONFIRMED
INFERRED
DEFAULT
DELEGATED
```

### 47.4. No hidden assumptions

Không được đưa các giả định quan trọng vào prompt mà không đánh dấu.

### 47.5. Output compatibility

PROMPT CHUẨN phải chứa đủ thông tin cần thiết để bước 2 tạo MusicXML 4.0.

---

# 48. TRACEABILITY METADATA

Nếu hệ thống phần mềm hỗ trợ, mỗi trường nên lưu:

```text
field
value
source
confidence
locked
```

Ví dụ:

```text
tempo:
    value = 76 BPM
    source = USER_EXPLICIT
    confidence = 1.0
    locked = true
```

Ví dụ:

```text
instrumentation:
    value = piano + acoustic guitar + strings
    source = INFERRED
    confidence = 0.78
    locked = false
```

Thông tin này cực kỳ hữu ích cho bước review.

---

# 49. CONFIDENCE

Không cần dùng confidence cho tất cả trường.

Nếu dùng, có thể quy ước:

```text
0.90–1.00 = very high
0.75–0.89 = high
0.50–0.74 = medium
0.25–0.49 = low
0.00–0.24 = very low
```

Thông tin có confidence thấp và ảnh hưởng lớn nên được đưa vào danh sách cần xác nhận.

---

# 50. QUY TẮC ĐỐI VỚI PROMPT NGƯỜI DÙNG MƠ HỒ

Ví dụ:

> "Hãy viết một bài thật buồn và sâu."

AI phải chuyển thành các câu hỏi hoặc trường:

```text
primary_emotion = sadness
emotional_intensity = high

EMOTIONAL_INTERPRETATION:
    depth = high
```

nhưng không được giả định:

```text
tempo = 60 BPM
key = A minor
```

nếu không có cơ sở.

---

# 51. QUY TẮC ĐỐI VỚI THAM CHIẾU PHONG CÁCH

Nếu người dùng mô tả:

> "giống phong cách nhạc X"

AI phải chuyển yêu cầu thành các thuộc tính âm nhạc có tính khái quát:

```text
melodic_character
rhythmic_character
harmonic_character
instrumentation
vocal_character
production_character
emotional_character
```

Không biến thành yêu cầu sao chép nguyên tác.

---

# 52. QUY TẮC ĐỐI VỚI YÊU CẦU KHÔNG KHẢ THI

Nếu người dùng yêu cầu một điều không thể thực hiện chính xác:

```text
1. phát hiện
2. giải thích
3. giữ nguyên ý định nếu có thể
4. đề xuất phiên bản gần nhất
5. yêu cầu người dùng xác nhận nếu cần
```

Không được âm thầm thay đổi yêu cầu.

---

# 53. QUY TẮC ĐỂ TÀI LIỆU 1 HOẠT ĐỘNG TỐT VỚI TÀI LIỆU 2

PROMPT CHUẨN phải sử dụng **thuật ngữ ổn định**.

Ví dụ không lúc dùng:

```text
sad
```

lúc:

```text
melancholy
```

lúc:

```text
buồn buồn
```

nếu cả ba đang biểu thị cùng một khái niệm.

Nên có taxonomy thống nhất.

Ví dụ:

```text
EMOTION:
    sadness
    nostalgia
    joy
    anger
    hope
```

Tài liệu 2 sử dụng cùng taxonomy này.

---

# 54. SHARED VOCABULARY

Tài liệu 1 và Tài liệu 2 nên dùng chung một bộ từ vựng chuẩn:

```text
SHARED_ONTOLOGY

GENRE
EMOTION
SONG_FORM
VOCAL
MELODY
RHYTHM
HARMONY
ARRANGEMENT
PERFORMANCE
LANGUAGE
LYRIC
OUTPUT
```

Điều này giúp giảm lỗi khi chuyển từ bước 1 sang bước 2.

---

# 55. TÀI LIỆU 1 KHÔNG NÊN LÀ PROMPT DÀI DUY NHẤT

Không nên thiết kế:

```text
"Bạn là nhạc sĩ..."
```

rồi viết hàng nghìn dòng hướng dẫn chung trong một prompt.

Thay vào đó:

```text
DOCUMENT 1
    ↓
SCHEMA
    ↓
RULES
    ↓
EXAMPLES
    ↓
VALIDATION
```

AI có thể sử dụng tài liệu này như một specification.

---

# 56. QUY TRÌNH CHUẨN

AI bước 1 phải thực hiện:

```text
INPUT
    ↓
READ USER REQUEST
    ↓
EXTRACT EXPLICIT REQUIREMENTS
    ↓
CLASSIFY REQUIREMENTS
    ↓
NORMALIZE TERMS
    ↓
IDENTIFY MISSING INFORMATION
    ↓
INFER SAFE INFORMATION
    ↓
IDENTIFY CONFLICTS
    ↓
ASK HIGH-VALUE QUESTIONS IF NEEDED
    ↓
CREATE STANDARD PROMPT
    ↓
VALIDATE STANDARD PROMPT
    ↓
PRESENT FOR USER REVIEW
```

Sau khi người dùng review:

```text
USER MODIFICATIONS
    ↓
UPDATE ONLY AFFECTED FIELDS
    ↓
REVALIDATE
    ↓
LOCK CONFIRMED FIELDS
    ↓
FINAL STANDARD PROMPT
```

---

# 57. ĐẦU RA CUỐI CÙNG CỦA BƯỚC 1

Đầu ra cuối cùng phải có hai phần logic:

```text
PROMPT_METADATA
STANDARD_SONG_PROMPT
```

### PROMPT_METADATA

```text
prompt_version
status
created_from
last_modified
language
```

### STANDARD_SONG_PROMPT

Toàn bộ specification của bài hát.

---

# 58. PROMPT STATUS

Cho phép:

```text
DRAFT
NEEDS_REVIEW
USER_REVIEWED
NEEDS_CONFIRMATION
FINAL
```

Chỉ khi:

```text
status = FINAL
```

mới được chuyển sang AI bước 2.

---

# 59. QUY TẮC QUAN TRỌNG NHẤT

AI bước 1 phải luôn phân biệt:

```text
WHAT THE USER WANTS
```

với:

```text
WHAT THE AI THINKS WOULD BE GOOD
```

Hai thứ này không được trộn lẫn.

Ví dụ người dùng muốn:

```text
4/4
```

AI thấy 6/8 hay hơn cũng không được tự đổi.

Nó chỉ có thể:

```text
recommend alternative = 6/8
```

và chờ người dùng quyết định.

---

# 60. MỤC TIÊU CUỐI CÙNG

Một PROMPT CHUẨN tốt phải cho phép AI bước 2 hiểu được:

```text
WHAT
    bài hát gì?

WHY
    mục đích gì?

WHO
    cho ai hát?

LANGUAGE
    ngôn ngữ nào?

ABOUT WHAT
    chủ đề gì?

HOW SHOULD IT FEEL
    cảm xúc nào?

HOW SHOULD IT BE STRUCTURED
    cấu trúc gì?

HOW SHOULD THE WORDS WORK
    lời như thế nào?

HOW SHOULD THE MELODY WORK
    giai điệu như thế nào?

HOW SHOULD THE RHYTHM WORK
    tiết tấu như thế nào?

HOW SHOULD THE HARMONY WORK
    hòa âm như thế nào?

HOW SHOULD IT BE PERFORMED
    thể hiện như thế nào?

HOW SHOULD IT BE ARRANGED
    phối khí như thế nào?

WHAT MUST NOT CHANGE
    ràng buộc nào?

WHAT MAY THE COMPOSER DECIDE
    phần nào giao cho AI?

WHAT FORMAT MUST BE PRODUCED
    MusicXML 4.0
```

---

# 61. QUY TẮC CUỐI CÙNG DÀNH CHO AI

Trước khi đưa PROMPT CHUẨN cho người dùng:

```text
DO NOT:
- compose the song
- write the final melody
- write MusicXML
- invent important requirements
- hide conflicts
- silently alter explicit requirements
- treat defaults as user requirements

DO:
- understand
- structure
- normalize
- infer carefully
- expose ambiguity
- detect conflicts
- preserve user intent
- produce a complete structured specification
- make the specification easy for the user to review
```

---

# 62. TÓM TẮT KIẾN TRÚC

TÀI LIỆU 1 có nhiệm vụ:

```text
FREE USER REQUEST
        ↓
UNDERSTAND
        ↓
STRUCTURE
        ↓
NORMALIZE
        ↓
INFER
        ↓
ASK
        ↓
VALIDATE
        ↓
STANDARD PROMPT
```

TÀI LIỆU 1 **không có nhiệm vụ sáng tác**.

TÀI LIỆU 2 mới cung cấp:

```text
LANGUAGE KNOWLEDGE
POETRY KNOWLEDGE
LYRIC KNOWLEDGE
MELODY KNOWLEDGE
RHYTHM KNOWLEDGE
HARMONY KNOWLEDGE
FORM KNOWLEDGE
VOCAL KNOWLEDGE
ARRANGEMENT KNOWLEDGE
GENRE KNOWLEDGE
MUSICXML KNOWLEDGE
VALIDATION KNOWLEDGE
```

Sau đó:

```text
STANDARD PROMPT
       +
MUSIC KNOWLEDGE
       ↓
AI COMPOSER
       ↓
MusicXML 4.0
```

Định hướng thiết kế của Tài liệu 1 là: **không biến nó thành một tài liệu kiến thức âm nhạc**, mà biến nó thành **“hợp đồng dữ liệu” giữa người dùng và AI sáng tác**.