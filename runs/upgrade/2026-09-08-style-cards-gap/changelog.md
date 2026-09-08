# Upgrade changelog

---

## Summary

- type: curator
- one_line: Bổ sung 9 style cards còn thiếu và cập nhật bảng genre-textures/catalog để `GENRE` / `REFERENCE_STYLE` có các đích sử dụng rõ cho Bước 3/4.

## Changes

| action | path (under proposed/docs/m-guide/) | product_issue_targeted | needs_approval | notes |
|--------|--------------------------------------|-------------------------|----------------|-------|
| add | docs/m-guide/knowledge/styles/vn-bolero-tru-tinh.md | thiếu phong cách bolero / nhạc vàng / trữ tình cũ | true | Style card mới; chỉ đặc trưng khái quát, không copy tác phẩm |
| add | docs/m-guide/knowledge/styles/vn-dan-ca-contemporary.md | thiếu dân ca đương đại / ngũ cung pha Tây | true | Style card mới; giữ ranh giới hint vs constraint |
| add | docs/m-guide/knowledge/styles/vn-vpop-uptempo.md | thiếu V-Pop uptempo ngoài ballad | true | Tách rõ khỏi `STYLE.VN.VPOP-BALLAD` |
| add | docs/m-guide/knowledge/styles/vn-acoustic-indie.md | thiếu acoustic / indie Việt nhẹ | true | Style card mới; organic texture, không encyclopedia |
| add | docs/m-guide/knowledge/styles/edm-dance-pop-generic.md | thiếu EDM / dance-pop generic | true | Style card mới; tập trung groove/build/drop phục vụ sáng tác |
| add | docs/m-guide/knowledge/styles/rnb-soul-generic.md | thiếu R&B / soul generic | true | Style card mới; tập trung pocket, voice leading, vocal phrasing |
| add | docs/m-guide/knowledge/styles/jazz-pop-light.md | thiếu jazz-pop nhẹ | true | Không mở rộng thành encyclopedia jazz |
| add | docs/m-guide/knowledge/styles/hiphop-melodic.md | thiếu melodic hip-hop / rap-pop | true | Đặt làm tùy chọn chất lượng ổn trong run này |
| add | docs/m-guide/knowledge/styles/folk-acoustic-generic.md | thiếu folk acoustic generic | true | Đặt làm tùy chọn chất lượng ổn trong run này |
| update | docs/m-guide/knowledge/arrangement/genre-textures.md | hint thể loại chưa khớp catalog style mới | true | Bổ sung 9 dòng ngắn; vẫn là hint |
| update | docs/m-guide/catalog.yml | catalog chưa liệt kê style cards mới | true | bump version 1.1 → 1.2; updated 2026-09-08 |

## Sources (web)

```text
- none (no external refs)
```

## Merge

Chỉ áp dụng vào `docs/m-guide/` khi user yêu cầu rõ. Xem `pipeline/merge-policy.md`.
