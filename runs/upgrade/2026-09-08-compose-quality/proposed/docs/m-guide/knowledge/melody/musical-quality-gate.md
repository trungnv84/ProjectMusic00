---
id: KNOW.MELODY.QUALITY-GATE
type: knowledge
status: active
version: "1.0"
tags: [compose, melody, lyrics, vietnamese]
serves-steps: [3]
sources:
  - "docs/m-guide/knowledge/melody/anti-patterns.md"
  - "docs/m-guide/knowledge/lyrics/lyric-melody-fit.md"
last-updated: "2026-09-08"
needs-approval: true
---

# Music quality gate (Bước 3c)

> **AI:** Điền gate trong `03-composition-notes.md` **trước** khi coi step3 done. `structural MusicXML PASS` ≠ `music_quality_gate PASS`.

## Dùng ở bước nào

- Bước 3 pha 3c — sau khi có lead sheet + notes.

## Constraints

Phải ghi `music_quality_gate: PASS` hoặc `FAIL`. **PASS** chỉ khi mọi ngưỡng dưới đạt và không vi phạm [anti-patterns](anti-patterns.md) / [lyric-melody-fit](../lyrics/lyric-melody-fit.md).

### Ngưỡng cứng

| Id | Yêu cầu |
|----|---------|
| `REQUIRE_CHORUS_HOOK` | Có `hook_melody_cell` (pitch + rhythm) khai báo và xuất hiện rõ ở Chorus |
| `REQUIRE_BRIDGE_CONTRAST` | Bridge khác Verse/Chorus về ≥2 trong: contour, rhythm cell, harmonic color, lyric density |
| `REQUIRE_FINAL_CHORUS_DEVELOPMENT` | Final dùng ≥1 kỹ thuật phát triển (không chỉ register+) |
| `MAX_IDENTICAL_PHRASE_SKELETONS` | Không quá 2 câu liên tiếp cùng pitch+rhythm cell trong Verse (trừ A/A' ghi chú) |
| `MIN_SECTION_CONTRAST` | Verse vs Chorus khác biệt rõ về register và/hoặc rhythm và/hoặc cadence |
| `REQUIRE_SPEAK_TEST` | Notes có `prosody_audit` (hook + ≥1 câu verse) với speak-test |
| `REQUIRE_STYLE_ECHO` | `reference_style_handling.style_card_id` khớp id trong compose-prompt |

### Bảng điểm (ghi evidence ngắn)

Điền mỗi mục: `ok` | `weak` | `fail` + 1 câu evidence.

- `melodic_repetition`
- `phrase_similarity`
- `section_contrast`
- `rhythmic_variety`
- `hook_distinctiveness`
- `register_development`
- `cadential_variety`
- `harmonic_motion`
- `lyric_melody_fit`
- `vietnamese_tone_melody`
- `style_consistency`

Bất kỳ mục `fail` → gate **FAIL**. ≥3 mục `weak` trên melody/prosody → FAIL trừ khi user chấp nhận tradeoff tường minh.

## Hints

- Chấm trung thực: nếu nghe đều đều trên Flat, ghi fail — không biện minh bằng “đủ section”.
- FAIL → sửa `03a` rồi sinh lại XML; không patch nốt lẻ.

## Cách áp dụng

1. Chạy checklist MusicXML structural riêng.
2. Điền bảng điểm + ngưỡng cứng.
3. Kết luận PASS/FAIL trong notes.
4. Cập nhật `STATUS.md` step3 chỉ khi PASS (hoặc user chấp nhận FAIL có chủ đích).

## Related

- `KNOW.MELODY.ANTI-PATTERNS`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`
- `KNOW.MUSICXML.VALIDATION-CHECKLIST`
- `PIPE.STEP-03`
