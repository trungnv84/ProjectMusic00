---
id: KNOW.MELODY.TENSION-RELEASE
objective_id: tension_release
type: knowledge
status: active
version: "1.0"
tags: [compose, melody, harmony, rhythm-form]
serves-steps: [3]
needs-approval: true
category: melodic_architecture
useful_for:
  - phrase_direction
  - pre_chorus_build
  - chorus_payoff
  - bridge_transition
  - final_chorus_release
compatible_with: [singability, emotional_contour, catchiness]
conflicts_with: []
section_affinity: [VERSE, PRE_CHORUS, CHORUS, BRIDGE, FINAL_CHORUS]
evaluation:
  primary: "presence and timing of buildup, delay, peak and release across phrase/section"
  evidence: "identified musical devices plus their positions and intended function"
  failure_signal: "successive phrases maintain the same tension state with no meaningful buildup, payoff or reset"
sources:
  - "docs/m-guide/knowledge/melody/phrase-structure.md"
  - "docs/m-guide/knowledge/melody/motif-development.md"
  - "docs/m-guide/knowledge/melody/composition-planning.md"
  - "docs/m-guide/knowledge/melody/catchiness.md"
last-updated: "2026-09-16"
---
# Melody — tension & release

> **AI:** Chọn `tension_release` khi melody cần có cảm giác kéo đi, trì hoãn, đạt đỉnh rồi trả về hoặc mở sang phrase kế tiếp. Không đồng nhất tension với nốt cao và release với tonic.

## Objective

`tension_release` là objective tổ chức lực hút và sự giải tỏa trong melody theo thời gian.

Tension có thể đến từ nhiều nguồn:

- melodic interval;
- unresolved scale degree / melodic destination;
- rhythmic displacement hoặc sustained anticipation;
- phrase extension;
- rising register;
- harmonic context;
- cadence bị trì hoãn;
- density hoặc repetition có chủ đích.

Release cũng có nhiều dạng:

- melodic landing;
- cadence;
- rhythmic simplification;
- register return;
- phrase rest/breath;
- harmonic resolution;
- repetition sau một biến thể.

Không có một device duy nhất bắt buộc cho mọi bài.

## Dùng ở bước nào

- Bước 3 — khi tổ chức phrase, Pre-Chorus, Chorus, Bridge và Final Chorus.
- Có thể là `primary` nếu bài cần dramatic arc; hoặc `secondary` để hỗ trợ emotional contour/catchiness.

## Constraints

- Mỗi section chính không nhất thiết phải có tension mạnh; có thể deliberately restrained.
- Khi bài yêu cầu build/payoff rõ, phải chỉ ra **ít nhất một cơ chế** tạo buildup và một cơ chế release trong plan/notes.
- Không tạo tension liên tục không có reset vì sẽ làm mất phân cấp section.
- Không dùng nốt cao làm shortcut duy nhất để tạo tension.
- Không coi tonic cadence là bằng chứng đủ cho release nếu melodic/rhythmic context vẫn đang unresolved.
- Tension phải nằm trong khả năng hát được đã chọn; không tạo tension bằng cách ép vocal range vô lý.

## Nguồn tạo tension

### 1. Melodic destination

Một phrase có thể tạm dừng trên note có cảm giác chưa kết hoặc hướng rõ về note khác.

### 2. Leap / interval

Một leap có thể tạo energy hoặc expectation, đặc biệt khi note đích được giữ hoặc tiếp tục dẫn tới một note khác.

### 3. Register

Mở register hoặc tiến dần tới vùng cao có thể tăng intensity. Nhưng nếu toàn bộ bài đều ở cao register, hiệu ứng này giảm.

### 4. Rhythm

Syncopation, pickup, subdivision change, anticipation hoặc kéo dài note qua boundary có thể tạo lực chờ.

### 5. Phrase extension

Một câu tưởng như sắp kết nhưng được kéo thêm một fragment có thể tạo trì hoãn.

### 6. Harmony

Melody đặt trên chord tension hoặc tránh final-scale-degree có thể tạo expectation. Đây là quan hệ melody–harmony, không phải một rule melody-only.

## Nguồn tạo release

- cadence rõ;
- note landing có trọng lượng;
- return về register ổn định;
- rhythmic simplification;
- rest/breath;
- resolution của motif;
- harmonic arrival;
- repetition của hook sau buildup.

Một release tốt không nhất thiết phải mạnh. Có thể là release nhẹ để mở sang câu kế tiếp.

## Tension không phải là "nhiều nốt"

Melody dày hoặc phức tạp có thể vẫn rất tĩnh nếu không có hướng đi rõ. Ngược lại, một phrase chỉ vài note có thể tạo tension mạnh nếu:

- destination được trì hoãn;
- rhythm tạo anticipation;
- register được mở đúng lúc;
- harmony làm note hiện tại nghe chưa hoàn tất.

Do đó tránh dùng note count hoặc range làm proxy duy nhất.

## Phrase-level architecture

Có thể dùng cấu trúc:

```text
setup → tension → peak/delay → release
```

hoặc:

```text
A (stable) → A' (more tension) → B (release)
```

Không phải mọi phrase cần đủ bốn bước. Một phrase có thể chỉ setup rồi nối trực tiếp sang phrase kế tiếp.

## Section-level architecture

### Verse

Thường giữ tension vừa phải để lyric có chỗ phát triển. Một verse có thể mở cadence hoặc để câu chưa hoàn tất nhằm kéo sang Pre.

### Pre-Chorus

Đây là vị trí tự nhiên để tăng expectation: phrase dần mở, cadence trì hoãn, rhythm tăng activity hoặc register dịch lên.

### Chorus

Chorus thường cung cấp payoff của tension trước đó. Payoff có thể là hook, melodic peak, harmonic arrival, rhythmic stabilization hoặc sự kết hợp.

### Bridge

Bridge có thể giữ tension theo một cách khác rồi dẫn trở lại Final Chorus. Bridge không nhất thiết là "cao hơn"; sự thay đổi context cũng có thể tạo tension.

### Final Chorus

Final nên có cảm giác consequence/payoff của arc. Có thể giải tỏa nhiều hơn, mở rộng, hoặc giữ một unresolved detail có chủ đích nếu style/lyric yêu cầu.

## Quan hệ với emotional contour

Hai objective gần nhau nhưng không đồng nhất:

- `emotional_contour` hỏi **melody di chuyển thế nào theo emotional arc**;
- `tension_release` hỏi **người nghe được kéo/chờ rồi được giải tỏa ở đâu và bằng cách nào**.

Một phrase có thể rising nhưng không thực sự tạo tension nếu destination đã quá predictable. Một phrase có thể plateau nhưng vẫn tension cao nếu cadence bị treo và harmony unresolved.

## Quan hệ với singability

Tension nên được tạo bằng lựa chọn âm nhạc, không phải bằng việc khiến câu khó hát một cách vô cớ.

Khi có conflict:

1. bảo vệ hard vocal constraints;
2. tìm tension bằng rhythm, cadence, harmony hoặc phrase timing;
3. chỉ giữ leap/register khó nếu có lý do expressive rõ.

## Cách áp dụng khi sáng tác

1. Đánh dấu các điểm setup, build, peak, release trong form.
2. Chọn nguồn tension cho từng điểm; tránh dùng cùng một device ở mọi section.
3. Đặt release sau khoảng chờ đủ để payoff có ý nghĩa.
4. Kiểm cadence, register, rhythm và harmony cùng nhau.
5. So sánh Pre → Chorus và Bridge → Final Chorus.
6. Kiểm tra tension có còn giữ được khi vocal được hát cùng lyric thật hay không.
7. Ghi device + vị trí + lý do trong composition notes khi objective được chọn.

## Evidence gợi ý

```yaml
tension_release:
  status: ok
  evidence:
    - "Pre-Chorus delays cadence for the last phrase"
    - "Chorus resolves the delayed destination on the hook"
    - "Bridge creates a new unresolved phrase before Final Chorus"
```

Evidence tốt phải nêu **cơ chế và vị trí**, không chỉ `tension = high`.

## Ví dụ ngắn (tự viết)

Pre-Chorus giữ phrase cuối ở trạng thái chưa kết và tăng nhịp chuyển động. Chorus trả lại destination rõ ở hook rồi có khoảng nghỉ ngắn trước phrase kế tiếp. Cảm giác tension/release đến từ cadence + rhythm + timing, không phải chỉ từ việc nâng nốt lên.

## Conflicts / related

- `conflicts-with:` none declared
- `related:` `KNOW.MELODY.PHRASE-STRUCTURE`
- `related:` `KNOW.MELODY.MOTIF-DEVELOPMENT`
- `related:` `KNOW.MELODY.CONTOUR`
- `related:` `KNOW.MELODY.CATCHINESS`
- `related:` `KNOW.MELODY.OBJECTIVE-METRICS`
