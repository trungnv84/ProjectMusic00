# ROUND 3 – XÂY DỰNG GIẢI PHÁP

**Vai trò:** Solution Architect  
**Nhiệm vụ:** Tổng hợp phản biện từ ROUND 1 và ROUND 2, đề xuất 1–3 phương án khả thi, đánh giá chi phí/thời gian/rủi ro, đưa ra khuyến nghị cuối cùng.

---

## 0. TÓM TẮT ĐỒNG THUẬN SAU PHẢN BIỆN

Sau 2 vòng thảo luận, các AI đã đồng thuận ở các điểm sau:

| Hạng mục | Đồng thuận |
|----------|-----------|
| **GIỮ**: Song Compiler Architecture, Intermediate Representation, Rule Engine, Validation Loop, Adapter Pattern, Partial Edit | ✅ 100% |
| **GIỮ**: Markdown-like / Compact authoring (không XML/JSON) | ✅ 100% |
| **GIỮ**: Hard + Soft Rules, YAML rule packs | ✅ 100% |
| **CẦN SỬA**: Syllable không phải atomic unit toàn hệ thống | ✅ 100% |
| **CẦN SỬA**: 4-layer-on-syllable quá nặng → tách domain | ✅ 100% |
| **CẦN BỔ SUNG**: Timeline (time/beat/tick) làm trục chung | ✅ 100% |
| **CẦN SỬA**: JSON không phải Ground Truth → Canonical AST | ✅ 100% |
| **CẦN SỬA**: Lossless → chỉ semantic lossless | ✅ 100% |
| **CẦN BỔ SUNG**: Derived rules + Priority/Override | ✅ 100% |
| **CẦN BỔ SUNG**: Dialect_profile (Bắc/Trung/Nam), Microtonality (cent) | ✅ 100% |
| **CẦN BỔ SUNG**: Persistent ID cho partial edit | ✅ 100% |
| **CẦN BỔ SUNG**: L5 Control (LOCK/KEEP/CHANGE) | ✅ 100% |

---

## 1. PHƯƠNG ÁN ĐỀ XUẤT

Dựa trên phân tích, tôi đề xuất **3 phương án** với mức độ thay đổi khác nhau.

---

### PHƯƠNG ÁN A — "INCREMENTAL REFACTOR" (ÍT RỦI RO NHẤT)

**Mô tả ngắn:** Giữ nguyên cấu trúc 4-layer và syllable làm atomic unit, nhưng tách L3/L4 ra khỏi syllable và đưa lên scope cao hơn (Section/Track). Timeline vẫn ngầm định qua hierarchical structure. JSON vẫn là Ground Truth nhưng được sinh từ AST nội bộ.

#### Kiến trúc sửa đổi:

```
SONG DSL (.songdsl) — CỤ THỂ:

@meta
  title: Đêm Mưa
  key: Am | bpm: 78 | genre: vn_pop_ballad

@tracks
  vocal: lead | piano: harmony | strings: pad

## Verse 1
@chords Am | F | C | G
@energy 0.4

### Line A (8 syllables, rhyme A)

Mình  [ngang] C4      1/8    # chord=Am
còn   [huyền] D4      1/8    # chord=Am
thương[ngang] E4>F#4  1/4    # chord=F  (melisma: 2 notes)
nhau  [ngang] G4      2/8    # chord=F

// LINE B tiếp theo...

## Performance (gán cho cả section)
@vocal
  vibrato: auto
  breath: after_line_A

## Arrangement (gán cho track)
@piano
  pattern: broken_chord_8th
@strings
  pad: sustained
```

**Thay đổi so với PLAN gốc:**
| Thay đổi | PLAN gốc | Phương án A |
|----------|----------|-------------|
| L3 (Performance) | Trong mỗi syllable | Gán ở cấp Section/Line |
| L4 (Arrangement) | Trong mỗi syllable | Gán ở cấp Track/Global |
| L1 + L2 | Trong mỗi syllable | Giữ nguyên (text, tone, pitch, duration) |
| Timeline | Ngầm (hierarchical) | Giữ nguyên (beat position implicit) |
| Ground Truth | JSON | JSON (vẫn là serialization) |
| Converter | Lossless | Semantic lossless |

**Thời gian:** 4–6 tuần  
**Độ khó:** Trung bình  
**Rủi ro:** Thấp

| Tiêu chí | Đánh giá |
|----------|----------|
| Lợi ích | Giảm 60-70% token so với 4-layer-on-syllable. Con người viết dễ hơn. |
| Chi phí | Sửa parser, schema, validator. Không thay đổi semantic model lớn. |
| Rủi ro | Timeline vẫn ngầm → khó swing/quantize. Polyphony vẫn khó. |
| Khả năng thành công | Cao (85-90%) vì thay đổi nhỏ, dễ kiểm soát. |
| Điều kiện thành công | Parser phải support scope inheritance (section→line→syllable). |

**Ưu điểm:**
- ✅ Triển khai nhanh, ít thay đổi kiến trúc.
- ✅ Giảm token đáng kể.
- ✅ Vẫn giữ được value proposition (Rule Engine, validation, partial edit).

**Nhược điểm:**
- ❌ Timeline vẫn ngầm → khó xử lý swing, onset_offset, automation chính xác.
- ❌ Polyphony/counter-melody vẫn khó.
- ❌ Partial edit vẫn phụ thuộc vào index (dễ vỡ khi thay đổi cấu trúc).

---

### PHƯƠNG ÁN B — "EVENT-BASED + TIMELINE" (KIẾN TRÚC ĐÚNG)

**Mô tả ngắn:** Xây dựng lại từ semantic model. Tách biệt rõ các domain: Timeline, Lyrics, Notes, Harmony, Performance, Arrangement, Control. Dùng ID/reference để liên kết. Canonical AST làm Ground Truth. DSL là view layer.

#### Kiến trúc semantic model:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CANONICAL AST (Ground Truth)                │
├─────────────────────────────────────────────────────────────────┤
│  SONG                                                          │
│  ├── META (key, bpm, time_sig, genre, dialect, ...)           │
│  ├── STRUCTURE (Section[] với start/end beat)                 │
│  ├── TIMELINE                                                 │
│  │   ├── NoteEvent[] (id, track, pitch, duration, start_beat) │
│  │   ├── ChordEvent[] (id, name, start_beat, end_beat)        │
│  │   ├── TempoEvent[] (beat, bpm)                             │
│  │   ├── MeterEvent[] (beat, time_sig)                        │
│  │   └── AutomationEvent[] (track, param, curve)              │
│  ├── LYRICS                                                   │
│  │   ├── Line[]                                               │
│  │   │   └── Syllable[] (id, text, tone, rhyme, phoneme)      │
│  │   └── SyllableToNoteMap[] (syllable_id → note_id[])        │
│  ├── PERFORMANCE                                              │
│  │   ├── VocalEvent[] (note_id, technique, vibrato, bend)     │
│  │   └── InstrumentEvent[] (note_id, articulation, velocity)  │
│  ├── ARRANGEMENT                                              │
│  │   ├── Track[] (id, instrument, role, mix, fx)              │
│  │   └── Pattern[] (track, rhythm_pattern, voicing)           │
│  └── CONTROL                                                  │
│      ├── Lock[] (field_path, lock_type: HARD | SOFT)          │
│      └── Preference[] (field_path, weight)                    │
└─────────────────────────────────────────────────────────────────┘
```

#### DSL authoring (view layer):

```
# Đêm Mưa
@key Am | @bpm 78 | @time 6/8 | @genre vn_pop_ballad | @dialect vi_north

## Verse 1
@timeline
  chord Am @0..4
  chord F  @4..8

@lyrics
  A: "Mình còn thương nhau"
    mình  [ngang]  @note n1: C4 1/8 @beat 0.0
    còn   [huyền]  @note n2: D4 1/8 @beat 0.5
    thương[ngang]  @note n3: E4 1/16 @beat 1.0
                   @note n4: F#4 3/16 @beat 1.25   // melisma
    nhau  [ngang]  @note n5: G4 2/8 @beat 2.0

@performance
  n3: portamento
  n4: vibrato(20%, 5.5Hz)
  n5: breath_after

@arrangement
  piano: broken_chord_8th
  strings: pad_sustained

@control
  lock melody verse_1
  allow lyric_change verse_1
```

**Thay đổi so với PLAN gốc:**
| Thay đổi | PLAN gốc | Phương án B |
|----------|----------|-------------|
| Atomic unit | Syllable | Event (NoteEvent, ChordEvent, AutomationEvent) |
| L1–L4 | Trong syllable | Tách domain riêng, liên kết bằng ID |
| Timeline | Ngầm | Explicit (beat start/duration) |
| Ground Truth | JSON | Canonical AST |
| Mapping | Syllable → Note[] | Syllable ↔ Note (many-to-many) |
| Converter | Lossless | Semantic lossless |
| Partial edit | Index-based | ID-based (ổn định) |

**Thời gian:** 12–16 tuần  
**Độ khó:** Cao  
**Rủi ro:** Trung bình–Cao

| Tiêu chí | Đánh giá |
|----------|----------|
| Lợi ích | Giải quyết triệt để polyphony, melisma, automation, partial edit. Kiến trúc bền vững cho tương lai. |
| Chi phí | Phải thiết kế lại từ semantic model. Parser phức tạp hơn (cross-reference). |
| Rủi ro | Over-engineering nếu MVP chỉ cần vocal-lead đơn giản. LLM khó sinh ID/reference hơn. |
| Khả năng thành công | Trung bình (60-70%) — phụ thuộc vào chất lượng semantic model và parser. |
| Điều kiện thành công | Thiết kế Canonical AST đúng ngay từ đầu. Có prototype trên 10-20 bài thật trước khi khóa grammar. |

**Ưu điểm:**
- ✅ Kiến trúc bền vững, scalable.
- ✅ Xử lý được mọi edge-case (polyphony, automation, swing, microtonality).
- ✅ Partial edit ổn định nhờ ID.
- ✅ Timeline explicit → dễ export MIDI/DAW.

**Nhược điểm:**
- ❌ Thời gian dài, complexity cao.
- ❌ LLM khó sinh cross-reference hơn cấu trúc cây.
- ❌ Con người viết có thể thấy "quan hệ" phức tạp hơn là "cây" đơn giản.
- ❌ Parser phải handle reference validity (syllable → note tồn tại không).

---

### PHƯƠNG ÁN C — "HYBRID MVP" (CÂN BẰNG NHẤT) — **KHUYẾN NGHỊ**

**Mô tả ngắn:** Lấy ý tưởng từ cả A và B. Giữ syllable làm atomic unit cho lyric-vocal, nhưng cho phép **2 chế độ viết**:
1. **Simple mode:** Viết như Phương án A (L1+L2 trên syllable, L3/L4 ở scope cao) — cho 90% trường hợp.
2. **Advanced mode:** Khi cần chi tiết, dùng `@override` hoặc `@inline` để gắn L3/L4 vào syllable cụ thể.

Timeline được thêm vào **dưới dạng metadata ở cấp Section**, không bắt buộc nhưng hỗ trợ khi cần.

#### DSL hybrid:

```
# Đêm Mưa — HYBRID MODE

@meta
  key: Am | bpm: 78 | time: 6/8 | genre: vn_pop_ballad
  timeline_mode: auto  # auto = suy từ syllable order

@tracks
  vocal: lead | piano: harmony

## Verse 1
@chords Am | F | C | G
@energy 0.4
@timeline [0, 4, 8, 12]  # optional: beat markers cho mỗi chord

### Line A
Mình  [ngang] C4      1/8
còn   [huyền] D4      1/8
thương[ngang] E4>F#4  1/4
nhau  [ngang] G4      2/8

@vocal
  vibrato: auto
  breath: after_A

### Line B (advanced — override từng syllable)
Em   [ngang] E4  1/8  @vibrato(light, 4Hz)
đi   [ngang] G4  1/8  @bend(+200c)
rồi  [huyền] F#4 1/4  @glissando(descending, 100ms)

@control
  lock verse_1.melody
  allow verse_1.lyrics
```

**Thay đổi so với PLAN gốc:**
| Thay đổi | PLAN gốc | Phương án C |
|----------|----------|-------------|
| Atomic unit | Syllable (cứng) | Syllable (mềm) — có override |
| L3/L4 | Trong mỗi syllable | Default ở scope cao, override inline |
| Timeline | Ngầm | Optional explicit beat markers |
| Ground Truth | JSON | AST nội bộ (JSON serialization) |
| Converter | Lossless | Semantic lossless |
| Partial edit | Index-based | ID-based (thêm stable_id ngầm) |

**Thời gian:** 8–10 tuần  
**Độ khó:** Trung bình  
**Rủi ro:** Thấp–Trung bình

| Tiêu chí | Đánh giá |
|----------|----------|
| Lợi ích | Cân bằng giữa đơn giản (90% use case) và linh hoạt (10% advanced). Thời gian vừa phải. |
| Chi phí | Parser phải hỗ trợ 2 chế độ + inheritance + override. |
| Rủi ro | Override có thể làm DSL khó đọc nếu lạm dụng. Timeline optional có thể dẫn đến inconsistent. |
| Khả năng thành công | Cao (80-85%) — đã được chứng minh bởi các DSL khác (SQL có simple/advanced mode). |
| Điều kiện thành công | Thiết kế clear inheritance rules. Scope resolution phải deterministic (override → local → global). |

**Ưu điểm:**
- ✅ Nhanh hơn Phương án B, linh hoạt hơn Phương án A.
- ✅ Con người chỉ viết L1+L2 mặc định → ít token, dễ đọc.
- ✅ Khi cần chi tiết, có override mà không phá vỡ cú pháp.
- ✅ Timeline optional — không gây áp lực cho người mới.
- ✅ Partial edit ổn định (stable_id ngầm).

**Nhược điểm:**
- ❌ Parser phức tạp hơn A (phải handle inheritance + override).
- ❌ Timeline optional nhưng nếu bỏ qua thì swing/automation khó.
- ❌ Vẫn chưa giải quyết triệt để polyphony/counter-melody như B.

---

## 2. SO SÁNH 3 PHƯƠNG ÁN

| Tiêu chí | Phương án A (Incremental) | Phương án B (Event-based) | Phương án C (Hybrid) ⭐ |
|----------|---------------------------|---------------------------|-------------------------|
| **Thời gian** | 4–6 tuần | 12–16 tuần | 8–10 tuần |
| **Độ khó** | Trung bình | Cao | Trung bình |
| **Rủi ro** | Thấp | Trung bình–Cao | Thấp–Trung bình |
| **Token saving** | 60–70% | 80–90% | 70–80% |
| **Polyphony support** | ❌ Khó | ✅ Tốt | ⚠️ Limited |
| **Timeline explicit** | ❌ Không | ✅ Có | ⚠️ Optional |
| **Partial edit** | ⚠️ Index-based | ✅ ID-based | ✅ ID-based (ngầm) |
| **Human writable** | ✅ Dễ | ⚠️ Khó (references) | ✅ Dễ (simple mode) |
| **LLM-friendly** | ✅ Dễ sinh | ⚠️ Khó (references) | ✅ Dễ sinh |
| **Bền vững** | ⚠️ Trung bình | ✅ Rất tốt | ✅ Tốt |
| **Khả năng thành công** | 85–90% | 60–70% | 80–85% |
| **Chi phí refactor sau** | Cao (phải làm lại) | Thấp | Trung bình |

---

## 3. ĐÁNH GIÁ RỦI RO CHI TIẾT

### Rủi ro chung (cả 3 phương án)

| Rủi ro | Mức độ | Cách giảm thiểu |
|--------|--------|-----------------|
| LLM không sinh đúng DSL | Cao | Few-shot prompting + validator feedback loop |
| Rule Engine quá chậm | Trung bình | Viết bằng Go/Rust, optimize rules indexing |
| Provider adapter không hỗ trợ L3/L4 | Cao | Phân loại adapter (lossless vs lossy) + expectation management |
| Gold Test Suite chưa có | Rất cao | Bắt đầu xây dựng ngay với 20–30 bài thật |
| Hard rule quá chặt → bài máy móc | Trung bình | Soft penalty + human-in-the-loop override |

### Rủi ro riêng từng phương án

| Phương án | Rủi ro riêng | Cách giảm thiểu |
|-----------|--------------|-----------------|
| **A** | Timeline implicit → khó swing, automation, melisma timing | Chấp nhận limitation cho MVP; ghi rõ trong docs |
| **A** | Partial edit dễ vỡ khi thay đổi structure | Thêm stable_id ngầm cho mỗi syllable |
| **B** | Over-engineering → chậm tiến độ | Chỉ làm sau khi prototype A chứng minh được value |
| **B** | LLM khó sinh references | Cung cấp tool/UI để generate references tự động |
| **C** | Inheritance/override phức tạp | Thiết kế scope resolution rõ ràng; test kỹ |
| **C** | Timeline optional → inconsistent | Đặt default reasonable (beat = sequential order) |

---

## 4. KHUYẾN NGHỊ CUỐI CÙNG

### 🏆 **Chọn Phương án C — HYBRID MVP** (với lộ trình 3 giai đoạn)

#### Lý do:
1. **Cân bằng tốt nhất** giữa speed-to-market và architectural soundness.
2. **Giảm rủi ro** vì không phải viết lại từ đầu (như B), nhưng vẫn có đường để nâng cấp sau.
3. **Con người và LLM đều viết được** — đây là điều kiện tiên quyết để adoption.
4. **Thời gian 8–10 tuần** là realistic và không quá dài.
5. **Có thể nâng cấp lên B** sau khi đã có data và user feedback.

#### Lộ trình triển khai 3 giai đoạn:

**Giai đoạn 1 (Tuần 1–4): Prototype Semantic Model**
- Thiết kế **Canonical AST** cho 4 domain: Lyrics (L1), Music (L2), Performance (L3), Arrangement (L4).
- Thêm **Timeline** ở cấp Section (optional).
- Xây dựng **EBNF grammar** cho DSL hybrid (simple mode mặc định).
- Viết **Go parser** (đọc DSL → AST).
- AST → JSON serializer (semantic lossless).
- Test với 5 bài hát thật (lấy từ corpus mẫu).

**Giai đoạn 2 (Tuần 5–8): Rule Engine + Validator**
- Implement **Rule Engine** đọc YAML rules (Hard/Soft/Derived).
- Bổ sung **scope inheritance** (Section → Line → Syllable).
- Bổ sung **override semantics** (`@inline` để ghi đè L3/L4).
- Thêm **stable_id** ngầm cho mỗi syllable (UUID hash từ position).
- Validation Loop: AST → Validator → Diagnostics → AI correction.

**Giai đoạn 3 (Tuần 9–10): Adapters + Integration**
- **Adapter MIDI/MusicXML** (export cơ bản).
- **Adapter OpenUTAU/DiffSinger** (vocal synth).
- **Adapter Suno/Udio** (lossy prompt generation).
- **CLI tool** cho compile/validate/export.
- **Documentation** và **tutorial**.

**Sau MVP (Tuần 11+): Nâng cấp lên B**
- Nếu user feedback yêu cầu polyphony/automation chi tiết → migrate lên Event-based model.
- Vì AST đã có Timeline + ID, việc migrate sẽ dễ hơn là từ PLAN gốc.

---

## 5. ĐIỀU KIỆN THÀNH CÔNG

| Điều kiện | Mức độ quan trọng | Cách đảm bảo |
|-----------|-------------------|--------------|
| Có ít nhất 20 bài hát thật để test | 🔴 Critical | Xây dựng corpus từ V-Pop/bolero/dân ca |
| Gold Test Suite cho tone–melody mapping | 🔴 Critical | Hợp tác với linguist + musician |
| Parser đạt 100% roundtrip semantic | 🟠 High | Test suite với 100+ trường hợp |
| Rule Engine có thể xử lý 500+ rules | 🟡 Medium | Benchmark với bài dài (5 phút, 400 syllable) |
| Adapter OpenUTAU hoạt động | 🟠 High | Test với file .ustx export |
| Con người (non-technical) viết được DSL | 🟠 High | User testing với 5–10 nhạc sĩ |
| LLM (GPT-4/Claude) sinh DSL đúng | 🟠 High | Few-shot prompting + validation loop |

---

## 6. CÂU HỎI MỞ (CẦN QUYẾT ĐỊNH TRƯỚC KHI BẮT ĐẦU)

1. **Dialect support có bắt buộc cho MVP không?**
   - Nếu có → thêm `@dialect vi_north | vi_central | vi_south` vào meta.
   - Nếu không → để cho Phase 2.

2. **Microtonality (cent) có cần hỗ trợ ngay không?**
   - Nếu có → pitch phải hỗ trợ `C4+25c`.
   - Nếu không → chỉ support note name (C4, D4...).

3. **Timeline có bắt buộc không?**
   - Khuyến nghị: **Optional** với default = sequential beat order.
   - Nếu user ghi `@timeline [0, 4, 8]` → override default.

4. **Stable ID cho syllable dùng gì?**
   - Khuyến nghị: **Hash từ position** (`verse_1_line_0_syl_2`).
   - Không dùng UUID vì khó đọc.

5. **Mức độ chi tiết của L3 Performance cho MVP?**
   - Khuyến nghị: **Chỉ hỗ trợ vibrato + breath + glissando**.
   - Pitch bend curve → Phase 2.

---

## 7. KẾT LUẬN

**Khuyến nghị của Solution Architect:**

> Chọn **Phương án C — Hybrid MVP**, với lộ trình 3 giai đoạn (10 tuần). Đây là sự cân bằng tối ưu giữa:
> - Tốc độ triển khai (8–10 tuần)
> - Khả năng adoption (con người + LLM đều viết được)
> - Tính bền vững (có thể nâng cấp lên Event-based sau)
> - Rủi ro (không quá thấp cũng không quá cao)

**Lưu ý quan trọng:**
- **Không viết grammar cho đến khi Canonical AST được chốt.**
- **Xây dựng Gold Test Suite với bài hát thật trước khi viết parser.**
- **Sẵn sàng pivot lên Phương án B nếu prototype A/C bộc lộ fatal flaw trong 4 tuần đầu.**

---

*Solution Architect đã hoàn thành đề xuất giải pháp. Hội đồng cần quyết định phương án và start date.*