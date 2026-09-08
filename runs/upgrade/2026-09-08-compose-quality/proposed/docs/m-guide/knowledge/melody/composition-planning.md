---
id: KNOW.MELODY.COMPOSITION-PLANNING
type: knowledge
status: active
version: "1.0"
tags: [compose, melody, lyrics]
serves-steps: [3]
sources:
  - "https://songwritingauthority.com/melody-writing-techniques/"
  - "docs/m-guide/knowledge/lyrics/lyric-melody-fit.md"
last-updated: "2026-09-08"
needs-approval: true
---

# Lập kế hoạch sáng tác trước MusicXML (pha 3a)

> **AI:** **Cấm** viết `03-song.musicxml` trước khi có `03a-composition-plan.md` đạt tối thiểu dưới đây (trừ khi user bảo chạy liên tục *sau* khi plan đã tự hoàn tất trong cùng lượt).

## Dùng ở bước nào

- Bước 3 pha 3a — trước lyric fill chi tiết và trước XML.

## Constraints

Thứ tự bắt buộc:

1. **Hook melody cell** (pitch + rhythm) — memorable trước khi lặp Chorus.
2. **Motif Verse / Pre / Bridge** — cells khác nhau đủ để contrast.
3. **Lyric rhythm map** — từ khóa / trọng âm ngữ nghĩa → beat mạnh; điểm ngân; chỗ thở (xem lyric-melody-fit).
4. **Rhythmic skeleton trên bar** — đặt âm tiết vào nhịp **trước** khi khóa toàn bộ pitch.
5. **Pitch** — theo contour cảm xúc + VN tone **transitions** (không ±1 độc lập).
6. **Section development** — Verse2 biến thể; Bridge contrast; Final ≥1 kỹ thuật phát triển.
7. Mới xuất MusicXML + notes + quality gate.

Plan phải khai báo: `motifs_declared`, `hook_melody_cell`, `section_contrast_map`, `harmonic_plan`, `lyric_prosody_map`.

## Hints

- “Chorus = lặp để tạo hook” sai nếu chưa có hook đáng nhớ.
- Register change ≠ musical development.
- Nói lời theo nhịp skeleton trước khi chọn nốt.

## Cách áp dụng

1. Điền template `artifacts/composition-plan.template.md`.
2. Dừng để user duyệt nếu user yêu cầu dừng sau 3a.
3. Chỉ khi plan khóa → pha 3b.

## Related

- `PIPE.STEP-03`
- `KNOW.MELODY.MOTIF-DEVELOPMENT`
- `KNOW.MELODY.ANTI-PATTERNS`
- `KNOW.LYRICS.LYRIC-MELODY-FIT`
