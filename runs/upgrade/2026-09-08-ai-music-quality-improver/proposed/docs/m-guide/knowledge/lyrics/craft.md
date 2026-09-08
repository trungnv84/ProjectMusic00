---
id: KNOW.LYRICS.CRAFT
type: knowledge
status: active
version: "1.1-proposed"
tags: [compose, lyrics]
serves-steps: [3]
sources:
  - "docs/m-guide/knowledge/lyrics/prosody-and-rhyme.md"
  - "docs/m-guide/knowledge/lyrics/lyric-melody-fit.md"
last-updated: "2026-09-08"
needs-approval: true
---

# Viết lời bài hát

> **AI:** Đọc ở Bước 3 trước khi viết lời. Không trích lời tác phẩm có bản quyền. Mục tiêu là lời **có nghĩa và có tiến triển**, không chỉ nghe “thơ” hoặc đúng vần.

## Constraints

- Tôn trọng `LYRIC.forbidden_elements` và `CONSTRAINTS.hard` của yêu cầu bài hát.
- Không sao chép câu lời / thơ có bản quyền.
- Không hy sinh nghĩa câu hoặc từ khóa đã yêu cầu chỉ để lấy vần.
- Verse 2 không được chỉ paraphrase Verse 1.
- Bridge phải tạo thêm nhận thức, tình huống, góc nhìn hoặc emotional turn; không chỉ đổi từ mô tả.

## Semantic quality

Xác định **tứ thơ trung tâm** rồi tạo semantic arc:

| Section | Vai trò tối thiểu |
|---|---|
| Verse 1 | ai / ở đâu / chuyện gì đang xảy ra |
| Pre | phản ứng / tension / điều chưa nói |
| Chorus | thesis / cảm xúc cốt lõi |
| Verse 2 | hành động hoặc thông tin mới |
| Bridge | nhận thức, lựa chọn, đổi góc nhìn hoặc turn |
| Final | củng cố hoặc biến nghĩa của hook |

### Semantic audit cho từng câu

Ghi:

- `specific_detail`: yes/no
- `action_state_change`: yes/no
- `new_information`: yes/no
- `cliche_risk`: low/medium/high
- `paraphrase_of_prior`: yes/no

Nếu nhiều câu liên tiếp chỉ có mood words / tính từ chung chung mà không có information/action/state change, lyric quality = `weak` hoặc `fail` tùy mức độ.

## Hints

- Xác định **tứ thơ trung tâm** (một hình ảnh / ý chủ đạo) trước khi viết chi tiết.
- Hook chorus nên ngắn, dễ nhớ, lặp được.
- Ưu tiên từ dễ hát (nguyên âm mở) ở nốt dài / cao trào.
- Biện pháp tu từ phục vụ ý nghĩa; tránh nhồi sáo.
- Chi tiết cụ thể tốt hơn nhiều câu cảm xúc chung chung.
- “Nắng + gió + mắt + cười + bên nhau + vui + mãi mãi” chỉ tạo mood; chưa đủ để tạo câu chuyện nếu thiếu hành động, quan hệ hoặc phát hiện mới.

## Cách áp dụng

1. Đọc CONCEPT / EMOTION / LYRIC trong schema.
2. Chốt tứ thơ + cung cảm xúc theo section.
3. Chốt semantic arc trước khi tối ưu rhyme.
4. Viết lời khớp SONG_FORM; đếm âm tiết thô theo dòng nếu có `syllable_target`.
5. Chạy semantic audit.
6. Với tiếng Việt: xem thêm [tone-melody](../vietnamese/tone-melody.md).
7. Sau khi melody hoàn tất, kiểm lại lyric-melody fit mà không đánh đổi nghĩa câu.
