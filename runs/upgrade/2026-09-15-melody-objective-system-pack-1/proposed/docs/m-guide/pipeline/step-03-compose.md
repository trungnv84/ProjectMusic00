---
id: PIPE.STEP-03
type: pipeline
status: draft
version: "1.5"
tags: [pipeline, compose]
serves-steps: [3]
needs-approval: true
last-updated: "2026-09-15"
---
# Bước 3 — Sáng tác → MusicXML (lead sheet)

**Một bước, chạy tự động đến xong.** Không tách file plan riêng, không dừng giữa chừng để duyệt plan. MusicXML hợp lệ ≠ bài đạt — phải qua quality gate trong notes, nay gồm objective melody audit.

## Input bắt buộc

- `02-compose-prompt.md`
- **Yêu cầu bài hát** (input độc lập)
- (Tuỳ) id thẻ phong cách

## Fetch

- Mọi URL trong `DOC_REFS` của compose-prompt
- [../meta/song-request-schema.md](../meta/song-request-schema.md)
- Knowledge melody: [melody-invention](../knowledge/melody/melody-invention.md), [composition-planning](../knowledge/melody/composition-planning.md), [anti-patterns](../knowledge/melody/anti-patterns.md), [quality-gate](../knowledge/melody/musical-quality-gate.md), [objective-metrics](../knowledge/melody/objective-metrics.md), motif / phrase / contour
- Knowledge lyrics/VN: [lyric-melody-fit](../knowledge/lyrics/lyric-melody-fit.md), tone-melody, syllable-priority
- Knowledge harmony: [basics](../knowledge/harmony/basics.md), [piano-reduction](../knowledge/harmony/piano-reduction.md)
- Knowledge `musicxml` (tối thiểu rules, anti-patterns, safe-patterns, importer-profile, canonical-source)
- [../artifacts/composition-notes.template.md](../artifacts/composition-notes.template.md)

## AI làm (một lượt)

1. Parse yêu cầu theo schema; resolve `DELEGATED`; echo đúng `REFERENCE_STYLE` id.
2. Tự sáng tác lời + giai điệu + hòa âm theo [melody-invention](../knowledge/melody/melody-invention.md) — cấm điền lời vào một skeleton pitch/rhythm cố định rồi lặp.
3. Trong đầu (hoặc nháp riêng, không bắt buộc artifact): chốt hook đáng nhớ, motif khác nhau theo section, map prosody; rồi viết thẳng lead sheet.
4. Xuất **MusicXML 4.0 partwise** (voice + lyrics + harmony/piano), pretty-print.
5. Viết `03-composition-notes.md`: `lyrics_by_section`, `motifs_declared`, `hook_melody_cell`, `prosody_audit`, `music_quality_gate`, `piano_texture`, **`objective_melody_audit`**.
6. Sau khi XML đã tồn tại, canonicalize các phrase melody theo [objective-metrics](../knowledge/melody/objective-metrics.md) và ghi các metric/evidence vào `objective_melody_audit`.
7. Tự chấm gate gồm **`REQUIRE_PIANO_TEXTURE`** và **`REQUIRE_OBJECTIVE_MELODY_AUDIT`**. Bất kỳ hard FAIL hoặc metric bắt buộc `unavailable` → FAIL.
8. FAIL → viết lại lead sheet và các phần liên quan trong cùng Bước 3; không patch vài nốt rồi export lại. Package 1 chỉ bổ sung objective gate, không yêu cầu tạo nhiều candidate.

## Output

```text
runs/compose/<run-id>/03-song.musicxml
runs/compose/<run-id>/03-composition-notes.md   # lyrics_by_section + music_quality_gate + piano_texture + objective_melody_audit
STATUS.md  # step3: done chỉ khi gate PASS hoặc user override
```

## Không được làm

- Không tạo `03a-composition-plan.md`.
- Không coi objective score là chứng minh tuyệt đối về thẩm mỹ.
- Không dùng số liệu không thể truy nguyên từ MusicXML.
- Không mở rộng Package 1 thành multi-candidate generation/selection.

Dừng để user nghe/duyệt lead sheet. Không đạt → improver — không sửa kho gốc.
