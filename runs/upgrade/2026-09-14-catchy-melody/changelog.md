# Changelog — upgrade 2026-09-14-catchy-melody

## Mục tiêu

Khắc phục lỗi sản phẩm: **giai điệu rời rạc / lặp nhàm / không catchy** ở run `2026-09-08-nang-som-tinh-khoi` (và các run tương tự). Nâng AI thành “nhạc sĩ thật” bằng cách buộc tham khảo đặc trưng giai điệu catchy (short memorable cell, clear contour, rhythmic identity, controlled repetition-with-variation, early hook) và siết quality gate + composition notes.

## Thay đổi đề xuất

### 1. Knowledge mới: `knowledge/melody/catchiness.md` (KNOW.MELODY.CATCHINESS)

- **Lỗi nhắm**: giai điệu không catchy, thiếu hook memorable, lặp nhàm hoặc rời rạc.
- Nội dung: đặc trưng catchy (từ songwriting practice + nghiên cứu earworm), checklist invent hook, constraints + hints, liên kết anti-patterns / invention / quality-gate.
- `needs-approval: false` (hint + constraint mềm; không lock pitch cụ thể).

### 2. Củng cố `knowledge/melody/melody-invention.md`

- Thêm bước bắt buộc “thiết kế hook cell trước” + tham chiếu catchiness.
- Nhấn: sau khi có cell hay → mới lặp/có chủ đích biến tấu; cấm phrase rời rạc không motif.

### 3. Củng cố `knowledge/melody/anti-patterns.md`

- Thêm anti-pattern: “phrase rời rạc không motif” và “lặp không có identity” (repetition without memorable cell).
- Liên kết catchiness.

### 4. Củng cố `knowledge/melody/musical-quality-gate.md`

- Thêm ngưỡng cứng `REQUIRE_CATCHY_HOOK` (hook cell ≤ 5–6 nốt khác nhau hoặc 2–4 bar rõ contour + rhythmic identity; xuất hiện sớm ở Chorus; notes phải khai báo).
- Bảng điểm bắt buộc có `hook_distinctiveness`, `rhythmic_variety`, `melodic_coherence` (không rời rạc).
- FAIL nếu thiếu mô tả cell hoặc evidence catchiness.

### 5. Composition-notes contract (qua gate + step-03)

- Bắt buộc trong `03-composition-notes.md`:
  - `hook_melody_cell`: mô tả pitch sequence + rhythm cell (không chỉ “có hook”).
  - `motifs_declared`: 1–2 motif chính.
  - Evidence catchiness ngắn (contour type, limited pitch set?, syncopation/rest?).

### 6. Pipeline / prompt

- `pipeline/step-03-compose.md`: thêm DOC_REFS bắt buộc KNOW.MELODY.CATCHINESS; playbook “invent hook cell trước”.
- `artifacts/compose-prompt.template.md` (và mirror trong proposed): MUST invent theo CATCHINESS + INVENTION; notes phải có hook cell.
- Catalog: đăng ký page mới.

## Sources (tham khảo khi soạn đề xuất)

- https://songwritingauthority.com/melody-writing-techniques/
- https://musiciangoods.com/en-gb/blogs/music-theory/what-makes-a-song-catchy
- https://orphiq.com/resources/how-to-write-a-melody
- https://www.gold.ac.uk/news/scientists-find-key-to-writing-catchy-pop-hits/ (Jakubowski et al. earworm features)
- https://en.wikipedia.org/wiki/Musical_earworm (tóm tắt đặc trưng)
- Knowledge nội bộ hiện có: melody-invention, anti-patterns, quality-gate, contour, motif-development

## Không thay đổi

- Không sửa `docs/m-guide/` gốc trong lượt này.
- Không nhét giai điệu / lời bản quyền.
- Không thay đổi style card V-Pop ballad (chỉ bổ sung lớp catchiness chung).

## Hướng dẫn user sau khi merge (nếu chấp nhận)

1. Merge proposed → docs/m-guide (theo MERGE.md).
2. Chạy lại Bước 3 trên compose run mới (hoặc re-run cùng request) với compose-prompt đã cập nhật DOC_REFS + MUST catchiness.
3. Kiểm notes: phải thấy `hook_melody_cell` + gate PASS có evidence.