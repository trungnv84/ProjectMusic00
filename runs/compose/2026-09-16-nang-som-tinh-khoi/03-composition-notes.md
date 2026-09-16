# 03-composition-notes.md — Nắng Sớm Tinh Khôi

```text
COMPOSITION_NOTES
──────────────────────────────────────────────
central_poetic_image:
  chosen_image: "nắng sớm / phố / hai người bước cạnh nhau"
  development_across_song: "Verse quan sát các hành động nhỏ của đôi trẻ; Pre thu hẹp khoảng cách; Chorus mở không gian thành ngày xanh; Bridge kiểm tra khả năng ký ức tồn tại ngay cả khi trời đổi; Final Chorus biến khoảnh khắc hiện tại thành ký ức có sức bền."

melody_design:
  primary_objective: emotional_contour
  secondary_objectives:
    - singability
    - tension_release
    - melodic_rhythm
  objective_evidence:
    - "Primary emotional contour: Verse giữ register trung và có descent/recovery; Pre tăng register; Chorus mở lên C5/D5; Bridge hạ register và đổi hướng; Final Chorus đạt peak E5 ngắn rồi release."
    - "Singability: chủ yếu C4–D5; leap được theo sau bởi step/recovery; phrase length đều theo 2 bars để dễ thở nhưng rhythm không đồng nhất."
    - "Tension-release: Pre tăng dần hướng lên; Chorus peak xuất hiện sớm; Bridge giảm density/register; Final Chorus mở rộng và đổi cadence."
    - "Melodic rhythm: nhiều rhythm signatures được sử dụng; hook giữ identity nhưng Chorus 2/Final đổi ending/rhythm context."
  avoided_objectives:
    - AVOID_FLAT_CONTOUR
    - AVOID_SKELETON_REPETITION
    - AVOID_RHYTHM_WITHOUT_IDENTITY

motifs_declared:
  - id: M1
    role: "Verse DNA"
    identity: "stepwise cell + small recovery leap; dùng làm DNA chứ không copy exact."
  - id: M2
    role: "Pre build"
    identity: "ascending register + shorter rhythmic values toward phrase end."
  - id: H1
    role: "Chorus hook"
    identity: "limited pitch set G4-A4-C5-B4, arch/climb contour, rhythmic opening 2+2 divisions."
  - id: BR1
    role: "Bridge contrast"
    identity: "lower register, descending/turning contour, less immediate hook density."

hook_melody_cell:
  type: melodic + rhythmic hook
  pitch_sequence: [G4, A4, C5, B4]
  rhythm_cell_divisions: [2, 2, 4, 4]
  length: "1 bar core cell"
  contour: "U-U-D"
  limited_pitch_set: true
  location: "Chorus phrase 1, recurs at same structural position in Chorus 2 and Final Chorus"
  variation:
    - "Chorus 2 raises the response contour and changes phrase 2 cadence."
    - "Final Chorus extends the second statement and changes the later cadence/context; not register-shift-only."
  evidence_catchiness: "short cell; limited pitch set; clear contour; distinctive short-short-long opening; consistent chorus location; singable range; variation between repetitions."

prosody_audit:
  hook: "Câu 'Nắng lên hai người cười trên phố nhẹ' đặt từ khóa 'nắng', 'cười' ở nốt đầu/điểm nhấn của cell; phrase nói tự nhiên trước khi hát không cần đảo trật tự từ."
  verse: "Verse dùng 2-bar phrases với 4 syllables/bar, tránh melisma; các từ khóa hành động ('bước', 'che', 'nhìn', 'giữ') không bị nhồi vào chuỗi note quá dày."
  vietnamese_tone_policy: "tone-melody được xử lý theo transition và speak-test, không dùng tone offset cố định từng syllable."

piano_texture:
  sung_sections_ok: true
  pattern_policy: "broken chord / pulse / comp; không whole-note-only"
  intro: "broken triad pattern, one bar per harmonic pulse"
  verse: "alternating bass + chord tones, moderate onset rate"
  pre: "more active broken-chord motion to support build"
  chorus: "regular pulse + broken-chord response to leave vocal headroom"
  bridge: "sparser broken texture, then re-entry toward final chorus"

objective_melody_audit:
  canonical_representation: "pitch classes relative to phrase start + directed intervals + rhythm signatures + contour + cadence"
  exact_repeat_rate: 0.029
  near_repeat_max: 0.625
  near_repeat_pair: ('VERSE_2:P5', 'PRE_2:P1')
  rhythm_diversity: 0.657
  contour_diversity: 0.429
  cadence_variety: 0.057
  section_contrast:
    verse1_vs_chorus1:
      dimensions_different: 2
      evidence: "register centroid, phrase range, rhythm signature distribution, contour distribution and cadence distribution were compared."
  hook_distinctiveness:
    declared: true
    occurrences: 3
    evidence: "Chorus 1/2/Final share the H1 identity at a consistent location; H1 is not copied from Verse material."
  final_development:
    result: PASS
    operations: "sequence_with_new_context + cadence_change + phrase_extension/compression"

music_quality_gate:
  result: PASS
  basis: "objective/XML/manual text checks; no rendered-audio claim"
  thresholds:
    REQUIRE_CHORUS_HOOK: "ok"
    REQUIRE_CATCHY_HOOK: "ok"
    REQUIRE_MELODIC_COHERENCE: "ok"
    REQUIRE_BRIDGE_CONTRAST: "ok"
    REQUIRE_FINAL_CHORUS_DEVELOPMENT: "ok"
    MAX_IDENTICAL_PHRASE_SKELETONS: "ok"
    MIN_SECTION_CONTRAST: "ok"
    REQUIRE_SPEAK_TEST: "ok — manual read-aloud/speak-test of lyric phrasing"
    REQUIRE_STYLE_ECHO: "ok"
    REQUIRE_INVENTED_MELODY: "ok"
    REQUIRE_PIANO_TEXTURE: "ok"
    REQUIRE_OBJECTIVE_MELODY_AUDIT: "ok"
    MAX_NEAR_REPEAT: "ok"
    REQUIRE_SECTION_OBJECTIVE_CONTRAST: "ok"
    REQUIRE_FINAL_DEVELOPMENT_EVIDENCE: "ok"
  scores:
    melodic_repetition: "ok — phrase signatures varied; no 3-consecutive exact skeleton loop"
    phrase_similarity: "ok — max adjacent similarity below hard threshold"
    section_contrast: "ok — 2 dimensions differ in audit"
    rhythmic_variety: "ok — 0.657 signature ratio"
    hook_distinctiveness: "ok — H1 has its own pitch/rhythm identity"
    melodic_coherence: "ok — section phrases share declared DNA"
    register_development: "ok — pre/chorus/final expand register"
    cadential_variety: "ok"
    harmonic_motion: "ok — progression changes with section function"
    piano_accompaniment: "ok — no whole-note-only sung-section texture"
    lyric_melody_fit: "ok — manual speak-read review and syllable alignment"
    vietnamese_tone_melody: "ok — transition-based, no fixed offset formula"
    style_consistency: "ok — style card used only as abstract tendency"

deviations_or_tradeoffs:
  - "Tempo giữ 86 BPM theo input run, không lấy tempo của style card làm hard constraint."
  - "Lead sheet chỉ Voice + Piano; full orchestration để Step 4."
  - "Hook ngắn nhưng không dùng lặp 100%; Chorus 2 và Final phát triển theo objective system."

musicxml_parts:
  - id: P1
    name: Voice
  - id: P2
    name: Piano

validation:
  - "MusicXML 4.0 partwise + DTD"
  - "2 score-parts và 2 parts thực tế"
  - "measure 1→74 liên tục ở cả hai parts"
  - "mọi measure = 16 divisions trong 4/4"
  - "mọi duration > 0"
  - "midi-program trong 1–128"
  - "lyric alignment 1 syllable / note ở sung sections"
  - "không archive/"
  - "không copyrighted lyric/melody/hook/riff copied"
```
