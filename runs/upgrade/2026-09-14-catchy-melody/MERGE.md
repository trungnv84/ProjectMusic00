# MERGE — 2026-09-14-catchy-melody

**Chỉ thực hiện khi user nói rõ: merge / áp dụng / chấp nhận đề xuất.**

## Thứ tự copy

```bash
# Từ root repo
cp -r runs/upgrade/2026-09-14-catchy-melody/proposed/docs/m-guide/* docs/m-guide/
```

Hoặc copy từng file:

1. `proposed/docs/m-guide/knowledge/melody/catchiness.md` → `docs/m-guide/knowledge/melody/catchiness.md` (mới)
2. `proposed/docs/m-guide/knowledge/melody/melody-invention.md` → ghi đè (patch)
3. `proposed/docs/m-guide/knowledge/melody/anti-patterns.md` → ghi đè (patch)
4. `proposed/docs/m-guide/knowledge/melody/musical-quality-gate.md` → ghi đè (patch)
5. `proposed/docs/m-guide/pipeline/step-03-compose.md` → ghi đè (patch nhẹ)
6. `proposed/docs/m-guide/artifacts/compose-prompt.template.md` → ghi đè (patch)
7. `proposed/docs/m-guide/catalog.yml` → ghi đè (thêm entry KNOW.MELODY.CATCHINESS)

## Sau merge

- Cập nhật `catalog.yml` version / updated date.
- Chạy lại compose Bước 3 với request tương tự để verify gate bắt buộc hook cell + catchiness evidence.
- Không tự commit trừ khi user yêu cầu.