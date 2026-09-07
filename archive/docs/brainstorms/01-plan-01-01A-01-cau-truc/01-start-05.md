Có. Bản hiện tại đã đủ tốt để làm **repository architecture**, nhưng tôi khuyên chỉnh thêm một số điểm trước khi chốt. Các điểm quan trọng nhất là:

1. **`priority` không nên là cơ chế duy nhất để giải quyết conflict.**
   `constraint` và `hint` khác bản chất; một `hint` không nên chỉ cần đặt `priority: 100` là có thể thắng một `constraint`. Nên có thứ tự: `hard constraint → explicit override → soft constraint/hint`, sau đó mới dùng `priority` trong cùng một lớp.

2. **Cần xác định một nguồn chân lý duy nhất cho `ontology`.**
   Nếu vừa có `core-ontology.md` vừa có `core-ontology.ttl`, về lâu dài rất dễ lệch nhau. Nên quy định `TTL/OWL` là machine-readable source of truth; `MD` là human-readable projection/documentation.

3. **`profiles.extends` cần có inheritance rule rõ ràng.**
   Phải cấm circular inheritance và phải quy định cách merge `knowledge`, `rules`, `patterns`, `overrides`.

4. **`dependencies`, `references`, `related` nên có semantics khác nhau rõ ràng.**
   Nếu không, sau này graph sẽ trở thành một mạng tham chiếu khó kiểm soát.

5. **`tests/` nên có expected result và trace rule.**
   Chỉ đặt file `.music` trong `valid/invalid` chưa đủ để test engine một cách deterministic.

6. **`corpus/` nên tách dữ liệu âm nhạc khỏi annotation metadata.**
   Điều này quan trọng khi corpus lớn, vì một bài có thể có nhiều annotation/version khác nhau.

7. Nên bổ sung **`schemas/` ở root** để định nghĩa JSON/YAML schema cho frontmatter, profile, rule, annotation, test case. Đây là thứ rất hữu ích cho `tools/validate-*`.

8. Nên có **`registry`/`manifest`** để hệ thống biết chính xác artifact nào tồn tại, version nào đang active và relationship giữa chúng.

Dưới đây là bản tôi đề xuất làm baseline chính thức.

# CẤU TRÚC HOÀN CHỈNH — `music-language`

## 1. Mục tiêu

`music-language` là một thư viện tri thức và quy tắc cho hệ thống AI có khả năng:

* hiểu âm nhạc;
* mô hình hóa âm nhạc;
* suy luận về âm nhạc;
* tạo lyrics;
* tạo melody;
* tạo harmony;
* tạo rhythm;
* arrangement;
* biến đổi tác phẩm;
* kiểm tra tính hợp lệ;
* biểu diễn và kết xuất tác phẩm thông qua `music-dsl`.

Thư viện được tổ chức thành các lớp độc lập:

```text
Ontology
   ↓
Knowledge
   ↓
Rules
   ↓
Patterns
   ↓
Profiles
   ↓
Contexts
   ↓
Music DSL
   ↓
Corpus / Tests
```

Trong đó:

* `ontology` định nghĩa thế giới khái niệm;
* `knowledge` mô tả tri thức;
* `rules` định nghĩa điều kiện và hướng dẫn;
* `patterns` cung cấp building blocks;
* `profiles` xác định loại nhạc cần tạo;
* `contexts` xác định workflow AI;
* `music-dsl` biểu diễn tác phẩm;
* `corpus` cung cấp ví dụ tham chiếu;
* `tests` kiểm chứng engine;
* `tools` tự động hóa quản lý và kiểm tra thư viện.

---

# 2. Cây thư mục chuẩn

```text
music-language/
│
├── meta/
│   ├── README.md
│   ├── changelog.md
│   ├── contributors.md
│   ├── versioning.md
│   ├── license.md
│   └── conventions.md
│
├── ontology/
│   ├── core-ontology.ttl
│   ├── core-ontology.md
│   ├── relations.md
│   ├── mapping.md
│   ├── melody/
│   │   └── ontology.ttl
│   ├── harmony/
│   │   └── ontology.ttl
│   ├── rhythm/
│   │   └── ontology.ttl
│   └── form/
│       └── ontology.ttl
│
├── knowledge/
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
│   └── language/
│
├── rules/
│   ├── constraints/
│   │   ├── core/
│   │   ├── melody/
│   │   ├── harmony/
│   │   ├── rhythm/
│   │   ├── lyrics/
│   │   ├── arrangement/
│   │   └── ...
│   │
│   └── generation-hints/
│       ├── melody/
│       ├── harmony/
│       ├── rhythm/
│       ├── lyrics/
│       ├── arrangement/
│       └── ...
│
├── patterns/
│   ├── abstract/
│   ├── melodic/
│   ├── harmonic/
│   ├── rhythmic/
│   ├── structural/
│   └── genre-specific/
│       ├── pop/
│       ├── rock/
│       ├── ballad/
│       ├── jazz/
│       └── ...
│
├── profiles/
│   ├── pop-ballad-vn.md
│   ├── rock-anthem.md
│   ├── rock-ballad.md
│   └── jazz-standard.md
│
├── contexts/
│   ├── writing-vietnamese-ballad.md
│   ├── creating-pop-hook.md
│   ├── arranging-piano-ballad.md
│   ├── generating-melody-from-lyrics.md
│   └── ...
│
├── music-dsl/
│   ├── specification/
│   ├── vocabulary/
│   ├── syntax/
│   ├── types/
│   ├── structures/
│   ├── semantics/
│   ├── schemas/
│   └── examples/
│
├── corpus/
│   ├── vietnamese-ballad/
│   │   ├── song-01.music
│   │   ├── song-01.annotation.md
│   │   └── manifest.yaml
│   ├── pop/
│   ├── rock/
│   └── jazz/
│
├── tests/
│   ├── valid/
│   │   ├── correct-voice-leading/
│   │   │   ├── CASE.md
│   │   │   ├── input.music
│   │   │   └── expected.yaml
│   │   └── valid-song-structure/
│   │
│   ├── invalid/
│   │   ├── broken-parallel-fifths/
│   │   │   ├── CASE.md
│   │   │   ├── input.music
│   │   │   └── expected.yaml
│   │   └── mismatched-meter/
│   │
│   └── regression/
│
├── schemas/
│   ├── frontmatter/
│   │   ├── knowledge.schema.yaml
│   │   ├── ontology.schema.yaml
│   │   ├── rule.schema.yaml
│   │   ├── pattern.schema.yaml
│   │   ├── profile.schema.yaml
│   │   └── context.schema.yaml
│   │
│   ├── test.schema.yaml
│   ├── corpus.schema.yaml
│   └── annotation.schema.yaml
│
├── tools/
│   ├── build-index.py
│   ├── validate-frontmatter.py
│   ├── validate-links.py
│   ├── validate-ontology.py
│   ├── validate-profiles.py
│   ├── check-conflicts.py
│   ├── run-tests.py
│   ├── lint.py
│   └── README.md
│
└── index/
    ├── concepts-index.md
    ├── rules-index.md
    ├── patterns-index.md
    ├── profiles-index.md
    ├── contexts-index.md
    ├── corpus-index.md
    └── cross-references.md
```

---

# 3. Phân định trách nhiệm giữa các thư mục

## 3.1 `ontology/`

`ontology/` chỉ định nghĩa **cấu trúc khái niệm hình thức**.

Ví dụ:

```text
Scale
├── hasPitch
├── hasInterval
├── belongsToMode
└── derivesFrom
```

Không đặt vào đây:

* giải thích dài;
* tutorial;
* ví dụ sáng tác;
* recommendation;
* heuristic;
* style guideline.

### Source of truth

```text
ontology/*.ttl
```

là nguồn chính cho machine-readable ontology.

Các file:

```text
ontology/*.md
```

là documentation dành cho con người.

Không được chỉnh hai nguồn độc lập làm cho chúng có thể lệch nhau.

---

# 4. `knowledge/`

`knowledge/` mô tả:

> "Điều gì đúng về âm nhạc?"

Ví dụ:

```text
scale.md
```

có thể mô tả:

* scale là gì;
* cấu tạo;
* các loại scale;
* chức năng;
* đặc điểm;
* ví dụ;
* ngoại lệ;
* quan hệ với mode;
* quan hệ với chord.

`knowledge/` có thể chứa:

* factual knowledge;
* descriptive knowledge;
* explanatory knowledge;
* examples;
* terminology;
* cultural/contextual information.

Không đặt hard constraint vào đây.

---

# 5. `rules/`

`rules/` mô tả cách hệ thống phải hoặc nên hành động.

Có hai loại chính:

```text
constraints/
generation-hints/
```

## 5.1 `constraints/`

Là quy tắc bắt buộc.

Ví dụ:

```text
RULE.HARMONY.NO-PARALLEL-FIFTHS
RULE.RHYTHM.METER-CONSISTENCY
RULE.LYRICS.SYLLABLE-METER-COMPATIBILITY
```

Violation có thể làm:

```text
FAIL
REJECT
REPAIR
```

tùy execution policy.

## 5.2 `generation-hints/`

Là recommendation.

Ví dụ:

```text
RULE.MELODY.PREFER-STEPWISE-MOTION
RULE.MELODY.PREFER-CONTRASTING-PHRASES
RULE.ARRANGEMENT.PREFER-DYNAMIC-BUILD
```

Violation của hint không đồng nghĩa với invalid.

---

# 6. Rule Resolution Model

Không sử dụng `priority` như cơ chế duy nhất để quyết định rule nào thắng.

Thứ tự ưu tiên:

```text
1. Hard Constraint
2. Explicit Override
3. Soft Constraint
4. Generation Hint
```

Trong cùng một cấp:

```text
higher priority
    >
lower priority
```

Do đó:

```text
hard constraint priority 50
```

vẫn không bị:

```text
generation hint priority 100
```

ghi đè.

## Quy tắc conflict

Khi hai rule cùng cấp xung đột:

```text
priority cao hơn thắng
```

Nếu:

```text
priority bằng nhau
```

thì phải báo:

```text
UNRESOLVED_CONFLICT
```

không tự động chọn.

---

# 7. Rule Frontmatter

```yaml
---
id: RULE.HARMONY.NO-PARALLEL-FIFTHS
type: rule
category: constraint
severity: error
priority: 90

domain: harmony

dependencies:
  - KNOW.CORE.CHORD
  - KNOW.CORE.INTERVAL

conflicts-with:
  - RULE.HARMONY.ALLOW-PARALLEL-FIFTHS

status: stable
version: 1.0.0

last-updated: 2026-08-25
---
```

### Ý nghĩa

```text
category
    constraint | hint

severity
    info | warning | error | fatal

priority
    0-100

dependencies
    knowledge/rules/patterns bắt buộc để evaluate rule

conflicts-with
    các rule có thể xung đột trực tiếp
```

---

# 8. `dependencies`, `references`, `related`

Ba loại reference phải có semantics khác nhau.

## `dependencies`

Artifact bắt buộc để artifact hiện tại hoạt động.

Ví dụ:

```yaml
dependencies:
  - KNOW.CORE.PITCH
  - KNOW.CORE.INTERVAL
```

Thiếu dependency có thể làm artifact không usable.

## `references`

Nguồn hoặc khái niệm được tham chiếu.

Ví dụ:

```yaml
references:
  - ONTO.SCALE
  - SOURCE.RAMEAU.1722
```

Không nhất thiết là runtime dependency.

## `related`

Quan hệ hữu ích nhưng không bắt buộc.

Ví dụ:

```yaml
related:
  - KNOW.CORE.MODE
  - KNOW.HARMONY.CHORD
```

---

# 9. `patterns/`

`patterns/` là các building blocks có thể tái sử dụng.

Ví dụ:

```text
I-IV-V
ii-V-I
A-B-A
arch-phrase
call-and-response
verse-prechorus-chorus
```

Pattern không phải rule.

Ví dụ:

```text
I-IV-V
```

không có nghĩa:

```text
phải dùng I-IV-V
```

mà là:

```text
đây là một harmonic pattern có thể dùng.
```

Rule quyết định pattern có được phép hoặc được ưu tiên hay không.

---

# 10. `profiles/`

`profile` trả lời:

> "Hệ thống đang tạo loại âm nhạc nào?"

Profile là một composition preset gồm:

```text
knowledge
rules
patterns
parameters
overrides
```

Ví dụ:

```yaml
---
id: PROFILE.ROCK-BALLAD
type: profile
extends:
  - PROFILE.ROCK-ANTHEM

knowledge:
  - KNOW.GENRE.ROCK
  - KNOW.CORE.HARMONY
  - KNOW.MELODY.PHRASE

rules:
  - RULE.HARMONY.NO-PARALLEL-FIFTHS
  - RULE.RHYTHM.TEMPO-RANGE

patterns:
  - PATTERN.STRUCTURE.VERSE-CHORUS

overrides:
  - rule: RULE.RHYTHM.TEMPO-RANGE
    value: "60-80bpm"

status: stable
version: 1.0.0
last-updated: 2026-08-25
---
```

---

# 11. Profile Inheritance

`extends` hỗ trợ kế thừa.

Ví dụ:

```text
PROFILE.ROCK-BALLAD
        ↓
PROFILE.ROCK-ANTHEM
        ↓
PROFILE.ROCK
```

Không được phép có circular dependency:

```text
A → B → C → A
```

Tool phải phát hiện và reject.

## Merge rule

Khi child profile kế thừa parent:

```text
knowledge
    union

patterns
    union

rules
    union

parameters
    child overrides parent

overrides
    child overrides parent
```

Khi có conflict giữa các profile:

```text
child profile
    >
parent profile
```

---

# 12. `profiles/` vs `contexts/`

Đây là hai khái niệm khác nhau hoàn toàn.

## Profile

Trả lời:

> "Sinh ra nhạc gì?"

Ví dụ:

```text
Vietnamese Pop Ballad
Rock Anthem
Jazz Standard
```

## Context

Trả lời:

> "AI làm việc như thế nào?"

Ví dụ:

```text
Writing Vietnamese Ballad
Generating Melody From Lyrics
Arranging Piano Ballad
Creating Pop Hook
```

Một context có thể dùng nhiều profile.

Một profile có thể dùng trong nhiều context.

```text
                PROFILE
                   ↑
        ┌──────────┼──────────┐
        │          │          │
     Context A  Context B  Context C
```

---

# 13. `contexts/`

Context nên mô tả workflow rõ ràng.

Ví dụ:

```yaml
---
id: CONTEXT.GENERATE-MELODY-FROM-LYRICS
type: context
profiles:
  - PROFILE.POP-BALLAD-VN

steps:
  - analyze-lyrics
  - determine-syllable-structure
  - determine-phrase-boundaries
  - generate-rhythm
  - generate-pitch
  - apply-harmony
  - validate
  - repair
  - export

constraints:
  require-validation: true
---
```

Context không nên copy nội dung của profile.

---

# 14. `music-dsl/`

`music-dsl/` là lớp biểu diễn tác phẩm.

Nó không phải knowledge base.

Nó định nghĩa cách biểu diễn:

```text
Note
Pitch
Duration
Meter
Tempo
Key
Chord
Lyrics
Structure
Instrumentation
Articulation
Velocity
Automation
Performance Metadata
```

Các lớp:

```text
specification/
vocabulary/
syntax/
types/
structures/
semantics/
schemas/
examples/
```

## Phân biệt

```text
knowledge/
    nói "Scale là gì?"

music-dsl/
    nói "Scale được biểu diễn thế nào?"
```

---

# 15. `corpus/`

`corpus/` chứa các tác phẩm hoàn chỉnh đã annotate.

Mục đích:

```text
reference
few-shot
style learning
retrieval
comparison
analysis
benchmark
```

Corpus không phải test suite.

Ví dụ:

```text
song-01.music
song-01.annotation.md
```

## Annotation

Annotation có thể mô tả:

```text
form
phrase
motif
melody contour
harmony
cadence
rhythm
lyrics structure
instrumentation
articulation
style markers
```

Một tác phẩm có thể có nhiều annotation version.

Ví dụ:

```text
song-01.music
song-01.annotation.v1.md
song-01.annotation.v2.md
```

---

# 16. `corpus/` vs `tests/`

## `corpus/`

Trả lời:

> "Một tác phẩm âm nhạc thực tế trông như thế nào?"

## `tests/`

Trả lời:

> "Engine có hoạt động đúng không?"

Do đó:

```text
corpus
    = reference dataset

tests
    = validation dataset
```

Không dùng corpus để quyết định một rule pass/fail.

---

# 17. `tests/`

Mỗi test case nên là một thư mục độc lập.

Ví dụ:

```text
tests/invalid/broken-parallel-fifths/

├── CASE.md
├── input.music
└── expected.yaml
```

## `CASE.md`

Phải mô tả:

```text
Test gì?
Rule nào?
Input gì?
Expected behavior?
Cách chạy?
```

## `expected.yaml`

Ví dụ:

```yaml
result: invalid

violations:
  - rule: RULE.HARMONY.NO-PARALLEL-FIFTHS
    severity: error

expected_count:
  error: 1
```

Nhờ vậy test engine có thể chạy deterministic.

---

# 18. Test Categories

Nên có ít nhất:

```text
valid/
invalid/
regression/
```

## `valid/`

Input phải pass.

## `invalid/`

Input phải fail đúng rule dự kiến.

## `regression/`

Các lỗi đã từng xảy ra và phải bảo đảm không tái xuất hiện.

---

# 19. `schemas/`

`schemas/` là một phần nên có từ đầu.

Nó định nghĩa cấu trúc hợp lệ của:

```text
knowledge frontmatter
ontology metadata
rule
pattern
profile
context
corpus annotation
test case
```

Mục tiêu:

```text
AI / developer viết file
        ↓
schema validation
        ↓
repository validation
        ↓
index generation
```

---

# 20. `tools/`

`tools/` chịu trách nhiệm automation.

## `build-index.py`

Sinh:

```text
index/*
```

Từ toàn bộ repository.

`index/` không được sửa tay.

---

## `validate-frontmatter.py`

Kiểm tra:

```text
ID
type
version
status
dependencies
references
related
extends
priority
```

---

## `validate-links.py`

Kiểm tra tất cả reference:

```text
dependencies
references
related
conflicts-with
extends
```

có tồn tại hay không.

---

## `validate-ontology.py`

Kiểm tra:

```text
class
property
relation
domain
range
ID
duplicate
circularity
```

---

## `validate-profiles.py`

Kiểm tra:

```text
extends
circular inheritance
missing dependency
invalid override
duplicate rule
```

---

## `check-conflicts.py`

Phát hiện:

```text
rule A conflicts-with rule B
same scope
same priority
incompatible constraints
```

Tool không tự ý sửa.

Nó phải báo:

```text
RESOLVED
UNRESOLVED
```

---

## `run-tests.py`

Chạy toàn bộ validation suite.

Ví dụ:

```text
tests/valid
tests/invalid
tests/regression
```

và trả về:

```text
PASS
FAIL
ERROR
```

---

# 21. `index/`

`index/` là generated data.

Không chỉnh sửa trực tiếp.

Ví dụ:

```text
concepts-index.md
rules-index.md
patterns-index.md
profiles-index.md
contexts-index.md
corpus-index.md
cross-references.md
```

Index phục vụ:

```text
AI retrieval
search
navigation
dependency resolution
documentation
debugging
```

---

# 22. Frontmatter chuẩn cho `knowledge/`

```yaml
---
id: KNOW.CORE.SCALE
type: knowledge
name: Musical Scale

version: 1.0.0
domain: core
status: stable

tags:
  - scale
  - pitch
  - interval

dependencies:
  - KNOW.CORE.PITCH
  - KNOW.CORE.INTERVAL

references:
  - ONTO.SCALE

related:
  - KNOW.CORE.MODE
  - KNOW.HARMONY.CHORD

source:
last-updated: 2026-08-25
---
```

---

# 23. Frontmatter chuẩn cho `ontology/`

```yaml
---
id: ONTO.SCALE
type: ontology
name: Musical Scale

version: 1.0.0
domain: core
status: stable

related:
  - ONTO.PITCH
  - ONTO.INTERVAL

source-of-truth: ttl

last-updated: 2026-08-25
---
```

---

# 24. Frontmatter chuẩn cho `pattern/`

```yaml
---
id: PATTERN.HARMONY.I-IV-V
type: pattern
name: I-IV-V Progression

version: 1.0.0
domain: harmony
status: stable

dependencies:
  - KNOW.HARMONY.CHORD
  - KNOW.CORE.KEY

related:
  - PATTERN.HARMONY.I-VI-IV-V

last-updated: 2026-08-25
---
```

---

# 25. ID Convention

ID phải ổn định và không phụ thuộc filename.

Format:

```text
<TYPE>.<DOMAIN>.<NAME>
```

Ví dụ:

```text
KNOW.CORE.PITCH
KNOW.HARMONY.CHORD
RULE.HARMONY.NO-PARALLEL-FIFTHS
RULE.RHYTHM.METER-CONSISTENCY
PATTERN.HARMONY.I-IV-V
PROFILE.ROCK-BALLAD
CONTEXT.GENERATE-MELODY-FROM-LYRICS
ONTO.SCALE
```

Không reuse ID của artifact cũ.

Nếu artifact bị deprecated:

```yaml
status: deprecated
```

ID vẫn được giữ lại để không phá reference graph.

---

# 26. Versioning

Artifact nên dùng:

```text
MAJOR.MINOR.PATCH
```

Ví dụ:

```text
1.4.2
```

## MAJOR

Thay đổi breaking.

Ví dụ:

```text
thay đổi semantics
thay đổi schema
thay đổi rule behavior
```

## MINOR

Thêm capability nhưng không phá compatibility.

## PATCH

Sửa nội dung hoặc lỗi nhỏ.

---

# 27. Conflict Model

Conflict phải được xem xét trên nhiều chiều:

```text
rule category
priority
scope
specificity
profile
override
```

Ví dụ:

```text
GLOBAL constraint
        ↓
GENRE constraint
        ↓
PROFILE override
        ↓
CONTEXT override
```

Rule càng specific có thể override rule generic **chỉ khi policy cho phép**.

Không cho phép override hard constraint một cách implicit.

---

# 28. Specificity

Nên hỗ trợ khái niệm:

```text
global
domain
genre
profile
context
local
```

Ví dụ:

```text
RULE.HARMONY.NO-PARALLEL-FIFTHS
```

có scope:

```text
global
```

Trong khi:

```text
RULE.JAZZ.ALLOW-PARALLEL-MOVEMENT
```

có scope:

```text
genre:jazz
```

Engine có thể dùng specificity để giải quyết trường hợp rule cùng cấp.

---

# 29. Rule Evaluation

Pipeline chuẩn:

```text
Input Music
     ↓
Parse
     ↓
Normalize
     ↓
Resolve Ontology
     ↓
Load Knowledge
     ↓
Resolve Profile
     ↓
Resolve Context
     ↓
Resolve Rules
     ↓
Resolve Conflicts
     ↓
Evaluate Constraints
     ↓
Evaluate Hints
     ↓
Generate Diagnostics
     ↓
Repair / Reject / Accept
     ↓
Output
```

Điểm quan trọng:

```text
rule resolution
```

phải xảy ra trước:

```text
rule evaluation
```

Không evaluate trực tiếp một tập rule chưa resolve conflict.

---

# 30. Knowledge không được chứa Rule Semantics

Ví dụ:

```text
knowledge/scale.md
```

có thể nói:

```text
Major scale contains seven pitch classes.
```

Nhưng không nên chứa:

```text
AI must always use major scale in chorus.
```

Cái sau thuộc:

```text
rules/
profiles/
contexts/
```

---

# 31. Rule không được trở thành Knowledge

Ngược lại:

```text
RULE.MELODY.PREFER-STEPWISE-MOTION
```

không nên chứa hàng trăm đoạn kiến thức về melody.

Nó chỉ cần tham chiếu:

```yaml
dependencies:
  - KNOW.MELODY.CONTOUR
```

Điều này giữ cho hệ thống:

```text
Knowledge
    +
Rules
```

có thể tái sử dụng độc lập.

---

# 32. Context không được trở thành Profile

Không viết:

```text
context = Vietnamese Ballad
```

mà phải viết:

```text
context = workflow
profile = Vietnamese Ballad
```

Ví dụ:

```text
CONTEXT.WRITE-LYRICS-FIRST
        +
PROFILE.POP-BALLAD-VN
```

---

# 33. Corpus không được trở thành Rule

Không suy ra:

```text
10 bài đều dùng I-V-vi-IV
→ đây là constraint
```

Corpus chỉ là evidence/reference.

Muốn trở thành rule phải được định nghĩa độc lập trong:

```text
rules/
```

---

# 34. Architecture tổng thể

```text
                    ┌───────────────┐
                    │   Ontology    │
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │   Knowledge   │
                    └───────┬───────┘
                            │
              ┌─────────────▼─────────────┐
              │           Rules            │
              │ constraints + generation  │
              │          hints             │
              └─────────────┬─────────────┘
                            │
                    ┌───────▼───────┐
                    │    Patterns   │
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │    Profiles   │
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │    Contexts   │
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │   Music DSL   │
                    └───────┬───────┘
                            │
             ┌──────────────┴──────────────┐
             │                             │
      ┌──────▼──────┐               ┌──────▼──────┐
      │   Corpus    │               │    Tests    │
      └─────────────┘               └─────────────┘
```

---

# 35. Nguyên tắc bất biến

Repository phải giữ các invariant sau:

```text
1. Mọi artifact phải có ID duy nhất.

2. Mọi reference phải resolve được.

3. Không có circular dependency bất hợp lệ.

4. Không có circular profile inheritance.

5. Ontology machine-readable có một source of truth.

6. Rule conflict không được âm thầm bỏ qua.

7. Hard constraint không bị hint override.

8. Index không được sửa bằng tay.

9. Test phải có expected result.

10. Corpus không được sử dụng như test oracle.

11. Knowledge không chứa workflow.

12. Context không định nghĩa genre/profile.

13. Profile không copy-paste toàn bộ parent.

14. Deprecated artifact không được xóa nếu còn reference.

15. Mọi schema change phải được versioning.
```

---

# 36. Nguyên tắc mở rộng

Khi thêm domain mới:

```text
knowledge/
rules/
patterns/
ontology/
```

có thể mở rộng độc lập.

Ví dụ thêm:

```text
production/
mixing/
mastering/
sound-design/
performance/
```

không cần thay đổi kiến trúc core.

---

# 37. Nguyên tắc cho AI

AI không nên đọc toàn bộ repository mỗi lần.

Thay vào đó:

```text
User Request
      ↓
Context
      ↓
Profile
      ↓
Required Knowledge
      ↓
Required Rules
      ↓
Required Patterns
      ↓
Relevant Corpus
      ↓
Generate
```

`index/` phục vụ retrieval để AI chỉ load phần cần thiết.

Ví dụ:

```text
Generate Vietnamese Pop Ballad
```

AI không cần load:

```text
Jazz
Rock
Indian Classical
Orchestral
```

trừ khi dependency yêu cầu.

---

# 38. Quy tắc cho `index/`

Index phải được tạo tự động:

```text
source repository
       ↓
validate
       ↓
resolve dependencies
       ↓
build graph
       ↓
generate index
```

Không commit index nếu repository policy yêu cầu build tại CI.

Hoặc có thể commit generated index nhưng luôn kiểm tra:

```text
generated index == current source
```

---

# 39. CI Validation

Mỗi change nên chạy tối thiểu:

```text
validate-frontmatter
validate-links
validate-ontology
validate-profiles
check-conflicts
run-tests
build-index
```

Pipeline:

```text
Commit
  ↓
Lint
  ↓
Schema Validation
  ↓
Reference Validation
  ↓
Ontology Validation
  ↓
Conflict Detection
  ↓
Test Suite
  ↓
Build Index
  ↓
PASS / FAIL
```

---

# 40. Kết luận kiến trúc

Cấu trúc chính thức nên được hiểu theo 10 lớp:

```text
1. ontology
   = WHAT EXISTS

2. knowledge
   = WHAT IS KNOWN

3. rules
   = WHAT MUST / SHOULD HAPPEN

4. patterns
   = REUSABLE BUILDING BLOCKS

5. profiles
   = WHAT TO GENERATE

6. contexts
   = HOW TO WORK

7. music-dsl
   = HOW MUSIC IS REPRESENTED

8. corpus
   = EXAMPLES / REFERENCE

9. tests
   = WHAT MUST BE VERIFIED

10. tools + schemas + index
   = HOW THE LIBRARY IS OPERATED
```

Với cấu trúc này, `music-language` không còn chỉ là một thư mục chứa tài liệu âm nhạc, mà trở thành một **knowledge-and-rule system có schema, dependency graph, inheritance, conflict resolution, retrieval, validation và regression testing**.

Đây là nền tảng phù hợp để sau này xây dựng `Parser`, `Rule Engine`, `Music Reasoning Engine`, `Generator` và `Renderer` mà không phải thay đổi lại kiến trúc tri thức ban đầu.
