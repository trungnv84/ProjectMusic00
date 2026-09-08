---
id: PIPE.STEP-03
type: pipeline
status: active
version: "1.5-proposed"
tags: [pipeline, compose]
serves-steps: [3]
sources:
  - "docs/m-guide/knowledge/melody/melody-invention.md"
  - "docs/m-guide/knowledge/melody/musical-quality-gate.md"
  - "docs/m-guide/knowledge/lyrics/craft.md"
  - "docs/m-guide/knowledge/harmony/piano-reduction.md"
last-updated: "2026-09-08"
needs-approval: true
---

# Bước 3 — Sáng tác → MusicXML (lead sheet)

**Một bước, chạy tự động đến xong.** Không tách file plan riêng, không dừng giữa chừng để duyệt plan. Tuy nhiên, “một bước” không đồng nghĩa “một lần tự chấm”: AI phải có critic pass nội bộ trước khi chốt artifact. MusicXML hợp lệ ≠ bài đạt — phải qua quality gate bằng **artifact evidence**.

## Input bắt buộc

- `02-compose-prompt.md`
- **Yêu cầu bài hát** (input độc lập)
- (Tuỳ) id thẻ phong cách

## Fetch

- Mọi URL trong `DOC_REFS` của compose-prompt
- [../meta/song-request-schema.md](../meta/song-request-schema.md)
- Knowledge melody: [melody-invention](../knowledge/melody/melody-invention.md), [composition-planning](../knowledge/melody/composition-planning.md), [anti-patterns](../knowledge/melody/anti-patterns.md), [quality-gate](../knowledge/melody/musical-quality-gate.md), motif / phrase / contour
- Knowledge lyrics/VN: [craft](../knowledge/lyrics/craft.md), [lyric-melody-fit](../knowledge/lyrics/lyric-melody-fit.md), tone-melody, syllable-priority
- Knowledge harmony: [basics](../knowledge/harmony/basics.md), [piano-reduction](../knowledge/harmony/piano-reduction.md)
- Knowledge `musicxml` (tối thiểu [rules](../knowledge/musicxml/rules.md), [anti-patterns](../knowledge/musicxml/anti-patterns.md), [safe-patterns](../knowledge/musicxml/safe-patterns.md), [importer-profile](../knowledge/musicxml/importer-profile.md), [canonical-source](../knowledge/musicxml/canonical-source.md))
- [../artifacts/composition-notes.template.md](../artifacts/composition-notes.template.md)

## AI làm (một lượt đối với user; nhiều pass nội bộ)

1. Parse yêu cầu theo schema; resolve `DELEGATED`; echo đúng `REFERENCE_STYLE` id.
2. Chốt **central poetic image + semantic arc** theo section trước khi tối ưu câu chữ.
3. **Tự sáng tác** lời + giai điệu + hòa âm theo `melody-invention` — cấm điền lời vào một skeleton pitch/rhythm cố định rồi lặp.
4. Trong đầu (hoặc nháp riêng, không bắt buộc artifact): chốt hook đáng nhớ, motif khác nhau theo section, map prosody, phrase roles, tension/release.
5. Xuất **draft lead sheet**.
6. Chạy **critic pass trên draft** bằng MusicXML thật:
   - semantic lyric audit;
   - phrase/pitch/rhythm repetition audit;
   - rhythmic variety + density audit;
   - section contrast + development audit;
   - cadence/harmonic-motion audit;
   - piano artifact audit.
7. **Critic FAIL → rewrite ý nhạc/lời ở phrase hoặc motif level**; không patch vài nốt rời.
8. Chạy artifact audit lần cuối rồi mới xuất bản chốt.
9. Xuất MusicXML 4.0 partwise + composition notes. Notes là báo cáo evidence, không phải nguồn sự thật duy nhất.

## New critic evidence contract

`03-composition-notes.md` thêm:

```yaml
critic_audit:
  source_artifact: "03-song.musicxml"
  lyric_semantic_audit: PASS|FAIL
  melody_repetition_audit: PASS|FAIL
  rhythmic_variety_audit: PASS|FAIL
  section_development_audit: PASS|FAIL
  piano_artifact_audit: PASS|FAIL
  rewrite_count: 0
  result: PASS|FAIL
```

## Gate interaction

`music_quality_gate: PASS` chỉ hợp lệ khi critic audit PASS và mọi hard threshold hiện hành PASS.

Nếu notes nói `piano_texture: arpeggio` nhưng XML thực tế là whole-note pad, **XML artifact audit thắng notes** và gate = FAIL.

## Output

```text
runs/compose/<run-id>/03-song.musicxml
runs/compose/<run-id>/03-composition-notes.md
STATUS.md  # step3: done chỉ khi critic + music_quality_gate PASS hoặc user override
```

Không yêu cầu `03a-composition-plan.md`.

Dừng để user nghe/duyệt lead sheet. Không đạt → improver — không sửa kho gốc.
