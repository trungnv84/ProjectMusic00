# Run-review — 2026-09-08-nang-som-tinh-khoi (Improver)

## Meta

- compose_run: `runs/compose/2026-09-08-nang-som-tinh-khoi`
- step_failed: 3 (compose quality — melody)
- date: 2026-09-14

## Mong đợi

- Giai điệu **catchy**: hook ngắn dễ ngân nga sau 1–2 lần nghe, motif rõ, repetition-with-variation có chủ đích, contour rõ (arch / peak), rhythmic identity, section contrast nghe được.
- AI hành xử như nhạc sĩ thật: invent ý nhạc trước, không chỉ “điền” lời vào skeleton lặp; tham khảo đặc trưng catchy (không copy bản quyền).
- Composition notes đầy đủ: `motifs_declared`, `hook_melody_cell`, bảng quality gate chi tiết (không chỉ checklist tick).
- MusicXML lead sheet nghe được, không rời rạc / nhàn chán.

## Thực tế

- User báo: giai điệu **rời rạc, lập đi lập lại nhàn chán, không catchy**.
- `03-composition-notes.md` hiện tại rất mỏng:
  - Chỉ liệt kê lời theo section + measure mapping.
  - Prosody audit sơ sài (“giữ vững dấu câu”, “nốt cao E5”).
  - Quality gate chỉ tick 3 mục (full song, piano texture, MusicXML) — **thiếu** `hook_melody_cell`, `motifs_declared`, bảng điểm melodic_repetition / hook_distinctiveness / section_contrast / rhythmic_variety.
- STATUS.md còn ghi step 3 pending (không đồng bộ với artifact 03-*).
- Knowledge hiện có (invention, anti-patterns, quality-gate, contour, motif-development) đã cấm skeleton lặp và yêu cầu invent, nhưng **chưa đủ mạnh / chưa đủ cụ thể** về tiêu chí “catchy” (short cell + clear contour + rhythmic identity + limited pitch set + early hook + controlled repetition). AI dễ rơi vào lặp máy móc hoặc phrase rời rạc khi thiếu checklist catchiness.

## Lệch (checklist)

- [x] giai điệu — rời rạc, lặp nhàm, thiếu hook memorable
- [ ] lời
- [ ] thanh điệu
- [ ] hòa âm
- [ ] form / nhịp
- [ ] phối khí
- [ ] MusicXML kỹ thuật
- [ ] trật phong cách
- [x] prompt / knowledge yếu (thiếu lớp “catchiness” rõ ràng + gate bắt buộc)

## Nguyên nhân nghi ngờ

1. **Knowledge gap**: Không có trang / section đủ mạnh về “đặc trưng giai điệu catchy” (từ nghiên cứu earworm + songwriting practice). Invention + anti-patterns tập trung “đừng lặp skeleton” nhưng chưa dạy “lặp cái gì + bao nhiêu + kết hợp contour/rhythm thế nào để nhớ”.
2. **Quality gate chưa siết catchiness**: `REQUIRE_CHORUS_HOOK` có nhưng không bắt buộc mô tả cell ngắn (2–5 nốt), contour type, rhythmic distinctiveness; bảng điểm có thể tick “ok” khi vẫn nhàm.
3. **Composition notes contract yếu**: Template / gate không ép ghi `hook_melody_cell` (pitch+rhythm cell) + evidence catchiness → AI bỏ qua.
4. **Compose prompt / step-03**: DOC_REFS đã có melody pages nhưng thiếu trang/section catchy → AI không “tham khảo” đặc trưng catchy một cách có hệ thống.

## Lớp cần sửa

- [x] kiến thức (`knowledge/melody/`) — thêm trang catchiness + củng cố invention / quality-gate / anti-patterns
- [x] prompt-craft / compose template & step-03 — siết MUST + notes contract
- [x] catalog (nếu thêm page)
- [ ] quy trình (nhẹ — chỉ bổ sung playbook)
- [ ] thẻ phong cách
- [ ] curator / improver prompts