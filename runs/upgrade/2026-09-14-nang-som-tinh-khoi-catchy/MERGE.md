# MERGE — 2026-09-14-nang-som-tinh-khoi-catchy

**Trạng thái: chưa merge.** Theo `docs/m-guide/pipeline/merge-policy.md` và `prompts/improver.md`, chỉ copy
`proposed/docs/m-guide/...` → `docs/m-guide/...` khi user yêu cầu rõ (merge / áp dụng / sửa tài liệu gốc /
chấp nhận đề xuất).

## needs-approval: true

Đề xuất này thêm **constraint mới** (`REQUIRE_CATCHINESS_SELFCHECK` trong quality-gate + rule #9 trong
anti-patterns + khoá cứng ở step-03) — theo `meta/standards.md`, constraint mới cần user chốt trước khi merge,
không tự động PASS chỉ vì đã viết xong đề xuất.

## Nếu user đồng ý merge, copy các file sau (giữ nguyên path):

```text
proposed/docs/m-guide/catalog.yml
  → docs/m-guide/catalog.yml
proposed/docs/m-guide/knowledge/melody/catchiness-and-hook-craft.md
  → docs/m-guide/knowledge/melody/catchiness-and-hook-craft.md   (file mới)
proposed/docs/m-guide/knowledge/melody/anti-patterns.md
  → docs/m-guide/knowledge/melody/anti-patterns.md
proposed/docs/m-guide/knowledge/melody/musical-quality-gate.md
  → docs/m-guide/knowledge/melody/musical-quality-gate.md
proposed/docs/m-guide/pipeline/step-03-compose.md
  → docs/m-guide/pipeline/step-03-compose.md
```

Sau merge: đổi `status: draft` → `status: active` trong front-matter của
`catchiness-and-hook-craft.md`, và cập nhật `status: proposed` → `status: merged` trong `STATUS.md` của thư
mục upgrade này.

## Bước tiếp theo cho compose run gốc

Run `runs/compose/2026-09-08-nang-som-tinh-khoi/` **chưa đạt gate** (xem `run-review.md`). Sau khi merge
(hoặc kể cả trước khi merge, dùng để tham khảo ngay): chạy lại **Bước 3** trên cùng run — viết lại lead sheet
(đổi skeleton Verse 2, đổi Chorus Final theo kỹ thuật phát triển thật, điền đủ `motifs_declared` /
`hook_melody_cell` / bảng điểm `music_quality_gate`) trước khi sang Bước 4 (hiện đang pending).
