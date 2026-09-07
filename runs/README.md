# runs/ — kết quả chạy trong editor

Không phải kho gốc. Kho chuẩn: [`docs/m-guide/`](../docs/m-guide/).

## Hai loại run

| Thư mục | Chức năng | Nội dung |
|---------|-----------|----------|
| `compose/<run-id>/` | 1 — sáng tác | meta-prompt, 2 prompt, MusicXML, notes, STATUS |
| `upgrade/<run-id>/` | 2 — nâng cấp | run-review (improver), changelog, `proposed/`, STATUS |

`<run-id>` = `YYYY-MM-DD-<slug>` (slug từ tên bài hoặc chủ đề).

## Cấm

- Không ghi đè `docs/m-guide/` khi đang chạy chức năng 1 hoặc 2.
- Đề xuất nâng cấp chỉ nằm trong `upgrade/<id>/proposed/` (mirror path).
- Merge vào gốc **chỉ khi user yêu cầu rõ** — xem [`docs/m-guide/pipeline/merge-policy.md`](../docs/m-guide/pipeline/merge-policy.md).
- Không merge bài hát (`compose/`) vào `m-guide`.

## Cây mẫu compose

```text
compose/2026-09-07-mua-thu/
  STATUS.md
  01-meta-prompt.md
  02-compose-prompt.md
  02-arrange-prompt.md
  03-song.musicxml
  03-composition-notes.md
  04-arranged.musicxml
  04-arrangement-notes.md
```

## Cây mẫu upgrade

```text
upgrade/2026-09-07-thanh-dieu/
  STATUS.md
  run-review.md          # nếu improver
  changelog.md
  MERGE.md
  proposed/
    docs/m-guide/...
```

## STATUS

- Compose: bước 1–4 = pending | done | skipped; ghi song_request.
- Upgrade: type = curator | improver; status = proposed | merged | rejected.
