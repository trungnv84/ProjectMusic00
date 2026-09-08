---
id: PIPE.STEP-03
type: pipeline
status: active
version: "1.0"
tags: [pipeline, compose]
serves-steps: [3]
last-updated: "2026-09-08"
---

# Bước 3 — Sáng tác → MusicXML (lead sheet)

## Input bắt buộc

- `02-compose-prompt.md`
- **Yêu cầu bài hát** (input độc lập)
- (Tuỳ) id thẻ phong cách

## Fetch

- Mọi URL trong `DOC_REFS` của compose-prompt
- [../meta/song-request-schema.md](../meta/song-request-schema.md)
- Knowledge `musicxml` tagged compose (tối thiểu [rules](../knowledge/musicxml/rules.md), [anti-patterns](../knowledge/musicxml/anti-patterns.md))
- [../artifacts/composition-notes.template.md](../artifacts/composition-notes.template.md)

## AI làm

1. Parse yêu cầu theo schema; resolve `DELEGATED` trong biên CONSTRAINTS.
2. Nếu có thẻ phong cách: theo **đặc trưng khái quát** — không sao chép nốt/lời gốc.
3. Viết lời + giai điệu + hòa âm (ký hiệu hợp âm và/hoặc piano reduction).
4. Xuất **MusicXML 4.0 partwise** lead sheet: voice + lyrics + harmony/piano; **không** dàn dựng đầy đủ.
5. Tuân anti-patterns MusicXML (DTD, part-list khớp part, measure liên tục, midi-program 1–128, duration > 0).
6. Viết `COMPOSITION_NOTES` theo template — **bắt buộc** có `lyrics_by_section` (bản lời đọc được theo section, khớp lời trong MusicXML; section không lời → `lines: []`).

## Output

```text
runs/compose/<run-id>/03-song.musicxml
runs/compose/<run-id>/03-composition-notes.md   # gồm lyrics_by_section
STATUS.md  # step3: done
```

Dừng. Nếu user không đạt → improver vào `runs/upgrade/<id-mới>/` — **không** sửa kho gốc.
