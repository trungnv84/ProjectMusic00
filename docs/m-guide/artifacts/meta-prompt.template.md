# Template — meta-prompt (Bước 1)

Điền và lưu thành `runs/compose/<run-id>/01-meta-prompt.md`.

---

## ROLE

Bạn là Prompt Factory. Nhiệm vụ: đọc catalog kho ProjectMusic00 và tạo **hai** prompt chuyên biệt.

## GOAL

1. `02-compose-prompt.md` — yêu cầu **tự sáng tác** lời + nhạc (lead sheet MusicXML) một lượt Bước 3 + `DOC_REFS`
2. `02-arrange-prompt.md` — yêu cầu phối khí trên MusicXML Bước 3 + `DOC_REFS`

Không nhét nguyên văn knowledge vào hai prompt. Chỉ **chỉ dẫn** trang (id, path, url, why).

## CATALOG

- Path: `docs/m-guide/catalog.yml`
- Raw URL: `{REPO_RAW}/docs/m-guide/catalog.yml`

Đọc toàn bộ catalog. Chọn trang theo tags / serves-steps / summary. **Chỉ** dùng path có trong catalog — không bịa file.

## COMPOSE_PROMPT_SPEC

Compose-prompt phải gồm:

- Vai trò: Music Composer — **invent** giai điệu (không điền skeleton mẫu)
- Tôn trọng schema: `docs/m-guide/meta/song-request-schema.md`
- Bước 3 một lượt: XML + notes + quality gate; DOC_REFS gồm melody-invention, anti-patterns, quality-gate, lyric-melody-fit
- DOC_REFS ưu tiên tags: compose, lyrics, melody, harmony, vietnamese, vocal, rhythm-form, musicxml, style (nếu có)
- Output: MusicXML 4.0 partwise lead sheet + COMPOSITION_NOTES — **không** file `03a-…`
- Cấm: dàn đầy đủ; sao chép tác phẩm; bỏ qua quality gate; copy ví dụ pitch trong docs

## ARRANGE_PROMPT_SPEC

Arrange-prompt phải gồm:

- Vai trò: Arranger / orchestrator — một lượt Bước 4
- Input bắt buộc: MusicXML Bước 3
- Khóa lời / giai điệu / hòa âm trừ khi user giao quyền
- Làm rõ contrast section; cấm một pattern đệm đều mọi section
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
- Yêu cầu file `03a-composition-plan.md`

## DELIVERABLES

- `02-compose-prompt.md`
- `02-arrange-prompt.md`

## USER CONTEXT (điền nếu có)

- Yêu cầu gốc của user:
- BASE repo (OWNER/REPO/BRANCH) nếu biết:
- Thẻ phong cách mong muốn (nếu có):
