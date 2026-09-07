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

# Tiếng Việt — thanh điệu ↔ giai điệu (chi tiết)

> **AI:** Bắt buộc đọc khi `primary_language = Vietnamese`. Đây là **ưu tiên mạnh** (constraint mềm–cứng tùy CONFLICTS với yêu cầu user); không bỏ qua im lặng.

## Dùng ở bước nào
- Bước 3 (sáng tác lead sheet) — áp dụng khi gán lời vào giai điệu.
- Bước 4 (phối khí) — ít ảnh hưởng, nhưng cần giữ contour thanh điệu khi chuyển bè.

---

## Constraints (bắt buộc)

### C1. Không đặt đường nét giai điệu ngược thanh điệu làm đảo nghĩa rõ
Không cố ý đặt contour giai điệu **ngược** với thanh điệu ở từ khóa / hook khi có phương án hợp lý khác. Ví dụ: thanh hỏi/ngã bị kéo sai hướng khiến từ nghe thành từ khác.

### C2. Không hy sinh toàn bộ luật thanh chỉ để "hát cho tiện"
Nếu user yêu cầu rõ `tone_melody_compatibility`, phải ưu tiên khớp thanh. Nếu không, vẫn phải ghi tradeoff vào `COMPOSITION_NOTES`.

### C3. Ưu tiên parallel motion hơn contrary motion
Nghiên cứu trên 20 ca khúc nhạc Việt phổ thông cho thấy tỷ lệ *parallel motion* đạt 77%; *contrary motion* bị hạn chế.  
→ Khi chuyển từ âm tiết này sang âm tiết tiếp theo, hướng lên/xuống của giai điệu nên cùng hướng với chuyển thanh của lời nói (parallel), tránh đi ngược hướng (contrary) trừ khi có lý do nghệ thuật rõ ràng.

| Loại chuyển động | Định nghĩa | Mức độ ưu tiên |
|------------------|------------|----------------|
| **Parallel** | Hướng pitch trùng với hướng chuyển thanh | Ưu tiên cao nhất |
| **Oblique** | Một bên giữ nguyên, bên kia chuyển | Cho phép |
| **Contrary** | Hướng pitch ngược với hướng chuyển thanh | Hạn chế tối đa |

### C4. Ghi rõ tradeoff khi phải lệch
Nếu vì motif mạnh hoặc yêu cầu user mà phải vi phạm C1–C3, ghi vào `COMPOSITION_NOTES` với lý do.

---

## Hints (gợi ý, không bắt buộc)

### H1. Hướng pitch khuyến nghị cho từng thanh (mở rộng)

| Thanh | Mô tả ngắn | Hướng pitch gợi ý | Ghi chú |
|-------|------------|-------------------|---------|
| **ngang** | bằng phẳng | ổn định / giữ nguyên cao độ | Có thể hơi lên nhẹ ở cuối câu |
| **sắc** | lên cao, dứt khoát | đi lên 2–3 bậc hoặc đích cao hơn | Thường rơi vào nốt cao trong ô nhịp |
| **huyền** | xuống thấp, kéo dài | đi xuống 2–3 bậc hoặc đích thấp hơn | Kết thúc ở vùng trầm |
| **hỏi** | xuống rồi lên, gãy | contour xuống–lên (V-shape) | Có thể dùng 2 nốt: nốt thấp ngắn + nốt cao hơn |
| **ngã** | gãy, nhấn, lên có "gãy" | lên nhanh rồi giữ hoặc nhấn mạnh | Thường kết hợp với ornament (grace note) |
| **nặng** | thấp, ngắn, nặng | thấp, duration ngắn, dynamic mạnh | Tránh kéo dài |

### H2. Biến thể giọng Bắc–Nam
- **Giọng Bắc:** thanh hỏi và ngã phân biệt rõ, ngã thường có "gãy" lên mạnh hơn. → Khi sáng tác cho giọng Bắc, cần thể hiện rõ sự khác biệt hỏi/ngã.
- **Giọng Nam:** hỏi và ngã thường hòa trộn, thanh ngã ít "gãy" hơn. → Có thể linh hoạt hơn, nhưng vẫn giữ nguyên tắc tránh đảo nghĩa.

### H3. Xử lý từ khóa / hook
- **Từ khóa, hook, tiêu đề:** ưu tiên giữ nghĩa tuyệt đối → áp dụng constraint C1–C3 chặt chẽ.
- **Từ chức năng (và, thì, mà, với…):** có thể linh hoạt hơn, ưu tiên motif giai điệu.

---

## Cách áp dụng khi sáng tác (Bước 3)

1. **Phân tích thanh từng âm tiết** trong lời (dùng bảng H1).
2. **Xác định từ khóa / hook** cần bảo vệ nghĩa tuyệt đối.
3. **Phác thảo contour giai điệu** sao cho:
   - Parallel motion với chuyển thanh ở mức tối đa (C3).
   - Tránh contrary motion ở từ khóa (C1).
4. **Điều chỉnh nốt** để khớp hướng pitch với bảng H1, ưu tiên từ khóa.
5. **Ghi tradeoff** vào `COMPOSITION_NOTES` nếu phải lệch (C4).

---

## Ví dụ ngắn (tự viết, không trích tác phẩm có bản quyền)

- Lời: "Anh **đi** về" — thanh "đi" là ngang (ổn định), "về" là huyền (xuống).  
  → Giai điệu nên giữ cao độ ở "đi", sau đó đi xuống ở "về" (parallel).
- Nếu đặt "về" lên cao hơn "đi" (contrary), từ "về" có thể nghe như "vé" (sắc) — đảo nghĩa. → Cấm.

---

## Conflicts / related
- `conflicts-with:` (không)
- `related:`
  - `KNOW.LYRICS.CRAFT` — tích hợp thanh điệu vào viết lời
  - `KNOW.MELODY.CONTOUR` — contour giai điệu tổng thể
  - `STYLE.VN.VPOP-BALLAD` — thanh điệu trong ballad V-Pop
