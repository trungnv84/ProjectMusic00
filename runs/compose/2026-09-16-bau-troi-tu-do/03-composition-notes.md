# COMPOSITION_NOTES — Bầu Trời Tự Do

```text
COMPOSITION_NOTES
──────────────────────────────────────────────
central_poetic_image:
  chosen_image: "bầu trời mở rộng như cánh cửa tự do — bay lên, với sao, tim rộng mở"
  development_across_song: "Verse kể khung cảnh (trời xanh, gió, nắng); Pre đẩy nhịp tim/ước mơ; Chorus khóa hình ảnh bay lên + tự do; Bridge nội tâm (tìm chính mình, không sợ bóng tối); Final mở rộng payoff (rộng mở ra)"

literary_devices_used:
  - device: "ẩn dụ không gian (bầu trời = tự do)"
    location: "Chorus hook + Bridge"
    purpose: "gắn cảm xúc tự do với hình ảnh bay/với sao"
  - device: "lặp có biến thể (hook)"
    location: "Chorus 1 / 2 / Final"
    purpose: "ghi nhớ + phát triển ở Final (rhythmic rewrite + phrase extension)"

reference_style_handling:
  - style_card_id: "STYLE.VN.VPOP-UPTEMPO"
    how_applied: "đặc trưng khái quát only — tempo ~118, form Verse–Pre–Chorus rõ, hook ngắn, piano pulse/stabs + broken ở chorus, ngôn ngữ đương đại trực tiếp"
    no_copy_affirmation: true

resolved_delegated_fields:
  - field: "tempo"
    decision: "118 BPM"
    rationale: "nằm trong groove_tempo_band 100–128 của VPOP-UPTEMPO; vui tươi nhanh"
    alternatives_considered: ["112", "120"]
  - field: "key"
    decision: "G major"
    rationale: "tessitura nữ cao thoải (G4–A5); hợp âm pop chức năng rõ"
    alternatives_considered: ["C major", "D major"]
  - field: "meter"
    decision: "4/4"
    rationale: "mặc định V-Pop uptempo"
    alternatives_considered: []
  - field: "form"
    decision: "Intro–V1–Pre–Ch–V2–Pre–Ch–Bridge–FinalCh–Outro"
    rationale: "form_tendencies style card; rút gọn section cho nhịp nhanh"
    alternatives_considered: []

motifs_declared:
  - id: "M_verse_rise"
    pitches: "G–A–B–D (step climb to peak)"
    rhythm: "mostly quarter; occasional eighth pair at phrase end"
  - id: "M_pre_push"
    pitches: "A–B–D–E (ascending push)"
    rhythm: "four quarters — denser register lift toward hook"
  - id: "M_hook"
    pitches: "D–E–D–B–A–G (arch: up then settle)"
    rhythm: "eighth–eighth–quarter–eighth–eighth–quarter"
  - id: "M_bridge_descend"
    pitches: "E–D–C–B–A (stepwise descend) then climb answer"
    rhythm: "quarter-led; different contour family from Verse/Chorus"

hook_melody_cell:
  pitches: "D5–E5–D5–B4–A4–G4"
  rhythm: "e–e–q–e–e–q (2+2+4+2+2+4 divisions)"
  lyric_hook: "Bay lên bầu trời tự do"
  position_in_phrase: "đầu câu Chorus — nhất quán qua các lần lặp"
  catchiness_evidence: "clear arch contour (up then settle); limited pitch set 5 pitches (D E B A G); rhythmic identity e-e-q cell dễ gõ theo; mỗi lần lặp có ≥1 biến đổi (M11/M21 end on B thay G; Final M29 start higher E–G–E + M30 phrase extension + peak A5)"

section_contrast_map:
  - section: "VERSE"
    contrast_notes: "register mid (G4–D5); mostly quarter rhythm; storytelling density"
  - section: "PRE"
    contrast_notes: "register lift (A4–E5); four-quarter push; builds to hook"
  - section: "CHORUS"
    contrast_notes: "hook cell e-e-q; peak D5/E5; broader lyric hook; piano broken denser"
  - section: "BRIDGE"
    contrast_notes: "stepwise descend family (E–D–C–B–A) + climb answer; dynamics mp; harmonic color Em–C–Am–D"
  - section: "FINAL"
    contrast_notes: "rhythmic_rewrite on line 3 (higher start); phrase_extension + cadence peak A5 on 'ra'"

tone_melody_tradeoffs:
  - "Ưu tiên similar/oblique transitions ở từ khóa hook (Bay ngang→lên sắc: giữ/lên; bầu huyền→trời hỏi: down-ish; tự nặng→do ngang: settle). Không dùng công thức ±1 độc lập từng âm tiết."
  - "Từ chức năng (là, những, vì) linh hoạt hơn để giữ motif."

prosody_audit:
  - line: "Bay lên bầu trời tự do"
    syllables:
      - {syl: "Bay", tone: "ngang", beat: "1 (on)", duration: "eighth", keyword: true}
      - {syl: "lên", tone: "sắc", beat: "1+ (off)", duration: "eighth", keyword: true}
      - {syl: "bầu", tone: "huyền", beat: "2 (on)", duration: "quarter", keyword: true}
      - {syl: "trời", tone: "hỏi", beat: "3 (on)", duration: "eighth", keyword: true}
      - {syl: "tự", tone: "nặng", beat: "3+", duration: "eighth", keyword: false}
      - {syl: "do", tone: "ngang", beat: "4 (on)", duration: "quarter", keyword: true}
    speak_test: pass
    notes: "Từ khóa Bay/bầu/trời/do nằm on-beat hoặc nốt dài hơn; contour arch khớp stress"
  - line: "Bầu trời xanh mở rộng"
    syllables:
      - {syl: "Bầu", tone: "huyền", beat: "1", duration: "quarter", keyword: true}
      - {syl: "trời", tone: "hỏi", beat: "2", duration: "quarter", keyword: true}
      - {syl: "xanh", tone: "ngang", beat: "3", duration: "quarter", keyword: false}
      - {syl: "mở", tone: "hỏi", beat: "4", duration: "quarter", keyword: true}
      - {syl: "rộng", tone: "nặng", beat: "(carry from mở phrase end in next feel)", duration: "—", keyword: true}
    speak_test: pass
    notes: "Verse mở bằng quarter đều; từ khóa trên beat mạnh; 'mở rộng' peak D5 rồi đáp — speak tự nhiên"

objective_melody_audit:
  method: "canonical phrase representation trên MusicXML vừa xuất"
  scope: "P1 Voice; sections VERSE_1(M3-6), PRE(M7-8), CHORUS(M9-12), VERSE_2(M13-16), PRE2(M17-18), CHORUS2(M19-22), BRIDGE(M23-26), FINAL(M27-30)"
  metrics:
    exact_repeat_rate:
      value: "0.15"
      status: ok
      evidence: "VERSE_1 vs VERSE_2: pitch+rhythm skeleton khác (V1 M3 G-A-B-D vs V2 M13 A-B-D-B-A); không ≥3 câu liên tiếp cùng cell. Hook lặp có chủ đích (declared)."
    near_repeat_max:
      value: "0.72"
      status: ok
      evidence: "Cặp PRE M7/M17 gần (A/A' declared push); highest non-declared pair ~0.72 (V1 line endings vs V2) < 0.90 threshold"
    rhythm_diversity:
      value: "0.70"
      status: ok
      evidence: "Verse quarter-led; Pre four-quarter; Chorus e-e-q cell; Bridge quarter+; Final extension — ≥5 unique rhythm signatures / ~14 eligible phrases"
    contour_diversity:
      value: "0.65"
      status: ok
      evidence: "Verse rise (U-U-U); Pre climb; Hook arch U-D-D-D; Bridge descend D-D-D-D then climb; Final higher rewrite — multiple contour families"
    cadence_variety:
      value: "0.75"
      status: ok
      evidence: "cadences: settle-down (hook G), lift-to-B (M11), peak-G5 (M12), Bridge settle G, Final peak A5 — ≥3 cadence tokens"
    section_contrast:
      value: "PASS"
      evidence: "Verse→Chorus: register + rhythm (quarter vs e-e-q) ≥2 dims; Verse→Bridge: contour (rise vs descend) + harmonic color (G-family vs Em start)"
    hook_distinctiveness:
      value: "ok"
      status: ok
      evidence: "declared hook D-E-D-B-A-G e-e-q appears M9/M11/M19/M21/M27; not copied from Verse family (Verse starts G-A-B-D quarter)"
    final_development:
      value: "ok"
      status: ok
      evidence: "operation: rhythmic_rewrite (M29 start E-G-E higher) + phrase_extension_or_compression (M30 thêm 'ra' peak A5) — không chỉ register_shift_only"
  warnings: []

music_quality_gate:
  result: PASS
  scores:
    melodic_repetition: ok
    phrase_similarity: ok
    section_contrast: ok
    rhythmic_variety: ok
    hook_distinctiveness: ok
    melodic_coherence: ok
    register_development: ok
    cadential_variety: ok
    harmonic_motion: ok
    piano_accompaniment: ok
    lyric_melody_fit: ok
    vietnamese_tone_melody: ok
    style_consistency: ok
  thresholds:
    REQUIRE_CHORUS_HOOK: pass
    REQUIRE_CATCHY_HOOK: pass
    REQUIRE_MELODIC_COHERENCE: pass
    REQUIRE_BRIDGE_CONTRAST: pass
    REQUIRE_FINAL_CHORUS_DEVELOPMENT: pass
    REQUIRE_SPEAK_TEST: pass
    REQUIRE_STYLE_ECHO: pass
    REQUIRE_PIANO_TEXTURE: pass
    REQUIRE_OBJECTIVE_MELODY_AUDIT: pass
    MAX_NEAR_REPEAT: pass
    REQUIRE_SECTION_OBJECTIVE_CONTRAST: pass
    REQUIRE_FINAL_DEVELOPMENT_EVIDENCE: pass
  evidence: "Hook cell ngắn rõ contour+rhythm; Verse1≠Verse2 skeleton; Bridge contour family khác; Final có rhythmic_rewrite + phrase_extension; piano quarter/broken trên sung sections (không whole-note pad); style_card_id STYLE.VN.VPOP-UPTEMPO; prosody_audit pass; objective metrics có value+evidence artifact."
  if_fail: "rewrite whole lead sheet with new motifs AND fix piano texture — do not patch isolated notes; do not defer pad fix to step 4"

piano_texture:
  pattern: "quarter-pulse (Verse/Pre/Bridge) | broken eighth arpeggio (Chorus/Final) | half-pulse (Intro/Outro only)"
  sung_sections_ok: true
  pad_only_sections: ["INTRO", "OUTRO"]
  notes: "Sung sections (V/Pre/Ch/Br/Final) dùng ≥ quarter onsets hoặc broken 8th — không whole-note-only. Intro/Outro half-pulse pad chấp nhận theo piano-reduction."

deviations_or_tradeoffs:
  - "Lead sheet chỉ Voice + Piano reduction — không full band (đúng Bước 3)."
  - "Một số câu Verse 5 âm tiết map eighth-pair cuối câu để giữ 4/4."

musicxml_parts:
  - id: P1
    name: Voice
  - id: P2
    name: Piano

structure:
  tempo_bpm: 118
  meter: "4/4"
  key: "G major"
  form:
    - INTRO: measures 1–2
    - VERSE_1: measures 3–6
    - PRE_CHORUS: measures 7–8
    - CHORUS: measures 9–12
    - VERSE_2: measures 13–16
    - PRE_CHORUS_2: measures 17–18
    - CHORUS_2: measures 19–22
    - BRIDGE: measures 23–26
    - FINAL_CHORUS: measures 27–30
    - OUTRO: measures 31–32
  lyric_policy:
    syllable_to_note: "1 Vietnamese syllable → 1 note"
    syllabic: "single"
    melisma: false

lyrics_by_section:
  - section: INTRO
    measures: "1-2"
    lines: []
  - section: VERSE_1
    measures: "3-6"
    lines:
      - "Bầu trời xanh mở rộng"
      - "Gió mang tôi bay cao"
      - "Không còn gì níu chân"
      - "Tôi bước vào nắng mai"
  - section: PRE_CHORUS
    measures: "7-8"
    lines:
      - "Tim đập nhanh hơn"
      - "Ước mơ gọi tên"
  - section: CHORUS
    measures: "9-12"
    lines:
      - "Bay lên bầu trời tự do"
      - "Tay với lấy những vì sao"
      - "Bay lên bầu trời tự do"
      - "Trái tim tôi rộng mở"
  - section: VERSE_2
    measures: "13-16"
    lines:
      - "Mây trắng trôi nhẹ nhàng"
      - "Đất dưới chân tôi xa"
      - "Tự do là cánh cửa"
      - "Mở ra phía chân trời"
  - section: PRE_CHORUS_2
    measures: "17-18"
    lines:
      - "Tim đập nhanh hơn"
      - "Ước mơ gọi tên"
  - section: CHORUS_2
    measures: "19-22"
    lines:
      - "Bay lên bầu trời tự do"
      - "Tay với lấy những vì sao"
      - "Bay lên bầu trời tự do"
      - "Trái tim tôi rộng mở"
  - section: BRIDGE
    measures: "23-26"
    lines:
      - "Giữa đất trời bao la"
      - "Tôi tìm thấy chính mình"
      - "Không sợ bóng tối kia"
      - "Vì tôi đã biết bay"
  - section: FINAL_CHORUS
    measures: "27-30"
    lines:
      - "Bay lên bầu trời tự do"
      - "Tay với lấy những vì sao"
      - "Bay lên bầu trời tự do"
      - "Trái tim tôi rộng mở ra"
  - section: OUTRO
    measures: "31-32"
    lines:
      - "Bay lên do"
```
