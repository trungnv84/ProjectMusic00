COMPOSITION_NOTES
──────────────────────────────────────────────
central_poetic_image:
  chosen_image: "hai đứa trẻ nắm tay dưới nắng vàng, cười giản đơn không cần lời"
  development_across_song: "Verse kể cảnh đời thường trong sáng → Pre đẩy cảm xúc nhẹ → Chorus khẳng định 'Yêu là vui' → Bridge nhìn lại khoảnh khắc đầu → Final Chorus ngân nga sâu hơn rồi Outro tan dần"

literary_devices_used:
  - device: "lặp điệp (hook)"
    location: "Chorus"
    purpose: "tạo câu dễ nhớ, vui tươi"
  - device: "hình ảnh cụ thể (nắng vàng, gió thoảng, cười)"
    location: "Verse"
    purpose: "tránh sáo rỗng, giữ trong sáng"
  - device: "ngôi thứ ba"
    location: "toàn bài"
    purpose: "kể chuyện quan sát, nhẹ nhàng"

reference_style_handling:
  - style_card_id: "STYLE.VN.VPOP-BALLAD"
    how_applied: "đặc trưng khái quát only: ~70 BPM ballad, I–V–vi–IV biến thể, verse bước liền, chorus nâng register + hook ngắn, texture thưa→dày"
    no_copy_affirmation: true

resolved_delegated_fields:
  - field: "HARMONY"
    decision: "C major, progression I–V–vi–IV (C–G–Am–F) chủ đạo; Pre dùng ii–V; Bridge Am–F–C–G; không modulation"
    rationale: "DELEGATED trong biên ballad V-Pop; tối đa 1 modulation nhưng bài này giữ cùng key để trong sáng vui tươi"
    alternatives_considered: ["modulation lên D ở final chorus", "vi–IV–I–V"]
  - field: "EMOTION"
    decision: "primary: vui tươi trong sáng; secondary: nhẹ nhàng, hy vọng, dịu dàng"
    rationale: "phù hợp CONCEPT mối tình đầu"
    alternatives_considered: []
  - field: "title"
    decision: "Yêu Là Vui"
    rationale: "hook ngắn dễ nhớ, khớp lời"

motifs_declared:
  - id: "verse_motif"
    pitches: "E4–D4–C4–D4 | E4–G4–E4–D4"
    rhythm: "quarter + eighth + eighth + quarter | similar"
  - id: "pre_motif"
    pitches: "F4–G4–A4–G4"
    rhythm: "eighth–eighth–quarter–quarter (đẩy lên)"
  - id: "chorus_hook_motif"
    pitches: "C5–B4–A4–G4 | A4–G4–F4–E4"
    rhythm: "quarter–quarter–quarter–quarter (rõ, dễ ngân)"
  - id: "bridge_motif"
    pitches: "A4–G4–F4–E4 | D4–E4–F4–G4"
    rhythm: "half + quarter + quarter (chậm hơn, khác contour)"

hook_melody_cell:
  pitches: "C5–B4–A4–G4"
  rhythm: "q–q–q–q"
  lyric_hook: "Yêu là vui"

section_contrast_map:
  - section: "VERSE"
    contrast_notes: "register trung (C4–E4), bước liền, nhịp kể chuyện"
  - section: "PRE"
    contrast_notes: "leo dần A4, mật độ nhịp tăng nhẹ"
  - section: "CHORUS"
    contrast_notes: "register cao hơn (G4–C5), hook rõ, cadence mạnh"
  - section: "BRIDGE"
    contrast_notes: "contour ngược (xuống rồi lên), harmonic color Am, lyric density thấp hơn"

tone_melody_tradeoffs:
  - "Hook 'Yêu là vui': 'Yêu' (ngang) giữ ổn định → 'là' (huyền) xuống → 'vui' (ngang) giữ; similar motion ưu tiên."
  - "Verse 'Hai đứa ngồi': thanh ngang–sắc–huyền xử lý bằng bước liền xuống nhẹ, không đảo nghĩa."
  - "Không dùng công thức ±1 máy móc; tradeoff ghi nhận ở từ chức năng (là, và, thì) linh hoạt vì motif."

prosody_audit:
  - line: "Yêu là vui, vui như nắng mai"
    syllables:
      - {syl: "Yêu", tone: "ngang", beat: 1, duration: "quarter", keyword: true}
      - {syl: "là", tone: "huyền", beat: 2, duration: "quarter", keyword: false}
      - {syl: "vui", tone: "ngang", beat: 3, duration: "quarter", keyword: true}
      - {syl: "vui", tone: "ngang", beat: 1, duration: "quarter", keyword: true}
      - {syl: "như", tone: "huyền", beat: 2, duration: "eighth", keyword: false}
      - {syl: "nắng", tone: "sắc", beat: 2.5, duration: "eighth", keyword: true}
      - {syl: "mai", tone: "ngang", beat: 3, duration: "half", keyword: false}
    speak_test: pass
    notes: "stress khớp beat mạnh; thanh similar motion"
  - line: "Hai đứa ngồi dưới nắng vàng"
    syllables:
      - {syl: "Hai", tone: "ngang", beat: 1, duration: "quarter", keyword: false}
      - {syl: "đứa", tone: "sắc", beat: 2, duration: "quarter", keyword: true}
      - {syl: "ngồi", tone: "huyền", beat: 3, duration: "quarter", keyword: false}
      - {syl: "dưới", tone: "sắc", beat: 4, duration: "eighth", keyword: false}
      - {syl: "nắng", tone: "sắc", beat: 4.5, duration: "eighth", keyword: true}
      - {syl: "vàng", tone: "huyền", beat: 1 (next), duration: "half", keyword: false}
    speak_test: pass
    notes: "contour xuống nhẹ phù hợp huyền cuối câu"

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
  evidence: "Hook 'Yêu là vui' C5–B4–A4–G4 xuất hiện rõ; Bridge contour + Am color khác; Final Chorus thêm sustain cuối; không skeleton lặp ≥3 câu; style V-Pop ballad echo đúng; prosody + tone transitions pass speak-test."
  if_fail: "rewrite whole lead sheet with new motifs — do not patch isolated notes"

deviations_or_tradeoffs:
  - "Không modulation (giữ C major toàn bài) để cảm giác trong sáng, vui tươi ổn định."
  - "Piano reduction đơn giản (block + arpeggio nhẹ) — đủ lead sheet, không full band."

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
    - VERSE_1: measures 5–12
    - PRE_1: measures 13–16
    - CHORUS_1: measures 17–24
    - VERSE_2: measures 25–32
    - PRE_2: measures 33–36
    - CHORUS_2: measures 37–44
    - BRIDGE: measures 45–52
    - CHORUS_3: measures 53–60
    - OUTRO: measures 61–64
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
      - "Hai đứa ngồi dưới nắng vàng"
      - "Cười với nhau chẳng cần nói nhiều"
      - "Tay nắm tay nhẹ như gió thoảng"
      - "Tim đập vui vì điều giản đơn"
  - section: PRE_1
    measures: "13-16"
    lines:
      - "Chẳng cần hẹn hò xa xôi"
      - "Chỉ cần nhìn nhau là đủ rồi"
  - section: CHORUS_1
    measures: "17-24"
    lines:
      - "Yêu là vui, vui như nắng mai"
      - "Yêu là vui, chẳng cần lớn lao"
      - "Chỉ cần bên nhau mỗi ngày"
      - "Tình đầu ơi, thật dịu dàng"
  - section: VERSE_2
    measures: "25-32"
    lines:
      - "Hai đứa chạy giữa ban chiều"
      - "Lá rơi nhẹ trên vai áo trắng"
      - "Chẳng sợ mưa hay nắng gắt"
      - "Vì có nhau là đủ để vui"
  - section: PRE_2
    measures: "33-36"
    lines:
      - "Chẳng cần lời hứa dài lâu"
      - "Chỉ cần cười với nhau là đủ"
  - section: CHORUS_2
    measures: "37-44"
    lines:
      - "Yêu là vui, vui như nắng mai"
      - "Yêu là vui, chẳng cần lớn lao"
      - "Chỉ cần bên nhau mỗi ngày"
      - "Tình đầu ơi, thật dịu dàng"
  - section: BRIDGE
    measures: "45-52"
    lines:
      - "Ngày ấy họ mới gặp nhau"
      - "Tim bỗng nhẹ như mây bay"
      - "Không cần biết ngày mai sẽ ra sao"
      - "Chỉ biết hôm nay rất vui"
  - section: CHORUS_3
    measures: "53-60"
    lines:
      - "Yêu là vui, vui như nắng mai"
      - "Yêu là vui, chẳng cần lớn lao"
      - "Chỉ cần bên nhau mỗi ngày"
      - "Tình đầu ơi, mãi dịu dàng"
  - section: OUTRO
    measures: "61-64"
    lines:
      - "Yêu là vui…"
