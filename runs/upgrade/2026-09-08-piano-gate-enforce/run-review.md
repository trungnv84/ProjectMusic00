# Run Review — Piano gate enforce (Improver follow-up)

- compose_run: `runs/compose/2026-09-08-vi-yeu-la-vui-v2` (Bước 4 lock P2)
- also: `runs/compose/2026-09-08-vi-yeu-la-vui-v3` (Bước 3 pad; thiếu `piano_texture`; gate PASS)
- prior_upgrade: `runs/upgrade/2026-09-08-piano-accompaniment` (merged nhưng chưa đủ cứng)
- step_failed: 3 + 4 (hợp đồng / expectation)
- date: 2026-09-08

## Mong đợi

- Bước 3: lời + giai điệu + piano đệm nghe được (pulse / broken).
- Bước 4: không copy nguyên P2 pad; rewrite texture hoặc bù pitched groove.

## Thực tế

- v2 notes: “P2 Piano semantically unchanged from Step 3” → pad giữ nguyên.
- v3: P2 = whole-note triads; `music_quality_gate: PASS` nhưng **không có** khối `piano_texture`.
- Upgrade trước chỉ soft-constraint trong pipeline/templates — gate melody không FAIL vì thiếu piano.

## Lệch (checklist)

- [x] hòa âm (pad-only)
- [x] phối khí (lock P2 = progression)
- [x] prompt / gate yếu (PASS khi thiếu piano_texture)

## Nguyên nhân nghi ngờ

1. `KNOW.MELODY.QUALITY-GATE` không có `REQUIRE_PIANO_TEXTURE`.
2. Step4 done chỉ phụ thuộc `importer_self_check`, không kiểm piano policy.
3. Template cho phép ghi “unchanged” mà không FAIL.

## Lớp cần sửa

- [x] quy trình (step-03/04 done criteria)
- [x] quality-gate + piano-reduction
- [x] templates compose/arrange notes + prompts
- [x] style ballad hint
- [x] for-ai / guide / catalog summaries
