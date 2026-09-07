# Template — upgrade changelog

Lưu: `runs/upgrade/2026-09-07-all-topics/changelog.md`

---

## Summary

- type: curator
- one_line: Bổ sung knowledge cho toàn bộ topic hiện có, ưu tiên các khoảng trống từ lyric → melody → harmony → rhythm → vocal → Vietnamese → arrangement → MusicXML; chưa merge.

## Changes

| action | path (under proposed/docs/m-guide/) | product_issue_targeted | needs_approval | notes |
|--------|--------------------------------------|-------------------------|----------------|-------|
| add | `docs/m-guide/knowledge/lyrics/prosody-and-rhyme.md` | lyric prosody / rhyme / trọng âm | true | Bổ sung quy trình áp dụng, không ép mọi bài phải có vần. |
| add | `docs/m-guide/knowledge/melody/phrase-structure.md` | phrase / cadence / điểm nhấn | true | Nối contour hiện có với cấu trúc câu nhạc. |
| add | `docs/m-guide/knowledge/harmony/functional-cadence-and-voicing.md` | functional harmony / cadence / voicing | true | Tách chức năng hòa âm khỏi việc chỉ chọn progression phổ biến. |
| add | `docs/m-guide/knowledge/rhythm-form/groove-and-syncopation.md` | groove / pulse / syncopation | true | Liên hệ rhythmic stress với lyric delivery. |
| add | `docs/m-guide/knowledge/vocal/phrasing-breath-and-melisma.md` | breath / phrasing / melisma | true | Bổ sung singability và xử lý tiếng Việt. |
| add | `docs/m-guide/knowledge/vietnamese/syllable-priority.md` | tradeoff giữa nghĩa / tone / rhythm / rhyme / motif | true | Framework ưu tiên; không biến thống kê thành hard rule. |
| add | `docs/m-guide/knowledge/arrangement/instrument-roles-and-register.md` | role / register / layer collision | true | Phân role trước instrument, tránh tranh vùng vocal. |
| add | `docs/m-guide/knowledge/arrangement/section-energy.md` | energy / density theo section | true | Framework 1–5 tương đối, không phải công thức genre. |
| add | `docs/m-guide/knowledge/musicxml/structure-and-voices.md` | voices / continuity / structural MusicXML | true | Bổ sung hướng dẫn structural trước validation. |
| add | `docs/m-guide/knowledge/musicxml/lyrics-and-notations.md` | lyric alignment / notation semantics | true | Xử lý melisma, tie/slur/dynamics theo semantics. |
| add | `docs/m-guide/knowledge/musicxml/validation-checklist.md` | thiếu checklist cuối pipeline | true | Checklist syntax + structure + semantic + handoff. |
| update | `docs/m-guide/catalog.yml` | catalog chưa trỏ các page mới | true | Catalog proposed version 1.2; không đụng catalog gốc. |

## Sources (web)

- none (no external refs)

## Merge

Chỉ áp dụng vào `docs/m-guide/` khi user yêu cầu rõ. Xem `pipeline/merge-policy.md`.
