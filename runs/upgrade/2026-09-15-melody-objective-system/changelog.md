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
