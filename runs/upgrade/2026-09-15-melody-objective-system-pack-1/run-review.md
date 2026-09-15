# Run Review — Melody Objective System

## Meta
- source_compose_runs:
  - `runs/compose/2026-09-08-vi-yeu-la-vui-v2/`
  - `runs/compose/2026-09-08-vi-yeu-la-vui-v3/`
  - `runs/compose/2026-09-08-vi-yeu-la-vui-v4/`
- primary_failure: melody quality is described subjectively, while the existing gate does not require a reproducible objective audit of the exported MusicXML.
- package: 1 only
- date: 2026-09-15

## Mong đợi
- Giai điệu phải có hook dễ nhớ nhưng không bị cơ giới.
- Phrase trong cùng section không được chỉ là một skeleton lặp lại với thay đổi nhỏ.
- Chorus/Bridge/Final Chorus phải có khác biệt có chủ đích.
- Final Chorus phải phát triển material thay vì chỉ nâng register.
- `music_quality_gate` phải dựa trên bằng chứng từ artifact, không chỉ mô tả kiểu “nghe hay / nghe catchy”.

## Thực tế
- Các run gần đây đã bổ sung anti-patterns cho exact/near repetition, nhưng audit vẫn chủ yếu là model tự mô tả trong notes.
- `music_quality_gate` hiện có threshold identifiers, nhưng chưa định nghĩa một representation + metric procedure đủ rõ để hai lần audit độc lập cho cùng MusicXML cho ra cùng kết luận.
- Vì thiếu representation chuẩn, các nhận xét như “phrase gần giống”, “hook rõ”, “rhythm variety tốt” khó tái kiểm tra.
- Các run cho thấy vấn đề nghe được dù MusicXML structural validation PASS: repetition, low variation, weak section contrast và development yếu.

## Lệch
- [x] giai điệu
- [x] prompt / process enforcement
- [x] validation semantics
- [ ] lời — không thuộc phạm vi Package 1
- [ ] thanh điệu — không phải mục tiêu của Package 1
- [ ] hòa âm / piano — không thuộc phạm vi Package 1
- [ ] phối khí — không thuộc phạm vi Package 1

## Chẩn đoán
### 1. Vấn đề chính
Quality gate có từ khóa đúng nhưng thiếu một **objective audit contract**. Cùng một MusicXML có thể được tự chấm khác nhau vì không quy định rõ:
- phrase boundary được lấy thế nào;
- rhythm/pitch được canonicalize ra sao;
- similarity đo trên đại diện nào;
- section contrast được chứng minh bằng metric nào;
- “development” được chứng minh bằng operation nào;
- threshold nào là hard fail, threshold nào chỉ là warning.

### 2. Hậu quả
Model có thể đọc một melody hợp lệ, thấy có nhiều section, rồi khai `PASS` dù phrase families quá giống nhau. Structural correctness vì thế đang được dùng như proxy cho musical quality.

### 3. Cần sửa trong Package 1
- Tạo knowledge page mô tả objective melody metrics và canonical representation.
- Nâng `music_quality_gate` để yêu cầu `objective_melody_audit` có số liệu/evidence, không chỉ adjectives.
- Sửa Step 3 để audit được thực hiện sau khi có MusicXML, trước khi status `done`.
- Thêm catalog entry cho knowledge mới.

## Ranh giới Package 1
Không thay đổi chiến lược sáng tác nhiều candidate. Không thêm semantic lyric gate. Không đổi piano-reduction rules. Không đổi Step 4. Các vấn đề đó có thể thuộc package khác.
