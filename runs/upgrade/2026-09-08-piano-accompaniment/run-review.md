# Run Review — Piano accompaniment (Improver)

- compose_run: `runs/compose/2026-09-08-vi-yeu-la-vui-v2`
- also: `runs/compose/2026-09-08-vi-yeu-la-vui` (superseded FAIL fixture)
- step_failed: 3 + 4 (hợp đồng / expectation)
- date: 2026-09-08

## Mong đợi

- Piano (hoặc lớp hòa âm pitched) nghe được như accompaniment: có pulse / figuration theo section.
- Vẫn lead sheet ở Bước 3 (không full production).

## Thực tế

- P2 = whole-note block chords hầu hết bài (notes ghi “block-chord reduction”).
- Bước 4 khóa nguyên P2 → texture không bao giờ được viết lại.
- Drums sau Flat repair = rests → càng lộ pad piano.

## Lệch (checklist)

- [x] hòa âm (piano reduction quá thô)
- [ ] thanh điệu
- [ ] giai điệu
- [ ] lời
- [ ] form / nhịp
- [x] phối khí (P2 locked như progression)
- [ ] MusicXML kỹ thuật (XML OK; vấn đề âm nhạc)
- [ ] trật phong cách
- [x] prompt yếu / hợp đồng Bước 3–4 mơ hồ về Piano

## Nguyên nhân nghi ngờ

1. “harmony/piano reduction” không định lượng pulse tối thiểu.
2. Bước 4 khóa “harmony” = khóa luôn piano part.
3. Thiếu trang knowledge lead-sheet piano vs arranged piano.

## Lớp cần sửa

- [x] quy trình (`pipeline/`)
- [x] prompt-craft / compose-arrange templates
- [x] kiến thức (`knowledge/harmony/piano-reduction.md`)
- [x] thẻ phong cách (`vn-vpop-uptempo` hint)
- [x] catalog
- [ ] curator / improver prompts

## Review đề xuất AI ngoài (đã lọc)

| Mục đề xuất | Quyết định | Lý do |
|-------------|------------|--------|
| Patch `prompts/step-03-piano-reduction.md` | **Reject path** | File không tồn tại; logic → `pipeline/step-03` + knowledge mới |
| Patch `prompts/step-04-arrangement.md` | **Reject path** | Logic → `pipeline/step-04` + `arrange-prompt.template` |
| Siết piano reduction Bước 3 (A) | **Accept (làm mềm)** | Half-note tối thiểu / broken-comp; không bắt “mỗi beat một nốt” |
| Tách lock Bước 4 (B) | **Accept** | LOCK progression; ALLOW piano texture |
| Anti-pattern knowledge (C) | **Accept** | Trang `KNOW.HARMONY.PIANO-REDUCTION` — **không** nhét vào `meta/standards.md` |
| Arrange: bù pitched layer nếu giữ pad (D) | **Accept** | Trong step-04 + arrange template |
| Flag catalog `requires_rhythmic_piano` (E) | **Defer** | Style hint đủ cho VPOP-UPTEMPO; tránh flag thừa |
| `meta/standards.md` piano section | **Reject** | Standards = admission trang kho, không phải luật đệm piano |
| MERGE xóa thư mục upgrade | **Reject** | Trái `merge-policy.md` — giữ lịch sử run |
