---
id: PIPE.STEP-03
type: pipeline
status: active
version: "1.5"
tags: [pipeline, compose]
serves-steps: [3]
last-updated: "2026-09-14"
---

# Bước 3 — Sáng tác → MusicXML (lead sheet)

**Một bước, chạy tự động đến xong.** Không tách file plan riêng, không dừng giữa chừng để duyệt plan (phù hợp chat web và Cursor). MusicXML hợp lệ ≠ bài đạt — phải qua quality gate trong notes.

## Input bắt buộc

- `02-compose-prompt.md`
- **Yêu cầu bài hát** (input độc lập)
- (Tuỳ) id thẻ phong cách

## Fetch

- Mọi URL trong `DOC_REFS` của compose-prompt
- [../meta/song-request-schema.md](../meta/song-request-schema.md)
- Knowledge melody: [melody-invention](../knowledge/melody/melody-invention.md), **[catchiness](../knowledge/melody/catchiness.md)**, [composition-planning](../knowledge/melody/composition-planning.md) (checklist nội bộ), [anti-patterns](../knowledge/melody/anti-patterns.md), [quality-gate](../knowledge/melody/musical-quality-gate.md), motif / phrase / contour
- Knowledge lyrics/VN: [lyric-melody-fit](../knowledge/lyrics/lyric-melody-fit.md), tone-melody, syllable-priority
- Knowledge harmony: [basics](../knowledge/harmony/basics.md), **[piano-reduction](../knowledge/harmony/piano-reduction.md)**
- Knowledge `musicxml` (tối thiểu [rules](../knowledge/musicxml/rules.md), [anti-patterns](../knowledge/musicxml/anti-patterns.md), [safe-patterns](../knowledge/musicxml/safe-patterns.md), [importer-profile](../knowledge/musicxml/importer-profile.md), [canonical-source](../knowledge/musicxml/canonical-source.md))
- [../artifacts/composition-notes.template.md](../artifacts/composition-notes.template.md)

## AI làm (một lượt)

1. Parse yêu cầu theo schema; resolve `DELEGATED`; echo đúng `REFERENCE_STYLE` id.
2. **Tự sáng tác** lời + giai điệu + hòa âm theo [melody-invention](../knowledge/melody/melody-invention.md) + **[catchiness](../knowledge/melody/catchiness.md)** — **cấm** điền lời vào một skeleton pitch/rhythm cố định rồi lặp.
3. **Trước khi viết note đầu tiên của Chorus**: áp checklist "catchy" theo [catchiness](../knowledge/melody/catchiness.md) (hook economy, repetition-with-variation, rhythmic hook, tầm cữ dễ hát, vị trí hook nhất quán, tương phản trước hook) — tiêu chí **tích cực**, khác anti-patterns (chỉ liệt kê cái cấm). Trong đầu (hoặc nháp riêng, **không** bắt buộc artifact): chốt `hook_melody_cell` đáng nhớ, motif khác nhau theo section, map prosody; rồi viết thẳng lead sheet. Kiểm coherence (không phrase rời rạc).
4. Xuất **MusicXML 4.0 partwise** (voice + lyrics + harmony/piano), **pretty-print**.
   - Piano reduction phải **nghe được nhịp hòa âm** theo [piano-reduction](../knowledge/harmony/piano-reduction.md): sung sections ≥ half-note pulse hoặc broken/comp; **cấm** whole-note-only toàn bài.
5. Viết `03-composition-notes.md` theo đúng [composition-notes.template.md](../artifacts/composition-notes.template.md): `lyrics_by_section`, `motifs_declared`, **`hook_melody_cell`** (mô tả pitch+rhythm cell + evidence catchiness), `prosody_audit`, `music_quality_gate` (bảng `scores` + `thresholds` đầy đủ, gồm **`REQUIRE_CATCHY_HOOK`**, **`REQUIRE_MELODIC_COHERENCE`**, **`REQUIRE_PIANO_TEXTURE`**, có `result: PASS|FAIL` tường minh), **`piano_texture`** (bắt buộc — thiếu = gate FAIL). **Khoá cứng:** nếu bất kỳ khối bắt buộc nào ở trên bị thiếu hoặc rút gọn thành vài gạch đầu dòng không theo schema template → **tự động coi là `music_quality_gate: FAIL`**, không được ghi STATUS step3 = done, bất kể MusicXML nghe ổn.
6. Tự chấm gate gồm **`REQUIRE_CATCHY_HOOK`**, **`REQUIRE_MELODIC_COHERENCE`** và **`REQUIRE_PIANO_TEXTURE`**. **FAIL** (kể cả hook không memorable / phrase rời rạc / pad piano / thiếu `piano_texture` / thiếu evidence catchiness / Verse hoặc Chorus Final trùng skeleton câu trước theo [anti-patterns](../knowledge/melody/anti-patterns.md)) → viết lại lead sheet **và** piano texture, **không** patch vài nốt, **không** "để Bước 4 sửa". Chỉ coi xong khi PASS (hoặc user override tường minh).

Chat web (không workspace): xuất cùng nội dung trong chat (MusicXML + notes) theo template; không tạo file `03a-…`.

## Output

```text
runs/compose/<run-id>/03-song.musicxml
runs/compose/<run-id>/03-composition-notes.md   # lyrics_by_section + motifs_declared + hook_melody_cell + music_quality_gate + piano_texture
STATUS.md  # step3: done chỉ khi gate PASS (gồm REQUIRE_CATCHY_HOOK + REQUIRE_MELODIC_COHERENCE + REQUIRE_PIANO_TEXTURE) hoặc user override
```

**Không** yêu cầu `03a-composition-plan.md`.

Dừng để user nghe/duyệt lead sheet. Không đạt → improver — **không** sửa kho gốc.
