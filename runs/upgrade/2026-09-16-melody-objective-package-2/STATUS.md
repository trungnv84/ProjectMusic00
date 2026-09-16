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
- merge: 2026-09-16 — merged nguyên trạng, không cần rebase (3 trang mới không đụng file nào khác; catalog.yml dùng patch dạng insert nên không bị lỗi base cũ như pack-1). catalog.yml v1.12→1.13.

## Ghi chú merge (2026-09-16)

Đúng phạm vi "Gói 2 — Tier 1 core mechanics, phần A" trong `ROADMAP.md`. Không trùng lặp với trang có sẵn
(`contour.md`, `phrase-structure.md`, `phrasing-breath-and-melisma.md` đã được đối chiếu đúng trong
`run-review.md`). Không thêm hard threshold mới — đúng cam kết trong `MERGE.md`. Front-matter dùng các field
theo schema Objective Selector (`objective_id`, `category`, `useful_for`, `compatible_with`, `conflicts_with`,
`section_affinity`, `evaluation`) dù Gói 1 thật (schema chính thức) **chưa được ai làm** — các field này hiện
chưa được validate bởi trang schema nào, sẽ có tác dụng đầy đủ khi Gói 1 hoàn thành. Không phải lỗi, chỉ là
thiết kế đón đầu hợp lý.
