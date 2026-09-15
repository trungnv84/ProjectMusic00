---
id: KNOW.MELODY.OBJECTIVE-METRICS
type: knowledge
status: draft
version: "1.0"
tags: [compose, melody, validation]
serves-steps: [3]
needs-approval: true
sources:
  - "docs/m-guide/knowledge/melody/musical-quality-gate.md"
  - "docs/m-guide/knowledge/melody/anti-patterns.md"
  - "docs/m-guide/knowledge/melody/melody-invention.md"
last-updated: "2026-09-15"
---
# Objective melody metrics — audit giai điệu từ MusicXML

> **AI:** Dùng trang này ở cuối Bước 3 để biến nhận xét “catchy / đều đều / lặp” thành bằng chứng có thể tái kiểm tra. Không thay thế việc nghe bản phát lại; đây là objective audit lớp cấu trúc.

## Dùng ở bước nào

- Bước 3 — sau khi `03-song.musicxml` đã được tạo và trước khi `music_quality_gate` được quyết định.
- Không tạo file plan riêng. Audit nằm trong `03-composition-notes.md` dưới `objective_melody_audit`.

## Nguyên tắc

1. **Audit artifact, không audit ý định.** Chỉ dùng giai điệu thực tế đã xuất trong MusicXML.
2. **Canonicalize trước khi so.** Cùng một phrase nhưng khác absolute pitch/register không được tự động xem là material khác nếu interval/rhythm structure gần như giống nhau.
3. **Không dùng một metric duy nhất.** Repetition, rhythm, contour, cadence và section contrast phải được nhìn cùng nhau.
4. **Objective không đồng nghĩa với “hay”.** Metric đạt chỉ chứng minh cấu trúc không có dấu hiệu xấu đã định nghĩa; không thể chứng minh thị hiếu hay cảm xúc hoàn hảo.
5. **Không tự chế số liệu nghe.** Nếu không tính được metric từ XML, ghi `unavailable` và gate không được PASS ở metric tương ứng.

## Canonical phrase representation

Mỗi phrase được biểu diễn tối thiểu bằng:

```text
PHRASE =
  pitch_classes_relative_to_first_note[]
  directed_intervals_semitones[]
  rhythm_tokens[]
  onset_positions_in_beats[]
  normalized_duration_tokens[]
  cadence_token
  length_in_beats
```

Trong đó:

- `pitch_classes_relative_to_first_note[]`: pitch class tương đối so với note đầu phrase.
- `directed_intervals_semitones[]`: khoảng cách có hướng giữa hai note liên tiếp.
- `rhythm_tokens[]`: duration + rest/silence pattern ở độ phân giải của MusicXML divisions.
- `onset_positions_in_beats[]`: vị trí xuất hiện của note trong phrase.
- `normalized_duration_tokens[]`: duration được quy về đơn vị tương đối để tránh khác biệt tuyệt đối do tempo.
- `cadence_token`: kiểu kết phrase, tối thiểu `up`, `down`, `repeat`, `stable`, `rest`, `unknown`.
- `length_in_beats`: tổng thời lượng phrase.

Không được coi lyric text là một phần của melody similarity.

## Metric definitions

### 1. Exact phrase skeleton rate — `EXACT_REPEAT_RATE`

So các phrase thuộc cùng section sau khi canonicalize pitch + rhythm.

```text
exact_repeat_rate =
  repeated_phrase_occurrences / eligible_phrase_occurrences
```

Hard FAIL mặc định đề xuất:

```text
same pitch+rhythm skeleton in >= 3 consecutive eligible phrases
```

Metric này tương thích với anti-pattern `Skeleton lặp Verse`, nhưng diễn đạt theo artifact thực tế.

### 2. Near-repeat similarity — `NEAR_REPEAT_MAX`

So từng cặp phrase bằng composite similarity:

```text
similarity = mean(
  pitch_interval_similarity,
  rhythm_similarity,
  contour_similarity,
  cadence_similarity
)
```

Trong đó từng thành phần nằm trong `[0,1]`.

Hard FAIL đề xuất:

```text
>= 2 consecutive phrase pairs have similarity >= 0.90
and are not explicitly declared A/A' or hook repetition
```

Warning đề xuất:

```text
max pair similarity in a section >= 0.80
```

Mục tiêu của metric này là bắt trường hợp “chỉ đổi vài nốt nhưng vẫn nghe như cùng một câu”.

### 3. Rhythm diversity — `RHYTHM_DIVERSITY`

```text
rhythm_diversity =
  unique_rhythm_signatures / eligible_phrase_count
```

Chỉ số này không yêu cầu mọi phrase đều phải khác nhau. Hook lặp có chủ đích được phép.

Warning đề xuất:

```text
< 0.50 within Verse + Pre combined
```

Hard FAIL khi đồng thời:

```text
rhythm_diversity < 0.40
AND contour diversity < 0.40
AND exact/near repetition is also elevated
```

### 4. Contour diversity — `CONTOUR_DIVERSITY`

Chuẩn hóa mỗi phrase thành hướng chuyển động theo ký hiệu:

```text
U = up
D = down
S = same/repeated pitch
```

So sánh các contour signature trong một section.

```text
contour_diversity = unique_contour_signatures / eligible_phrase_count
```

Không coi đổi absolute register là contour mới.

### 5. Cadential variety — `CADENCE_VARIETY`

```text
cadence_variety = unique_cadence_tokens / eligible_phrase_count
```

Warning đề xuất nếu một section có >= 4 phrase nhưng chỉ có một loại cadence token.

### 6. Section contrast — `SECTION_CONTRAST`

So sánh Verse vs Chorus và Verse vs Bridge trên ít nhất:

```text
- pitch register centroid
- rhythm signature distribution
- contour distribution
- cadence distribution
```

Một cặp section đạt contrast khi có ít nhất **2 dimension** khác biệt rõ ràng theo audit.

Không dùng “section nghe khác” làm evidence duy nhất.

### 7. Hook distinctiveness — `HOOK_DISTINCTIVENESS`

Hook phải vừa **nhớ được** vừa **được nhận diện như material riêng**.

Audit tối thiểu:

```text
hook_declared = true
hook_occurrences >= 2
hook rhythm signature is present in Chorus
hook is not merely copied from an earlier Verse phrase
```

Nếu hook giống một phrase Verse trước đó về cả pitch-interval và rhythm mà không có lý do được ghi rõ, metric FAIL.

### 8. Final development — `FINAL_DEVELOPMENT`

Final Chorus chỉ được coi là development nếu có ít nhất một operation trên material trước đó ngoài `register_shift_only`:

```text
rhythmic_rewrite
cadence_change
phrase_extension_or_compression
fragmentation_or_augmentation
sequence_with_new_context
new_counterphrase
reordered_motif_components
```

`register_shift_only` không đủ.

## Gate interpretation

```text
PASS:
  - no hard metric FAIL
  - all required metrics have numeric/evidenced values
  - hook + section contrast + final development are evidenced

FAIL:
  - any hard metric FAIL
  - any required metric = unavailable
  - evidence chỉ là adjective, không có artifact-derived data
```

## Cách ghi audit trong notes

Ví dụ cấu trúc:

```yaml
objective_melody_audit:
  method: "canonical_phrase_v1"
  scope:
    parts: [P1]
    sections: [VERSE_1, PRE_CHORUS, CHORUS, VERSE_2, BRIDGE, FINAL_CHORUS]
  metrics:
    exact_repeat_rate:
      value: 0.20
      status: ok
      evidence: "VERSE_1: 1 repeated family / 5 eligible phrases"
    near_repeat_max:
      value: 0.84
      status: ok
      evidence: "highest non-declared pair = phrase V1.2/V1.3"
    rhythm_diversity:
      value: 0.75
      status: ok
      evidence: "6 unique rhythm signatures / 8 eligible phrases"
    contour_diversity:
      value: 0.63
      status: ok
      evidence: "5 unique contour signatures / 8 eligible phrases"
    cadence_variety:
      value: 0.75
      status: ok
      evidence: "3 cadence types / 4 eligible phrases"
    section_contrast:
      verse_vs_chorus: "PASS — register + rhythm"
      verse_vs_bridge: "PASS — contour + cadence"
    hook_distinctiveness:
      status: ok
      evidence: "declared hook appears in Chorus and is distinct from Verse family"
    final_development:
      status: ok
      operation: "cadence_change + phrase_extension"
```

## Hints

- Dùng metric để tìm **dấu hiệu cấu trúc** của sự nhàm chán, không biến nó thành công thức “đạt điểm = hay”.
- Khi nghe Flat và cảm thấy tệ nhưng metrics vẫn PASS, ghi chú sự lệch này thay vì ép PASS thành “objective proof”. Đây có thể là tín hiệu cần một package khác về perceptual/candidate evaluation.

## Conflicts / related

- `related:` `KNOW.MELODY.QUALITY-GATE`
- `related:` `KNOW.MELODY.ANTI-PATTERNS`
- `related:` `KNOW.MELODY.INVENTION`
- `related:` `PIPE.STEP-03`
