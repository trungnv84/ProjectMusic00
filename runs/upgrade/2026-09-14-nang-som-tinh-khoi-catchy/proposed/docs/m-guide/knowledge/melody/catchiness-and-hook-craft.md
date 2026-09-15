---
id: KNOW.MELODY.CATCHINESS
type: knowledge
status: draft
version: "1.0"
tags: [compose, melody]
serves-steps: [3]
sources:
  - "docs/m-guide/knowledge/melody/melody-invention.md"   # đã cite songwritingauthority.com — dùng lại, không thêm URL mới chưa kiểm chứng
  - "runs/compose/2026-09-08-nang-som-tinh-khoi/"          # bằng chứng: verse skeleton clone + chorus final copy y nguyên
  - "runs/upgrade/2026-09-14-nang-som-tinh-khoi-catchy/run-review.md"
last-updated: "2026-09-14"
---

# Giai điệu catchy — cơ chế, không phải danh sách cấm

> **AI:** Đọc ở Bước 3, **trước khi** invent hook, cùng lúc với
> [melody-invention](melody-invention.md). Trang này bổ sung tiêu chí **tích cực** (cái gì làm giai điệu
> đáng nhớ) — khác với [anti-patterns](anti-patterns.md) vốn chỉ liệt kê cái **cấm**. Đây là kiến thức
> khái quát về cách nhạc phổ thông tạo cảm giác "dính tai" (earworm), **không** phải bản mẫu nốt nhạc —
> **cấm tuyệt đối** biến ví dụ minh hoạ dưới đây thành skeleton thật của bài.

## Dùng ở bước nào

- Bước 3 — ngay khi bắt đầu invent hook Chorus, trước khi viết note đầu tiên.

## Vì sao cần trang này

`anti-patterns.md` trả lời "làm gì thì FAIL". Trang này trả lời câu user hay hỏi: *"một bài hát cần gì để
catchy?"* — tức AI phải chủ động vận dụng hiểu biết chung (không gắn vào một bài cụ thể có bản quyền) về cơ
chế ghi nhớ âm nhạc, rồi tự áp dụng vào bài đang viết, thay vì chỉ né luật cấm.

## Constraints

- **Hook economy:** hook Chorus phải rút gọn được thành một pitch-cell + rhythm-cell **ngắn** (thường 2-5 nốt,
  1-2 ô nhịp) — mô tả được bằng một câu, không phải cả câu nhạc dài phức tạp. Ghi cell này vào
  `hook_melody_cell` trong composition notes (bắt buộc theo quality-gate).
- **Repetition-with-variation, không repetition-thuần:** hook được phép lặp trong Chorus, nhưng mỗi lần
  lặp lại phải có **ít nhất một** biến đổi nhỏ nghe được (đổi 1 nốt cuối câu, đổi harmony bên dưới, đổi cách
  ngắt hơi/nhịp lyric) — lặp y hệt 100% quá 2 lần liên tiếp không tính là hook, tính là anti-pattern #1/#2.
- **Chorus Final không được là bản copy thuần của Chorus 1**: phải áp dụng ≥1 kỹ thuật phát triển cụ thể
  (xem [motif-development](motif-development.md): sequence, fragmentation, đổi cadence, thêm/bớt syncopation,
  mở rộng contour) — trùng khớp trực tiếp với `REQUIRE_FINAL_CHORUS_DEVELOPMENT` trong quality-gate.
- **Rhythmic hook đi cùng pitch hook:** phần lớn giai điệu dễ nhớ dựa vào **nhịp điệu đặc trưng** (placement
  của nốt so với phách mạnh/yếu) nhiều ngang bằng với cao độ — khi invent, cố định rhythm cell của hook trước
  khi tinh chỉnh pitch, không chỉ nghĩ theo thang âm.
- **Tầm cữ hát được / dễ ngân nga:** hook nằm trong quãng vừa hát vừa nhớ được khi không có nhạc đệm (thường
  hẹp hơn phần còn lại của bài) — nếu hook trải quá rộng quãng hoặc đổi hướng liên tục, giảm khả năng ghi nhớ.
- **Vị trí hook nhất quán:** hook (cả pitch lẫn lyric hook trùng tên/ý chính bài) nên xuất hiện ở vị trí dễ
  đoán trong câu (mở đầu hoặc kết câu Chorus) — vị trí thay đổi thất thường giữa các lần lặp Chorus làm giảm
  độ "bắt tai".
- **Tương phản trước hook:** Verse/Pre-Chorus phải khác hook về mật độ và/hoặc contour để hook nổi bật khi
  xuất hiện — hook không catchy nếu mọi section đều "phẳng" như nhau (liên hệ trực tiếp
  `MIN_SECTION_CONTRAST`).
- **Cấm dùng tên nghệ sĩ/bài hát cụ thể để chỉ định nốt/nhịp thật của họ** — chỉ được dùng như nhãn phong cách
  khái quát theo đúng quy định `knowledge/styles/` (xem `meta/standards.md`), **không** trích hoặc dựng lại
  hook có bản quyền, kể cả khi nói là "lấy cảm hứng".

## Hints — quy trình tự "tham khảo" catchy-song mà không copy

Khi user hoặc AI muốn "học từ những bài catchy", làm theo **cơ chế**, không theo **nốt cụ thể**:

1. Tự hỏi (không cần công cụ ngoài, không cần chép lại bất kỳ đoạn nhạc nào): những bài nhạc phổ thông người
   nghe nhớ ngay sau 1 lần nghe thường dùng chung đặc điểm nào — hook ngắn, lặp có biến đổi, rhythm đặc trưng,
   quãng hẹp, vị trí lyric-hook lặp đúng chỗ. Dùng các đặc điểm này làm **checklist**, không dùng bài cụ thể
   làm khuôn nốt.
2. Nếu có quyền truy cập web trong phiên làm việc: có thể đọc thêm bài viết/phân tích về songwriting craft
   (không phải bản nhạc/lời gốc) để cập nhật hiểu biết — ghi URL cụ thể vào `sources` nếu dùng, theo
   `meta/standards.md`. Không bắt buộc phải có mạng mới invent được — checklist trên đã đủ để tự chấm.
3. Viết hook riêng của bài theo checklist ở mục Constraints, rồi chạy qua
   [anti-patterns](anti-patterns.md) và bảng điểm [quality-gate](musical-quality-gate.md)
   (`REQUIRE_CATCHINESS_SELFCHECK`) trước khi khoá lead sheet.
4. Hát thầm hook 2-3 lần liên tiếp không nhìn lời: nếu không tự "ngân nga" lại được contour, hook chưa đạt —
   viết lại theo Hook economy ở trên, không patch vài nốt.

## Cách áp dụng

1. Trước khi viết Chorus: xác định `hook_melody_cell` (pitch + rhythm ngắn) và vị trí hook trong câu.
2. Verse/Pre-Chorus: cố ý giữ mật độ/contour khác hook để tạo tương phản (không cần khác 100%, chỉ cần
   nghe phân biệt được).
3. Khi viết Chorus Final: chọn ít nhất một kỹ thuật phát triển từ `motif-development.md`, ghi rõ kỹ thuật
   nào trong `music_quality_gate.evidence`.
4. Điền `REQUIRE_CATCHINESS_SELFCHECK: pass|fail` với evidence ngắn (hook cell là gì, biến đổi gì ở mỗi lần
   lặp, kỹ thuật phát triển nào ở Final) trước khi coi Bước 3 xong.

## Ví dụ ngắn (tự viết, không phải bản mẫu thật)

Hook cell minh hoạ **chỉ để hiểu khái niệm**, không dùng làm giai điệu thật của bài đang sáng tác:
một câu 2 ô nhịp, contour đi lên rồi đáp xuống một nốt ổn định, rhythm có một nốt nhấn ngay đầu phách mạnh —
lần lặp thứ hai giữ rhythm, đổi nốt kết để dẫn sang câu tiếp theo thay vì lặp y hệt.

## Conflicts / related

- `related:` `KNOW.MELODY.INVENTION`, `KNOW.MELODY.ANTI-PATTERNS`, `KNOW.MELODY.QUALITY-GATE`,
  `KNOW.MELODY.MOTIF-DEVELOPMENT`, `KNOW.LYRICS.HOOK-PRECHORUS-BRIDGE`
- Không `conflicts-with` trang nào — bổ sung tiêu chí tích cực, không đổi luật cấm hiện có.
