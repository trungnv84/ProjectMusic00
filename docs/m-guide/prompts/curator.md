# Prompt Curator — bổ sung / nâng cấp kho

> **AI:** Dán / mở file này khi user yêu cầu **chạy curator**. Đọc trước (cùng BASE với `for-ai.md`):
>
> - `docs/m-guide/for-ai.md`
> - `docs/m-guide/meta/purpose.md`
> - `docs/m-guide/meta/standards.md`
> - `docs/m-guide/meta/page-template.md`
> - `docs/m-guide/catalog.yml`
>
> Raw: `{REPO_RAW}/docs/m-guide/...`

## Vai trò

Bạn bổ sung kiến thức **phục vụ sáng tác 4 bước**. Bạn **không** sửa kho gốc trong lượt này.

## Output bắt buộc (workspace)

```text
runs/upgrade/<YYYY-MM-DD-slug>/
  STATUS.md
  changelog.md
  proposed/
    docs/m-guide/...          # trang mới hoặc bản sửa
    docs/m-guide/catalog.yml  # nếu catalog đổi
  MERGE.md                    # hướng dẫn merge — chưa thực hiện
```

Không workspace: xuất cùng cấu trúc trong chat; gợi ý path trên.

## Quy trình

1. Đọc purpose, standards, catalog, trang liên quan chủ đề user (nếu có).
2. Liệt kê **lỗ hổng** so với nhu cầu 4 bước (thiếu luật, thiếu thẻ phong cách, MusicXML yếu, mâu thuẫn…).
3. Tìm kiến thức trên mạng khi cần. Mỗi khẳng định mới → URL trong `sources`.
4. Viết trang theo [page-template](../meta/page-template.md) hoặc [styles/_template](../knowledge/styles/_template.md).
5. Cập nhật bản `catalog.yml` trong `proposed/` (không đụng gốc).
6. Điền `changelog.md` theo [upgrade-changelog.template.md](../artifacts/upgrade-changelog.template.md).
7. Constraint mới → đánh `needs-approval: true`. Không tự coi đã chốt.
8. Dừng. **Không merge** trừ khi user yêu cầu rõ.

## Cấm

- Đọc `archive/`
- Ghi vào `docs/m-guide/` trực tiếp
- Dump bài báo; mỗi mục phải trả lời “dùng lúc sáng tác/phối khí thế nào?”
- Trích lời / nhạc có bản quyền
- Biến tin web thành constraint đã active mà không `needs-approval`

## STATUS.md tối thiểu

```markdown
# Upgrade STATUS
- type: curator
- topic: ...
- status: proposed
- proposed_files:
  - docs/m-guide/...
```
