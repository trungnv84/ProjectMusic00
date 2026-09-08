---
id: PIPE.STEP-04
type: pipeline
status: active
version: "1.2"
tags: [pipeline, arrange]
serves-steps: [4]
last-updated: "2026-09-08"
---

# Bước 4 — Phối khí → MusicXML

**Một bước, chạy tự động đến xong.** Phối khí làm rõ tương phản lead sheet. **Flat import FAIL = step4 chưa done** — dù XML parse được.

## Input bắt buộc

- `03-song.musicxml` (hoặc bản tương đương)
- `02-arrange-prompt.md`
- (Khuyến nghị) `03-composition-notes.md`

## Fetch (bắt buộc musicxml profile)

- `DOC_REFS` arrange-prompt
- Arrangement: section-energy, dynamics-and-structure, genre-textures…
- **MusicXML (bắt buộc đọc):** [safe-patterns](../knowledge/musicxml/safe-patterns.md), [importer-profile](../knowledge/musicxml/importer-profile.md), [anti-patterns](../knowledge/musicxml/anti-patterns.md), [rules](../knowledge/musicxml/rules.md)
- Template notes: [arrangement-notes.template.md](../artifacts/arrangement-notes.template.md)

## AI làm

1. Khóa lyric / melody / harmony từ Bước 3 trừ user giao quyền.
2. Thêm part; contrast section; pretty-print.
3. **Mặc định không** xuất drum kit `unpitched` đa instrument. Nếu user bắt buộc có trống: tối đa 1–2 sound, đúng safe-patterns, hoặc tạm rest + ghi notes — **không** kit 6–8 id kiểu GM đầy đủ trừ khi đã kiểm importer.
4. Trước handoff: chạy **importer self-check** (bắt buộc trong `04-arrangement-notes.md`). Mọi mục FAIL → sửa XML rồi mới `step4: done`.

### Self-check tối thiểu (copy vào notes)

```text
importer_self_check:
  no_mixed_direction_type: pass|fail   # words+dynamics không chung một direction-type
  score_instrument_pairs: pass|fail  # mỗi midi-instrument có score-instrument cùng id
  no_complex_unpitched_kit: pass|fail
  part_list_matches_parts: pass|fail
  measures_1_to_N: pass|fail
  pretty_print: pass|fail
  result: PASS|FAIL
```

## Output

```text
runs/compose/<run-id>/04-arranged.musicxml
runs/compose/<run-id>/04-arrangement-notes.md   # bắt buộc có importer_self_check
STATUS.md  # step4: done chỉ khi importer_self_check.result = PASS
```

Không đạt → sửa file hoặc improver.
