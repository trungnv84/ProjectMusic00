# REVIEW — curator run 2026-09-07-vpop-ballad-tones-musicxml

Người review (workspace agent) sau khi materialize `proposed/`.

## Quyết định merge

| Mục | Quyết định | Lý do |
|-----|------------|--------|
| Mở rộng `tone-melody.md` | **Merge có chỉnh** | Hữu ích; nhưng thống kê 77% parallel **không** được cứng hóa thành constraint — chuyển thành hint theo `standards.md` |
| Thẻ `vn-vpop-ballad.md` | **Merge có chỉnh** | Lỗ hổng thật so với pop-ballad-generic; bỏ nguồn yếu/placeholder; `status: active` |
| Mở rộng `anti-patterns.md` | **Merge có chỉnh** | #7, #8, #10, #11 = constraint hợp lý; #9 và #12 **không** harden sai (schema không bắt buộc credit; octave không cố định 0–9 như đề xuất) → #9/#12 thành hint / soft |
| `catalog.yml` | **Merge có chỉnh** | Thêm STYLE.VN.VPOP-BALLAD + cập nhật summary |

## Vấn đề quy trình Curator phát hiện

1. AI chat thường **chỉ dán nội dung**, không ghi file → cần bước “materialize vào `runs/upgrade/`”.
2. Dễ biến **mô tả nghiên cứu / forum** thành **constraint** → cần quy tắc mặc định: web → hint; schema-hard / XML well-formed → constraint; còn lại `needs-approval`.
3. `sources` có thể chứa URL rác / vendor (Suno) → cần kiểm tra chất lượng nguồn.
4. Đề xuất gộp 3 chủ đề một lúc → vẫn OK nếu changelog rõ từng file; nhưng nên ưu tiên 1 chủ đề / run khi có thể.

Cải tiến đã áp vào `docs/m-guide/prompts/curator.md` (sau merge).
