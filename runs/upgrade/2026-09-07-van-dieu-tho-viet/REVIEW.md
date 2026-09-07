# REVIEW — curator run 2026-09-07-van-dieu-tho-viet

## Materialize

- File từ sandbox đã có trong workspace nhưng nằm **phẳng** ở root run.
- Đã chuyển về đúng hợp đồng Curator:
  - `proposed/docs/m-guide/knowledge/vietnamese/rhyme-meter.md`
  - `proposed/docs/m-guide/catalog.yml`
- `STATUS.md` / `changelog.md` / `MERGE.md` giữ ở root run.
- **Chưa** merge vào `docs/m-guide/`.

## Đánh giá nội dung (sẵn sàng merge khi user chốt)

| Mục | Ý kiến |
|-----|--------|
| Lỗ hổng | Đúng — kho có tone-melody + lyrics craft, chưa có vần/thể thơ |
| `rhyme-meter.md` | Phù hợp; hầu hết là **hint**; constraint bản quyền + tôn trọng `rhyme_scheme` khóa là hợp lý |
| Sources | `none (no external refs)` — đúng quy tắc khi không tra web |
| Catalog 1.2 + `KNOW.VI.RHYME-METER` | OK |
| `status: draft` | Có thể giữ draft khi merge, hoặc nâng `active` nếu user muốn dùng ngay ở Bước 3 |

## Khi user nói merge

1. Copy 2 file `proposed/` → `docs/m-guide/`
2. (Tuỳ) đổi `status: draft` → `active` trên trang rhyme-meter
3. Cập nhật `STATUS.md` → `merged` + ngày
