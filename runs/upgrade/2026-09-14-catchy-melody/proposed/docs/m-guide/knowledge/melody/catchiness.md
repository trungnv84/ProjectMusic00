---
id: KNOW.MELODY.CATCHINESS
type: knowledge
status: active
version: "1.0"
tags: [compose, melody]
serves-steps: [3]
sources:
  - "https://songwritingauthority.com/melody-writing-techniques/"
  - "https://musiciangoods.com/en-gb/blogs/music-theory/what-makes-a-song-catchy"
  - "https://orphiq.com/resources/how-to-write-a-melody"
  - "https://www.gold.ac.uk/news/scientists-find-key-to-writing-catchy-pop-hits/"
  - "docs/m-guide/knowledge/melody/melody-invention.md"
  - "docs/m-guide/knowledge/melody/anti-patterns.md"
last-updated: "2026-09-14"
---

# Giai điệu catchy — đặc trưng & checklist (Bước 3)

> **AI:** Trang **bắt buộc** khi invent giai điệu ở Bước 3. Mục tiêu: giai điệu **đáng nhớ** (hook dễ ngân nga sau 1–2 lần nghe), không rời rạc, không lặp nhàm. **Cấm** copy nốt / riff / hook của bất kỳ tác phẩm có bản quyền. Chỉ lấy **đặc trưng khái quát**.

## Vấn đề cần tránh

- Phrase rời rạc, không có motif ngắn thống nhất → nghe như “đánh từng câu riêng”.
- Lặp skeleton dài / cùng pitch+rhythm cell trên nhiều câu mà cell gốc **không memorable** → nhàm chán.
- Hook không rõ (không có cell ngắn + contour rõ) → Chorus không “dính”.
- Quá nhiều nốt khác nhau hoặc nhảy lung tung → khó hát theo, khó nhớ.

## Đặc trưng giai điệu catchy (tổng hợp thực hành + nghiên cứu)

Các yếu tố thường xuất hiện cùng lúc ở giai điệu dễ nhớ (hook / earworm-prone):

| Đặc trưng | Ý nghĩa thực tế cho AI | Gợi ý áp dụng |
|-----------|------------------------|---------------|
| **Short memorable cell** | 2–5 nốt (hoặc 2–4 bar) có identity rõ | Invent 1 hook cell trước; ghi `hook_melody_cell` |
| **Clear contour** | Hình dạng dễ nhận (arch lên-xuống, stepwise climb, leap-then-step) | Peak thường gắn từ quan trọng / syllable nhấn |
| **Repetition with variation** | Nghe ≥2–3 lần gần nhau; lần sau đổi 1 yếu tố (ending, rhythm, sequence) | A A A' hoặc A A B A; không copy nguyên xi vô hạn |
| **Rhythmic identity** | Rhythm cell dễ “gõ theo”; có thể có syncopation nhẹ hoặc rest tạo hơi thở | Rhythm thường quan trọng hơn exact pitch |
| **Limited pitch set** | Nhiều hook chỉ dùng 3–6 pitch khác nhau trong cell | Hạn chế → buộc tạo interest bằng contour + rhythm |
| **Singable range** | Chủ yếu trong tessitura dễ hát; 1 peak rõ | Khớp VOCAL range; tránh nhảy liên tục |
| **Early & recurring hook** | Hook xuất hiện sớm ở Chorus và quay lại | Final Chorus phát triển, không chỉ register+ |
| **Coherence** | Các phrase trong section chia sẻ DNA motif | Không phrase nào “lạc loài” hoàn toàn |

Nghiên cứu earworm (Jakubowski et al. và follow-up): tempo nhanh hơn một chút, contour quen thuộc (rise-then-fall), cộng thêm yếu tố bất ngờ vừa phải (leap hoặc repetition bất thường) tăng khả năng “dính”. Ballad chậm vẫn catchy nếu cell ngắn + contour rõ + lặp có chủ đích.

## Constraints

- Phải invent **hook_melody_cell** (pitch sequence + rhythm cell ngắn) **trước** khi viết full Chorus; ghi rõ trong composition notes.
- Hook cell phải xuất hiện rõ ở Chorus (và ideally lặp / biến tấu có chủ đích).
- Mỗi section chính (Verse, Pre, Chorus, Bridge) phải có **ý nhạc riêng** nghe được — xem [melody-invention](melody-invention.md) và [anti-patterns](anti-patterns.md).
- Cấm: phrase rời rạc không motif; lặp skeleton dài mà cell gốc không memorable; chỉ nâng register ở Final mà không có kỹ thuật phát triển.
- `music_quality_gate` phải đánh giá `hook_distinctiveness` + `melodic_coherence` (xem [musical-quality-gate](musical-quality-gate.md)).

## Hints — quy trình invent catchy (nội bộ)

1. **Đọc lời theo nhịp nói** → đánh dấu từ mang nghĩa / stress.
2. **Invent rhythm cell trước** (hoặc đồng thời với pitch) cho hook — thử vài pattern có rest hoặc syncop nhẹ.
3. **Giới hạn pitch** tạm thời (3–6 nốt) → tìm contour rõ (arch / climb / leap-step).
4. **Hát thầm cell** vài lần: có muốn ngân nga không? Nếu không → đổi.
5. **Khóa hook cell** vào notes (`hook_melody_cell`).
6. **Xây Verse / Pre từ motif liên quan nhưng khác** (contour hoặc denser/sparser); Bridge đổi không gian.
7. **Lặp có chủ đích**: A → A → A' (đổi ending / sequence) ở Chorus; Final dùng ≥1 kỹ thuật từ [motif-development](motif-development.md).
8. **Speak/sing-test toàn bài**: chỗ rời rạc hoặc nhàm → viết lại đoạn đó (không patch nốt lẻ).

## Cách áp dụng với MusicXML + notes

1. Ghi `hook_melody_cell` + `motifs_declared` trong `03-composition-notes.md`.
2. Evidence ngắn cho catchiness (contour type, limited pitches?, rhythmic feature).
3. Gate: `REQUIRE_CATCHY_HOOK` + bảng điểm (xem quality-gate).
4. FAIL → invent lại cell/motif, xuất lại cả lead sheet.

## Related

- `KNOW.MELODY.INVENTION`
- `KNOW.MELODY.ANTI-PATTERNS`
- `KNOW.MELODY.QUALITY-GATE`
- `KNOW.MELODY.CONTOUR`
- `KNOW.MELODY.MOTIF-DEVELOPMENT`
- `KNOW.MELODY.PHRASE-STRUCTURE`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`
- `PIPE.STEP-03`