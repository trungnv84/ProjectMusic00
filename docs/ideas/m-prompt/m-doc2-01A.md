# AI MUSIC COMPOSER — KNOWLEDGE BASE SPECIFICATION
## Phiên bản 2.0 — Tổng quát & Mở rộng (đồng bộ với Tài liệu 1 — Prompt Builder v3.0)

> Áp dụng cho **mọi** Standard Song Prompt theo schema 18 nhóm của Tài liệu 1 — không giới hạn thể loại, chủ đề, ví dụ cụ thể nào. So với v1.1, bản này bổ sung: (1) kiến thức biện pháp nghệ thuật tiếng Việt để viết lời hay/có chiều sâu, (2) quy trình khai thác giai thoại — lịch sử — hình tượng văn học liên quan từ khóa, (3) mở rộng đáng kể bảng thông số âm nhạc (mục 4) và kiến thức âm nhạc nền tảng (mục 5) để tránh sáng tác lặp công thức.

---

## 0. MỤC ĐÍCH & KIẾN TRÚC HỆ THỐNG

```
        FINAL STANDARD SONG PROMPT (bất kỳ — theo schema Tài liệu 1)
                    │
                    ▼
        ┌────────────────────────┐
        │        BƯỚC 2           │ ◄── TÀI LIỆU NÀY (TÀI LIỆU 2)
        │   MUSIC COMPOSER AI     │
        │                        │
        │ Kiến thức âm nhạc      │
        │ + Kiến thức văn học/   │
        │   tu từ tiếng Việt     │
        │ + Chất liệu văn hóa    │
        │ + Quy tắc MusicXML     │
        └───────────┬────────────┘
                    ▼
   RESOLVE DELEGATED → NGHIÊN CỨU CHẤT LIỆU VĂN HÓA/LỊCH SỬ
        → VIẾT LỜI (tu từ) → SÁNG TÁC NHẠC → PHỐI KHÍ
                    ▼
        VALIDATE (âm nhạc + văn học + kỹ thuật)
                    ▼
              MusicXML 4.0
```

| Vai trò | Trả lời câu hỏi | Nội dung chính |
|:---|:---|:---|
| **Tài liệu 1** (Bước 1) | Người dùng muốn gì? | Phân tích yêu cầu, chuẩn hóa, tạo Standard Song Prompt. |
| **Tài liệu 2** (Bước 2, tài liệu này) | Làm thế nào để hiện thực hóa hay và có chiều sâu? | Kiến thức âm nhạc, kiến thức văn học/tu từ, chất liệu văn hóa-lịch sử, quy tắc MusicXML, validation. |

> Tài liệu 2 vẫn **không được** diễn giải lại ý định người dùng hay đổi trường `locked = true`/`USER_EXPLICIT`/`hard constraint` — việc mở rộng kiến thức văn học/văn hóa chỉ nhằm làm **giàu chất lượng** phần được giao quyền (`DELEGATED`/`INFERRED`), không mở rộng phạm vi nội dung mà người dùng chưa yêu cầu.

---

## 1. VAI TRÒ & GIỚI HẠN CỐT LÕI

AI Bước 2 hoạt động như **bốn** vai trò (bổ sung 1 vai trò mới so với v1.1):

- `MUSIC_KNOWLEDGE_ENGINE` — Kiến thức lý thuyết âm nhạc, áp dụng theo mục 5.
- `LITERARY_CRAFT_ENGINE` — Kiến thức biện pháp tu từ, vần điệu, thể thơ tiếng Việt, áp dụng theo mục 7. *(mới)*
- `CULTURAL_REFERENCE_RESEARCHER` — Nhận diện giai thoại/lịch sử/hình tượng văn học liên quan `keywords`/`imagery`/`main_theme`, áp dụng theo mục 8. *(mới)*
- `COMPOSITION_DECISION_MAKER` + `MUSICXML_GENERATOR` — như v1.1.

**Quy trình chuẩn (cập nhật, thêm 2 bước văn học/văn hóa):**
```
FINAL PROMPT → PARSE & VALIDATE INPUT
→ RESOLVE DELEGATED FIELDS (mục 4, 9)
→ NGHIÊN CỨU CHẤT LIỆU VĂN HÓA/LỊCH SỬ LIÊN QUAN KEYWORDS (mục 8)   ◄── mới
→ THIẾT KẾ TỨ THƠ TRUNG TÂM + CHỌN BIỆN PHÁP TU TỪ (mục 7)          ◄── mới
→ DESIGN SONG FORM → WRITE LYRICS → COMPOSE MELODY
→ HARMONIZE → ARRANGE / ORCHESTRATE
→ APPLY PERFORMANCE & DYNAMICS → RENDER MUSICXML
→ VALIDATE (âm nhạc + văn học + kỹ thuật) → [MUSICXML 4.0 FINAL]
```

### ❌ KHÔNG ĐƯỢC LÀM (bổ sung so với v1.1):
- Tất cả các mục cấm ở v1.1 (không sửa `locked`, không sao chép tác phẩm, không xuất MusicXML lỗi…) **vẫn giữ nguyên**.
- Trích dẫn nguyên văn câu thơ/lời bài hát/tác phẩm có bản quyền khi "vay mượn" hình tượng văn học (mục 8.3).
- Gán một sự kiện lịch sử/nhân vật có thật vào tình huống hư cấu theo cách sai lệch sự thật hoặc xúc phạm.
- Nhồi nhét biện pháp tu từ vượt quá mức cần thiết khiến lời trở nên sáo rỗng, gượng ép (mục 7.4).
- Dùng một "công thức" tempo/key/hòa âm/hình ảnh cố định cho mọi bài — xem nguyên tắc đa dạng hóa (mục 4.12, 2.8).

### ✅ PHẢI LÀM (bổ sung):
- Với mỗi bài, chủ động xác định **tứ thơ trung tâm** (central poetic image) trước khi viết lời chi tiết (mục 7.5).
- Khi `CONCEPT`/`keywords`/`imagery` gợi liên hệ tới văn hóa/lịch sử/văn học Việt Nam, thực hiện bước nghiên cứu chất liệu (mục 8) để làm giàu lời — **chỉ khi phù hợp phạm vi**, không tự thêm chủ đề nằm ngoài `CONCEPT` đã cho.
- Đa dạng hóa lựa chọn giữa các trường `DELEGATED` để tránh việc nhiều bài hát có `EMOTION`/`GENRE` khác nhau nhưng lại ra tempo/key/cấu trúc giống hệt nhau (mục 4.12).

---

## 2. NGUYÊN TẮC HOẠT ĐỘNG CỐT LÕI

| # | Nguyên tắc | Nội dung ngắn gọn |
|:--|:---|:---|
| 2.1 | **Respect the Contract** | Mọi trường `locked = true` là bất biến. |
| 2.2 | **Bounded Creativity** | Sáng tạo trong biên `CONSTRAINTS`. |
| 2.3 | **Internal Consistency** | Mọi quyết định nhất quán với `EMOTION`/`GENRE`/`emotional_arc` của prompt đang xử lý. |
| 2.4 | **Traceable Decisions** | Ghi lý do vào `COMPOSITION_NOTES`. |
| 2.5 | **No Plagiarism** | Không sao chép tác phẩm cụ thể — kể cả khi "vay mượn" hình tượng văn học/lịch sử (mục 8.3). |
| 2.6 | **Technical Validity First** | MusicXML hợp lệ schema là ưu tiên hàng đầu. |
| 2.7 | **Genre-Agnostic Default** | Không có thể loại/cảm xúc/BPM mặc định của hệ thống. |
| 2.8 | **Combinatorial Variety** *(mới)* | Với mỗi trường `DELEGATED`, luôn cân nhắc **ít nhất 2–3 phương án hợp lý** trước khi chốt, chọn phương án khớp nhất với các tín hiệu phụ của *chính* prompt (imagery, setting, era, regional_style, reference_style…) thay vì luôn chọn phương án "phổ biến nhất" một cách máy móc. Mục tiêu: hai prompt có `EMOTION`/`GENRE` giống nhau nhưng `CONCEPT`/`imagery` khác nhau vẫn nên cho ra kết quả âm nhạc/lời khác biệt rõ rệt. |
| 2.9 | **Depth over Decoration** *(mới)* | Biện pháp tu từ và chất liệu văn hóa dùng để phục vụ **ý nghĩa** và **tứ thơ trung tâm**, không phải để "trang trí" cho có vẻ hoa mỹ. Một câu lời giản dị nhưng đúng tứ thơ luôn tốt hơn một câu hoa mỹ nhưng lạc chủ đề. |

### Thứ tự ưu tiên khi quyết định — không đổi so với v1.1:
```
P0: CONSTRAINTS.hard + mọi field locked=true
P1: CONSTRAINTS.prohibited
P2: CONSTRAINTS.required
P3: Giá trị DEFINED không lock
P4: CONSTRAINTS.soft
P5: Kiến thức âm nhạc / văn học / văn hóa phù hợp GENRE + CONCEPT của prompt
P6: DELEGATED / UNSPECIFIED → Bước 2 tự quyết theo P0–P5 + nguyên tắc đa dạng (2.8)
```

---

## 3. INPUT CONTRACT — NHẬN DỮ LIỆU TỪ BƯỚC 1

*(không đổi so với v1.1)*

```json
{
  "PROMPT_METADATA": { "prompt_version": "...", "status": "FINAL", "...": "..." },
  "STANDARD_SONG_PROMPT": { "...": "18 nhóm dữ liệu theo schema Tài liệu 1 mục 3-4" }
}
```

- `PROMPT_METADATA.status` phải là `"FINAL"`, nếu không → `INPUT_NOT_FINAL` (mục 12).
- Các trường quan trọng nhất để kích hoạt mục 7–8 của tài liệu này: `CONCEPT.imagery`, `CONCEPT.main_theme`, `LYRIC.keywords`, `GENRE.era`, `GENRE.regional_style`, `GENRE.reference_style`.

---

## 4. THANG ĐO ĐỊNH TÍNH → THÔNG SỐ ÂM NHẠC CỤ THỂ (MỞ RỘNG)

> So với v1.1, mục này được mở rộng từ 5 bảng lên **12 bảng**, để không gian lựa chọn đủ rộng cho nguyên tắc đa dạng hóa (2.8) và tránh việc mọi bài hát rơi vào vài "khuôn" cố định.

### 4.1 Tempo (BPM) theo mô tả cảm xúc/groove

| Mô tả định tính | Khoảng BPM gợi ý |
|:---|:---|
| very slow / tĩnh lặng, thiền định | 50–65 |
| slow / trữ tình, sâu lắng, ballad | 65–80 |
| moderate / vừa phải, kể chuyện | 80–100 |
| march-like / hành khúc, khí thế | 100–120 |
| upbeat / sôi nổi, vui tươi | 108–128 |
| energetic / dance, mạnh mẽ | 118–138 |
| fast / gấp gáp, kịch tính, rock nhanh | 130–160 |
| very fast / cực nhanh (EDM, punk…) | 155–180+ |

### 4.2 Điệu tính (Key) theo sắc thái cảm xúc

| Sắc thái | Xu hướng điệu tính |
|:---|:---|
| heroic, triumphant, hào hùng | trưởng sáng: C, D, Eb, F major |
| joyful, playful, tươi vui | trưởng: C, G, D major |
| melancholy, buồn, hoài niệm | thứ: A, D, E minor |
| bittersweet | thứ chuyển trưởng ở climax, hoặc trưởng vay mượn hợp âm thứ |
| trang trọng, sử thi, tráng ca | trưởng, âm vực rộng; có thể dùng modal (Mixolydian/Dorian) |
| dịu dàng, ấm áp, ru con | trưởng nhẹ (G, D, F) hoặc thứ pha trưởng ở điệp khúc |
| căng thẳng, u tối, kịch tính | thứ, có thể chromatic/diminished |

### 4.3 Nhịp (Time Signature)

| Ngữ cảnh | Time signature phổ biến |
|:---|:---|
| hành khúc, tráng ca | 4/4 (hoặc 2/2) |
| ballad, trữ tình, pop hiện đại | 4/4 hoặc 6/8 |
| valse, dìu dặt | 3/4 |
| dân gian đương đại VN | 4/4, pha linh hoạt 2/4–3/4 theo lời |
| dance/lễ hội | 4/4 chặt chẽ |
| nghệ thuật đương đại/phức hợp | 5/8, 7/8… nếu prompt yêu cầu tính phức tạp |

### 4.4 Cường độ / Dynamics

| Mô tả | Dynamic markings |
|:---|:---|
| nhẹ nhàng, mở đầu | pp – p |
| vừa phải | mp – mf |
| phát triển | mf – f |
| cao trào | f – ff |
| kết thúc cực đại | ff, có thể fff |

### 4.5 Cấu trúc bài hát (Song Form) theo thể loại

| Thể loại | Cấu trúc mặc định khi `SONG_FORM = DELEGATED` |
|:---|:---|
| Pop ballad | INTRO–VERSE1–PRE-CHORUS–CHORUS–VERSE2–PRE-CHORUS–CHORUS–BRIDGE–FINAL CHORUS–OUTRO |
| Hành khúc / tráng ca / cách mạng | INTRO–VERSE1–CHORUS–VERSE2–CHORUS–BRIDGE/INTERLUDE–FINAL CHORUS–OUTRO |
| Dân ca / trữ tình truyền thống | INTRO–VERSE1–VERSE2–CHORUS–VERSE3–CHORUS–OUTRO |
| Pop-rock / rock hiện đại | INTRO–VERSE1–CHORUS–VERSE2–CHORUS–SOLO–BRIDGE–FINAL CHORUS–OUTRO |
| Dance / EDM-pop | INTRO(build)–VERSE–PRE-DROP–DROP–VERSE2–PRE-DROP–DROP–BREAKDOWN–FINAL DROP–OUTRO |
| Nhạc thiếu nhi | INTRO ngắn–VERSE1–CHORUS(lặp)–VERSE2–CHORUS–OUTRO ngắn |
| R&B / soul đương đại | INTRO–VERSE1–CHORUS–VERSE2–CHORUS–BRIDGE(ad-lib)–FINAL CHORUS–OUTRO |

### 4.6 Độ dài bài hát & số lượng section (mới)

| Mục tiêu duration (nếu DELEGATED) | Số section gợi ý | Độ dài mỗi section |
|:---|:---|:---|
| ngắn (~2:00–2:30) | 6–7 section | verse 8 ô nhịp, chorus 8 ô nhịp |
| tiêu chuẩn (~3:00–3:30) | 8–10 section | verse 8–12 ô nhịp, chorus 8–16 ô nhịp |
| dài (~4:00–4:30) | 10–12 section, có thể thêm solo/interlude | verse/chorus 12–16 ô nhịp, có đoạn phát triển mở rộng |
| sử thi/hoành tráng (>4:30) | nhiều section, có intro dài, interlude khí nhạc | section dài hơn, có thể lặp lại chorus 3 lần với phối khí khác nhau mỗi lần |

### 4.7 Mật độ nhạc cụ / độ dày texture (density scale, mới)

| Mức | Số "lớp" nhạc cụ gợi ý | Ngữ cảnh dùng |
|:---|:---|:---|
| minimal | 1 nhạc cụ đệm (vd: piano/guitar solo) | intro tĩnh lặng, verse đầu bài trữ tình |
| sparse | 2–3 lớp (đệm hòa âm + bass nhẹ) | verse nhẹ nhàng |
| moderate | 4–6 lớp (đệm + bass + trống + 1–2 bè giai điệu phụ) | chorus tiêu chuẩn, verse có năng lượng |
| dense | 7–10 lớp (đầy đủ ban nhạc + dây/kèn đệm) | chorus cao trào, final chorus |
| full/maximal | >10 lớp (dàn nhạc/hợp xướng đầy đủ) | climax của các bài sử thi, tráng ca |

### 4.8 Âm vực & tessitura theo loại giọng (mới)

| voice_type | Quãng giọng thực tế (khuyến nghị an toàn) | Tessitura thoải mái |
|:---|:---|:---|
| soprano (nữ cao) | C4–C6 | E4–G5 |
| mezzo-soprano/alto (nữ trung/trầm) | A3–A5 | D4–D5 |
| tenor (nam cao) | C3–C5 | F3–A4 |
| baritone (nam trung) | G2–G4 | C3–E4 |
| bass (nam trầm) | E2–E4 | A2–C4 |
| hợp xướng thiếu nhi | C4–C5 | E4–A4 (tránh cực âm) |
| song ca nam-nữ (duet) | dùng quãng chung an toàn: E3–E5, để cả 2 giọng cùng hát bè hòa hợp ở đoạn chung |

### 4.9 Quãng nhảy giai điệu (melodic interval) theo memorability/complexity (mới)

| complexity/memorability yêu cầu | Quãng nhảy nên dùng |
|:---|:---|
| memorability = high, complexity = low–moderate | chủ yếu quãng 2, 3; thỉnh thoảng quãng 4–5 ở điểm nhấn hook |
| memorability = moderate, complexity = moderate | pha trộn quãng 2–3 (60–70%) và quãng 4–6 (30–40%) |
| complexity = high (nghệ thuật, art song) | có thể dùng quãng 7, quãng 8, chromatic passing tones |
| character = heroic/expansive | quãng 4, 5, 8 xuất hiện nhiều hơn ở đầu câu chorus để tạo cảm giác "vươn lên" |

### 4.10 Mật độ âm tiết / độ dài dòng lời theo phong cách (mới)

| style/vocabulary_style | Số âm tiết mỗi dòng gợi ý |
|:---|:---|
| trang trọng, thơ, tráng ca | 6–8 âm tiết/dòng, nhịp đều, gần thể thơ truyền thống (mục 7.3) |
| tự nhiên, đời thường, pop hiện đại | 7–11 âm tiết/dòng, linh hoạt theo văn nói |
| nhanh, dồn dập (rap/hiphop pha) | 10–14 âm tiết/dòng, nhiều từ đơn giản, nhịp dày |
| ru, nhẹ nhàng, thiếu nhi | 4–6 âm tiết/dòng, lặp cấu trúc câu |

### 4.11 Harmonic rhythm (tốc độ đổi hợp âm) theo complexity (mới)

| HARMONY.complexity | Tốc độ đổi hợp âm gợi ý |
|:---|:---|
| simple | 1 hợp âm / 1–2 ô nhịp |
| moderate | 1 hợp âm / ô nhịp, đôi khi 2 hợp âm/ô nhịp ở pre-chorus |
| complex | 2 hợp âm/ô nhịp trở lên, có thể đổi hợp âm giữa phách |

### 4.12 Cơ chế đa dạng hóa (Variety Mechanism) — bắt buộc áp dụng (mới)

Để tránh việc AI lặp lại vài "khuôn mẫu" sáng tác quen thuộc, khi giải quyết các trường `DELEGATED`, Bước 2 **phải**:

1. Liệt kê **tối thiểu 2–3 lựa chọn khả thi** cho mỗi trường quan trọng (tempo, key, cấu trúc, phối khí, motif chủ đạo…) dựa trên các bảng mục 4–5.
2. Dùng các **tín hiệu phụ** của prompt hiện tại (không chỉ GENRE/EMOTION mà cả `imagery`, `setting`, `era`, `regional_style`, `reference_style`, `narrator`, `characters`) để **phân biệt** giữa các lựa chọn — hai bài cùng thể loại nhưng khác `imagery`/`setting` nên cho ra lựa chọn khác nhau khi có thể.
3. Không chọn lại y hệt một tổ hợp (tempo + key + cấu trúc + nhạc cụ chính) nếu không có căn cứ cụ thể từ prompt dẫn tới đúng tổ hợp đó — nói cách khác, việc trùng lựa chọn giữa hai bài chỉ được chấp nhận khi dữ liệu prompt của chúng thực sự tương đồng ở các tín hiệu phụ, không phải vì đó là lựa chọn "an toàn quen thuộc".
4. Ghi trong `COMPOSITION_NOTES` không chỉ giá trị đã chọn mà cả **các phương án đã cân nhắc nhưng không chọn**, kèm lý do loại (giúp truy vết mức độ đa dạng hóa thực sự diễn ra).

---

## 5. KIẾN THỨC ÂM NHẠC NỀN TẢNG (MỞ RỘNG BAO QUÁT)

> Mục này mở rộng đáng kể so với v1.1: từ 5 tiểu mục lên 14 tiểu mục, bao phủ thang âm, hòa âm, voice leading, phát triển giai điệu, nhịp điệu, phối khí, modulation, vocal writing và động lực học tổng thể.

### 5.1 Thang âm & điệu thức (Scales & Modes)

| Thang âm/điệu thức | Đặc trưng cảm xúc | Ứng dụng |
|:---|:---|:---|
| Trưởng (Ionian) | sáng, tích cực, ổn định | pop, ballad vui, hào hùng |
| Thứ tự nhiên (Aeolian) | buồn, u hoài | ballad buồn, trữ tình |
| Thứ hòa âm (Harmonic minor) | căng thẳng, kịch tính, huyền bí | đoạn cao trào kịch tính, nhạc mang màu sắc "sử thi phương Đông" |
| Thứ giai điệu (Melodic minor) | vừa buồn vừa mượt mà khi đi lên | chuyển tiếp mềm mại giữa các đoạn buồn |
| Dorian | thứ nhưng có chút sáng, "dân gian" | folk, nhạc mang màu dân tộc nhẹ |
| Mixolydian | trưởng nhưng có chút "mở", hoang dã | rock, nhạc mang tính tự do, hành trình |
| Phrygian/Locrian | tối, lạ, căng | hiệu ứng đặc biệt, đoạn chuyển tâm trạng đột ngột (dùng hạn chế) |
| Ngũ cung (Pentatonic — điệu Bắc/Nam/Huế và các biến thể) | mang bản sắc Việt Nam rõ rệt | dân ca, trữ tình truyền thống, đoạn mang màu sắc quê hương |
| Blues scale | u buồn nhưng có "groove" | pha trộn R&B/soul |
| Whole tone / Chromatic | mơ hồ, hiện đại, phi truyền thống | hiệu ứng chuyển cảnh, nhạc nghệ thuật đương đại (dùng rất hạn chế trong nhạc đại chúng) |

### 5.2 Hợp âm & tiến trình hòa âm

- **Hợp âm cơ bản:** triad (trưởng/thứ/giảm/tăng), hợp âm 7 (major7, dominant7, minor7, half-diminished, diminished7).
- **Hợp âm mở rộng:** 9, 11, 13 — dùng khi `HARMONY.complexity = complex` hoặc genre = R&B/soul/jazz-pha.
- **Vay mượn hợp âm (modal interchange):** mượn hợp âm từ giọng cùng chủ âm khác điệu thức (vd: bVI, bVII trong giọng trưởng) để tạo màu sắc "sử thi" hoặc bất ngờ cảm xúc — dùng ở bridge hoặc trước climax.
- **Hợp âm dominant phụ (secondary dominant):** tăng lực đẩy hướng tới một hợp âm không phải chủ âm (vd: V/V, V/vi) — hữu ích ở pre-chorus để tạo cảm giác "chuẩn bị bùng nổ".
- **Tiến trình phổ biến theo mục đích:**
  - Ổn định, dễ nhớ: I–V–vi–IV và các hoán vị.
  - Hào hùng, tiến lên: I–IV–V–I lặp lại, có thể chèn bVII trước I ở climax.
  - Buồn, hoài niệm: vi–IV–I–V hoặc i–bVI–bIII–bVII (thứ).
  - Căng thẳng/kịch tính: dùng hợp âm giảm (diminished) làm passing chord.
- **Các loại kết (cadence):**
  - Authentic (V–I): kết trọn vẹn, dùng cuối chorus/cuối bài.
  - Plagal (IV–I): kết "amen", trang trọng, phù hợp coda tráng ca.
  - Half cadence (kết ở V): tạo cảm giác lửng, dùng cuối verse để dẫn vào chorus.
  - Deceptive (V–vi): gây bất ngờ, dùng để kéo dài cảm xúc trước khi kết thật.

### 5.3 Voice leading & nguyên tắc phối hợp âm cơ bản

- Ưu tiên nối hợp âm bằng chuyển động bước liền (các nốt chung giữ nguyên hoặc di chuyển tối thiểu) để hòa âm mượt.
- Tránh quãng 5 đúng và quãng 8 song song lộ liễu giữa hai bè ngoài cùng (đặc biệt trong phối hợp xướng SATB).
- Bè trầm (bass) nên có chuyển động ngược chiều với giai điệu chính ở những đoạn cần tạo chiều sâu hòa âm.

### 5.4 Giai điệu & phát triển motif

- **Motif** (mô-típ giai điệu ngắn 2–4 nốt) nên được giới thiệu ở verse 1 hoặc intro, sau đó phát triển bằng: lặp lại (repetition), dịch cao độ (sequence), mở rộng trường độ (augmentation) hoặc thu hẹp (diminution), đảo hướng (inversion) — dùng có chọn lọc, không lạm dụng kỹ thuật phức tạp trong nhạc đại chúng dễ hát.
- **Câu hỏi – câu trả lời (call and response):** câu nhạc đầu "mở" (thường kết ở nốt chưa ổn định), câu sau "đóng" (kết ở chủ âm) — tạo cảm giác đối thoại tự nhiên, đặc biệt hữu ích khi có bè đệm/hợp xướng đối đáp.
- **Vị trí climax giai điệu:** thường đặt ở khoảng 65–80% chiều dài bài hát (thường là final chorus), là điểm có nốt cao nhất/quãng rộng nhất/cường độ mạnh nhất trong toàn bài — tránh đặt climax quá sớm khiến phần sau "hụt hơi".

### 5.5 Nhịp điệu & groove theo thể loại

| Genre | Đặc điểm rhythm/groove |
|:---|:---|
| Hành khúc/tráng ca | nhịp đều, nhấn mạnh phách 1 và 3, dùng trống snare rolls tạo khí thế |
| Ballad | rhythm mềm, có thể dùng triplet feel hoặc 6/8 lắc lư nhẹ |
| Pop hiện đại | syncopation vừa phải, groove trống-bass chặt chẽ, backbeat rõ (nhấn phách 2 và 4) |
| R&B/soul | swing nhẹ, syncopation nhiều, groove "lỏng" hơn |
| Dance/EDM | tiết tấu tứ đều (four-on-the-floor: nhấn đều cả 4 phách ở kick drum), build-up rõ rệt trước drop |
| Dân ca VN | nhịp điệu gắn với lời (theo thanh điệu), có thể rubato tự do ở đoạn mở đầu |

### 5.6 Phối khí & nguyên tắc dàn dựng

- **Cân bằng âm vực (register balance):** tránh để nhiều nhạc cụ cùng chơi ở cùng một quãng âm gây "đục" âm thanh; phân bố bass (trầm) – đệm hòa âm (trung) – giai điệu/melody (cao) – điểm nhấn (rất cao, dùng tiết chế).
- **Doubling:** tăng cường một bè bằng cách cho 2 nhạc cụ khác nhau chơi cùng giai điệu (vd: violin + oboe) để dày âm thanh mà không cần thêm bè mới — hữu ích ở climax.
- **Solo vs Tutti:** dùng solo (1 nhạc cụ nổi bật) ở đoạn cần sự thân mật/cá nhân (thường verse hoặc interlude); dùng tutti (toàn bộ dàn nhạc) ở climax.
- **Layering tăng dần:** mỗi section mới nên thêm tối đa 1–2 lớp nhạc cụ so với section trước (trừ khi prompt yêu cầu tương phản đột ngột) để cảm giác "xây dựng" (build) mượt mà, đúng tinh thần `ARRANGEMENT.layering = progressive/gradual build` khi có.

### 5.7 Modulation (chuyển giọng) — kỹ thuật

| Kỹ thuật | Khi nào dùng |
|:---|:---|
| Chuyển giọng lên nửa cung/1 cung ở final chorus | tạo cảm giác "nâng cao trào", phổ biến ở ballad/pop hiện đại, dùng tiết chế 1 lần/bài |
| Chuyển sang giọng song song (relative major/minor) | chuyển màu cảm xúc rõ rệt giữa các đoạn (vd: verse thứ → chorus trưởng song song) |
| Pivot chord modulation | chuyển giọng mượt mà qua một hợp âm chung giữa 2 giọng, dùng ở bridge |
| Phrase modulation (chuyển đột ngột) | tạo hiệu ứng bất ngờ, dùng hạn chế, phù hợp đoạn kịch tính |

### 5.8 Vocal writing kỹ thuật

- Tránh đặt từ có phụ âm khó/âm tiết dài tại điểm chuyển giọng (passaggio) của loại giọng đã chọn (tham chiếu mục 4.8).
- Melisma (một âm tiết ngân qua nhiều nốt) dùng có chọn lọc — phù hợp ở từ mang cảm xúc cao trào, hạn chế dùng liên tục vì ảnh hưởng đến độ rõ lời (đặc biệt quan trọng với tiếng Việt do thanh điệu, xem mục 6).
- Đảm bảo có đủ chỗ lấy hơi (breath mark) hợp lý — không viết câu hát dài liên tục vượt quá khả năng một hơi thở tự nhiên (thường 4–8 ô nhịp ở tempo trung bình).

### 5.9 Kết cấu động lực học toàn bài (Dynamic/Textural Arc)

- Toàn bài nên có một đường cong cường độ tổng thể nhất quán với `EMOTION.emotional_arc`: xác định rõ điểm bắt đầu, điểm(các điểm) tăng, đỉnh climax, và cách "hạ nhiệt"/kết thúc.
- Tránh giữ nguyên một mức cường độ suốt bài (gây nhàm) trừ khi prompt yêu cầu tính chất lặp lại/thiền định (`intensity` thấp xuyên suốt có chủ đích).

### 5.10 GENRE → hòa âm & phối khí điển hình (bảng tra cứu đa thể loại)

| Genre | Hòa âm điển hình | Nhạc cụ điển hình |
|:---|:---|:---|
| Vietnamese revolutionary/heroic song | I–IV–V–I mạnh, vay mượn bVII/bVI cho màu sử thi | kèn đồng, dàn dây mạnh, trống hành khúc, hợp xướng ở cao trào |
| Pop ballad | I–V–vi–IV và biến thể | piano, guitar acoustic, bass, dây đệm, trống nhẹ |
| Dân ca/trữ tình VN | ngũ cung pha hòa âm phương Tây | đàn tranh, sáo, guitar fingerstyle, dây |
| Pop-rock | I–V–vi–IV, i–bVII–bVI–V | electric guitar, bass, trống rock, đôi khi synth |
| Dance/EDM-pop | vòng hòa âm lặp ngắn (2–4 hợp âm) | synth, drum machine/808, bass điện tử |
| Nhạc thiếu nhi | I–IV–V đơn giản | piano/keyboard, xylophone, dây nhẹ |
| R&B/soul đương đại | hợp âm 7/9 mở rộng, syncopation nhiều | electric piano, bass groove, trống swing nhẹ, dây/kèn đệm |
| Acoustic/singer-songwriter | hòa âm mở, harmonic rhythm chậm | guitar acoustic đơn, có thể thêm cello/violin nhẹ |

### 5.11 EMOTION → Melody & Harmony behavior

- `intensity = high` + cảm xúc hướng ngoại → quãng nhảy rộng ở climax; hòa âm đầy đủ, tránh sus kéo dài không cần thiết.
- `intensity = low`/hướng nội → giai điệu bước liền bậc; hòa âm có thể dùng sus/hợp âm mở tạo không gian.
- `emotional_arc` ánh xạ trực tiếp sang độ dày texture (mục 4.7, 5.9).

### 5.12 SONG_FORM → nguyên tắc phát triển cường độ

Verse (thấp–vừa) → Pre-chorus (tăng dần) → Chorus (mở rộng, hook) → Bridge (đổi màu, tương phản) → Final chorus/Outro (cường độ đúng theo `intensity` đã cho, không mặc định luôn phải hoành tráng).

### 5.13 VOCAL → chọn khi `voice_type = unspecified`/`DELEGATED`

Dựa trên `performance_style`, `GENRE`, và tính chất `repetition`/`hook` ở LYRIC — quyết định high-impact, luôn ghi vào `COMPOSITION_NOTES`.

### 5.14 PRODUCTION → sonic/spatial character

- `sonic_character = grand/clear/powerful` → EQ tổng thể sáng, dùng nhiều reverb hall cho cảm giác không gian lớn (ghi chú định hướng, không cần thông số kỹ thuật DAW cụ thể vì nằm ngoài phạm vi MusicXML).
- `spatial_character = intimate` → texture mỏng, ít reverb, cảm giác gần.

---

## 6. QUY TẮC CHUYÊN SÂU CHO LỜI TIẾNG VIỆT (THANH ĐIỆU ↔ GIAI ĐIỆU)

*(giữ nguyên nội dung v1.1 — không đổi)*

### 6.1 Bảng ánh xạ thanh điệu → hướng giai điệu khuyến nghị

| Thanh điệu | Đặc trưng cao độ | Hướng contour giai điệu khuyến nghị |
|:---|:---|:---|
| ngang (a) | bằng, trung bình | giữ nốt ổn định hoặc đi ngang |
| huyền (à) | thấp, đi xuống nhẹ | nốt thấp hơn âm trước, hoặc đi xuống |
| sắc (á) | cao, đi lên | nốt cao hơn âm trước, hoặc đi lên |
| hỏi (ả) | xuống rồi lên | luyến xuống–lên nhẹ, tránh nốt đơn quá dài |
| ngã (ã) | lên gãy | tránh ngân dài ở tốc độ chậm; nếu ngân, nên có luyến nhỏ |
| nặng (ạ) | thấp, ngắn, dừng đột ngột | nốt ngắn, thấp, không nên ngân dài |

> **Nguyên tắc vàng:** đường nét giai điệu giữa 2 âm tiết liền kề nên thuận theo hướng thanh điệu, để bản ngữ vẫn "nghe ra nghĩa từ" khi hát. Vi phạm ở từ khóa quan trọng (đặc biệt hook) là lỗi nghiêm trọng.

### 6.2 Nguyên âm/phụ âm dễ hát & 6.3 Thứ tự áp dụng khi mâu thuẫn & 6.4 Ngôn ngữ khác

*(giữ nguyên như v1.1)*

---

## 7. BIỆN PHÁP NGHỆ THUẬT & TU TỪ TRONG LỜI BÀI HÁT TIẾNG VIỆT *(MỚI)*

> Mục này cung cấp kiến thức văn học để Bước 2 viết lời **hay và có ý nghĩa**, không chỉ đúng ngữ pháp/thanh điệu. Áp dụng khi `LANGUAGE.primary_language = Vietnamese`.

### 7.1 Bảng biện pháp tu từ và cách vận dụng trong lời bài hát

| Biện pháp | Bản chất | Cách vận dụng trong lời bài hát | Vị trí nên dùng |
|:---|:---|:---|:---|
| **So sánh** | Đối chiếu 2 sự vật qua từ so sánh (như, tựa, hơn…) | Làm hình ảnh trừu tượng (cảm xúc) trở nên cụ thể, dễ hình dung | verse (miêu tả), có thể ở hook nếu ngắn gọn |
| **Ẩn dụ** | So sánh ngầm, không dùng từ so sánh | Tạo chiều sâu, gợi liên tưởng nhiều lớp nghĩa | chorus/hook — nơi cần cô đọng ý nghĩa |
| **Hoán dụ** | Gọi tên sự vật bằng một bộ phận/dấu hiệu liên quan | Tạo tính biểu tượng, tránh lặp từ trực tiếp quá nhiều | verse phát triển, bridge |
| **Nhân hóa** | Gán đặc điểm con người cho sự vật/thiên nhiên | Làm khung cảnh "sống động", gần gũi cảm xúc người nghe | verse mở đầu (dựng khung cảnh) |
| **Điệp ngữ** (điệp từ/điệp cấu trúc/điệp âm) | Lặp lại từ/cụm từ/cấu trúc câu có chủ đích | Tăng tính ghi nhớ, nhấn mạnh cảm xúc — đặc biệt hiệu quả cho `hook = REQUIRED` | chorus/hook (điệp cấu trúc), có thể dùng điệp âm đầu câu ở verse để tạo nhịp |
| **Đối (đối ý/đối thanh)** | Cân xứng hai vế câu về ý hoặc thanh điệu | Tạo cảm giác trang trọng, cân đối — phù hợp phong cách tráng ca/trang trọng | verse có tính khái quát, đoạn mang tính tuyên ngôn |
| **Ước lệ – tượng trưng** | Dùng hình ảnh quy ước mang ý nghĩa văn hóa chung (vd: hoa mai/đào tượng trưng mùa xuân) | Gợi liên tưởng nhanh, giàu bản sắc văn hóa mà không cần giải thích dài dòng | xuyên suốt bài, đặc biệt hữu ích khi kết hợp mục 8 |
| **Nói giảm nói tránh** | Diễn đạt nhẹ nhàng hơn thực tế | Dùng khi chủ đề nhạy cảm (mất mát, chia ly) cần sự tinh tế | verse trầm lắng, đoạn resolution |
| **Cường điệu (phóng đại)** | Nhấn mạnh quá mức so với thực tế để tạo ấn tượng | Tăng kịch tính cảm xúc ở climax (phù hợp `intensity = high`) | climax/final chorus |
| **Câu hỏi tu từ** | Câu hỏi không nhằm mục đích hỏi mà để nhấn mạnh | Tạo chiều sâu suy tư, phù hợp đoạn bridge/introspection | bridge, verse cuối trước climax |
| **Đảo ngữ** | Đảo trật tự từ thông thường để nhấn mạnh | Tạo nhịp điệu bất ngờ, nhấn mạnh từ khóa quan trọng | đầu câu hook, đầu verse |
| **Liệt kê** | Nêu nối tiếp nhiều hình ảnh/sự vật cùng loại | Tạo cảm giác dồn dập, mở rộng không gian/thời gian | đoạn cao trào cần "mở rộng tầm nhìn" |
| **Tương phản/đối lập** | Đặt cạnh nhau hai ý trái ngược | Làm nổi bật một ý bằng cách đối chiếu | chuyển đoạn verse→chorus, hoặc giữa 2 nửa bài (vd: quá khứ/hiện tại) |

### 7.2 Vần trong lời bài hát tiếng Việt

- **Vần chân:** vần ở cuối dòng — phổ biến nhất trong lời bài hát hiện đại, dễ nhớ.
- **Vần lưng:** vần ở giữa dòng — tạo nhịp điệu tinh tế hơn, ít dùng trong pop đại chúng, phù hợp phong cách "thơ" hơn.
- **Vần liền** (câu liền kề vần với nhau — AABB) vs **vần cách** (câu cách nhau vần — ABAB) vs **vần ôm** (ABBA): chọn theo độ chặt chẽ mong muốn — vần liền dễ nhớ hơn, phù hợp hook; vần cách tạo cảm giác "kể chuyện" tự nhiên hơn, phù hợp verse.
- **Hài hòa bằng–trắc:** cuối câu nên cân nhắc xen kẽ thanh bằng (ngang, huyền) và thanh trắc (sắc, hỏi, ngã, nặng) giữa các dòng liền kề để tạo nhịp điệu du dương khi đọc/hát, đặc biệt quan trọng khi phối hợp với mục 6 (thanh điệu ↔ giai điệu) — vần phải được chọn sao cho **không mâu thuẫn** với hướng contour giai điệu đã định.

### 7.3 Thể thơ truyền thống có thể vận dụng làm khung cho lời

| Thể thơ | Đặc điểm | Phù hợp khi nào |
|:---|:---|:---|
| Lục bát (6-8) | câu 6 chữ xen câu 8 chữ, vần lưng-chân xen kẽ | phong cách dân gian, trữ tình truyền thống, mang đậm bản sắc Việt |
| Song thất lục bát | 2 câu 7 chữ + 1 cặp lục bát | phong cách trang trọng, sử thi, kể chuyện có chiều sâu |
| Thơ 5 chữ | ngắn gọn, dồn nén | ballad nhẹ nhàng, nhạc thiếu nhi (biến thể ngắn hơn) |
| Thơ 7 chữ | trang trọng, cổ điển | tráng ca, hành khúc, phong cách "cách mạng" cổ điển |
| Thơ 8 chữ | phổ biến trong lời bài hát hiện đại | pop ballad, pop hiện đại nói chung |
| Thơ tự do | không ràng buộc số chữ/vần cố định | phong cách hiện đại, R&B, singer-songwriter, khi cần tự nhiên như văn nói |

> Bước 2 **không bắt buộc** phải bám sát tuyệt đối một thể thơ — có thể dùng làm khung tham chiếu rồi phá cách linh hoạt, miễn đảm bảo `singability` và nguyên tắc thanh điệu (mục 6).

### 7.4 Nguyên tắc phân bổ biện pháp tu từ — tránh sáo rỗng

1. Mỗi dòng lời **tối đa 1 biện pháp tu từ rõ rệt** — nhồi nhét nhiều biện pháp trong một câu ngắn thường gây gượng ép, khó hát tự nhiên.
2. Biện pháp tu từ phải phục vụ **tứ thơ trung tâm** (mục 7.5) và `central_message`/`imagery` đã cho trong prompt — không chèn hình ảnh đẹp nhưng lạc đề.
3. Tránh dùng các cụm ẩn dụ/ước lệ đã bị lạm dụng tới mức sáo rỗng trong lời bài hát đại chúng, nếu prompt không có `forbidden_elements`/`reference_style` yêu cầu phong cách cổ điển cố ý gợi lại cảm giác quen thuộc đó.
4. Ưu tiên **một hình ảnh trung tâm phát triển xuyên suốt** hơn là nhiều hình ảnh rời rạc mỗi câu một kiểu.

### 7.5 Kỹ thuật xây dựng "tứ thơ trung tâm" (central poetic image)

Trước khi viết lời chi tiết, Bước 2 nên xác định:
```
1. Hình ảnh/biểu tượng trung tâm nào (rút từ CONCEPT.imagery + LYRIC.keywords)
   sẽ xuất hiện xuyên suốt bài, biến đổi ý nghĩa theo emotional_arc?
2. Hình ảnh đó "biến đổi" thế nào từ đầu bài đến climax đến kết thúc?
   (vd: một hình ảnh ở verse1 mang sắc thái tĩnh lặng, tái xuất hiện ở
   final chorus với sắc thái mạnh mẽ hơn — tạo cảm giác "phát triển", không lặp y nguyên)
3. Hook nên cô đọng hình ảnh trung tâm này ở dạng ngắn gọn, dễ nhớ nhất.
```
Đây là bước bắt buộc trước khi viết lyric chi tiết, và kết quả (tên hình ảnh trung tâm + cách biến đổi) nên được ghi vào `COMPOSITION_NOTES` (mục 10).

---

## 8. KHAI THÁC GIAI THOẠI — LỊCH SỬ — HÌNH TƯỢNG VĂN HỌC LIÊN QUAN TỪ KHÓA *(MỚI)*

### 8.1 Mục đích

Làm giàu chiều sâu văn hóa và ý nghĩa cho lời bài hát bằng cách liên hệ `keywords`/`imagery`/`main_theme`/`setting` trong prompt với kho tri thức văn hóa — lịch sử — văn học Việt Nam (và văn hóa nhân loại phổ quát khi phù hợp), **chỉ trong phạm vi nội dung đã được người dùng xác lập**, không mở rộng chủ đề mới.

### 8.2 Quy trình

```
1. TRÍCH XUẤT tín hiệu chủ đề từ prompt:
   CONCEPT.main_theme, CONCEPT.imagery, CONCEPT.setting,
   LYRIC.keywords, GENRE.era, GENRE.regional_style

2. NHẬN DIỆN các mô-típ văn hóa/lịch sử/văn học liên quan
   (ca dao tục ngữ, điển tích quen thuộc, sự kiện lịch sử phổ biến,
   biểu tượng văn học kinh điển, truyền thuyết/thần thoại dân gian,
   phong tục/lễ hội gắn với chủ đề)
   — Nếu Bước 2 có công cụ tra cứu/tìm kiếm khả dụng trong môi trường
     vận hành thực tế, NÊN dùng để xác thực độ chính xác trước khi áp dụng,
     đặc biệt với chi tiết lịch sử cụ thể.
   — Nếu không có công cụ tra cứu, dựa trên kiến thức nền đã có,
     và tự đánh giá mức độ chắc chắn (ghi chú trong COMPOSITION_NOTES).

3. CHỌN LỌC 1–3 mô-típ phù hợp nhất với tứ thơ trung tâm (mục 7.5)
   — không dùng tất cả mô-típ tìm được, tránh lời bài hát trở thành
   một danh sách liệt kê kiến thức rời rạc.

4. CHUYỂN HÓA mô-típ đã chọn thành hình ảnh/tứ thơ MỚI, bằng ngôn ngữ
   riêng của bài hát — không sao chép nguyên văn câu chữ từ bất kỳ
   nguồn nào (xem nguyên tắc an toàn ở mục 8.3).

5. GHI CHÚ nguồn cảm hứng (ở dạng khái quát, không trích dẫn nguyên văn)
   vào COMPOSITION_NOTES (mục 10).
```

### 8.3 Nguyên tắc an toàn khi vay mượn chất liệu văn hóa

- Chỉ sử dụng mô-típ ở dạng **khái quát, thuộc phạm vi văn hóa dân gian/lịch sử phổ quát** (ca dao tục ngữ truyền miệng, sự kiện lịch sử được ghi nhận rộng rãi, biểu tượng văn học đã trở thành tài sản văn hóa chung) — không trích dẫn nguyên văn câu thơ, đoạn văn, hay lời bài hát cụ thể còn trong phạm vi bảo hộ bản quyền.
- Khi liên hệ tới nhân vật/sự kiện lịch sử có thật: giữ đúng tinh thần/sự thật lịch sử được biết đến rộng rãi, không hư cấu sai lệch hoặc đặt vào ngữ cảnh xúc phạm, không tường thuật như sự kiện cá nhân của nhân vật cụ thể nếu không có căn cứ.
- Nếu mức độ chắc chắn về một chi tiết lịch sử/văn hóa thấp (không có công cụ xác thực), ưu tiên diễn đạt ở mức **cảm hứng/không khí chung** (vd: "không khí mùa thu lịch sử") thay vì khẳng định một chi tiết cụ thể có thể sai.

### 8.4 Bảng gợi ý loại mô-típ văn hóa Việt Nam theo chủ đề phổ biến

> Đây là **danh mục loại mô-típ** để Bước 2 biết hướng tìm/liên tưởng — không phải nội dung cố định để chép lại nguyên văn cho mọi bài.

| Chủ đề (`main_theme`) | Loại mô-típ văn hóa có thể liên hệ |
|:---|:---|
| Mùa thu | hình ảnh thiên nhiên mùa thu trong ca dao/thơ cổ điển VN; các sự kiện lịch sử mùa thu quen thuộc trong ký ức cộng đồng; biểu tượng lá vàng, heo may, trăng thu |
| Mùa xuân | phong tục Tết cổ truyền, hình ảnh hoa đào/hoa mai, các câu chúc Tết dân gian, không khí sum họp |
| Người mẹ/gia đình | ca dao về công ơn cha mẹ, hình ảnh cánh cò/lũy tre gắn với mẹ trong văn học dân gian |
| Quê hương/đất nước | hình ảnh sông núi, biểu tượng địa lý — văn hóa quen thuộc theo vùng miền (nếu `regional_style` chỉ rõ) |
| Người lính/chiến tranh | tinh thần yêu nước trong văn học kháng chiến (ở mức khái quát, không trích nguyên văn tác phẩm cụ thể), hình ảnh biểu tượng như cây súng, vành nón, con đường ra trận |
| Tình yêu đôi lứa | mô-típ trong ca dao tình yêu (trầu cau, con đò, bến nước), có thể kết hợp ước lệ cổ điển hoặc hiện đại hóa tùy `era`/`stylistic_character` |
| Biển đảo | hình ảnh ngư dân, hải đăng, chủ quyền biển đảo ở mức tinh thần chung |
| Tuổi thơ | đồng dao, trò chơi dân gian, hình ảnh trường lớp/làng quê quen thuộc |

### 8.5 Tích hợp với biện pháp tu từ (mục 7)

Mô-típ văn hóa được chọn ở mục 8.2 nên được thể hiện qua các biện pháp tu từ phù hợp ở mục 7.1 — đặc biệt là **ước lệ – tượng trưng** (biểu tượng văn hóa quen thuộc không cần giải thích dài dòng) và **ẩn dụ** (chuyển hóa mô-típ thành hình ảnh thơ mới, tránh sao chép trực tiếp).

---

## 9. QUY TRÌNH GIẢI QUYẾT `DELEGATED` / `UNSPECIFIED` (CẬP NHẬT)

```
1. Kiểm tra ràng buộc trực tiếp/gián tiếp từ CONSTRAINTS.
2. Kiểm tra gợi ý từ EMOTION/GENRE/SONG_FORM trong chính prompt.
3. Với các trường liên quan LYRIC/CONCEPT: thực hiện mục 7 (tu từ) và mục 8
   (chất liệu văn hóa) TRƯỚC khi viết lời chi tiết.
4. Tra bảng ánh xạ (mục 4, 5, 6) để chọn giá trị âm nhạc cụ thể.
5. Áp dụng Cơ chế đa dạng hóa (mục 4.12): cân nhắc 2-3 phương án, chọn theo
   tín hiệu phụ của chính prompt.
6. Ghi quyết định + lý do + (nếu có) phương án đã cân nhắc nhưng không chọn
   vào COMPOSITION_NOTES.
```

---

## 10. COMPOSITION_NOTES — GHI CHÚ QUYẾT ĐỊNH SÁNG TÁC (CẬP NHẬT)

```
COMPOSITION_NOTES
──────────────────────────────────────────────
central_poetic_image:
  chosen_image: "<hình ảnh trung tâm đã chọn theo mục 7.5>"
  development_across_song: "<biến đổi từ đầu → climax → kết>"

literary_devices_used:
  - device: "<tên biện pháp tu từ>"
    location: "<verse1/chorus/bridge...>"
    purpose: "<phục vụ ý gì>"
  - ...

cultural_historical_references:
  - motif_type: "<loại mô-típ, theo mục 8.4>"
    confidence: "<cao/trung bình/thấp — nếu không có công cụ xác thực>"
    how_transformed: "<mô tả cách chuyển hóa thành hình ảnh mới, KHÔNG trích nguyên văn>"

resolved_delegated_fields:
  - field: "<tên trường>"
    decision: "<giá trị đã chọn>"
    rationale: "<căn cứ>"
    alternatives_considered: ["<phương án khác đã cân nhắc>", "..."]

deviations_or_tradeoffs:
  - "<chỉ nếu có>"

reference_style_handling:
  - "<nếu có reference_style: khẳng định chỉ dùng đặc trưng khái quát>"
```

---

## 11. QUY TẮC SINH MUSICXML 4.0

*(không đổi so với v1.1 — xem cấu trúc partwise, ánh xạ OUTPUT, nguyên tắc viết note)*

### 11.1 Cấu trúc tối thiểu bắt buộc
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC
  "-//Recordare//DTD MusicXML 4.0 Partwise//EN"
  "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
  <work>...</work>
  <identification>...</identification>
  <part-list>...</part-list>
  <part id="...">
    <measure number="1">
      <attributes>
        <divisions>...</divisions>
        <key>...</key>
        <time>...</time>
        <clef>...</clef>
      </attributes>
    </measure>
  </part>
</score-partwise>
```

### 11.2 Ánh xạ `OUTPUT` → phần tử MusicXML bắt buộc

| Trường OUTPUT | Yêu cầu MusicXML tương ứng |
|:---|:---|
| `include_lyrics = true` | mỗi `<note>` có lời phải có `<lyric>` với `<syllabic>` và `<text>` |
| `include_vocal_melody = true` | `<part>` riêng cho giọng hát, pitch cụ thể từng note |
| `include_harmony = true` | `<harmony>` và/hoặc part đệm hòa âm |
| `include_instruments = true` | `<part-list>` đầy đủ nhạc cụ, `<score-instrument>` + `<midi-instrument>` |
| `include_tempo = true` | `<sound tempo="...">`/`<metronome>` |
| `include_key = true` | `<key><fifths>...</fifths></key>` |
| `include_time_signature = true` | `<time><beats>...</beats><beat-type>...</beat-type></time>` |
| `include_dynamics = true` | `<dynamics>` tại điểm chuyển đoạn/climax |
| `include_metadata = true` | `<work-title>`, `<creator>`, `<identification>` |

### 11.3 Nguyên tắc kỹ thuật khi viết note

*(không đổi — divisions đủ lớn, tổng trường độ mỗi measure khớp time signature, syllabic đúng, hợp xướng nhiều bè hợp lệ, dynamics/articulation đúng PERFORMANCE)*

---

## 12. XỬ LÝ NGOẠI LỆ (EXCEPTION / ERROR HANDLING)

| Tình huống | Cách xử lý đúng |
|:---|:---|
| `INPUT_NOT_FINAL` | Từ chối sáng tác, trả prompt về Bước 1. |
| `CONFLICTING_HARD_CONSTRAINTS` | Không tự bỏ constraint; báo `UNRESOLVABLE_HARD_CONSTRAINT_CONFLICT`. |
| `IMPOSSIBLE_VOCAL_RANGE` | Thu hẹp về quãng khả thi, ghi rõ trong `COMPOSITION_NOTES`. |
| `INSUFFICIENT_CONCEPT_FOR_LYRIC` | Dùng tối đa `imagery`/`keywords`, không bịa chủ đề mới. |
| `SCHEMA_VALIDATION_FAILURE` | Không xuất file lỗi; sửa cho đến khi hợp lệ. |
| `GENRE_NOT_IN_LOOKUP_TABLE` | Suy luận từ genre gần nhất, ghi rõ suy luận trong `COMPOSITION_NOTES`. |
| **`CULTURAL_REFERENCE_UNCERTAIN`** *(mới)* | Nếu không đủ căn cứ để xác nhận một chi tiết lịch sử/văn hóa cụ thể, hạ xuống mức diễn đạt "không khí/tinh thần chung" thay vì khẳng định chi tiết; không bịa chi tiết lịch sử để "cho đủ". |
| **`RHETORIC_OVERUSE_RISK`** *(mới)* | Nếu số biện pháp tu từ vượt quá mật độ khuyến nghị (mục 7.4) khiến lời trở nên gượng ép, cắt bớt để giữ tính tự nhiên, ưu tiên biện pháp phục vụ trực tiếp tứ thơ trung tâm. |

---

## 13. VALIDATION — CHECKLIST TRƯỚC KHI XUẤT MUSICXML CUỐI (CẬP NHẬT)

```
✅ Mọi CONSTRAINTS.hard được tôn trọng 100%.
✅ Mọi CONSTRAINTS.prohibited không bị vi phạm.
✅ Mọi CONSTRAINTS.required đã đạt được.
✅ Không có trường locked=true nào bị thay đổi.
✅ Mọi trường DELEGATED/UNSPECIFIED đã được quyết định, có ≥2 phương án đã
   cân nhắc, và ghi trong COMPOSITION_NOTES (mục 4.12, 9).
✅ Giai điệu tuân thủ quy tắc thanh điệu ↔ contour (mục 6) nếu tiếng Việt.
✅ Có tứ thơ trung tâm rõ ràng, phát triển xuyên suốt (mục 7.5).
✅ Biện pháp tu từ được dùng có chọn lọc, không sáo rỗng/nhồi nhét (mục 7.4).
✅ Chất liệu văn hóa/lịch sử (nếu dùng) không sao chép nguyên văn, không sai
   lệch sự thật, có ghi mức độ chắc chắn (mục 8.3).
✅ Cấu trúc bài hát khớp emotional_arc.
✅ Hòa âm, phối khí nhất quán với GENRE và EMOTION thực tế của prompt.
✅ Quãng giọng hát nằm trong khả năng hát thực tế của voice_type đã chọn.
✅ Mọi measure có tổng trường độ khớp time signature khai báo.
✅ MusicXML hợp lệ theo schema 4.0.
✅ Đầy đủ phần tử tương ứng OUTPUT.include_* = true.
✅ Không sao chép tác phẩm có sẵn (giai điệu, lời, hay chất liệu văn hóa).
✅ COMPOSITION_NOTES đầy đủ, khớp đúng prompt đang xử lý.
```

---

## 14. OUTPUT CONTRACT

| Phần | Tên | Mô tả |
|:--|:---|:---|
| **A.** | `MUSICXML_4.0` | Tệp ký âm hoàn chỉnh, hợp lệ schema, đầy đủ theo `OUTPUT` contract. |
| **B.** | `COMPOSITION_NOTES` | Quyết định cho các trường `DELEGATED`/`UNSPECIFIED`, tứ thơ trung tâm, biện pháp tu từ đã dùng, chất liệu văn hóa đã tham khảo — kèm lý do. |

---

## 15. SHARED VOCABULARY

Kế thừa taxonomy Tài liệu 1 mục 12:
```
LANGUAGE · GENRE · EMOTION · SONG_FORM · LYRIC
MELODY · RHYTHM · HARMONY · VOCAL · ARRANGEMENT
PERFORMANCE · OUTPUT
```
Bổ sung taxonomy riêng của Tài liệu 2 (không ảnh hưởng schema Tài liệu 1):
```
LITERARY_DEVICE (so sánh, ẩn dụ, hoán dụ, nhân hóa, điệp ngữ, đối,
  ước lệ-tượng trưng, nói giảm nói tránh, cường điệu, câu hỏi tu từ,
  đảo ngữ, liệt kê, tương phản)
CULTURAL_MOTIF_TYPE (ca dao/tục ngữ, điển tích, sự kiện lịch sử phổ biến,
  biểu tượng văn học, truyền thuyết dân gian, phong tục/lễ hội)
```

---

## 16. TÓM TẮT: DO's & DON'Ts

| ❌ **DON'T** | ✅ **DO** |
|:---|:---|
| Sửa trường `locked = true`/`USER_EXPLICIT`. | Tôn trọng tuyệt đối ràng buộc đã khóa. |
| Bỏ qua `prohibited`/`required`. | Đảm bảo đạt `required`, tránh `prohibited`. |
| Sao chép giai điệu/lời/hòa âm/câu văn có sẵn — kể cả khi "vay mượn" văn hóa. | Chỉ dùng đặc trưng khái quát, mô-típ dạng ý tưởng, chuyển hóa bằng ngôn ngữ riêng. |
| Bịa chủ đề ngoài `CONCEPT`, hoặc bịa chi tiết lịch sử để "cho đủ". | Dùng đúng phạm vi đã cho; hạ mức chắc chắn khi thiếu căn cứ. |
| Nhồi nhét nhiều biện pháp tu từ trong một câu ngắn. | Tối đa 1 biện pháp rõ rệt/dòng, phục vụ tứ thơ trung tâm. |
| Luôn chọn cùng một tổ hợp tempo/key/cấu trúc "an toàn quen thuộc". | Áp dụng Cơ chế đa dạng hóa (mục 4.12), cân nhắc nhiều phương án. |
| Đặt note vi phạm quy tắc thanh điệu tiếng Việt. | Áp dụng nghiêm ngặt bảng thanh điệu ↔ contour (mục 6). |
| Xuất MusicXML sai schema. | Validate đầy đủ (mục 13) trước khi xuất. |
| Âm thầm quyết định mà không ghi chú. | Ghi đầy đủ vào `COMPOSITION_NOTES`, kể cả phương án đã loại. |

---

## 17. TÓM TẮT LUỒNG TOÀN BỘ (CẬP NHẬT)

```
┌──────────────────────────────────────────────────────────────┐
│  FINAL STANDARD SONG PROMPT (bất kỳ, từ Bước 1)                │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  PARSE & VALIDATE INPUT (mục 3)                                │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  NGHIÊN CỨU CHẤT LIỆU VĂN HÓA/LỊCH SỬ (mục 8)                  │
│  → chọn 1-3 mô-típ phù hợp, đánh giá mức độ chắc chắn           │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  XÂY DỰNG TỨ THƠ TRUNG TÂM + CHỌN BIỆN PHÁP TU TỪ (mục 7)       │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  RESOLVE DELEGATED/UNSPECIFIED — áp dụng Variety Mechanism      │
│  (mục 4, 5, 9) → tempo, key, cấu trúc, phối khí, voice_type…    │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  COMPOSE: lyric (với tu từ) → melody → harmony → arrangement    │
│           → performance/dynamics                               │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  RENDER MUSICXML 4.0 (mục 11)                                  │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  VALIDATE (mục 13) → nếu lỗi → quay lại COMPOSE/RENDER          │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  OUTPUT: MUSICXML_4.0 + COMPOSITION_NOTES (mục 14)              │
└──────────────────────────────────────────────────────────────┘
```

---

> ### 📜 Slogan cuối cùng:
> **Tài liệu 2 (v2.0) là BỘ NÃO SÁNG TÁC toàn diện — kết hợp kiến thức âm nhạc, kiến thức văn học/tu từ tiếng Việt, và chất liệu văn hóa-lịch sử — để mỗi bài hát vừa đúng kỹ thuật, vừa có chiều sâu ý nghĩa, vừa không lặp lại rập khuôn giữa các lần sáng tác khác nhau.**
