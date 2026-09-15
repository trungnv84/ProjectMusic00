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
- Knowledge melody: [melody-invention](../knowledge/melody/melody-invention.md), [composition-planning](../knowledge/melody/composition-planning.md) (checklist nội bộ), [anti-patterns](../knowledge/melody/anti-patterns.md), [quality-gate](../knowledge/melody/musical-quality-gate.md), [catchiness-and-hook-craft](../knowledge/melody/catchiness-and-hook-craft.md), motif / phrase / contour
- Knowledge lyrics/VN: [lyric-melody-fit](../knowledge/lyrics/lyric-melody-fit.md), tone-melody, syllable-priority
- Knowledge harmony: [basics](../knowledge/harmony/basics.md), **[piano-reduction](../knowledge/harmony/piano-reduction.md)**
- Knowledge `musicxml` (tối thiểu [rules](../knowledge/musicxml/rules.md), [anti-patterns](../knowledge/musicxml/anti-patterns.md), [safe-patterns](../knowledge/musicxml/safe-patterns.md), [importer-profile](../knowledge/musicxml/importer-profile.md), [canonical-source](../knowledge/musicxml/canonical-source.md))
- [../artifacts/composition-notes.template.md](../artifacts/composition-notes.template.md)

## AI làm (một lượt)

1. Parse yêu cầu theo schema; resolve `DELEGATED`; echo đúng `REFERENCE_STYLE` id.
2. **Tự sáng tác** lời + giai điệu + hòa âm theo [melody-invention](../knowledge/melody/melody-invention.md) — **cấm** điền lời vào một skeleton pitch/rhythm cố định rồi lặp.
3. Trước khi viết note đầu tiên của Chorus: áp checklist "catchy" theo
   [catchiness-and-hook-craft](../knowledge/melody/catchiness-and-hook-craft.md) (hook economy, repetition-with-
   variation, rhythmic hook, tầm cữ dễ hát, vị trí hook nhất quán) — đây là tiêu chí **tích cực**, khác với
   anti-patterns (chỉ liệt kê cái cấm). Trong đầu (hoặc nháp riêng, **không** bắt buộc artifact): chốt hook
   đáng nhớ, motif khác nhau theo section, map prosody; rồi viết thẳng lead sheet.
4. Xuất **MusicXML 4.0 partwise** (voice + lyrics + harmony/piano), **pretty-print**.
   - Piano reduction phải **nghe được nhịp hòa âm** theo [piano-reduction](../knowledge/harmony/piano-reduction.md): sung sections ≥ half-note pulse hoặc broken/comp; **cấm** whole-note-only toàn bài.
5. Viết `03-composition-notes.md` theo đúng [composition-notes.template.md](../artifacts/composition-notes.template.md):
   `lyrics_by_section`, `motifs_declared`, `hook_melody_cell`, `prosody_audit`, `music_quality_gate`
   (bảng `scores` + `thresholds` đầy đủ, có `result: PASS|FAIL` tường minh), **`piano_texture`** (bắt buộc —
   thiếu = gate FAIL). **Khoá cứng:** nếu bất kỳ khối nào trong 5 khối trên bị thiếu hoặc rút gọn thành vài
   gạch đầu dòng không theo schema template → **tự động coi là `music_quality_gate: FAIL`**, không được ghi
   STATUS step3 = done, bất kể MusicXML nghe ổn.
6. Tự chấm gate gồm **`REQUIRE_PIANO_TEXTURE`** và **`REQUIRE_CATCHINESS_SELFCHECK`**
   ([catchiness-and-hook-craft](../knowledge/melody/catchiness-and-hook-craft.md)). **FAIL** (kể cả pad piano /
   thiếu `piano_texture` / thiếu evidence catchiness / Verse hoặc Chorus Final trùng skeleton câu trước theo
   [anti-patterns](../knowledge/melody/anti-patterns.md)) → viết lại lead sheet **và** piano texture, **không**
   patch vài nốt, **không** “để Bước 4 sửa”. Chỉ coi xong khi PASS (hoặc user override tường minh).

Chat web (không workspace): xuất cùng nội dung trong chat (MusicXML + notes) theo template; không tạo file `03a-…`.

## Output

```text
runs/compose/<run-id>/03-song.musicxml
runs/compose/<run-id>/03-composition-notes.md   # lyrics_by_section + music_quality_gate + piano_texture
STATUS.md  # step3: done chỉ khi gate PASS (gồm REQUIRE_PIANO_TEXTURE) hoặc user override
```

**Không** yêu cầu `03a-composition-plan.md`.

Dừng để user nghe/duyệt lead sheet. Không đạt → improver — **không** sửa kho gốc.
