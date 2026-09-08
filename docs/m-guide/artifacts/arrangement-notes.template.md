# Template — ARRANGEMENT_NOTES (Bước 4)

Lưu: `runs/compose/<run-id>/04-arrangement-notes.md`

**Bắt buộc:** khối `importer_self_check` với `result: PASS` trước khi `STATUS` step4 = done.

---

```text
ARRANGEMENT_NOTES
──────────────────────────────────────────────
locked_from_step3:
  lyric: true
  melody: true
  harmony: true
  tempo_key_meter: true

parts_added:
  - id: P3
    name: ""
    role: ""

section_energy_arc: ""

texture_contrast_notes: ""

drums_policy: "omitted | simplified_rests | single_sound | full_kit_with_importer_ok"

importer_self_check:          # BẮT BUỘC — đối chiếu KNOW.MUSICXML.IMPORTER-PROFILE
  no_mixed_direction_type: pass|fail
  score_instrument_pairs: pass|fail
  no_complex_unpitched_kit: pass|fail
  part_list_matches_parts: pass|fail
  measures_1_to_N: pass|fail
  pretty_print: pass|fail
  evidence: ""
  result: PASS|FAIL
  if_fail: "fix MusicXML before STATUS step4 done — do not hand off to Flat"

deviations_or_tradeoffs:
  - ""
```
