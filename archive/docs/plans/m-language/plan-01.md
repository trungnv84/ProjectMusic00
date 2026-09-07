# KẾ HOẠCH DỰ ÁN M-LANGUAGE v0.1

> **Tên dự án:** M-Language / Song DSL / Vietnamese Music Script (Tên chính thức sẽ thống nhất sau)
> **Mục tiêu:** Xây dựng một **ngôn ngữ hình thức trung gian** (Intermediate Representation) + **Bộ quy tắc** (Rule Engine) để mã hóa toàn bộ pipeline: ngôn ngữ tự nhiên → lời ca → giai điệu → kỹ thuật hát → hòa âm → phối khí → biểu diễn, độc lập với AI provider.
> **Prototype ngôn ngữ:** Tiếng Việt (có 6 thanh điệu, là test case tuyệt vời cho bài toán `syllable + tone + rhyme + melody`)
> **Ngày tạo:** 2026-08-24

---

## 1. TỔNG QUAN VÀ TẦM NHÌN

### 1.1 Vấn đề cần giải quyết

Các hệ thống AI Music hiện tại (Suno, Udio, ACE-Step, Eleven Music) tồn tại các điểm yếu:
- ❌ **Blackbox End-to-End:** Không thể sửa chi tiết ("giữ nguyên melody, đổi câu 3")
- ❌ **Bỏ qua thanh điệu:** Tiếng Việt bị "cưỡng âm" / "trại giọng" do AI không hiểu contour thanh điệu
- ❌ **Không tái sử dụng:** Mỗi provider có format riêng, lock-in nghiêm trọng
- ❌ **Thiếu kiểm soát:** Không thể enforce luật vần, luật thơ, thể loại nhạc cụ thể
- ❌ **Prompt không đủ mạnh:** LLM chỉ nhớ được luật qua prompt, không kiểm tra được compiler-style

### 1.2 Giải pháp đề xuất: Song Compiler kiến trúc nhiều lớp

```
USER (Ý tưởng tự nhiên)
  │
  ▼
LLM DIRECTOR (Chuyển ý tưởng thành cấu trúc)
  │
  ▼
┌─────────────────────────────────┐
│  Song DSL / Music IR (TẦM QUAN  │
│  TRỌNG TÂM - ĐỘC LẬP PROVIDER)  │
└─────────────────┬───────────────┘
                  │
    ┌─────────────┼──────────────┐
    ▼             ▼              ▼
Language      Melody        Harmony
Engine        Engine         Engine
(Language    (Tone→Pitch,   (Chord Prog,
 Rules)       Duration)      Voicing)
    │             │              │
    └─────────────┼──────────────┘
                  ▼
        Performance IR
           (Kỹ thuật hát, 
            Nhạc cụ, Mix)
                  │
                  ▼
┌─────────────────────────────────┐
│  Rendering Engine (Adapter)     │
│  ├─ MusicXML / MIDI             │
│  ├─ GPT/Claude/Gemini           │
│  ├─ ACE-Step / Eleven / Suno    │
│  ├─ DiffSinger / OpenUTAU       │
│  └─ VST / DAW                   │
└─────────────────────────────────┘
                  │
                  ▼
               SONG FINAL
```

### 1.3 Nguyên tắc thiết kế cốt lõi (5 nguyên tắc)

| STT | Nguyên tắc | Giải thích |
|-----|-----------|-----------|
| 1 | **DSL là bộ não, AI là cơ quan thực thi** | Không để AI tự do "đoán", mà đưa ra constraint + creative search space |
| 2 | **Hard rules + Soft rules (weights)** | Không 100% cứng nhắc - bài hát hay cần phá luật ở đúng chỗ |
| 3 | **Rule-based validation loop** | AI sinh → Rule Engine kiểm tra → AI sửa → Validate cuối cùng |
| 4 | **Đơn vị nguyên tử = Âm tiết (Syllable)** | Mỗi âm tiết mang đủ 4 lớp info: Ngôn ngữ + Giai điệu + Kỹ thuật + Hòa âm |
| 5 | **MusicXML/MIDI là target, không phải source** | Tự có DSL riêng, compile sang MusicXML/MIDI làm output chuẩn |

---

## 2. CHIA NHỎ 53 VẤN ĐỀ CẦN THẢO LUẬN

> ⚠️ **HƯỚNG DẪN SỬ DỤNG:** Mỗi mục dưới đây là 1 điểm cần thống nhất trước khi code. Team hãy đánh dấu cột `Trạng thái` thành ✅(đồng ý)/❌(từ chối)/⏳(chưa quyết định) và note `Comment` ngay.

---

### 2.1 NHÓM L: NGÔN NGỮ HỌC (Linguistic Layer) - 7 vấn đề

| # | Vấn đề | Mô tả ngắn gọn | Dữ liệu từ ideas | Ưu tiên | Trạng thái | Comment |
|---|--------|---------------|-----------------|--------|----------|----------|
| L1 | **Syllable Parser chuẩn tiếng Việt** | Tách 1 âm tiết → 4 thành phần: `onset` (phụ âm đầu: ng/tr/th...) + `nucleus` (nguyên âm chính/đôi/ba: iê/ươ...) + `coda` (phụ âm cuối: ng/nh/n...) + `tone` (6 thanh) | m-idea-01 mục3, m-idea-02 mục VMS Tầng1, m-idea-03 mục2.1 | P0 | ⏳ | |
| L2 | **6 thanh điệu → Pitch Contour chuẩn hóa** | Định nghĩa chính xác đường nét cao độ vật lý cho từng thanh (không chỉ cảm tính). Nên làm nghiên cứu audio thực tế, không chỉ dựa trên lý thuyết | m-idea-01 mục4, m-idea-03 mục2.1 + 2.2, m-idea-05 Tầng2 Bảng Pitch Bend | P0 | ⏳ | Rủi ro cao nếu làm sai → cưỡng âm |
| L3 | **Luật Bằng-Trắc & Vần thơ truyền thống** | Bằng=ngang+huyền, Trắc=hỏi+ngã+sắc+nặng; Vần chính/vần thông/vần lưng/vần chân; Hỗ trợ thể thơ cố định: lục bát (6-8), song thất lục bát (7-7-6-8), thất ngôn bát cú | m-idea-01 mục5+6, m-idea-03 mục2.3, m-idea-04 mục1, m-idea-05 Tầng1 | P1 | ⏳ | |
| L4 | **Tone-Melody Correspondence Rules (CỐT LÕI)** | Luật ánh xạ hướng thanh điệu → hướng nốt nhạc. Theo nghiên cứu Kirby&Ladd 2016: Similar motion (cùng chiều) ~77%, Oblique (1 bên ngang) chấp nhận được, Contrary (ngược chiều) hạn chế mạnh | m-idea-01 mục4, m-idea-02 mục Rule A/B/C/D, m-idea-03 mục2.2, m-idea-04 mục2 | P0 | ⏳ | Thảo luận LUẬT CỨNG vs WEIGHTS (soft 0-1) |
| L5 | **Rhyme Engine** | Phát hiện nhóm vần tự động theo phần vần (bỏ phụ âm đầu); Kiểm tra vần theo cấu trúc đã khai báo (ABAB, AABB, lục-bát...) | m-idea-01 mục5, m-idea-03 mục2.3, m-idea-05 Tầng1 | P1 | ⏳ | |
| L6 | **Grapheme-to-Phoneme (G2P) cho Tiếng Việt** | Ánh xạ chữ viết → âm vị chuẩn cho vocal synthesizer (CVVC/VCV format cho OpenUTAU/DiffSinger). Thuật toán: Longest Prefix Match (bắt `ngh` trước rồi mới `ng`) | m-idea-02 Phần Golang G2P, m-idea-02 mục Parse Vietnamese Syllable code | P1 | ⏳ | Nên tách thành service độc lập |
| L7 | **Semantic Role & Word Stress** | Phân loại từ: nội dung (danh/động/tính) → trọng âm cao → rơi vào phách mạnh; hư từ (thì/là/mà/đã...) → trọng âm thấp → phách nhẹ hoặc nốt ngắn | m-idea-03 mục3.2 | P2 | ⏳ | Để lại sau MVP |

---

### 2.2 NHÓM M: ÂM NHẠC HỌC (Composition Layer) - 7 vấn đề

| # | Vấn đề | Mô tả ngắn gọn | Dữ liệu từ ideas | Ưu tiên | Trạng thái | Comment |
|---|--------|---------------|-----------------|--------|----------|----------|
| M1 | **Cấu trúc Note/Duration chuẩn** | Pitch theo khoa học (C4, D#4, F5), Duration theo phân số nhịp (1=whole, 1/2=half, 1/4=quarter, 1/8=eighth, 1/16=sixteenth), Time Signature (4/4, 3/4, 6/8) | m-idea-01 mục7, m-idea-02 mụcMLML 2.B, m-idea-03 mục3.1 | P0 | ⏳ | |
| M2 | **Tone→Pitch Mapping Rules (BẢN ĐỒ CỐT LÕI)** | Bảng quy tắc chi tiết: sắc/ngã → ưu tiên nốt đi lên (hoặc ngang); huyền/nặng → ưu tiên nốt đi xuống (hoặc ngang); ngang → trung lập linh hoạt; hỏi/ngã → CẦN điểm gãy trong nốt (melisma ngắn 2 nốt hoặc ornament có break) | m-idea-02 Rule A/B/C/D, m-idea-03 mục2.2 Bảng tra nhanh, m-idea-05 Tầng2 Bảng | P0 | ⏳ | Liên quan trực tiếp L4 và Rsk1 |
| M3 | **Validator Tonal-Pitch (Compiler-style)** | Kiểm tra tự động từng cặp âm tiết liền kề có vi phạm luật cấm không. Xuất báo lỗi: `LINE 7 INVALID: syllable 'buồn'(huyền) assigned E4 > previous 'rơi'(ngang) D4 → violates Rule B (huyền must descend)`. Có pass/fail + gợi ý sửa | m-idea-01 mục6, m-idea-03 mục7, m-idea-04 mụcValidator | P0 | ⏳ | Công cụ kiểm soát chất lượng chính |
| M4 | **Scale & Mode System** | Hỗ trợ: (a) 7 âm phương Tây: Major/Natural minor/Harmonic minor/Dorian/ Mixolydian..., (b) 5 âm Việt (pentatonic): Vũ cung / Thương cung, (c) Các mode dân gian đặc trưng | m-idea-04 mục2 quy tắc 6 | P1 | ⏳ | |
| M5 | **Cadence & Phrase Structure** | Quy tắc kết thúc câu/đoạn nhạc: vần cuối câu thường rơi vào cadence hợp âm (authentic/plagal/half/deceptive), độ dài phrase nhạc = độ dài phrase lời | m-idea-01 mụcVERSE_RULE, m-idea-03 mục3.3 | P1 | ⏳ | |
| M6 | **Harmony & Voicing Rules** | (a) Tiến trình hợp âm theo thể loại, (b) Voicing: close/open/drop2, (c) Bass line: tránh chồng frequency với melody chính (anti-masking), (d) Hòa thanh hạn chế contrary motion mạnh với lời | m-idea-01 mục8+HARMONY, m-idea-05 Tầng3 | P1 | ⏳ | Bỏ chi tiết ở MVP, chỉ cần gán chord theo ô nhịp |
| M7 | **Genre Profile Presets** | Mỗi thể loại có sẵn preset toàn bộ: Chord progression + BPM range + Time sig + Rhythm pattern + Instrument set + Dynamics. Ví dụ: Pop Ballad (I-V-vi-IV, 70-85BPM, 4/4, Piano+Bass+String) | m-idea-05 Tầng3 Bảng Lexicon, m-idea-04 mục3 | P2 | ⏳ | Thư viện mở rộng dần |

---

### 2.3 NHÓM P: KỸ THUẬT BIỂU DIỄN (Performance Layer) - 6 vấn đề

| # | Vấn đề | Mô tả ngắn gọn | Dữ liệu từ ideas | Ưu tiên | Trạng thái | Comment |
|---|--------|---------------|-----------------|--------|----------|----------|
| P1 | **Vocal Technique Vocabulary chuẩn hóa** | Liệt kê tất cả kỹ thuật hát có thể biểu diễn qua DSL: `luyến` (portamento/glissando slide giữa 2 nốt), `láy` (mordent/trill lặp nhanh), `nhấn` (accent/marcato tăng velocity), `rung` (vibrato có rate+depth), `ngân` (hold sustain), `ngắt hơi` (phrase break), `gãy giọng` (glottal stop cho ngã), `falsetto` (giọng gió) | m-idea-01 mục8+9, m-idea-02 C mụcVocalTech, m-idea-03 mục4, m-idea-05 Tầng4 Bảng | P0 | ⏳ | Cần thống nhất ký hiệu viết tắt chung |
| P2 | **Tone ↔ Technique Link Rules** | Ánh xạ tự động: hỏi/ngã → ưu tiên gán `luyến` hoặc `láy` (để thể hiện gãy khúc); sắc/nặng → hạn chế `ngân` dài (bản chất ngắn); cuối câu/đoạn → thêm `rung` nếu nốt dài; huyền → ưu tiên rung nhẹ | m-idea-03 mục4 "Quy tắc liên kết", m-idea-04 mục2 quy tắc 4 | P1 | ⏳ | |
| P3 | **MIDI Pitch Bend Mapping cho 6 thanh** | Trong 50-100ms đầu mỗi nốt, áp dụng Pitch Bend theo contour thanh điệu: Ngang=Bend0, Huyền=Bend-8192, Sắc=Bend+4096đầu, Hỏi=Bend-4092 rồi +2000, Ngã=Glottal filter+Bend+, Nặng=Bend cực thấp + rút ngắn 50% duration | m-idea-05 Tầng2 Bảng Pitch Bend chi tiết | P1 | ⏳ | Test thực tế với synthesizer |
| P4 | **Instrument Technique Vocabulary** | Kỹ thuật theo nhạc cụ: Piano (broken chord, octave chord, staccato), Guitar (fingerstyle, strumming pattern, palm mute, pick scrape), Drum (kick pattern, snare on 2&4, hi-hat division 1/8 hay 1/16), String (legato, pizzicato, tremolo) | m-idea-01 mục10 GUITAR/PIANO/DRUMS code | P2 | ⏳ | Bỏ ở MVP |
| P5 | **Dynamics & Expression Mapping** | Mức âm lượng: pp, p, mp, mf, f, ff → mapping velocity MIDI (0-127). Expression: crescendo, decrescendo, sforzando → automation curve | m-idea-03 mục4 hàng rung + dynamics | P2 | ⏳ | |
| P6 | **Breath & Phrase Break tự động** | Dự đoán vị trí ngắt hơi hợp lý: cuối phrase nhạc, sau dấu câu ngữ pháp, sau 4-6 âm tiết tùy BPM. Cấm cắt ngang từ ghép đa âm tiết (vd: "người ta" không cắt giữa chữ) | m-idea-03 mục4 hàng ngắt hơi | P2 | ⏳ | |

---

### 2.4 NHÓM S: CÚ PHÁP DSL (Syntax & Representation) - 9 vấn đề

| # | Vấn đề | Mô tả ngắn gọn | Dữ liệu từ ideas | Ưu tiên | Trạng thái | Comment |
|---|--------|---------------|-----------------|--------|----------|----------|
| S1 | **Chọn tên DSL CHÍNH THỨC** | Các đề xuất từ 5 ideas: (1) Song DSL / Music IR, (2) MLML (Music&Linguistic Markup Language), (3) VietSongScript, (4) VMS (Vietnamese Music Script), (5) SongText. Hoặc đề xuất tên mới. | Tất cả 5 file ideas đều tự đặt tên khác nhau | P0 | ⏳ | Cần 1 tên thống nhất để đặt package/namespace |
| S2 | **Định dạng lưu trữ chính thức (Machine-readable)** | Chọn 1 định dạng làm ground truth để lưu file, parse, validate, train model. Ứng viên: (a) JSON Schema (tooling tốt, validate dễ, LLM sinh được, ecosystem lớn), (b) YAML (đọc dễ cho người nhưng whitespace-sensitive), (c) Protobuf/Binary (nhỏ gọn nhưng không đọc được của người) | m-idea-03 mục6.3 JSON, m-idea-05 Score JSON | P0 | ⏳ | Khuyến nghị: **JSON Schema** (win trên hầu hết tiêu chí) |
| S3 | **Định dạng Inline gọn cho AI sinh (Human-readable)** | Cần định dạng thứ 2 (khác JSON) để: (a) LLM sinh tiết kiệm token hơn JSON (ít ký hiệu hơn), (b) Người sáng tác viết nhanh hơn. Cần **converter 2 chiều** JSON ↔ Inline lossless. Các ứng viên cú pháp: (1) `em[ngang|C4:1/4|nhấn]` (m-idea-03), (2) `{Mưa}(T1)(C4,1/4)[vib]` (m-idea-02), (3) `[Mưa|N] E4 4 nhan` (m-idea-04), (4) tuple `(Mưa,N,E4,4,nhan)` (m-idea-04) | Tất cả ideas đều đề xuất cú pháp khác nhau | P0 | ⏳ | Cần thống nhất 1 cú pháp (sẽ ảnh hưởng parser dev effort) |
| S4 | **Cấu trúc Song Header (Global Meta)** | Các trường cấp bài hát: `title`, `lang` (vi/en/zh...), `key` (Am, Cmaj...), `bpm` (78), `time_sig` (4/4,6/8), `genre` (pop_ballad, bolero_vn...), `scale` (pentatonic_minor), `structure` (V C V C B C), `rhyme_scheme` (ABAB), `tonal_strictness` (high/medium/low) | m-idea-02 mụcSONG_CONFIG YAML, m-idea-04 @meta section, m-idea-05 JSON "key,bpm" | P0 | ⏳ | |
| S5 | **Cấu trúc Section/Block** | Cách khai báo các section: Verse1, Pre-Chorus, Chorus, Bridge, Outro... Mỗi section có meta riêng (override global): `meter`, `rhyme_scheme_local`, `energy_level`, `chord_progression` | m-idea-01 VERSE{} block, m-idea-04 @section, m-idea-05 tracks/phrases | P0 | ⏳ | |
| S6 | **Đơn vị Syllable Atom - Danh sách trường BẮT BUỘC** | Thiếu trường nào sẽ parse lỗi. Đề xuất: `syllable` (text), `tone` (enum 1-6 hoặc tên), `pitch[]` (array 1 phần tử nếu đơn nốt, 2+ nếu melisma), `duration[]` (array tương ứng pitch), `chord_context` (hợp âm đang diễn ra) | m-idea-03 mục6.3 JSON fields, m-idea-05 notes array | P0 | ⏳ | |
| S7 | **Đơn vị Syllable Atom - Danh sách trường TÙY CHỌN** | Có thể thiếu, parser vẫn OK. Đề xuất: `technique` (luyến/láy...), `vibrato_rate`+`vibrato_depth`, `accent_level`, `stress_level`, `beat_position` (weak/strong), `phrase_break` (bool), `rhyme_group`, `semantic_role`, `pitch_bend_curve`, `phoneme_override` | m-idea-03 mục6.3, m-idea-05 notes technique | P0 | ⏳ | Nên giữ tối thiểu ở MVP, thêm sau |
| S8 | **Comment & Annotation cho người** | Cách người sáng tác ghi chú trong file DSL không ảnh hưởng parse. Ví dụ: `// Đây là đoạn build-up`, `/* TODO: đổi giai điệu này sau */` | Không có idea nào đề cập (lỗ hổng cần bổ sung) | P2 | ⏳ | Nhỏ nhưng quan trọng cho UX sáng tác |
| S9 | **Partial Edit Syntax (Lock/Keep/Regenerate)** | Hỗ trợ chỉnh sửa 1 phần mà giữ nguyên phần còn lại (điểm mạnh của DSL so với blackbox). Cú pháp đề xuất: `LOCK melody.chorus`, `KEEP harmony`, `CHANGE lyrics.verse[2].line[3]`, `REGENERATE vocal WITH energy+20%` | m-idea-01 mục13 LOCK/KEEP code | P1 | ⏳ | Tính năng "kill" khi có editor GUI |

---

### 2.5 NHÓM A: KIẾN TRÚC PHẦN MỀM (System Architecture) - 7 vấn đề

| # | Vấn đề | Mô tả ngắn gọn | Dữ liệu từ ideas | Ưu tiên | Trạng thái | Comment |
|---|--------|---------------|-----------------|--------|----------|----------|
| A1 | **Số lượng Repository & Phân chia module** | Plan A (idea-01 đề xuất): 4 repos tách biệt: (1) `song-language` (DSL parser/AST/schema), (2) `song-rules` (rule packs vi/en/zh + genre packs), (3) `song-compiler` (exporters MIDI/MusicXML/USTX), (4) `song-ai-runtime` (LLM adapters + render adapters). Plan B (Monorepo): 1 repo, nhiều package (turborepo/nx workspaces). Plan C: 2 repos (core + adapters) | m-idea-01 mục19 4 repos list | P0 | ⏳ | Khuyến nghị **Monorepo lúc đầu** cho dễ phối hợp, tách sau khi scale |
| A2 | **Ngôn ngữ lập trình CHÍNH cho core** | Rất ảnh hưởng dev velocity và tooling. Ứng viên: (a) **TypeScript/Node.js 24 LTS** (trong stack user profile, ecosystem lớn, phù hợp AST/parsing/compiler), (b) **Go** (được đề xuất trong idea-02 cho G2P, performance cao cho microservice), (c) **Python** (nhanh prototype, nhiều lib âm nhạc (music21/pretty_midi), nhưng sau này phải rewrite cho production) | m-idea-02 dùng Python+Golang, user profile có Node.js 24 LTS | P0 | ⏳ | Cân nhắc: **TS cho core + Python cho AI/R&D** |
| A3 | **LLM Strategy ban đầu** | Plan A (Nhanh, chi phí nhỏ): **Few-shot Prompting** - viết system prompt chuyên sâu (như m-idea-02) + 15-30 ví dụ mẫu, temperature 0.2-0.4. Plan B (Chất lượng cao hơn, chậm hơn): Fine-tune model mã nguồn mở (Llama/Mistral) sau khi có dataset. Khuyến nghị: Bắt đầu Plan A, chuyển sang Plan B sau Giai đoạn 3. | m-idea-03 Giai đoạn 2+4, m-idea-04 mục5, m-idea-05 mụcHướng dẫn | P0 | ⏳ | |
| A4 | **Adapter Pattern cho AI/Render Provider** | Thiết kế interface chung cho mỗi loại adapter, dễ thay thế provider: `LLMAdapter.generate(prompt)→DSL`, `VocalRenderer.render(dsl)→wav`, `InstrumentRenderer.render(dsl)→wav`, `CloudMusicAPI.generate(dsl)→wav`. Implements: GPTAdapter, ClaudeAdapter, GeminiAdapter, OpenUTAUAdapter, DiffSingerAdapter, MusicGenAdapter, AceStepAdapter, ElevenMusicAdapter | m-idea-01 mục14 DS→nhiều providers, m-idea-05 Middleware dịch thuật | P0 | ⏳ | Thiết kế interface kỹ = tránh rewrite sau |
| A5 | **Triển khai runtime: Monolith vs Microservices** | Giai đoạn 1-2: Monolith (1 process làm tất cả). Giai đoạn 3+: Tách microservices: (1) API Gateway (Golang/TS), (2) G2P Service, (3) LLM Orchestration Service, (4) Render Queue Worker (hàng đợi Redis/RabbitMQ, render task tốn thời gian), (5) Storage Service (S3/MinIO cho file wav/mid) | m-idea-02 phần Microservices Docker+Queue+gRPC | P1 | ⏳ | Để sau khi MVP chạy được end-to-end |
| A6 | **Docker & Headless Render Pipeline** | Đóng gói toàn bộ render stack vào 1 Docker image: Base Ubuntu + Python runtime + OpenUTAU/DiffSinger build (CLI headless, không cần GUI) + Vietnamese voicebank mẫu + FFmpeg (mix audio). Dev có thể dùng WSL2 trên Windows. | m-idea-02 mụcĐóng gói Container, m-idea-02 Headless Render CLI | P1 | ⏳ | Tốn thời gian setup nhưng repeatable |
| A7 | **Rule Engine Design Pattern** | Không hard-code luật if/else rải rác. Thiết kế: (a) Hard rules (pass/fail, exception nếu vi phạm), (b) Soft rules (trả về numeric penalty score 0-1), (c) Weight config (YAML, không cần rebuild để tweak), (d) Exception database (case đặc biệt luật được phá), (e) Style profiles (thể loại nào ưu tiên rule nào hơn) | m-idea-01 mục16 rules+weights+style_profiles YAML mẫu | P0 | ⏳ | Pattern này quyết định khả năng tinh chỉnh sau này |

---

### 2.6 NHÓM R: RENDERING & TÍCH HỢP (Output & Integration) - 7 vấn đề

| # | Vấn đề | Mô tả ngắn gọn | Dữ liệu từ ideas | Ưu tiên | Trạng thái | Comment |
|---|--------|---------------|-----------------|--------|----------|----------|
| R1 | **DSL → MIDI Compiler** | Export file .mid chuẩn. Yêu cầu: (1) Track Vocal: mỗi note có duration đúng, velocity theo accent/dynamics, **Lyric Event gắn đúng timestamp cho từng âm tiết** (OpenUTAU/Vocaloid đọc được event này tự động map lời vào nốt), (2) Track Chord: ghi chord marker, (3) Tempo track BPM + time sig chính xác | m-idea-02 Python pretty_midi code mẫu parse_mlml_to_midi | P0 | ⏳ | Có thể dùng thư viện music21/pretty_midi |
| R2 | **DSL → MusicXML Compiler** | Export MusicXML 4.0 (chuẩn ngành). Mục đích: (a) Mở được trong MuseScore/Sibelius để người sáng tác xem/chỉnh bằng GUI notation, (b) Là interchange format chung với DAW khác. Lưu ý: **MusicXML là target output, KHÔNG phải source language** (theo nguyên tắc 5) | m-idea-01 mục11-12 MusicXML là target, m-idea-03 mụcABC Notation tham khảo | P1 | ⏳ | Không cần 100% phần mềm hỗ trợ ngay |
| R3 | **DSL → Cloud AI Music Adapter** | Chuyển DSL thành (prompt + structured JSON) đúng format của các API cloud hiện có: (a) ACE-Step (Alibaba), (b) ElevenLabs Music, (c) Suno v3/v4 (nếu có API), (d) Udio (nếu có API). Tận dụng các provider này làm fallback nếu local render chất lượng chưa đủ | m-idea-01 mục14 provider list, m-idea-05 Middleware dịch thuật | P1 | ⏳ | |
| R4 | **DSL → USTX / DiffSinger Format Compiler** | Export định dạng natively của vocal synthesizer: (a) `.ustx` (JSON-based format của **OpenUTAU** - dễ parse), (b) `.ds` / Project format cho **DiffSinger**. Inject sẵn: Phonemes (từ G2P service), Pitch Bend curves (từ P3), Note-level flags (technique, vibrato) | m-idea-02 bước G2P→ustx→OpenUTAU, m-idea-05 DiffSinger | P1 | ⏳ | Quan trọng cho tự động hóa local render |
| R5 | **Lựa chọn Vocal Synthesizer THỬ NGHIỆM ĐẦU TIÊN** | (A) **OpenUTAU** (Ưu: Mã nguồn mở .NET, format USTX JSON dễ inject dữ liệu, G2P tùy chỉnh được, cộng đồng lớn voicebank nhiều tiếng. Nhược: Chất lượng giọng tùy voicebank, Setup hơi phức tạp); (B) **DiffSinger** (Ưu: Chất lượng giọng AI tốt hơn hẳn, có acoustic+vocoder. Nhược: Đào tạo voicebank khó hơn, render chậm hơn); (C) **ACE-Step Cloud API** (Ưu: Không cần setup, chất lượng tốt. Nhược: Phụ thuộc mạng, phí API, không kiểm soát chi tiết pitch bend) | m-idea-02 OpenUTAU CLI + Docker, m-idea-05 DiffSinger + ACE-Step | P0 | ⏳ | Khuyến nghị: **MVP dùng ACE-Step cloud cho nhanh → Chuyển OpenUTAU local** |
| R6 | **Instrumental Backing Track Generation** | 2 phương án: (A) Symbolic → MIDI SoundFont (Piano+Bass+Drum preset đơn giản theo genre profile M7 - nhanh, offline, kiểm soát hoàn toàn); (B) Prompt → MusicGen/Stable Audio (chất lượng tự nhiên hơn nhưng blackbox, cần GPU hoặc cloud API) | m-idea-02 Instrument Render VST, m-idea-05 Middleware MusicGen | P1 | ⏳ | Bắt đầu với (A) cho dễ kiểm soát |
| R7 | **Mixdown Engine cơ bản** | Trộn nhiều track audio thành 1 file cuối: (1) Volume balance (vocal -3dB so với backing, bass -6dB so với mid), (2) EQ high-pass ở tần số thấp để loại bỏ hum, (3) Compressor nhẹ (ratio 2:1) trên master để tăng độ ấm, (4) Reverb send nhỏ (-12dB, room/hall size 1.2s) cho thêm không gian. Dùng FFmpeg hoặc Web Audio API hoặc pydub | m-idea-02 Mixdown FFmpeg, m-idea-05 pydub mix 2 file | P2 | ⏳ | Để cuối Giai đoạn 3 |

---

### 2.7 NHÓM V: KIỂM THỬ & CHẤT LƯỢNG (Validation & Dataset) - 4 vấn đề

| # | Vấn đề | Mô tả ngắn gọn | Dữ liệu từ ideas | Ưu tiên | Trạng thái | Comment |
|---|--------|---------------|-----------------|--------|----------|----------|
| V1 | **Gold Test Suite: Tonal-Pitch Validator Accuracy** | Quá trình: (a) Chọn 30-50 bài hát Việt Nam nổi tiếng, cộng đồng đồng thuận là "phổ đúng" (không cưỡng âm), (b) Annotate thủ công: mỗi âm tiết → tone → note_pitch → duration theo bản ghi âm gốc, (c) Chạy Validator (M3) qua bộ data này, (d) Tính False Positive rate (Validator báo sai trong khi thực tế đúng) và False Negative rate (Validator báo đúng trong khi thực tế sai), (e) Hiệu chỉnh weights luật (L4, M2) để target FP<5% trên bộ test này | m-idea-03 Giai đoạn 1 test validator, m-idea-04 Vừa rồi Validator | P0 | ⏳ | Quan trọng nhất: luật sai thì toàn bộ dự án sai |
| V2 | **Soft Scoring System 0-100 (Ranking)** | Thay vì chỉ pass/fail, tính điểm tổng hợp để rerank nhiều bản sinh ra từ AI. Components đề xuất: `similar_motion_score` (0-30 điểm, đo % similar motion theo nghiên cứu Kirby&Ladd), `rhyme_hit_score` (0-20), `stress_beat_score` (0-15, trọng âm rơi phách mạnh), `technique_appropriateness` (0-15, kỹ thuật khớp thanh điệu P2), `melody_smoothness` (0-20, tránh nhảy quãng lớn đột ngột). Dùng điểm này cho self-correction loop và A/B testing | m-idea-01 mục16 weights, m-idea-03 validator mục5 soft score | P1 | ⏳ | |
| V3 | **Corpus Annotation Plan (Training data cho Fine-tune)** | Dần dần xây gold dataset 100-500 bài hát Việt. Mỗi bài: Lời đầy đủ + Cấu trúc section + Tone annotation + Pitch annotation + Duration annotation + Chord progression + Vocal technique flags. Workflow: (1) Lấy bài hát + lời (từ nhiều nguồn), (2) Align giọng hát với nốt nhạc bằng tool MIR (Music Information Retrieval tự động), (3) Review thủ công bởi chuyên gia, (4) Import vào DSL format, (5) Chạy validator qua và đạt soft score >90 mới accept vào dataset | m-idea-03 Giai đoạn 4 Fine-tune, m-idea-04 mục6 Dataset annotate | P1 | ⏳ | Dự án dài hạn, không làm ở MVP |
| V4 | **Human A/B Testing Protocol** | Đánh giá chất lượng cuối cùng bằng người nghe bản ngữ. 2 bài toán test: (a) **Word Intelligibility Test** (Nghe 1 âm tiết → viết ra chữ → đo % hiểu đúng nghĩa - kiểm tra "trại giọng"); (b) **Naturalness MOS Test** (Mean Opinion Score 1-5, đánh giá giai điệu có tự nhiên giống người viết không). Cần ít nhất 20 người nghe/tham gia cho ý nghĩa thống kê | m-idea-03 mục9 Rủi ro 1 (Luật chưa kiểm chứng học thuật) | P2 | ⏳ | Làm sau khi có bản render audio chất lượng tạm được |

---

### 2.8 NHÓM RSK: RỦI RO & LƯU Ý (Risks) - 6 vấn đề

| # | Vấn đề / Rủi ro | Mức độ | Mô tả chi tiết | Kế hoạch giảm thiểu |
|---|----------------|--------|---------------|-------------------|
| Rsk1 | **Luật Tonal-Pitch (L2+M2) là GIẢ THUYẾT làm việc, CHƯA KIỂM CHỨNG HỌC THUẬT** | 🔴 **CAO** | 5 idea đều đưa ra bảng quy tắc dựa trên quan sát + kinh nghiệm + 1 bài nghiên cứu (Kirby&Ladd 2016 trên 20 bài tân nhạc), nhưng **chưa có tài liệu ngôn ngữ học/âm nhạc học Việt Nam chính thức công nhận đầy đủ**. Nếu luật cơ sở sai → cả hệ thống sinh ra vẫn sẽ cưỡng âm dù pass validator | (1) Đối chiếu tài liệu ngôn ngữ học chuyên sâu về âm vực thanh điệu tiếng Việt, (2) Nếu có điều kiện: tham vấn chuyên gia âm nhạc dân tộc học / ngôn ngữ học, (3) Làm V4 A/B test intelligibility sớm, (4) Tập trung V1 Gold test suite hiệu chỉnh liên tục |
| Rsk2 | **Render Giọng hát chính xác Pitch Bend + Kỹ thuật (P3+R4+R5) là BÀI TOÁN KỸ THUẬT KHÓ NHẤT TOÀN DỰ ÁN** | 🔴 **CAO** | Local render (OpenUTAU/DiffSinger) headless Docker: cần build từ source, tương thích voicebank, inject đúng pitch bend curve, quality voicebank tiếng Việt CVVC chất lượng cao còn khan hiếm, render time dài. Cloud render (ACE-Step): không kiểm soát được pitch bend chi tiết, phụ thuộc bên thứ ba | (1) MVP ưu tiên ACE-Step cloud cho có kết quả nhanh, (2) Đồng thời research OpenUTAU, (3) Có dự phòng 2-3 phương án synthesizer, (4) Không block toàn bộ dự án nếu render khó: luôn có output MIDI/MusicXML cho người dùng dùng trong DAW của họ |
| Rsk3 | **LLM Few-shot (A3-A) KHÔNG tuân thủ 100% DSL Syntax & Luật** | 🟡 **TRUNG** | Ngay cả temperature=0, LLM vẫn có thể: (a) sai tên trường JSON, (b) bỏ sót trường bắt buộc, (c) sinh ra âm tiết vi phạm luật cứng (dù đã ghi rất rõ trong system prompt), (d) Invent custom kỹ thuật không có trong vocabulary | Thiết kế **Multi-pass Correction Loop** (ít nhất 3 vòng): Vòng1 sinh → Validator kiểm tra → Dán toàn bộ lỗi vào prompt + yêu cầu sửa chính xác dòng nào → Vòng2 sinh → ... → Nếu vẫn sai → Rerank chọn bản có penalty thấp nhất → Fallback người sửa tay. Bắt buộc phải có loop này, không thể chỉ trust 1 lần sinh |
| Rsk4 | **Corpus chất lượng cao (V3) TỐN THỜI GIAN & CHI PHÍ annotate thủ công** | 🟡 **TRUNG** | Nếu không có dataset đủ lớn + chất lượng, Fine-tune (Giai đoạn 4) không thể tốt hơn few-shot. 1 bài hát Việt annotate đầy đủ (tone+pitch+duration+chord+technique) có thể mất 30-60 phút/chuyên gia → 500 bài ≈ 250-500 giờ công | (1) Bắt đầu từ 30-50 bài cho V1 trước (không cần hoàn hảo), (2) Tự động hóa 1 phần bằng MIR tool (align audio với nốt nhạc tự động rồi chỉ cần review), (3) Thiết kế UI annotation đơn giản cho cộng đồng đóng góp sau này |
| Rsk5 | **SCOPE CREEP: Cố làm QUÁ NHIỀU lớp QUÁ SỚM → Không bao giờ có MVP** | 🔴 **CAO-NỮA** | Rủi ro kinh điển của dự án nghiên cứu + kỹ thuật phức tạp. Ví dụ: Vừa làm validator xong đã nhảy vào làm Harmony chi tiết (M6) + Nhạc cụ dân tộc (P4 nâng cao) + Fine-tune model (Giai đoạn4) → chưa thấy kết quả nào trong 6 tháng → team bỏ cuộc | **QUY TẮC SẮT ĐẮT BUỘC THỰC HIỆN**: Xem danh sách "KHÔNG làm ở Phase1" ở Mục3 Roadmap. **Ai đề xuất làm gì ngoài scope MVP phải giải thích rõ tại sao KHÔNG thể delay về sau.** Công cụ Scrum: Product Owner có quyền chặn tất cả tính năng không thuộc MVP Backlog |
| Rsk6 | **G2P tiếng Việt cho CVVC Voicebank (L6) là CÔNG VIỆC TẺ NHẤT LẶP LẠI NHIỀU** | 🟡 **TRUNG** | Cần chuẩn hóa bảng phoneme cho tất cả âm tiết tiếng Việt (hàng ngàn âm tiết: trường hợp có dấu, không dấu, phụ âm kép, nguyên âm đôi/ba). Cần map với naming convention trong oto.ini của voicebank thực tế | (1) Không tự làm 100% từ đầu: tham khảo các dự án cộng đồng OpenUTAU tiếng Việt đã làm G2P (nếu có), (2) Viết test auto cho G2P (input âm tiết → output phoneme) để không regress, (3) Đầu tư build tool Longest Prefix Match tự động hóa phần lớn theo thuật toán ở m-idea-02 Golang code |

---

## 3. LỘ TRÌNH TRIỂN KHAI 5 GIAI ĐOẠN (ROADMAP)

### 🏁 GIAI ĐOẠN 0: NGHIÊN CỨU & CHUẨN HÓA (R&D Foundation)

**Thời gian ước tính:** 2-3 tuần (thực hiện song song với thảo luận)

**Mục tiêu:** Thống nhất TẤT CẢ các vấn đề P0 ở Mục2. Viết Spec v0.2 chi tiết. Không viết code chính ở giai đoạn này (chỉ viết PoC/Pen-test nếu cần cho quyết định).

**Công việc cụ thể:**
- [ ] **0.1** Research & Finalize **L2 + M2 (Tone Contour + Tone-Pitch Mapping Rules)**. Đầu ra: File `specs/tonal-rules-v0.1.md` có bảng quy tắc đầy đủ + reference (nguồn nghiên cứu)
- [ ] **0.2** Test thủ công 10 bài hát Việt nổi tiếng (tự annotate 1 bài mỗi thành viên team) → so sánh với luật đề xuất → hiệu chỉnh weights nếu cần
- [ ] **0.3** Quyết định 1 lần 7 câu hỏi Mục4 (phía dưới) → đóng băng quyết định, không lùi lại nữa nếu không có lý do cực kỳ đặc biệt
- [ ] **0.4** Viết Specification Document v0.2 đầy đủ: `specs/dsl-v0.2-spec.md` (tất cả fields JSON Schema, inline syntax BNF nếu cần, toàn bộ rule weights, interface adapters)
- [ ] **0.5** Pen-test (chạy thử PoC 1-2 giờ cho các lựa chọn kỹ thuật quan trọng): (a) Test OpenUTAU CLI headless render với voicebank tiếng Việt mẫu, (b) Test LLM few-shot sinh DSL với system prompt mẫu → đo % sinh ra parse được hợp lệ ngay lần 1, (c) Test Python/TS parse MIDI và ghi lyric event

**Deliverables của Giai đoạn 0:**
- File `specs/tonal-rules-v0.1.md` (đã được kiểm chứng thủ công ít nhất 10 bài hát)
- File `specs/dsl-v0.2-spec.md` (Full Specification)
- File plan-01.md này có TẤT CẢ các vấn đề P0 được đánh dấu ✅ (không còn ⏳ nào ở P0)
- Kết quả pen-test (docs/research/pen-test-*.md) giúp yên tâm lựa chọn kỹ thuật

**Dấu hiệu sang Giai đoạn 1:** Đặc tả v0.2 được team sign-off, không còn tranh luận cốt lõi.

---

### 🚀 GIAI ĐOẠN 1: CORE DSL + TONAL-PITCH VALIDATOR (MVP)

**Thời gian ước tính:** 3-4 tuần

**Mục tiêu:** Có thể parse 1 file DSL → validate luật thanh điệu → báo lỗi compiler-style theo từng dòng. **CHƯA CẦN AUDIO RENDER.** Chỉ cần kiểm soát symbolic (text + note) là được.

**Công việc cụ thể:**

#### 1.1 Package `song-language` (Parser + AST + Schema)
- [ ] Định nghĩa **JSON Schema v0.1** cho Syllable Atom (S6+Bắt buộc, S7+Tùy chọn tạm bỏ bớt ở MVP), Section (S5), SongHeader (S4)
- [ ] Viết **Parser** cho cú pháp Inline (S3, chọn 1 cú pháp sau khi team thống nhất) → convert sang JSON internal (lossless)
- [ ] Viết **Serializer** JSON → Inline format (2 chiều)
- [ ] Viết **AST TypeScript classes**: `Song`, `Section`, `LyricLine`, `SyllableNote` (có methods helper: `getPreviousSyllable()`, `isPhraseBreak()`, ...)
- [ ] Unit test coverage ≥80% cho parser/serializer (1 test file inline mẫu → parse → serialize → phải giống ban đầu = roundtrip test)

#### 1.2 Package `song-rules` (Vietnamese Rules Pack đầu tiên)
- [ ] Implement **Syllable Parser tiếng Việt** (L1): tách onset/nucleus/coda + detect tone từ text (từ điển hoặc VNAnalyzer thư viện nếu có)
- [ ] Implement **Rhyme Detector** (L5, thu gọn ở MVP: chỉ cần detect nhóm vần bằng phần vần = âm tiết bỏ phụ âm đầu và thanh điệu)
- [ ] Implement **Tonal-Pitch Rule Engine** (M2 + A7):
  - Hard rules (pass/fail) theo quy ước team đã thống nhất
  - Soft rules trả về `Penalty` numeric (không cấm nhưng trừ điểm)
  - Config YAML cho weights (dễ tweak không cần rebuild)
- [ ] CLI `song analyze-tones input.songdsl` → in ra bảng: từng âm tiết, tone, pitch, direction so với âm trước, rule nào hit, penalty

#### 1.3 Validator Compiler-style + Gold Test Suite
- [ ] Viết `song-validator` CLI: input file DSL → xuất lỗi dạng `LINE X POS Y: ERROR_CODE (VI PHẠM LUẬT M2-B): syllable 'buồn'(huyền) pitch=E4 > prev 'rơi'(ngang)=D4, expected ≤ D4. SUGGESTED_FIX: đổi thành C4 hoặc D4`
- [ ] Build Gold Test Suite (V1): 30 bài đã annotate thủ công. CI/CD chạy mỗi lần commit → target: **False Positive <5%** (sai báo lỗi khi thực tế đúng)
- [ ] Viết benchmark test: 1000 âm tiết parser parse trong <50ms (không nên chậm)

**🛑 DANH SÁCH CÁC TÍNH NĂNG CỤ THỂ KHÔNG LÀM Ở GIAI ĐOẠN 1 (BẮT BUỘC):**
- ❌ Harmony & Voicing chi tiết (M6) → chỉ cần trường `chord_context` như note text thôi, không validate
- ❌ Nhạc cụ (P4 nâng cao) & Instrument technique
- ❌ Vocal techniques (P1 nâng cao: rung, luyến, láy) → MVP chỉ cần text technique thôi, không validate logic
- ❌ Pitch Bend (P3) → để lại Giai đoạn3
- ❌ Bất kỳ audio render nào (R1-R7) → chỉ cần text output
- ❌ Microservices, Docker (A5, A6) → Monolith CLI đơn giản
- ❌ Fine-tune model, Corpus annotation (V3)
- ❌ UI/GUI editor

**Deliverables của Giai đoạn 1:**
- 2 packages: `song-language` (parser), `song-rules-vi` (rule pack Việt)
- CLI tools: `song validate file.songdsl`, `song analyze-tones file.songdsl`
- Document: 30-50 bài Gold Test Dataset (folder test-data/gold-songs/)
- Demo: Cho 1 file DSL vi phạm luật → validator báo lỗi chính xác từng dòng (như TypeScript compiler)

**Dấu hiệu sang Giai đoạn 2:** Validator pass 95%+ bộ Gold Test Suite (V1), Parser roundtrip test đạt 100% (parse→serialize ra giống ban đầu)

---

### 🤖 GIAI ĐOẠN 2: AI GENERATION PIPELINE + SELF-CORRECTION LOOP

**Thời gian ước tính:** 3-4 tuần

**Mục tiêu:** Người dùng gõ prompt tự nhiên → hệ thống sinh ra file DSL HỢP LỆ (pass validator hard rules) + có soft score tốt.

**Công việc cụ thể:**

#### 2.1 LLM Adapters
- [ ] Thiết kế **interface `LLMAdapter`** (A4): `generateSongDSL(prompt: string, config: GenerationConfig): Promise<DSLGenerationResult>` (trả về raw text + usage token)
- [ ] Implement ít nhất **2 concrete adapters**: (1) GPT-4o Adapter (dùng OpenAI SDK), (2) Claude 3.5 Sonnet Adapter (dùng Anthropic SDK). Tương thích dễ dàng thêm Gemini
- [ ] Viết **System Prompt chuyên sâu** (mẫu từ m-idea-02 mục System Prompt Music-Linguistic Compiler):
  - Định nghĩa rõ role (Vietnamese Music Composer + Linguistic Algorithmic Composer)
  - Luật A/B/C/D về Tonal-Pitch + Ví dụ đúng luật / vi phạm luật (few-shot negative examples rất quan trọng)
  - Định dạng output BẮT BUỘC inline DSL
  - Yêu cầu suy luận step-by-step trước khi output (sinh lời → gắn tone → gắn vần → assign nốt → review luật → output cuối)
- [ ] Chuẩn bị **Few-shot dataset 15-30 ví dụ** chất lượng cao (sau khi Giai đoạn1 có validator rồi, tự run tất cả example qua validator trước khi đưa vào dataset, đảm bảo 0 vi phạm)
- [ ] Tunning: Temperature (thử 0.2, 0.3, 0.4, 0.5 → chọn cái có % pass validator cao nhất sau 50 test prompt)

#### 2.2 Self-Correction Multi-pass Loop
- [ ] Implement loop (tối đa 3 vòng mặc định):
  - `Vòng1 LLM sinh → Raw DSL text → Parse → Validate hard rules`
  - `Nếu pass → Chuyển sang bước tính điểm soft`
  - `Nếu fail → Format toàn bộ lỗi validator thành text (giữ nguyên format LINE X ERROR_CODE...) → Append vào prompt với instruction: "Bạn đã vi phạm các lỗi trên, HÃY SỬA CHÍNH XÁC DÒNG NÀO, KHÔNG SỬA NHỮNG DÒNG KHÔNG CÓ LỖI" → Gọi lại LLM → Vòng2`
  - `Sau 3 vòng vẫn fail hard rules → Return bản có ít penalty nhất, kèm warning`
- [ ] Implement **Soft Scoring** (V2): tính điểm 0-100 với các thành phần (tạm MVP 3 thành phần thôi): similar_motion (40%), rhyme_hit (30%), melody_smoothness (30%)
- [ ] Implement **Rerank N-best** mặc định N=5: sinh 5 bản khác nhau cùng lúc → tính soft score → trả về bản điểm cao nhất

#### 2.3 Song Director Agent (Orchestrator)
- [ ] Viết `SongDirector` high-level entry point: nhận prompt tự nhiên + config → trả về `FinalDSLResult {dsl, score, metadata}`
- [ ] Support cấu hình: `{ genre, key, bpm, structure, rhymeScheme, temperature, nBest, maxCorrectionPasses, tonalStrictness }`
- [ ] MVP: tách làm 2 bước trong 1 agent (a) Sinh Lyrics section theo cấu trúc + vần, (b) Phổ nhạc nốt cho từng section theo luật. Chưa cần tách thành 2 agent riêng biệt (sau này làm)
- [ ] CLI: `song generate "bài pop ballad về mùa thu Hà Nội, key Am, bpm76" --out hanoi-autumn.songdsl --verbose` (in ra soft score, số vòng correction đã dùng)

**Deliverables của Giai đoạn 2:**
- Package `song-ai-runtime` với 2+ LLM adapters + correction loop
- System prompt file + 15-30 few-shot examples trong repo (đã pass validator 100%)
- CLI: `song generate "prompt"` → file DSL hợp lệ + console log điểm số
- Benchmark: 50 random test prompts → % pass hard rules trong 1 vòng (target ≥60%), % pass trong 3 vòng (target ≥90%), trung bình soft score (target ≥70)

**Dấu hiệu sang Giai đoạn 3:** Benchmark đạt target, demo thực tế: gõ 5 prompt khác nhau → sinh ra 5 file DSL hợp lệ pass validator

---

### 🎵 GIAI ĐOẠN 3: RENDERING ENGINE (SYMBOLIC DSL → AUDIO THỰC TẾ)

**Thời gian ước tính:** 4-6 tuần (Rủi ro kỹ thuật CAO nhất, buffer thêm 2 tuần nếu gặp trục trặc)

**Mục tiêu:** Từ file DSL hợp lệ → xuất ra folder outputs/ có đầy đủ: .mid (dùng trong DAW), .musicxml (dùng trong MuseScore), .ustx (dùng trong OpenUTAU), vocal.wav, backing.wav, final-song.mp3 (mix cuối).

**Công việc cụ thể:**

#### 3.1 Symbolic Exporters (Package `song-compiler`)
- [ ] **DSL → MIDI Compiler** (R1): dùng `music21` (Python) hoặc `tonal/` (JS) hoặc `pretty_midi`. Quan trọng: **Lyric Event MIDI phải được gắn đúng thời điểm từng âm tiết** (OpenUTAU sẽ đọc event này)
- [ ] **DSL → MusicXML Compiler** (R2): export MusicXML 4.0 thỏa mãn ít nhất có thể mở trong MuseScore và hiện thị note + lời tương ứng
- [ ] CLI mới: `song compile hanoi-autumn.songdsl --out outputs/ --formats midi,musicxml,ustx,json`

#### 3.2 Vocal Render Pipeline (Điểm khó nhất)
- [ ] **Lựa chọn & Setup Vocal Engine** (theo quyết định R5):
  - *Nếu chọn OpenUTAU local:* (1) Research cách build OpenUTAU headless CLI (có hỗ trợ từ bản .NET Core?), (2) Viết `DSL → USTX Compiler` (R4): USTX là JSON nên dễ inject phonemes từ G2P service + pitch bend curve từ P3 vào đúng field, (3) Docker image `song-render-utau`: base ubuntu + dotnet-runtime + OpenUTAU binary + Vietnamese CVVC voicebank mẫu (tìm community), (4) Test render 1 file USTX → wav thủ công rồi tự động
  - *Nếu chọn ACE-Step Cloud:* (1) Viết adapter gọi API cloud đúng format structured JSON, (2) Không cần Docker, chỉ cần API key, (3) Dự phòng rate limit + cache
- [ ] **G2P Service** (L6): Viết module/component tách grapheme → phoneme chuẩn theo thuật toán Longest Prefix Match (onset list độ dài giảm dần: `ngh`, `ng`, `tr`, `th`, ...). Unit test 50 âm tiết phức tạp (trường, nghiêng, người, ngoại, quanh...)
- [ ] **Pitch Bend Mapping** (P3): Viết converter tone → pitch bend curve theo mẫu m-idea-05 (6 thanh có 6 hình dạng khác nhau trong 50-100ms đầu nốt). Inject vào USTX (nếu OpenUTAU) hoặc MIDI Pitch Bend (nếu synthesizer hỗ trợ)

#### 3.3 Instrumental Backing + Mixdown
- [ ] **Option A Symbolic** (Ưu tiên làm trước cho dễ): Chord progression → MIDI Piano (broken chord theo thể loại) + MIDI Bass (root note theo hợp âm) + MIDI Drum (pattern đơn giản) → render bằng General MIDI SoundFont → `backing.wav`
- [ ] **Option B Prompt-based** (tùy chọn nếu có thời gian): Tạo prompt text từ chord progression + genre → gọi MusicGen cloud API hoặc local nếu có GPU đủ mạnh
- [ ] **Mixdown Engine cơ bản** (R7): Dùng FFmpeg command line hoặc `fluent-ffmpeg` package: (1) Normalize cả 2 track vocal.wav và backing.wav về -14LUFS, (2) Balance volume (vocal -2dB so với backing), (3) High-pass 80Hz, (4) Master bus nhẹ compression và limiter, (5) Output mp3 192kbps + wav lossless
- [ ] CLI cuối: `song render hanoi-autumn.songdsl --out audio/hanoi-autumn/ --mix` (tạo cả thư mục full outputs)

**Deliverables của Giai đoạn 3:**
- Package `song-compiler` (MIDI, MusicXML, USTX exporters)
- Docker image `m-language/render-engine:latest` (hoặc script setup cloud API nếu không chọn local)
- End-to-End demo: Prompt tự nhiên → DSL → Validator → (MIDI + MusicXML + USTX + Vocal WAV + Backing WAV + Final MP3)
- Document `docs/render-setup.md` (hướng dẫn cài đặt môi trường render, xin API key nếu cần)

**Dấu hiệu kết thúc Dự án MVP (sau Giai đoạn 3):** Người dùng không chuyên có thể: `1. Gõ lệnh generate → 2. Nghe file mp3 kết quả → 3. Nếu không thích sửa prompt → 4. Generate lại.` Hệ thống chạy được end-to-end, không cần thao tác thủ công trung gian nào

---

### 🌟 GIAI ĐOẠN 4: FINE-TUNING & MỞ RỘNG (Liên tục sau MVP, không có deadline cứng)

**Mục tiêu:** Cải thiện chất lượng, mở rộng khả năng, xây dựng hệ sinh thái

**Công việc cụ thể (sắp xếp theo độ ưu tiên dần):**
- [ ] **4.1 Nâng cấp Soft Scoring (V2)** → thêm stress_beat_score, technique_appropriateness
- [ ] **4.2 Xây Corpus V3** → Mục tiêu 100 bài trong 2 tháng đầu (kết hợp MIR tool tự động align)
- [ ] **4.3 Fine-tune model mã nguồn mở** (Llama 3.1 8B / Mistral Small) trên dataset DSL đã qua validator → giảm phụ thuộc API cloud, tăng tốc độ + giảm chi phí token dài hạn
- [ ] **4.4 Mở rộng Rule Packs (song-rules-en)** → Tiếng Anh không có thanh điệu thay vào đó là stress + intonation phrase
- [ ] **4.5 Genre Profiles (M7)** → thêm Bolero Việt / Dân ca Bắc Bộ / V-Pop / Indie Rock (mỗi genre preset đầy đủ)
- [ ] **4.6 Nhạc cụ dân tộc** (P4 nâng cao): Đàn tranh (16 dây, kỹ thuật rung nhấn trái), Đàn bầu (đặc trưng slide harmonic), Sáo trúc
- [ ] **4.7 UI Web Editor** (cực kỳ quan trọng cho non-dev): Syntax highlighting, real-time validation gutter, inline sửa note trên staff notation (dùng VexFlow / AlphaTab), preview audio playback, drag-drop reorder section, Lock/Keep GUI buttons
- [ ] **4.8 R&D Voice DiffSinger tiếng Việt** → tự train 1 voicebank chất lượng cao nếu cộng đồng chưa có
- [ ] **4.9 Multi-language packs**: Tiếng Trung (cũng là tone language, test case tốt cho generalization), Tiếng Nhật, Tiếng Hàn
- [ ] **4.10 Export plugin DAW**: VST3/AU plugin chạy được trong Ableton/FL Studio/Studio One → kéo file DSL trực tiếp vào timeline

---

## 4. 7 CÂU HỎI CẦN TEAM THẢO LUẬN & QUYẾT ĐỊNH NGAY (TRƯỚC KHI CODE GIAI ĐOẠN 0)

> 💡 **HƯỚNG DẪN:** Mỗi câu hãy đưa ra LỰA CHỌN + LÝ DO. Nếu không team leader sẽ quyết định theo khuyến nghị sau 24h hết thời gian thảo luận.

| # | Câu hỏi | Lựa chọn ứng viên | Khuyến nghị mặc định | Team Decision | Lý do Quyết định |
|---|--------|------------------|---------------------|---------------|-----------------|
| **Q1** | **Ngôn ngữ lập trình CHÍNH cho core package (song-language, song-rules, song-compiler, CLI)?** | (A) TypeScript / Node.js 24 LTS, (B) Go, (C) Python, (D) Hybrid (TS core + Python AI) | **(D) Hybrid TypeScript core + Python AI/R&D** - Dùng TS cho parser/compiler/CLI (type-safe, ecosystem tooling tốt theo user profile), dùng Python cho các lib âm nhạc (music21/pretty_midi/ML-related) có sẵn, 2 process giao tiếp qua CLI/stdin/stdout hoặc gRPC nếu cần | ⏳ Chưa Quyết Định | |
| **Q2** | **Tên DSL CHÍNH THỨC (S1)?** | (A) Song DSL, (B) MLML, (C) VietSongScript, (D) VMS, (E) Đề xuất tên khác: ______ | **(A) Song DSL** (đơn giản, không gắn vào Việt Nam nào - dễ mở rộng đa ngôn ngữ sau này, dễ nhớ). Hoặc **(E) M-Lang** (tên dự án hiện tại là M-Language nên rút gọn thành M-Lang) | ⏳ Chưa Quyết Định | |
| **Q3** | **Vocal Synthesizer dự án thử nghiệm ĐẦU TIÊN (R5)?** | (A) OpenUTAU Local Docker, (B) DiffSinger Local, (C) ACE-Step Cloud API, (D) (A) + (C) song song (Cloud cho MVP nhanh, Local song song research) | **(D) Kết hợp (C) + (A)** - MVP đầu tiên dùng ACE-Step cho có KẾT QUẢ NHANH NHẤT (không cần setup render phức tạp → có audio để user test trong 1 tuần đầu Giai đoạn3). Đồng thời research setup OpenUTAU Docker trong parallel, chuyển ưu tiên local sau khi ổn định (kiểm soát chi phí + chất lượng) | ⏳ Chưa Quyết Định | |
| **Q4** | **Số lượng Repo (A1)?** | (A) 4 Repos tách biệt (song-language / song-rules / song-compiler / song-ai-runtime), (B) Monorepo (1 repo, nhiều packages dùng npm/yarn/pnpm workspaces), (C) 2 Repos (core + adapters) | **(B) Monorepo lúc ĐẦU** - Lợi ích: (1) Dùng chung types/interface không cần publish package, (2) 1 PR sửa được nhiều nơi, (3) 1 CI/CD system dễ setup, (4) Tách repo riêng sau này khi có ≥5 người contribute mỗi package vẫn dễ (npm workspaces đã có tooling migrate ra riêng). Sẽ tách nếu package phụ thuộc quá nặng | ⏳ Chưa Quyết Định | |
| **Q5** | **Tone-Melody Rules (L4+M2): Luật CỨNG (Hard 100% không được vi phạm) hay WEIGHTED (Soft penalty + exception)?** | (A) Luật cứng tuyệt đối (như m-idea-02 Rule A/B/C/D - sắc BẮT BUỘC lên, huyền BẮT BUỘC xuống → fail compile nếu vi phạm), (B) Luật soft-weighted (như m-idea-01 mục16 YAML weight 0.82 - hầu hết trường hợp ưu tiên, nhưng có thể phá luật với penalty), (C) Hybrid: Luật cực kỳ nguy hiểm (sắc đi xuống mạnh ≥ quãng3) là Hard-cấm, còn luật nhẹ (quãng ≤2) là Soft-penalty | **(C) Hybrid** - Đây là cách cân bằng tốt nhất. Các luật gây "trại giọng" hiểu sai nghĩa (ví dụ sắc rơi xuống mạnh thành nghe như huyền) → Hard cấm (không thể phá được). Các luật nhẹ (ví dụ ngang đi lên nhẹ quãng 2) → Soft penalty chỉ trừ điểm ranking, vẫn cho phép. Bài hát hay thường cố ý phá luật ở đúng chỗ (như nhạc sĩ làm) → không nên 100% cứng | ⏳ Chưa Quyết Định | |
| **Q6** | **Scope MVP Giai đoạn 1 + 2: ĐÃ HẸP ĐỦ CHƯA? Hay nên loại bỏ THÊM gì cho chạy được SIÊU NHANH (time-to-first-DSL-file <2 tuần)?** | (A) Giữ nguyên scope như đề cập (Parser + Validator + AI Generation), (B) Bỏ luôn AI Generation ở MVP Phase 2, chỉ làm Parser+Validator thôi (chạy code tay nhập file DSL), rồi mới làm AI Generation sang Phase riêng, (C) Bỏ Rhythm/Duration ở Mục M1, chỉ cần Tonal-Pitch validation thôi (không cần duration cho MVP) | **(A) Giữ nguyên scope** - đã được tinh chỉnh hẹp. Nếu thực sự muốn nhanh hơn: (B) có thể làm tách Phase 2 ra riêng nhưng thời gian tổng không giảm nhiều. Parser + Validator thôi không có gì để user demo được hành trình "đi từ đâu đến bài hát". Nhiều thành viên sẽ mất động lực nếu 1 tháng sau vẫn chỉ có output text không nghe được | ⏳ Chưa Quyết Định | |
| **Q7** | **Syllable Atom Fields (S6 + S7): Danh sách ở kế hoạch ĐÃ ĐỦ chưa? Thêm/Bớt trường nào?** | Ý kiến các ideas khác nhau: (m-idea-03 có rhyme_group, beat_position, stress), (m-idea-05 không có rhyme_group có technique riêng), (m-idea-02 có kỹ thuật trong []), Thêm trường `melisma_type` cho 1 âm tiết nhiều nốt? Thêm `phoneme_hint` để override G2P? | **Khuyến nghị: Giữ tối thiểu trường ở MVP** - Bắt buộc: `syllable, tone, pitch[], duration[]`. Tùy chọn: `technique[], chord_context, phrase_break`. **BỎ đi ở MVP**: rhyme_group, stress_level, beat_position, semantic_role, vibrato_rate, vibrato_depth, pitch_bend_curve, phoneme_override. Thêm bất kỳ field nào cũng làm parser phức tạp hơn + cần more test cases. Thêm sau khi core ổn định theo YAGNI principle | ⏳ Chưa Quyết Định | |

---

## 5. TÀI LIỆU THAM KHẢO LIÊN QUAN (REFERENCE IDEAS)

| File IDEA | Nội dung chính đã được tổng hợp vào kế hoạch này |
|-----------|------------------------------------------------|
| `docs/ideas/m-language/m-idea-01.md` | Tầm nhìn 3 loại rules (Language/Music/Performance), 20 mục, kiến trúc Compiler, 4 Repos đề xuất, Universal Song Representation 4 lớp, Lock/Keep syntax, Hard+Soft rules với weights YAML, Rule-based AI loop |
| `docs/ideas/m-language/m-idea-02.md` | MLML syntax mẫu, System Prompt chuyên sâu (Role+Rules A/B/C/D+Output Format+Execution Steps), Python pretty_midi MIDI parser code mẫu, Golang G2P Longest Prefix Match code mẫu, Docker Microservices + Queue + gRPC architecture, OpenUTAU Headless CLI hướng dẫn, Vietnamese Phoneme Set |
| `docs/ideas/m-language/m-idea-03.md` | Đặc tả 9 phần chi tiết nhất, 4 lớp (Ngôn ngữ/Giai điệu/Kỹ thuật/Hòa âm), Bảng tra nhanh Tương thích Thanh-Hướng nốt, Cú pháp Inline mẫu + JSON Schema mẫu, Validator 5 chức năng (Hard+Soft scoring), Roadmap 5 giai đoạn chi tiết, Rủi ro kiểm chứng học thuật, 5 câu hỏi cuối |
| `docs/ideas/m-language/m-idea-04.md` | Nghiên cứu Kirby & Ladd 2016 (77% Similar motion), Phân nhóm Cao/Trung/Thấp, SongScript @meta/@section/@harmony/@vocal syntax, Tuple compact format (nhỏ gọn AI sinh tốt), 6 triển khai thực tế với AI hiện nay |
| `docs/ideas/m-language/m-idea-05.md` | VMS (Vietnamese Music Script) 4 Tầng chi tiết, Bảng Pitch Bend MIDI mapping CỤ THỂ (số học) cho 6 thanh điệu, Bảng Genre Lexicon (Pop Ballad/R&B/Nhạc Trẻ), Score JSON Format mẫu multi-track, Python Middleware 4 classes (Lyrics/Melody/Harmony/Technique Rules), Mixdown pydub code hướng dẫn |

---

## 6. LOG CẬP NHẬT (CHANGE LOG)

| Ngày | Người cập nhật | Nội dung thay đổi |
|------|---------------|------------------|
| 2026-08-24 | System | Tạo kế hoạch v0.1 đầu tiên từ 5 files ideas: Tổng hợp 53 vấn đề chia 8 nhóm, Roadmap 5 giai đoạn, 7 câu hỏi thảo luận, 6 rủi ro |
| YYYY-MM-DD | ______ | |
| YYYY-MM-DD | ______ | |

---

> *📄 File này là **Living Document** (tài liệu sống). Mỗi lần team có quyết định thảo luận mới → cập nhật cột Trạng thái/Quyết định + ghi vào Change Log. Không xóa các vấn đề cũ đã quyết định, chỉ đánh dấu và note lại lý do để trace back sau này.*
