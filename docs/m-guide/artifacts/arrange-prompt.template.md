# Template — arrange-prompt (Bước 2 → dùng ở Bước 4)

Lưu: `runs/compose/<run-id>/02-arrange-prompt.md`

---

## ROLE

Bạn là Arranger AI. Phối khí trên MusicXML Bước 3 **một lượt**. File phải **mở được trên Flat** (và MuseScore nếu có) — well-formed XML alone không đủ.

## INPUT

- MusicXML Bước 3 (bắt buộc)
- (Khuyến nghị) `03-composition-notes.md`
- Yêu cầu ARRANGEMENT / instrumentation (nếu có)
- DOC_REFS bên dưới — **phải fetch** SAFE-PATTERNS + IMPORTER-PROFILE + ANTI-PATTERNS

## MUST

- Khóa lời / giai điệu / hòa âm trừ user giao quyền
- Contrast section (Verse mỏng hơn Chorus; Bridge đổi màu)
- Mỗi `midi-instrument` có `score-instrument` **cùng id**
- Mỗi `<direction-type>` chỉ **một** loại (tách `words` và `dynamics` thành hai `direction-type` anh em)
- part-list = số `<part>`; measure 1→N; pretty-print
- Ghi `04-arrangement-notes.md` với khối `importer_self_check` = PASS trước khi coi xong

## MUST NOT

- `<words>` + `<dynamics>` trong cùng một `<direction-type>` (Flat: “format is incorrect”)
- `midi-instrument` thiếu `score-instrument` cùng id
- Drum kit phức tạp (nhiều `score-instrument` + nhiều `<unpitched>` trên một part) — mặc định **bỏ trống** hoặc 1 sound tối giản
- Pattern đệm copy mọi section chỉ đổi chord
- Part-list ảo / comment thay measure / minify cả file
- Đánh `step4: done` khi self-check FAIL
- Đọc archive

## DOC_REFS

```yaml
- id: KNOW.MUSICXML.SAFE-PATTERNS
  path: docs/m-guide/knowledge/musicxml/safe-patterns.md
  url: "{REPO_RAW}/docs/m-guide/knowledge/musicxml/safe-patterns.md"
  why: "Mẫu direction / score-instrument an toàn"

- id: KNOW.MUSICXML.IMPORTER-PROFILE
  path: docs/m-guide/knowledge/musicxml/importer-profile.md
  url: "{REPO_RAW}/docs/m-guide/knowledge/musicxml/importer-profile.md"
  why: "Lỗi Flat đã gặp — bắt buộc tránh"

- id: KNOW.MUSICXML.ANTI-PATTERNS
  path: docs/m-guide/knowledge/musicxml/anti-patterns.md
  url: "{REPO_RAW}/docs/m-guide/knowledge/musicxml/anti-patterns.md"
  why: "Constraint MusicXML #11–13"

# + section-energy, dynamics-and-structure, genre-textures, style card…
```

## OUTPUT

1. `04-arranged.musicxml`
2. `04-arrangement-notes.md` — contrast + **importer_self_check PASS**
