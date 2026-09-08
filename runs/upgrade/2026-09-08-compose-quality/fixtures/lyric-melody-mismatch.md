# Fixture — lyric-melody-mismatch

**Source run:** `runs/compose/2026-09-08-vi-yeu-la-vui/`  
**Expected gate:** `FAIL` (`lyric_melody_fit`, often `vietnamese_tone_melody`)

## Observed pattern

- Same rhythmic cell under many different lyric lines → words feel “read onto notes”, not set.
- No evidenced speak-test / `prosody_audit` (keyword → strong beat / hold).
- Tone handling described like independent per-syllable pitch offsets (`sắc=+1`, `huyền=-1`) instead of **transition** similar/oblique/contrary between syllable pairs (Kirby & Ladd).
- Cheerful lyric text does not automatically yield cheerful melodic/rhythmic motion (macro prosody).

## Maps to constraints

- `KNOW.LYRICS.LYRIC-MELODY-FIT` (stress↔beat, duration↔importance, speak-test, tone transitions)
- `REQUIRE_SPEAK_TEST`
- `KNOW.MELODY.ANTI-PATTERNS` #5 (mechanical tone offset)

## Correct response

Rebuild `lyric_prosody_map` in 3a, speak-test hook + verse lines, then regenerate melody/rhythm together with lyrics. Valid MusicXML alone does **not** clear this FAIL.
