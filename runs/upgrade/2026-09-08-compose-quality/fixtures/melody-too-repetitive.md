# Fixture — melody-too-repetitive

**Source run:** `runs/compose/2026-09-08-vi-yeu-la-vui/`  
**Expected gate:** `FAIL` (`melodic_repetition`, `phrase_similarity`, `hook_distinctiveness` / Final development)

## Observed pattern

Many Verse lines share one skeleton (divisions often 2+2+4+4+4) with near-fixed pitch cells, only lyrics change:

- `F–G–F–E–C`
- `F–F–F–E–C`
- `F–G–F–D–C`

Chorus / Chorus2 near-copies such as:

- `G–G–B–D–A`
- `G–A–B–D–A`
- `F–A–B–D–A`

Final Chorus mainly higher register on the same idea — **register change ≠ development**.

## Maps to constraints

- `KNOW.MELODY.ANTI-PATTERNS` #1, #2, #4, #6, #7
- `MAX_IDENTICAL_PHRASE_SKELETONS`, `REQUIRE_FINAL_CHORUS_DEVELOPMENT`

## Correct response

Treat as **failed composition candidate**. Regenerate from `03a-composition-plan.md` (new motifs + hook cell). Do **not** patch a few notes and re-export MusicXML.
