# run-review — 2026-09-14-nang-som-tinh-khoi-catchy

## Meta

- compose_run: `runs/compose/2026-09-08-nang-som-tinh-khoi/`
- step_failed: 3
- date: 2026-09-14

## Mong đợi

- Giai điệu Verse/Pre-Chorus/Chorus/Bridge mỗi phần có ý nhạc riêng, nghe được.
- Chorus có hook (pitch+rhythm cell) đáng nhớ, Chorus Final có phát triển thật (không chỉ copy).
- `music_quality_gate` trong `03-composition-notes.md` được chấm đầy đủ theo
  [musical-quality-gate.md](../../../docs/m-guide/knowledge/melody/musical-quality-gate.md) trước khi coi Bước 3 xong.

## Thực tế

Đọc trực tiếp `03-song.musicxml` (part P1 — Lead Vocal) và so measure-by-measure:

- **Verse 1 (M1-M4) và Verse 2 (M17-M20) gần như sao chép skeleton 1:1**, chỉ đổi lời:
  - M1 `G4 G4 C5 C5` ≡ M17 `G4 G4 C5 C5`
  - M2 `B4 A4 G4 E4` ≡ M18 `B4 A4 G4 E4`
  - M3 `A4 A4 C5 C5` ≡ M19 `A4 A4 C5 C5`
  - M4 `G4 E4 D4 C4` ≡ M20 `G4 E4 D4 C4`
  → đúng anti-pattern #1 (skeleton lặp Verse, "chỉ thay lời") trong
  [anti-patterns.md](../../../docs/m-guide/knowledge/melody/anti-patterns.md).
- **Chorus Final (M25-M28) là bản sao y nguyên pitch-sequence của Chorus 1 (M9-M12)**:
  `E5 D5 C5 C5 / G4 A4 C5 D5 C5 / E5 D5 C5 A4 / G4 A4 C5 D5 C5` lặp lại **hoàn toàn giống** ở cả hai chỗ,
  không đổi register, không đổi rhythm cell, không kỹ thuật phát triển nào (sequence / fragmentation / cadence
  mới / augmentation…) → vi phạm thẳng anti-pattern #2 (Chorus copy) và ngưỡng cứng
  `REQUIRE_FINAL_CHORUS_DEVELOPMENT` trong quality-gate.
- Trong nội bộ Chorus 1 (M9-M16), 2 cặp câu 4-ô-nhịp cũng dùng cùng một pitch-rhythm cell
  (`M9-10 ≈ M13-14`, `M11-12 ≈ M15-16`) mà không có biến thể nào ghi nhận — không hẳn sai (điệp khúc được phép
  lặp có chủ đích) nhưng **không có note nào xác nhận đây là A→A' có chủ đích** như anti-pattern hints yêu cầu.
- `03-composition-notes.md` **không** có các khối bắt buộc theo
  [composition-notes.template.md](../../../docs/m-guide/artifacts/composition-notes.template.md) và
  [step-03-compose.md](../../../docs/m-guide/pipeline/step-03-compose.md) bước 5: thiếu `motifs_declared`,
  thiếu `hook_melody_cell`, thiếu bảng điểm `music_quality_gate.scores` + `thresholds`, không có dòng
  `result: PASS|FAIL` tường minh. Mục "3. Music Quality Gate" trong notes chỉ có 3 gạch đầu dòng mô tả chung
  chung, không phải bảng điểm theo schema.
- `STATUS.md` của compose run vẫn ghi step 3 = **pending** dù `03-song.musicxml` và `03-composition-notes.md`
  đã tồn tại đầy đủ 32 ô nhịp — tức là bước 3 chưa từng được đóng dấu "done" qua gate, nhưng file đã được
  đưa cho user nghe. Đây là dấu hiệu quy trình bị bỏ qua bước tự chấm gate, không phải chỉ là lỗi khiếu nại
  chủ quan của user.

**Kết luận:** phàn nàn "giai điệu rời rạc, lặp lại nhàm chán không catchy" của user có bằng chứng khách quan
trong chính MusicXML — nếu gate đã được chạy đúng theo quality-gate.md, run này lẽ ra phải nhận `FAIL` và bị
viết lại trước khi giao cho user.

## Lệch (checklist)

- [x] giai điệu
- [ ] thanh điệu
- [ ] hòa âm
- [ ] form / nhịp
- [ ] phối khí (chưa tới Bước 4)
- [ ] MusicXML kỹ thuật
- [ ] trật phong cách
- [x] prompt yếu (Bước 1–2) — không phải sai DOC_REFS, mà Bước 3 thiếu cơ chế "khoá" bắt AI thật sự điền +
  tự chấm gate trước khi coi xong, nên bước tự-kiểm bị bỏ qua trong thực thi.

## Nguyên nhân nghi ngờ

1. **Không có kỹ thuật cụ thể về "catchy"**: kho có `melody-invention.md` / `anti-patterns.md` /
   `musical-quality-gate.md` nói *cấm* lặp máy móc, nhưng không có trang mô tả **cơ chế khiến một giai điệu
   dễ nhớ / catchy** (hook economy, repetition-with-variation, rhythmic hook, tầm cữ dễ hát…) để AI có tiêu chí
   *tích cực* khi invent, ngoài danh sách điều cấm. User đề nghị đúng chỗ hổng này: cần AI "tham khảo" —
   tức khái quát hoá từ hiểu biết chung về sáng tác hit-song — trước khi viết, không chỉ tránh anti-pattern.
2. **Gate không được enforce đủ mạnh trong thực thi**: `step-03-compose.md` mô tả đúng quy trình (bước 5-6),
   nhưng không có câu chặn kiểu "nếu notes thiếu `motifs_declared`/`hook_melody_cell`/bảng điểm → tự động FAIL,
   không được coi Bước 3 xong" — nên AI thực thi (không phải doc) đã bỏ qua và xuất notes rút gọn.
3. **anti-patterns.md rule #2 (Chorus copy)** đúng nhưng câu chữ "gần như cùng pitch sequence" hơi định tính —
   nên có ngưỡng cụ thể hơn (vd. % note trùng theo pitch+rhythm) để AI tự chấm rõ ràng thay vì mơ hồ.

## Lớp cần sửa

- [x] quy trình (`pipeline/`) — `step-03-compose.md`: thêm bước catchiness self-check + câu chặn cứng khi
  thiếu field bắt buộc trong notes.
- [ ] prompt-craft / compose-arrange templates
- [x] kiến thức (`knowledge/`) — trang mới `knowledge/melody/catchiness-and-hook-craft.md`; siết
  `anti-patterns.md` (ngưỡng cụ thể hơn cho rule Chorus copy) và `musical-quality-gate.md`
  (`REQUIRE_CATCHINESS_SELFCHECK`).
- [ ] thẻ phong cách (`knowledge/styles/`)
- [x] catalog — thêm entry trang mới.
- [ ] curator / improver prompts
