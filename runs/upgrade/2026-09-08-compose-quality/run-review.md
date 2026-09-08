# Run review — 2026-09-08-vi-yeu-la-vui

## Product issues observed

1. **Melody too repetitive** — Verse lines share near-fixed pitch+rhythm skeletons (`F–G–F–E–C` variants); Chorus / Chorus2 / Final nearly identical.
2. **Lyric–melody mismatch** — Same rhythmic cell under changing lyrics; speak-test / stress↔beat not evidenced; tone handled like per-syllable ±1 offset.
3. **Bridge / Final not developed** — Bridge only changes register/chords; Final mainly higher notes (register ≠ development).
4. **Process drift** — STATUS stale; style card id drift (ballad vs uptempo); MusicXML minified (hard to review).

## Desired doc outcomes

- Fail composition quality even when MusicXML is valid.
- Force composition plan + lyric prosody map before XML.
- Explicit regenerate-from-plan rule (no note-patching).
