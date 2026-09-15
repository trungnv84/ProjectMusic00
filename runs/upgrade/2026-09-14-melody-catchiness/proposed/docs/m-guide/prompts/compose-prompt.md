# compose-prompt.md

> Prompt template cho Bước 3.

## Bắt buộc
- lyrics_by_section
- music_quality_gate (gồm REQUIRE_PIANO_TEXTURE + piano_texture)
- catchiness_gate (xem knowledge/compose/melody-catchiness.md §4)
- motif_map: liệt kê motif gốc + các biến thể theo section
- hook_brief: mô tả hook (số nốt, rhythm identity, vị trí, số lần lặp)

## CATCHY_REFERENCES (bắt buộc điền)
Trước khi sáng tác, AI phải điền:
1. Nhãn phong cách catchy (2–3): ............
2. Đặc trưng trừu tượng rút ra (2–3): ............
3. Áp dụng vào motif/hook như thế nào: ............

TUYỆT ĐỐI KHÔNG chép nốt/lời/hook cụ thể. Chỉ dùng nhãn + đặc trưng.

## Self-critique (bắt buộc)
Sau khi viết lead sheet, AI phải:
1. Đọc lại melody như người nghe lần đầu.
2. Trả lời: "Sau 2 lần nghe, tôi có nhẩm lại được câu nào không?"
3. Nếu KHÔNG → sửa motif/hook và lặp lại.
