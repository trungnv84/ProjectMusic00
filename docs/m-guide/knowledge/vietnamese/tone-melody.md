---
id: KNOW.VI.TONE-MELODY
type: knowledge
status: active
version: "1.0"
tags: [compose, vietnamese, lyrics, melody]
serves-steps: [3]
sources: []
last-updated: "2026-09-07"
---

# Tiếng Việt — thanh điệu ↔ giai điệu

> **AI:** Bắt buộc đọc khi `primary_language = Vietnamese`. Đây là **ưu tiên mạnh** (constraint mềm–cứng tùy CONFLICTS với yêu cầu user); không bỏ qua im lặng.

## Constraints

- Không cố ý đặt đường nét giai điệu **ngược** thanh điệu làm đảo nghĩa rõ (ví dụ thanh hỏi/ngã bị kéo sai hướng khiến từ nghe thành từ khác) khi có phương án hợp lý khác.
- Không hy sinh toàn bộ luật thanh chỉ để “hát cho tiện” nếu user yêu cầu rõ `tone_melody_compatibility`.

## Hints — hướng giai điệu khuyến nghị

| Thanh | Hướng pitch gợi ý |
|-------|-------------------|
| ngang | ổn định / hơi ngang |
| sắc | đi lên hoặc đích cao |
| huyền | đi xuống hoặc đích thấp |
| hỏi | xuống rồi lên (hoặc dual note) |
| ngã | gãy / nhấn, thường lên có “gãy” |
| nặng | thấp, ngắn, nặng |

Khi mâu thuẫn với motif mạnh: ưu tiên **giữ nghĩa từ** ở từ khóa / hook; linh hoạt hơn ở từ chức năng.

## Cách áp dụng

1. Phân tích thanh từng âm tiết lời.
2. Điều chỉnh contour giai điệu cho khớp bảng trên ở mức hợp lý.
3. Ghi tradeoff vào COMPOSITION_NOTES nếu phải lệch.
