---
id: KNOW.MELODY.PHRASE-STRUCTURE
type: knowledge
status: active
version: "1.2"
tags: [compose, melody]
serves-steps: [3]
sources:
  - "docs/m-guide/knowledge/melody/contour.md"
  - "docs/m-guide/knowledge/rhythm-form/form-and-tempo.md"
last-updated: "2026-09-16"
---
# Giai điệu — phrase, cadence và điểm nhấn

> **AI:** Đọc ở Bước 3 khi contour đã có nhưng cần biến thành câu nhạc có điểm đi, điểm dừng và cao trào.
## Dùng ở bước nào

- Bước 3 — tổ chức motif thành phrase và liên kết phrase với section.
## Constraints

- Không vượt `VOCAL.range` / `tessitura` đã DEFINED hoặc locked.
- Khi `MELODY.character` hoặc contour đã USER_EXPLICIT, không tự thay đổi mục tiêu đó để phục vụ cadence.
- Các phrase trong cùng section **không** được chia sẻ cùng skeleton pitch+rhythm trừ biến thể A/A' có chủ đích và ghi trong plan/notes (xem [anti-patterns](anti-patterns.md)).
- Nếu nhiều phrase liên tiếp có cùng phrase role, phải có ít nhất một contrast axis hoặc motif-development reason để tránh cảm giác clone.
## Hints

- Một phrase nên có mục tiêu rõ: mở, phát triển, trì hoãn hoặc kết.
- Cadence mạnh phù hợp điểm kết; cadence mở giúp nối sang phrase kế tiếp.
- Chorus thường cần một hoặc vài điểm cao hơn verse, nhưng không bắt buộc phải có nốt cao nhất ở mọi câu.
- Lặp motif với thay đổi rhythm hoặc ending thường hiệu quả hơn thay motif hoàn toàn.

### Phrase contrast axes

Khi hai phrase gần nhau về motif, có thể tạo khác biệt bằng một hoặc vài trục:

| Trục | Ví dụ thay đổi | Hữu ích khi |
|---|---|---|
| `register` | lower ↔ higher placement | cần đổi focus |
| `rhythmic_density` | sparse ↔ active | cần space ↔ drive |
| `note_duration` | sustained ↔ short | cần legato ↔ motion |
| `phrase_length` | compact ↔ extended | setup ↔ payoff |
| `articulation` | smooth ↔ accented | đổi delivery |
| `syllable_density` | fewer ↔ more syllables | lyric load khác nhau |
| `breath_position` | earlier ↔ later rest | đổi câu hơi |

Đây là các **options**, không phải công thức phải áp dụng đồng loạt.

## Cách áp dụng

1. Chia section thành phrase.
2. Gán role cho từng phrase: setup → lift → release.
3. Xác định material nào được lặp và material nào cần contrast.
4. Chọn 1–3 contrast axes khi hai phrase bắt đầu nghe quá giống nhau.
5. Đặt điểm nhấn vào từ khóa quan trọng (lyric–melody fit).
6. Kiểm tra phrase length, breath và cadence.
7. Sau cùng mới tối ưu ornaments.

## Ví dụ ngắn (tự viết)

`A: mở → B: nâng → A': lặp có biến đổi rhythm + ending → C: giải quyết`.

## Related

- `KNOW.MELODY.CONTOUR`
- `KNOW.MELODY.MELODIC-RHYTHM`
- `KNOW.MELODY.HOOK-TYPES`
- `KNOW.MELODY.ANTI-PATTERNS`
- `KNOW.LYRICS.PROSODY-RHYME`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`
- `KNOW.VOCAL.PHRASING-BREATH-MELISMA`
