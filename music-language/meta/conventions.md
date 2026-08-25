# Music Language Repository Conventions / Quy ước Repository Music Language

> Defines how `music-language` is organized, named, referenced, versioned, and maintained.
>
> Quy định cách `music-language` được tổ chức, đặt tên, tham chiếu, versioning và duy trì.
>
> All contributors, tools, and AI agents must follow these conventions.
>
> Mọi contributor, tool và AI agent phải tuân thủ các quy ước này.

---

## 1. Layer Responsibilities & Content Boundary / Trách nhiệm từng Layer & Ranh giới Nội dung

*(Gộp §2.1–2.9, §3, §5, §6, §22, §25 của bản gốc — một bảng thay cho năm chỗ lặp lại.)*

Mọi artifact mới phải được đặt vào **đúng một** layer dưới đây. Nếu một khái niệm có vẻ thuộc nhiều layer (VD: "scale"), mỗi layer chỉ giữ phần thuộc về mình — không định nghĩa trùng.

| Layer | Trả lời câu hỏi (EN) | Trả lời câu hỏi (VI) | Chứa (EN) | Chứa (VI) | Không chứa |
|---|---|---|---|---|---|
| `ontology/` | What formally exists? | Cái gì tồn tại (hình thức)? | classes, properties, relations, domain/range, IDs | class, property, relation, domain/range, ID | giải thích dài, tutorial, rule, workflow |
| `knowledge/` | What do we know about it? | Hệ thống biết gì về nó? | definitions, explanations, examples, terminology | định nghĩa, giải thích, ví dụ, thuật ngữ | không được biến thành rule engine |
| `rules/` | What must/should happen? | Phải/nên làm gì? | `constraints` (bắt buộc), `generation-hints` (khuyến nghị) | như bên | — |
| `patterns/` | What reusable structure exists? | Cấu trúc nào có thể tái dùng? | building blocks âm nhạc | như bên | không phải rule bắt buộc |
| `profiles/` | What should be generated? | Sinh ra loại nhạc gì? | tổ hợp knowledge + rules + patterns + params + overrides | như bên | workflow (đó là việc của context) |
| `contexts/` | How should the system work? | Hệ thống làm việc thế nào? | workflow, thứ tự xử lý, tương tác, validation | như bên | thể loại âm nhạc (đó là việc của profile) |
| `music-dsl/` | How is a work represented? | Tác phẩm được biểu diễn ra sao? | syntax, types, structures, semantics, schemas, examples | như bên | — |
| `corpus/` | What does real music look like? | Nhạc thực tế/đại diện trông ra sao? | tác phẩm hoàn chỉnh, đã annotate — dùng cho reference/few-shot | như bên | **không** phải oracle để pass/fail rule |
| `tests/` | Does the system behave correctly? | Hệ thống có hoạt động đúng không? | ca kiểm thử deterministic, có expected result | như bên | ví dụ hay tuỳ ý (đó là corpus) |
| `index/` | (generated, không phải nguồn nội dung) | | auto-generated từ các layer trên | | không sửa tay |

**Quy tắc bổ sung:**
- `ontology/*.ttl` là **source of truth**; file `.md` trong `ontology/` chỉ là tài liệu cho người đọc — nếu lệch nhau, `.ttl` thắng và `.md` phải sửa theo.
- Thứ tự ưu tiên khi hai artifact chồng lấn: **Ontology → Knowledge → Rules → Patterns → Profiles → Contexts**. Ưu tiên reference/override tường minh hơn là suy đoán ngầm định. Xung đột không tự resolve được phải được **báo lỗi**, không được âm thầm bỏ qua.

---

## 2. Naming & Stable ID / Đặt tên & ID Ổn định

*(Gộp §7, §8)*

- File/thư mục: `lowercase-kebab-case` (VD: `vietnamese-ballad`, `no-parallel-fifths`). Không dùng CamelCase, PascalCase, snake_case, UPPERCASE.
- Mọi artifact có ID duy nhất toàn repo, format `TYPE.DOMAIN.NAME`:
  ```text
  ONTO.SCALE
  KNOW.CORE.SCALE
  RULE.HARMONY.NO-PARALLEL-FIFTHS
  PATTERN.HARMONY.I-IV-V
  PROFILE.ROCK-BALLAD
  CONTEXT.GENERATING-MELODY-FROM-LYRICS
  ```
- ID phải ổn định; **filename được phép đổi, ID thì không**. ID đã deprecated không tái sử dụng.

---

## 3. Frontmatter & Reference Semantics / Frontmatter & Ý nghĩa Tham chiếu

*(Gộp §9, §10)*

Frontmatter YAML, field dùng `kebab-case`:

```yaml
id:             # bắt buộc
type:           # bắt buộc
version:        # bắt buộc
status:         # bắt buộc
last-updated:   # bắt buộc
domain:
tags:
dependencies:
references:
related:
conflicts-with:
extends:
priority:
```

| Field | Ý nghĩa (EN) | Ý nghĩa (VI) |
|---|---|---|
| `dependencies` | Required to operate/interpret correctly | Bắt buộc phải có để hiểu/hoạt động đúng |
| `references` | Points to a concept/source; not auto a runtime dependency | Trỏ tới concept/nguồn; không mặc định là dependency |
| `related` | Useful but not required association | Liên quan hữu ích, không bắt buộc |
| `conflicts-with` | Explicitly flags incompatible rules | Đánh dấu rõ các rule có thể không tương thích |

---

## 4. Rule Category & Priority / Phân loại & Độ ưu tiên Rule

*(Gộp §11, §12)*

- Hai nhóm: `constraints` (bắt buộc) và `generation-hints` (khuyến nghị). **Hint không bao giờ được ngầm override constraint.**
- `priority`: số 0–100, cao hơn = ưu tiên hơn, **chỉ so sánh trong cùng một nhóm**.
- Thứ tự xử lý toàn cục:
  ```text
  Hard Constraint > Explicit Override > Soft Constraint > Generation Hint
  ```
- Hai rule cùng nhóm, cùng priority, xung đột nhau → phải báo là **unresolved conflict**, không tự chọn một bên.

---

## 5. Profile Inheritance & Override / Kế thừa & Override của Profile

*(Gộp §13, §14)*

```yaml
extends:
  - PROFILE.PARENT
overrides:
  - rule: RULE.RHYTHM.TEMPO-RANGE
    value: "60-80bpm"
```

- Inheritance phải **acyclic** (không vòng lặp) và resolve được.
- Con giữ nguyên hành vi của cha trừ khi có override tường minh.
- Override phải khai báo rõ ràng — **không** được override ngầm qua việc bỏ sót, trùng lặp, hay khai báo mâu thuẫn.

---

## 6. Versioning & Status / Version & Trạng thái

*(Gộp §15, §16, §17)*

- Semantic Versioning `MAJOR.MINOR.PATCH`: MAJOR = breaking change; MINOR = thêm tương thích ngược; PATCH = sửa lỗi không đổi ý nghĩa.
- Status: `experimental | stable | deprecated`.
- `deprecated`: vẫn giữ để nhận diện/resolve reference, nhưng không dùng cho nội dung mới. **Chỉ xóa** khi không còn reference hợp lệ phụ thuộc và policy cho phép.

---

## 7. Tests & Index / Kiểm thử & Index

*(Gộp §18, §19)*

- Mỗi test case cần: `input`, `expected result`, `rule/specification liên quan`.
  - Invalid test → nêu rõ rule dự kiến bị vi phạm.
  - Valid test → nêu rõ rule/spec mà test chứng minh.
- `index/` là dữ liệu **auto-generated** — không sửa tay; sửa ở source artifact rồi regenerate.

---

## 8. Tool Validation / Kiểm tra bằng Tool

Tool của repo phải kiểm tra tối thiểu: `frontmatter, IDs, references, dependencies, ontology, profile inheritance, rule conflicts, tests, index consistency`. Thay đổi chưa qua được validation bắt buộc thì coi như **chưa hoàn tất**.

---

## 9. AI Agent Convention / Quy ước cho AI Agent

AI agent làm việc với repo phải:
1. Resolve profile và context liên quan trước khi generate (khi áp dụng được).
2. Dùng reference từ `index/` để tìm knowledge/rules liên quan.
3. Không tự tạo ID không tồn tại.
4. Không tự bỏ qua reference chưa resolve được.
5. Không tự biến ví dụ (corpus) thành rule nếu chưa có rule định nghĩa rõ ràng.
6. Giữ nguyên ID artifact khi chỉnh sửa.

---

## 10. Minimal Change Principle / Nguyên tắc Thay đổi Tối thiểu

Khi sửa repo: chỉ đổi artifact cần thiết; giữ ID hiện có nếu được; không tự tổ chức lại thư mục không liên quan; không tạo nội dung trùng; **không thêm convention mới mà không cập nhật tài liệu này**.

---

## 11. Canonical Checklist / Checklist Cốt lõi

*(Rút gọn §26 — chỉ còn checklist, không lặp lại prose.)*

- [ ] Mọi artifact có ID duy nhất, ổn định
- [ ] Mọi reference resolve được
- [ ] Ontology chỉ có một `.ttl` source of truth
- [ ] Knowledge và ontology không trùng quyền sở hữu semantic
- [ ] Hint không ngầm override hard constraint
- [ ] Profile inheritance acyclic
- [ ] Override luôn tường minh
- [ ] Corpus là reference, không phải rule oracle
- [ ] Test luôn có expected result
- [ ] `index/` không sửa tay
- [ ] ID deprecated không tái sử dụng
- [ ] Convention mới → cập nhật tài liệu này