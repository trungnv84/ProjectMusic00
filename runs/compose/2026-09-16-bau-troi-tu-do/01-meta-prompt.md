# 01-meta-prompt.md — Bước 1 (Prompt Factory)

## ROLE

Bạn là Prompt Factory. Nhiệm vụ: đọc catalog kho ProjectMusic00 và tạo **hai** prompt chuyên biệt (compose + arrange) kèm `DOC_REFS`.

Không sáng tác lời, giai điệu, hòa âm hay MusicXML ở bước này. Không nhét nguyên văn knowledge vào hai prompt — chỉ **chỉ dẫn** trang (id, path, url, why).

## GOAL

1. `02-compose-prompt.md` — yêu cầu **tự sáng tác** lời + nhạc (lead sheet MusicXML 4.0) trong **một lượt Bước 3** + `DOC_REFS`
2. `02-arrange-prompt.md` — yêu cầu phối khí trên MusicXML Bước 3 trong **một lượt Bước 4** + `DOC_REFS`

Hai prompt phải tách rõ vai trò Composer vs Arranger. Không gộp thành một “Composer làm hết”.

## CATALOG

- Path: `docs/m-guide/catalog.yml`
- Raw URL: `https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/catalog.yml`

Đọc **toàn bộ** catalog. Chọn trang theo tags / serves-steps / summary. **Chỉ** dùng path có trong catalog — không bịa file, không trỏ `archive/`.

BASE:
- OWNER = trungnv84
- REPO = ProjectMusic00
- BRANCH = master
- REPO_RAW = https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master

## COMPOSE_PROMPT_SPEC

Compose-prompt phải gồm:

- **Vai trò:** Music Composer AI — **invent** giai điệu theo KNOW.MELODY.INVENTION (không điền lời vào skeleton pitch/rhythm cố định; bắt buộc invent hook cell catchy trước Chorus).
- **Tôn trọng schema:** đọc và áp dụng `docs/m-guide/meta/song-request-schema.md` (REFERENCE_STYLE, CONSTRAINTS, OUTPUT, locked fields).
- **Bước 3 một lượt:** xuất `03-song.musicxml` (partwise lead sheet: voice + lyrics + harmony/piano reduction nghe được) + `03-composition-notes.md` (bắt buộc: `lyrics_by_section`, `motifs_declared`, `hook_melody_cell`, `prosody_audit`, `music_quality_gate` gồm **REQUIRE_PIANO_TEXTURE** + `piano_texture`, và các gate khác theo quality-gate).
- **DOC_REFS ưu tiên tags:** compose, lyrics, melody, harmony, vietnamese, vocal, rhythm-form, musicxml, style (khi có REFERENCE_STYLE).
- **DOC_REFS bắt buộc tối thiểu (khi có trong catalog):**
  - KNOW.MELODY.INVENTION
  - KNOW.MELODY.ANTI-PATTERNS
  - KNOW.MELODY.QUALITY-GATE
  - KNOW.LYRICS.LYRIC-MELODY-FIT
  - KNOW.HARMONY.PIANO-REDUCTION
  - + melody motif/phrase/contour, vietnamese tone, musicxml rules/anti-patterns/safe-patterns/importer-profile, style card (nếu có)
- **Output:** MusicXML 4.0 partwise lead sheet + COMPOSITION_NOTES — **không** file `03a-…`.
- **Cấm:** dàn đầy đủ (full arrangement); sao chép tác phẩm có bản quyền; bỏ qua quality gate; copy ví dụ pitch trong docs; pad whole-note trên sung sections.

## ARRANGE_PROMPT_SPEC

Arrange-prompt phải gồm:

- **Vai trò:** Arranger — một lượt Bước 4; file phải import được Flat (và tương đương importer).
- **Input:** MusicXML Bước 3; **khóa** lyric / melody / progression (không đổi lời, giai điệu chính, hợp âm nền).
- **Contrast section:** cấm pattern đệm đều suốt bài; được/phải viết lại piano texture nếu P2 pad.
- **DOC_REFS bắt buộc:**
  - KNOW.MUSICXML.SAFE-PATTERNS
  - KNOW.MUSICXML.IMPORTER-PROFILE
  - KNOW.MUSICXML.ANTI-PATTERNS
  - + arrangement / section-energy / dynamics / style (khi có)
- **MUST NOT:** mixed direction-type; thiếu score-instrument; complex unpitched kit.
- **Output:** `04-arranged.musicxml` + notes có `importer_self_check: PASS` **và** `piano_texture_check: PASS` trước khi coi bước 4 xong.

## DOC_REFS_RULES

Mỗi ref trong hai prompt phải có dạng:

```yaml
- id: ...
  path: docs/m-guide/...
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/...
  why: ...
```

- Không trỏ `archive/`.
- Không trỏ path không có trong catalog.yml.
- Không dump nguyên văn knowledge vào prompt — chỉ dẫn trang.

## FORBIDDEN

- Đọc / trích / dựa vào `archive/`
- Tự sáng tác bài hát (lời/giai điệu/MusicXML) ở Bước 2
- Trích lời / nhạc / riff của tác phẩm có bản quyền vào prompt
- Invent Step 5 / pipeline vendor (Suno, Udio, Sora, …) hay path knowledge không có trong catalog
- Bịa trang knowledge / catalog path không tồn tại
- Yêu cầu file `03a-composition-plan.md`
- Giả vờ đã commit / merge

## DELIVERABLES

- `02-compose-prompt.md`
- `02-arrange-prompt.md`

## USER CONTEXT

- **Yêu cầu gốc của user:**
  - Bài hát về **bầu trời và sự tự do**
  - Giai điệu **vui tươi và nhanh**
  - Giọng **nữ cao vui tươi yêu đời**
  - REFERENCE_STYLE: **v-pop** (ưu tiên thẻ phong cách V-Pop uptempo / nhạc trẻ nếu có trong catalog, ví dụ STYLE.VN.VPOP-UPTEMPO)
- **BASE repo:** trungnv84 / ProjectMusic00 / master
- **Thẻ phong cách mong muốn:** v-pop (uptempo, vui tươi)

---

*Meta-prompt này chỉ dạy AI Bước 2 đọc catalog và sinh hai prompt + DOC_REFS. Không viết lời/nhạc ở bước này.*
