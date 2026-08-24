**Ý tưởng của bạn rất đúng hướng và có cơ sở khoa học vững chắc.** Tiếng Việt (và các ngôn ngữ thanh điệu nói chung) không chỉ có “lời” mà còn có *âm điệu sẵn* trong từng âm tiết. Nếu xây được bộ quy tắc + một ngôn ngữ văn bản thuần túy mã hóa được vần điệu – thanh điệu – nốt nhạc – kỹ thuật hát – hòa âm, thì bất kỳ LLM nào cũng có thể sinh ra “bản nhạc + lời” có tính khả thi cao, dễ render sang MIDI/audio/sheet.

Dưới đây là khung quy tắc và đề xuất ngôn ngữ văn bản (DSL) có thể dùng ngay.

### 1. Quy tắc ngôn ngữ (tiếng Việt) – vần điệu & thanh điệu

**Thanh điệu tiếng Việt (6 thanh chuẩn Bắc):**
- Ngang (không dấu) – mức trung
- Huyền (`) – thấp/xuống nhẹ
- Hỏi (ʔ) – thấp-lên hoặc thấp gãy
- Ngã (~) – cao gãy / broken rising
- Sắc (´) – cao/lên
- Nặng (.) – thấp ngắn / checked

**Quy tắc thơ truyền thống hữu ích cho lời bài hát:**
- **Lục bát**: 6–8, vần bằng ở cuối câu 6 và chữ 6 của câu 8, luật bằng-trắc xen kẽ (vị trí 2-4-6 thường B-T-B).
- **Song thất lục bát**: 7-7-6-8 với luật thanh và vần liên kết phức tạp hơn.
- Luật bằng/trắc: bằng = ngang + huyền; trắc = hỏi + ngã + sắc + nặng.
- Nhịp ngắt: lục thường 2/4 hoặc 3/3; bát 4/4 hoặc 2/2/2/2; thất 3/4.

**Quy tắc cho lời bài hát hiện đại:**
- Ưu tiên vần cuối câu hoặc vần lưng ở vị trí nhấn (thường beat mạnh).
- Giữ mật độ thanh điệu không quá “dồn” (tránh chuỗi nhiều thanh gãy liên tiếp nếu muốn dễ hát).
- Cho phép tự do hơn thơ cổ, nhưng vẫn giữ “hướng chuyển thanh” mượt.

### 2. Quy tắc phổ nhạc dựa trên âm điệu (tone-melody correspondence)

Nghiên cứu thực nghiệm (Kirby & Ladd 2016 trên 20 bài tân nhạc Việt) cho thấy:
- Không bắt buộc mỗi thanh phải khớp contour nốt 1-1.
- Quan trọng nhất là **hướng chuyển động giữa hai âm tiết liên tiếp**:
  - **Similar motion** (cùng hướng): ưu tiên cao nhất (~77%).
  - **Oblique motion** (một bên ngang, một bên lên/xuống): chấp nhận được, nhất là khi có thanh ngang.
  - **Contrary motion** (ngược hướng): hạn chế mạnh (gần như tránh).

Phân nhóm thanh đơn giản để kiểm tra hướng (một mô hình phổ biến):
- Cao / Rising-ish: sắc, ngã
- Trung: ngang
- Thấp / Falling-ish: huyền, hỏi, nặng

Quy tắc thực dụng khi phổ nhạc:
1. Chuyển thanh lên → ưu tiên nốt đi lên (hoặc ngang).
2. Chuyển thanh xuống → ưu tiên nốt đi xuống (hoặc ngang).
3. Thanh ngang linh hoạt hơn.
4. Melisma (một chữ nhiều nốt) thường dùng cho thanh có contour mạnh hoặc chữ quan trọng cảm xúc.
5. Tránh nhảy quãng quá lớn (thường ≤ quãng 5–6 trong giai điệu Việt) trừ điểm nhấn.
6. Ưu tiên thang ngũ cung (pentatonic) hoặc các mode dân gian khi muốn “Việt tính”; vẫn có thể dùng trưởng/thứ phương Tây.

### 3. Quy tắc hòa âm & nhạc cụ (mức khái quát)

- **Hòa âm cơ bản**: ưu tiên chuyển động parallel/similar với giai điệu chính (đặc biệt khi hát nhiều bè), tránh contrary motion mạnh giữa bè chính và lời.
- **Nhạc cụ**:
  - Dây (guitar, đàn tranh, violin…): dễ làm luyến, glissando, nhấn nhá.
  - Gió (sáo, flute): tốt cho phrase dài, hơi thở.
  - Gõ / nhịp: hỗ trợ nhịp lục bát hoặc syncopation hiện đại.
- **Thể loại**:
  - Ballad / trữ tình: nhịp chậm–vừa, nhiều luyến, hòa âm đơn giản (I–IV–V hoặc modal).
  - Pop/ballad hiện đại: cho phép hòa âm Western hơn nhưng vẫn tôn trọng hướng thanh.
  - Dân gian / bolero Việt: pentatonic + luyến láy nhiều.

### 4. Đề xuất ngôn ngữ văn bản thuần túy (DSL) – “SongText” / “VietSongScript”

Mục tiêu: một chuỗi text thuần túy mà LLM sinh ra, máy parse được thành:
- Lời + thanh
- Nốt + trường độ + rest
- Kỹ thuật hát (luyến, láy, nhấn, rung…)
- Chỉ dẫn hòa âm / nhạc cụ / cấu trúc

**Ví dụ cấu trúc đề xuất (dễ đọc, dễ mở rộng):**

```text
@meta
title: Mưa Chiều
lang: vi
key: C minor
bpm: 72
time: 4/4
genre: ballad-viet
scale: pentatonic-minor | natural-minor
structure: Verse Chorus Verse Chorus Bridge Chorus

@section Verse1
# format mỗi dòng: [lời|thanh] note duration [tech] | ...
# thanh: ngang/huyen/hoi/nga/sac/nang  (hoặc N/H/O/G/S/A)
# note: C4, D#4, rest...
# duration: 4=quarter, 8=eighth, 2=half...
# tech: luyen=slide, lay=ornament, nhan=accent, rung=vibrato, breath...

[Mưa|N] E4 4  | [chiều|H] D4 8 luyen | [rơi|S] C4 4 nhan | [nhẹ|N] rest 8
[trên|N] G3 4 | [phố|S] A3 8 | [cũ|H] G3 4 lay | [vắng|N] F3 2

@harmony
chords: Cm | Fm | G7 | Cm
voicing: close | instruments: piano, soft-strings, acoustic-guitar

@vocal
style: soft, slightly breathy, northern-tone preference
techniques_default: gentle-luyen on falling tones
```

**Phiên bản tuple gọn hơn (gần với SongComposer):**
```text
<bop> bpm=72 key=Cm
line1: (Mưa, N, E4, 4) | (chiều, H, D4, 8, luyen) | (rơi, S, C4, 4, nhan) | (nhẹ, N, rest, 8)
line2: (trên, N, G3, 4) | (phố, S, A3, 8) | (cũ, H, G3, 4, lay) | (vắng, N, F3, 2)
<eop>
```

Ưu điểm của dạng này:
- LLM sinh rất tốt (giống cách SongComposer dùng tuple lyric + pitch + duration).
- Parser dễ viết (regex hoặc simple grammar).
- Có thể thêm layer: `@drum`, `@bass`, `@dynamics`, `@expression`.
- Mở rộng đa ngôn ngữ: thêm trường `tone` hoặc `stress` cho tiếng không thanh điệu.

### 5. Cách triển khai thực tế với AI hiện nay

1. **Viết bộ quy tắc chi tiết** (document + ví dụ tốt/xấu) → dùng làm system prompt hoặc few-shot.
2. **Sinh lời trước** theo luật vần + thanh (LLM + kiểm tra rule-based).
3. **Phổ nhạc** bằng cách bắt LLM sinh theo DSL trên, đồng thời kiểm tra similar/oblique/contrary motion bằng code.
4. **Render**:
   - Symbolic → MIDI (pretty_midi, music21).
   - Audio: ACE-Step / DiffRhythm / MiniMax / ElevenLabs Music với prompt + lyrics đã căn chỉnh.
5. **Fine-tune hoặc RAG**: thu thập corpus bài hát Việt đã gắn thanh + nốt → huấn luyện hoặc retrieval để tăng độ “tự nhiên”.

### 6. Hướng phát triển tiếp theo

- Xây ontology nhỏ: thanh → nhóm hướng, kỹ thuật hát → ký hiệu, thể loại → constraint set.
- Validator: hàm Python kiểm tra % similar motion, luật vần, mật độ thanh gãy…
- Dataset: annotate vài chục–vài trăm bài Việt (lời + thanh + nốt) theo format trên.
- Kết hợp với open-source hiện có (SongComposer-style tuple, ACE-Step cho audio).

Bạn muốn mình đi sâu hơn phần nào trước?
- Viết bộ quy tắc đầy đủ hơn (có bảng chuyển thanh → ưu tiên nốt).
- Thiết kế chi tiết syntax DSL + parser mẫu.
- Ví dụ hoàn chỉnh một đoạn Verse–Chorus bằng DSL.
- Hay prompt engineering để LLM hiện tại sinh theo quy tắc này ngay?

Cứ nói rõ ưu tiên, mình sẽ triển khai cụ thể tiếp.

