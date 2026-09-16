---
id: KNOW.MELODY.SINGABILITY
objective_id: singability
type: knowledge
status: draft
version: "1.0"
tags: [compose, melody, vocal]
serves-steps: [3]
needs-approval: true
category: vocal_melody
useful_for:
  - vocal_led_songs
  - lyric_dense_sections
  - memorable_hooks
  - repeated_chorus_material
compatible_with: [catchiness, emotional_contour]
conflicts_with: []
section_affinity: [VERSE, PRE_CHORUS, CHORUS, BRIDGE, FINAL_CHORUS]
evaluation:
  primary: "vocal_range_and_tessitura + leap_profile + phrase_breath_fit + lyric_delivery"
  evidence: "artifact-derived observations from melody and lyric placement"
  failure_signal: "a phrase is consistently awkward to sing without a justified stylistic reason"
sources:
  - "docs/m-guide/knowledge/vocal/phrasing-breath-and-melisma.md"
  - "docs/m-guide/knowledge/melody/contour.md"
  - "docs/m-guide/knowledge/melody/phrase-structure.md"
  - "docs/m-guide/knowledge/lyrics/lyric-melody-fit.md"
last-updated: "2026-09-16"
---
# Melody — singability

> **AI:** Chọn `singability` khi mục tiêu là một vocal line có thể hát tự nhiên, dễ phrasing và dễ ghi nhớ. Không đồng nhất singability với range hẹp, stepwise-only hoặc melody đơn giản.

## Objective

`singability` mô tả mức độ mà một melody có thể được người hát thực hiện tự nhiên trong context đã cho:

- range và tessitura hợp lý;
- interval/leap có thể xử lý;
- phrase length có chỗ thở;
- lyric delivery không bị ép;
- sustain rơi vào âm tiết phù hợp;
- các điểm khó có chủ đích thay vì xuất hiện ngẫu nhiên.

Singability là **objective về khả năng thực hiện**, không phải phán quyết rằng melody hay hơn một melody khác.

## Dùng ở bước nào

- Bước 3 — từ khi phác thảo vocal motif cho đến trước khi khóa lead sheet.
- Có thể được chọn làm `primary` hoặc `secondary objective` của Objective Selector.

## Constraints

- Không vượt `VOCAL.range` hoặc `tessitura` đã DEFINED/locked.
- Không tạo chuỗi leap khó xử lý liên tiếp nếu không có mục đích biểu cảm hoặc phong cách được ghi rõ.
- Breath point phải phù hợp phrase/ý nghĩa lyric; không chia câu chỉ để đáp ứng số ô nhịp.
- Nốt sustain dài phải được kiểm tra với âm tiết và khả năng phát âm/sustain của lyric.
- Với tiếng Việt, không hy sinh độ rõ của âm tiết trọng yếu chỉ để làm melody "mượt".
- `singability` không được dùng để triệt tiêu toàn bộ variation, rhythmic identity hoặc emotional contour.

## Hints

| Yếu tố | Hướng ưu tiên | Cảnh báo |
|---|---|---|
| Tessitura | phần lớn phrase nằm trong vùng hát ổn định | chỉ dựa vào range tối đa sẽ bỏ qua cảm giác thực khi hát |
| Stepwise motion | thường hữu ích để nối câu và giữ line tự nhiên | stepwise toàn bộ bài có thể làm melody phẳng |
| Leaps | dùng tại điểm nhấn có chủ đích | nhiều leap lớn liên tiếp dễ làm line khó hát |
| Phrase length | cho phép câu hoàn tất trước breath | câu quá ngắn có thể làm lyric vụn |
| Sustains | ưu tiên vowel dễ sustain khi thích hợp | consonant-heavy syllable kéo dài có thể thiếu tự nhiên |
| Rhythm | khớp stress và articulation của lyric | grid quá đều có thể dễ hát nhưng vẫn nhàm |
| Register contrast | cho phép peak ở từ khóa/điểm cao trào | tránh coi nốt cao là mục tiêu tự thân |

## Singability không đồng nghĩa với nhàm chán

Một melody có thể rất dễ hát nhưng vẫn thiếu identity nếu:

- rhythm phrase lặp một mẫu;
- contour hầu như không thay đổi;
- cadence luôn cùng kiểu;
- mọi section dùng cùng register và density.

Ngược lại, một melody có vài điểm khó vẫn có thể có tính hát được nếu khó khăn được giới hạn, dự đoán được và phục vụ biểu cảm.

Do đó khi `singability` cùng xuất hiện với `catchiness`, không được giảm melody thành một chuỗi nốt an toàn. Giữ identity của hook, rồi tối ưu những điểm gây cản trở việc hát.

## Interval và leap

Đánh giá leap theo context thay vì một ngưỡng cứng:

1. Xác định leap nằm ở pickup, giữa phrase hay điểm nhấn.
2. Kiểm tra nốt đích có thể hát và có được chuẩn bị bởi harmony/register không.
3. Kiểm tra chuyển động sau leap: stepwise recovery thường giúp line tiếp tục tự nhiên, nhưng không phải luật bắt buộc.
4. Tránh nhiều leap cùng hướng tạo cảm giác khó kiểm soát trừ khi đó là peak có chủ ý.
5. Nếu lyric có từ khóa, ưu tiên khả năng phát âm rõ và giữ stress đúng.

Không có một kích thước interval duy nhất có thể dùng làm định nghĩa universal cho singability.

## Breath và phrase

Breath nên được xem là một phần của cấu trúc phrase:

- trước khi bắt đầu câu mới;
- quanh punctuation hoặc boundary của ý;
- sau cadence hợp lý;
- trước/sau một peak nếu người hát cần lấy hơi để thực hiện payoff.

Không cắt breath giữa hai từ mà ý nghĩa hoặc delivery tự nhiên cần liên kết chỉ vì câu đã đạt một số beat nhất định.

## Lyric delivery

Singability phải kiểm tra cùng lyric:

- syllable có bị nhồi quá nhiều note không;
- consonant cluster có rơi vào vị trí khó không;
- vowel có bị bắt sustain ở chỗ bất tiện không;
- stress của câu nói có bị chuyển sang beat/note bất hợp lý không;
- tiếng Việt có bị kéo melisma hoặc pitch change làm khó nhận âm tiết không.

Trang này bổ sung cho `KNOW.LYRICS.LYRIC-MELODY-FIT`; không thay thế trang đó.

## Cách áp dụng khi sáng tác

1. Đọc lyric thành lời nói và đánh dấu stress/keyword.
2. Chọn vocal range/tessitura từ requirement.
3. Invent motif với contour/rhythm trước, rồi kiểm tra các điểm khó hát.
4. Đặt breath theo phrase và meaning.
5. Kiểm tra leap, sustain và articulation ở từng phrase.
6. Sau khi melody vẫn có identity, chỉnh các điểm khó thay vì làm phẳng toàn bộ line.
7. Ghi evidence ngắn cho objective trong composition notes nếu `singability` được chọn.

## Evidence gợi ý

```yaml
singability:
  status: ok
  evidence:
    - "most vocal phrases remain inside defined tessitura"
    - "peak leap occurs once at chorus keyword and resolves by step"
    - "breath follows phrase boundaries"
```

Không ghi:

```yaml
singability:
  score: 9/10
```

trừ khi repository sau này định nghĩa một scoring system chính thức.

## Ví dụ ngắn (tự viết)

Một chorus có hai phrase: phrase đầu chủ yếu stepwise, phrase hai mở register ở keyword rồi hạ dần để kết câu. Sau phrase hai có khoảng nghỉ phù hợp với punctuation của lyric. Đây là ví dụ về **thiết kế phục vụ hát**, không phải mẫu nốt phải sao chép.

## Conflicts / related

- `conflicts-with:` none declared
- `related:` `KNOW.VOCAL.PHRASING-BREATH-MELISMA`
- `related:` `KNOW.MELODY.CONTOUR`
- `related:` `KNOW.MELODY.PHRASE-STRUCTURE`
- `related:` `KNOW.LYRICS.LYRIC-MELODY-FIT`
- `related:` `KNOW.MELODY.CATCHINESS`
- `related:` `KNOW.MELODY.OBJECTIVE-METRICS`
