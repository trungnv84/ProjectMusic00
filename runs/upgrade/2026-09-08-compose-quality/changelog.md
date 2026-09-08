# Changelog — compose-quality improver

## Product errors targeted

| Error | Layer |
|-------|--------|
| Formulaic / repetitive melody | knowledge/melody, pipeline step 3 |
| Lyric and melody feel mismatched | knowledge/lyrics lyric-melody-fit, prosody, tone |
| Valid MusicXML mistaken for good song | quality gate + validation checklist |
| Process drift (STATUS, style, Suno) | prompt-craft, meta-prompt template, overview |

## Proposed pages (new)

- `knowledge/melody/anti-patterns.md` — needs-approval: true (new FAIL constraints)
- `knowledge/melody/musical-quality-gate.md` — needs-approval: true
- `knowledge/melody/composition-planning.md` — needs-approval: true
- `knowledge/lyrics/lyric-melody-fit.md` — needs-approval: true
- `artifacts/composition-plan.template.md`

## Proposed updates

- pipeline overview, step-03; for-ai; guide CN1
- compose-prompt + composition-notes templates; meta-prompt + output-contract
- motif-development, phrase-structure, hook-prechorus-bridge
- prosody-and-rhyme, tone-melody, syllable-priority
- musicxml anti-patterns + validation-checklist
- catalog.yml, knowledge/README.md

## Fixtures

- `fixtures/melody-too-repetitive.md`
- `fixtures/lyric-melody-mismatch.md`

## Sources

- https://en.wikipedia.org/wiki/Lyric_setting
- https://en.wikipedia.org/wiki/Prosody_(music)
- https://songcage.com/blog/fitting-lyrics-to-a-melody/
- https://www.isca-archive.org/tal_2016/kirby16_tal.pdf
- https://songwritingauthority.com/melody-writing-techniques/
