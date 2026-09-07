Dựa trên **Tài liệu 1 – AI Music Prompt Builder Specification v3.0**, yêu cầu “sáng tác bài hát về mùa thu mang âm hưởng cách mạng hào hùng” đủ cơ sở để tạo **DRAFT Standard Song Prompt**, nhưng chưa nên tự quyết định các thông số như BPM, giọng, nhạc cụ cụ thể hay cao độ. Tài liệu 1 yêu cầu phải bảo toàn ý định người dùng và phân biệt rõ `USER_EXPLICIT`, `INFERRED`, `DELEGATED`... 

## A. INTERPRETATION

Người dùng muốn sáng tác **một bài hát tiếng Việt về mùa thu**, mang **không khí/âm hưởng cách mạng hào hùng**. Bài hát nên tạo cảm giác **trang trọng, mạnh mẽ, giàu khí thế và tinh thần cộng đồng**, với mùa thu là hình ảnh/chủ đề trung tâm.

Các chi tiết về giai điệu, hòa âm, nhịp điệu, phối khí cụ thể sẽ được giao cho AI Bước 2 quyết định nếu người dùng chưa chỉ rõ.

---

## B. ISSUES

### `missing`

* Chưa xác định cấu trúc bài hát cụ thể.
* Chưa xác định tempo/BPM.
* Chưa xác định nhịp.
* Chưa xác định giọng hát/loại giọng.
* Chưa xác định nhạc cụ phối khí.
* Chưa xác định độ dài bài hát.

### `ambiguous`

* “Mùa thu” có thể là:

  * mùa thu thiên nhiên;
  * mùa thu gắn với lịch sử/cách mạng;
  * hoặc kết hợp cả hai.
* “Âm hưởng cách mạng hào hùng” có thể thiên về **tráng ca, hành khúc, sử thi** hoặc **ca khúc cách mạng giàu chất trữ tình**.

### `recommendation`

Để tạo đúng màu sắc mong muốn, có thể định hướng bài hát theo hướng:

> **Mùa thu Việt Nam + tinh thần cách mạng + hào hùng + trang trọng + niềm tin + tự hào.**

---

# C. STANDARD SONG PROMPT — DRAFT

```text
SONG_REQUEST
────────────────────────────────────────────────────────

PROJECT
  purpose:
    Sáng tác một ca khúc về mùa thu mang âm hưởng cách mạng hào hùng.

  target_audience:
    unspecified

  usage_context:
    unspecified


LANGUAGE
  primary_language:
    Vietnamese
    status: DEFINED
    source: USER_EXPLICIT

  dialect:
    unspecified
    status: UNSPECIFIED

  pronunciation_requirements:
    Vietnamese lyrics should have natural pronunciation and high singability.
    status: INFERRED


CONCEPT
  main_theme:
    Mùa thu Việt Nam

  subject:
    Mùa thu và tinh thần cách mạng hào hùng

  setting:
    Không gian mùa thu Việt Nam,
    có thể gợi liên tưởng đến không khí lịch sử và cộng đồng.

  narrator:
    unspecified

  characters:
    unspecified

  central_message:
    Tôn vinh vẻ đẹp của mùa thu gắn với tinh thần hào hùng,
    niềm tự hào, sức mạnh và niềm tin.

  imagery:
    mùa thu, đất nước, bầu trời, ánh sáng, quê hương,
    con người, bước chân, cờ, không gian rộng lớn,
    những hình ảnh mang tính biểu tượng của tinh thần hào hùng.

  status:
    INFERRED


EMOTION
  primary_emotion:
    heroic / triumphant

  secondary_emotions:
    pride, hope, inspiration, solemnity

  intensity:
    high

  emotional_arc:
    mở đầu trang trọng và giàu hình ảnh mùa thu
    → phát triển thành cảm xúc mạnh mẽ
    → tăng dần khí thế
    → cao trào hào hùng
    → kết thúc rộng lớn, khẳng định niềm tin và tự hào.

  status:
    INFERRED


STORY
  beginning:
    Gợi mở khung cảnh mùa thu và vẻ đẹp của đất nước.

  development:
    Từ hình ảnh mùa thu mở rộng sang con người,
    quê hương và tinh thần cộng đồng.

  conflict:
    unspecified

  turning_point:
    DELEGATED

  climax:
    Cao trào thể hiện rõ nhất tinh thần hào hùng,
    tự hào và niềm tin.

  resolution:
    Kết thúc bằng cảm giác mạnh mẽ, rộng lớn,
    lạc quan và đầy niềm tin.

  status:
    INFERRED / DELEGATED


GENRE
  primary_genre:
    Vietnamese revolutionary song / heroic song

  subgenre:
    DELEGATED

  fusion_genres:
    unspecified

  stylistic_character:
    heroic, solemn, grand, patriotic, uplifting,
    emotionally powerful, communal

  era:
    unspecified

  regional_style:
    Vietnamese

  reference_style:
    Không sao chép một nghệ sĩ hoặc tác phẩm cụ thể.
    Chỉ sử dụng các đặc trưng khái quát của dòng ca khúc
    cách mạng/tráng ca Việt Nam.

  status:
    primary_genre = INFERRED
    stylistic_character = INFERRED


SONG_FORM
  section_order:
    DELEGATED

  section_count:
    DELEGATED

  section_length:
    DELEGATED

  repetition:
    Hook/điệp khúc cần có khả năng tạo cảm giác cộng đồng
    và dễ ghi nhớ.

  variation:
    Đề nghị có sự phát triển rõ ràng về cường độ giữa
    các phần và đạt cao trào ở chorus/final chorus.

  status:
    DELEGATED


LYRIC
  language:
    Vietnamese

  topic:
    Mùa thu, quê hương, đất nước, tinh thần cách mạng,
    niềm tự hào, hy vọng và khí thế hào hùng.

  style:
    giàu hình ảnh, trang trọng, hào hùng,
    có tính thơ nhưng tự nhiên và dễ hát.

  vocabulary_style:
    trong sáng, giàu tính biểu tượng,
    phù hợp với không khí tráng ca.

  syllable_target:
    DELEGATED

  line_length:
    DELEGATED

  rhyme:
    DELEGATED

  repetition:
    Điệp khúc có tính ghi nhớ cao.

  hook:
    REQUIRED

  keywords:
    mùa thu, quê hương, đất nước, niềm tin,
    tự hào, hào hùng, ánh sáng, tương lai

  forbidden_elements:
    Không sử dụng hình ảnh hoặc ngôn ngữ làm mất đi
    sắc thái trang trọng, hào hùng của ca khúc.

  point_of_view:
    DELEGATED

  singability:
    high

  Vietnamese requirements:
    natural_word_order
    natural_pronunciation
    high_vowel_singability
    high_consonant_singability
    natural interaction between lexical tone and melodic contour

  status:
    phần lớn INFERRED / DELEGATED


MELODY
  character:
    heroic, memorable, expansive, emotionally powerful

  range:
    DELEGATED

  register:
    DELEGATED

  contour:
    Có xu hướng phát triển từ vừa phải đến rộng và mạnh hơn
    ở cao trào.

  phrase_shape:
    rõ ràng, dễ hát, có khả năng tạo cảm giác quy mô lớn.

  motif:
    DELEGATED

  repetition:
    moderate-high

  variation:
    Có sự phát triển giữa verse và chorus.

  memorability:
    high

  complexity:
    moderate

  tension_resolution:
    rõ ràng, hướng tới cao trào hào hùng.

  status:
    INFERRED / DELEGATED


RHYTHM
  tempo:
    DELEGATED

  tempo_range:
    DELEGATED

  time_signature:
    DELEGATED

  groove:
    heroic / march-like character

  rhythmic_style:
    mạnh mẽ, chắc chắn, có tính tiến về phía trước.

  density:
    moderate

  syncopation:
    DELEGATED

  swing:
    unspecified

  status:
    groove / rhythmic_style = INFERRED
    numerical parameters = DELEGATED


HARMONY
  style:
    grand, heroic, emotionally uplifting

  complexity:
    moderate

  chord_language:
    DELEGATED

  progression:
    DELEGATED

  harmonic_rhythm:
    DELEGATED

  modulation:
    DELEGATED

  voicing_character:
    full, expansive, powerful

  status:
    INFERRED / DELEGATED


VOCAL
  voice_type:
    unspecified

  range:
    DELEGATED

  register:
    DELEGATED

  tessitura:
    DELEGATED

  vocal_character:
    powerful, clear, confident, emotionally expressive

  performance_style:
    heroic, solemn, passionate

  articulation:
    clear and firm

  ornamentation:
    restrained

  difficulty:
    DELEGATED

  status:
    vocal_character / performance_style = INFERRED


ARRANGEMENT
  instrumentation:
    DELEGATED

  primary_instruments:
    DELEGATED

  supporting_instruments:
    DELEGATED

  texture:
    expansive, gradually building, grand

  density:
    gradual increase toward climax

  layering:
    progressive layering

  section_instrumentation:
    DELEGATED

  status:
    texture / layering = INFERRED
    instruments = DELEGATED


PERFORMANCE
  style:
    heroic, solemn, confident, passionate

  dynamics:
    gradual dynamic build toward a powerful climax

  articulation:
    clear, firm, emphatic

  expression:
    proud, inspiring, emotionally powerful

  intensity:
    high

  phrasing:
    broad and expressive

  rubato:
    DELEGATED

  accent:
    strong accents at important musical phrases

  ornamentation:
    restrained

  status:
    INFERRED / DELEGATED


PRODUCTION
  sonic_character:
    grand, clear, powerful

  spatial_character:
    expansive

  acoustic_character:
    DELEGATED

  electronic_character:
    DELEGATED

  density:
    moderate → high toward climax

  status:
    INFERRED / DELEGATED


CONSTRAINTS
  hard:
    - primary_language = Vietnamese
    - main_theme = Mùa thu
    - overall_character = cách mạng hào hùng

  soft:
    - heroic
    - solemn
    - grand
    - inspirational
    - patriotic
    - memorable chorus
    - emotional progression toward a strong climax

  prohibited:
    - Không sao chép giai điệu hoặc lời của tác phẩm có sẵn.
    - Không làm mất chủ đề mùa thu.
    - Không làm mất sắc thái hào hùng/cách mạng.

  required:
    - Vietnamese lyrics
    - clear autumn imagery
    - heroic revolutionary atmosphere
    - memorable hook/chorus
    - strong emotional climax

  numerical:
    DELEGATED

  duration:
    DELEGATED

  range:
    DELEGATED

  structural:
    DELEGATED


OUTPUT
  notation_format:
    MusicXML 4.0

  include_lyrics:
    true

  include_vocal_melody:
    true

  include_harmony:
    true

  include_instruments:
    true

  include_tempo:
    true

  include_key:
    true

  include_time_signature:
    true

  include_dynamics:
    true

  include_metadata:
    true
```

### D. REVIEW CHECKLIST

Trước khi khóa thành `FINAL`, tôi khuyên bạn chỉ cần quyết định **4 điểm quan trọng**:

1. **Mùa thu theo hướng nào?**

   * A. Mùa thu thiên nhiên + đất nước
   * B. Mùa thu gắn với cách mạng/lịch sử
   * C. Kết hợp cả hai

2. **Phong cách hào hùng nào?**

   * A. **Hành khúc cách mạng** — mạnh, chắc, có khí thế.
   * B. **Tráng ca sử thi** — rộng lớn, hoành tráng.
   * C. **Cách mạng trữ tình** — hào hùng nhưng giàu chất thơ.
   * D. Kết hợp A + B + C.

3. **Muốn giọng hát nào?**

   * Nam / Nữ / Hợp xướng / Đơn ca + hợp xướng / để AI tự chọn.

4. **Có muốn bài hát mang màu sắc của một thời kỳ lịch sử cụ thể không?**

   * Ví dụ: không khí mùa thu và cách mạng Việt Nam nói chung.
   * Hoặc một giai đoạn/sự kiện cụ thể.

**Nếu bạn không muốn bổ sung gì**, tôi có thể coi các mục còn lại là `DELEGATED` và prompt này có thể tiếp tục được hoàn thiện thành **FINAL Prompt** để đưa sang Bước 2. Việc để các quyết định như tempo, key, progression ở trạng thái `DELEGATED` phù hợp với nguyên tắc của Tài liệu 1, vì Bước 1 không được tự ý quyết định các chi tiết sáng tác có tác động lớn. 
