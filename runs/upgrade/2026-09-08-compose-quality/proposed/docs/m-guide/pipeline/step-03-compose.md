---
id: PIPE.STEP-03
type: pipeline
status: active
version: "1.1"
tags: [pipeline, compose]
serves-steps: [3]
last-updated: "2026-09-08"
---

# Bước 3 — Sáng tác → MusicXML (lead sheet)

Bước 3 gồm **ba pha**: 3a plan → 3b write → 3c quality gate. MusicXML hợp lệ ≠ bài đạt.

## Input bắt buộc

- `02-compose-prompt.md`
- **Yêu cầu bài hát** (input độc lập)
- (Tuỳ) id thẻ phong cách

## Fetch

- Mọi URL trong `DOC_REFS` của compose-prompt
- [../meta/song-request-schema.md](../meta/song-request-schema.md)
- Knowledge melody: [composition-planning](../knowledge/melody/composition-planning.md), [anti-patterns](../knowledge/melody/anti-patterns.md), [quality-gate](../knowledge/melody/musical-quality-gate.md), motif/phrase/contour
- Knowledge lyrics/VN: [lyric-melody-fit](../knowledge/lyrics/lyric-melody-fit.md), tone-melody, syllable-priority
- Knowledge `musicxml` tagged compose (tối thiểu [rules](../knowledge/musicxml/rules.md), [anti-patterns](../knowledge/musicxml/anti-patterns.md))
- [../artifacts/composition-plan.template.md](../artifacts/composition-plan.template.md)
- [../artifacts/composition-notes.template.md](../artifacts/composition-notes.template.md)

## Pha 3a — Composition plan

1. Parse yêu cầu theo schema; resolve `DELEGATED` trong biên CONSTRAINTS.
2. Nếu có thẻ phong cách: theo **đặc trưng khái quát** — không sao chép; **ghi đúng** `REFERENCE_STYLE` id vào plan.
3. Viết `03a-composition-plan.md` theo template: hook cell, motifs, section contrast, harmonic plan, **lyric_prosody_map**.
4. **Dừng** nếu user yêu cầu duyệt 3a. Không viết MusicXML trước khi plan xong (trừ user bảo chạy liên tục *sau* plan đã hoàn tất trong cùng lượt).

## Pha 3b — Write lead sheet

1. Sinh lời + giai điệu + hòa âm **từ plan đã khóa**.
2. Áp lyric–melody fit (speak-test) và VN tone **transitions**.
3. Xuất **MusicXML 4.0 partwise** lead sheet (voice + lyrics + harmony/piano); **pretty-print** nhiều dòng — không minify một dòng.
4. Tuân anti-patterns MusicXML (DTD, part-list khớp part, measure liên tục, midi-program 1–128, duration > 0).
5. Viết `COMPOSITION_NOTES` theo template — bắt buộc `lyrics_by_section`, `motifs_declared`, `hook_melody_cell`, `prosody_audit`.

## Pha 3c — Quality gate

1. Điền `music_quality_gate` theo [musical-quality-gate](../knowledge/melody/musical-quality-gate.md).
2. Nếu **FAIL** → regenerate từ 3a; **cấm** patch vài nốt rồi xuất lại.
3. Chỉ đánh dấu step3 done khi PASS (hoặc user chấp nhận FAIL tường minh).

## Output

```text
runs/compose/<run-id>/03a-composition-plan.md
runs/compose/<run-id>/03-song.musicxml
runs/compose/<run-id>/03-composition-notes.md   # gồm lyrics_by_section + music_quality_gate
STATUS.md  # step3: done chỉ khi gate PASS (hoặc user override)
```

Dừng. Nếu user không đạt → improver vào `runs/upgrade/<id-mới>/` — **không** sửa kho gốc.
