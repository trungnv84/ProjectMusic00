---
id: KNOW.MELODY.HOOK-TYPES
type: knowledge
status: active
version: "1.0"
tags: [compose, melody, lyrics, rhythm-form]
serves-steps: [3]
needs-approval: true
objective_ids: [hook_identity]
category: hook_design
useful_for:
  - chorus_identity
  - song_memorability
  - avoiding_same_melodic_formula
  - section_distinction
compatible_with: [catchiness, rhythmic_identity, singability, emotional_contour, tension_release]
conflicts_with: []
section_affinity: [INTRO, VERSE, PRE_CHORUS, CHORUS, BRIDGE, FINAL_CHORUS]
evaluation:
  primary: "hook type is explicit, audible/recognizable, appropriately placed and developed"
  evidence: "name the hook type, material/behavior used, location, and variation strategy"
  failure_signal: "hook is declared but cannot be distinguished from surrounding material or is unsupported by the chosen hook type"
sources:
  - "docs/m-guide/knowledge/melody/catchiness.md"
  - "docs/m-guide/knowledge/melody/motif-development.md"
  - "docs/m-guide/knowledge/lyrics/hook-prechorus-bridge.md"
  - "docs/m-guide/knowledge/melody/musical-quality-gate.md"
last-updated: "2026-09-16"
---
# Giai điệu — taxonomy của hook

> **AI:** Đọc ở Bước 3 khi chọn loại hook cho bài. Không mặc định mọi bài phải có một melodic hook bằng pitch. Hook có thể được tạo bởi rhythm, lyric, vocal delivery, harmony, production hoặc call-response.

## Dùng ở bước nào

- Bước 3 — chọn `hook_type`/`primary_hook.type` sau khi đọc user intent và objective selection, trước khi khóa material hook.

## Vì sao cần taxonomy

`catchiness` mô tả các đặc trưng giúp một ý nhạc dễ nhớ. Trang này trả lời câu khác: **cái gì thực sự là carrier của hook?**

Một bài có thể có một hook chính và các hook phụ. Không cần ép mọi bài có cùng kiểu hook.

## Hook types

| Type | Carrier chính | Dấu hiệu nhận biết | Gợi ý dùng |
|---|---|---|---|
| `melodic` | pitch contour / interval cell | nghe ra câu bằng đường đi cao độ | khi melody là trung tâm nhận diện |
| `rhythmic` | duration / placement / accent | có thể gõ theo trước khi nhớ đúng pitch | khi groove và phrasing quan trọng |
| `lyrical` | phrase / keyword / wording | cụm từ hoặc câu ngắn trở thành điểm nhớ | khi title/message là trọng tâm |
| `vocal` | register / articulation / timbre-like delivery | điểm nhớ đến từ cách hát | khi performance là một phần identity |
| `harmonic` | chord color / bass movement / cadence | hook xuất hiện nhờ nền hòa âm nhận diện | khi harmony đóng vai trò nổi bật |
| `production` | texture / sound entrance / rhythmic layer | một sound hoặc texture xuất hiện nhất quán | khi arrangement/production mang identity |
| `call-response` | câu hỏi ↔ đáp | material được nhớ qua quan hệ giữa hai giọng/phrase | khi đối đáp tạo interaction |

Các loại có thể kết hợp. Ví dụ một chorus có `melodic` + `rhythmic` hook nhưng primary vẫn chỉ cần chọn một carrier chính.

## Constraints

- Phải xác định `primary_hook.type` trước khi khóa material hook ở Chorus nếu objective `catchiness` hoặc `hook_identity` được chọn.
- Không khai báo `melodic` hook chỉ vì melody có một câu lặp; hook phải có identity và vị trí nhận biết được.
- Không dùng production hoặc vocal effect để che một melody không có identity nếu user đang yêu cầu melodic hook.
- Một bài không bắt buộc phải có cả bảy loại hook.
- Nếu chọn nhiều type, phải chỉ rõ type nào là primary để tránh thiết kế quá tải.

## Hints

- `melodic` + `rhythmic` thường hỗ trợ nhau tốt: pitch cell rõ nhưng rhythm khác biệt giúp nhận diện nhanh hơn.
- `lyrical` hook cần khoảng trống melody/rhythm đủ rõ để từ khóa nghe được.
- `vocal` hook có thể là register, articulation hoặc delivery pattern; không nên phụ thuộc vào tên nghệ sĩ cụ thể.
- `harmonic` hook có thể làm nền cho một melodic hook đơn giản mà vẫn đủ identity.
- `call-response` có thể thay cho việc lặp một câu melodic hook quá nhiều lần.

## Hook và repetition-with-variation

Hook cần được nhận ra, nhưng không nhất thiết phải copy nguyên xi.

- `Chorus 1`: thiết lập identity.
- `Chorus 2`: giữ carrier chính, đổi một thành phần phụ.
- `Final Chorus`: giữ identity nhưng có payoff phù hợp với emotional/tension objectives.

Variation có thể nằm ở ending, pickup, register, rhythmic placement, harmonic context hoặc câu đáp. Với `hook_type=lyrical`, variation không được làm mất từ khóa chính nếu user yêu cầu giữ hook lyric.

## Cách áp dụng với MusicXML + notes

1. Chọn `primary_hook.type` và 0–2 secondary hook types.
2. Ghi hook location ở mức section/phrase.
3. Ghi evidence: carrier nào tạo identity và người nghe có thể nhận ra bằng gì.
4. Chọn chiến lược repetition-with-variation.
5. Kiểm tra hook không lẫn với material nền và không xung đột với singability hoặc lyric intelligibility.

## Ví dụ ngắn (tự viết)

Một Chorus có thể chọn `rhythmic` làm primary hook: một cell ngắn có pickup + rest đặc trưng; melody trên cell chỉ dùng vài pitch. Chorus 2 giữ rhythm nhưng đổi ending pitch; Final Chorus giữ rhythm và mở rộng điểm kết.

Đây chỉ là ví dụ khái niệm, không phải mẫu nốt để tái sử dụng.

## Related

- `KNOW.MELODY.CATCHINESS`
- `KNOW.MELODY.MELODIC-RHYTHM`
- `KNOW.MELODY.CONTOUR`
- `KNOW.MELODY.PHRASE-STRUCTURE`
- `KNOW.MELODY.MOTIF-DEVELOPMENT`
- `KNOW.LYRICS.HOOK-PRECHORUS-BRIDGE`
- `KNOW.MELODY.QUALITY-GATE`
