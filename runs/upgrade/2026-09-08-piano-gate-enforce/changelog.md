# Changelog — piano gate enforce

- type: improver
- date: 2026-09-08
- related_compose_run: runs/compose/2026-09-08-vi-yeu-la-vui-v2
- also: runs/compose/2026-09-08-vi-yeu-la-vui-v3
- follows: runs/upgrade/2026-09-08-piano-accompaniment

## Changes (merged)

| File | Product bug targeted | Change |
|------|----------------------|--------|
| `knowledge/melody/musical-quality-gate.md` | Hòa âm / gate yếu | Thêm `REQUIRE_PIANO_TEXTURE` + score `piano_accompaniment`; thiếu `piano_texture` = FAIL |
| `knowledge/harmony/piano-reduction.md` | Hòa âm / phối khí | Heuristic pad; cấm “unchanged”; anti-pattern P4; step4 FAIL nếu lock pad |
| `pipeline/step-03-compose.md` | Hòa âm | Gate gồm REQUIRE_PIANO_TEXTURE; không defer pad sang Bước 4 |
| `pipeline/step-04-arrange.md` | Phối khí | `piano_texture_check` bắt buộc; step4 done cần cả importer + piano PASS |
| `artifacts/composition-notes.template.md` | Prompt / notes | Threshold + score piano |
| `artifacts/arrangement-notes.template.md` | Phối khí | `piano_texture_check`; cấm action unchanged |
| `artifacts/compose-prompt.template.md` | Prompt yếu | MUST REQUIRE_PIANO_TEXTURE; MUST NOT PASS thiếu piano |
| `artifacts/arrange-prompt.template.md` | Prompt yếu | piano_texture_check; cấm semantically unchanged |
| `knowledge/styles/vn-vpop-ballad.md` | Phong cách | Hint broken/half-pulse + Bước 4 rewrite |
| `for-ai.md` | Vận hành | Playbook gate + piano_texture_check |
| `guides/chuc-nang-1-sang-tac.md` | Guide | Checklist + message Bước 4 |
| `catalog.yml` | Catalog | Summary step 3/4 + quality-gate + piano-reduction |

## needs-approval

- Ngưỡng cứng mới `REQUIRE_PIANO_TEXTURE` trong quality gate (FAIL nếu pad-only / thiếu notes).
- Step4 done phụ thuộc `piano_texture_check` ngoài importer.

**User yêu cầu cải tiến để sửa vấn đề piano = pad / Bước 4 lock P2** → áp dụng 2026-09-08.

## Sources

- Internal only (v2/v3 artifacts + prior piano-accompaniment upgrade).
