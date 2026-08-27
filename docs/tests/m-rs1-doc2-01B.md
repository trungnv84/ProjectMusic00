Tôi sẽ sáng tác một ca khúc về mùa thu mang âm hưởng cách mạng hào hùng, tuân thủ đúng yêu cầu và các nguyên tắc trong Knowledge Base Specification.

## COMPOSITION NOTES

```
central_poetic_image:
  chosen_image: "Ánh sáng mùa thu soi rọi quê hương và lòng người"
  development_across_song: 
    - Verse 1: Ánh sáng thu trong trẻo, tĩnh lặng soi chiếu không gian quê hương
    - Verse 2: Ánh sáng thu chuyển động cùng bước chân người, khí thế bắt đầu lên
    - Chorus: Ánh sáng thu trở thành ngọn lửa niềm tin, rực rỡ và bừng sáng
    - Bridge: Ánh sáng thu gợi nhớ trang sử hào hùng của dân tộc
    - Final Chorus: Ánh sáng thu là biểu tượng của niềm tin tất thắng, rọi đến tương lai

literary_devices_used:
  - device: "ẩn dụ"
    location: "chorus"
    purpose: "Ánh sáng thu ẩn dụ cho niềm tin, tinh thần cách mạng soi đường"
  - device: "điệp ngữ"
    location: "chorus và final chorus"
    purpose: "Điệp cấu trúc 'Mùa thu ơi' và 'Ánh sáng...' tạo tính ghi nhớ và nhấn mạnh"
  - device: "nhân hóa"
    location: "verse 1"
    purpose: "Gió thu, lá vàng được nhân hóa để kể câu chuyện, tạo sự sống động"
  - device: "đối"
    location: "verse 2"
    purpose: "Đối giữa hình ảnh thiên nhiên (trời xanh) và con người (bước chân) tạo cân bằng"
  - device: "liệt kê"
    location: "bridge"
    purpose: "Liệt kê các biểu tượng lịch sử - văn hóa tạo không gian rộng lớn, trang trọng"
  - device: "câu hỏi tu từ"
    location: "bridge cuối"
    purpose: "Gợi chiều sâu suy tư về sức mạnh dân tộc trước khi dồn lên climax"
  - device: "cường điệu"
    location: "final chorus"
    purpose: "Phóng đại hình ảnh ánh sáng/thu để đạt cao trào cảm xúc"
  - device: "so sánh"
    location: "verse 1"
    purpose: "So sánh hình ảnh quê hương với vầng dương tròn đầy, tạo cảm giác ấm áp, ổn định"

cultural_historical_references:
  - motif_type: "hình ảnh mùa thu trong văn hóa Việt Nam (trăng thu, gió heo may, lá vàng)"
    confidence: "cao"
    how_transformed: "Kết hợp với biểu tượng quê hương, đất nước, không khí lịch sử mùa thu của dân tộc"
  - motif_type: "tinh thần yêu nước trong văn học kháng chiến (hình ảnh quê hương, con đường, cờ)"
    confidence: "cao"
    how_transformed: "Sử dụng ở mức khái quát tinh thần chiến đấu vì tự do, độc lập; không trích nguyên văn"
  - motif_type: "biểu tượng ánh sáng trong văn hóa nhân loại và Việt Nam"
    confidence: "cao"
    how_transformed: "Ánh sáng mùa thu vừa là hình ảnh thiên nhiên, vừa là biểu tượng cách mạng, niềm tin"

resolved_delegated_fields:
  - field: "SONG_FORM.section_order"
    decision: "INTRO–VERSE1–PRE-CHORUS–CHORUS–VERSE2–PRE-CHORUS–CHORUS–BRIDGE–FINAL CHORUS–OUTRO"
    rationale: "Phù hợp với hành khúc/tráng ca, có đủ không gian để phát triển khí thế từ từ lên cao trào"
    alternatives_considered: 
      ["INTRO–VERSE1–CHORUS–VERSE2–CHORUS–BRIDGE–FINAL CHORUS–OUTRO (ngắn hơn, ít cao trào)", 
       "INTRO–VERSE1–PRE-CHORUS–CHORUS–VERSE2–CHORUS–BRIDGE–SOLO–FINAL CHORUS (phù hợp rock hơn)"]
  - field: "RHYTHM.tempo"
    decision: "112 BPM"
    rationale: "March-like character, hào hùng, vừa đủ khí thế mà vẫn hát rõ lời tiếng Việt"
    alternatives_considered: ["104 BPM (chậm hơn, ít dồn dập)", "120 BPM (nhanh hơn, nhưng có thể ảnh hưởng thanh điệu Việt)"]
  - field: "RHYTHM.time_signature"
    decision: "4/4"
    rationale: "Hành khúc/tráng ca chuẩn, phù hợp với groove heroic march-like"
    alternatives_considered: ["2/2 (quá nặng nề, ít linh hoạt)", "6/8 (không khí ballad hơn, không khớp tone hào hùng)"]
  - field: "HARMONY.key"
    decision: "D Major"
    rationale: "Heroic, hào hùng, ấm áp, phù hợp với sắc thái trang trọng và sử thi"
    alternatives_considered: ["C Major (quá phổ thông, thiếu màu sắc tráng ca đặc biệt)", "Eb Major (quá cao, không phù hợp giọng hát đại trà)"]
  - field: "MELODY.range"
    decision: "Tenor: C3–G4"
    rationale: "Âm vực vừa phải, dễ hát cho đại chúng, vẫn đủ không gian để tạo climax ở nốt G4"
    alternatives_considered: ["Baritone: G2–E4 (thiếu ánh sáng, hơi trầm cho hào hùng)", "C4–C5 (quá cao, khó hát tập thể)"]
  - field: "VOCAL.voice_type"
    decision: "Tenor (nam cao)"
    rationale: "Phù hợp với sáng tác tráng ca, giọng nam cao tạo cảm giác vươn lên, hào hùng, cộng đồng dễ hát"
    alternatives_considered: ["Mixed Choir (SATB) (quá phức tạp, dễ sai hòa thanh)", "Soprano (quá cao, ít kết nối cộng đồng)"]
  - field: "VOCAL.difficulty"
    decision: "moderate"
    rationale: "Dễ hát cho đại chúng, tạo tính cộng đồng, vẫn có độ khó vừa phải ở climax"
    alternatives_considered: ["easy (quá đơn giản, thiếu cao trào cảm xúc)", "hard (chỉ phù hợp ca sĩ chuyên nghiệp)"]
  - field: "ARRANGEMENT.primary_instruments"
    decision: "Brass (kèn đồng), Strings (dàn dây), Piano, Trumpet, Drum (march-like)"
    rationale: "Tạo không gian trang trọng, hào hùng, sử thi với kèn đồng và dây mạnh"
    alternatives_considered: ["Orchestra (quá to, khó kiểm soát mix)", "Band nhẹ (không đủ sức mạnh tráng ca)"]
  - field: "ARRANGEMENT.section_instrumentation"
    decision: "Intro: Piano + Strings nhẹ; Verse: Piano + Strings + Bass nhẹ; Pre-chorus: thêm Trumpet; Chorus: Full Brass + Strings + Drums; Bridge: Strings + Brass nhẹ hơn; Final Chorus: Full Tutti + Trumpet lead"
    rationale: "Tạo cảm giác build-up từ từ, mỗi section mới thêm lớp nhạc cụ, cao trào đạt ở Final Chorus"
    alternatives_considered: ["Thêm Choir từ Bridge (có thể quá nặng, che lời)", "Lead bằng Violin thay vì Trumpet (ít hào hùng hơn)"]
  - field: "HARMONY.progression"
    decision: "Verse: I–IV–V–I (D–G–A–D); Pre-chorus: vi–IV–V (Bm–G–A); Chorus: I–V–vi–IV (D–A–Bm–G); Bridge: bVII–IV–I–V (C–G–D–A) (modal interchange); Final Chorus: I–IV–V–I"
    rationale: "Kết hợp tiến trình ổn định, vay mượn bVII để tạo màu sắc sử thi, khơi gợi niềm tự hào"
    alternatives_considered: ["I–IV–V–I suốt bài (quá đơn điệu)", "i–bVI–bIII–bVII (thứ, không khí bi tráng, không khớp triumphant)"]
  - field: "HARMONY.modulation"
    decision: "Phrase modulation lên E major (lên 1 cung) ở Final Chorus"
    rationale: "Tạo cảm giác nâng tầm, mở rộng không gian hào hùng ở climax cuối cùng"
    alternatives_considered: ["Không modulation (thiếu đỉnh điểm nâng tầm)", "Modulation lên nửa cung (ít ấn tượng)"]
  - field: "LYRIC.point_of_view"
    decision: "Ngôi thứ nhất số nhiều 'chúng ta'"
    rationale: "Tạo cảm giác cộng đồng, cùng nhau hát vang, phù hợp với hành khúc/tráng ca"
    alternatives_considered: ["Ngôi thứ ba (khách quan, ít gắn kết)", "Ngôi thứ nhất số ít (quá cá nhân cho bài hào hùng)"]
  - field: "LYRIC.syllable_target"
    decision: "7–8 âm tiết/dòng (verse); 6–7 âm tiết/dòng (chorus)"
    rationale: "Trang trọng, gần thể thơ truyền thống (7 chữ), dễ nhớ, dễ hát"
    alternatives_considered: ["6–8 (verse), 8–10 (chorus) (quá dài, khó nhớ)", "5–6 (verse), 6–7 (chorus) (quá ngắn, thiếu chiều sâu)"]
  - field: "LYRIC.rhyme"
    decision: "Vần chân cách (ABAB) ở verse; Vần chân liền (AABB) ở chorus"
    rationale: "Verse ABAB tạo cảm giác kể chuyện; Chorus AABB tăng tính ghi nhớ, dễ thuộc"
    alternatives_considered: ["Vần chân liền toàn bài (quá đều, nhàm)", "Vần lưng (quá tinh tế, khó theo dõi cho đại chúng)"]
  - field: "PERFORMANCE.dynamics"
    decision: "mp–mf (Verse) → mf–f (Pre-chorus) → f–ff (Chorus) → ff (Final Chorus); pp ở Outro"
    rationale: "Phù hợp emotional_arc: mở đầu trang trọng, tăng dần, cao trào ở Final Chorus, kết thúc giảm dần"
    alternatives_considered: ["mf–f suốt bài (thiếu nuance)", "p–f–ff–fff (quá đột ngột, thiếu tự nhiên)"]
  - field: "PRODUCTION.spatial_character"
    decision: "Expansive, hall reverb"
    rationale: "Tạo không gian rộng lớn, sử thi, phù hợp với tráng ca hào hùng"
    alternatives_considered: ["Intimate (không khí gần gũi, không phù hợp grand character)"]
  - field: "MELODY.motif"
    decision: "Mô-típ vươn lên quãng 4 (D–G) ở đầu chorus, thể hiện tinh thần vươn tới"
    rationale: "Tạo ấn tượng, dễ nhớ, đặc trưng quãng 4 tạo cảm giác hào hùng, hướng lên"
    alternatives_considered: ["Mô-típ lặp quãng 2 (thiếu hào hùng)", "Mô-típ quãng 5 (có thể quá giống quốc ca)"]
  - field: "MELODY.complexity"
    decision: "moderate"
    rationale: "Cân bằng giữa dễ hát và có chiều sâu, phù hợp với đại chúng"
    alternatives_considered: ["simple (thiếu chiều sâu, dễ nhàm)", "complex (khó hát, mất tính cộng đồng)"]

deviations_or_tradeoffs:
  - "Giảm số nhạc cụ từ dàn nhạc đầy đủ xuống 5 nhạc cụ chính để đảm bảo MusicXML đủ chi tiết, vẫn tạo được không gian hào hùng qua Brass + Strings + Piano + Drums."
  - "Chọn tenor thay vì mixed choir để tránh phức tạp hòa thanh, vẫn đảm bảo tính cộng đồng và dễ hát."

reference_style_handling:
  - "Sử dụng đặc trưng khái quát của ca khúc cách mạng/tráng ca Việt Nam: hòa âm sử thi, giai điệu vươn lên, lời ca đề cao tình yêu quê hương đất nước, không sao chép bất kỳ tác phẩm cụ thể nào."
```

---

## MUSICXML 4.0 FINAL

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC
  "-//Recordare//DTD MusicXML 4.0 Partwise//EN"
  "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
  <work>
    <work-title>Mùa Thu Ánh Sáng</work-title>
  </work>
  <identification>
    <creator type="composer">AI Music Composer</creator>
    <creator type="lyricist">AI Music Composer</creator>
    <rights>Original composition – no copyrighted material used</rights>
    <encoding>
      <software>Grok MusicXML Generator</software>
      <encoding-date>2026-08-27</encoding-date>
    </encoding>
  </identification>
  <part-list>
    <score-part id="P1">
      <part-name>Voice (Tenor)</part-name>
      <score-instrument id="P1-I1"><instrument-name>Voice</instrument-name></score-instrument>
      <midi-instrument id="P1-I1">
        <midi-channel>1</midi-channel><midi-program>53</midi-program><volume>80</volume>
      </midi-instrument>
    </score-part>
    <score-part id="P2">
      <part-name>Piano</part-name>
      <score-instrument id="P2-I1"><instrument-name>Acoustic Grand Piano</instrument-name></score-instrument>
      <midi-instrument id="P2-I1">
        <midi-channel>2</midi-channel><midi-program>1</midi-program><volume>70</volume>
      </midi-instrument>
    </score-part>
    <score-part id="P3">
      <part-name>Strings</part-name>
      <score-instrument id="P3-I1"><instrument-name>Violin</instrument-name></score-instrument>
      <midi-instrument id="P3-I1">
        <midi-channel>3</midi-channel><midi-program>48</midi-program><volume>65</volume>
      </midi-instrument>
    </score-part>
    <score-part id="P4">
      <part-name>Brass</part-name>
      <score-instrument id="P4-I1"><instrument-name>Trumpet</instrument-name></score-instrument>
      <midi-instrument id="P4-I1">
        <midi-channel>4</midi-channel><midi-program>56</midi-program><volume>75</volume>
      </midi-instrument>
    </score-part>
    <score-part id="P5">
      <part-name>Drums</part-name>
      <score-instrument id="P5-I1"><instrument-name>Marching Snare Drum</instrument-name></score-instrument>
      <midi-instrument id="P5-I1">
        <midi-channel>10</midi-channel><midi-program>0</midi-program><volume>60</volume>
      </midi-instrument>
    </score-part>
  </part-list>
  <!-- ===== PART 1: VOICE (Tenor) ===== -->
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>2</divisions>
        <key><fifths>1</fifths><mode>major</mode></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
        <transpose><diatonic>0</diatonic><chromatic>0</chromatic></transpose>
      </attributes>
      <sound tempo="112" dynamics="70"/>
      <direction placement="above">
        <direction-type><words>mp - Trang trọng, giàu hình ảnh</words></direction-type>
      </direction>
      <note>
        <rest><display-step>F</display-step><display-octave>4</display-octave></rest>
        <duration>8</duration>
        <voice>1</voice>
        <type>whole</type>
      </note>
    </measure>
    <measure number="2">
      <note>
        <rest/>
        <duration>8</duration>
        <voice>1</voice>
        <type>whole</type>
      </note>
    </measure>
    <measure number="3">
      <direction placement="above">
        <direction-type><words>Verse 1: Thu về đất nước ánh vàng</words></direction-type>
      </direction>
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Thu</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>về</text>
        </lyric>
      </note>
    </measure>
    <measure number="4">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>đất</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>nước</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>ánh</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>vàng</text>
        </lyric>
      </note>
    </measure>
    <measure number="5">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Gió</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>thu</text>
        </lyric>
      </note>
    </measure>
    <measure number="6">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>hát</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>ca</text>
        </lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>lời</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>quê</text>
        </lyric>
      </note>
    </measure>
    <measure number="7">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Quê</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>hương</text>
        </lyric>
      </note>
    </measure>
    <measure number="8">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>như</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>vầng</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>dương</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>sáng</text>
        </lyric>
      </note>
    </measure>
    <measure number="9">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Rọi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>trong</text>
        </lyric>
      </note>
    </measure>
    <measure number="10">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>lòng</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>người</text>
        </lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Việt</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>Nam</text>
        </lyric>
      </note>
    </measure>
    <measure number="11">
      <direction placement="above">
        <direction-type><words>Pre-chorus: Dâng cao khí thế</words></direction-type>
      </direction>
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Ánh</text>
        </lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>sáng</text>
        </lyric>
      </note>
    </measure>
    <measure number="12">
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>mùa</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>thu</text>
        </lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>soi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>đường</text>
        </lyric>
      </note>
    </measure>
    <measure number="13">
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>phía</text>
        </lyric>
      </note>
      <note>
        <pitch><step>B</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>trước</text>
        </lyric>
      </note>
    </measure>
    <measure number="14">
      <note>
        <pitch><step>D</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Niềm</text>
        </lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>tin</text>
        </lyric>
      </note>
      <note>
        <pitch><step>C</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>thấm</text>
        </lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>sâu</text>
        </lyric>
      </note>
    </measure>
    <measure number="15">
      <direction placement="above">
        <direction-type><words>Chorus - f: Mùa thu ơi!</words></direction-type>
      </direction>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Mùa</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>thu</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>ơi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>!</text>
        </lyric>
      </note>
    </measure>
    <measure number="16">
      <note>
        <pitch><step>D</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Ánh</text>
        </lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>sáng</text>
        </lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>rực</text>
        </lyric>
      </note>
      <note>
        <pitch><step>C</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>rỡ</text>
        </lyric>
      </note>
    </measure>
    <measure number="17">
      <note>
        <pitch><step>B</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>soi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>khắp</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>miền</text>
        </lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>quê</text>
        </lyric>
      </note>
    </measure>
    <measure number="18">
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Bừng</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>lên</text>
        </lyric>
      </note>
      <note>
        <pitch><step>B</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>niềm</text>
        </lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>tin</text>
        </lyric>
      </note>
    </measure>
    <measure number="19">
      <note>
        <pitch><step>D</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>mới</text>
        </lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>!</text>
        </lyric>
      </note>
      <note>
        <pitch><step>C</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Mùa</text>
        </lyric>
      </note>
      <note>
        <pitch><step>B</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>thu</text>
        </lyric>
      </note>
    </measure>
    <measure number="20">
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>ơi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>!</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Khí</text>
        </lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>thế</text>
        </lyric>
      </note>
    </measure>
    <measure number="21">
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>vươn</text>
        </lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>xa</text>
        </lyric>
      </note>
    </measure>
    <measure number="22">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>rọi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>sáng</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>tương</text>
        </lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>0</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>lai</text>
        </lyric>
      </note>
    </measure>
    <measure number="23">
      <direction placement="above">
        <direction-type><words>Verse 2: Bước chân hùng tráng</words></direction-type>
      </direction>
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Bước</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>chân</text>
        </lyric>
      </note>
    </measure>
    <measure number="24">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>người</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>hùng</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>tráng</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>đi</text>
        </lyric>
      </note>
    </measure>
    <measure number="25">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>qua</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>sương</text>
        </lyric>
      </note>
    </measure>
    <measure number="26">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>gió</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>mùa</text>
        </lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>thu</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>hát</text>
        </lyric>
      </note>
    </measure>
    <measure number="27">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>vang</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>lời</text>
        </lyric>
      </note>
    </measure>
    <measure number="28">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>quê</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>hương</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>thân</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>thuộc</text>
        </lyric>
      </note>
    </measure>
    <measure number="29">
      <direction placement="above">
        <direction-type><words>Bridge: Sử thi ngàn đời</words></direction-type>
      </direction>
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Những</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>trang</text>
        </lyric>
      </note>
    </measure>
    <measure number="30">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>sử</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>vàng</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>còn</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>mãi</text>
        </lyric>
      </note>
    </measure>
    <measure number="31">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>trong</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>lòng</text>
        </lyric>
      </note>
    </measure>
    <measure number="32">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>dân</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>tộc</text>
        </lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>mình</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>!</text>
        </lyric>
      </note>
    </measure>
    <measure number="33">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Sức</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>mạnh</text>
        </lyric>
      </note>
    </measure>
    <measure number="34">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>quê</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>hương</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>soi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>sáng</text>
        </lyric>
      </note>
    </measure>
    <measure number="35">
      <direction placement="above">
        <direction-type><words>Final Chorus - ff (modulation lên E major)</words></direction-type>
      </direction>
      <attributes>
        <key><fifths>2</fifths><mode>major</mode></key>
      </attributes>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Mùa</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>thu</text>
        </lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>ơi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>!</text>
        </lyric>
      </note>
    </measure>
    <measure number="36">
      <note>
        <pitch><step>E</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Ánh</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>sáng</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>ngàn</text>
        </lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>đời</text>
        </lyric>
      </note>
    </measure>
    <measure number="37">
      <note>
        <pitch><step>C</step><octave>5</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>rực</text>
        </lyric>
      </note>
      <note>
        <pitch><step>B</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>sáng</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>khắp</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>phương</text>
        </lyric>
      </note>
    </measure>
    <measure number="38">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>trời</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>!</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Mùa</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>thu</text>
        </lyric>
      </note>
    </measure>
    <measure number="39">
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>ơi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>!</text>
        </lyric>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>Niềm</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>tin</text>
        </lyric>
      </note>
    </measure>
    <measure number="40">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>vút</text>
        </lyric>
      </note>
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>4</duration>
        <voice>1</voice>
        <type>half</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>cao</text>
        </lyric>
      </note>
    </measure>
    <measure number="41">
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>soi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>rọi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>quê</text>
        </lyric>
      </note>
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>hương</text>
        </lyric>
      </note>
    </measure>
    <measure number="42">
      <direction placement="above">
        <direction-type><words>Outro - pp</words></direction-type>
      </direction>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>whole</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>mãi</text>
        </lyric>
      </note>
    </measure>
    <measure number="43">
      <note>
        <pitch><step>E</step><octave>4</octave></pitch>
        <duration>6</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>begin</syllabic>
          <text>mãi</text>
        </lyric>
      </note>
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>2</duration>
        <voice>1</voice>
        <type>quarter</type>
        <lyric number="1">
          <syllabic>end</syllabic>
          <text>!</text>
        </lyric>
      </note>
    </measure>
    <measure number="44">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>8</duration>
        <voice>1</voice>
        <type>whole</type>
      </note>
    </measure>
  </part>
  <!-- ===== PART 2: PIANO ===== -->
  <part id="P2">
    <measure number="1">
      <attributes>
        <divisions>2</divisions>
        <key><fifths>1</fifths><mode>major</mode></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <staves>2</staves>
        <clef number="1"><sign>G</sign><line>2</line></clef>
        <clef number="2"><sign>F</sign><line>4</line></clef>
      </attributes>
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>8</duration><voice>1</voice><type>whole</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>8</duration><voice>2</voice><type>whole</type><staff>2</staff></note>
    </measure>
    <measure number="2">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>8</duration><voice>1</voice><type>whole</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>8</duration><voice>2</voice><type>whole</type><staff>2</staff></note>
    </measure>
    <measure number="3">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="4">
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="5">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="6">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="7">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>B</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="8">
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>G</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>B</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="9">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="10">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="11">
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>B</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="12">
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="13">
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>F</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="14">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="15">
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="16">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>B</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="17">
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>G</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>B</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="18">
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="19">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>B</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="20">
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="21">
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="22">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="23">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="24">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="25">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="26">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>B</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="27">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="28">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="29">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="30">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="31">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>B</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="32">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="33">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="34">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="35">
      <attributes>
        <key><fifths>2</fifths><mode>major</mode></key>
      </attributes>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>E</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="36">
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>E</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="37">
      <note><pitch><step>C</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>E</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="38">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>E</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="39">
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>E</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="40">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>E</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="41">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>E</step><octave>3</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
      <note><pitch><step>A</step><octave>2</octave></pitch><duration>4</duration><voice>2</voice><type>half</type><staff>2</staff></note>
    </measure>
    <measure number="42">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>8</duration><voice>1</voice><type>whole</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>8</duration><voice>2</voice><type>whole</type><staff>2</staff></note>
    </measure>
    <measure number="43">
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>8</duration><voice>1</voice><type>whole</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>8</duration><voice>2</voice><type>whole</type><staff>2</staff></note>
    </measure>
    <measure number="44">
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>8</duration><voice>1</voice><type>whole</type><staff>1</staff></note>
      <backup><duration>8</duration></backup>
      <note><pitch><step>D</step><octave>3</octave></pitch><duration>8</duration><voice>2</voice><type>whole</type><staff>2</staff></note>
    </measure>
  </part>
  <!-- ===== PART 3: STRINGS ===== -->
  <part id="P3">
    <measure number="1">
      <attributes>
        <divisions>2</divisions>
        <key><fifths>1</fifths><mode>major</mode></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="2">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="3">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="4">
      <note><pitch><step>A</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="5">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="6">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="7">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="8">
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>A</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="9">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="10">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="11">
      <note><pitch><step>A</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="12">
      <note><pitch><step>A</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="13">
      <note><pitch><step>A</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>B</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="14">
      <note><pitch><step>D</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>D</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="15">
      <note><pitch><step>A</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="16">
      <note><pitch><step>D</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>D</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="17">
      <note><pitch><step>B</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>A</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="18">
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>A</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="19">
      <note><pitch><step>D</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>D</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="20">
      <note><pitch><step>A</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>A</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="21">
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="22">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="23">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="24">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="25">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="26">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="27">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="28">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="29">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="30">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="31">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="32">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="33">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="34">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="35">
      <attributes>
        <key><fifths>2</fifths><mode>major</mode></key>
      </attributes>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="36">
      <note><pitch><step>E</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="37">
      <note><pitch><step>C</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>B</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="38">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="39">
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="40">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="41">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="42">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="43">
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="44">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
  </part>
  <!-- ===== PART 4: BRASS (Trumpet) ===== -->
  <part id="P4">
    <measure number="1">
      <attributes>
        <divisions>2</divisions>
        <key><fifths>1</fifths><mode>major</mode></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <note><rest><display-step>F</display-step><display-octave>4</display-octave></rest><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="2">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="3">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="4">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="5">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="6">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="7">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="8">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="9">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="10">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="11">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="12">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="13">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="14">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="15">
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="16">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="17">
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="18">
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="19">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="20">
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="21">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="22">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="23">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="24">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="25">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="26">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="27">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="28">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="29">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="30">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="31">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="32">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="33">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="34">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="35">
      <attributes>
        <key><fifths>2</fifths><mode>major</mode></key>
      </attributes>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="36">
      <note><pitch><step>E</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="37">
      <note><pitch><step>C</step><octave>6</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>B</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="38">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="39">
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="40">
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="41">
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="42">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="43">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="44">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
  </part>
  <!-- ===== PART 5: DRUMS ===== -->
  <part id="P5">
    <measure number="1">
      <attributes>
        <divisions>2</divisions>
        <key><fifths>0</fifths><mode>major</mode></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>percussion</sign><line>2</line></clef>
      </attributes>
      <note><rest><display-step>F</display-step><display-octave>4</display-octave></rest><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="2">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="3">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="4">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="5">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="6">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="7">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="8">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="9">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="10">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="11">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="12">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="13">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="14">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="15">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="16">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="17">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="18">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="19">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="20">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="21">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="22">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="23">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="24">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="25">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="26">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="27">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="28">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="29">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="30">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="31">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="32">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="33">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="34">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="35">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="36">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="37">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="38">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="39">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="40">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="41">
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>2</duration><voice>1</voice><type>quarter</type></note>
    </measure>
    <measure number="42">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="43">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
    <measure number="44">
      <note><rest/><duration>8</duration><voice>1</voice><type>whole</type></note>
    </measure>
  </part>
</score-partwise>
```