---
id: KNOW.VI.TONE-MELODY
type: knowledge
status: active
version: "1.1"
tags: [compose, vietnamese, lyrics, melody]
serves-steps: [3]
sources:
  - "https://cs.nyu.edu/~nhan/full_paper_vs2.032p1_02.pdf"
  - "https://www.research.ed.ac.uk/en/publications/tone-melody-correspondence-in-vietnamese-popular-song/"
last-updated: "2026-09-07"
---

# Tiếng Việt — thanh điệu ↔ giai điệu

> **AI:** Bắt buộc đọc khi `primary_language = Vietnamese`. Không bỏ qua im lặng. Thống kê nghiên cứu dưới đây là **hint**, không phải luật cứng.

## Dùng ở bước nào

- Bước 3 — gán lời vào giai điệu.
- Bước 4 — giữ contour thanh khi chuyển bè nếu có.

## Constraints

- Không cố ý đặt đường nét giai điệu **ngược** thanh điệu làm **đảo nghĩa rõ** ở từ khóa / hook khi còn phương án hợp lý khác.
- Nếu user yêu cầu rõ `tone_melody_compatibility`, ưu tiên khớp thanh hơn “hát cho tiện”.
- Mọi tradeoff (lệch thanh vì motif / yêu cầu khác) phải ghi vào `COMPOSITION_NOTES`.

## Hints

### Hướng pitch theo thanh

| Thanh | Hướng pitch gợi ý | Ghi chú |
|-------|-------------------|---------|
| ngang | ổn định / giữ cao độ | có thể hơi lên nhẹ cuối câu |
| sắc | đi lên hoặc đích cao | thường ở điểm nhấn |
| huyền | đi xuống hoặc đích thấp | tránh kéo lên làm nghe như sắc |
| hỏi | xuống rồi lên (V / dual note) | |
| ngã | gãy / nhấn, thường lên có “gãy” | phân biệt rõ hơn ở giọng Bắc |
| nặng | thấp, ngắn, nặng | tránh kéo dài |

### Parallel / contrary motion (xu hướng mô tả)

Trong nhạc Việt phổ thông, hướng pitch **cùng chiều** chuyển thanh (parallel) thường gặp hơn hướng ngược (contrary). Ưu tiên parallel ở từ khóa; contrary chỉ khi có lý do nghệ thuật rõ và không đảo nghĩa.

| Loại | Định nghĩa | Khuyến nghị |
|------|------------|-------------|
| Parallel | pitch cùng hướng chuyển thanh | ưu tiên |
| Oblique | một bên giữ, một bên chuyển | cho phép |
| Contrary | pitch ngược hướng chuyển thanh | hạn chế ở hook |

### Giọng Bắc–Nam

- Bắc: hỏi / ngã tách rõ hơn → thể hiện rõ hơn nếu dialect Bắc.
- Nam: hỏi / ngã gần nhau hơn → linh hoạt hơn, vẫn tránh đảo nghĩa.

### Hook vs từ chức năng

- Hook / từ khóa: giữ nghĩa chặt.
- Từ chức năng (và, thì, mà…): linh hoạt hơn vì motif.

## Cách áp dụng (Bước 3)

1. Phân tích thanh từng âm tiết.
2. Đánh dấu hook cần bảo vệ nghĩa.
3. Phác contour ưu tiên parallel + bảng thanh.
4. Ghi tradeoff vào notes nếu lệch.

## Ví dụ ngắn (tự viết)

- “đi” (ngang) → “về” (huyền): giữ rồi xuống (parallel). Đưa “về” lên cao hơn “đi” dễ nghe như “vé” → tránh.

## Related

- `KNOW.LYRICS.CRAFT`, `KNOW.MELODY.CONTOUR`, `STYLE.VN.VPOP-BALLAD`
