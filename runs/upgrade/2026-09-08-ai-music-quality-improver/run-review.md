# Improver Run Review — Yêu Là Vui quality failures

## Meta
- compose_runs:
  - `runs/compose/2026-09-08-vi-yeu-la-vui-v3/`
  - `runs/compose/2026-09-08-vi-yeu-la-vui-v4/`
  - `runs/compose/2026-09-08-vi-yeu-la-vui-v2/`
- step_failed: 3 | 4 | other
- date: 2026-09-08

## Mong đợi
Bản nhạc phải nghe tự nhiên khi phát lại trên Flat, có lời có ý nghĩa và có tiến triển, giai điệu có bản sắc và biến hóa, piano reduction thực sự tạo nhịp chuyển động thay vì chỉ giữ hợp âm.

## Thực tế
1. Bước 3 ghi `music_quality_gate: PASS`, nhưng gate không chứng minh bằng artifact. v3 khai đủ các score đều `ok` và PASS, trong khi P2 piano thể hiện whole-note block chords trong phần hát.
2. v4 cũng tự khai PASS; final/chorus lặp cùng kiểu cell C5–B4–A4–G4 và các câu quarter-note đồng dạng. Final development được biện minh chủ yếu bằng sustain/register, không tạo ý nhạc mới đủ mạnh.
3. v4 composition notes nói `Piano reduction đơn giản (block + arpeggio nhẹ)`, nhưng XML sau measure 5 ghi liên tục whole-note single-note harmonic blocks cho P2.
4. v2 arrangement notes ghi P2 `semantically unchanged` và cho rằng Step 4 không sửa P1/P2. Điều này đúng với lock progression nhưng sai về mục tiêu texture: piano reduction vẫn có thể cần được viết lại.
5. Lời có hình ảnh nhưng dễ rơi vào chuỗi câu chung chung: nắng, gió, cười, bên nhau, vui, dịu dàng; chưa đủ causality / character / concrete detail để tạo cảm giác “câu chuyện này chỉ thuộc về bài này”.

## Lệch
- [x] lời
- [ ] thanh điệu (không phải lỗi chính trong run này)
- [x] giai điệu
- [x] hòa âm / harmonic rhythm
- [x] form / nhịp ở mức musical pacing
- [x] phối khí / texture handoff
- [ ] MusicXML kỹ thuật là nguyên nhân chính
- [ ] trật phong cách
- [x] prompt / self-evaluation weakness

## Nguyên nhân nghi ngờ
### 1. Quy trình
Quality gate hiện thiên về checklist và self-report, chưa yêu cầu audit trực tiếp từ XML. `MAX_IDENTICAL_PHRASE_SKELETONS` chỉ bắt một số dạng lặp cục bộ; một bài có thể vượt gate bằng cách thay nhẹ rhythm/register nhưng vẫn nghe như một câu được copy nhiều lần.

### 2. Prompt / generation strategy
Bước 3 yêu cầu invent hook + motif + section contrast, nhưng vẫn cho AI hoàn thành bằng một lượt output. Khi không có critic pass độc lập, AI có xu hướng tối ưu “đủ checklist” hơn là “nghe hay”.

### 3. Knowledge
Melody knowledge đã nói “đừng clone”, nhưng thiếu các test mạnh cho phrase diversity, development quality và tránh melodic/rhythmic monotony ở cấp toàn bài.

Lyrics knowledge đã có tứ thơ và prosody, nhưng chưa có gate buộc câu chữ phải tạo thông tin mới, quan hệ nhân quả, chi tiết riêng và tránh synonym paraphrase.

Piano knowledge đã cấm whole-note pad, nhưng Step 3 vẫn có thể tự khai `piano_texture` mà không có kiểm chứng từ XML.

## Lớp cần sửa
- [x] quy trình (`pipeline/`)
- [x] compose prompt / generation contract
- [x] kiến thức (`knowledge/`)
- [ ] thẻ phong cách
- [ ] catalog
- [ ] curator / improver prompts

## Đề xuất nguyên tắc
1. **Artifact evidence over self-report:** notes chỉ là lời giải thích; gate phải suy ra từ MusicXML.
2. **Structural validity != musical validity:** XML PASS không kéo theo music PASS.
3. **Generate → critic → rewrite:** một Step 3 vẫn có thể là một lượt đối với user, nhưng bên trong phải có draft audit và rewrite trước khi chốt.
4. **Repetition is allowed only with function:** hook repetition phải được phân biệt với accidental cloning.
5. **Meaning before polish:** lyric quality phải kiểm tra semantic progression trước rhyme/prosody.
6. **Lock progression, not texture:** Step 4 khóa chord progression nhưng được quyền sửa piano voicing/rhythm.

## Kết luận
Đây là lỗi hệ thống chứ không phải một lỗi riêng của bài “Yêu Là Vui”. Ba run cho thấy cùng một pattern: AI có khả năng sản xuất MusicXML hợp lệ và viết notes rất thuyết phục, nhưng self-evaluation chưa tương quan đủ mạnh với kết quả nghe được.
