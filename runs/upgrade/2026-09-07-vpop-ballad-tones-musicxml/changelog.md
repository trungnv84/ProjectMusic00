# Changelog — upgrade 2026-09-07
- type: curator
- one_line: Bổ sung chi tiết thanh điệu tiếng Việt, thẻ phong cách ballad V-Pop, và anti-pattern MusicXML mới

## Changes
| action | path (under proposed/docs/m-guide/) | product_issue_targeted | needs_approval | notes |
|--------|--------------------------------------|-------------------------|----------------|-------|
| update | knowledge/vietnamese/tone-melody.md | lời + giai điệu | true | Thêm parallel/contrary motion, dialect notes, ưu tiên giữ nghĩa hook |
| add    | knowledge/styles/vn-vpop-ballad.md | style card cho V-Pop ballad | true | Tách riêng khỏi pop-ballad-generic, bổ sung acoustic–electronic blend |
| update | knowledge/musicxml/anti-patterns.md | MusicXML validation | true | Thêm 5 anti-pattern mới từ thực tế validation |
| update | catalog.yml | metadata | true | Thêm entry STYLE.VN.VPOP-BALLAD, cập nhật version cho 2 trang updated |

## Sources (web)
- https://cs.nyu.edu/~nhan/full_paper_vs2.032p1_02.pdf — toneume, syllamelis, congruence
- https://www.research.ed.ac.uk/en/publications/tone-melody-correspondence-in-vietnamese-popular-song/ — parallel motion 77%, contrary motion disfavoured
- https://forums.steinberg.net/t/issues-with-musicxml-export/895215 — lyric extender lines gây lỗi schema
- https://musescore.org/en/comment/1138937 — ký tự `&` trong part-name gây fatal error
- https://musescore.org/en/comment/1221926 — `kind` rỗng thiếu "major" gây lỗi import

## Merge
Chỉ áp dụng vào `docs/m-guide/` khi user yêu cầu rõ. Xem `pipeline/merge-policy.md`.
