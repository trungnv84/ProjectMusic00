# Template — COMPOSITION_PLAN (Bước 3a)

Lưu: `runs/compose/<run-id>/03a-composition-plan.md`

**Bắt buộc trước** `03-song.musicxml` (trừ khi user bảo chạy liên tục sau khi plan đã hoàn tất trong cùng lượt).

Dừng để user duyệt khi user yêu cầu dừng sau 3a.

---

```text
COMPOSITION_PLAN
──────────────────────────────────────────────
song_title_working: ""
reference_style_id: ""   # phải khớp compose-prompt
key_tempo_meter:
  key: ""
  tempo_bpm:
  meter: "4/4"

hook_melody_cell:
  pitches: ""            # ví dụ: G4–B4–D5–A4
  rhythm: ""             # ví dụ: 8 8 4 4 (hoặc divisions)
  lyric_hook: ""
  why_memorable: ""

motifs_declared:
  - id: verse_a
    pitches: ""
    rhythm: ""
    use_in: [VERSE_1, VERSE_2]
  - id: pre_lift
    pitches: ""
    rhythm: ""
    use_in: [PRE_CHORUS]
  - id: bridge_contrast
    pitches: ""
    rhythm: ""
    use_in: [BRIDGE]

section_contrast_map:
  - section: VERSE
    register: ""
    rhythm_feel: ""
    cadence: ""
  - section: CHORUS
    register: ""
    rhythm_feel: ""
    cadence: ""
    contrast_vs_verse: ""
  - section: BRIDGE
    contrast_dims: []    # ≥2 trong: contour, rhythm, harmony, lyric_density
  - section: FINAL_CHORUS
    development_techniques: []  # không chỉ register+

harmonic_plan:
  verse_loop: ""
  chorus_loop: ""
  bridge_color: ""
  harmonic_rhythm_notes: ""   # chỗ đổi nhanh/chậm có chủ đích

lyric_prosody_map:
  - line: ""
    keywords: []
    strong_beats: ""     # vị trí beat cho keywords
    holds: ""            # nốt ngân
    breaths: ""
  # … đủ hook + mẫu verse/pre/bridge

verse2_variation: ""
speak_test_plan: "will speak lyrics in melody rhythm before locking pitches"

development_checklist:
  REQUIRE_CHORUS_HOOK: pending
  REQUIRE_BRIDGE_CONTRAST: pending
  REQUIRE_FINAL_CHORUS_DEVELOPMENT: pending
```
