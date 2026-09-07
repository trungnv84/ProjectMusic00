# EVALUATION + merge — 2026-09-07-all-topics

Người review (workspace): đánh giá và merge có chọn lọc theo yêu cầu user “upgrade những cái đúng”.

## Quyết định

| Trang | Quyết định | Ghi chú |
|-------|------------|---------|
| lyrics/prosody-and-rhyme | **Merge → active** | Bổ sung chung; không trùng `rhyme-meter` (VN chi tiết) |
| melody/phrase-structure | **Merge → active** | Nối contour → phrase/cadence |
| harmony/functional-cadence-and-voicing | **Merge → active** | Constraint chỉ giữ key/progression locked — OK |
| rhythm-form/groove-and-syncopation | **Merge → active** | |
| vocal/phrasing-breath-and-melisma | **Merge → active** | |
| vietnamese/syllable-priority | **Merge → active** | Framework ưu tiên; đúng spirit standards |
| arrangement/instrument-roles-and-register | **Merge → active** | |
| arrangement/section-energy | **Merge → active** | Thang 1–5 là hint scaffold — giữ nguyên |
| musicxml/structure-and-voices | **Merge → active** | Bổ sung backup/forward, tie vs slur |
| musicxml/lyrics-and-notations | **Merge → active** | |
| musicxml/validation-checklist | **Merge → active** | Checklist vận hành, không thay validator |
| catalog.yml | **Merge có chỉnh** | Không đè catalog proposed thô; ghép vào catalog gốc + bump 1.2 |

## Kèm theo (run trước, đã review OK)

| Trang | Quyết định |
|-------|------------|
| vietnamese/rhyme-meter (`2026-09-07-van-dieu-tho-viet`) | **Merge → active** cùng đợt; related với PROSODY-RHYME |

## Không từ chối trang nào trong 11 trang all-topics

Nội dung chủ yếu hint + constraint “tôn trọng locked/user”; phù hợp admission. Sources none — đúng khi không tra web.

## Rủi ro còn lại (không chặn merge)

- MusicXML structural vẫn nên kiểm bằng validator khi chạy Bước 3/4 thật.
- `topic: all` dễ phình; lần sau ưu tiên 1 chủ đề / run nếu có thể.
