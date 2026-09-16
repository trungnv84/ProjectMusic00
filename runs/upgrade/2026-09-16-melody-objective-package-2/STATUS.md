# Upgrade STATUS
- type: improver
- related_compose_run:
  - runs/compose/2026-09-08-vi-yeu-la-vui-v3/
  - runs/compose/2026-09-08-vi-yeu-la-vui-v4/
  - runs/compose/2026-09-08-vi-yeu-la-vui-v2/
- status: merged
- package: 2
- layers: [knowledge]
- scope: [singability, emotional-contour, tension-release, catalog]
- date: 2026-09-16
- dependency: runs/upgrade/2026-09-15-melody-objective-system/ (Package 1 mechanism/schema proposal)
- merge: 2026-09-16 — merged nguyên trạng (không cần rebase, không đụng file có sẵn nào khác ngoài patch chèn vào catalog.yml)

## Ghi chú merge (2026-09-16)

Nội dung đúng, không trùng lặp (đã đối chiếu `contour.md`, `phrase-structure.md`, `motif-development.md`,
`phrasing-breath-and-melisma.md`), schema field (`objective_id`, `category`, `useful_for`,
`compatible_with`, `conflicts_with`, `section_affinity`, `evaluation`) khớp đúng mô tả Gói 1 trong
`ROADMAP.md` dù Gói 1 thật (schema + Objective Selector) chưa tồn tại trong kho.

**Lưu ý quan trọng — người dùng gọi đây là "Gói 1" nhưng metadata trong `STATUS.md` này tự khai là
`package: 2`, khớp đúng Gói 2 (Tier 1 core mechanics, phần A) trong
`runs/upgrade/2026-09-15-melody-objective-system/ROADMAP.md`.** Gói 1 thật (Objective Selector +
`melody-objectives.schema.md` + `objective-selection.md`) **vẫn chưa có ai làm**. 3 trang mới ở đây hiện
**chỉ tồn tại như knowledge độc lập** — chưa có cơ chế nào trong `pipeline/step-03-compose.md` fetch hoặc
chọn tới chúng (vì Objective Selector chưa merge). Cần làm Gói 1 thật trước khi 3 trang này thực sự được AI
dùng tới khi compose.
