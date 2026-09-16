# STATUS — runs/compose/2026-09-16-bau-troi-tu-do

| Bước | Trạng thái | Artifact | Ghi chú |
|------|------------|----------|---------|
| 1. Meta-prompt | **done** | `01-meta-prompt.md` | Prompt Factory |
| 2. Specialized prompts | **done** | `02-compose-prompt.md`, `02-arrange-prompt.md` | DOC_REFS từ catalog.yml (raw URL) |
| 3. Compose (lead sheet) | pending | — | Chờ user chạy / duyệt prompt |
| 4. Arrange | pending | — | |

## Yêu cầu bài hát (tóm tắt)

- Chủ đề: bầu trời và sự tự do
- Mood / tempo: vui tươi, nhanh
- Vocal: giọng nữ cao, vui tươi yêu đời
- REFERENCE_STYLE: v-pop → `STYLE.VN.VPOP-UPTEMPO`

## Run id

`2026-09-16-bau-troi-tu-do`

## Ghi chú Bước 2

- Compose-prompt: DOC_REFS melody-invention, catchiness, anti-patterns, quality-gate, lyric-melody-fit, piano-reduction, vietnamese tone, musicxml, style VPOP-UPTEMPO.
- Arrange-prompt: DOC_REFS bắt buộc SAFE-PATTERNS, IMPORTER-PROFILE, ANTI-PATTERNS + PIANO-REDUCTION + section-energy / dynamics / orchestration / style.
- Không viết MusicXML ở bước này.
- Dừng để user sửa hai prompt nếu cần trước khi sang Bước 3.
