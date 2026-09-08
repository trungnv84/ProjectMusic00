---
id: PIPE.STEP-04
type: pipeline
status: active
version: "1.1"
tags: [pipeline, arrange]
serves-steps: [4]
last-updated: "2026-09-08"
---

# Bước 4 — Phối khí → MusicXML

**Một bước, chạy tự động đến xong** (giống Bước 3). Phối khí phải **làm rõ** tương phản đã có trên lead sheet — không làm mọi section nghe cùng một texture.

## Input bắt buộc

- `03-song.musicxml` (hoặc bản tương đương)
- `02-arrange-prompt.md`
- (Khuyến nghị) `03-composition-notes.md` — motif / section contrast / gate

## Fetch

- `DOC_REFS` của arrange-prompt
- Knowledge arrangement: section-energy, dynamics-and-structure, genre-textures, orchestration…
- Knowledge musicxml (continuity, part-list, anti-patterns)
- (Tuỳ) [../artifacts/composition-notes.template.md](../artifacts/composition-notes.template.md) cho arrangement notes

## AI làm

1. Đọc lead sheet Bước 3: **khóa** lời / giai điệu / hòa âm trừ khi user giao quyền sửa. Không “san phẳng” melody để dễ viết part.
2. Tôn trọng tương phản section từ Bước 3 (Verse mỏng hơn Chorus; Bridge đổi màu/mật độ; Final dày hoặc có layer mới — xem [dynamics-and-structure](../knowledge/arrangement/dynamics-and-structure.md)).
3. **Cấm** copy nguyên một pattern đệm cho mọi measure/section chỉ đổi chord symbol — dễ làm bài lại đều đều dù lead sheet đã hay.
4. Thêm part theo ARRANGEMENT / DOC_REFS; mọi part measure `1` → `N`; số score-part = số part.
5. Pretty-print MusicXML; ghi `04-arrangement-notes.md` (arc năng lượng, layer theo section).

## Output

```text
runs/compose/<run-id>/04-arranged.musicxml
runs/compose/<run-id>/04-arrangement-notes.md   # khuyến nghị; nêu contrast theo section
STATUS.md  # step4: done
```

Không đạt → improver (`runs/upgrade/<id-mới>/`).
