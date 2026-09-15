# Run review — 2026-09-14-melody-catchiness

- compose_run: runs/compose/2026-09-08-nang-som-tinh-khoi/
- function: 2b improver
- error_class: melody-quality / catchiness

## Symptoms
- Giai điệu rời rạc, không có motif xuyên suốt.
- Lặp nguyên văn nhiều lần → nhàm.
- Không có hook nhận diện.
- Không catchy khi nghe lại.

## Root causes
1. Thiếu knowledge trang "catchiness" chuyên biệt.
2. compose-prompt không yêu cầu AI tham chiếu nhãn style catchy.
3. Không có gate riêng cho melody (Catchiness Gate).
4. song-request-schema thiếu CATCHY_REFERENCES & HOOK_BRIEF.
5. step-03-compose thiếu vòng self-critique.

## Proposed fixes
- Thêm knowledge/compose/melody-catchiness.md
- Thêm knowledge/compose/hook-craft.md
- Patch melody-invention.md (bổ sung mục "biến thể motif")
- Patch compose-prompt.md (thêm bắt buộc CATCHY_REFERENCES + Hook Brief)
- Patch step-03-compose.md (thêm Catchiness Gate + self-critique)
- Patch song-request-schema.md

## Risk / rollback
- Rủi ro: AI "hiểu sai" catchy → nhạc công thức. Giảm thiểu bằng nhấn mạnh "nhãn trừu tượng, không copy".
- Rollback: xoá 2 file NEW + revert 4 file PATCH từ proposed.
