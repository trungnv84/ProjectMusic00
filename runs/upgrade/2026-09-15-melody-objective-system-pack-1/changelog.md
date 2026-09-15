# Changelog — Melody Objective System

## 2026-09-15 — Package 1

| Đề xuất | Lỗi sản phẩm nhắm tới | Lý do |
|---|---|---|
| `knowledge/melody/objective-metrics.md` | Giai điệu bị đánh giá chủ quan; near-repetition và section contrast khó tái kiểm tra | Định nghĩa canonical phrase representation, các metric và threshold có thể truy nguyên từ MusicXML. |
| `knowledge/melody/musical-quality-gate.md` | Gate có threshold name nhưng chưa có audit contract đủ tái lập | Bắt buộc `objective_melody_audit` với số liệu + evidence trước `PASS`. |
| `pipeline/step-03-compose.md` | Step 3 có thể export MusicXML rồi tự chấm bằng tính từ | Buộc objective audit sau XML và trước status `done`; thiếu audit = FAIL. |
| `catalog.yml` | Knowledge mới không được DOC_REFS chọn tự động | Thêm catalog entry cho objective melody metrics. |

## Package boundary

Không bao gồm multi-candidate selection, lyric semantic gate, piano redesign hoặc Step 4 changes.

## Sources
- `https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/for-ai.md`
- `https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/catalog.yml`
- `https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/melody/melody-invention.md`
- `https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/melody/anti-patterns.md`
- `https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/melody/musical-quality-gate.md`
- `https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/pipeline/step-03-compose.md`
