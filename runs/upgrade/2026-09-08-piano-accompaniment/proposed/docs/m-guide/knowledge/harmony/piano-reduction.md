---
id: KNOW.HARMONY.PIANO-REDUCTION
type: knowledge
status: active
version: "1.0"
tags: [compose, arrange, harmony]
serves-steps: [3, 4]
sources: []
last-updated: "2026-09-08"
---

# Lead-sheet piano vs arranged piano

> **AI:** Đọc ở Bước 3 khi viết part Piano / harmony reduction, và ở Bước 4 khi quyết định giữ hay viết lại texture piano. Không biến Bước 3 thành full production.

## Dùng ở bước nào

- **Bước 3:** piano = hòa âm nghe được (lead-sheet reduction), chưa orchestration đầy đủ.
- **Bước 4:** được viết lại **texture/voicing/rhythm** của piano; **không** đổi lyric, lead melody, chord symbols / progression (trừ user giao quyền).

## Constraints

- Lead sheet phải có hòa âm đủ để hát kèm: `<harmony>` và/hoặc part Piano pitched.
- **Cấm** toàn bài chỉ whole-note block-chord trên Piano khi Piano là lớp hòa âm pitched chính (nghe như pad “có nhịp không có nhạc”).
- Phần **có lời / sung sections**: harmonic rhythm tối thiểu **half-note** (2 nốt/ô 4/4) **hoặc** broken-chord / simple comp / Alberti / arpeggio pulse tương đương.
- Whole-note pad chỉ chấp nhận cho **intro / outro / breakdown** ngắn, và phải ghi trong `03-composition-notes.md` (`piano_texture` + tradeoff).
- Nếu Bước 3 vẫn để pad sparse: Bước 4 **bắt buộc** (a) viết lại piano texture theo section energy, **hoặc** (b) thêm lớp pitched khác đảm nhiệm groove hòa âm và ghi rõ trong `04-arrangement-notes.md`. Không được khóa nguyên P2 pad rồi coi xong.

## Hints

| Style / cảm giác | Hướng texture piano (gợi ý) |
|------------------|-----------------------------|
| V-Pop uptempo | Quarter / syncopated stabs; chorus dày hơn verse; không pad whole-note suốt |
| Ballad | Broken chord / half-note pulse; chorus có thể dày hơn; intro pad OK |
| Acoustic / indie | Arpeggio hoặc simple strum-like figures trên piano/keys |
| Jazz-pop nhẹ | Comping thưa, voicing 3–4 nốt, để chỗ cho bass |

- Hai lớp trong một part (pad + figuration) được phép nếu MusicXML voice/layer rõ và không phá Flat import.
- Bước 3 vẫn **không** dựng drums/bass/synth đầy đủ — chỉ siết chất lượng reduction.

## Anti-patterns

| ID | Fail | Sửa |
|----|------|-----|
| P1 | Whole-note triad mỗi measure suốt bài | Thêm pulse ≥ half-note ở sung sections, hoặc broken/comp |
| P2 | Bước 4 “lock P2 không đổi” trong khi P2 chỉ là pad | Tách lock: khóa progression, cho phép rewrite texture |
| P3 | Pad piano + drums rest + không lớp pitched hòa âm khác | Viết lại piano **hoặc** thêm guitar/synth/bass motion rõ |

## Cách áp dụng

1. Bước 3: chọn pattern reduction theo style; ghi `piano_texture` trong notes.
2. Bước 4: nếu P2 = pad-only → rewrite texture theo section energy **hoặc** bù bằng pitched groove layer + ghi notes.
3. Giữ chord symbols / progression đã khóa; đổi voicing/inversion/rhythm được.

## Related

- `KNOW.HARMONY.BASICS`
- `KNOW.ARR.SECTION-ENERGY`
- `PIPE.STEP-03` / `PIPE.STEP-04`
