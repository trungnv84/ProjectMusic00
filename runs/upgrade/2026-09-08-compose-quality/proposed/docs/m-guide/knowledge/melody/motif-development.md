---
id: KNOW.MELODY.MOTIF-DEVELOPMENT
type: knowledge
status: active
version: "1.1"
tags: [compose, melody]
serves-steps: [3]
sources: []
last-updated: "2026-09-08"
---

# Phát triển motif và sequence trong giai điệu

> **AI:** Đọc ở Bước 3 khi đã có motif nhưng cần biến tấu qua các câu/section. Không dùng motif có bản quyền.

## Dùng ở bước nào

- Bước 3a — khai báo motif cells trong plan.
- Bước 3 — phát triển giai điệu từ motif ngắn sau khi đã chọn contour cơ bản ([contour](contour.md)).

## Constraints

- Không sao chép motif / hook của tác phẩm được nêu trong `REFERENCE_STYLE`.
- Motif đã khóa trong lead sheet không đổi ở Bước 4 chỉ để “phát triển thêm”.
- **Phải khai báo** pitch+rhythm cells trong `03a-composition-plan.md` / notes (`motifs_declared`) **trước** khi xuất MusicXML.
- Chỉ lặp motif rộng rãi **sau** khi hook/motif chính đã memorable (`REQUIRE_CHORUS_HOOK`).
- **Final Chorus:** bắt buộc ≥1 kỹ thuật phát triển thật từ bảng dưới — **cấm** chỉ nâng register rồi gọi là development.

## Hints

Motif là đơn vị ý nhạc ngắn (thường 2–4 nốt, kèm tiết tấu đặc trưng). Một bài thường xoay quanh 1–2 motif chính.

| Kỹ thuật | Mô tả | Gợi ý dùng |
| -------- | ----- | ---------- |
| Lặp lại (repetition) | Giữ cao độ + tiết tấu | Neo nhận diện |
| Dịch chuyển (sequence) | Lặp motif ở bậc khác | Tăng/giảm năng lượng |
| Phóng đại (augmentation) | Tăng trường độ | Mở rộng, lắng |
| Thu nhỏ (diminution) | Giảm trường độ | Tăng mật độ / năng lượng |
| Đảo ngược (inversion) | Đảo chiều quãng | Tương phản trong cùng ý |
| Thoái hóa (fragmentation) | Chỉ lấy một phần motif | Cầu nối sang ý mới |
| Thêm nốt (embellishment) | Nốt lướt / hoa mỹ | Làm giàu mà vẫn nhận ra gốc |
| Đổi cadence / opening / pickup | Đổi cách vào hoặc kết câu | Final Chorus, Verse 2 |

**Sequence:** dịch chuyển lặp ở các bậc khác nhau. Sequence lên thường đẩy cảm xúc (pre/chorus); sequence xuống thường hạ năng lượng (bridge/outro) — xu hướng, không phải luật.

Với lời tiếng Việt, motif nên tôn trọng trọng âm và thanh điệu — xem [tone-melody](../vietnamese/tone-melody.md) và [lyric-melody-fit](../lyrics/lyric-melody-fit.md).

## Cách áp dụng

1. Chốt motif chính trong 3a (thường xuất hiện sớm ở verse hoặc hook).
2. Chọn 2–3 kỹ thuật từ bảng; không cần dùng hết.
3. Áp dụng có chủ đích qua verse 2 / pre / chorus / final.
4. Kiểm tra: sau biến tấu, motif gốc vẫn nhận ra được; không vi phạm [anti-patterns](anti-patterns.md).

## Ví dụ ngắn (tự viết)

- Motif gốc: `C–E–G` (nốt đen)
- Sequence lên: `D–F♯–A` → `E–G♯–B`
- Fragment: `C–E` rồi mở sang hướng khác

## Related

- `KNOW.MELODY.CONTOUR`
- `KNOW.MELODY.PHRASE-STRUCTURE`
- `KNOW.MELODY.ANTI-PATTERNS`
- `KNOW.VI.TONE-MELODY`
