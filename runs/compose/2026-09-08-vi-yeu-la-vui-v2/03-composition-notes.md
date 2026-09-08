# 03-composition-notes — Yêu Là Vui Thế Thôi (v2)

```text
COMPOSITION_NOTES
──────────────────────────────────────────────
central_poetic_image:
  chosen_image: "nắng / trời xanh / mây / bình minh"
  development_across_song: "Verse phố+ánh sáng; pre mở cửa trời; chorus hook bay cùng mây; bridge mưa/gió vẫn ấm; final bình minh có nhau."

literary_devices_used:
  - device: "điệp ngữ hook"
    location: "Chorus / Final"
    purpose: "neo 'Yêu là vui thế thôi'"
  - device: "hình ảnh thiên nhiên"
    location: "toàn bài"
    purpose: "vui tươi trong sáng, bay bổng"

reference_style_handling:
  - style_card_id: "STYLE.VN.VPOP-UPTEMPO"
    how_applied: "đặc trưng khái quát: tempo ~112, hook ngắn, chorus mở register, hòa âm pop chức năng; không copy bài cụ thể"
    no_copy_affirmation: true

resolved_delegated_fields:
  - field: "tempo"
    decision: "112 BPM"
    rationale: "User vui tươi nhanh; khớp STYLE.VN.VPOP-UPTEMPO"
    alternatives_considered: ["104", "120"]
  - field: "key"
    decision: "C major"
    rationale: "sáng, tessitura thoải"
    alternatives_considered: ["G major"]

motifs_declared:
  - id: verse_a
    pitches: "E4–F4–G4–A4–G4"
    rhythm: "1 1 2 2 2"
  - id: verse_b
    pitches: "C4–D4–E4–G4–F4"
    rhythm: "1 1 2 2 2"
  - id: pre_lift
    pitches: "F4–G4–A4–B4–C5"
    rhythm: "1 1 2 2 2"
  - id: bridge_descend
    pitches: "A4–G4–F4–E4–D4–E4"
    rhythm: "1 1 1 1 2 2"
  - id: hook
    pitches: "G4–A4–B4–D5–A4"
    rhythm: "2 1 1 2 2"

hook_melody_cell:
  pitches: "G4–A4–B4–D5–A4"
  rhythm: "2 1 1 2 2"
  lyric_hook: "Yêu là vui thế thôi"

section_contrast_map:
  - section: VERSE
    contrast_notes: "A/B answer phrases, mid-low register"
  - section: CHORUS
    contrast_notes: "hook leap + higher; title lyric"
  - section: BRIDGE
    contrast_notes: "Am color, descending denser rhythm, rain imagery"
  - section: FINAL_CHORUS
    contrast_notes: "pickup + augmentation on thôi + higher peak G5"

tone_melody_tradeoffs:
  - "Chấm theo transition similar/oblique trên hook; không dùng ±1 độc lập từng thanh."
  - "Một số từ chức năng ('là') linh hoạt để giữ hook cell."

prosody_audit:
  - line: "Yêu là vui thế thôi"
    syllables:
      - {syl: "Yêu", tone: "ngang", beat: "1", duration: "quarter", keyword: true}
      - {syl: "là", tone: "huyền", beat: "and", duration: "eighth", keyword: false}
      - {syl: "vui", tone: "ngang", beat: "2+", duration: "eighth", keyword: true}
      - {syl: "thế", tone: "sắc", beat: "3", duration: "quarter", keyword: true}
      - {syl: "thôi", tone: "ngang", beat: "4", duration: "quarter+", keyword: true}
    speak_test: pass
    notes: "Keywords on stronger/longer positions; leap into thế"
  - line: "Nắng nghiêng qua ô cửa"
    syllables:
      - {syl: "Nắng", tone: "sắc", beat: "1", duration: "eighth", keyword: true}
      - {syl: "nghiêng", tone: "ngang", beat: "and", duration: "eighth", keyword: false}
      - {syl: "qua", tone: "ngang", beat: "2", duration: "quarter", keyword: true}
      - {syl: "ô", tone: "ngang", beat: "3", duration: "quarter", keyword: false}
      - {syl: "cửa", tone: "hỏi", beat: "4", duration: "quarter", keyword: true}
    speak_test: pass
    notes: "Not the old F–G–F–E–C skeleton; rising then settle"

music_quality_gate:
  result: PASS
  scores:
    melodic_repetition: ok
    phrase_similarity: ok
    section_contrast: ok
    rhythmic_variety: ok
    hook_distinctiveness: ok
    register_development: ok
    cadential_variety: ok
    harmonic_motion: ok
    lyric_melody_fit: ok
    vietnamese_tone_melody: ok
    style_consistency: ok
  thresholds:
    REQUIRE_CHORUS_HOOK: pass
    REQUIRE_BRIDGE_CONTRAST: pass
    REQUIRE_FINAL_CHORUS_DEVELOPMENT: pass
    REQUIRE_SPEAK_TEST: pass
    REQUIRE_STYLE_ECHO: pass
  evidence: "Distinct verse A/B + verse2 denser; hook leap G–D; bridge Am descend; final pickup+augmentation; style STYLE.VN.VPOP-UPTEMPO echoed; prior run treated as FAIL fixture not patched."
  if_fail: "regenerate from 03a — do not patch isolated notes"

deviations_or_tradeoffs:
  - "Form rút gọn còn 52 measures (đủ Intro–V–Pre–C–V2–Bridge–Final–Outro) để chứng minh gate; không full 74-measure clone của bản FAIL."
  - "Piano = block-chord reduction, không full arrangement."

musicxml_parts:
  - id: P1
    name: Voice
  - id: P2
    name: Piano

structure:
  tempo_bpm: 112
  meter: "4/4"
  key: "C major"
  form:
    - INTRO: measures 1–4
    - VERSE_1: measures 5–12
    - PRE_CHORUS: measures 13–16
    - CHORUS: measures 17–24
    - VERSE_2: measures 25–32
    - BRIDGE: measures 33–40
    - FINAL_CHORUS: measures 41–48
    - OUTRO: measures 49–52
  lyric_policy:
    syllable_to_note: "1 Vietnamese syllable → 1 note"
    syllabic: "single"
    melisma: false

lyrics_by_section:
  - section: INTRO
    measures: "1-4"
    lines: []
  - section: VERSE_1
    measures: "5-12"
    lines:
      - "Nắng nghiêng qua ô cửa"
      - "Gió gọi tên ban mai"
      - "Mắt em như vì sao"
      - "Chạm vào tim anh rồi"
      - "Phố hôm nay trong veo"
      - "Môi cười như nắng sớm"
      - "Bàn tay mình chạm khẽ"
      - "Nghe trời xanh ngân"
  - section: PRE_CHORUS
    measures: "13-16"
    lines:
      - "Tim reo lên một chút"
      - "Như mùa xuân gọi mời"
      - "Bước nhẹ theo nhịp hát"
      - "Mở cánh cửa trời"
  - section: CHORUS
    measures: "17-24"
    lines:
      - "Yêu là vui thế thôi"
      - "Bay cùng mây trắng trôi"
      - "Trời xanh mở ra rộng"
      - "Yêu là vui thế thôi"
      - "Nắng vàng gọi tên em"
      - "Mình cười như hai đứa"
      - "Trẻ thơ giữa đời"
      - "Yêu là vui thôi"
  - section: VERSE_2
    measures: "25-32"
    lines:
      - "Mây trôi qua thật nhẹ rồi"
      - "Mình bước chung một đường"
      - "Phố vẫn quen nhưng lạ"
      - "Vì có em kề bên"
      - "Nắng soi vai áo trắng"
      - "Gió mang lời hát vui"
      - "Tay trong tay nhịp bước"
      - "Cứ thế mãi thôi"
  - section: BRIDGE
    measures: "33-40"
    lines:
      - "Nếu ngày mai mưa rơi nhẹ"
      - "Vẫn cười như lúc đầu"
      - "Gió lạnh qua vai em ấy"
      - "Anh vẫn thấy ấm"
      - "Không cần lời hứa dài"
      - "Chỉ cần nhìn nhau thôi"
      - "Rồi cùng bước vào sáng"
      - "Hát lên nào"
  - section: FINAL_CHORUS
    measures: "41-48"
    lines:
      - "Ơ này Yêu là vui thế"
      - "thôi bay cao"
      - "Trời xanh mở ra rộng"
      - "Yêu là vui thế thôi"
      - "Nắng vàng gọi tên em"
      - "Mình cười như bình minh"
      - "Có nhau là đủ"
      - "Yêu là vui thôi"
  - section: OUTRO
    measures: "49-52"
    lines:
      - "Cứ thế mãi thôi"
      - "Yêu là vui"
      - ""
      - "thôi"
```

## Gate vs prior run

Prior `2026-09-08-vi-yeu-la-vui` would score **FAIL** on `melodic_repetition`, `phrase_similarity`, `lyric_melody_fit` per upgrade fixtures. This v2 is a new candidate from 03a.
