# 04-arrangement-notes.md — Yêu Là Vui Thế Thôi (v2)

## Step 4 scope
- Bước 3 được coi là LOCKED cho lyric, lead melody và chord progression. Không sửa các part `P1 Voice` và `P2 Piano`.
- Arrangement đi theo `STYLE.VN.VPOP-UPTEMPO` và arrange-prompt: bright synths, driving beat, guitar accents, active percussion, backing vocal; ưu tiên khoảng trống cho lead vocal.

## Added parts
- `P3 Drums`: electronic/pop drum kit; verse thưa, pre tăng mật độ, chorus four-on-floor, bridge breakdown, final chorus dày nhất.
- `P4 Electric Bass`: root/5th ở verse, tăng motion ở pre, syncopated repeated tones ở chorus, pedal/breakdown ở bridge.
- `P5 Synth Pluck`: arpeggiated motif trong intro, sparse stabs ở verse, build ở pre, bright repeated hook-layer ở chorus/final chorus.
- `P6 Acoustic Guitar`: supporting broken-chord/strum texture; giữ register dưới vocal.
- `P7 Backing Vocals`: `aah/ooh` only, vào pre/chorus/final chorus; không lặp lyric lead để tránh cạnh tranh với lead.

## Section energy / density
| Section | Energy | Density | Arrangement focus |
|---|---:|---:|---|
| INTRO (1–4) | 1–2 | 1–2 | synth arpeggio; drums only transition accent |
| VERSE 1 (5–14) | 2 | 2 | bass + guitar + sparse synth, light drums |
| PRE (15–18) | 3–4 | 3 | rising bass, denser synth/drums, transition fill |
| CHORUS (19–28) | 4 | 4 | four-on-floor, active bass, bright synth, guitar, light backing |
| VERSE 2 (29–38) | 2–3 | 2–3 | drop density, retain groove |
| PRE 2 (39–42) | 3–4 | 3–4 | stronger build than first pre |
| CHORUS 2 (43–52) | 4 | 4 | full hook layer |
| BRIDGE (53–60) | 2 | 2 | breakdown; pedal bass; reduced drums; synth pad-like sustain |
| FINAL CHORUS (61–70) | 5 | 5 | peak: full drums, bass, synth, guitar, backing vocals |
| OUTRO (71–74) | 1 | 1 | remove layers and settle on tonic support |

## Locked-content audit
- `P1 Voice`: semantically unchanged from Step 3 (canonical XML comparison PASS).
- `P2 Piano`: semantically unchanged from Step 3 (canonical XML comparison PASS).
- Tempo remains **112 BPM**.
- Key remains **C major**.
- Meter remains **4/4**.
- Original chord labels in Voice part remain unchanged.
- No new lyric was added to the lead vocal; backing vocal uses only `aah/ooh`.

## Structural validation
- MusicXML 4.0 `partwise` with required Partwise DTD.
- `part-list` contains 7 score-parts and exactly 7 `<part>` elements.
- Every part has measure `1→74` continuously.
- All written durations are positive and every measure totals its effective 4/4 duration.
- All MIDI programs are in 1–128.
- No placeholder measures/comments.

## Handoff
`music_quality_gate` remains a Step 3 responsibility; Step 4 here validates structural continuity and arrangement-layer integrity without claiming that orchestration alone fixes any underlying melodic-quality issue in the lead sheet.

## MusicXML Flat import repair (2026-09-08, second pass)

Backup: `04-arranged.musicxml.bak`

### Root causes (verified by audit)
1. **`direction-type` mixed content** — many places put `<words>` and `<dynamics>` inside the **same** `<direction-type>` (invalid / Flat-hostile). Fixed by splitting into sibling `<direction-type>` elements (19 splits).
2. **Complex drum kit (`P3`)** — many `score-instrument` + `<unpitched>` notes; Flat often rejects. Replaced `P3` content with **whole-measure rests** and a single kit declaration (`P3-I1`) so the file imports; drum pattern can be re-added later with safe-patterns.
3. Score-instrument pairing on P1–P7 already present in the pre-fix file; left intact.

### Recheck
- XML parses; DOCTYPE MusicXML 4.0 partwise restored (kho profile).
- `words`+`dynamics` in same `direction-type`: **0**.
- `unpitched`: **0**.
- All `midi-instrument` ids have matching `score-instrument`.
- 7 parts; measures 1–74.

### Note
Drums are silent placeholders after this repair. Re-arrange drums only after confirming Flat opens the file, using `KNOW.MUSICXML.SAFE-PATTERNS` / `IMPORTER-PROFILE`.
