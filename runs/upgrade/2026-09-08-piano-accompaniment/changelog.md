# Changelog — piano accompaniment

- type: improver
- date: 2026-09-08
- related_compose_run: runs/compose/2026-09-08-vi-yeu-la-vui-v2

## Changes (merged)

| File | Product bug targeted | Change |
|------|----------------------|--------|
| `knowledge/harmony/piano-reduction.md` (new) | Hòa âm / phối khí | Định nghĩa lead-sheet vs arranged piano; cấm whole-note pad toàn bài; anti-patterns P1–P3 |
| `knowledge/harmony/basics.md` | Hòa âm | Link + constraint trỏ piano-reduction |
| `pipeline/step-03-compose.md` | Hòa âm / prompt | Fetch piano-reduction; bắt buộc `piano_texture` trong notes |
| `pipeline/step-04-arrange.md` | Phối khí | Tách LOCK progression vs ALLOW piano texture; `piano_texture_policy` |
| `artifacts/compose-prompt.template.md` | Prompt yếu | MUST/MUST NOT + DOC_REFS PIANO-REDUCTION |
| `artifacts/arrange-prompt.template.md` | Prompt yếu | Lock split + DOC_REFS + policy |
| `artifacts/composition-notes.template.md` | Hòa âm | Khối `piano_texture` |
| `artifacts/arrangement-notes.template.md` | Phối khí | `harmony_progression` + `piano_texture_policy` |
| `knowledge/styles/vn-vpop-uptempo.md` | Phong cách | Hint pulse/stabs; Bước 4 được rewrite piano |
| `catalog.yml` | Catalog | Thêm `KNOW.HARMONY.PIANO-REDUCTION`; cập nhật summary step 3/4 |
| `for-ai.md` | Vận hành | Fetch tối thiểu + playbook lock wording |
| `guides/chuc-nang-1-sang-tac.md` | Guide | Checklist + message mẫu Bước 4 |
| `knowledge/README.md` | Index | Harmony mô tả piano reduction |

## needs-approval

- Constraint mới: sung sections harmonic rhythm ≥ half-note (hoặc broken/comp); cấm whole-note-only toàn bài khi piano là lớp hòa âm pitched chính.
- Bước 4: không khóa piano texture cùng progression.

**User đã yêu cầu merge vào tài liệu hiện tại** → áp dụng 2026-09-08.

## Rejected / deferred

- Patch vào path `prompts/step-03-piano-reduction.md` / `step-04-arrangement.md` (không tồn tại).
- Đưa tiêu chuẩn piano vào `meta/standards.md`.
- Catalog flag `requires_rhythmic_piano`.
- Constraint “một nốt mỗi beat” (quá cứng cho ballad).

## Sources

- Internal only (compose run artifacts + existing m-guide). `sources: []` trên trang knowledge mới.
