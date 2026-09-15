---
id: PIPE.STEP-03
type: pipeline
status: proposed
needs-approval: true
version: "1.5"
tags: [pipeline, compose]
serves-steps: [3]
sources:
  - "https://doi.org/10.1525/mp.2024.2322897"
  - "https://pubmed.ncbi.nlm.nih.gov/36991289/"
  - "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.906190/full"
last-updated: "2026-09-14"
---
# Bước 3 — Sáng tác → MusicXML (lead sheet)

## Thay đổi chính

Khi request có mục tiêu `catchy/memorable`, Bước 3 không còn được hiểu là “invent một melody rồi tự chấm”. Phải có **multi-composer candidate loop** trước khi khóa lead sheet.

## Quy trình đề xuất

1. Parse input + fetch DOC_REFS.
2. **Reference reconnaissance:** chọn 3–5 bài catchy phù hợp; phân tích abstract features only. Không copy melody/lyric/riff.
3. **Composer A:** invent candidate set tập trung hook identity.
4. **Composer B:** invent candidate set độc lập tập trung pop-song phrase/payoff.
5. **Composer C:** invent candidate set độc lập tập trung rhythm/contour/singability.
6. **Critic:** đánh giá các candidate sau khi chúng đã được tạo; chấm catchiness dimensions + existing music quality dimensions.
7. Chọn 1 candidate; có thể synthesize một **original** final melody từ các nguyên tắc/features đã phân tích, nhưng không lấy nốt/cell độc bản của reference hoặc candidate khác một cách cơ học.
8. Chạy listener proxy tests.
9. Chỉ sau khi candidate vượt catchiness gate mới xuất MusicXML + composition notes.
10. Structural MusicXML checks + existing piano texture gate vẫn giữ nguyên.

## Composer-role requirements

Không yêu cầu literal “hãy giả làm nghệ sĩ X”. Roles phải mô tả **kỹ năng**, không mô phỏng tác phẩm/nghệ sĩ cụ thể:

- Hook Composer
- Pop Songwriter
- Rhythm/Topline Specialist
- Critical Listener / A&R Editor

## Mandatory evidence in notes

`03-composition-notes.md` phải ghi:
- reference-song labels + abstract feature analysis;
- candidate A/B/C summaries;
- catchiness scores + evidence;
- selected candidate + selection rationale;
- listener proxy results;
- final `catchiness_gate`.

## Failure behavior

Nếu catchiness gate FAIL:
- không patch vài nốt;
- không chỉ đổi register;
- quay lại candidate generation / hook invention;
- giữ nguyên requirement về lyric/prosody/Vietnamese tone/musicxml.

## Non-catchy requests

Nếu user không yêu cầu catchy/memorable, multi-candidate loop có thể là hint thay vì hard requirement. Tuy nhiên `REQUIRE_CATCHINESS_REVIEW` được kích hoạt khi prompt/user dùng mục tiêu tương đương catchy.

## Không thay đổi

- Không tạo `03a-composition-plan.md`.
- Vẫn xuất `03-song.musicxml` + `03-composition-notes.md`.
- Vẫn không full arrangement.
- Vẫn giữ `REQUIRE_PIANO_TEXTURE`.
