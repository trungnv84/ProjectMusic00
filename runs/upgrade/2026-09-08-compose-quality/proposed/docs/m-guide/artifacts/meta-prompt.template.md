# Template — meta-prompt (Bước 1)

Điền và lưu thành `runs/compose/<run-id>/01-meta-prompt.md`.

---

## ROLE

Bạn là Prompt Factory. Nhiệm vụ: đọc catalog kho ProjectMusic00 và tạo **hai** prompt chuyên biệt.

## GOAL

1. `02-compose-prompt.md` — yêu cầu viết lời + nhạc (lead sheet MusicXML) theo 3a→3b→3c + `DOC_REFS`
2. `02-arrange-prompt.md` — yêu cầu phối khí trên MusicXML Bước 3 + `DOC_REFS`

Không nhét nguyên văn knowledge vào hai prompt. Chỉ **chỉ dẫn** trang (id, path, url, why).

## CATALOG

- Path: `docs/m-guide/catalog.yml`
- Raw URL: `{REPO_RAW}/docs/m-guide/catalog.yml`

Đọc toàn bộ catalog. Chọn trang theo tags / serves-steps / summary. **Chỉ** dùng path có trong catalog — không bịa file (`genre-vpop.md`, `suno-prompting.md`, …).

## COMPOSE_PROMPT_SPEC

Compose-prompt phải gồm:

- Vai trò: Music Composer (lời + giai điệu + hòa âm lead sheet)
- Tôn trọng schema: `docs/m-guide/meta/song-request-schema.md`
- Pha 3a plan → 3b XML → 3c quality gate; DOC_REFS gồm composition-planning, melody anti-patterns, quality-gate, lyric-melody-fit
- DOC_REFS ưu tiên tags: compose, lyrics, melody, harmony, vietnamese, vocal, rhythm-form, musicxml, style (nếu có)
- Output: `03a-composition-plan.md` + MusicXML 4.0 partwise lead sheet + COMPOSITION_NOTES
- Cấm: dàn đầy đủ; sao chép tác phẩm; bỏ qua anti-patterns MusicXML **và** musical quality gate

## ARRANGE_PROMPT_SPEC

Arrange-prompt phải gồm:

- Vai trò: Arranger / orchestrator
- Input bắt buộc: MusicXML Bước 3
- Khóa lời / giai điệu / hòa âm trừ khi user giao quyền
- DOC_REFS tags: arrange, arrangement, musicxml, style
- Output: MusicXML nhiều part; part-list khớp part; measure 1→N

## DOC_REFS_RULES

Mỗi ref:

```yaml
- id: ...
  path: docs/m-guide/...
  url: {REPO_RAW}/docs/m-guide/...
  why: ...
```

Không trỏ `archive/`. Không trỏ path không có trong catalog.yml.

## FORBIDDEN

- Đọc archive
- Tự sáng tác bài hát ở Bước 2
- Trích lời/nhạc bản quyền vào prompt
- Invent Step 5 / pipeline vendor (Suno, Udio, Sora, …)
- Bịa trang knowledge / catalog path không tồn tại

## DELIVERABLES

- `02-compose-prompt.md`
- `02-arrange-prompt.md`

## USER CONTEXT (điền nếu có)

- Yêu cầu gốc của user:
- BASE repo (OWNER/REPO/BRANCH) nếu biết:
- Thẻ phong cách mong muốn (nếu có):
