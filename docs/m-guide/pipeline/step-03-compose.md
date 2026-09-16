---
id: PIPE.STEP-03
type: pipeline
status: active
version: "1.6"
tags: [pipeline, compose]
serves-steps: [3]
last-updated: "2026-09-15"
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
- Knowledge melody: [melody-invention](../knowledge/melody/melody-invention.md), **[catchiness](../knowledge/melody/catchiness.md)**, [composition-planning](../knowledge/melody/composition-planning.md) (checklist nội bộ), [anti-patterns](../knowledge/melody/anti-patterns.md), [quality-gate](../knowledge/melody/musical-quality-gate.md), **[objective-metrics](../knowledge/melody/objective-metrics.md)**, motif / phrase / contour
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
5. Viết `03-composition-notes.md` theo đúng [composition-notes.template.md](../artifacts/composition-notes.template.md): `lyrics_by_section`, `motifs_declared`, **`hook_melody_cell`** (mô tả pitch+rhythm cell + evidence catchiness), `prosody_audit`, **`piano_texture`** (bắt buộc — thiếu = gate FAIL).
6. **Canonicalize + audit** theo [objective-metrics](../knowledge/melody/objective-metrics.md): rút canonical phrase representation từ MusicXML vừa xuất, tính các metric bắt buộc (`exact_repeat_rate`, `near_repeat_max`, `rhythm_diversity`, `contour_diversity`, `cadence_variety`, `section_contrast`, `hook_distinctiveness`, `final_development`), điền khối `objective_melody_audit` với `evidence` trỏ về section/phrase cụ thể — **không** ghi nhận xét định tính thay số liệu.
7. Điền `music_quality_gate` (bảng `scores` + `thresholds` đầy đủ, gồm **`REQUIRE_CATCHY_HOOK`**, **`REQUIRE_MELODIC_COHERENCE`**, **`REQUIRE_PIANO_TEXTURE`**, **`REQUIRE_OBJECTIVE_MELODY_AUDIT`**, **`MAX_NEAR_REPEAT`**, **`REQUIRE_SECTION_OBJECTIVE_CONTRAST`**, **`REQUIRE_FINAL_DEVELOPMENT_EVIDENCE`**, có `result: PASS|FAIL` tường minh). **Khoá cứng:** nếu bất kỳ khối bắt buộc nào ở trên (kể cả `objective_melody_audit`) bị thiếu hoặc rút gọn thành vài gạch đầu dòng không theo schema template → **tự động coi là `music_quality_gate: FAIL`**, không được ghi STATUS step3 = done, bất kể MusicXML nghe ổn.
8. Tự chấm gate gồm **`REQUIRE_CATCHY_HOOK`**, **`REQUIRE_MELODIC_COHERENCE`**, **`REQUIRE_PIANO_TEXTURE`** và **`REQUIRE_OBJECTIVE_MELODY_AUDIT`**/**`MAX_NEAR_REPEAT`**/**`REQUIRE_SECTION_OBJECTIVE_CONTRAST`**/**`REQUIRE_FINAL_DEVELOPMENT_EVIDENCE`**. **FAIL** (kể cả hook không memorable / phrase rời rạc / pad piano / thiếu `piano_texture` / thiếu evidence catchiness / metric audit vượt ngưỡng / Verse hoặc Chorus Final trùng skeleton câu trước theo [anti-patterns](../knowledge/melody/anti-patterns.md)) → viết lại lead sheet **và** piano texture, **không** patch vài nốt, **không** "để Bước 4 sửa". Chỉ coi xong khi PASS (hoặc user override tường minh). Metric PASS **không** tự động nghĩa là hay — vẫn phải tự nghe/đọc lyrics_by_section để bắt cảm giác đều đều mà số liệu chưa định nghĩa được.

Chat web (không workspace): xuất cùng nội dung trong chat (MusicXML + notes) theo template; không tạo file `03a-…`.

## Output

```text
runs/compose/<run-id>/03-song.musicxml
runs/compose/<run-id>/03-composition-notes.md   # lyrics_by_section + motifs_declared + hook_melody_cell + objective_melody_audit + music_quality_gate + piano_texture
STATUS.md  # step3: done chỉ khi gate PASS (gồm REQUIRE_CATCHY_HOOK + REQUIRE_MELODIC_COHERENCE + REQUIRE_PIANO_TEXTURE + REQUIRE_OBJECTIVE_MELODY_AUDIT) hoặc user override
```

**Không** yêu cầu `03a-composition-plan.md`.

Dừng để user nghe/duyệt lead sheet. Không đạt → improver — **không** sửa kho gốc.
