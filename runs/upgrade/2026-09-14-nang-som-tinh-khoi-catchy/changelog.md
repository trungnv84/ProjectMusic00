# Changelog — 2026-09-14-nang-som-tinh-khoi-catchy

Liên quan: `runs/compose/2026-09-08-nang-som-tinh-khoi/` (xem `run-review.md` trong thư mục này).

## 1. `docs/m-guide/knowledge/melody/catchiness-and-hook-craft.md` (mới, `KNOW.MELODY.CATCHINESS`)

- **Lỗi sản phẩm nhắm tới:** giai điệu rời rạc / lặp nhàm chán / không catchy.
- **Vì sao:** kho trước đó chỉ có tiêu chí *phủ định* (anti-patterns — cái gì cấm). Không có tiêu chí *tích
  cực* mô tả cơ chế khiến một giai điệu dễ nhớ (hook economy, repetition-with-variation, rhythmic hook, tầm
  cữ hát được, vị trí hook nhất quán, tương phản trước hook). User yêu cầu đúng chỗ này: cần AI thực sự "vào
  vai nhạc sỹ" và tự vận dụng hiểu biết chung về sáng tác hit-song — trang mới cung cấp checklist đó, khái
  quát hoá kỹ thuật (không copy nốt/lời của bài có bản quyền cụ thể).
- **needs-approval:** true (trang mới thêm ngưỡng cứng mới trong quality-gate liên đới).

## 2. `docs/m-guide/knowledge/melody/anti-patterns.md` (v1.1 → v1.2)

- **Lỗi sản phẩm nhắm tới:** giai điệu lặp lại nhàm chán (Verse 1 ≡ Verse 2 skeleton; Chorus Final ≡ Chorus 1
  y nguyên).
- **Thay đổi:**
  - Rule #2 ("Chorus copy"): đổi mô tả định tính "gần như cùng pitch sequence" thành ngưỡng cụ thể hơn
    (≥90% note trùng pitch **và** rhythm theo cùng thứ tự) để AI tự chấm rõ ràng, giảm khả năng bỏ qua.
  - Thêm rule #9 ("Verse-pair clone qua reprise") — bắt lỗi khi so Verse 1 với Verse 2 theo **cặp câu tương
    ứng**, không chỉ trong nội bộ từng Verse (rule #1 chỉ bắt ≥3 câu liên tiếp *trong cùng* Verse).
  - Thêm ví dụ thật (không phải fixture giả) từ `runs/compose/2026-09-08-nang-som-tinh-khoi/` để minh hoạ hai
    rule trên bằng số đo cụ thể.

## 3. `docs/m-guide/knowledge/melody/musical-quality-gate.md` (v1.2 → v1.3)

- **Lỗi sản phẩm nhắm tới:** gate không bắt được bài không catchy vì thiếu ngưỡng cho "catchy" và vì notes
  của run gốc không điền bảng điểm nên gate coi như chưa từng chạy.
- **Thay đổi:** thêm ngưỡng cứng `REQUIRE_CATCHINESS_SELFCHECK` (trỏ tới trang mới), cập nhật câu PASS-condition
  và Related để trỏ tới `KNOW.MELODY.CATCHINESS`.

## 4. `docs/m-guide/pipeline/step-03-compose.md` (v1.4 → v1.5)

- **Lỗi sản phẩm nhắm tới:** quy trình mô tả đúng nhưng thực thi bỏ qua — run gốc xuất `03-composition-notes.md`
  thiếu `motifs_declared`, `hook_melody_cell`, bảng điểm `music_quality_gate`, mà vẫn giao cho user (STATUS
  step3 còn ghi "pending" trong khi file đã tồn tại — dấu hiệu gate chưa từng đóng dấu).
- **Thay đổi:**
  - Thêm fetch bắt buộc trang catchiness mới.
  - Chèn bước catchiness self-check *trước khi* viết note đầu tiên của Chorus (tiêu chí tích cực, không chỉ
    né anti-pattern).
  - **Khoá cứng bước 5:** thiếu/rút gọn bất kỳ khối bắt buộc nào trong composition notes (không theo schema
    template) → tự động coi `music_quality_gate: FAIL`, cấm ghi STATUS step3 = done.
  - Bước 6: thêm `REQUIRE_CATCHINESS_SELFCHECK` vào danh sách phải PASS, và liệt kê rõ các điều kiện FAIL
    (thiếu piano_texture / thiếu evidence catchiness / vi phạm anti-patterns).

## 5. `docs/m-guide/catalog.yml` (v1.10 → v1.11)

- Thêm entry `KNOW.MELODY.CATCHINESS`.
- Cập nhật summary của `KNOW.MELODY.QUALITY-GATE` và `PIPE.STEP-03` để phản ánh ngưỡng mới.

## Sources

- `runs/compose/2026-09-08-nang-som-tinh-khoi/03-song.musicxml` — phân tích measure-by-measure (nội bộ, đọc
  trực tiếp part P1, không dùng công cụ ngoài).
- `runs/compose/2026-09-08-nang-som-tinh-khoi/03-composition-notes.md`, `STATUS.md` — đối chiếu thiếu field
  bắt buộc.
- `docs/m-guide/knowledge/melody/melody-invention.md` — nguồn kỹ thuật songwriting đã có sẵn trong kho
  (`sources: https://songwritingauthority.com/melody-writing-techniques/`), dùng lại nguyên trạng, không thêm
  URL mới chưa kiểm chứng trong phiên này.

Không có thay đổi nào ghi vào `docs/m-guide/` gốc — toàn bộ nằm trong `proposed/` ở trên, chờ user duyệt.
