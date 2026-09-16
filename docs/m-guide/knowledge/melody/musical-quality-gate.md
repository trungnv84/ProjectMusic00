---
id: KNOW.MELODY.QUALITY-GATE
type: knowledge
status: active
version: "1.4"
tags: [compose, melody, lyrics, vietnamese, harmony]
serves-steps: [3]
sources:
  - "docs/m-guide/knowledge/melody/anti-patterns.md"
  - "docs/m-guide/knowledge/lyrics/lyric-melody-fit.md"
  - "docs/m-guide/knowledge/melody/melody-invention.md"
  - "docs/m-guide/knowledge/melody/catchiness.md"
  - "docs/m-guide/knowledge/melody/objective-metrics.md"
  - "docs/m-guide/knowledge/harmony/piano-reduction.md"
  - "runs/upgrade/2026-09-14-nang-som-tinh-khoi-catchy/run-review.md"
  - "runs/upgrade/2026-09-15-melody-objective-system-pack-1/run-review.md"
last-updated: "2026-09-15"
---

# Music quality gate (cuối Bước 3)

> **AI:** Điền gate trong `03-composition-notes.md` **trong cùng lượt** xuất lead sheet. `structural MusicXML PASS` ≠ `music_quality_gate PASS` ≠ giai điệu catchy. Từ v1.4: phần melody similarity/contrast/development phải có **evidence trích từ artifact** theo [objective-metrics](objective-metrics.md) — không được PASS chỉ vì tự nhận xét "nghe hay", "đủ contrast".

## Dùng ở bước nào

- Bước 3 — ngay trước khi coi step3 done (không pha file riêng).

## Constraints

Phải ghi `music_quality_gate: PASS` hoặc `FAIL`. **PASS** chỉ khi mọi ngưỡng dưới đạt và không vi phạm [anti-patterns](anti-patterns.md) / [lyric-melody-fit](../lyrics/lyric-melody-fit.md) / [melody-invention](melody-invention.md) / [catchiness](catchiness.md) / [piano-reduction](../harmony/piano-reduction.md) / [objective-metrics](objective-metrics.md).

### Ngưỡng cứng

| Id | Yêu cầu |
|----|---------|
| `REQUIRE_CHORUS_HOOK` | Có `hook_melody_cell` (mô tả pitch sequence + rhythm cell) và xuất hiện rõ ở Chorus |
| `REQUIRE_CATCHY_HOOK` | Hook cell ngắn / rõ contour / có rhythmic identity; notes ghi evidence catchiness (contour type, limited pitch set?, rest/syncop?, vị trí hook trong câu); mỗi lần Chorus lặp có ≥1 biến đổi nghe được (không lặp 100% quá 2 lần liên tiếp) — xem [catchiness](catchiness.md) |
| `REQUIRE_MELODIC_COHERENCE` | Trong mỗi section chính, các phrase chia sẻ DNA motif (contour/rhythm cell/interval pattern) — không rời rạc hoàn toàn (anti-pattern #10) |
| `REQUIRE_BRIDGE_CONTRAST` | Bridge khác Verse/Chorus về ≥2 trong: contour, rhythm cell, harmonic color, lyric density |
| `REQUIRE_FINAL_CHORUS_DEVELOPMENT` | Final ≥1 kỹ thuật phát triển (không chỉ register+); Chorus Final không được ≥90% trùng pitch+rhythm với Chorus 1 (anti-pattern #2) |
| `MAX_IDENTICAL_PHRASE_SKELETONS` | Không quá 2 câu liên tiếp cùng pitch+rhythm cell trong Verse (trừ A/A' ghi chú); Verse 2 không được clone toàn bộ skeleton Verse 1 theo cặp câu tương ứng (anti-pattern #9) |
| `MIN_SECTION_CONTRAST` | Verse vs Chorus khác register và/hoặc rhythm và/hoặc cadence |
| `REQUIRE_SPEAK_TEST` | Có `prosody_audit` (hook + ≥1 câu verse) |
| `REQUIRE_STYLE_ECHO` | `style_card_id` khớp compose-prompt |
| `REQUIRE_INVENTED_MELODY` | Không dùng skeleton từ ví dụ docs / một grid gắn mọi lời |
| `REQUIRE_PIANO_TEXTURE` | Có khối `piano_texture`; `sung_sections_ok: true`; Piano (hoặc lớp pitched hòa âm chính) **không** whole-note-only trên sung sections — xem [piano-reduction](../harmony/piano-reduction.md) |
| `REQUIRE_OBJECTIVE_MELODY_AUDIT` | Có `objective_melody_audit` theo [objective-metrics](objective-metrics.md) — canonical phrase representation + metric có `value`/`evidence` trích từ MusicXML; metric bắt buộc mà `unavailable` → FAIL |
| `MAX_NEAR_REPEAT` | Không ≥2 cặp phrase liên tiếp có `near_repeat_similarity ≥ 0.90` trừ khi được khai rõ là A/A' hoặc hook repetition |
| `REQUIRE_SECTION_OBJECTIVE_CONTRAST` | Verse→Chorus và Verse→Bridge (khi section tồn tại) phải có evidence khác biệt ở ≥2 dimension đo được (register/rhythm/contour/cadence) — không chỉ ghi "nghe khác" |
| `REQUIRE_FINAL_DEVELOPMENT_EVIDENCE` | Final Chorus phải ghi rõ operation cụ thể (`rhythmic_rewrite`, `cadence_change`, `phrase_extension_or_compression`, `fragmentation_or_augmentation`, `sequence_with_new_context`, `new_counterphrase`, `reordered_motif_components`); `register_shift_only` không đủ |

### Objective melody audit

`03-composition-notes.md` phải có khối `objective_melody_audit` (method, scope, metrics: `exact_repeat_rate`,
`near_repeat_max`, `rhythm_diversity`, `contour_diversity`, `cadence_variety`, `section_contrast`,
`hook_distinctiveness`, `final_development`) — mỗi metric có `value`/trạng thái + `evidence` trỏ về
section/phrase cụ thể theo đúng format ở [objective-metrics](objective-metrics.md). Đây là audit **cấu
trúc**, không chứng minh thẩm mỹ tuyệt đối — nếu nghe vẫn chán dù metric PASS, vẫn ghi fail trên speak/listen
test tương ứng, không sửa số liệu để ép PASS.

### Bảng điểm

Mỗi mục: `ok` | `weak` | `fail` + evidence ngắn.

- `melodic_repetition` / `phrase_similarity` / `section_contrast` / `rhythmic_variety`
- `hook_distinctiveness` / `melodic_coherence` / `register_development` / `cadential_variety` / `harmonic_motion`
- `piano_accompaniment` — pulse/broken/comp nghe được ở sung sections (`fail` nếu pad whole-note hoặc thiếu part pitched hòa âm)
- `lyric_melody_fit` / `vietnamese_tone_melody` / `style_consistency`

Mọi `fail` → gate **FAIL**. ≥3 `weak` trên melody/prosody → FAIL trừ user chấp nhận tradeoff.

**Thiếu `piano_texture` hoặc `REQUIRE_PIANO_TEXTURE: fail` → gate FAIL** — không được PASS rồi "để Bước 4 sửa".

**Thiếu `hook_melody_cell` mô tả cụ thể, thiếu evidence catchiness, hoặc `REQUIRE_CATCHY_HOOK: fail` / `REQUIRE_MELODIC_COHERENCE: fail` → gate FAIL.** Ghi "đã catchy" mà không giải thích không tính là evidence.

**Thiếu `objective_melody_audit` hoặc `REQUIRE_OBJECTIVE_MELODY_AUDIT: fail` → gate FAIL.** Metric hard FAIL (theo [objective-metrics](objective-metrics.md)) cũng là gate FAIL; warning không tự FAIL nhưng phải được ghi lại trong evidence.

## Hints

- Nghe đều đều / rời rạc / không muốn ngân nga trên Flat → ghi fail; không biện minh "đủ section" — kể cả khi objective metrics vẫn PASS (metric chỉ bắt dấu hiệu cấu trúc đã định nghĩa, không chứng minh cảm xúc/thẩm mỹ).
- Nghe chỉ voice + hợp âm pad kéo dài → `piano_accompaniment: fail`.
- FAIL → invent lại motif/hook (kể cả hook cell) **và** sửa piano texture; xuất lại XML+notes; không patch nốt lẻ.

## Cách áp dụng

1. Checklist MusicXML structural.
2. Điền `piano_texture` (bắt buộc) + `hook_melody_cell` + `motifs_declared` + evidence catchiness.
3. Canonicalize phrase theo [objective-metrics](objective-metrics.md) trên MusicXML đã xuất, tính các metric, điền `objective_melody_audit`.
4. Điền bảng điểm + ngưỡng — gồm `REQUIRE_CATCHY_HOOK`, `REQUIRE_MELODIC_COHERENCE`, `REQUIRE_PIANO_TEXTURE`, `REQUIRE_OBJECTIVE_MELODY_AUDIT`, `MAX_NEAR_REPEAT`, `REQUIRE_SECTION_OBJECTIVE_CONTRAST`, `REQUIRE_FINAL_DEVELOPMENT_EVIDENCE`.
5. PASS/FAIL trong notes; STATUS step3 chỉ khi PASS (hoặc override).

## Related

- `KNOW.MELODY.INVENTION`
- `KNOW.MELODY.CATCHINESS`
- `KNOW.MELODY.ANTI-PATTERNS`
- `KNOW.MELODY.OBJECTIVE-METRICS`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`
- `KNOW.HARMONY.PIANO-REDUCTION`
- `KNOW.MUSICXML.VALIDATION-CHECKLIST`
- `PIPE.STEP-03`
