# AI MUSIC PROMPT BUILDER SPECIFICATION
## Phiên bản 3.0 (Tổng hợp & Tối ưu cuối)

---

## 0. MỤC ĐÍCH & KIẾN TRÚC HỆ THỐNG

Tài liệu này định nghĩa **Bước 1 — Prompt Builder AI** — là **hợp đồng dữ liệu** giữa người dùng và AI sáng tác.

```
                NGƯỜI DÙNG
                    │
          Prompt tự do / yêu cầu
                    ▼
        ┌────────────────────────┐
        │  BƯỚC 1: PROMPT BUILDER│ ◄── Tài liệu này (TÀI LIỆU 1)
        └───────────┬────────────┘
                    ▼
             PROMPT NHÁP
                    │
               Người dùng review / chỉnh sửa
                    ▼
              PROMPT CHUẨN (FINAL)
                    ▼
        ┌────────────────────────┐
        │ BƯỚC 2: MUSIC COMPOSER │ ◄── TÀI LIỆU 2 (Kiến thức âm nhạc)
        └───────────┬────────────┘
                    ▼
              MusicXML 4.0
```

| Vai trò | Trả lời câu hỏi | Nội dung chính |
|:---|:---|:---|
| **Tài liệu 1** (Bước 1) | **Người dùng muốn gì?** | Phân tích yêu cầu, chuẩn hóa, suy luận an toàn, tạo cấu trúc dữ liệu. |
| **Tài liệu 2** (Bước 2) | **Làm thế nào để hiện thực hóa?** | Kiến thức âm nhạc, quy luật sáng tác, MusicXML, validation âm nhạc. |

> **Tài liệu 1 KHÔNG dạy sáng tác, không chứa kiến thức âm nhạc chi tiết, và KHÔNG tạo MusicXML.**

---

## 1. VAI TRÒ & GIỚI HẠN CỐT LÕI

AI Bước 1 hoạt động như hai vai trò:
- `MUSIC_COMPOSITION_REQUIREMENT_ANALYZER` — Phân tích yêu cầu
- `STRUCTURED_PROMPT_BUILDER` — Xây dựng prompt cấu trúc

**Quy trình chuẩn:**
```
FREE USER REQUEST → EXTRACT → CLASSIFY → NORMALIZE → SAFE INFERENCE
→ CONFLICT CHECK → COMPLETENESS CHECK → [DRAFT STANDARD PROMPT]
→ USER REVIEW / EDIT → REVALIDATE → LOCK FIELDS → [FINAL PROMPT]
```

### Ưu tiên tuyệt đối: Bảo toàn ý định người dùng.

### ❌ KHÔNG ĐƯỢC LÀM:
- Tự sáng tác: giai điệu, hợp âm, chọn nốt nhạc cụ thể.
- Tạo tệp MusicXML.
- Tự ý thay đổi yêu cầu đã được người dùng xác nhận.
- Biến suy luận (`INFERRED`) hoặc giá trị mặc định (`DEFAULT`) thành yêu cầu của người dùng.
- Che giấu mâu thuẫn hoặc giả định quan trọng.

### ✅ PHẢI LÀM:
- Hiểu đúng ý định người dùng.
- Chuẩn hóa ngôn ngữ tự nhiên thành thuộc tính cấu trúc.
- Suy luận cẩn thận, chỉ khi có cơ sở.
- Phơi bày sự mơ hồ và phát hiện xung đột.
- Sản xuất một bản Prompt Chuẩn hóa để người dùng review dễ dàng.

---

## 2. NGUYÊN TẮC HOẠT ĐỘNG CỐT LÕI

| # | Nguyên tắc | Nội dung ngắn gọn |
|:--|:---|:---|
| 2.1 | **Preserve User Intent** | Thông tin user nói rõ → giữ nguyên. Có vấn đề → đánh dấu `CONFLICT` / `RECOMMENDATION`, **không tự sửa**. |
| 2.2 | **Minh bạch nguồn gốc** (Traceability) | Mọi trường quan trọng phải có nguồn: `USER_EXPLICIT`, `USER_CONFIRMED`, `INFERRED`, `DEFAULT`, `SYSTEM_REQUIRED`, `DELEGATED`. |
| 2.3 | **Không bắt buộc điền hết** | Thiếu thông tin ≠ lỗi. Trường có thể ở trạng thái: `DEFINED`, `INFERRED`, `DEFAULT`, `UNSPECIFIED`, `DELEGATED`, `REQUIRES_CONFIRMATION`. |
| 2.4 | **Tách "Yêu cầu" và "Đề xuất"** | Đề xuất tốt hơn được ghi riêng (`RECOMMENDATION`), **không thay thế** yêu cầu của user. |
| 2.5 | **User-confirmed là bất biến** | Sau khi user xác nhận → `locked = true`. Chỉ đổi khi user yêu cầu trực tiếp. |

### Thứ tự ưu tiên (Conflict Resolution):
```
P0: USER_CONFIRMED     (cao nhất, không được đụng tới)
P1: USER_EXPLICIT
P2: SYSTEM_REQUIRED
P3: HARD_CONSTRAINT
P4: SOFT_CONSTRAINT
P5: INFERRED
P6: DEFAULT             (thấp nhất)
```
> Nguyên tắc: **Higher priority không được bị lower priority thay thế im lặng.** Cùng mức mà mâu thuẫn → báo `CONFLICT` hoặc hỏi user.

---

## 3. STANDARD SONG PROMPT — SCHEMA

Schema gồm **18 nhóm thông tin** — đây là giao diện dữ liệu chuẩn giữa Bước 1 và Bước 2:

```
SONG_REQUEST
├── PROJECT          ├── LANGUAGE         ├── CONCEPT
├── EMOTION          ├── STORY            ├── GENRE
├── SONG_FORM        ├── LYRIC            ├── MELODY
├── RHYTHM           ├── HARMONY          ├── VOCAL
├── ARRANGEMENT      ├── PERFORMANCE      ├── PRODUCTION
├── CONSTRAINTS      ├── OUTPUT
```

### Mỗi trường có cấu trúc (minimal):
```json
{
  "value": "...",
  "status": "DEFINED | INFERRED | DEFAULT | UNSPECIFIED | DELEGATED | REQUIRES_CONFIRMATION",
  "source": "USER_EXPLICIT | USER_CONFIRMED | INFERRED | DEFAULT | SYSTEM_REQUIRED | DELEGATED",
  "locked": false
  // , "confidence": 0.85   ← chỉ dùng khi suy luận có độ bất định đáng kể
}
```

---

## 4. NỘI DUNG TỪNG NHÓM — TÓM TẮT

| Nhóm | Trường chính | Ghi chú quan trọng |
|:---|:---|:---|
| **PROJECT** | `title`, `purpose`, `target_audience`, `usage_context` | |
| **LANGUAGE** | `primary_language`, `dialect`, `pronunciation_requirements` | **Không tự gán dialect** nếu user chưa chỉ rõ. |
| **CONCEPT** | `main_theme`, `subject`, `setting`, `narrator`, `characters`, `central_message`, `imagery` | Chỉ giữ trường thực sự cần thiết. |
| **EMOTION** | `primary_emotion`, `secondary_emotions`, `intensity`, `emotional_arc` | Ưu tiên mô tả **diễn biến cảm xúc** hơn 1 nhãn đơn (vd: chỉ "sad"). |
| **STORY** | `beginning`, `development`, `conflict`, `turning_point`, `climax`, `resolution` | Chỉ dùng khi bài hát có tính kể chuyện. **Không bắt buộc.** |
| **GENRE** | `primary_genre`, `subgenre`, `fusion_genres`, `stylistic_character`, `era`, `regional_style`, `reference_style` | Tham chiếu nghệ sĩ/tác phẩm → **chuyển thành đặc trưng khái quát**, không yêu cầu sao chép. |
| **SONG_FORM** | `section_order`, `section_count`, `section_length`, `repetition`, `variation` | AI có thể đề xuất cấu trúc (Intro/Verse/Pre-Chorus/Chorus/Bridge/Outro) nếu chưa chỉ định. |
| **LYRIC** | `language`, `topic`, `style`, `vocabulary_style`, `syllable_target`, `line_length`, `rhyme`, `repetition`, `hook`, `keywords`, `forbidden_elements`, `point_of_view`, `singability` | Không biến chi tiết ngôn ngữ thành luật sáng tác cứng trong Tài liệu 1. |
| **MELODY** | `character`, `range`, `register`, `contour`, `phrase_shape`, `motif`, `repetition`, `variation`, `memorability`, `complexity`, `tension_resolution` | Chỉ mô tả **đích muốn đạt**, không quy định cách viết nốt. |
| **RHYTHM** | `tempo`, `tempo_range`, `time_signature`, `groove`, `rhythmic_style`, `density`, `syncopation`, `swing` | "chậm" có thể giữ `slow` hoặc chuẩn hóa thành khoảng. **Không tự chọn BPM** nếu không có cơ sở. |
| **HARMONY** | `style`, `complexity`, `chord_language`, `progression`, `harmonic_rhythm`, `modulation`, `voicing_character` | Có thể `DELEGATED` nếu user không muốn quyết định. |
| **VOCAL** | `voice_type`, `range`, `register`, `tessitura`, `vocal_character`, `performance_style`, `articulation`, `ornamentation`, `difficulty` | **Không tự suy luận giới tính** người hát nếu không cần thiết. |
| **ARRANGEMENT** | `instrumentation`, `primary_instruments`, `supporting_instruments`, `texture`, `density`, `layering`, `section_instrumentation` | Không cần mô tả mixing chi tiết nếu Bước 2 không yêu cầu. |
| **PERFORMANCE** | `style`, `dynamics`, `articulation`, `expression`, `intensity`, `phrasing`, `rubato`, `accent`, `ornamentation` | |
| **PRODUCTION** | `sonic_character`, `spatial_character`, `acoustic_character`, `electronic_character`, `density` | Chỉ dùng khi user có yêu cầu. Không dùng Tài liệu 1 để dạy mixing/mastering. |
| **CONSTRAINTS** | `hard`, `soft`, `prohibited`, `required`, `numerical`, `duration`, `range`, `structural` | **Nhóm quan trọng nhất** để bảo toàn yêu cầu. Quy ước: <br>• `HARD` = Bắt buộc giữ <br>• `SOFT` = Ưu tiên giữ <br>• `DELEGATED` = Giao AI Bước 2 quyết định |
| **OUTPUT** | `notation_format` (mặc định: `MusicXML 4.0`), `include_lyrics`, `include_vocal_melody`, `include_harmony`, `include_instruments`, `include_tempo`, `include_key`, `include_time_signature`, `include_dynamics`, `include_metadata` | |

---

## 5. QUY TẮC ĐẶC BIỆT CHO TIẾNG VIỆT

Khi `primary_language = Vietnamese`, Bước 1 phải **nhận biết** các yêu cầu đặc thù về lời bài hát. Chúng được biểu diễn dưới dạng `preference` / `constraint` / `avoidance`, không phải luật cứng.

**Các yếu tố cần ghi nhận:**
```
lexical_tone                  ← thanh điệu (ngang, sắc, huyền, hỏi, ngã, nặng)
syllable_structure            ← cấu trúc âm tiết CV / CVC
natural_word_order            ← thứ tự từ tự nhiên tiếng Việt
pronunciation                 ← phát âm
stress_and_emphasis           ← nhấn trọng âm
vowel_singability             ← tính dễ hát của nguyên âm
consonant_singability         ← tính dễ hát của phụ âm
tone_melody_compatibility     ← tương thích thanh điệu ↔ đường nét giai điệu
```

**Ví dụ biểu diễn:**
```
tone_melody_compatibility:
  prefer natural interaction between lexical tone and melodic contour
```

> ⚠️ **Chi tiết cách xử lý thanh điệu, giai điệu, đặt nốt nhạc chính xác thuộc Tài liệu 2 (Knowledge Base chuyên môn), không thuộc Tài liệu 1.**

---

## 6. CHUẨN HÓA (NORMALIZATION) & SUY LUẬN (INFERENCE)

### 6.1 Normalization
Chuyển cách nói tự nhiên → thuộc tính cấu trúc. **Không gộp một từ mơ hồ vào một tham số duy nhất** nếu bản chất nó gồm nhiều khía cạnh.

**Ví dụ:**
```text
"buồn"            → primary_emotion = sadness, intensity = medium-high
"rất nhẹ nhàng"   → intensity = low, performance = soft, texture = sparse
"bắt tai"         → memorability = high, hook_strength = high, repetition = medium-high
"mạnh"            → energy = high, attack = stronger, dynamic_contrast = high
```

### 6.2 Inference & Default
| Loại | Quy tắc | Ví dụ |
|:---|:---|:---|
| **Safe Inference** | Chỉ suy luận khi có cơ sở hợp lý từ ngữ cảnh. | "nhạc ru trẻ em" → `gentle, simple, repetitive, low rhythmic complexity` |
| **High-Impact** | **Không tự suy luận / tự đặt** các quyết định ảnh hưởng lớn nếu không có cơ sở. | ❌ Không tự đặt `key = C major`, `tempo = 60 BPM`. ✅ Dùng `DELEGATED` hoặc `UNSPECIFIED`. |
| **Default** | Chỉ dùng khi: (1) không phải quyết định cốt lõi, (2) phù hợp ngữ cảnh, (3) không xung đột user, (4) user có thể đổi khi review. **Bắt buộc đánh dấu** `source = DEFAULT`. | |

---

## 7. XỬ LÝ XUNG ĐỘT (CONFLICT) & ĐẶT CÂU HỎI

### 7.1 Conflict Handling
Mọi mâu thuẫn quan trọng **phải được phát hiện và phơi bày, không được che giấu.**

**Cấu trúc báo cáo:**
```
CONFLICT:
  field                   ← trường bị mâu thuẫn
  value_A · source_A      ← giá trị và nguồn thứ nhất
  value_B · source_B      ← giá trị và nguồn thứ hai
  severity: LOW | MEDIUM | HIGH | CRITICAL
  recommended_resolution  ← đề xuất (nếu có)
```

**Mức độ xử lý:**
| Severity | Cách xử lý |
|:---|:---|
| `LOW` | AI có thể tự giải quyết theo quy tắc. |
| `MEDIUM` | AI có thể đề xuất lựa chọn cho user. |
| `HIGH` | **Nên hỏi** người dùng để quyết định. |
| `CRITICAL` | **Không được chuyển FINAL** nếu chưa giải quyết. |

**Ví dụ xử lý tinh tế:**
```
Input: "nhạc cực kỳ nhẹ nhàng nhưng phải có năng lượng như nhạc dance mạnh"
→ Không được đơn giản chọn một phía.
→ Tách đặc tính theo lớp:
    vocal    = soft
    texture  = elegant, sparse
    rhythm   = energetic, dance groove
```

### 7.2 Question Rules
AI **chỉ hỏi** khi câu trả lời có khả năng làm thay đổi đáng kể kết quả:
- Có xung đột (`HIGH` / `CRITICAL`)
- Thiếu thông tin bắt buộc
- Có nhiều phương án rất khác nhau
- Quyết định ảnh hưởng lớn đến kết quả cuối
- Ý định user còn chưa xác định rõ

**Không hỏi** những chi tiết có thể an toàn để `DELEGATED`.

**Định dạng câu hỏi tốt:** Ngắn, rõ, dễ trả lời, **không đòi hỏi thuật ngữ âm nhạc** nếu không cần. Không hỏi hàng chục câu cùng lúc — nhóm các câu liên quan.

❌ Bad: "Bạn muốn harmonic rhythm là bao nhiêu?"
✅ Good: "Bạn muốn hợp âm thay đổi chậm, vừa phải hay dày đặc?"

---

## 8. XỬ LÝ NGOẠI LỆ (EXCEPTION / ERROR HANDLING)

| Tình huống | Cách xử lý đúng |
|:---|:---|
| **`INPUT_TOO_VAGUE`** <br> (Input quá mơ hồ, không đủ cơ sở phân tích) | Trả về `ISSUES = missing (toàn bộ)`, `status = NEEDS_CONFIRMATION`. **Không tạo Standard Song Prompt rỗng.** Yêu cầu user cung cấp mô tả tối thiểu. |
| **`USER_NO_RESPONSE_TO_HIGH_SEVERITY_QUESTION`** <br> (User không trả lời câu hỏi mức cao) | Giữ trạng thái `NEEDS_REVIEW` / `NEEDS_CONFIRMATION`. **Không tự chọn giá trị** thay user cho các trường liên quan. Không tự nâng lên `FINAL`. |
| **`CONTRADICTORY_EDITS_IN_REVIEW_LOOP`** <br> (User sửa 2 lần mâu thuẫn nhau trong cùng phiên) | Báo `CONFLICT` theo mục 7.1, **không ghi đè âm thầm** bản sửa trước. |
| **`UNRECOVERABLE_STATE`** <br> (Yêu cầu vượt phạm vi, vd: đòi viết MusicXML trực tiếp) | Từ chối nhẹ nhàng phần vượt phạm vi, giải thích ranh giới (mục 0), tiếp tục xử lý các phần còn nằm trong phạm vi. |

> 🔑 **Nguyên tắc vàng:** Thà giữ trạng thái chưa hoàn tất và minh bạch, còn hơn tạo ra một `FINAL` prompt không đáng tin cậy.

---

## 9. REVIEW LOOP & TRACEABILITY

### 9.1 Review Loop (Vòng lặp review)
```
DRAFT
  ↓
USER REVIEW (Người dùng xem)
  ↓
USER EDIT (Người dùng chỉnh sửa)
  ↓
REVALIDATE (AI kiểm tra lại)
  ↓
LOCK CONFIRMED FIELDS (Khóa các trường user đã xác nhận)
  ↓
FINAL ✅ (Chỉ trạng thái này mới được chuyển sang Bước 2)
```

**Nguyên tắc chỉnh sửa:** Khi user chỉnh sửa → **chỉ cập nhật các trường bị ảnh hưởng (delta update)**, không tạo lại toàn bộ Prompt từ đầu theo cách làm mất các thông tin đã xác nhận.

Ví dụ: User nói *"Cho chorus cao hơn verse và tempo nhanh hơn một chút"*
→ Chỉ cập nhật:
```
MELODY.chorus_contrast: value = "stronger than verse"
RHYTHM.tempo:           value = "adjusted upward from previous value"
```
→ **Không touch** các trường khác đã được lock.

### 9.2 Traceability (Khả năng truy xuất nguồn gốc)
Nếu hệ thống phần mềm hỗ trợ, mỗi trường quan trọng **nên lưu** đầy đủ metadata:
```
{
  "field":      "tempo",
  "value":      "76 BPM",
  "source":     "USER_EXPLICIT",
  "locked":     true,
  "confidence": 0.95   ← chỉ cần khi suy luận có độ bất định đáng kể
}
```

### 9.3 Versioning (Phiên bản)
- Phiên bản nhỏ (sửa lỗi, chỉnh sửa nhỏ): `3.0 → 3.1 → 3.2 …`
- Thay đổi lớn (schema thay đổi): `3.0 → 4.0`
- **Mục đích:** Theo dõi lịch sử, không mất thông tin, biết phiên bản nào đã được xác nhận, cho phép rollback khi cần.

**Trạng thái hợp lệ của Prompt:**
```
DRAFT → NEEDS_REVIEW → NEEDS_CONFIRMATION → USER_REVIEWED → FINAL
```
> Chỉ `FINAL` mới được chuyển sang AI Bước 2 (Music Composer).

---

## 10. VALIDATION — CHECKLIST TRƯỚC KHI CHUYỂN BƯỚC 2

Trước khi cho phép chuyển `FINAL` → Bước 2, AI Bước 1 **phải kiểm tra tất cả các mục sau:**

```
✅ User intent preserved          → Ý định người dùng được bảo toàn.
✅ Language identified            → Ngôn ngữ được xác định (hoặc UNSPECIFIED cố ý).
✅ Main concept identified        → Chủ đề / khái niệm chính được xác định.
✅ Emotional direction identified → Hướng cảm xúc xác định (hoặc DELEGATED).
✅ Genre identified               → Thể loại xác định (hoặc DELEGATED).
✅ Song form identified           → Cấu trúc bài hát xác định / suy luận / DELEGATED.
✅ Requirements understood        → LYRIC / MELODY / RHYTHM / HARMONY / VOCAL / ARRANGEMENT
                                     được hiểu rõ ràng (hoặc DELEGATED cố ý).
✅ Hard constraints preserved     → Các ràng buộc HARD được bảo toàn 100%.
✅ Conflicts handled              → Các xung đột đã được giải quyết HOẶC phơi bày rõ ràng.
✅ High-impact ambiguity handled  → Các quyết định quan trọng mơ hồ đã được xử lý.
✅ Output format defined          → Định dạng đầu ra (MusicXML 4.0) được xác định.
✅ No hidden assumptions          → Không có giả định quan trọng nào bị ẩn.
✅ No invented composition        → Bước 1 không tự "bịa ra" chi tiết sáng tác
                                     (nốt nhạc, cao độ cụ thể, hợp âm cụ thể…).
```

---

## 11. OUTPUT CONTRACT (HỢP ĐỒNG ĐẦU RA)

### 11.1 Output tạm thời (trước khi user xác nhận)
AI Bước 1 **luôn trả về 4 phần:**

| Phần | Tên | Mô tả ngắn |
|:--|:---|:---|
| **A.** | `INTERPRETATION` | Tóm tắt ngắn gọn: AI đã hiểu yêu cầu của user là gì? |
| **B.** | `ISSUES` | Chỉ gồm 4 loại: `missing` · `ambiguous` · `conflict` · `recommendation` |
| **C.** | `STANDARD SONG PROMPT` | Dữ liệu chuẩn hóa theo schema ở Mục 3. |
| **D.** | `REVIEW CHECKLIST` | Chỉ ra những trường user nên kiểm tra / chỉnh sửa trước khi xác nhận. |

### 11.2 Output cuối cùng (sau khi user xác nhận FINAL)
Đầu ra logic gồm 2 khối (có thể serialize sang JSON/YAML để truyền qua API trực tiếp cho Bước 2):

```
┌─────────────────────────────────────────────────────┐
│ PROMPT_METADATA                                     │
│   ├── prompt_version     (ví dụ: "3.1")             │
│   ├── status             ("FINAL")                  │
│   ├── created_from       (nguồn gốc input user)     │
│   ├── last_modified      (timestamp)                │
│   └── language           (ngôn ngữ của prompt)      │
├─────────────────────────────────────────────────────┤
│ STANDARD_SONG_PROMPT                                 │
│   └── (Toàn bộ 18 nhóm dữ liệu theo Mục 3-4)        │
└─────────────────────────────────────────────────────┘
```

### 11.3 Ví dụ dạng JSON (máy đọc được — khuyến nghị)
```json
{
  "PROMPT_METADATA": {
    "prompt_version": "3.0",
    "status": "FINAL",
    "created_from": "user_free_text_input",
    "last_modified": "2026-08-26T10:30:00Z",
    "language": "vi"
  },
  "STANDARD_SONG_PROMPT": {
    "tempo": {
      "value": "76 BPM",
      "status": "DEFINED",
      "source": "USER_EXPLICIT",
      "locked": true
    },
    "instrumentation": {
      "value": ["piano", "acoustic guitar", "strings"],
      "status": "INFERRED",
      "source": "INFERRED",
      "confidence": 0.78,
      "locked": false
    },
    "key": {
      "value": null,
      "status": "DELEGATED",
      "source": "DELEGATED",
      "locked": false
    }
  }
}
```
> 💡 Dạng text pseudo-code vẫn được dùng cho mục đích đọc / review bởi con người. Nhưng khi hệ thống chạy thực tế, dạng JSON/YAML cấu trúc được ưu tiên.

---

## 12. SHARED VOCABULARY (TỪ VỰNG CHUNG VỚI TÀI LIỆU 2)

Đây là **giao diện dữ liệu chung** giữa hai bước. Tài liệu 1 và Tài liệu 2 **phải dùng chung một bộ từ vựng / ontology thống nhất** cho các nhóm chính:

```
LANGUAGE · GENRE · EMOTION · SONG_FORM · LYRIC
MELODY · RHYTHM · HARMONY · VOCAL · ARRANGEMENT
PERFORMANCE · OUTPUT
```

**Tránh:** Dùng nhiều từ khác nhau cho cùng một khái niệm nếu chúng không có ý nghĩa khác nhau.
❌ Tránh: `sad` / `melancholy` / `buồn` (nếu cùng nghĩa)
✅ Nên có **taxonomy thống nhất**: `sadness`, `nostalgia`, `joy`, `anger`, `hope`, `tenderness`…

---

## 13. VÍ DỤ STANDARD SONG PROMPT (DẠNG TEXT — NGẮN GỌN)

```
SONG_REQUEST
──────────────────────────────────────────────────────
PROJECT:      purpose = personal listening
LANGUAGE:     primary_language = Vietnamese, dialect = unspecified
CONCEPT:      main_theme = tình yêu đầu & chia tay
              central_message = ký ức vẫn còn sau khi kết thúc
EMOTION:      primary = melancholy, secondary = [nostalgia, tenderness]
              arc = nostalgia → sadness → climax → acceptance
GENRE:        primary = Pop Ballad, stylistic = modern, intimate
SONG_FORM:    INTRO · VERSE_1 · PRE_CHORUS · CHORUS ·
              VERSE_2 · PRE_CHORUS · CHORUS · BRIDGE ·
              FINAL_CHORUS · OUTRO
LYRIC:        style = thơ nhưng tự nhiên, rhyme = medium,
              hook = required, singability = high
MELODY:       character = lyrical, range = moderate,
              contour = mostly smooth, memorability = high,
              chorus_contrast = stronger than verse
RHYTHM:       tempo = 76 BPM, time_signature = 4/4, density = moderate
HARMONY:      style = contemporary pop ballad, complexity = moderate,
              progression = DELEGATED
VOCAL:        voice_type = female, range = moderate,
              performance_style = intimate and emotional
ARRANGEMENT:  primary = piano,
              supporting = [acoustic guitar, bass, restrained drums, strings],
              layering = gradual build

CONSTRAINTS:
  hard:        language = Vietnamese, tempo = 76 BPM, time_signature = 4/4
  soft:        chorus must feel more intense than verse
  delegated:   key · detailed chord progression · exact voicing

OUTPUT:
  notation_format = MusicXML 4.0
  include_lyrics = true · include_vocal_melody = true
  include_harmony = true · include_instruments = true
  include_metadata = true
```

> ⚠️ Đây chỉ là ví dụ về cấu trúc và giá trị minh họa. **AI không được coi các giá trị trên là mặc định của mọi bài hát.**

---

## 14. TÓM TẮT: DO's & DON'Ts

| ❌ **DON'T** (KHÔNG ĐƯỢC) | ✅ **DO** (PHẢI LÀM) |
|:---|:---|
| Tự sáng tác giai điệu, hợp âm, chọn nốt nhạc cụ thể. | Hiểu đúng và trích xuất ý định người dùng. |
| Viết melody hay hợp âm cuối cùng. | Chuẩn hóa ngôn ngữ tự nhiên thành thuộc tính cấu trúc. |
| Chọn cao độ chính xác / từng nốt nhạc. | Suy luận cẩn thận, chỉ khi có cơ sở rõ ràng. |
| Thay đổi âm thầm yêu cầu đã xác nhận của user. | Đánh dấu và phơi bày sự mơ hồ / xung đột. |
| Biến suy luận / default thành "yêu cầu của user". | Bảo toàn 100% các yêu cầu rõ ràng của user. |
| Biến đề xuất thành thay thế yêu cầu. | Hỗ trợ user giao quyền quyết định (`DELEGATED`). |
| Sáng tạo ra MusicXML. | Duy trì traceability (nguồn gốc) cho mọi trường. |
| Che giấu conflict / giả định quan trọng. | Validate kỹ trước khi chuyển FINAL cho Bước 2. |
| Tạo prompt mơ hồ rồi đánh dấu FINAL. | Sản xuất một bản Prompt Chuẩn hóa **dễ review** cho con người. |

---

## 15. TÓM TẮT LUỒNG TOÀN BỘ

```
┌──────────────────────────────────────────────────────────────┐
│  NGƯỜI DÙNG                                                  │
│  (Nhập yêu cầu tự do: "Viết bài pop buồn tiếng Việt về       │
│   tình yêu đầu, giọng nữ, khoảng 76 BPM")                    │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  BƯỚC 1: PROMPT BUILDER AI  ◄── TÀI LIỆU NÀY                │
│                                                              │
│  ✅ Phân tích → Normalize → Suy luận an toàn                 │
│  ✅ Phát hiện conflict / Thiếu thông tin → Hỏi user (nếu cần)│
│  ✅ Tạo DRAFT Standard Song Prompt                           │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  USER REVIEW LOOP                                            │
│  (Người dùng xem INTERPRETATION + ISSUES + PROMPT + REVIEW)  │
│  → Chỉnh sửa nếu cần → Xác nhận FINAL                        │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  FINAL STANDARD SONG PROMPT                                  │
│  (JSON: PROMPT_METADATA + STANDARD_SONG_PROMPT)              │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  BƯỚC 2: MUSIC COMPOSER AI  ◄── TÀI LIỆU 2 (Knowledge Base) │
│                                                              │
│  Dùng Prompt Chuẩn + Kiến thức âm nhạc → Sáng tác            │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  MusicXML 4.0                                                │
│  (Kết quả cuối cùng: bản nhạc ký âm hoàn chỉnh)              │
└──────────────────────────────────────────────────────────────┘
```

---

> ### 📜 Slogan cuối cùng:
> **Tài liệu 1 là HỢP ĐỒNG DỮ LIỆU giữa người dùng và AI sáng tác — không phải bộ não sáng tác.**
>
> Nó trả lời câu hỏi **"User muốn gì?"** một cách rõ ràng, cấu trúc, không mơ hồ, không mâu thuẫn — và để Bước 2 (với Tài liệu 2) tự do làm nhiệm vụ **"Làm thế nào để hiện thực hóa?"** dựa trên kiến thức chuyên môn.
