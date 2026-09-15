# Upgrade STATUS

- type: curator
- status: proposed (roadmap only — chưa có patch nào trong `proposed/`)
- layers: [knowledge, pipeline, catalog, meta]
- date: 2026-09-15
- source: góp ý bên ngoài (`ideas-upgrade-1.md`, user cung cấp), đã được đánh giá lại và thu gọn scope
- merge: not applicable — tài liệu này là ROADMAP.md (kế hoạch chia việc), không phải patch sẵn sàng merge

## Scope

Người dùng gửi một đề xuất kiến trúc lớn: thay "catchy" bằng một hệ **Melody Objective System** (Objective
Selector chọn tập mục tiêu theo genre/section thay vì luôn ép `REQUIRE_CATCHY_HOOK`), kèm đề xuất ~40
objective / 30 trang knowledge mới.

Sau khi đối chiếu với kho hiện có (`catalog.yml`, `knowledge/melody/*`, `knowledge/vietnamese/tone-melody.md`,
`knowledge/lyrics/lyric-melody-fit.md`, `knowledge/lyrics/hook-prechorus-bridge.md`), kết luận:

- Ý tưởng kiến trúc **Objective Selector** đáng làm — giải quyết đúng rủi ro "mọi bài catchy theo cùng công thức".
- Quy mô 30+ trang là quá lớn để làm một lượt và **trùng lặp đáng kể** với trang đã có (prosody ≈ tone-melody
  + lyric-melody-fit; phrase-architecture ≈ phrase-structure; melodic-contrast ≈ contour + phrase-structure).
- "Weighted random" cần thiết kế lại thành checklist ra quyết định có lý do (AI không chạy code xác suất thật).

## Việc cần làm ngay (không phải curator này)

`ROADMAP.md` trong thư mục này chia công việc thành 6 gói (package) độc lập, mỗi gói tương đương một lượt
curator/improver riêng, output vào `runs/upgrade/<id>/proposed/docs/m-guide/...` theo đúng `merge-policy.md`.
Không gói nào được tự merge vào `docs/m-guide/` — chỉ merge khi user duyệt từng gói.
