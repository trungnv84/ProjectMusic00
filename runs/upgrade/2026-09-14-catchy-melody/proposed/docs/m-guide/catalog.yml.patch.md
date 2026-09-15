# Catalog patch — thêm KNOW.MELODY.CATCHINESS

Chèn entry sau `KNOW.MELODY.INVENTION` (hoặc gần các trang melody):

```yaml
  - id: KNOW.MELODY.CATCHINESS
    path: docs/m-guide/knowledge/melody/catchiness.md
    tags: [compose, melody]
    serves-steps: [3]
    summary: Đặc trưng giai điệu catchy — short cell, clear contour, rhythmic identity, controlled repetition; bắt buộc invent hook cell đáng nhớ
```

Cập nhật thêm:

- `KNOW.MELODY.INVENTION` summary (tuỳ chọn): thêm “+ catchiness”
- `KNOW.MELODY.ANTI-PATTERNS` summary: thêm “phrase rời rạc, lặp không identity”
- `KNOW.MELODY.QUALITY-GATE` summary: thêm “REQUIRE_CATCHY_HOOK”
- `version` / `updated` của catalog → `"1.11"` / `"2026-09-14"`

Khi merge: áp dụng thủ công vào `docs/m-guide/catalog.yml` (không ghi đè toàn file nếu có thay đổi khác).