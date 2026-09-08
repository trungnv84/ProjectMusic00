# Changelog — 2026-09-08 AI Music Quality Improver

## Proposed patches

| Patch | Sản phẩm lỗi nhắm tới | Nội dung |
|---|---|---|
| `pipeline/step-03-compose.md` | giai điệu, lời, hòa âm, piano, prompt yếu | Chuyển Bước 3 thành internal generate→critic→rewrite; gate phải dựa evidence từ artifact. |
| `knowledge/melody/musical-quality-gate.md` | giai điệu, rhythm, musical quality | Thêm objective evidence: phrase fingerprints, repetition ratio, rhythmic diversity, development, và artifact-derived piano check. |
| `knowledge/melody/melody-invention.md` | giai điệu quá đều / lập lại | Thêm phrase-level goals, tension/release, rhythmic displacement, variation quotas ở dạng hint + gate evidence. |
| `knowledge/lyrics/craft.md` | lời nhạt / ít ý nghĩa | Thêm semantic progression, specificity, non-paraphrase, character/action/detail checks. |
| `knowledge/harmony/piano-reduction.md` | phần đệm piano trống / pad | Cấm self-report-only; yêu cầu evidence theo từng sung section và phân biệt “harmonic presence” với “musical accompaniment”. |

## Merge policy
- Không merge.
- Đây chỉ là proposal trong `runs/upgrade/2026-09-08-ai-music-quality-improver/`.
- Khi merge, review từng constraint mới vì một số ngưỡng mới dùng `needs-approval: true`.

## Sources
- https://github.com/trungnv84/ProjectMusic00/blob/master/docs/m-guide/for-ai.md
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/prompts/improver.md
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/meta/standards.md
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/pipeline/step-03-compose.md
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/melody/musical-quality-gate.md
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/melody/melody-invention.md
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/lyrics/craft.md
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/harmony/piano-reduction.md
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/runs/compose/2026-09-08-vi-yeu-la-vui-v3/03-song.musicxml
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/runs/compose/2026-09-08-vi-yeu-la-vui-v4/03-song.musicxml
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/runs/compose/2026-09-08-vi-yeu-la-vui-v2/04-arranged.musicxml
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/runs/compose/2026-09-08-vi-yeu-la-vui-v3/03-composition-notes.md
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/runs/compose/2026-09-08-vi-yeu-la-vui-v4/03-composition-notes.md
- https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/runs/compose/2026-09-08-vi-yeu-la-vui-v2/04-arrangement-notes.md
