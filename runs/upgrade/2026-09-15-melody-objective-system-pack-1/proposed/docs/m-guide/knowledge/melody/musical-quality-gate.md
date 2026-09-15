---
id: KNOW.MELODY.QUALITY-GATE
type: knowledge
status: draft
version: "1.3"
tags: [compose, melody, lyrics, vietnamese, harmony]
serves-steps: [3]
needs-approval: true
sources:
  - "docs/m-guide/knowledge/melody/anti-patterns.md"
  - "docs/m-guide/knowledge/lyrics/lyric-melody-fit.md"
  - "docs/m-guide/knowledge/melody/melody-invention.md"
  - "docs/m-guide/knowledge/harmony/piano-reduction.md"
  - "docs/m-guide/knowledge/melody/objective-metrics.md"
last-updated: "2026-09-15"
---
# Music quality gate (cuối Bước 3)

> **AI:** Điền gate trong `03-composition-notes.md` trong cùng lượt xuất lead sheet. `structural MusicXML PASS` ≠ `music_quality_gate PASS`. Package 1 bổ sung objective melody audit; không được PASS chỉ vì model tự nhận xét “hay”, “catchy” hoặc “có contrast”.

## Dùng ở bước nào

- Bước 3 — ngay trước khi coi step3 done.

## Constraints

Phải ghi `music_quality_gate: PASS` hoặc `FAIL`. **PASS** chỉ khi mọi hard requirement đạt và không vi phạm [anti-patterns](anti-patterns.md) / [lyric-melody-fit](../lyrics/lyric-melody-fit.md) / [melody-invention](melody-invention.md) / [piano-reduction](../harmony/piano-reduction.md).

### Ngưỡng cứng

| Id | Yêu cầu |
|----|---------|
| `REQUIRE_CHORUS_HOOK` | Có `hook_melody_cell` và xuất hiện rõ ở Chorus |
| `REQUIRE_BRIDGE_CONTRAST` | Bridge khác Verse/Chorus về ≥2 trong: contour, rhythm cell, harmonic color, lyric density |
| `REQUIRE_FINAL_CHORUS_DEVELOPMENT` | Final ≥1 kỹ thuật phát triển (không chỉ register+) |
| `MAX_IDENTICAL_PHRASE_SKELETONS` | Không quá 2 câu liên tiếp cùng pitch+rhythm cell trong Verse (trừ A/A' ghi chú) |
| `MIN_SECTION_CONTRAST` | Verse vs Chorus khác register và/hoặc rhythm và/hoặc cadence |
| `REQUIRE_SPEAK_TEST` | Có `prosody_audit` (hook + ≥1 câu verse) |
| `REQUIRE_STYLE_ECHO` | `style_card_id` khớp compose-prompt |
| `REQUIRE_INVENTED_MELODY` | Không dùng skeleton từ ví dụ docs / một grid gắn mọi lời |
| `REQUIRE_PIANO_TEXTURE` | Có khối `piano_texture`; `sung_sections_ok: true`; Piano (hoặc lớp pitched hòa âm chính) không whole-note-only trên sung sections — xem [piano-reduction](../harmony/piano-reduction.md) |
| `REQUIRE_OBJECTIVE_MELODY_AUDIT` | Có `objective_melody_audit` theo [objective-metrics](objective-metrics.md), dùng artifact-derived evidence; thiếu hoặc `unavailable` ở metric bắt buộc → FAIL |
| `MAX_NEAR_REPEAT` | Không có ≥2 cặp phrase liên tiếp đạt `near_repeat_similarity >= 0.90` nếu không phải declared A/A' hoặc hook repetition |
| `REQUIRE_SECTION_OBJECTIVE_CONTRAST` | Verse→Chorus và Verse→Bridge có evidence theo ít nhất 2 objective dimensions khi section tồn tại |
| `REQUIRE_FINAL_DEVELOPMENT_EVIDENCE` | Final Chorus phải ghi operation cụ thể; `register_shift_only` không đủ |

### Objective melody audit

`03-composition-notes.md` phải có:

```yaml
objective_melody_audit:
  method: "canonical_phrase_v1"
  scope: ...
  metrics:
    exact_repeat_rate: ...
    near_repeat_max: ...
    rhythm_diversity: ...
    contour_diversity: ...
    cadence_variety: ...
    section_contrast: ...
    hook_distinctiveness: ...
    final_development: ...
```

Mỗi metric phải có `value` hoặc trạng thái định danh theo tài liệu metric và `evidence` trỏ về section/phrase cụ thể. Không được dùng adjective đơn độc làm evidence.

### Bảng điểm

Mỗi mục: `ok` | `weak` | `fail` + evidence ngắn.

- `melodic_repetition` / `phrase_similarity` / `section_contrast` / `rhythmic_variety`
- `hook_distinctiveness` / `register_development` / `cadential_variety` / `harmonic_motion`
- `piano_accompaniment`
- `lyric_melody_fit` / `vietnamese_tone_melody` / `style_consistency`

Mọi `fail` → gate **FAIL**. ≥3 `weak` trên melody/prosody → FAIL trừ user chấp nhận tradeoff.

Objective metric hard FAIL cũng là gate FAIL. Warning không tự FAIL, nhưng phải được ghi.

**Thiếu `piano_texture` hoặc `REQUIRE_PIANO_TEXTURE: fail` → gate FAIL.**

## Hints

- Objective metrics là kiểm tra cấu trúc, không phải bằng chứng tuyệt đối rằng bài “hay”.
- Nghe đều đều trên Flat → vẫn ghi fail khi nghe kiểm chứng cho thấy vấn đề, kể cả objective metrics không bắt được; không sửa số liệu để ép PASS.
- Khi metrics PASS nhưng người nghe vẫn thấy nhàm chán, đó là tín hiệu cho lớp đánh giá cảm nhận/candidate selection ở package khác, không mở rộng Package 1 để giải quyết.

## Cách áp dụng

1. Checklist MusicXML structural.
2. Kiểm tra lyric/prosody/tone + anti-patterns.
3. Điền `piano_texture`.
4. Chạy `objective_melody_audit` trên MusicXML đã xuất.
5. Điền bảng điểm + hard requirements.
6. Kết luận `music_quality_gate: PASS/FAIL`.
7. PASS chỉ khi objective audit đủ dữ liệu và không có hard FAIL.

## Related

- `KNOW.MELODY.OBJECTIVE-METRICS`
- `KNOW.MELODY.INVENTION`
- `KNOW.MELODY.ANTI-PATTERNS`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`
- `KNOW.HARMONY.PIANO-REDUCTION`
- `KNOW.MUSICXML.VALIDATION-CHECKLIST`
- `PIPE.STEP-03`
