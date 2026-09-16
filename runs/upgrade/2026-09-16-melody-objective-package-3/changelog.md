# Changelog — Melody Objective System / Package 3

## 2026-09-16

| Đề xuất | Lỗi sản phẩm nhắm tới | Lý do |
|---|---|---|
| `knowledge/melody/melodic-rhythm.md` | Giai điệu có thể đủ nốt nhưng rhythm đều đều, thiếu identity | Tách rhythmic identity thành kiến thức riêng; phân biệt identity với complexity và mô tả straight/syncopated/swung/triplet bằng đặc trưng có thể áp dụng. |
| Mở rộng `knowledge/melody/contour.md` | Các section/phrase dùng cùng một kiểu contour dù đổi cao độ | Bổ sung các trục contrast ở nơi contour đã là source-of-truth, tránh tạo trang trùng chủ đề. |
| Mở rộng `knowledge/melody/phrase-structure.md` | Phrase có cùng density, length và articulation nên nghe như clone | Bổ sung contrast ở phrase-level, gồm register, duration, density, phrase length, articulation và syllable density. |
| `knowledge/melody/hook-types.md` | Mặc định hóa mọi hook thành melodic hook | Cung cấp taxonomy hook theo melodic/rhythmic/lyrical/vocal/harmonic/production/call-response; cho phép hook không phải pitch hook. |
| `catalog.yml` | DOC_REFS không có entry cho knowledge mới | Thêm 2 entry knowledge mới; các trang mở rộng giữ nguyên ID catalog. |

## Sources

- Repository rules: `docs/m-guide/for-ai.md`
- Roadmap: `runs/upgrade/2026-09-15-melody-objective-system/ROADMAP.md`
- Existing knowledge: `docs/m-guide/knowledge/melody/catchiness.md`
- Existing knowledge: `docs/m-guide/knowledge/melody/contour.md`
- Existing knowledge: `docs/m-guide/knowledge/melody/phrase-structure.md`
- Existing knowledge: `docs/m-guide/knowledge/melody/motif-development.md`
- Existing run review: `runs/upgrade/2026-09-08-improver-song-quality-v2/run-review.md`

No external web sources were added; the package builds on repository-local knowledge and the roadmap.
