# Changelog — đánh giá đề xuất melody objective system

## 2026-09-15

| Hạng mục | Quyết định | Lý do |
|---|---|---|
| Objective Selector (ideas-upgrade-1.md #1, #29–34) | **Chấp nhận, ưu tiên cao nhất (Gói 1)** | Giải quyết đúng rủi ro "mọi bài catchy giống nhau"; khớp triết lý catalog-chọn-theo-nhu-cầu đã có sẵn trong `for-ai.md`. |
| `prosody.md` (ideas-upgrade-1.md #3) | **Từ chối tạo mới** | Trùng >70% với `knowledge/vietnamese/tone-melody.md` (v1.2, đã có nguồn Kirby & Ladd) + `knowledge/lyrics/lyric-melody-fit.md` (v1.0). Nếu cần bổ sung, mở rộng 2 trang này thay vì tạo trang thứ ba nói cùng chuyện. |
| `phrase-architecture.md` (ideas-upgrade-1.md #8) | **Từ chối tạo mới** | Trùng phần lớn `knowledge/melody/phrase-structure.md` (v1.1) đã có sẵn pickup/statement/cadence. |
| `melodic-contrast.md` (ideas-upgrade-1.md #6) | **Từ chối tạo mới, chuyển thành patch** | Trùng `contour.md` (constraint "Contour Verse/Chorus phải nghe khác") + `phrase-structure.md`. Đưa vào Gói 3 dưới dạng mở rộng, không phải trang mới. |
| `singability.md`, `emotional-contour.md`, `tension-release.md`, `melodic-rhythm.md`, `hook-types.md` (ideas-upgrade-1.md #2, #4, #5, #7, #18) | **Chấp nhận, trang thật sự còn thiếu** | Không trùng trang nào hiện có; đã kiểm tra toàn bộ `knowledge/melody/*.md` hiện hành. |
| "Weighted random" objective selection (ideas-upgrade-1.md #33) | **Chấp nhận ý tưởng, bác bỏ cách diễn đạt** | AI trong hệ thống này là LLM đọc markdown, không chạy `random.sample()` có trọng số thật — nếu ghi nguyên văn "weighted random" sẽ tạo ảo tưởng về cơ chế không tồn tại. Viết lại thành checklist ra quyết định có lý do (xem ROADMAP.md nguyên tắc #2). |
| 40-objective taxonomy đầy đủ + Tier 3 (ideas-upgrade-1.md #10–16, 20–22, 31) | **Hoãn (backlog)** | Suy đoán trước khi có bằng chứng từ run thật — khác tinh thần improver/curator của kho (đề xuất bám theo lỗi/nhu cầu quan sát được, không viết hàng loạt trước). Chỉ mở khi có yêu cầu compose thuộc genre cụ thể cần (jazz, EDM, melisma-heavy...). |
| Kiểm chứng bằng run thật trước khi coi hệ thống hoàn chỉnh | **Thêm mới (Gói 6), không có trong ideas-upgrade-1.md gốc** | ideas-upgrade-1.md chỉ đề xuất viết tài liệu, không đề cập việc test xem Objective Selector có thực sự tạo ra melody khác triết lý hay không. Đây là bước bắt buộc theo đúng vòng lặp improver (viết xong không có nghĩa là đạt). |

## Nguồn

- `ideas-upgrade-1.md` — góp ý user cung cấp trong phiên này (không có URL bên ngoài kèm theo).
- Đối chiếu trực tiếp với: `docs/m-guide/catalog.yml`, `docs/m-guide/knowledge/melody/*.md`,
  `docs/m-guide/knowledge/vietnamese/tone-melody.md`, `docs/m-guide/knowledge/lyrics/lyric-melody-fit.md`,
  `docs/m-guide/knowledge/lyrics/hook-prechorus-bridge.md` (đọc trực tiếp trong repo, không qua công cụ ngoài).

## Không có thay đổi nào ghi vào `docs/m-guide/` gốc trong lượt này

Toàn bộ nội dung ở trên là **kế hoạch (ROADMAP.md)**, không phải patch sẵn sàng merge. Từng Gói 1–6 khi được
thực hiện phải tạo `runs/upgrade/<id>/` riêng theo đúng `prompts/curator.md` / `prompts/improver.md`, và chỉ
merge vào `docs/m-guide/` khi user duyệt từng gói theo `pipeline/merge-policy.md`.

## 2026-09-15 (bổ sung) — pack-1 không khớp Gói 1

`runs/upgrade/2026-09-15-melody-objective-system-pack-1/` được người khác nộp với tên gần giống Gói 1
nhưng phạm vi thực tế là **objective audit metrics** (đo lường tái kiểm tra), không phải **Objective
Selector** (Gói 1 thật trong ROADMAP.md). Đã merge phần audit-metrics vào `docs/m-guide/` như một bổ sung
riêng (xem `STATUS.md` của pack-1), nhưng **Gói 1 thật vẫn chưa có ai làm** — Gói 2, 3, 5 vẫn đang bị chặn,
chưa nên giao. Người làm Gói 1 tiếp theo cần đọc đúng mục "Gói 1" trong `ROADMAP.md`, không dựa vào pack-1.

## 2026-09-16 — Gói 2 đã merge (dưới tên thư mục "melody-objective-package-2")

`runs/upgrade/2026-09-16-melody-objective-package-2/` — nội dung đúng Gói 2 (singability, emotional-contour,
tension-release) trong ROADMAP.md, đã merge vào `docs/m-guide/knowledge/melody/` + `catalog.yml` (v1.13).
Metadata trong STATUS.md của pack này tự khai `package: 2`, khớp đúng — nhưng người giao việc gọi nhầm là
"Gói 1" khi giao. **Gói 1 thật (Objective Selector: `melody-objectives.schema.md` +
`objective-selection.md` + patch `step-03-compose.md`/`composition-notes.template.md`/`catalog.yml`) vẫn
chưa có ai làm** — 3 trang vừa merge hiện chưa được fetch/chọn bởi cơ chế nào trong pipeline. Cần làm Gói 1
thật trước khi chạy Gói 6 (kiểm chứng bằng run thật).
