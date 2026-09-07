# Hướng dẫn merge — curator 2026-09-07

## Các file cần merge vào docs/m-guide/
1. `knowledge/vietnamese/tone-melody.md` — ghi đè
2. `knowledge/styles/vn-vpop-ballad.md` — thêm mới
3. `knowledge/musicxml/anti-patterns.md` — ghi đè
4. `catalog.yml` — cập nhật (thêm entry STYLE.VN.VPOP-BALLAD, tăng version cho 2 trang updated)

## Kiểm tra trước merge
- [ ] Các URL trong `sources` còn truy cập được
- [ ] Không có xung đột với các trang khác (kiểm tra `conflicts-with`)
- [ ] `needs-approval: true` — cần user xác nhận trước khi áp dụng

## Lệnh merge (tham khảo)
```bash
cp runs/upgrade/2026-09-07-vpop-ballad-tones-musicxml/proposed/docs/m-guide/knowledge/vietnamese/tone-melody.md docs/m-guide/knowledge/vietnamese/tone-melody.md
cp runs/upgrade/2026-09-07-vpop-ballad-tones-musicxml/proposed/docs/m-guide/knowledge/styles/vn-vpop-ballad.md docs/m-guide/knowledge/styles/vn-vpop-ballad.md
cp runs/upgrade/2026-09-07-vpop-ballad-tones-musicxml/proposed/docs/m-guide/knowledge/musicxml/anti-patterns.md docs/m-guide/knowledge/musicxml/anti-patterns.md
cp runs/upgrade/2026-09-07-vpop-ballad-tones-musicxml/proposed/docs/m-guide/catalog.yml docs/m-guide/catalog.yml
```

## Rollback
Nếu cần rollback, git revert các file trên hoặc phục hồi từ commit trước.

## Ghi chú sau review (workspace agent)
Xem `REVIEW.md` trong thư mục run này. Merge thực tế có thể là **bản đã chỉnh**, không nhất thiết copy nguyên proposed.
