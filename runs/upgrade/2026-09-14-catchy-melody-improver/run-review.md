# Run Review — Improver

## Meta
- compose_run: `runs/compose/2026-09-08-nang-som-tinh-khoi/`
- step_failed: 3
- date: 2026-09-14

## Mong đợi
- Giai điệu phải **catchy / memorable**, có một hook thật sự có thể ngân nga sau khi nghe một lần hoặc vài lần.
- Verse phải có quan hệ motif có chủ đích nhưng không bị clone; Chorus phải tạo một identity mạnh hơn Verse.
- Hook phải có rhythmic identity riêng, melodic contour dễ nhận biết, điểm nhấn rõ, tension/release và singability.
- AI không chỉ tự khai báo `hook_melody_cell`; nó phải tự đóng vai nhiều songwriter/composer và chọn candidate tốt nhất.
- Trước khi sáng tác, AI phải khảo sát một nhóm bài hát catchy làm **reference evidence** ở cấp độ đặc trưng, không sao chép lời/nốt/riff.

## Thực tế
- `03-song.musicxml` bắt đầu bằng chuỗi quarter-note đều đặn và nhiều phrase dùng nhịp/pitch tương đối tuyến tính; ví dụ M1 có G4–G4–C5–C5 và M2 tiếp tục chuỗi quarter-note B4–A4–G4–E4. citeturn196333view0
- M9 bắt đầu Chorus bằng E5–D5–C5–C5, nhưng nhịp vẫn chủ yếu đều và identity của hook chưa đủ khác biệt về rhythm; Final Chorus có một số biến đổi nhưng vẫn dựa mạnh trên mô hình cũ. citeturn414037view0turn414037view2
- `03-composition-notes.md` chỉ ghi rằng piano “rải móc đơn linh hoạt” và đánh dấu gate bằng checkbox; nó không chứa một đánh giá thực chất về catchiness, candidate comparison, listener recall proxy, hay evidence cho hook. citeturn484856view0
- Compose prompt đã yêu cầu “hook ngắn, dễ nhớ” và các knowledge pages đã yêu cầu motif/anti-repetition, nhưng đây vẫn là chỉ dẫn một candidate duy nhất, không có cơ chế tạo nhiều ý nhạc độc lập rồi chọn. citeturn484856view1turn669781view2turn669781view3
- Vì vậy, artifact có thể PASS theo các rule hiện có nhưng vẫn FAIL theo mục tiêu sản phẩm thực tế: **catchy music**.

## Lệch (checklist)
- [ ] lời
- [ ] thanh điệu
- [x] giai điệu
- [ ] hòa âm
- [ ] form / nhịp
- [ ] phối khí
- [ ] MusicXML kỹ thuật
- [ ] trật phong cách
- [x] prompt yếu (Bước 3)

## Nguyên nhân nghi ngờ
1. `hook` đang được hiểu quá hẹp là có một `hook_melody_cell`, thay vì phải chứng minh salience + memorability + rhythmic identity.
2. Anti-pattern chủ yếu bắt exact/skeleton repetition; chưa bắt “low-information melody”: nhiều phrase khác nốt đôi chút nhưng cùng nhịp, contour, cadence và mật độ.
3. Composer không bị buộc phải tạo và so sánh nhiều candidate độc lập. Candidate đầu tiên có xu hướng trở thành bài cuối.
4. Reference style được dùng để định màu, nhưng chưa có **reference-song analysis protocol** để AI học cách các hit/catchy songs tạo hook, groove, repetition, contrast và payoff.
5. Self-rating hiện không đủ đáng tin: notes có thể tự ghi PASS mà người nghe vẫn thấy nhạt.
6. Catchiness chưa được biểu diễn như một quality dimension có evidence trong `music_quality_gate`.

## Lớp cần sửa
- [x] quy trình (`pipeline/`)
- [x] prompt-craft / compose-arrange templates
- [x] kiến thức (`knowledge/`)
- [ ] thẻ phong cách (`knowledge/styles/`)
- [x] catalog
- [ ] curator / improver prompts
