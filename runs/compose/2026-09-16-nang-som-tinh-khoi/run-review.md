# run-review.md — Package 6 validation run

## Run
- `runs/compose/2026-09-16-nang-som-tinh-khoi/`
- genre/mood: bright contemporary V-Pop / youthful, warm, playful

## Purpose
Validate the merged Melody Objective System on a real Step 3 compose run.

## Prompt changes under test
- Objective selection is an explicit reasoned checklist instead of weighted-random wording.
- Primary objective: `emotional_contour`.
- Secondary objectives: `singability`, `tension_release`, `melodic_rhythm`.
- The compose prompt requires hook identity + repetition-with-variation, multi-axis phrase contrast, tension/release, singability checks, and objective audit after MusicXML exists.
- The arrange prompt preserves Step 3 melody/lyrics/progression and treats arrangement as downstream, not as a repair mechanism for a failed melody.

## Step 3 result
`music_quality_gate: PASS`

### Objective audit
| Metric | Value | Interpretation |
|---|---:|---|
| exact_repeat_rate | 0.029 | low global duplicate signature ratio |
| near_repeat_max | 0.625 | below the merged hard near-repeat threshold |
| rhythm_diversity | 0.657 | 23 rhythm signatures across 35 eligible phrases |
| contour_diversity | 0.429 | 15 contour signatures across 35 eligible phrases |
| cadence_variety | 0.057 | 2 cadence categories represented; limited variety remains a useful watch item |
| section_contrast_dimensions | 2 | Verse 1 vs Chorus 1 differ on register and phrase-range dimensions in the run-local audit |

## Structural evidence
- MusicXML 4.0 partwise + Partwise DTD.
- 2 parts: Voice + Piano.
- 74 measures in each part, continuous 1→74.
- Every measure totals 16 divisions in 4/4.
- Voice range: C4–E5.
- 280 Vietnamese syllables aligned 1 syllable → 1 note.
- Piano uses pulse/broken-chord patterns instead of whole-note-only accompaniment in sung sections.

## Musical interpretation
The run shows that the upgraded system can turn the melody request into a melody with explicit objective provenance and measurable evidence rather than relying only on a qualitative “catchy” claim. The audit also exposes a remaining watch item: cadence variety is numerically low even though it is not a hard failure in this run.

No rendered-audio or subjective listening conclusion is claimed here; the evidence is symbolic MusicXML + manual lyric/prosody checks.

## Package 6 status
**Partial validation only.** The roadmap requires 2–3 materially different genre/mood compose runs before treating Package 6 as fully closed. This run should therefore be kept as the V-Pop/bright validation sample.

## Next validation target
Run a materially different genre/mood and compare the selected objective bundle plus phrase/rhythm/contour signatures. If the selector converges to the same bundle despite the changed musical problem, return to Objective Selector rather than adding more Tier 3 knowledge.
