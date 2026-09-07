# Upgrade changelog

Lưu: `runs/upgrade/2026-09-07-van-dieu-tho-viet/changelog.md`

---

## Summary

- type: curator
- one_line: Bổ sung trang kiến thức về vần (rhyme) và thể thơ (lục bát, song
  thất lục bát, 5/7/8 chữ, tự do) dùng khi viết lời tiếng Việt — kho hiện có
  `KNOW.VI.TONE-MELODY` (thanh điệu ↔ giai điệu) nhưng chưa có trang nào nói
  về cách gieo vần / chọn thể thơ, dù `KNOW.LYRICS.CRAFT` có nhắc "tứ thơ"
  mà không đi sâu phần vần/điệu.

## Changes

| action | path (under proposed/docs/m-guide/) | product_issue_targeted | needs_approval | notes |
|--------|--------------------------------------|-------------------------|----------------|-------|
| add | knowledge/vietnamese/rhyme-meter.md | Lời bài hát tiếng Việt thiếu hướng dẫn gieo vần / chọn thể thơ nền → AI dễ viết lời không có sơ đồ vần rõ ràng hoặc ép vần sai nghĩa | true | Trang mới, `status: draft`; toàn bộ nội dung xếp loại **hint** (không có constraint XML/schema-hard mới); có 1 dòng nhắc lại constraint bản quyền đã tồn tại ở `KNOW.LYRICS.CRAFT` |
| update | catalog.yml | Catalog cần trỏ tới trang mới để AI Bước 3 tìm được qua tag `vietnamese, lyrics` | true | Thêm 1 entry `KNOW.VI.RHYME-METER`; bump `version: "1.1" → "1.2"` |

## Sources (web)

Chỉ liệt kê URL **đã thực sự tham khảo**. Không bắt buộc phải có.

```text
- none (no external refs)
```

Ghi chú: nội dung trang mới được viết từ kiến thức nội bộ về vần/thể thơ
tiếng Việt (khái niệm bằng/trắc, vần chính/vần thông, lục bát, thơ 5/7/8
chữ) — không tra cứu web trong lượt chạy này (web search đang tắt trong
phiên làm việc). Vì vậy không có URL ngoài để ghi; nếu sau này có tham khảo
thêm tài liệu ngôn ngữ học / prosody tiếng Việt, phải thêm URL cụ thể vào
`sources` của trang và vào mục này trước khi merge.

## Merge

Chỉ áp dụng vào `docs/m-guide/` khi user yêu cầu rõ. Xem `pipeline/merge-policy.md`.
Cả 2 mục trên đều `needs_approval: true` — không tự active.
