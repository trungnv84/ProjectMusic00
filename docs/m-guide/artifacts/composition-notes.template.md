# Template — COMPOSITION_NOTES

Lưu: `runs/compose/<run-id>/03-composition-notes.md` (hoặc arrangement notes).

**Bắt buộc (Bước 3):** có khối `lyrics_by_section` — bản lời đọc được theo section, **khớp** lời gắn nốt trong MusicXML. Mục đích: người duyệt xem/sửa lời mà không cần mở score. Section instrumental → `lines: []`.

---

```text
COMPOSITION_NOTES
──────────────────────────────────────────────
central_poetic_image:
  chosen_image: ""
  development_across_song: ""

literary_devices_used:
  - device: ""
    location: ""
    purpose: ""

reference_style_handling:
  - style_card_id: ""
    how_applied: "đặc trưng khái quát only"
    no_copy_affirmation: true

resolved_delegated_fields:
  - field: ""
    decision: ""
    rationale: ""
    alternatives_considered: []

tone_melody_tradeoffs:   # nếu tiếng Việt
  - ""

deviations_or_tradeoffs:
  - ""

musicxml_parts:
  - id: P1
    name: Voice
  - id: P2
    name: Piano

structure:               # khuyến nghị
  tempo_bpm:
  meter: ""
  key: ""
  form:
    - SECTION_NAME: measures a–b
  lyric_policy:
    syllable_to_note: "1 Vietnamese syllable → 1 note"  # nếu VN
    syllabic: "single"
    melisma: false

lyrics_by_section:       # BẮT BUỘC — mirror lời trong MusicXML
  - section: INTRO
    measures: "1-4"
    lines: []            # instrumental / không lời
  - section: VERSE_1
    measures: "5-..."
    lines:
      - ""               # mỗi dòng ≈ một câu hát / một cụm measure có lời
  - section: CHORUS
    measures: "..."
    lines:
      - ""
```
