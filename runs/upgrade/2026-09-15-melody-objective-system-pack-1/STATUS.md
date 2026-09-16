# Upgrade STATUS
- type: improver
- related_compose_run:
  - runs/compose/2026-09-08-vi-yeu-la-vui-v2/
  - runs/compose/2026-09-08-vi-yeu-la-vui-v3/
  - runs/compose/2026-09-08-vi-yeu-la-vui-v4/
- status: merged (rebase — không merge nguyên trạng, xem ghi chú dưới)
- layers: [knowledge, pipeline, catalog]
- package: 1
- scope: objective melody quality measurement and auditable gate evidence
- excluded_packages:
  - multi-candidate generation/selection
  - semantic lyric gate
  - piano-reduction redesign
  - Step 4 arrangement changes
- needs-approval: true
- merge: 2026-09-15 — merged có sửa (rebase), không merge nguyên văn `proposed/`

## Ghi chú merge (2026-09-15)

**Không khớp với "Gói 1" trong `runs/upgrade/2026-09-15-melody-objective-system/ROADMAP.md`** — Gói 1 gốc yêu
cầu Objective Selector (chọn tập mục tiêu melody theo genre/section), pack này làm objective **audit
metrics** (đo lường có thể tái kiểm tra) — một nhầm nghĩa chữ "objective". Nội dung audit-metrics tự nó có
giá trị nên được merge như một bổ sung riêng, **không tính là hoàn thành Gói 1** — Gói 2/3 (phụ thuộc
Objective Selector thật) vẫn đang bị chặn, cần một pack khác làm đúng theo ROADMAP.md.

**`proposed/docs/m-guide/knowledge/melody/musical-quality-gate.md` và `pipeline/step-03-compose.md` không
được merge nguyên văn** — 2 file này được viết trên một bản base **cũ hơn** bản đã merge trước đó
(`runs/upgrade/2026-09-14-*`), nên nếu áp trực tiếp sẽ **xoá mất** `REQUIRE_CATCHY_HOOK`,
`REQUIRE_MELODIC_COHERENCE`, mọi tham chiếu `catchiness.md`. Đã tự rebase: giữ nguyên toàn bộ nội dung hiện
có, chỉ **thêm** phần audit mới (`REQUIRE_OBJECTIVE_MELODY_AUDIT`, `MAX_NEAR_REPEAT`,
`REQUIRE_SECTION_OBJECTIVE_CONTRAST`, `REQUIRE_FINAL_DEVELOPMENT_EVIDENCE`) vào bản v1.3/v1.5 gốc →
`musical-quality-gate.md` v1.4, `step-03-compose.md` v1.6.

**Đã merge nguyên trạng** (không đổi nội dung, chỉ chỉnh frontmatter `status: draft → active` và thêm 1 dòng
`related`): `knowledge/melody/objective-metrics.md` — file này hoàn toàn mới, không đụng file nào khác nên
không có rủi ro base cũ.

**`catalog.yml` patch**: merge được, patch dạng chèn sạch (insert), không đụng entry khác — chỉ đổi vị trí
chèn để nằm cạnh `KNOW.MELODY.QUALITY-GATE` cho logic thay vì sau `KNOW.MELODY.INVENTION` như đề xuất gốc.
