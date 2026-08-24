Căn cứ trên các tài liệu hệ thống và cơ sở tri thức đã được phê duyệt, tôi xin gửi báo cáo phản biện và kiểm chứng thực tế (Research & Fact-Checking Report) đối với bản thảo kiến trúc ngôn ngữ **PLAN-01-01**.

---

# BÁO CÁO PHẢN BIỆN & KIỂM CHỨNG TÍNH KHẢ THI (FACT-CHECKING & ARCHITECTURE REVIEW)

**Hồ sơ:** PLAN-01-01 – Ngôn ngữ biểu diễn âm nhạc dạng Text (Song DSL / Music IR)

**Vai trò:** Researcher / Fact Checker trong Hội đồng 5 AI

**Mục tiêu:** Kiểm chứng tính đúng đắn khoa học (ngôn ngữ học, âm nhạc học, kỹ thuật phần mềm), đánh giá tính khả thi và đề xuất các chỉnh sửa cấp thiết cho bản thiết kế trước khi biên dịch sang mã nguồn.

---

## I. TỔNG QUAN ĐÁNH GIÁ (EXECUTIVE SUMMARY)

Bản đề xuất **PLAN-01-01** đã xác định chính xác các điểm nghẽn của hệ thống AI Music hiện tại (Blackbox End-to-End, thiếu kiểm soát thanh điệu tiếng Việt, thiếu tính kế thừa). Việc chọn **Syllable (Âm tiết)** làm đơn vị nguyên tử cơ sở và mô hình **Compiler 5 tầng (Song Compiler)** là hoàn toàn đúng đắn về mặt lý thuyết âm nhạc học và khoa học máy tính.

Tuy nhiên, qua kiểm chứng thực tế với các chuẩn dữ liệu ngành (MIDI 1.0/2.0, MusicXML 4.0, OpenUTAU USTX, G2P Phoneme systems), bản thiết kế hiện tại còn một số **lỗ hổng kỹ thuật nghiêm trọng** và **điểm thiếu sót về mặt chuẩn hóa**. Nếu không sửa đổi ngay ở bản nháp này, Compiler sẽ bị sụp đổ khi triển khai thực tế.

---

## II. KẾT QUẢ CHECK FACT VÀ PHẢN BIỆN CHUYÊN SÂU

### 1. Kiểm chứng Ngôn ngữ học & Thanh điệu (L1 - Linguistic Layer)

* **Thực tế kiểm chứng:** Tiếng Việt có **6 thanh điệu** (Ngang, Huyền, Hỏi, Ngã, Sắc, Nặng). Thanh điệu không chỉ là một con số cố định mà là **đường nét cao độ vật lý theo thời gian (Pitch Contour)**.
* **Điểm yếu trong bản thiết kế:**
1. Trong JSON mẫu, `tone_code` chỉ gán giá trị đơn giản (ví dụ: `1`, `2`). Cách làm này bỏ qua việc thanh **Ngã** và **Hỏi** có hiện tượng gãy âm thanh (glottalization / creaky voice) và đổi hướng pitch mid-way (xuống rồi lên).
2. Mẫu âm vị `g2p_phonemes_cvvc` trong ví dụ JSON (ví dụ `"thương"` -> `["th", "ɯə", "ŋ"]`) chưa tuân thủ chuẩn ký hiệu quốc tế **IPA (International Phonetic Alphabet)** hay chuẩn **Arpabet/X-SAMPA** dùng trong Vocal Synthesizer (OpenUTAU / DiffSinger).


* **Kết luận / Đề xuất:**
* Cần chuẩn hóa bảng mã âm vị theo **X-SAMPA** hoặc **Sampa-VN** để gửi trực tiếp cho Engine Vocal.
* Phải thêm tham số `pitch_contour_profile` đại diện cho hướng biến thiên vật lý của thanh điệu (ví dụ: `Hỏi` = `[High-Mid -> Low -> Mid]`).



---

### 2. Kiểm chứng Âm nhạc học & Biểu diễn Cao độ (L2 - Composition Layer)

* **Thực tế kiểm chứng:**
* Định dạng nốt nhạc dạng chuỗi văn bản như `"C4"`, `"E4"` dễ đọc cho con người nhưng làm tăng chi phí tính toán toán học (Math operations) trong Rule Engine khi tính khoảng cách quãng (Interval).
* Trong âm nhạc dân gian Việt Nam (Quan họ, Cải lương, Hát xẩm) hoặc các thể loại R&B, ca sĩ thường hát các nốt **Vi mô (Microtonality / Quarter-tones)** hoặc luyến qua các thang âm không nằm trong hệ thống 12 nốt đều (12-TET).


* **Điểm yếu trong bản thiết kế:**
* Trường `pitch_array` hiện dùng mảng chuỗi nốt `"E4", "F#4"` chưa hỗ trợ độ lệch Cents (Micro-tuning) cho từng nốt.
* Việc biểu diễn nhịp bằng phân số dạng chuỗi `"1/8"`, `"3/16"` khiến parser dễ gặp lỗi vần phân số vô hạn. Trong chuẩn MIDI/DAW, thời lượng luôn được quy đổi ra **PPQ (Pulses Per Quarter Note)** hoặc **Ticks** (ví dụ: 480 ticks / nốt đen).


* **Kết luận / Đề xuất:**
* Song song với `pitch_name` (`"E4"`), bắt buộc phải lưu `midi_note_number` (`64`) và `pitch_offset_cents` (`-50` đến `+50`).
* Định dạng thời lượng trong Engine nội bộ nên chuẩn hóa về **Ticks** (dựa trên cơ sở 480 hoặc 960 PPQ) thay vì chuỗi phân số.



---

### 3. Kiểm chứng Kỹ thuật Hát & Performance (L3 - Performance Layer)

* **Thực tế kiểm chứng:**
* Kỹ thuật hát không chỉ gồm danh sách các cờ (flags) rời rạc như `slide_up`, `vibrato`. Trong thực tế thu âm và vocal synth, các kỹ thuật có tính **chồng lấp (Overlapping)** và **phụ thuộc thời gian**.
* Dữ liệu Pitch Bend 14-bit trong ví dụ JSON: `[ [0,8192], [70,8192], [140,8550] ]` quá cồng kềnh, gây bùng nổ dung lượng dữ liệu (data bloat) khi lưu trữ hàng ngàn âm tiết dưới dạng Text.


* **Kết luận / Đề xuất:**
* Cần nén đường cong Pitch Bend bằng thuật toán nội suy Bezier hoặc đường cong Spline đại diện (ví dụ: `start_val`, `end_val`, `curve_type`) thay vì lưu mảng điểm thô (raw points array).
* Chuẩn hóa từ vựng Kỹ thuật hát (Vocal Technique Vocabulary) thành tập Enum cố định (như `PHONATION_FALSETTO`, `ATTACK_GLOTTAL`, `DECAY_FRY`).



---

### 4. Kiểm chứng Khả năng tương thích và Render Adapter (L4 & Phase 5)

* **Thực tế kiểm chứng:**
* Bảng so sánh giữa MusicXML, MIDI và Song DSL trong đề xuất A.3 & B.4 là **hoàn toàn chính xác**. MusicXML và MIDI là chuẩn trao đổi tín hiệu/ký âm, hoàn toàn thiếu ngữ nghĩa về quy luật thanh điệu và kiến trúc bài hát.
* Tuy nhiên, khi compile sang các AI Music Provider như Suno/Udio, các dịch vụ này hiện tại **chỉ nhận Plain Text Prompt + Lyric Tag** (ví dụ: `[Verse]`, `[Chorus]`), không nhận JSON/MIDI phức tạp.


* **Điểm yếu trong bản thiết kế:**
* Adapter dành cho các Commercial Cloud AI (Suno/Udio) sẽ bị suy hao thông tin (lossy translation) rất lớn, trong khi Adapter dành cho Open-source / Local Synth (OpenUTAU, DiffSinger, ACE-Step, DAW MIDI) mới giữ được 100% độ chính xác của Performance IR.


* **Kết luận / Đề xuất:**
* Bổ sung định nghĩa mức độ tương thích (**Compatibility Grade**) cho từng Adapter:
* **Tier 1 (Lossless):** OpenUTAU (`.ustx`), DAW Project / MIDI + Automation, MusicXML.
* **Tier 2 (Structured API):** ACE-Step, ElevenLabs Music API (nếu hỗ trợ JSON).
* **Tier 3 (Lossy - Prompt-based):** Suno, Udio (Chỉ dịch DSL thành Lyrics Tags + Style Prompt).





---

## III. ĐỀ XUẤT CHỈNH SỬA BẢN HOÀN THIỆN (FINAL AMENDMENTS)

Để bản PLAN-01-01 sẵn sàng đưa vào giai đoạn phát triển Parser và Rule Engine, Hội đồng đề xuất cập nhật 3 nội dung trọng tâm sau:

### 1. Chuẩn hóa Schema JSON của Syllable (Mẫu chuẩn)

Sử dụng mã hóa định lượng hóa (Quantized Values) giúp tăng tốc độ xử lý của Compiler:

```json
{
  "syl_id": "syl_v1_l0_p0_s2",
  "text": "thương",
  "L1_linguistic": {
    "tone": { "id": "ngang", "code": 1, "contour_type": "FLAT_HIGH" },
    "phonemes": { "ipa": "tʰɨəŋ", "xsampa": "t_h M@ N" },
    "rhyme": { "nucleus": "ɨə", "coda": "ŋ", "group_id": "UONG" },
    "poetic_weight": "PING" // BẰNG (B) hoặc TRẮC (T) cho Rule Engine Lục Bát
  },
  "L2_composition": {
    "pitch_events": [
      { "note": "E4", "midi": 64, "cents_offset": 0, "duration_ticks": 240 },
      { "note": "F#4", "midi": 66, "cents_offset": 0, "duration_ticks": 720 }
    ],
    "total_ticks": 960,
    "start_tick": 1920,
    "beat_strength": 1.0,
    "chord_context": "F_maj"
  },
  "L3_performance": {
    "vocal_dynamics": { "velocity": 96, "expression_curve": "CRESCENDO_LIGHT" },
    "techniques": ["SLIDE_UP_INTERNAL"],
    "vibrato": { "rate_hz": 5.5, "depth_cents": 35, "delay_ticks": 240 }
  },
  "L4_arrangement": {
    "track_id": "lead_vocal_soprano",
    "stem_group": "vocal_main"
  }
}

```

### 2. Bổ sung Quy trình Xử lý Lỗi Compiler (Error Handling)

Khi Rule Engine phát hiện vi phạm (ví dụ: Cưỡng âm hoặc Sai vần Lục bát), Compiler sẽ trả về thông báo lỗi chuẩn hóa để AI Director hoặc Con người điều chỉnh:

```json
{
  "status": "COMPILE_ERROR",
  "errors": [
    {
      "code": "ERR_TONE_MELODY_CONTRADICTION",
      "severity": "HARD_RULE_VIOLATION",
      "location": { "section": "verse_1", "line": 2, "syllable_index": 3 },
      "message": "Syllable 'má' (Thanh Sắc - Pitch Contour UP) bị gán nốt C4 đi xuống từ A4 (Pitch Direction DOWN). Cưỡng âm nghiêm trọng.",
      "suggested_fix": "Nâng pitch syllable 3 lên >= D5 hoặc đổi từ mang thanh Huyền/Nặng."
    }
  ]
}

```

---

## IV. NGHỊ QUYẾT CỦA FACT CHECKER

1. **Thông qua:** Khung kiến trúc tổng thể **PLAN-01-01** đạt chuẩn về mặt tư duy hệ thống và xử lý triệt để bài toán cốt lõi.
2. **Yêu cầu cập nhật:** Tích hợp toàn bộ các điểm hiệu chỉnh về **Ticks/PPQ, X-SAMPA Phoneme, Cents Offset, và Phân loại Tier Adapter** vào bản dự thảo chính thức trước khi tiến hành viết Parser trong Module 02.