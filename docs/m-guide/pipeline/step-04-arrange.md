---
id: PIPE.STEP-04
type: pipeline
status: active
version: "1.0"
tags: [pipeline, arrange]
serves-steps: [4]
last-updated: "2026-09-07"
---

# Bước 4 — Phối khí → MusicXML

## Input bắt buộc

- `03-song.musicxml` (hoặc bản tương đương)
- `02-arrange-prompt.md`

## Fetch

- `DOC_REFS` của arrange-prompt
- Knowledge arrangement + musicxml (continuity, part-list)
- (Tuỳ) [../artifacts/composition-notes.template.md](../artifacts/composition-notes.template.md) cho arrangement notes

## AI làm

1. Đọc lead sheet Bước 3: khóa lời / giai điệu / hòa âm trừ khi user giao quyền sửa.
2. Thêm part theo ARRANGEMENT / DOC_REFS.
3. Mọi part có measure `1` → `N` liên tục; `số score-part` = `số element part`.
4. Layering / texture theo knowledge arrangement và yêu cầu user.

## Output

```text
runs/compose/<run-id>/04-arranged.musicxml
runs/compose/<run-id>/04-arrangement-notes.md   # khuyến nghị
STATUS.md  # step4: done
```

Không đạt → improver (`runs/upgrade/<id-mới>/`).
