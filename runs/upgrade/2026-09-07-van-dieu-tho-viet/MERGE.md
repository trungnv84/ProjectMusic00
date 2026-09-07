# MERGE

- from: runs/upgrade/2026-09-07-van-dieu-tho-viet/proposed/
- to: docs/m-guide/
- files:
  - docs/m-guide/knowledge/vietnamese/rhyme-meter.md
  - docs/m-guide/catalog.yml
- needs_approval_items:
  - add knowledge/vietnamese/rhyme-meter.md (trang mới, status: draft)
  - update catalog.yml (thêm entry KNOW.VI.RHYME-METER, version 1.1 → 1.2)
- instruction: Chỉ thực hiện khi user yêu cầu merge rõ ràng (ví dụ: "merge",
  "áp dụng", "sửa tài liệu gốc", "chấp nhận đề xuất"). Khi merge: copy từng
  file ở trên đè lên `docs/m-guide/...` tương ứng, xác nhận cả 2 mục
  `needs_approval` đã được user chốt, rồi cập nhật `STATUS.md` của run này
  thành `status: merged` kèm ngày.
