---
id: KNOW.MELODY.QUALITY-GATE
type: knowledge
status: active
version: "1.3-proposed"
tags: [compose, melody, lyrics, vietnamese, harmony]
serves-steps: [3]
sources:
  - "docs/m-guide/knowledge/melody/anti-patterns.md"
  - "docs/m-guide/knowledge/lyrics/lyric-melody-fit.md"
  - "docs/m-guide/knowledge/melody/melody-invention.md"
  - "docs/m-guide/knowledge/harmony/piano-reduction.md"
  - "runs/compose/2026-09-08-vi-yeu-la-vui-v3/03-song.musicxml"
  - "runs/compose/2026-09-08-vi-yeu-la-vui-v4/03-song.musicxml"
last-updated: "2026-09-08"
needs-approval: true
---
# Music quality gate (cuối Bước 3)

> **AI:** Điền gate trong `03-composition-notes.md` trong cùng lượt xuất lead sheet. `structural MusicXML PASS` ≠ `music_quality_gate PASS`. Notes là báo cáo; **MusicXML là bằng chứng chính**.

## Dùng ở bước nào

- Bước 3 — ngay trước khi coi step3 done (không pha file riêng).

## Constraints

Phải ghi `music_quality_gate: PASS` hoặc `FAIL`. **PASS** chỉ khi mọi ngưỡng dưới đạt và không vi phạm [anti-patterns](anti-patterns.md) / [lyric-melody-fit](../lyrics/lyric-melody-fit.md) / [melody-invention](melody-invention.md) / [piano-reduction](../harmony/piano-reduction.md).

### Ngưỡng cứng hiện hành

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
| `REQUIRE_PIANO_TEXTURE` | Có khối `piano_texture`; `sung_sections_ok: true`; Piano (hoặc lớp pitched hòa âm chính) không whole-note-only trên sung sections |
| `REQUIRE_ARTIFACT_EVIDENCE` | Mọi quality score phải có evidence có thể truy nguyên từ MusicXML hoặc phép so sánh phrase thực tế |
| `REQUIRE_LYRIC_SEMANTIC_ARC` | Mỗi section đóng góp thông tin / trạng thái / góc nhìn mới phù hợp chức năng của section |
| `REQUIRE_TRUE_DEVELOPMENT` | Bridge / Final có biến đổi ý nhạc thực sự; chỉ đổi octave, velocity hoặc sustain không đủ |
| `REQUIRE_PIANO_ARTIFACT_AUDIT` | Kết luận piano phải được suy ra từ XML, không từ mô tả bằng lời |

> Các constraint mới là **proposal**, cần user approval trước merge.

## Bảng điểm

Mỗi mục: `ok` | `weak` | `fail` + evidence ngắn.

- `melodic_repetition` / `phrase_similarity` / `section_contrast` / `rhythmic_variety`
- `hook_distinctiveness` / `register_development` / `cadential_variety` / `harmonic_motion`
- `section_development`
- `lyric_semantic_specificity` / `lyric_progression`
- `piano_accompaniment` — pulse/broken/comp nghe được ở sung sections (`fail` nếu pad whole-note hoặc thiếu part pitched hòa âm)
- `lyric_melody_fit` / `vietnamese_tone_melody` / `style_consistency`

Mọi `fail` → gate **FAIL**. ≥3 `weak` trên melody/prosody/lyrics → FAIL trừ user chấp nhận tradeoff.

## Artifact evidence heuristic

### Melody

- Tách phrase theo section markers / lyric lines / cadence points.
- So sánh **pitch interval pattern + rhythm onset pattern**, không chỉ so chuỗi note tuyệt đối.
- Không coi “đổi register” là biến đổi đủ mạnh.
- Gắn cờ khi cùng một phrase-shape lặp quá rộng trên nhiều section dù có đổi vài nốt hoặc duration.

### Rhythm

- Tính đa dạng onset positions, duration pattern và phrase density.
- Nếu Verse, Pre và Chorus cùng một density/pulse profile trong thời gian dài mà không có mục đích rõ → `rhythmic_variety: weak/fail`.

### Lyrics

- Kiểm `specific_detail`, `action_state_change`, `new_information`, `cliche_risk`, `paraphrase_of_prior`.
- Verse 2 / Bridge không được chỉ thay từ đồng nghĩa nhưng giữ nguyên thông tin và trạng thái.

### Piano

- Đếm onset thực tế từ P2 ở từng sung measure, bỏ `<chord/>` phụ.
- Phân loại `pad | pulse | broken_chord | comping | arpeggio | mixed | rest`.
- Notes tự khai “arpeggio” nhưng XML chỉ có 1 onset/measure → `piano_accompaniment: fail`.

## PASS / FAIL

- Notes tự khai PASS nhưng artifact evidence FAIL → **FAIL**.
- Thiếu `critic_audit` → FAIL.
- Thiếu `piano_artifact_audit` → FAIL.
- FAIL → invent lại phrase/motif/lời liên quan, sau đó audit lại toàn artifact.

## Hints

- Nghe đều đều trên Flat → ghi fail; không biện minh “đủ section”.
- Nghe chỉ voice + hợp âm pad kéo dài → `piano_accompaniment: fail`.
- FAIL → invent lại motif/hook **và** sửa piano texture; xuất lại XML+notes; không patch nốt lẻ.

## Cách áp dụng

1. Checklist MusicXML structural.
2. Tạo draft.
3. Artifact critic pass.
4. Rewrite nếu FAIL.
5. Điền `piano_texture`, bảng điểm và evidence.
6. PASS/FAIL trong notes; STATUS step3 chỉ khi PASS (hoặc override).
