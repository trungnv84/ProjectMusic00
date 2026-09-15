# ROADMAP — Melody Objective System (rút gọn từ đề xuất ideas-upgrade-1.md)

> Mỗi gói dưới đây là một lượt **curator hoặc improver độc lập** (đọc `prompts/curator.md` hoặc
> `prompts/improver.md` trước khi làm). Output của mỗi gói: một thư mục riêng
> `runs/upgrade/<YYYY-MM-DD-slug>/` với `STATUS.md`, `changelog.md`, `MERGE.md`,
> `proposed/docs/m-guide/...` (mirror path kho gốc). **Không ai được tự merge vào `docs/m-guide/`.**
> Người nhận việc nên hoàn thành **theo đúng thứ tự Gói 1 → 6** vì các gói sau phụ thuộc gói trước.

## Nguyên tắc chung cho mọi gói (đọc trước khi làm bất kỳ gói nào)

1. **Kiểm tra trùng lặp trước khi tạo trang mới.** Kho đã có: `knowledge/vietnamese/tone-melody.md`,
   `knowledge/lyrics/lyric-melody-fit.md`, `knowledge/melody/{contour,phrase-structure,motif-development,
   composition-planning}.md`, `knowledge/lyrics/hook-prechorus-bridge.md`. Nếu nội dung đề xuất trong
   `ideas-upgrade-1.md` trùng >50% với trang đã có → **mở rộng trang đó** (bump version, thêm `Related`), không tạo
   file mới cùng chủ đề.
2. **"Weighted random" trong ideas-upgrade-1.md phải viết lại thành checklist quyết định có lý do**, không phải xác
   suất thật (AI không chạy code random). Ví dụ format chấp nhận được:
   ```
   Bước chọn objective (không phải xác suất thật):
   1. Đọc genre + mood + lyric intent.
   2. Từ objective_pool của genre, chọn 1 primary — ghi lý do bằng 1 câu.
   3. Chọn 2–4 secondary — ưu tiên objective KHÔNG conflict với primary (xem bảng compatible_with).
   4. Nếu hai bài cùng genre/mood ra cùng một tổ hợp objective nhiều lần liên tiếp trong phiên làm việc,
      chủ động đổi ít nhất 1 secondary để tránh công thức hoá.
   ```
3. **Không thêm "đọc bắt buộc" tràn lan.** Chỉ Tier 1 (Gói 2) mới được liệt vào fetch mặc định của
   `pipeline/step-03-compose.md`. Tier 2/3 chỉ fetch khi Objective Selector (Gói 1) chọn tới.
4. Mọi trang mới đi theo `meta/page-template.md` sẵn có của kho, không tự bịa cấu trúc khác.
5. Nguồn: nếu tham khảo thêm bên ngoài, ghi URL cụ thể vào `sources` — không dùng nguồn mơ hồ.

---

## Gói 1 — Objective Selector + schema (làm trước tiên, việc quan trọng nhất)

**Vì sao làm trước:** đây là cơ chế quyết định *khi nào* các trang Gói 2–5 được đọc. Làm nội dung trước rồi
mới làm cơ chế chọn sẽ phải sửa lại toàn bộ fetch-list sau này.

**Output:**
- `docs/m-guide/meta/melody-objectives.schema.md` (mới) — schema mô tả một "objective" (id, category,
  useful_for, compatible_with, conflicts_with, section_affinity, evaluation) — rút gọn từ mục #29 trong
  `ideas-upgrade-1.md`, bỏ phần `intensity: low/medium/high` nếu không ai dùng đến trong Gói 2–3 (tránh field chết).
- `docs/m-guide/knowledge/melody/objective-selection.md` (mới) — quy trình chọn objective theo genre/mood/
  section, viết theo dạng checklist có lý do (xem nguyên tắc #2 ở trên), **không** dùng ngôn ngữ xác suất
  thật. Bao gồm khái niệm `objective_budget` (primary: 1, secondary: 2–4, avoid: 0–3) và `negative
  objectives` (`AVOID_*`) từ mục #26–27 ideas-upgrade-1.md.
- Patch `pipeline/step-03-compose.md`: chèn bước "Objective Selector" giữa bước 1 (parse request) và bước 2
  (invent) hiện tại — **không xoá** yêu cầu invent hook cell / catchiness / piano texture đã có, chỉ thêm
  bước chọn objective trước khi invent.
- Patch `artifacts/composition-notes.template.md`: thêm khối `melody_design` (primary_objective,
  secondary_objectives, objective_evidence, avoided_objectives) — rút gọn từ mục #34 ideas-upgrade-1.md, bỏ
  `section_objectives` chi tiết (để Gói 5 xử lý riêng, tránh một khối quá to).
- Patch `catalog.yml`: 2 entry mới (`META.MELODY-OBJECTIVES-SCHEMA`, `KNOW.MELODY.OBJECTIVE-SELECTION`).

**Không làm trong gói này:** không viết nội dung của từng objective riêng lẻ (đó là Gói 2–4) — Gói 1 chỉ là
cơ chế + schema, có thể test bằng cách trỏ tạm vào 2 objective đã có sẵn: `catchiness` (đã có) và một
objective giả lập `emotional_contour` (placeholder, hoàn thiện ở Gói 2).

**Ước lượng quy mô:** 2 trang mới (schema nhỏ, ~100 dòng mỗi trang) + 3 patch nhỏ. Phù hợp 1 người làm 1 lượt.

---

## Gói 2 — Tier 1 core mechanics, phần A (singability + emotional-contour + tension-release)

**Phụ thuộc:** Gói 1 đã xong (cần biết schema để viết đúng format).

**Output:**
- `docs/m-guide/knowledge/melody/singability.md` (mới, genuinely thiếu — hiện tessitura/range chỉ nằm rải
  rác trong `contour.md`/`phrase-structure.md`). Nội dung từ mục #2 ideas-upgrade-1.md: quãng dễ hát, stepwise vs
  leap, breath point, phân biệt "dễ hát" vs "nhàm chán". Objective id: `singability`.
- `docs/m-guide/knowledge/melody/emotional-contour.md` (mới, thiếu thật). Nội dung mục #4: rising/falling
  contour → cảm xúc, nhưng viết dưới dạng *tendencies*, không công thức cứng — đúng tinh thần ideas-upgrade-1.md đã tự
  cảnh báo ("Không nên biến thành công thức cứng"). Objective id: `emotional_contour`.
- `docs/m-guide/knowledge/melody/tension-release.md` (mới, thiếu thật). Nội dung mục #5.
- Mỗi trang có khối front-matter theo `melody-objectives.schema.md` của Gói 1 (id, category, useful_for,
  compatible_with, conflicts_with, section_affinity).
- Patch `catalog.yml`: 3 entry mới, tag `[compose, melody]`.

**Không làm:** không đụng `pipeline/step-03-compose.md` hay `objective-selection.md` — chỉ nội dung trang.

**Ước lượng quy mô:** 3 trang cỡ trung bình (~120–180 dòng mỗi trang). Phù hợp 1 người làm 1 lượt.

---

## Gói 3 — Tier 1 core mechanics, phần B (melodic-rhythm + melodic-contrast-mở-rộng + hook-types)

**Phụ thuộc:** Gói 1.

**Output:**
- `docs/m-guide/knowledge/melody/melodic-rhythm.md` (mới, thiếu thật) — tách "rhythmic identity" khỏi
  `catchiness.md` thành trang riêng đủ sâu (mục #7 ideas-upgrade-1.md): straight/syncopated/swung/triplet, và đặc biệt
  phân biệt **rhythmic identity ≠ rhythmic complexity**.
- **Không tạo** `melodic-contrast.md` mới — thay vào đó **mở rộng** `docs/m-guide/knowledge/melody/
  contour.md` và `phrase-structure.md` hiện có: thêm bảng các trục contrast (register, rhythmic density,
  note duration, phrase length, articulation, syllable density...) từ mục #6 ideas-upgrade-1.md vào phần "Hints" hiện
  có của 2 trang này. Lý do: 2 trang đã sở hữu đúng chủ đề, tránh 2 nguồn sự thật cho cùng một khái niệm.
- `docs/m-guide/knowledge/melody/hook-types.md` (mới, **giá trị cao, không trùng gì đã có**) — taxonomy hook
  (melodic/rhythmic/lyrical/vocal/harmonic/production/call-response) từ mục #18 ideas-upgrade-1.md. Nhấn mạnh: không
  phải bài nào cũng cần melodic hook — liên kết với Gói 1 (`objective-selection.md` chọn `primary_hook.type`).

**Ước lượng quy mô:** 1 trang mới lớn (hook-types), 1 trang mới vừa (melodic-rhythm), 2 patch mở rộng trang
cũ. Phù hợp 1 người làm 1 lượt.

---

## Gói 4 — Tier 2 style/genre mechanics (genre-melody-profiles + cadence + call-response)

**Phụ thuộc:** Gói 1, nên làm sau khi Gói 2–3 xong (cần đã có đủ objective id để trỏ tới trong bảng genre
profile).

**Output:**
- `docs/m-guide/knowledge/melody/genre-melody-profiles.md` (mới, **giá trị cao nhất trong Tier 2** — đúng
  yêu cầu gốc "random vài yếu tố phù hợp với dòng nhạc"). Nội dung mục #23 ideas-upgrade-1.md, nhưng **chỉ liệt kê
  genre đã có style card tương ứng trong `knowledge/styles/` của kho** — không bịa thêm genre chưa được
  dùng, để tránh mục lục treo (dead reference).
- `docs/m-guide/knowledge/melody/cadence.md` (mới, thiếu thật, mục #17).
- `docs/m-guide/knowledge/melody/call-response.md` (mới, mục #19) — có thể gộp chung 1 file với `hook-types.md`
  nếu người làm Gói 3 thấy hợp lý hơn tách riêng; **người làm Gói 4 quyết định cuối cùng** sau khi đọc
  `hook-types.md` đã merge.

**Không làm trong gói này (đẩy sang backlog / Tier 3 — chỉ làm khi có genre cụ thể cần):** `vocal-character.md`,
`melisma.md`, `ornamentation.md`, `modal-melody.md`, `vocal-rhythm.md`, `melody-harmony-relationship.md`,
`melodic-simplicity.md`, `melodic-complexity.md`, `melodic-predictability.md`. Đây là các trang mục #10–16,
20–22 trong ideas-upgrade-1.md — hoãn lại vì hiện kho chưa có yêu cầu compose thật nào thuộc jazz/EDM/melisma-heavy
genre; làm trước sẽ là suy đoán, không bám bằng chứng (khác tinh thần improver/curator của kho).

**Ước lượng quy mô:** 2–3 trang mới cỡ trung bình.

---

## Gói 5 — Section-level objectives + composition-notes schema hoàn thiện

**Phụ thuộc:** Gói 1–3 (cần đủ objective id để ví dụ hoá theo section).

**Output:**
- Patch `docs/m-guide/knowledge/melody/composition-planning.md`: thêm phần "section_objectives" (mục #25
  ideas-upgrade-1.md) — mapping Verse/Pre/Chorus/Bridge/Final → objective gợi ý, nhưng ghi rõ đây là **gợi ý mặc định
  có thể override**, không phải luật cứng (đúng tinh thần trang này vốn đã "checklist nội bộ").
- Patch `artifacts/composition-notes.template.md` (tiếp nối Gói 1): hoàn thiện khối `melody_design.
  section_objectives` đã để trống ở Gói 1.
- Patch `docs/m-guide/knowledge/melody/musical-quality-gate.md`: cân nhắc thêm ngưỡng mềm (hint, không
  `needs-approval` cứng) kiểm tra "có ghi rõ lý do chọn objective không" — **không** thêm ngưỡng cứng mới
  buộc PASS/FAIL trừ khi đã test qua ít nhất 1 run thật.

**Ước lượng quy mô:** 3 patch vừa, không có trang mới.

---

## Gói 6 — Kiểm chứng bằng run thật (bắt buộc trước khi coi hệ thống "xong")

**Phụ thuộc:** Gói 1–3 tối thiểu (Gói 4–5 có thể làm song song).

**Việc:** Không phải viết doc — chạy thử **chức năng 1 (compose)** ít nhất 2–3 bài khác genre/mood bằng bộ
tài liệu mới (sau khi user đã duyệt merge Gói 1–3), rồi viết `run-review.md` đối chiếu: các bài có thực sự
"khác triết lý melody" như mục tiêu ban đầu không, hay Objective Selector vẫn hội tụ về cùng một tổ hợp?
Nếu hội tụ → quay lại Gói 1, sửa `objective-selection.md` (nguyên tắc #2), không viết thêm trang Tier 3.

**Ước lượng quy mô:** 2–3 lượt compose (`runs/compose/...`) + 1 `run-review.md` tổng hợp.

---

## Bảng tóm tắt để phân việc

| Gói | Phụ thuộc | Số trang mới | Số patch | Độ ưu tiên |
|---|---|---|---|---|
| 1 — Objective Selector + schema | không | 2 | 3 | **Cao nhất — làm trước tiên** |
| 2 — singability / emotional-contour / tension-release | Gói 1 | 3 | 1 | Cao |
| 3 — melodic-rhythm / hook-types / mở rộng contrast | Gói 1 | 2 | 3 | Cao |
| 4 — genre-melody-profiles / cadence / call-response | Gói 1, nên sau Gói 2–3 | 2–3 | 0 | Trung bình |
| 5 — section objectives + notes schema | Gói 1–3 | 0 | 3 | Trung bình |
| 6 — Kiểm chứng bằng run thật | Gói 1–3 | 0 (run-review) | 0 | **Bắt buộc trước khi đóng dự án** |

**Backlog (chưa lên gói, chỉ làm khi có nhu cầu genre cụ thể):** vocal-character, melisma, ornamentation,
modal-melody, vocal-rhythm, melody-harmony-relationship, melodic-simplicity, melodic-complexity,
melodic-predictability — tổng ~9 trang mục #10–16, 20–22 trong `ideas-upgrade-1.md` gốc.
