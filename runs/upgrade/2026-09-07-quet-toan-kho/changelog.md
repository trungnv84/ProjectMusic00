# Upgrade changelog

Lưu: `runs/upgrade/2026-09-07-quet-toan-kho/changelog.md`

---

## Summary

- type: curator
- one_line: Chủ đề "tất cả" — đọc toàn bộ `docs/m-guide/` (trừ `archive/`:
  `for-ai.md`, `catalog.yml`, mọi `meta/`, `pipeline/`, `prompt-craft/`,
  `prompts/`, `artifacts/`, `knowledge/**`) để tìm lỗ hổng kiến thức phục
  vụ sáng tác/phối khí. Tìm thấy 4 lỗ hổng, mỗi lỗ hổng một file riêng
  theo yêu cầu tách file trong changelog. Đề xuất "vần/điệu thơ tiếng
  Việt" đã có ở run riêng trước đó (`2026-09-07-van-dieu-tho-viet/`), **không**
  lặp lại ở đây.

## Changes

| action | path (under proposed/docs/m-guide/) | product_issue_targeted | needs_approval | notes |
|--------|--------------------------------------|-------------------------|----------------|-------|
| add | knowledge/musicxml/performance-markings.md | Schema `song-request-schema.md` có nhóm `PERFORMANCE` (dynamics, articulation, expression, phrasing) nhưng chưa có trang nào dạy mã hóa trong MusicXML → AI dễ bỏ qua sắc thái diễn tấu hoặc mã hóa sai (dynamics tự do thay vì phần tử chuẩn) | true | `status: draft`; có constraint mới về enum hợp lệ của `<dynamics>`/`<articulations>`/`<wedge>` |
| add | knowledge/musicxml/lyrics-encoding.md | `KNOW.VOCAL.WRITING` chỉ nói khái niệm "lyric khớp âm tiết", chưa có cú pháp `syllabic`/`extend`/`elision` cụ thể → dễ xuất `<lyric>` sai schema khi có melisma | true | `status: draft`; có constraint mới về giá trị hợp lệ `syllabic`, cách dùng `extend`, cấm `<lyric>` rỗng |
| add | knowledge/vocal/backing-harmonies.md | Kho chỉ có hướng dẫn viết **một** giai điệu hát chính (`KNOW.VOCAL.WRITING`), chưa có kiến thức về bè hát khi phối khí Bước 4 → phối khí dễ chỉ dựa nhạc cụ, bỏ qua lớp bè giọng người | true | `status: draft`; constraint mới: part bè phải đủ measure + lyric không để trống |
| add | knowledge/harmony/modulation.md | Schema có trường `HARMONY.modulation` nhưng chưa có trang kỹ thuật nào dạy cách chuyển giọng (direct, pivot chord, chromatic mediant, sequential) → AI dễ bỏ qua hoặc chuyển giọng tùy tiện không theo emotional arc | true | `status: draft`; constraint mới: `<key>` mới phải đặt đúng đầu measure nơi đổi giọng |
| update | catalog.yml | Catalog cần trỏ tới 4 trang mới để Bước 2 (sinh DOC_REFS) và Bước 3/4 tìm được qua tag | true | Thêm 4 entry; bump `version: "1.1" → "1.2"` |

## Sources (web)

Chỉ liệt kê URL **đã thực sự tham khảo**. Không bắt buộc phải có.

```text
- none (no external refs)
```

Ghi chú: nội dung 4 trang trên viết từ kiến thức nội bộ về lý thuyết âm
nhạc phổ thông và cú pháp MusicXML (dynamics/articulation/lyric/key —
các phần tử và thuộc tính chuẩn của định dạng MusicXML 4.0) — không tra
cứu web trong lượt chạy này vì web search đang tắt trong phiên làm việc.
Nếu sau này có tham khảo thêm spec MusicXML chính thức hoặc tài liệu lý
thuyết âm nhạc, phải thêm URL cụ thể vào `sources` của từng trang và vào
mục này trước khi merge.

## Không đề xuất (đã cân nhắc, quyết định bỏ qua)

- `runs/README.md` (repo root) — tồn tại và mở được (không phải link hỏng
  như nghi ngờ ban đầu); không cần sửa.
- Template `artifacts/compose-prompt.template.md`,
  `arrange-prompt.template.md`, `composition-notes.template.md` — đã tồn
  tại, chỉ không nằm trong `catalog.yml` (đúng theo thiết kế: các template
  này được playbook `pipeline/` trỏ trực tiếp, không cần qua catalog).
- Thêm style-card mới (ví dụ dân ca Bắc Bộ, V-pop dance) — cân nhắc nhưng
  **không** đưa vào run này để giữ mỗi run một phạm vi kiểm soát được;
  có thể là chủ đề cho một lượt curator riêng nếu bạn muốn.

## Merge

Chỉ áp dụng vào `docs/m-guide/` khi user yêu cầu rõ. Xem `pipeline/merge-policy.md`.
Cả 5 mục trên đều `needs_approval: true` — không tự active.
