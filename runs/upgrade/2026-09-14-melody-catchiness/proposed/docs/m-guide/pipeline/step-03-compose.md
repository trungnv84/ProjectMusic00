# step-03-compose.md

> Mô tả quy trình thực hiện Bước 3.

## Gate bắt buộc
- music_quality_gate
- REQUIRE_PIANO_TEXTURE + piano_texture
- Catchiness Gate (knowledge/compose/melody-catchiness.md §4)
- motif_map + hook_brief khớp với notes

## Trình tự mới
1. Đọc CATCHY_REFERENCES.
2. Viết motif + hook_brief.
3. Viết lead sheet.
4. Self-critique (xem compose-prompt.md).
5. Chạy music_quality_gate → nếu FAIL, viết lại TOÀN BỘ lead sheet.
6. Chạy Catchiness Gate → nếu FAIL, quay lại bước 2.
7. Chỉ khi cả 2 gate PASS mới đóng Bước 3.
