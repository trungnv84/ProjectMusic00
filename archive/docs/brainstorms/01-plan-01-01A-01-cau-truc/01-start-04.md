# Cấu Trúc Hoàn Chỉnh — `music-language`

Bản này kế thừa toàn bộ cấu trúc bạn đã chốt (ontology trung tâm, constraints/hints tách biệt,
profiles ở root, tests, index auto-generate) và bổ sung 6 điểm để tăng khả năng vận hành,
mở rộng và tránh xung đột nội dung khi hệ thống lớn dần.

## Những gì được bổ sung so với bản trước

| # | Bổ sung | Lý do |
|---|---------|-------|
| 1 | Quy tắc phân định `ontology/` vs `knowledge/` trong `conventions.md` | Tránh hai team viết trùng nội dung (VD: "scale" xuất hiện ở cả hai nơi) |
| 2 | Trường `priority` trong frontmatter của `rules/` | Xử lý khi 2 constraint/hint xung đột nhau |
| 3 | Trường `extends` trong frontmatter của `profiles/` | Cho phép profile kế thừa, tránh copy-paste |
| 4 | Thư mục `tools/` ở root | Chứa script build-index, validate, lint frontmatter |
| 5 | Thư mục `corpus/` ở root | Kho bài hát hoàn chỉnh đã annotate — dùng làm ví dụ tham chiếu (khác mục đích với `tests/`) |
| 6 | Ghi chú phân biệt `profiles/` vs `contexts/` trong `conventions.md` | Profile = sinh cái gì, Context = làm việc thế nào |

---

## Cây Thư Mục Đầy Đủ

```text
music-language/
│
├── meta/                                    # Quản lý thư viện
│   ├── README.md
│   ├── changelog.md
│   ├── contributors.md
│   ├── versioning.md
│   ├── license.md
│   └── conventions.md                       # Quy ước đặt tên, ID, frontmatter,
│                                             # + quy tắc phân định ontology/knowledge,
│                                             # + quy tắc phân định profiles/contexts
│
├── ontology/                                # Bản thể luận — CHỈ định nghĩa class & quan hệ
│   ├── core-ontology.md                     # Không chứa prose giải thích sâu (để ở knowledge/)
│   ├── core-ontology.ttl                    # RDF/Turtle (hoặc OWL)
│   ├── relations.md                         # contains, derives-from, conflicts-with...
│   ├── melody-ontology.md
│   ├── harmony-ontology.md
│   ├── rhythm-ontology.md
│   ├── form-ontology.md
│   └── mapping.md                           # Ánh xạ ID knowledge ↔ ontology
│
├── knowledge/                               # Tri thức mô tả (WHAT) — nội dung diễn giải
│   ├── core/
│   │   ├── pitch.md
│   │   ├── interval.md
│   │   ├── scale.md
│   │   ├── mode.md
│   │   ├── chord.md
│   │   └── ...
│   ├── melody/
│   ├── harmony/
│   ├── rhythm/
│   ├── form/
│   ├── lyrics/
│   ├── arrangement/
│   ├── vocal/
│   ├── instrument/
│   ├── genre/
│   └── language/                            # Vietnamese, English...
│
├── rules/                                   # Ràng buộc (CONSTRAINTS + HINTS)
│   ├── constraints/                         # Quy tắc cứng — có trường `priority`
│   │   ├── core/
│   │   ├── melody/
│   │   ├── harmony/
│   │   ├── rhythm/
│   │   └── ...
│   └── generation-hints/                    # Gợi ý mềm — có trường `priority` (thấp hơn constraints)
│       ├── melody/
│       ├── harmony/
│       └── ...
│
├── patterns/                                # Mẫu sẵn có (Building blocks)
│   ├── abstract/                            # I-IV-V, arch-phrase...
│   └── genre-specific/                      # pop, rock, ballad...
│
├── profiles/                                # Preset tổng hợp cho AI — hỗ trợ kế thừa (`extends`)
│   ├── pop-ballad-vn.md
│   ├── rock-anthem.md
│   ├── rock-ballad.md                       # VD: extends: [rock-anthem]
│   └── jazz-standard.md
│
├── contexts/                                # Ngữ cảnh sử dụng (Workflow — "làm việc thế nào")
│   ├── writing-vietnamese-ballad.md
│   ├── creating-pop-hook.md
│   ├── arranging-piano-ballad.md
│   └── generating-melody-from-lyrics.md
│
├── music-dsl/                               # Ngôn ngữ biểu diễn tác phẩm
│   ├── specification/
│   ├── vocabulary/
│   ├── syntax/
│   ├── types/
│   ├── structures/
│   ├── semantics/
│   ├── schemas/
│   └── examples/
│
├── corpus/                                  # [MỚI] Kho bài hát hoàn chỉnh, đã annotate
│   ├── vietnamese-ballad/
│   │   └── song-01.music + song-01.annotation.md
│   ├── pop/
│   └── rock/
│                                             # Mục đích: ví dụ tham chiếu / few-shot cho AI,
│                                             # KHÔNG dùng để validate constraint (đó là việc của tests/)
│
├── tests/                                   # Ca kiểm thử (Validation Corpus)
│   ├── valid/
│   │   ├── correct-voice-leading.music
│   │   └── valid-song-structure.music
│   └── invalid/
│       ├── broken-parallel-fifths.music
│       └── mismatched-meter.music
│
├── tools/                                   # [MỚI] Script tự động hoá
│   ├── build-index.py                       # Sinh ra toàn bộ file trong index/
│   ├── validate-frontmatter.py              # Kiểm tra ID, dependencies có tồn tại không
│   ├── check-conflicts.py                   # Phát hiện rule xung đột theo priority
│   └── README.md
│
└── index/                                   # Auto-generated — KHÔNG sửa tay
    ├── concepts-index.md
    ├── rules-index.md
    ├── patterns-index.md
    ├── profiles-index.md
    └── cross-references.md
```

---

## Frontmatter Cập Nhật

### Cho `knowledge/`, `ontology/`, `patterns/`
```yaml
---
id: KNOW.CORE.SCALE
type: knowledge | rule | pattern | ontology | context | profile | dsl
name: Musical Scale
version: 1.0.0
domain: core
status: stable | experimental | deprecated
tags: [scale, pitch, interval]
dependencies: [KNOW.CORE.PITCH, KNOW.CORE.INTERVAL]
references: [ONTO.SCALE]
related: [KNOW.CORE.MODE, KNOW.HARMONY.CHORD]
source:
last-updated: 2026-08-25
---
```

### Cho `rules/constraints/` và `rules/generation-hints/` (mới: `priority`)
```yaml
---
id: RULE.HARMONY.NO-PARALLEL-FIFTHS
type: rule
category: constraint      # constraint | hint
priority: 90              # 0-100, cao hơn thắng khi xung đột. Constraints mặc định > hints
domain: harmony
dependencies: [KNOW.CORE.CHORD]
conflicts-with: []        # ID các rule khác có thể mâu thuẫn, để tools/check-conflicts.py dò
status: stable
last-updated: 2026-08-25
---
```

### Cho `profiles/` (mới: `extends`)
```yaml
---
id: PROFILE.ROCK-BALLAD
type: profile
extends: [PROFILE.ROCK-ANTHEM]   # kế thừa toàn bộ, override phần nào ghi đè bên dưới
knowledge: [...]
rules: [...]
patterns: [...]
overrides:
  - rule: RULE.RHYTHM.TEMPO-RANGE
    value: "60-80bpm"             # ghi đè giá trị so với profile cha
last-updated: 2026-08-25
---
```

---

## Quy Tắc Phân Định (nên đưa vào `meta/conventions.md`)

**`ontology/` vs `knowledge/`**
- `ontology/`: chỉ định nghĩa class, thuộc tính, và quan hệ hình thức (is-a, contains, derives-from). Không có đoạn văn giải thích dài, không có ví dụ minh hoạ.
- `knowledge/`: nội dung mô tả, giải thích, ví dụ. Mỗi file `knowledge/` nên có `references:` trỏ tới entry tương ứng trong `ontology/`.

**`profiles/` vs `contexts/`**
- `profile` trả lời: *"Sinh ra nhạc dạng gì?"* (tham số: knowledge nào, rule nào, pattern nào).
- `context` trả lời: *"AI nên làm việc theo quy trình nào?"* (VD: hỏi user trước khi viết, thứ tự viết lời trước hay giai điệu trước).
- Một context có thể tham chiếu tới nhiều profile khác nhau; một profile có thể được dùng trong nhiều context.

**`corpus/` vs `tests/`**
- `corpus/`: ví dụ hay, dùng để AI học "giọng điệu" — không cần gắn với rule cụ thể.
- `tests/`: ví dụ cố ý đúng/sai một rule cụ thể, dùng để kiểm chứng logic — luôn gắn ID rule bị vi phạm (`invalid/`) hoặc tuân thủ (`valid/`).

---

## Bước Tiếp Theo Gợi Ý

1. Viết `meta/conventions.md` trước tiên — vì mọi file khác phụ thuộc vào quy ước này.
2. Dựng khung `ontology/core-ontology.md` + `knowledge/core/` cho 5-6 khái niệm nền tảng (pitch, interval, scale, chord, mode) để test toàn bộ pipeline ID/dependency trước khi mở rộng ra các domain khác.
3. Viết `tools/validate-frontmatter.py` sớm — chạy nó mỗi khi thêm file mới để bắt lỗi ID/dependency ngay từ đầu, tránh nợ kỹ thuật khi thư viện lớn.