# 03-composition-notes.md
Run-id: 2026-09-08-vi-yeu-la-vui-v3
Step: 3 — Compose (lead sheet)
Date: 2026-09-08

COMPOSITION_NOTES
──────────────────────────────────────────────
central_poetic_image:
  chosen_image: "Ánh mắt trong veo + nụ cười khẽ bên đường dưới nắng chiều — khoảnh khắc tình đầu pure, không nặng nề"
  development_across_song: "Verse kể quan sát (ngôi 3); Pre đẩy cảm giác tim đập; Chorus khẳng định 'yêu là vui'; Bridge nhẹ nhàng chấp nhận xa nhưng giữ nụ cười; Final chorus + outro ngân lại hình ảnh vui"

literary_devices_used:
  - device: "Hình ảnh cụ thể (ánh mắt, xe đạp, nắng chiều, tóc bay)"
    location: "Verse 1–2"
    purpose: "Tránh sáo rỗng, tạo cảm giác trong sáng"
  - device: "Lặp hook ngắn"
    location: "Chorus"
    purpose: "Dễ nhớ, dễ hát"
  - device: "Đối lập nhẹ (nếu xa nhau vẫn giữ nụ cười)"
    location: "Bridge"
    purpose: "Tạo chiều sâu mà không bi thương"

reference_style_handling:
  - style_card_id: "STYLE.VN.VPOP-BALLAD"
    how_applied: "đặc trưng khái quát only: tempo ~70, harmony I–V–vi–IV + biến thể, verse thưa, chorus nâng register, hook ngắn, cảm xúc cá nhân nhưng ngôi 3 theo yêu cầu user"
    no_copy_affirmation: true

resolved_delegated_fields:
  - field: "HARMONY"
    decision: "C major; progression chính I–V–vi–IV (C–G–Am–F); Pre dùng ii–V–I nhẹ (Dm–G–C); Bridge vi–IV–I–V rồi climb; không modulation (chỉ 1 option nhẹ bị bỏ vì không cần thiết cho cảm xúc trong sáng)"
    rationale: "Trong biên ballad V-Pop; giữ sáng, dễ hát nữ"
    alternatives_considered: ["G major", "modulation +1 semitone ở final chorus"]
  - field: "EMOTION"
    decision: "primary = vui tươi trong sáng; secondary = ngọt ngào nhẹ, ấm áp"
    rationale: "Khớp CONCEPT mối tình đầu pure"
  - field: "title"
    decision: "Yêu Là Vui"
    rationale: "Lấy trực tiếp từ hook ngắn dễ nhớ; đặt sau khi chốt lời"

motifs_declared:
  - id: "M1_verse"
    pitches: "E4–D4–C4–D4–E4–G4"
    rhythm: "quarter–eighth–eighth–quarter–quarter–half (mở rộng)"
  - id: "M2_pre"
    pitches: "A4–G4–F4–E4–D4"
    rhythm: "eighth-pair rising then fall"
  - id: "M3_hook"
    pitches: "C5–B4–A4–G4–A4–G4–E4"
    rhythm: "quarter–eighth–eighth–quarter–eighth–eighth–half"
  - id: "M4_bridge"
    pitches: "F4–E4–D4–C4–D4–E4–F4 (descending then gentle rise)"
    rhythm: "more sustained, longer notes"

hook_melody_cell:
  pitches: "C5 B4 A4 | G4 A4 G4 E4"
  rhythm: "q e e | q e e h"
  lyric_hook: "Yêu là vui, vui thế thôi"

section_contrast_map:
  - section: "Verse"
    contrast_notes: "Register mid (C4–G4), bước liền, kể chuyện, mật độ vừa"
  - section: "Pre"
    contrast_notes: "Leo dần, đẩy năng lượng về chorus"
  - section: "Chorus"
    contrast_notes: "Register cao hơn (E4–C5), hook rõ, mở rộng"
  - section: "Bridge"
    contrast_notes: "Contour xuống trước rồi lên nhẹ, harmonic color vi–IV, lyric density thấp hơn, cảm xúc chấp nhận"
  - section: "Final Chorus"
    contrast_notes: "Lặp hook + thêm một lần echo cuối câu, sustain dài hơn ở 'vui'"

tone_melody_tradeoffs:
  - "Hook 'Yêu là vui' (ngang–huyền–ngang): giữ cao độ ổn định rồi hơi xuống nhẹ ở 'là' rồi lên lại 'vui' → similar/oblique, không đảo nghĩa"
  - "Từ khóa 'trong veo' (ngang–ngang): giữ ngang, không ép lên"
  - "Từ 'nụ cười' (nặng–ngang): 'nụ' ngắn thấp, 'cười' ngang ổn định"
  - "Không dùng công thức ±1 máy móc; ưu tiên similar motion ở từ khóa + speak-test"

prosody_audit:
  - line: "Yêu là vui, vui thế thôi"
    syllables:
      - {syl: "Yêu", tone: "ngang", beat: "1", duration: "q", keyword: true}
      - {syl: "là", tone: "huyền", beat: "2", duration: "e", keyword: false}
      - {syl: "vui", tone: "ngang", beat: "2+", duration: "e", keyword: true}
      - {syl: "vui", tone: "ngang", beat: "3", duration: "q", keyword: true}
      - {syl: "thế", tone: "hỏi", beat: "4", duration: "e", keyword: false}
      - {syl: "thôi", tone: "ngang", beat: "4+", duration: "e+h", keyword: false}
    speak_test: pass
    notes: "Hook dễ nói theo nhịp; trọng âm khớp beat mạnh"
  - line: "Cậu ấy nhìn em lần đầu"
    syllables:
      - {syl: "Cậu", tone: "nặng", beat: "1", duration: "q", keyword: true}
      - {syl: "ấy", tone: "hỏi", beat: "2", duration: "e", keyword: false}
      - {syl: "nhìn", tone: "huyền", beat: "2+", duration: "e", keyword: true}
      - {syl: "em", tone: "ngang", beat: "3", duration: "q", keyword: true}
      - {syl: "lần", tone: "huyền", beat: "4", duration: "e", keyword: false}
      - {syl: "đầu", tone: "huyền", beat: "4+", duration: "e", keyword: true}
    speak_test: pass
    notes: "Câu mở kể chuyện tự nhiên; 'Cậu ấy' nặng–hỏi xuống nhẹ"

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
    REQUIRE_INVENTED_MELODY: pass
  evidence: "Hook cell riêng; Verse dùng M1 khác Pre M2 và Bridge M4; Final chorus có sustain + echo; không skeleton lặp ≥3 câu; thanh điệu ưu tiên similar ở keyword; style card STYLE.VN.VPOP-BALLAD khớp"
  if_fail: "rewrite whole lead sheet with new motifs — do not patch isolated notes"

deviations_or_tradeoffs:
  - "Không modulation (dù schema cho phép tối đa 1 nhẹ) vì cảm xúc trong sáng vui tươi không cần cao trào tonal lớn"
  - "Ngôi thứ 3 (theo CONCEPT user) thay vì ngôi 1 điển hình của style card — ưu tiên yêu cầu user"

musicxml_parts:
  - id: P1
    name: Voice
  - id: P2
    name: Piano

structure:
  tempo_bpm: 70
  meter: "4/4"
  key: "C major"
  form:
    - INTRO: measures 1–4
    - VERSE_1: measures 5–8
    - PRE_1: measures 9–12
    - CHORUS_1: measures 13–20
    - VERSE_2: measures 21–28
    - PRE_2: measures 29–32
    - CHORUS_2: measures 33–40
    - BRIDGE: measures 41–48
    - CHORUS_FINAL: measures 49–56
    - OUTRO: measures 57–60
  lyric_policy:
    syllable_to_note: "1 Vietnamese syllable → 1 note (ưu tiên)"
    syllabic: "single"
    melisma: false   # chỉ dùng rất hạn chế nếu cần

lyrics_by_section:
  - section: INTRO
    measures: "1-4"
    lines: []
  - section: VERSE_1
    measures: "5-8"
    lines:
      - "Cậu ấy nhìn em lần đầu"
      - "Ánh mắt trong veo như mưa"
      - "Hai đứa cười khẽ bên nhau"
      - "Thời gian như ngừng lại rồi"
  - section: PRE_1
    measures: "9-12"
    lines:
      - "Tim đập nhanh hơn một chút"
      - "Không biết vì sao thế"
  - section: CHORUS_1
    measures: "13-20"
    lines:
      - "Yêu là vui, vui thế thôi"
      - "Không cần nghĩ nhiều điều gì"
      - "Chỉ cần bên nhau mỗi ngày"
      - "Tình đầu ơi, vui thế"
  - section: VERSE_2
    measures: "21-28"
    lines:
      - "Cùng đạp xe dưới nắng chiều"
      - "Gió thổi tóc em bay bay"
      - "Chia sẻ hết những chuyện vui"
      - "Mãi mãi không quên ngày ấy"
  - section: PRE_2
    measures: "29-32"
    lines:
      - "Tim đập nhanh hơn một chút"
      - "Không biết vì sao thế"
  - section: CHORUS_2
    measures: "33-40"
    lines:
      - "Yêu là vui, vui thế thôi"
      - "Không cần nghĩ nhiều điều gì"
      - "Chỉ cần bên nhau mỗi ngày"
      - "Tình đầu ơi, vui thế"
  - section: BRIDGE
    measures: "41-48"
    lines:
      - "Nếu một ngày phải xa nhau"
      - "Vẫn giữ trong tim nụ cười"
      - "Vì tình đầu đã cho ta"
      - "Những ngày đẹp nhất đời"
  - section: CHORUS_FINAL
    measures: "49-56"
    lines:
      - "Yêu là vui, vui thế thôi"
      - "Không cần nghĩ nhiều điều gì"
      - "Chỉ cần bên nhau mỗi ngày"
      - "Tình đầu ơi, vui thế (vui thế)"
  - section: OUTRO
    measures: "57-60"
    lines:
      - "Yêu là vui…"
