# EVALUATION + merge — 2026-09-07-quet-toan-kho

## Materialize

- File từ sandbox nằm **phẳng** ở root run → đã chuyển vào `proposed/docs/m-guide/...`.
- Catalog đề xuất ghi `1.1 → 1.2` **lỗi thời** (kho gốc đã `1.2` sau all-topics) → merge catalog gốc bump **`1.2 → 1.3`**.
- Ghi chú `van-dieu-tho-viet` “chưa merge” trong STATUS/changelog gốc sandbox **đã lỗi thời** (run đó đã merged trước đó).

## Quyết định

| Trang | Quyết định | Ghi chú |
|-------|------------|---------|
| musicxml/performance-markings | **Merge → active** | Lấp lỗ PERFORMANCE trong schema; enum dynamics/articulations hợp lý |
| musicxml/lyrics-encoding | **Merge → active** | Bổ sung cú pháp cụ thể cho `LYRICS-AND-NOTATIONS` (không đè) |
| vocal/backing-harmonies | **Merge → active** | Lỗ hổng thật cho Bước 4 |
| harmony/modulation | **Merge → active** | Khớp field `HARMONY.modulation`; constraint key ở đầu measure OK |
| catalog | **Merge có chỉnh** | Thêm 4 entry; version **1.3** |

Không từ chối trang nào. Cross-link với `lyrics-and-notations` đã cập nhật.
