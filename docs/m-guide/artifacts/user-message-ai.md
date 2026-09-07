# Mẫu tin nhắn gửi AI khác (chỉ cần link)

Thay `OWNER`, `REPO`, `BRANCH` (thường `main`).  
Canonical: `https://raw.githubusercontent.com/OWNER/REPO/BRANCH/docs/m-guide/for-ai.md`

---

## Chức năng 1 — cả chuỗi

```text
Đọc https://raw.githubusercontent.com/OWNER/REPO/BRANCH/docs/m-guide/for-ai.md
Thực hiện Chức năng 1, cả 4 bước.
Nếu đang ở workspace: ghi vào runs/compose/<ngày-slug>/.
Yêu cầu bài hát: "..."
```

## Chỉ Bước 1

```text
Đọc .../docs/m-guide/for-ai.md
Làm Bước 1 (meta-prompt).
Yêu cầu: tạo 2 prompt (viết lời+nhạc, và phối khí); mỗi prompt phải có DOC_REFS từ catalog.
```

## Chỉ Bước 3

```text
Đọc .../docs/m-guide/for-ai.md
Làm Bước 3.
Compose-prompt: (dán hoặc path runs/compose/.../02-compose-prompt.md)
Yêu cầu bài hát: "..."
REFERENCE_STYLE (nếu có): STYLE.POP.BALLAD-GENERIC
```

## Curator

```text
Đọc .../docs/m-guide/for-ai.md
Chạy curator.
Chủ đề thiếu: "thanh điệu tiếng Việt / thẻ phong cách ballad / ..."
Ghi đề xuất vào runs/upgrade/<ngày-slug>/proposed/. Không sửa docs/m-guide/ cho đến khi tôi bảo merge.
```

## Improver

```text
Đọc .../docs/m-guide/for-ai.md
Chạy improver.
Compose run: runs/compose/...
(dán run-review hoặc mô tả lệch)
Không sửa docs/m-guide/ cho đến khi tôi bảo merge.
```

## Merge

```text
Merge đề xuất runs/upgrade/<id>/ vào docs/m-guide/ theo pipeline/merge-policy.md.
Tôi chấp nhận các mục needs_approval: ...
```
