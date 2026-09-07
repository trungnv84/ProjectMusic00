# Merge plan

Run: `2026-09-07-all-topics`

## Intended merge

Copy từng file dưới `proposed/docs/m-guide/` vào path tương ứng dưới `docs/m-guide/` sau khi user duyệt.

`catalog.yml` phải được merge cùng các trang mới để mọi page mới có `id`, `path`, `tags`, `serves-steps`, `summary`.

## Preconditions

- User explicitly approves merge.
- Kiểm tra ID không trùng/deprecate.
- Kiểm tra toàn bộ link tương đối trong các trang mới.
- Chạy validator XML / repository checks hiện có nếu repository cung cấp.
- Chỉ sau đó mới thay đổi `docs/m-guide/`.

## Important

Không có thao tác merge nào được thực hiện trong run này.
