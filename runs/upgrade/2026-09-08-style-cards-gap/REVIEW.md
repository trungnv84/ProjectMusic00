# REVIEW — 2026-09-08-style-cards-gap

Reviewed before merge. Verdict: **merge 9 cards + genre-textures; DO NOT overwrite catalog with proposed snapshot.**

## Critical

| Issue | Detail | Action |
|-------|--------|--------|
| Proposed `catalog.yml` stale | version **1.2** / 40 pages vs current **1.4** / 53 pages | Rebuild: keep current catalog, append 9 style entries → **1.5** |
| Would delete if naïve `cp` | 22 ids missing in proposed, incl. `STYLE.ROCK.GENERIC`, motif-development, chord-substitution, MusicXML pages, vocal/rhythm pages… | Never copy proposed catalog as-is |

## Per-card verdict

| # | Card | Verdict | Notes |
|---|------|---------|-------|
| 1 | `STYLE.VN.BOLERO-TRU-TINH` | **Merge** | Template OK; labels artist/era only; no copyrighted music |
| 2 | `STYLE.VN.DAN-CA-CONTEMPORARY` | **Merge** | Good; labels are region/genre (fine) |
| 3 | `STYLE.VN.VPOP-UPTEMPO` | **Merge** | Clear split from ballad; artist labels OK as labels |
| 4 | `STYLE.VN.ACOUSTIC-INDIE` | **Merge** | Dropped `Chillies` (more indie-rock); kept Ngọt/CHH/Vũ. |
| 5 | `STYLE.EDM.DANCE-POP-GENERIC` | **Merge** | Solid; era labels not specific songs |
| 6 | `STYLE.RNB.SOUL-GENERIC` | **Merge** | Added Related → chord-sub + vocal phrasing |
| 7 | `STYLE.JAZZ.POP-LIGHT` | **Merge** | Scope kept light; Related → chord-sub |
| 8 | `STYLE.VN.HIPHOP-MELODIC` | **Merge** | Related was `ROCK.GENERIC` (wrong) → VPOP-UPTEMPO + EDM |
| 9 | `STYLE.FOLK.ACOUSTIC-GENERIC` | **Merge** | Overlaps VN acoustic indie by design (generic vs VN) |

## Soft / accepted

- Overlap folk-generic ↔ vn-acoustic-indie: OK (locale + lyric feel khác).
- `genre-textures` row cũ “Dân ca / trữ tình VN” vẫn còn cạnh bolero + dân ca đương đại — giữ làm hint tổng; không bắt buộc xóa.
- Filename `hiphop-melodic.md` vs id `STYLE.VN.HIPHOP-MELODIC`: chấp nhận.
- `status: draft` → `active` khi merge (đồng bộ style cards đã có).

## Copyright check

Không thấy lời / melody / riff / progression chép bài cụ thể. `works_or_artists_as_labels` dùng đúng vai trò nhãn.
