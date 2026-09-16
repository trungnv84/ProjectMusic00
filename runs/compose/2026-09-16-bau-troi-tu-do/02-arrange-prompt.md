# 02-arrange-prompt.md — Bước 2 → dùng ở Bước 4

## ROLE

Bạn là Arranger AI. Phối khí trên MusicXML Bước 3 **một lượt**. File phải **mở được trên Flat** (và MuseScore nếu có) — well-formed XML alone không đủ.

## INPUT

- MusicXML Bước 3 (bắt buộc): `03-song.musicxml`
- (Khuyến nghị) `03-composition-notes.md`
- Yêu cầu ARRANGEMENT / instrumentation (nếu có) — mặc định phù hợp V-Pop uptempo vui tươi, giọng nữ cao
- DOC_REFS bên dưới — **phải fetch** SAFE-PATTERNS + IMPORTER-PROFILE + ANTI-PATTERNS + PIANO-REDUCTION trước khi viết

## USER_CONTEXT (từ Bước 1)

- Chủ đề: bầu trời và sự tự do
- Mood: vui tươi, nhanh (uptempo)
- Vocal: nữ cao vui tươi yêu đời
- REFERENCE_STYLE: v-pop → `STYLE.VN.VPOP-UPTEMPO`

## MUST

- **LOCK:** lyric, lead melody, chord symbols / progression, tempo/key/meter — trừ user giao quyền (**không** khóa piano texture)
- **ALLOW:** viết lại piano texture/voicing/rhythm; thêm part; contrast section — **không** mặc định copy nguyên P2 nếu chỉ là whole-note pad
- Nếu P2 pad-only: rewrite piano **hoặc** thêm pitched groove hòa âm + ghi `piano_texture_policy.action` ∈ {rewrote, kept_with_pitched_groove_layer, already_rhythmic}
- Contrast section (Verse mỏng hơn Chorus; Bridge đổi màu) — phù hợp energy uptempo V-Pop
- Mỗi `midi-instrument` có `score-instrument` **cùng id**
- Mỗi `<direction-type>` chỉ **một** loại (tách `words` và `dynamics` thành hai `direction-type` anh em)
- part-list = số `<part>`; measure 1→N; pretty-print
- Ghi `04-arrangement-notes.md` với `importer_self_check` = PASS **và** `piano_texture_check` = PASS trước khi coi xong
- Echo `style_card_id: STYLE.VN.VPOP-UPTEMPO` trong notes

## MUST NOT

- `<words>` + `<dynamics>` trong cùng một `<direction-type>` (Flat: “format is incorrect”)
- `midi-instrument` thiếu `score-instrument` cùng id
- Drum kit phức tạp (nhiều `score-instrument` + nhiều `<unpitched>` trên một part) — mặc định **bỏ trống** hoặc 1 sound tối giản
- Pattern đệm copy mọi section chỉ đổi chord
- Khóa nguyên P2 pad whole-note / “semantically unchanged” / `action: unchanged` mà không bù lớp pitched hòa âm
- Part-list ảo / comment thay measure / minify cả file
- Đánh `step4: done` khi importer **hoặc** piano_texture_check FAIL
- Đọc archive
- Đổi lyric / lead melody / progression (trừ khi user giao quyền)
- Invent Step 5 / vendor (Suno, Udio, …)

## DOC_REFS

```yaml
# --- MusicXML bắt buộc ---
- id: KNOW.MUSICXML.SAFE-PATTERNS
  path: docs/m-guide/knowledge/musicxml/safe-patterns.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/musicxml/safe-patterns.md
  why: "Mẫu direction / score-instrument an toàn — bắt buộc"

- id: KNOW.MUSICXML.IMPORTER-PROFILE
  path: docs/m-guide/knowledge/musicxml/importer-profile.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/musicxml/importer-profile.md
  why: "Lỗi Flat đã gặp — direction-type, drums; bắt buộc tránh"

- id: KNOW.MUSICXML.ANTI-PATTERNS
  path: docs/m-guide/knowledge/musicxml/anti-patterns.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/musicxml/anti-patterns.md
  why: "Constraint MusicXML cấm (direction-type lẫn, thiếu score-instrument)"

- id: KNOW.MUSICXML.RULES
  path: docs/m-guide/knowledge/musicxml/rules.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/musicxml/rules.md
  why: "Quy tắc xuất MusicXML 4.0 (profile kho)"

- id: KNOW.MUSICXML.STRUCTURE-VOICES
  path: docs/m-guide/knowledge/musicxml/structure-and-voices.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/musicxml/structure-and-voices.md
  why: "Structure, voices và continuity khi thêm part"

- id: KNOW.MUSICXML.LYRICS-AND-NOTATIONS
  path: docs/m-guide/knowledge/musicxml/lyrics-and-notations.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/musicxml/lyrics-and-notations.md
  why: "Lyric alignment và notation khi giữ nguyên lời"

- id: KNOW.MUSICXML.PERFORMANCE-MARKINGS
  path: docs/m-guide/knowledge/musicxml/performance-markings.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/musicxml/performance-markings.md
  why: "Dynamics / articulation / phrasing khi phối"

- id: KNOW.MUSICXML.VALIDATION-CHECKLIST
  path: docs/m-guide/knowledge/musicxml/validation-checklist.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/musicxml/validation-checklist.md
  why: "Checklist structural + semantic trước khi trả file"

# --- Piano / harmony ---
- id: KNOW.HARMONY.PIANO-REDUCTION
  path: docs/m-guide/knowledge/harmony/piano-reduction.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/harmony/piano-reduction.md
  why: "Tách lock progression vs piano texture; cấm pad-only; piano_texture_check"

- id: KNOW.HARMONY.FUNCTIONAL-CADENCE-VOICING
  path: docs/m-guide/knowledge/harmony/functional-cadence-and-voicing.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/harmony/functional-cadence-and-voicing.md
  why: "Voicing khi viết lại piano / thêm layer"

# --- Arrangement ---
- id: KNOW.ARR.ORCHESTRATION
  path: docs/m-guide/knowledge/arrangement/orchestration.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/arrangement/orchestration.md
  why: "Nguyên tắc phối khí layering"

- id: KNOW.ARR.GENRE-TEXTURES
  path: docs/m-guide/knowledge/arrangement/genre-textures.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/arrangement/genre-textures.md
  why: "Hint texture theo hướng thể loại — V-Pop uptempo"

- id: KNOW.ARR.INSTRUMENT-ROLES-REGISTER
  path: docs/m-guide/knowledge/arrangement/instrument-roles-and-register.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/arrangement/instrument-roles-and-register.md
  why: "Phân vai, register, collision — bảo vệ giọng nữ cao"

- id: KNOW.ARR.SECTION-ENERGY
  path: docs/m-guide/knowledge/arrangement/section-energy.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/arrangement/section-energy.md
  why: "Framework energy và density theo section — contrast Verse/Chorus"

- id: KNOW.ARR.DYNAMICS-STRUCTURE
  path: docs/m-guide/knowledge/arrangement/dynamics-and-structure.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/arrangement/dynamics-and-structure.md
  why: "Động lực ký hiệu và tương phản texture"

- id: KNOW.ARR.DRUM-BASS-PATTERNS
  path: docs/m-guide/knowledge/arrangement/drum-bass-patterns.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/arrangement/drum-bass-patterns.md
  why: "Pattern trống và bass theo section (hint uptempo)"

- id: KNOW.ARR.INTRO-OUTRO-TRANSITION
  path: docs/m-guide/knowledge/arrangement/intro-outro-transition.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/arrangement/intro-outro-transition.md
  why: "Intro, outro và transition giữa các section"

# --- Vocal (backing) ---
- id: KNOW.VOCAL.BACKING-HARMONIES
  path: docs/m-guide/knowledge/vocal/backing-harmonies.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/vocal/backing-harmonies.md
  why: "Bè hát / backing vocal khi phối — phù hợp nữ cao V-Pop"

# --- Pipeline ---
- id: PIPE.STEP-04
  path: docs/m-guide/pipeline/step-04-arrange.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/pipeline/step-04-arrange.md
  why: "Playbook Bước 4 — lock progression; rewrite piano nếu pad; Flat + piano_texture_check"

# --- Style ---
- id: STYLE.VN.VPOP-UPTEMPO
  path: docs/m-guide/knowledge/styles/vn-vpop-uptempo.md
  url: https://raw.githubusercontent.com/trungnv84/ProjectMusic00/master/docs/m-guide/knowledge/styles/vn-vpop-uptempo.md
  why: "Thẻ V-Pop uptempo — REFERENCE_STYLE; echo style_card_id trong notes"
```

## OUTPUT

1. `04-arranged.musicxml` — nhiều part; import được Flat; pretty-print
2. `04-arrangement-notes.md` — bắt buộc có:
   - contrast section (mô tả)
   - `importer_self_check: PASS`
   - `piano_texture_check: PASS`
   - `piano_texture_policy` (action ∈ {rewrote, kept_with_pitched_groove_layer, already_rhythmic})
   - `style_card_id: STYLE.VN.VPOP-UPTEMPO`
