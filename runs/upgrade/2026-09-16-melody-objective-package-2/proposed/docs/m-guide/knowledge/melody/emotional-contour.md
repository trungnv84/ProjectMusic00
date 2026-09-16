---
id: KNOW.MELODY.EMOTIONAL-CONTOUR
objective_id: emotional_contour
type: knowledge
status: draft
version: "1.0"
tags: [compose, melody, emotion]
serves-steps: [3]
needs-approval: true
category: expressive_melody
useful_for:
  - songs_with_emotional_arc
  - chorus_payoff
  - verse_to_chorus_contrast
  - bridge_development
compatible_with: [singability, catchiness, tension_release]
conflicts_with: []
section_affinity: [VERSE, PRE_CHORUS, CHORUS, BRIDGE, FINAL_CHORUS]
evaluation:
  primary: "contour + register + phrase direction interpreted against the requested emotional arc"
  evidence: "phrase/section observations with an explicit rationale"
  failure_signal: "melodic direction repeatedly contradicts the requested emotional trajectory without a deliberate reason"
sources:
  - "docs/m-guide/knowledge/melody/contour.md"
  - "docs/m-guide/knowledge/melody/phrase-structure.md"
  - "docs/m-guide/knowledge/melody/composition-planning.md"
  - "docs/m-guide/meta/song-request-schema.md"
last-updated: "2026-09-16"
---
# Melody — emotional contour

> **AI:** Chọn `emotional_contour` khi melody cần truyền đạt hoặc làm rõ một emotional arc. Rising/falling contour chỉ là tendency; không dùng công thức kiểu "đi lên = vui" hoặc "đi xuống = buồn".

## Objective

`emotional_contour` mô tả cách đường đi của melody góp phần vào diễn biến cảm xúc theo thời gian.

Nó xem melody ở ít nhất ba cấp:

- **note-to-note:** hướng chuyển động cục bộ;
- **phrase:** mở, nâng, giữ, hạ hoặc kết;
- **section:** quan hệ giữa Verse, Pre-Chorus, Chorus, Bridge và Final Chorus.

Mục tiêu là làm cho melodic motion có quan hệ với emotional arc của bài, chứ không bắt mọi phrase phải cùng một hướng.

## Dùng ở bước nào

- Bước 3 — sau khi hiểu emotional arc và trong khi thiết kế motif/phrase.
- Có thể là `primary` cho bài dựa nhiều vào diễn biến cảm xúc hoặc `secondary` để hỗ trợ catchiness/singability.

## Constraints

- Không tự suy ra một emotional meaning cố định chỉ từ một contour.
- Khi user đã mô tả emotional arc, melody phải có ít nhất một thay đổi có chủ đích giữa các giai đoạn chính của arc.
- Contour phải được đọc cùng lyric, register, harmony và section function.
- Không dùng rising contour ở mọi Chorus chỉ vì đó là cách dễ tạo cảm giác "tăng".
- Không biến một emotional tendency thành hard rule cho mọi genre.

## Bốn dạng chuyển động hữu ích

| Dạng | Mô tả | Có thể gợi ý |
|---|---|---|
| Rising | hướng chung đi lên hoặc mở register | expectation, lift, urgency, hope, climax |
| Falling | hướng chung hạ xuống/thu lại | release, reflection, resignation, landing |
| Plateau | giữ vùng/register tương đối ổn định | intimacy, steadiness, focus, restraint |
| Mixed / wave | lên-xuống theo phrase hoặc nhiều câu | complexity, hesitation, conversation, ambivalence |

Các cột "có thể gợi ý" là tendencies, không phải semantic mapping bắt buộc.

## Từ contour đến emotional arc

Một emotional contour tốt thường không được đánh giá bằng một phrase đơn lẻ. Hãy xem quan hệ:

```text
beginning → development → lift/climax → aftermath/resolution
```

Ví dụ trừu tượng:

```text
VERSE:    restrained / narrow
PRE:      gradually rising
CHORUS:   wider + higher peak
BRIDGE:   contrasting descent or plateau
FINAL:    return + new payoff
```

Đây chỉ là một pattern khả dĩ. Bài có thể chọn arc khác nếu lyric và genre yêu cầu.

## Contour không phải register

Tăng register và rising contour có liên quan nhưng không đồng nhất:

- một phrase có thể đổi register mà contour vẫn phẳng;
- một phrase có thể rising rồi quay về register cũ;
- một chorus có thể tạo intensity bằng rhythmic density/harmony thay vì nốt cao.

Vì vậy không kết luận `emotional_contour = PASS` chỉ vì Chorus có nốt cao hơn Verse.

## Quan hệ với lyric

Emotional contour cần đọc lyric cùng lúc:

- từ khóa của climax có thể được đặt ở điểm melodic lift;
- câu hỏi hoặc unfinished thought có thể kết bằng contour mở;
- câu kết/nhận ra có thể dùng release contour;
- một câu cố ý mâu thuẫn giữa lyric và melody có thể hợp lệ nếu đó là expressive intent.

Đặc biệt với tiếng Việt, không ép contour đổi hướng ở âm tiết trọng yếu nếu làm mất tự nhiên của tone-melody relationship.

## Quan hệ với section

### Verse

Thường cho phép vùng register và contour tiết chế để tạo chỗ cho câu chuyện/lyric.

### Pre-Chorus

Có thể tăng expectation bằng hướng lên, tăng density, kéo dài phrase hoặc trì hoãn cadence. Không bắt buộc mọi Pre phải đi lên.

### Chorus

Nên có một payoff dễ nhận diện so với Verse. Payoff có thể đến từ register, contour, rhythm, harmony hoặc kết hợp nhiều thứ.

### Bridge

Có thể đổi góc nhìn melodic: plateau, descending, syncopated, different register hoặc phrase asymmetry. Mục tiêu là tạo chức năng contrast, không chỉ đổi vài nốt.

### Final Chorus

Có thể quay lại material quen thuộc nhưng cần payoff phù hợp emotional arc. `register_shift_only` không tự động được coi là development.

## Không biến thành công thức cứng

Tránh các luật kiểu:

```text
happy → rising
sad → falling
chorus → higher
bridge → lower
```

Các mapping trên quá thô và dễ khiến mọi bài có cùng shape.

Thay vào đó:

```text
emotion + lyric intent + section function
        ↓
melodic tendency
        ↓
composer decision
        ↓
evidence / tradeoff
```

## Cách áp dụng khi sáng tác

1. Xác định emotional arc từ yêu cầu bài.
2. Đánh dấu nơi cần expectation, peak và release.
3. Chọn contour tendency cho từng phrase/section, không cần tất cả cùng một hướng.
4. Kiểm tra register, rhythm, harmony và lyric có hỗ trợ hay mâu thuẫn intentional.
5. So sánh Verse ↔ Chorus và Bridge ↔ surrounding sections.
6. Chỉ sau đó tinh chỉnh note-level motion.
7. Ghi một câu rationale nếu objective được chọn.

## Evidence gợi ý

```yaml
emotional_contour:
  status: ok
  evidence:
    - "Verse remains restrained while Pre gradually raises register"
    - "Chorus places the emotional keyword at the main melodic peak"
    - "Bridge uses a descending/plateau contour to create contrast before Final Chorus"
```

Evidence phải mô tả artifact thật hoặc thiết kế đã được thể hiện trong notes; không chỉ ghi `emotional = strong`.

## Ví dụ ngắn (tự viết)

Một Verse dùng phrase tương đối plateau, Pre-Chorus mở dần hướng lên, Chorus đạt peak ở keyword rồi hạ về cadence. Bridge không tiếp tục leo cao mà đổi sang contour đi xuống để tạo cảm giác nhìn lại trước Final Chorus. Đây là minh họa về **quan hệ giữa contour và arc**, không phải template bắt buộc.

## Conflicts / related

- `conflicts-with:` none declared
- `related:` `KNOW.MELODY.CONTOUR`
- `related:` `KNOW.MELODY.PHRASE-STRUCTURE`
- `related:` `KNOW.MELODY.MOTIF-DEVELOPMENT`
- `related:` `KNOW.MELODY.CATCHINESS`
- `related:` `KNOW.MELODY.OBJECTIVE-METRICS`
