---
id: KNOW.MELODY.CONTOUR
type: knowledge
status: active
version: "1.2"
tags: [compose, melody]
serves-steps: [3]
sources: []
last-updated: "2026-09-16"
---
# Giai điệu — contour & motif

> **AI:** Đọc ở Bước 3 khi thiết kế giai điệu vocal. Không copy giai điệu tác phẩm có bản quyền. **Không** dùng trang này như bảng nốt mẫu — xem [melody-invention](melody-invention.md).
## Constraints

- Âm vực / tessitura phải khớp `VOCAL` nếu đã DEFINED.
- Không viết giai điệu sao chép hook tác phẩm được nêu trong `REFERENCE_STYLE` (chỉ lấy đặc trưng khái quát từ thẻ).
- Contour Verse và Chorus phải **nghe khác** (hướng và/hoặc khoảng nhảy và/hoặc nhịp) — không chỉ cùng hình sóng ở cao độ khác.
- Khi hai phrase có cùng contour family, phải có ít nhất một trục khác biệt có chủ đích nếu chúng giữ cùng chức năng trong section.
## Hints

- Motif ngắn (2–4 ô nhịp) + **biến tấu** tốt hơn một chuỗi cố định gắn mọi lời.
- Verse: bước liền nhiều hơn *là xu hướng*, không phải bắt buộc mọi câu giống nhau.
- Chorus: mở khoảng / nhấn cao hơn nếu intensity tăng — và cần một câu hook riêng.
- Để chỗ lấy hơi; tránh câu hát dài không nghỉ ở tempo trung bình.
- Memorability = lặp motif **đã hay**, không = copy nguyên verse.

### Trục contrast có thể dùng

| Trục | Có thể thay đổi như thế nào | Mục đích |
|---|---|---|
| `register` | thấp ↔ trung ↔ cao | thay đổi emotional/section focus |
| `interval_profile` | stepwise ↔ controlled leaps | đổi kinetic feel |
| `contour` | rising ↔ arch ↔ falling ↔ plateau | đổi phrase identity |
| `rhythmic_density` | thưa ↔ dày | tạo space hoặc drive |
| `note_duration` | dài ↔ ngắn | đổi cảm giác kéo/đẩy |
| `phrase_length` | ngắn ↔ dài | tạo contrast và breath architecture |
| `articulation` | legato ↔ detached/accented | thay đổi delivery |
| `syllable_density` | ít syllable/note ↔ dày hơn | cân lyric load |

Không cần thay mọi trục cùng lúc. Chọn 1–3 trục có lý do là đủ để tránh clone.

## Cách áp dụng

1. Chọn register / range từ yêu cầu.
2. **Invent** motif verse và hook chorus (khác nhau) — ghi vào notes.
3. Chọn trục contrast giữa các section/phrase khi cần.
4. Khớp contour với thanh điệu nếu lời tiếng Việt ([tone-melody](../vietnamese/tone-melody.md)).
5. Kiểm anti-patterns trước khi khóa XML.

## Related

- `KNOW.MELODY.INVENTION`
- `KNOW.MELODY.MOTIF-DEVELOPMENT`
- `KNOW.MELODY.ANTI-PATTERNS`
- `KNOW.MELODY.MELODIC-RHYTHM`
- `KNOW.MELODY.PHRASE-STRUCTURE`
