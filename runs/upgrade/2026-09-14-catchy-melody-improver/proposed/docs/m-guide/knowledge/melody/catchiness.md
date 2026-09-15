---
id: KNOW.MELODY.CATCHINESS
type: knowledge
status: proposed
needs-approval: true
version: "0.1"
tags: [compose, melody, lyrics, rhythm-form]
serves-steps: [3]
sources:
  - "https://doi.org/10.1525/mp.2024.2322897"
  - "https://pubmed.ncbi.nlm.nih.gov/36991289/"
  - "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.906190/full"
  - "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2017.00621/full"
  - "https://pubmed.ncbi.nlm.nih.gov/36622014/"
last-updated: "2026-09-14"
---
# Giai điệu catchy — hook, memorability và listener pull

> **AI:** Đây là knowledge bắt buộc ở Bước 3 khi mục tiêu user có `catchy`, `memorable`, `earworm`, `dễ nhớ`, `dễ hát theo` hoặc tương đương. Trang này dạy **cách suy nghĩ**, không cung cấp giai điệu để copy.

## 1. Catchy không đồng nghĩa với “lặp nhiều”

Một hook tốt phải vừa **salient** (nổi bật) vừa **memorable** (dễ lưu/nhớ). Nghiên cứu về pop excerpts cho thấy topline, chorus và compound hooks có liên hệ với đánh giá salience/memorability cao hơn. Repetition hỗ trợ nhớ, nhưng repetition một mình không bảo đảm bài hấp dẫn. Các nghiên cứu về groove cũng cho thấy cảm giác cuốn hút thường nằm ở cân bằng giữa predictability và surprise. 

### Model thực hành

Đánh giá hook theo 8 chiều:

1. **Identity** — nghe rhythm hoặc contour có nhận ra hook không?
2. **Rhythmic fingerprint** — hook có nhịp riêng đủ mạnh, không phải chuỗi onset đều?
3. **Contour** — đường nét có hình dạng rõ (arc, fall, rise, contrast) thay vì “đi ngang” dài?
4. **Motif chunkability** — hook có thể chia thành một cụm ngắn dễ ghi nhớ?
5. **Repetition with variation** — lặp đúng chỗ nhưng có A/A'/extension/payoff?
6. **Singability** — người hát phổ thông có thể hát lại sau vài lần nghe?
7. **Tension/release** — hook có tạo mong chờ rồi trả lời/giải tỏa?
8. **Section payoff** — Chorus nghe như một phần thưởng rõ ràng so với Verse/Pre?

Không yêu cầu mọi chiều đều cực đại. Nhưng hook không được đồng thời yếu ở identity + rhythm + contour + singability.

## 2. Reference-song analysis — học từ bài catchy, không sao chép

Trước khi invent, AI phải chọn **3–5 bài hát catchy** phù hợp mục tiêu của user. Có thể gồm:
- 2–3 bài cùng genre/era/market.
- 1–2 bài khác genre nhưng nổi bật về hook/rhythm/memorability.

Với mỗi bài, chỉ ghi **đặc trưng khái quát**:
- vị trí hook trong form;
- độ dài hook theo phrase/chunk;
- rhythmic fingerprint;
- contour behavior;
- repetition schedule;
- contrast giữa Verse → Pre → Chorus;
- điểm tension → payoff;
- mức singability/range;
- lyric phrase length và relation giữa lyric stress với hook rhythm;
- texture/production feature chỉ khi nó ảnh hưởng trực tiếp đến salience.

**Cấm:** chép nốt, chép lời, chép riff, chép hook, hoặc tạo một “melodic skeleton” dựa trên bài reference cụ thể. Reference chỉ được chuyển thành **abstract principles**.

## 3. Ba vai trò sáng tác bắt buộc

AI phải thực hiện ít nhất 3 pass nội bộ, độc lập về ý tưởng:

### Composer A — Hook specialist
Tìm 2–3 hook concept khác nhau, ưu tiên identity và singability.

### Composer B — Pop songwriter
Tìm một topline có phrase architecture, lyric prosody và payoff mạnh giữa Pre → Chorus.

### Composer C — Rhythm / melody specialist
Tập trung rhythmic fingerprint, syncopation, rests, pickup và contour; tránh melody “đều từng ô”.

Các candidate không được clone lẫn nhau. Chỉ sau khi tạo xong mới cho **Critic / Listener** so sánh.

## 4. Critic / Listener pass

Chấm từng candidate `0–4` cho 8 chiều ở trên và ghi evidence ngắn.

Ưu tiên candidate có:
- hook identity rõ;
- rhythm có fingerprint;
- contour dễ mô tả bằng lời;
- đủ repetition để nhớ nhưng có variation để không chán;
- chorus có payoff;
- dễ hát / dễ nói lại;
- không cần range cực đoan để tạo ấn tượng.

Không chọn candidate chỉ vì “nhiều nốt”, “nhiều quãng nhảy” hoặc “phức tạp hơn”.

## 5. Listener proxy tests

Trước khi export MusicXML, chạy tối thiểu:

- **HUM TEST:** bỏ lyric, vocal vẫn có thể ngân nga được hook?
- **RHYTHM TEST:** chỉ nói/đập rhythm hook, vẫn có identity?
- **SING-BACK TEST:** sau một lần đọc/nhẩm candidate, AI có thể tái hiện hook theo cell đã mô tả mà không nhìn XML?
- **CHORUS TEST:** Chorus có thực sự tạo cảm giác “đến hook rồi” không?
- **A/B TEST:** nghe/đọc Verse rồi Chorus; Chorus phải tăng salience, không chỉ tăng pitch.
- **REMOVAL TEST:** bỏ accompaniment; vocal melody vẫn đủ identity.

Các test này là **proxy**, không được tuyên bố là đo khách quan trí nhớ của người thật.

## 6. Quantitative guards — chỉ để bắt melody yếu rõ ràng

Được dùng như guardrail, không phải công thức sáng tác:

- Hook nên ngắn hơn một câu Chorus đầy đủ và có thể chia thành 1–2 chunks nhớ được.
- Hook không dùng onset pattern hoàn toàn đồng nhất xuyên toàn bộ phrase nếu rhythm là yếu tố chính của hook.
- Một rhythm cell không được phủ phần lớn Verse + Pre + Chorus rồi chỉ đổi pitch.
- Chorus phải có ít nhất một khác biệt thực về rhythm, contour hoặc phrase architecture so với Verse.
- Final Chorus phải phát triển hook bằng ít nhất một biến đổi thực: rhythmic variation, extension, fragmentation/recombination, new pickup, cadence change, melodic answer hoặc call/response — không chỉ transpose/register.

## 7. Vietnamese-specific note

Với tiếng Việt, melodic catchiness không được đạt bằng cách phá thanh điệu. Từ khóa hook phải đồng thời có:
- semantic importance;
- stress/beat suitability;
- tone-transition compatibility;
- vowel/consonant singability ở nốt dài/cao.

Khi xung đột, không dùng công thức `tone = pitch +/- 1` độc lập từng âm tiết. Hãy thiết kế **toàn phrase** rồi kiểm tra transitions.

## 8. Composition notes — bắt buộc evidence

`03-composition-notes.md` phải có:

```yaml
catchiness_review:
  reference_analysis:
    - song_label: "..."
      abstract_features: ["...", "..."]
  candidates:
    - id: A
      scores: {identity: 0, rhythm: 0, contour: 0, chunkability: 0, repetition_variation: 0, singability: 0, tension_release: 0, chorus_payoff: 0}
      evidence: "..."
    - id: B
      scores: {identity: 0, rhythm: 0, contour: 0, chunkability: 0, repetition_variation: 0, singability: 0, tension_release: 0, chorus_payoff: 0}
      evidence: "..."
    - id: C
      scores: {identity: 0, rhythm: 0, contour: 0, chunkability: 0, repetition_variation: 0, singability: 0, tension_release: 0, chorus_payoff: 0}
      evidence: "..."
  selected_candidate: "..."
  listener_proxies:
    hum_test: pass|fail
    rhythm_test: pass|fail
    sing_back_test: pass|fail
    chorus_test: pass|fail
    ab_test: pass|fail
    removal_test: pass|fail
  catchiness_gate: PASS|FAIL
```

## Related
- `KNOW.MELODY.INVENTION`
- `KNOW.MELODY.ANTI-PATTERNS`
- `KNOW.MELODY.PHRASE-STRUCTURE`
- `KNOW.MELODY.MOTIF-DEVELOPMENT`
- `KNOW.RHYTHM.PATTERNS`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`
