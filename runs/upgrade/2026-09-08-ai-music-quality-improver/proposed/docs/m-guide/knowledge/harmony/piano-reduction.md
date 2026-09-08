---
id: KNOW.HARMONY.PIANO-REDUCTION
type: knowledge
status: active
version: "1.2-proposed"
tags: [compose, arrange, harmony]
serves-steps: [3, 4]
sources:
  - "docs/m-guide/knowledge/melody/musical-quality-gate.md"
last-updated: "2026-09-08"
needs-approval: true
---

# Lead-sheet piano vs arranged piano

> **AI:** Đọc ở Bước 3 khi viết part Piano / harmony reduction, và ở Bước 4 khi quyết định giữ hay viết lại texture piano. Không biến Bước 3 thành full production.

## Dùng ở bước nào

- **Bước 3:** piano = hòa âm nghe được (lead-sheet reduction), chưa orchestration đầy đủ. Gate **FAIL** nếu pad-only trên sung sections (`REQUIRE_PIANO_TEXTURE`).
- **Bước 4:** được viết lại **texture/voicing/rhythm** của piano; **không** đổi lyric, lead melody, chord symbols / progression (trừ user giao quyền). Step4 **chưa done** nếu copy nguyên P2 pad.

## Constraints

- Lead sheet phải có hòa âm đủ để hát kèm: `<harmony>` và/hoặc part Piano pitched.
- **Cấm** toàn bài chỉ whole-note block-chord trên Piano khi Piano là lớp hòa âm pitched chính.
- Phần **có lời / sung sections**: harmonic rhythm tối thiểu **half-note** (2 nốt/ô 4/4) **hoặc** broken-chord / simple comp / Alberti / arpeggio pulse tương đương.
- Whole-note pad chỉ chấp nhận cho **intro / outro / breakdown** ngắn, và phải ghi trong `03-composition-notes.md` (`piano_texture` + tradeoff).
- Nếu Bước 3 vẫn để pad sparse: Bước 4 **bắt buộc** viết lại texture theo section energy hoặc thêm pitched layer đảm nhiệm groove.
- **Không self-report:** `piano_texture` chỉ là mô tả; XML audit là source of truth.

## Heuristic tự kiểm (Bước 3 + 4)

Trên part Piano (hoặc lớp pitched hòa âm chính), với **mỗi measure sung**:

1. Đếm event onset (nốt không phải `<chord/>` phụ của cùng onset).
2. Phân loại texture: `pad | pulse | broken_chord | comping | arpeggio | mixed | rest`.
3. Kiểm tra `duration_pattern` + pitch motion để phân biệt “có 4 note” với “4 note thực sự tạo pattern”.
4. Nếu hầu hết measure chỉ **1 onset = whole** → pad measure.
5. Sung sections mà **≥70% measure là pad** → `sung_sections_ok: false` / `piano_accompaniment: fail`.
6. Notes khai “arpeggio/comping” nhưng artifact cho thấy pad → artifact audit = FAIL.

## Step 4 lock rule

Step 4 khóa **progression**, không khóa texture. Nếu P2 input là pad, arrangement AI phải rewrite texture hoặc thêm pitched groove layer.

## Hints

| Style / cảm giác | Hướng texture piano (gợi ý) |
|------------------|-----------------------------|
| V-Pop uptempo | Quarter / syncopated stabs; chorus dày hơn verse |
| Ballad | Broken chord / half-note pulse; chorus có thể dày hơn |
| Acoustic / indie | Arpeggio hoặc simple strum-like figures |
| Jazz-pop nhẹ | Comping thưa, voicing 3–4 nốt, để chỗ cho bass |

Hai lớp trong một part (pad + figuration) được phép nếu MusicXML voice/layer rõ và không phá Flat import.
