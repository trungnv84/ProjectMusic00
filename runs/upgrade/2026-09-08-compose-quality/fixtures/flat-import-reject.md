# Fixture — flat-import-reject (arranged MusicXML)

**Source:** `runs/compose/2026-09-08-vi-yeu-la-vui-v2/04-arranged.musicxml`  
**Symptom (Flat):** “Error while importing the score. The format is incorrect.”

## Audit (2026-09-08)

- XML well-formed (`ElementTree` parse OK).
- 7 parts, measures 1–74 continuous; duration totals OK on sample.
- **FAIL profile:** ≥20× `<direction-type>` chứa đồng thời `<words>` + `<dynamics>`.
- **FAIL profile:** P1/P2 có `midi-instrument` nhưng **không** có `score-instrument` cùng id.
- **Risk:** P3 drums nhiều `score-instrument` + `unpitched` (Flat nhạy).

## Doc mapping

- `KNOW.MUSICXML.ANTI-PATTERNS` #11, #12, #13
- `KNOW.MUSICXML.SAFE-PATTERNS` (direction tách; score-instrument cặp)
- `KNOW.MUSICXML.IMPORTER-PROFILE`

## Correct AI response

Fix direction-type + score-instrument; đơn giản hóa drums hoặc bỏ; re-export arranged. Không tuyên bố “MusicXML hợp lệ” chỉ vì XML parse được.
