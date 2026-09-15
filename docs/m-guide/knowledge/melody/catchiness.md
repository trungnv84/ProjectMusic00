---
id: KNOW.MELODY.CATCHINESS
type: knowledge
status: active
version: "1.0"
tags: [compose, melody, lyrics, rhythm-form]
serves-steps: [3]
sources:
  - "docs/m-guide/knowledge/melody/melody-invention.md"
  - "docs/m-guide/knowledge/melody/anti-patterns.md"
  - "https://songwritingauthority.com/melody-writing-techniques/"
  - "https://musiciangoods.com/en-gb/blogs/music-theory/what-makes-a-song-catchy"
  - "https://orphiq.com/resources/how-to-write-a-melody"
  - "https://www.gold.ac.uk/news/scientists-find-key-to-writing-catchy-pop-hits/"
  - "runs/compose/2026-09-08-nang-som-tinh-khoi/"
  - "runs/upgrade/2026-09-14-nang-som-tinh-khoi-catchy/run-review.md"
last-updated: "2026-09-14"
---

# Giai điệu catchy — cơ chế, không phải danh sách cấm

> **AI:** Đọc bắt buộc ở Bước 3, **trước khi** viết note đầu tiên của Chorus, cùng lúc với
> [melody-invention](melody-invention.md). [anti-patterns](anti-patterns.md) trả lời "làm gì thì FAIL"
> (tiêu chí **phủ định**); trang này trả lời câu user hay hỏi khi melody bị chê "rời rạc / lặp nhàm / không
> catchy": *một giai điệu cần gì để đáng nhớ?* — tiêu chí **tích cực**. Đây là kiến thức khái quát về cách
> nhạc phổ thông tạo cảm giác "dính tai" (earworm), **không** phải bản mẫu nốt nhạc — **cấm tuyệt đối** biến
> ví dụ minh hoạ trong trang này (hoặc trong bất kỳ knowledge page nào) thành skeleton thật của bài đang viết.

## Dùng ở bước nào

- Bước 3 — ngay khi bắt đầu invent hook Chorus, trước khi khoá `hook_melody_cell`; tham chiếu lại khi tự chấm
  `music_quality_gate`.

## Catchy không đồng nghĩa với "lặp nhiều"

Repetition hỗ trợ ghi nhớ, nhưng một mình nó không đảm bảo bài hấp dẫn — lặp một cell **không memorable**
(pitch set quá rộng, rhythm đều đều, contour phẳng) vẫn nhàm chán dù đúng công thức A-A-A. Ngược lại, hook
thật sự "dính" thường đến từ việc **giữ cell ngắn dễ nhận + lặp có biến đổi**, chứ không phải từ số lần lặp.

## Đặc trưng giai điệu catchy (checklist thực hành)

| Đặc trưng | Ý nghĩa thực tế cho AI | Gợi ý áp dụng |
|-----------|------------------------|---------------|
| **Hook economy (short memorable cell)** | Hook Chorus phải rút gọn được thành 2–5 nốt (hoặc 1–2 ô nhịp/2–4 bar) có identity rõ — mô tả được bằng một câu, không phải cả câu nhạc dài phức tạp | Invent hook cell **trước** khi viết full Chorus; khoá vào `hook_melody_cell` |
| **Clear contour** | Hình dạng dễ nhận (arch lên-xuống, stepwise climb, leap-then-step) thay vì đi ngang dài | Peak thường gắn từ quan trọng / syllable nhấn |
| **Rhythmic hook đi cùng pitch hook** | Phần lớn giai điệu dễ nhớ dựa vào **nhịp điệu đặc trưng** (placement so với phách mạnh/yếu) ngang bằng hoặc hơn cao độ | Cố định rhythm cell của hook **trước** khi tinh chỉnh pitch |
| **Limited pitch set** | Nhiều hook chỉ dùng 3–6 pitch khác nhau trong cell | Hạn chế → buộc tạo interest bằng contour + rhythm thay vì nhảy quãng lung tung |
| **Repetition-with-variation, không repetition-thuần** | Hook được lặp trong Chorus, nhưng mỗi lần lặp phải có ≥1 biến đổi nhỏ nghe được (đổi nốt cuối câu, đổi harmony bên dưới, đổi cách ngắt nhịp lyric) | Lặp y hệt 100% quá 2 lần liên tiếp không tính là hook — tính là anti-pattern |
| **Tầm cữ hát được / singable range** | Hook nằm trong quãng vừa hát vừa nhớ được khi không có nhạc đệm — thường hẹp hơn phần còn lại của bài | Nếu hook trải quá rộng quãng hoặc đổi hướng liên tục → giảm khả năng ghi nhớ |
| **Vị trí hook nhất quán** | Hook (cả pitch lẫn lyric-hook trùng tên/ý chính bài) nên xuất hiện ở vị trí dễ đoán trong câu (mở đầu hoặc kết câu Chorus) | Vị trí đổi thất thường giữa các lần lặp Chorus làm giảm độ "bắt tai" |
| **Tương phản trước hook** | Verse/Pre-Chorus phải khác hook về mật độ và/hoặc contour để hook nổi bật khi xuất hiện | Liên hệ trực tiếp `MIN_SECTION_CONTRAST` — hook không catchy nếu mọi section đều "phẳng" như nhau |
| **Coherence trong section** | Các phrase trong cùng section chia sẻ DNA motif (contour/rhythm cell/interval pattern) | Không phrase nào "lạc loài" — xem anti-pattern "phrase rời rạc" |
| **Early & recurring hook, Final có payoff** | Hook xuất hiện sớm ở Chorus và quay lại; Final Chorus phát triển chứ không chỉ register+ | Dùng ≥1 kỹ thuật ở [motif-development](motif-development.md): sequence, fragmentation, đổi cadence, augmentation/diminution, đảo khoảng |

Không yêu cầu mọi đặc trưng đều đạt cực đại — nhưng hook không được đồng thời yếu ở identity + rhythm +
contour + singability.

## Constraints

- Phải invent `hook_melody_cell` (pitch sequence + rhythm cell ngắn) **trước** khi viết full Chorus; ghi rõ
  trong composition notes cùng evidence ngắn (contour type, limited pitch set?, rhythmic feature).
- Hook cell phải xuất hiện rõ ở Chorus, ở vị trí nhất quán qua các lần lặp.
- Mỗi lần Chorus lặp lại hook phải có ≥1 biến đổi nghe được — không lặp y hệt 100% quá 2 lần liên tiếp.
- Chorus Final **không được** là bản copy thuần của Chorus 1 — phải áp dụng ≥1 kỹ thuật phát triển cụ thể,
  trùng khớp trực tiếp với `REQUIRE_FINAL_CHORUS_DEVELOPMENT` trong [quality-gate](musical-quality-gate.md).
- Mỗi section chính (Verse, Pre, Chorus, Bridge) phải có ý nhạc riêng nghe được — xem
  [melody-invention](melody-invention.md) và [anti-patterns](anti-patterns.md); phrase trong cùng section
  phải chia sẻ DNA motif (không rời rạc hoàn toàn).
- Cấm dùng tên nghệ sĩ/bài hát cụ thể để chỉ định nốt/nhịp thật của họ — chỉ được dùng như nhãn phong cách
  khái quát theo đúng quy định `knowledge/styles/` (xem `meta/standards.md`); **không** trích hoặc dựng lại
  hook có bản quyền, kể cả khi nói là "lấy cảm hứng".
- `music_quality_gate` phải đánh giá `hook_distinctiveness` + `melodic_coherence` (xem
  [musical-quality-gate](musical-quality-gate.md)).

## Hints — quy trình invent catchy (nội bộ, không file riêng)

1. **Đọc lời theo nhịp nói** → đánh dấu từ mang nghĩa / stress.
2. **Invent rhythm cell trước (hoặc đồng thời với pitch)** cho hook — thử vài pattern có rest hoặc syncop nhẹ;
   rhythm cell dễ "gõ theo" thường quan trọng hơn exact pitch.
3. **Giới hạn pitch tạm thời** (3–6 nốt) → tìm contour rõ (arch / climb / leap-step).
4. **Hát thầm cell** vài lần liên tiếp, không nhìn lời: có tự "ngân nga" lại được contour không? Nếu không →
   đổi, theo Hook economy ở trên — không patch vài nốt.
5. **Khoá hook cell** vào notes (`hook_melody_cell`) cùng vị trí xuất hiện trong câu.
6. **Xây Verse/Pre từ motif liên quan nhưng khác** (contour hoặc mật độ khác) để tạo tương phản trước hook;
   Bridge đổi không gian (hướng, quãng, màu hoà âm).
7. **Lặp có chủ đích:** A → A → A' (đổi ending / sequence) ở Chorus; Final dùng ≥1 kỹ thuật từ
   [motif-development](motif-development.md).
8. **Speak/sing-test toàn bài** trước khi xuất XML: chỗ đều đều / rời rạc / không dính → viết lại đoạn đó.

Khi muốn "học từ những bài catchy": dùng **đặc điểm khái quát** (hook ngắn, lặp có biến đổi, rhythm đặc
trưng, quãng hẹp, vị trí lyric-hook lặp đúng chỗ) làm checklist — **không** dùng bài cụ thể làm khuôn nốt.
Nếu có quyền truy cập web trong phiên làm việc, có thể đọc thêm phân tích songwriting craft (không phải bản
nhạc/lời gốc) để cập nhật hiểu biết — ghi URL cụ thể vào `sources` nếu dùng, theo `meta/standards.md`. Không
bắt buộc phải có mạng mới invent được — checklist trên đã đủ để tự chấm.

## Ví dụ ngắn (tự viết, chỉ minh hoạ khái niệm)

Hook cell minh hoạ: một câu 2 ô nhịp, contour đi lên rồi đáp xuống một nốt ổn định, rhythm có một nốt nhấn
ngay đầu phách mạnh — lần lặp thứ hai giữ rhythm, đổi nốt kết để dẫn sang câu tiếp theo thay vì lặp y hệt.
**Không** dùng làm giai điệu thật của bài đang sáng tác.

## Cách áp dụng với MusicXML + notes

1. Trước khi viết Chorus: xác định `hook_melody_cell` (pitch + rhythm ngắn) và vị trí hook trong câu.
2. Verse/Pre-Chorus: cố ý giữ mật độ/contour khác hook để tạo tương phản.
3. Khi viết Chorus Final: chọn ≥1 kỹ thuật phát triển từ `motif-development.md`, ghi rõ kỹ thuật nào trong
   `music_quality_gate.evidence`.
4. Ghi `hook_melody_cell` + `motifs_declared` + evidence catchiness ngắn trong `03-composition-notes.md`.
5. Gate: `REQUIRE_CATCHY_HOOK` (xem [musical-quality-gate](musical-quality-gate.md)). FAIL → invent lại
   cell/motif, xuất lại cả lead sheet — không patch nốt lẻ.

## Related

- `KNOW.MELODY.INVENTION`
- `KNOW.MELODY.ANTI-PATTERNS`
- `KNOW.MELODY.QUALITY-GATE`
- `KNOW.MELODY.CONTOUR`
- `KNOW.MELODY.MOTIF-DEVELOPMENT`
- `KNOW.MELODY.PHRASE-STRUCTURE`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`
- `PIPE.STEP-03`
