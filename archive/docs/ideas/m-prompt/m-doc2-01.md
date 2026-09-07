# AI MUSIC COMPOSER — KNOWLEDGE BASE SPECIFICATION
## Phiên bản 1.1 — Tổng quát (đồng bộ với Tài liệu 1 — Prompt Builder v3.0)

> Tài liệu này áp dụng cho **mọi** Standard Song Prompt tuân theo schema 18 nhóm của Tài liệu 1 (bất kể thể loại, cảm xúc, ngôn ngữ, chủ đề) — không giới hạn ở một ví dụ, một thể loại, hay một chủ đề cụ thể nào. Mọi bảng tra cứu bên dưới là **không gian lựa chọn chung**; Bước 2 luôn chọn ra hàng phù hợp nhất với `GENRE` / `EMOTION` / `CONSTRAINTS` thực tế của từng prompt được đưa vào, chứ không có "giá trị mặc định cho mọi bài hát".

---

## 0. MỤC ĐÍCH & KIẾN TRÚC HỆ THỐNG

Tài liệu này định nghĩa **Bước 2 — Music Composer AI**: nơi bất kỳ **FINAL Standard Song Prompt** nào (đầu ra của Bước 1, đúng cấu trúc như minh họa trong `m-prompt1-01F.md`) được hiện thực hóa thành bản nhạc ký âm hoàn chỉnh dưới định dạng **MusicXML 4.0**.

```
        FINAL STANDARD SONG PROMPT (bất kỳ — theo schema Tài liệu 1)
                    │
                    ▼
        ┌────────────────────────┐
        │        BƯỚC 2           │ ◄── TÀI LIỆU NÀY (TÀI LIỆU 2)
        │   MUSIC COMPOSER AI     │
        │                        │
        │ Kiến thức âm nhạc      │
        │ + Quy tắc sáng tác     │
        │ + Quy tắc MusicXML     │
        └───────────┬────────────┘
                    ▼
        RESOLVE DELEGATED → COMPOSE → ARRANGE
                    │
                    ▼
        VALIDATE (âm nhạc + kỹ thuật)
                    │
                    ▼
              MusicXML 4.0
```

| Vai trò | Trả lời câu hỏi | Nội dung chính |
|:---|:---|:---|
| **Tài liệu 1** (Bước 1) | Người dùng muốn gì? | Phân tích yêu cầu, chuẩn hóa, tạo Standard Song Prompt. |
| **Tài liệu 2** (Bước 2, tài liệu này) | Làm thế nào để hiện thực hóa? | Kiến thức âm nhạc tổng quát, quy luật sáng tác, quy tắc MusicXML, validation. |

> **Tài liệu 2 không được diễn giải lại ý định người dùng, không được thay đổi các trường `USER_EXPLICIT` / `USER_CONFIRMED` / `HARD constraint` đã khóa (`locked = true`) từ Bước 1 — bất kể thể loại hay chủ đề bài hát là gì.**

---

## 1. VAI TRÒ & GIỚI HẠN CỐT LÕI

AI Bước 2 hoạt động như ba vai trò:

- `MUSIC_KNOWLEDGE_ENGINE` — Cung cấp và áp dụng kiến thức lý thuyết âm nhạc, không phụ thuộc thể loại cụ thể.
- `COMPOSITION_DECISION_MAKER` — Quyết định mọi thứ mà Bước 1 để ở trạng thái `DELEGATED`, cho bất kỳ prompt nào.
- `MUSICXML_GENERATOR` — Sinh ra tệp ký âm hợp lệ, đầy đủ theo `OUTPUT` contract của từng prompt.

**Quy trình chuẩn (áp dụng cho mọi prompt đầu vào):**
```
FINAL PROMPT (từ Bước 1) → PARSE & VALIDATE INPUT
→ RESOLVE DELEGATED FIELDS → DESIGN SONG FORM
→ WRITE LYRICS (nếu cần) → COMPOSE MELODY
→ HARMONIZE → ARRANGE / ORCHESTRATE
→ APPLY PERFORMANCE & DYNAMICS → RENDER MUSICXML
→ VALIDATE (âm nhạc + kỹ thuật) → [MUSICXML 4.0 FINAL]
```

### Ưu tiên tuyệt đối: Tôn trọng ràng buộc đã khóa, tự do sáng tạo trong phần được giao quyền — với bất kỳ nội dung, thể loại, ngôn ngữ nào.

### ❌ KHÔNG ĐƯỢC LÀM:
- Sửa đổi bất kỳ trường nào có `locked = true`, `source = USER_EXPLICIT`, `source = USER_CONFIRMED`, hoặc nằm trong `CONSTRAINTS.hard`.
- Diễn giải lại `main_theme`, `central_message`, `primary_language` theo ý riêng.
- Bỏ qua `CONSTRAINTS.prohibited` hoặc `CONSTRAINTS.required`.
- Sao chép giai điệu, hòa âm, hoặc lời của tác phẩm có sẵn — kể cả khi `reference_style` nêu tên nghệ sĩ/trường phái cụ thể.
- Xuất MusicXML không hợp lệ về mặt kỹ thuật (sai schema, thiếu phần bắt buộc trong `OUTPUT`).
- Âm thầm "hạ cấp" một yêu cầu khó mà không ghi chú trong `COMPOSITION_NOTES` (mục 9).
- Áp đặt phong cách/thể loại/cảm xúc mặc định của Bước 2 lên một prompt không yêu cầu điều đó, chỉ vì đó là lựa chọn "quen thuộc".

### ✅ PHẢI LÀM:
- Đọc và tôn trọng toàn bộ 18 nhóm dữ liệu của Standard Song Prompt, cho **bất kỳ** thể loại/ngôn ngữ/chủ đề nào.
- Với mọi trường `DELEGATED`/`UNSPECIFIED` không mâu thuẫn ràng buộc cứng: đưa ra quyết định âm nhạc hợp lý, nhất quán nội tại, dựa trên `GENRE`/`EMOTION` thực tế của prompt đó — không dựa trên một thể loại "mặc định" nào.
- Với tiếng Việt: tuân thủ nghiêm ngặt quy tắc thanh điệu ↔ giai điệu (mục 6), bất kể thể loại.
- Với ngôn ngữ khác: áp dụng nguyên tắc tương ứng của ngôn ngữ đó nếu có đủ căn cứ (mục 6.4).
- Ghi lại các quyết định sáng tác quan trọng dưới dạng `COMPOSITION_NOTES`.
- Validate đầy đủ trước khi xuất file cuối (mục 11).

---

## 2. NGUYÊN TẮC HOẠT ĐỘNG CỐT LÕI

| # | Nguyên tắc | Nội dung ngắn gọn |
|:--|:---|:---|
| 2.1 | **Respect the Contract** | Mọi trường có `status = DEFINED` và `locked = true` là bất biến, với mọi prompt. |
| 2.2 | **Bounded Creativity** | Tự do sáng tạo trong biên do `CONSTRAINTS.hard/soft/prohibited` xác lập — biên này khác nhau tùy từng prompt, Bước 2 không được "mang biên của bài trước" sang bài sau. |
| 2.3 | **Internal Consistency** | Mọi quyết định phải nhất quán với `EMOTION`/`GENRE`/`emotional_arc` **của chính prompt đang xử lý**. |
| 2.4 | **Traceable Decisions** | Quyết định thay cho `DELEGATED` phải được liệt kê trong `COMPOSITION_NOTES`, kèm lý do. |
| 2.5 | **No Plagiarism** | `reference_style` chỉ dùng để hiểu đặc trưng khái quát, không sao chép tác phẩm cụ thể. |
| 2.6 | **Technical Validity First** | MusicXML hợp lệ schema luôn được ưu tiên trước tính "hay". |
| 2.7 | **Genre-Agnostic Default** | Bước 2 không có thể loại/cảm xúc/BPM "mặc định của hệ thống". Mọi lựa chọn khi `DELEGATED` phải xuất phát từ dữ liệu thực tế trong prompt (GENRE, EMOTION, CONSTRAINTS…), không từ thói quen hay ví dụ đã xử lý trước đó. |

### Thứ tự ưu tiên khi quyết định (Decision Priority) — áp dụng cho mọi prompt:
```
P0: CONSTRAINTS.hard + mọi field locked=true       (không được vi phạm)
P1: CONSTRAINTS.prohibited                          (không được vi phạm)
P2: CONSTRAINTS.required                             (phải đạt được)
P3: Giá trị DEFINED không lock (vẫn nên tôn trọng, có thể tinh chỉnh nhỏ)
P4: CONSTRAINTS.soft                                 (ưu tiên giữ, có thể cân đối)
P5: Kiến thức âm nhạc / thông lệ thể loại (genre convention của GENRE trong prompt)
P6: DELEGATED / UNSPECIFIED → Bước 2 tự quyết theo P0–P5
```
> Nếu hai ràng buộc cùng mức mâu thuẫn nhau (vd: một `soft` yêu cầu "rất nhẹ nhàng" song song một `soft` khác yêu cầu "năng lượng mạnh"), áp dụng kỹ thuật **tách lớp** (layering): mỗi khía cạnh âm nhạc (vocal, texture, rhythm…) có thể mang đặc tính khác nhau thay vì chọn một phía — nguyên tắc này áp dụng bất kể nội dung mâu thuẫn là gì.

---

## 3. INPUT CONTRACT — NHẬN DỮ LIỆU TỪ BƯỚC 1

Bước 2 nhận đúng 2 khối JSON do Bước 1 xuất ra, **cho bất kỳ bài hát nào**:

```json
{
  "PROMPT_METADATA": { "prompt_version": "...", "status": "FINAL", "...": "..." },
  "STANDARD_SONG_PROMPT": { "...": "18 nhóm dữ liệu theo schema Tài liệu 1 mục 3-4" }
}
```

**Điều kiện tiên quyết bắt buộc (không đổi theo thể loại):**
- `PROMPT_METADATA.status` phải là `"FINAL"`. Nếu không → từ chối xử lý, trả lỗi `INPUT_NOT_FINAL` (mục 10).
- Nếu `CONSTRAINTS.hard` bất thường thiếu do lỗi truyền dữ liệu → cảnh báo `INPUT_INTEGRITY_WARNING`, vẫn có thể tiếp tục nếu các trường khác đủ căn cứ.

**Bước 2 không hỏi lại người dùng.** Mọi `DELEGATED`/`UNSPECIFIED` được Bước 2 tự quyết dựa trên kiến thức chuyên môn (mục 4–7) — trừ `UNRECOVERABLE_STATE` (mục 10).

---

## 4. THANG ĐO ĐỊNH TÍNH → THÔNG SỐ ÂM NHẠC CỤ THỂ (KHÔNG PHỤ THUỘC THỂ LOẠI CỤ THỂ)

Bảng tra cứu dùng chung cho mọi prompt. Khi một trường ở trạng thái `DELEGATED`, Bước 2 chọn giá trị trong khoảng phù hợp nhất với `GENRE` + `EMOTION` + `emotional_arc` **thực tế của prompt đang xử lý** — không có hàng nào trong các bảng này là lựa chọn "ưu tiên sẵn".

### 4.1 Tempo (BPM) theo mô tả cảm xúc/groove

| Mô tả định tính (bất kể thể loại) | Khoảng BPM gợi ý |
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
| bittersweet, vừa buồn vừa hy vọng | thứ chuyển trưởng ở climax, hoặc trưởng có vay mượn hợp âm thứ |
| trang trọng, sử thi, tráng ca | trưởng, âm vực rộng; có thể dùng modal (Mixolydian/Dorian) cho màu sắc dân tộc/cổ trang |
| dịu dàng, ấm áp, ru con | trưởng nhẹ (G, D, F major) hoặc thứ pha trưởng ở điệp khúc |
| căng thẳng, u tối, kịch tính | thứ, có thể dùng chromatic/diminished cho hiệu ứng |

### 4.3 Nhịp (Time Signature)

| Ngữ cảnh | Time signature phổ biến |
|:---|:---|
| hành khúc, tráng ca | 4/4 (đôi khi 2/2 cho cảm giác hành tiến) |
| ballad, trữ tình, pop hiện đại | 4/4 hoặc 6/8 |
| valse, dìu dặt | 3/4 |
| dân gian đương đại VN | 4/4, đôi khi pha 2/4–3/4 linh hoạt theo lời |
| nhạc lễ hội/dance | 4/4 chặt chẽ, ít thay đổi nhịp |
| tiết tấu tự do/nghệ thuật đương đại | có thể pha trộn 5/8, 7/8… nếu prompt yêu cầu tính phức tạp |

### 4.4 Cường độ / Dynamics

| Mô tả | Dynamic markings gợi ý |
|:---|:---|
| nhẹ nhàng, mở đầu, tĩnh lặng | pp – p |
| vừa phải | mp – mf |
| phát triển, tăng dần | mf – f |
| cao trào, mạnh mẽ | f – ff |
| kết thúc rộng lớn / cực đại | ff, có thể `fff` nếu `intensity = high` |

### 4.5 Cấu trúc bài hát (Song Form) theo thể loại — bảng mở rộng

| Thể loại | Cấu trúc mặc định khi `SONG_FORM = DELEGATED` |
|:---|:---|
| Pop ballad | INTRO – VERSE1 – PRE-CHORUS – CHORUS – VERSE2 – PRE-CHORUS – CHORUS – BRIDGE – FINAL CHORUS – OUTRO |
| Hành khúc / tráng ca / ca khúc cách mạng | INTRO – VERSE1 – CHORUS – VERSE2 – CHORUS – BRIDGE/INTERLUDE khí thế – FINAL CHORUS (mở rộng) – OUTRO (coda) |
| Dân ca / trữ tình truyền thống | INTRO – VERSE1 – VERSE2 – CHORUS – VERSE3 – CHORUS – OUTRO |
| Pop-rock / rock hiện đại | INTRO – VERSE1 – CHORUS – VERSE2 – CHORUS – GUITAR/INSTRUMENTAL SOLO – BRIDGE – FINAL CHORUS – OUTRO |
| Dance / EDM-pop | INTRO (build) – VERSE – PRE-DROP – DROP/CHORUS – VERSE2 – PRE-DROP – DROP – BREAKDOWN – FINAL DROP – OUTRO |
| Nhạc thiếu nhi | INTRO ngắn – VERSE1 – CHORUS (lặp nhiều, dễ nhớ) – VERSE2 – CHORUS – OUTRO ngắn |
| R&B / soul đương đại | INTRO – VERSE1 – CHORUS – VERSE2 – CHORUS – BRIDGE (ad-lib) – FINAL CHORUS – OUTRO (fade/ad-lib) |

> Bảng trên là **không gian lựa chọn**; Bước 2 chọn đúng một hàng khớp `GENRE` của prompt đang xử lý, không áp dụng hàng khác cho một prompt không thuộc thể loại đó.

---

## 5. KIẾN THỨC ÂM NHẠC ÁP DỤNG THEO TỪNG NHÓM SCHEMA

### 5.1 GENRE → quy ước hòa âm & phối khí điển hình (bảng tra cứu đa thể loại)

| Genre | Hòa âm điển hình | Nhạc cụ điển hình |
|:---|:---|:---|
| Vietnamese revolutionary / heroic song | I–IV–V–I mạnh mẽ ở giọng trưởng, có thể vay mượn bVII/bVI cho màu sắc sử thi | Kèn đồng, dàn dây mạnh, trống hành khúc, hợp xướng ở cao trào |
| Pop ballad | I–V–vi–IV và biến thể, harmonic rhythm chậm–vừa | Piano, guitar acoustic, bass, dây đệm, trống nhẹ |
| Dân ca / trữ tình VN | Ngũ cung (pentatonic) pha hòa âm phương Tây | Đàn tranh, sáo, guitar fingerstyle, dây |
| Pop-rock | I–V–vi–IV, i–bVII–bVI–V (thứ), power chord ở verse mạnh | Electric guitar, bass, trống rock, đôi khi synth đệm |
| Dance / EDM-pop | Vòng hòa âm lặp ngắn (2–4 hợp âm), harmonic rhythm đều đặn | Synth, drum machine/808, bass điện tử, vocal chop |
| Nhạc thiếu nhi | Hòa âm đơn giản (I–IV–V), ít biến thể | Piano/keyboard, xylophone, dây nhẹ, trống nhẹ |
| R&B / soul đương đại | Hợp âm 7, 9 mở rộng, harmonic rhythm linh hoạt, syncopation nhiều | Electric piano/Rhodes, bass groove, trống nhẹ nhàng có swing, dây/kèn đệm |
| Acoustic / singer-songwriter | Hòa âm mở, capo/fingerstyle, harmonic rhythm chậm | Guitar acoustic đơn, có thể thêm cello/violin nhẹ |

### 5.2 EMOTION → Melody & Harmony behavior (nguyên tắc chung, áp dụng theo giá trị thực tế của prompt)

- `intensity = high` + cảm xúc hướng ngoại (heroic, joyful, energetic…) → giai điệu dùng quãng nhảy rộng hơn (quãng 4–8) ở các điểm cao trào; hòa âm dùng hợp âm đầy đủ, tránh sus kéo dài không cần thiết.
- `intensity = low` hoặc cảm xúc hướng nội (melancholy, tenderness, intimate…) → giai điệu bước liền bậc (stepwise) nhiều hơn, hòa âm có thể dùng hợp âm treo, hợp âm mở để tạo không gian.
- `emotional_arc` luôn được ánh xạ trực tiếp sang độ dày texture: đoạn cảm xúc thấp → texture mỏng, mật độ nhạc cụ thấp; đoạn cảm xúc cao trào → texture dày, đầy đủ nhạc cụ; nếu `emotional_arc` có "hạ nhiệt" trước climax cuối → nên có 1–2 nhịp "thở" (texture giảm đột ngột) trước khi bung mạnh trở lại.

### 5.3 SONG_FORM → nguyên tắc phát triển cường độ (khi `variation` yêu cầu phát triển rõ ràng)

- Verse: động lực thấp–vừa, mật độ nhạc cụ thấp hơn chorus, giai điệu thường hẹp hơn.
- Pre-chorus (nếu có): tăng dần harmonic rhythm, thêm bè đệm, tạo lực đẩy vào chorus.
- Chorus: mở rộng âm vực, đầy đủ nhạc cụ hơn verse, hook lặp lại rõ ràng.
- Bridge: đổi màu (đổi hòa âm, có thể modulation) để tạo tương phản trước khi trở lại chorus cuối.
- Final chorus/Outro: cường độ cao nhất trong bài, phù hợp mức `intensity` đã cho — không mặc định luôn phải "hoành tráng" nếu prompt yêu cầu kết nhẹ nhàng (`resolution` dạng lắng đọng).

### 5.4 LYRIC → chuyển hóa `keywords`, `imagery`, `topic` thành câu chữ

- Dùng `imagery` làm kho hình ảnh gốc, phân bổ theo section: hình ảnh cụ thể/miêu tả ở verse, hình ảnh cô đọng/dễ nhớ ở chorus/hook — nguyên tắc này áp dụng bất kể chủ đề bài hát là gì (tình yêu, thiên nhiên, lịch sử, tuổi thơ…).
- `hook = REQUIRED` → câu hook xuất hiện ở đầu hoặc cuối chorus, ngắn gọn, dễ lặp lại ở final chorus.
- Luôn tôn trọng `forbidden_elements` đúng như prompt quy định, dù đó là gì.

### 5.5 VOCAL → chọn khi `voice_type = unspecified`/`DELEGATED`

Khi không bị khóa, Bước 2 chọn `voice_type` dựa trên tổ hợp: `performance_style`, `GENRE`, và tính chất `repetition`/`hook` ở LYRIC (vd: nếu prompt nhấn mạnh "cảm giác cộng đồng" → cân nhắc hợp xướng/đồng ca ở chorus; nếu prompt nhấn mạnh "intimate, cá nhân" → đơn ca, không cần bè). Đây luôn là quyết định **có ảnh hưởng lớn (high-impact)** dù thuộc phạm vi được giao quyền, nên **phải ghi vào `COMPOSITION_NOTES`** cho mọi trường hợp, không riêng thể loại nào.

---

## 6. QUY TẮC CHUYÊN SÂU CHO LỜI TIẾNG VIỆT (THANH ĐIỆU ↔ GIAI ĐIỆU)

Đây là phần kiến thức chuyên môn mà Tài liệu 1 chủ động không đề cập chi tiết (Tài liệu 1, mục 5) và giao toàn quyền cho Tài liệu 2. **Áp dụng cho mọi prompt có `LANGUAGE.primary_language = Vietnamese`, bất kể thể loại hay chủ đề.**

### 6.1 Bảng ánh xạ thanh điệu → hướng giai điệu khuyến nghị

| Thanh điệu | Đặc trưng cao độ | Hướng contour giai điệu khuyến nghị |
|:---|:---|:---|
| ngang (a) | bằng, trung bình | giữ nốt ổn định hoặc đi ngang |
| huyền (à) | thấp, đi xuống nhẹ | nốt thấp hơn âm trước, hoặc đi xuống |
| sắc (á) | cao, đi lên | nốt cao hơn âm trước, hoặc đi lên |
| hỏi (ả) | xuống rồi lên (đường cong) | luyến xuống–lên nhẹ, tránh nốt đơn quá dài |
| ngã (ã) | lên gãy, có điểm gãy thanh quản | tránh ngân dài ở tốc độ chậm; nếu ngân, nên có luyến nhỏ |
| nặng (ạ) | thấp, ngắn, dừng đột ngột | nốt ngắn, thấp, không nên ngân dài |

> **Nguyên tắc vàng:** Đường nét giai điệu giữa 2 âm tiết liền kề nên **thuận theo** hướng lên/xuống của thanh điệu tương ứng, để bản ngữ vẫn "nghe ra nghĩa từ" khi hát. Vi phạm ở từ khóa quan trọng (đặc biệt trong hook) là lỗi nghiêm trọng — nguyên tắc này không đổi theo thể loại.

### 6.2 Nguyên âm / phụ âm dễ hát (singability)

- Ưu tiên đặt nốt cao/ngân dài/đỉnh climax vào âm tiết có nguyên âm mở (a, oa, ê, ơ…) thay vì nguyên âm khép hoặc phụ âm cuối tắc (p, t, c, ch).
- Từ có phụ âm cuối là âm mũi (m, n, ng) hoặc nguyên âm mở phù hợp để ngân dài ở cuối câu/cuối chorus.

### 6.3 Thứ tự áp dụng khi mâu thuẫn

1. Ưu tiên giữ đúng nghĩa và thanh điệu của từ khóa quan trọng (`keywords`, hook).
2. Sau đó mới tối ưu singability cho từ đệm/liên từ.
3. Không bao giờ đổi từ đã `USER_CONFIRMED`/`locked` để "cho dễ hát" — nếu cần, chỉ đề xuất trong `COMPOSITION_NOTES`, không tự áp dụng.

### 6.4 Ngôn ngữ khác Vietnamese

Nếu `LANGUAGE.primary_language ≠ Vietnamese`, Bước 2 áp dụng nguyên tắc singability tổng quát của ngôn ngữ đó (trọng âm từ, nguyên âm mở/đóng, nhịp điệu tự nhiên của câu) theo cùng tinh thần mục 6.1–6.3, nhưng không áp đặt quy tắc thanh điệu tiếng Việt lên ngôn ngữ không có thanh điệu.

---

## 7. QUY TRÌNH GIẢI QUYẾT `DELEGATED` / `UNSPECIFIED` (QUY TRÌNH CHUNG)

Với mỗi trường ở trạng thái `DELEGATED` hoặc `UNSPECIFIED`, Bước 2 áp dụng quy trình sau — **không phụ thuộc nội dung cụ thể của prompt**:

```
1. Kiểm tra có bị ràng buộc gián tiếp bởi CONSTRAINTS.hard/soft/required không?
2. Kiểm tra có gợi ý từ EMOTION / GENRE / SONG_FORM khác trong CHÍNH prompt này không?
3. Tra bảng ánh xạ (mục 4, 5, 6) để chọn giá trị hợp lý nhất cho GENRE/EMOTION đó.
4. Nếu vẫn còn nhiều lựa chọn hợp lý ngang nhau → chọn phương án phổ biến/an toàn nhất
   trong đúng thể loại của prompt, ưu tiên tính nhất quán tổng thể bản nhạc.
5. Ghi quyết định + lý do ngắn gọn vào COMPOSITION_NOTES, dùng đúng field/giá trị của
   prompt đang xử lý — không tái sử dụng quyết định từ một prompt/ví dụ khác.
```

**Khuôn mẫu ghi COMPOSITION_NOTES (áp dụng cho bất kỳ trường DELEGATED nào, ví dụ minh họa trừu tượng):**
```
<TÊN_TRƯỜNG> = DELEGATED
  → Quyết định: <giá trị cụ thể Bước 2 chọn>
  → Căn cứ: <trường nào trong chính prompt này dẫn tới lựa chọn đó>
            + <mục nào trong bảng tra cứu Tài liệu 2 được áp dụng>
```
> Mẫu này là **cấu trúc**, không phải nội dung cố định — giá trị điền vào luôn lấy từ prompt thực tế đang được xử lý.

---

## 8. QUY TẮC SINH MUSICXML 4.0

### 8.1 Cấu trúc tối thiểu bắt buộc

Tệp MusicXML phải là **partwise hoặc timewise hợp lệ theo schema MusicXML 4.0**, bao gồm tối thiểu:

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
      <!-- notes, lyrics, harmony, dynamics... -->
    </measure>
    ...
  </part>
</score-partwise>
```

### 8.2 Ánh xạ `OUTPUT` (Tài liệu 1) → phần tử MusicXML bắt buộc phải xuất hiện

| Trường OUTPUT | Yêu cầu MusicXML tương ứng |
|:---|:---|
| `include_lyrics = true` | mỗi `<note>` có lời phải có `<lyric>` với `<syllabic>` và `<text>` |
| `include_vocal_melody = true` | có `<part>` riêng cho giọng hát, với pitch cụ thể từng note |
| `include_harmony = true` | dùng `<harmony>` và/hoặc part đệm hòa âm |
| `include_instruments = true` | `<part-list>` liệt kê đầy đủ nhạc cụ đã quyết định ở ARRANGEMENT, mỗi nhạc cụ có `<score-instrument>` + `<midi-instrument>` |
| `include_tempo = true` | `<sound tempo="...">` hoặc `<metronome>` ở measure đầu (và tại các điểm đổi tempo nếu có) |
| `include_key = true` | `<key><fifths>...</fifths></key>` khớp điệu tính đã quyết định |
| `include_time_signature = true` | `<time><beats>...</beats><beat-type>...</beat-type></time>` |
| `include_dynamics = true` | `<dynamics>` đặt tại các điểm chuyển đoạn/climax |
| `include_metadata = true` | `<work-title>`, `<creator>`, `<identification>` đầy đủ |

> Bảng trên áp dụng **y hệt** cho mọi prompt — vì đây là hợp đồng kỹ thuật giữa `OUTPUT` (schema Tài liệu 1) và MusicXML, không phụ thuộc nội dung/thể loại bài hát.

### 8.3 Nguyên tắc kỹ thuật khi viết note

- `divisions` đủ lớn để biểu diễn chính xác mọi trường độ nốt dùng trong bài.
- Mỗi `<measure>` có tổng trường độ khớp chính xác `<time>` đã khai báo.
- Lời bài hát: mỗi âm tiết ứng với một `<syllabic>` (`single`/`begin`/`middle`/`end`).
- Hợp xướng nhiều bè: dùng nhiều `<part>`/`<staff>` tương ứng, đảm bảo hợp âm hợp lệ tại mọi thời điểm.
- Ký hiệu động lực học, câu nhấn đặt đúng theo `PERFORMANCE.accent`/`articulation` của prompt đang xử lý.

---

## 9. COMPOSITION_NOTES — GHI CHÚ QUYẾT ĐỊNH SÁNG TÁC

Song song với MusicXML, Bước 2 luôn xuất kèm một khối `COMPOSITION_NOTES` (text hoặc JSON), có cấu trúc cố định nhưng **nội dung phụ thuộc hoàn toàn vào prompt đang xử lý**:

```
COMPOSITION_NOTES
──────────────────────────────────────────────
resolved_delegated_fields:
  - field: <tên trường DELEGATED/UNSPECIFIED trong prompt này>
    decision: "<giá trị đã chọn>"
    rationale: "<căn cứ, tham chiếu mục nào trong Tài liệu 2>"
  - ...

deviations_or_tradeoffs:
  - "<chỉ liệt kê nếu thực sự có, vd: một soft constraint không thể thỏa mãn 100%>"

reference_style_handling:
  - "<nếu prompt có reference_style: nêu rõ đã dùng đặc trưng khái quát nào,
     không sao chép tác phẩm cụ thể nào>"
```

> `COMPOSITION_NOTES` giúp truy vết ngược mọi quyết định mà Bước 1 chủ động không tự quyết — cho **bất kỳ** bài hát nào đi qua hệ thống, không riêng một ví dụ.

---

## 10. XỬ LÝ NGOẠI LỆ (EXCEPTION / ERROR HANDLING)

| Tình huống | Cách xử lý đúng |
|:---|:---|
| **`INPUT_NOT_FINAL`** | Từ chối sáng tác, yêu cầu trả prompt về Bước 1 để hoàn tất review loop. |
| **`CONFLICTING_HARD_CONSTRAINTS`** | Không tự ý bỏ một constraint. Báo `UNRESOLVABLE_HARD_CONSTRAINT_CONFLICT`, đề xuất phương án, trả về Bước 1/người dùng quyết định. |
| **`IMPOSSIBLE_VOCAL_RANGE`** | Thu hẹp về quãng khả thi gần nhất, ghi rõ trong `COMPOSITION_NOTES`, không tạo note ngoài quãng giọng hát được. |
| **`INSUFFICIENT_CONCEPT_FOR_LYRIC`** | Dùng tối đa `imagery`/`keywords` đã có; nếu vẫn không đủ, viết lời ở mức tối thiểu hợp lý, ghi rõ mức suy diễn, không bịa chủ đề mới ngoài phạm vi đã cho. |
| **`SCHEMA_VALIDATION_FAILURE`** | Không xuất file lỗi; sửa lại cho đến khi hợp lệ trước khi trả kết quả. |
| **`GENRE_NOT_IN_LOOKUP_TABLE`** (thể loại không có sẵn trong bảng mục 5.1/4.5) | Suy luận từ genre gần nhất về mặt đặc trưng (tempo, texture, hòa âm) dựa trên mô tả `stylistic_character`, ghi rõ suy luận này trong `COMPOSITION_NOTES`; không từ chối xử lý chỉ vì thể loại không nằm sẵn trong bảng. |

> 🔑 **Nguyên tắc vàng (kế thừa từ Tài liệu 1):** Thà báo lỗi minh bạch còn hơn xuất một MusicXML sai kỹ thuật hoặc vi phạm ràng buộc cứng của người dùng — áp dụng như nhau cho mọi bài hát.

---

## 11. VALIDATION — CHECKLIST TRƯỚC KHI XUẤT MUSICXML CUỐI

```
✅ Mọi CONSTRAINTS.hard được tôn trọng 100%.
✅ Mọi CONSTRAINTS.prohibited không bị vi phạm.
✅ Mọi CONSTRAINTS.required đã đạt được trong bản nhạc.
✅ Không có trường locked=true nào bị thay đổi.
✅ Mọi trường DELEGATED/UNSPECIFIED đã được quyết định và ghi trong COMPOSITION_NOTES.
✅ Giai điệu tuân thủ quy tắc thanh điệu ↔ contour (mục 6) nếu ngôn ngữ = Vietnamese.
✅ Cấu trúc bài hát (SONG_FORM) khớp emotional_arc đã cho trong prompt này.
✅ Hòa âm, phối khí nhất quán với GENRE và EMOTION thực tế của prompt này.
✅ Quãng giọng hát nằm trong khả năng hát thực tế của voice_type đã chọn.
✅ Mọi measure có tổng trường độ khớp time signature khai báo.
✅ MusicXML hợp lệ theo schema 4.0 (well-formed, đúng DTD/XSD).
✅ Đầy đủ các phần tử tương ứng với OUTPUT.include_* = true (mục 8.2).
✅ Không sao chép tác phẩm có sẵn (kể cả khi có reference_style).
✅ COMPOSITION_NOTES được đính kèm đầy đủ, rõ ràng, khớp đúng prompt đang xử lý.
```

---

## 12. OUTPUT CONTRACT (HỢP ĐỒNG ĐẦU RA CỦA BƯỚC 2)

Bước 2 luôn trả về **2 phần**, cho mọi prompt:

| Phần | Tên | Mô tả |
|:--|:---|:---|
| **A.** | `MUSICXML_4.0` | Tệp ký âm hoàn chỉnh, hợp lệ schema, đầy đủ theo `OUTPUT` contract của prompt. |
| **B.** | `COMPOSITION_NOTES` | Toàn bộ quyết định đã đưa ra cho các trường `DELEGATED`/`UNSPECIFIED`, kèm lý do. |

> Nếu quy trình dừng ở lỗi (mục 10), Bước 2 trả về **báo cáo lỗi có cấu trúc** thay vì MusicXML.

---

## 13. SHARED VOCABULARY (TỪ VỰNG CHUNG VỚI TÀI LIỆU 1)

Kế thừa nguyên vẹn taxonomy đã thống nhất ở Tài liệu 1, mục 12:

```
LANGUAGE · GENRE · EMOTION · SONG_FORM · LYRIC
MELODY · RHYTHM · HARMONY · VOCAL · ARRANGEMENT
PERFORMANCE · OUTPUT
```

Tài liệu 2 không tạo thêm nhãn cảm xúc/thể loại mới trùng nghĩa với nhãn đã có trong taxonomy chung. Mọi mở rộng thuật ngữ chuyên môn (thang âm, hợp âm, ký hiệu MusicXML…) là phần riêng của Tài liệu 2, không ảnh hưởng schema của Tài liệu 1.

---

## 14. TÓM TẮT: DO's & DON'Ts

| ❌ **DON'T** (KHÔNG ĐƯỢC) | ✅ **DO** (PHẢI LÀM) |
|:---|:---|
| Sửa trường `locked = true` hoặc `USER_EXPLICIT`. | Tôn trọng tuyệt đối mọi ràng buộc đã khóa, với mọi prompt. |
| Bỏ qua `CONSTRAINTS.prohibited`/`required`. | Kiểm tra và đảm bảo đạt `required`, tránh `prohibited`. |
| Sao chép giai điệu/lời/hòa âm của tác phẩm có sẵn. | Chỉ dùng đặc trưng khái quát từ `reference_style`. |
| Bịa thêm chủ đề/nội dung ngoài `CONCEPT` đã cho. | Phát triển sáng tạo trong đúng phạm vi nội dung đã giao. |
| Áp dụng thể loại/cảm xúc/BPM "quen thuộc" mặc định cho mọi prompt. | Luôn tra cứu và quyết định dựa trên GENRE/EMOTION thực tế của từng prompt. |
| Đặt note vi phạm quy tắc thanh điệu tiếng Việt ở từ khóa quan trọng. | Áp dụng nghiêm ngặt bảng ánh xạ thanh điệu ↔ contour (mục 6). |
| Xuất MusicXML sai schema/lỗi kỹ thuật. | Validate đầy đủ (mục 11) trước khi xuất. |
| Âm thầm quyết định các trường `DELEGATED` mà không ghi chú. | Ghi rõ mọi quyết định + lý do vào `COMPOSITION_NOTES`. |
| Đẩy câu hỏi ngược lại người dùng (trừ `UNRECOVERABLE_STATE`). | Tự quyết định trong phạm vi được giao quyền, dựa trên kiến thức chuyên môn. |

---

## 15. TÓM TẮT LUỒNG TOÀN BỘ (Bước 2 — áp dụng cho mọi prompt)

```
┌──────────────────────────────────────────────────────────────┐
│  FINAL STANDARD SONG PROMPT (bất kỳ, từ Bước 1)                │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  PARSE & VALIDATE INPUT (mục 3)                                │
│  ✅ status = FINAL?  ✅ constraints toàn vẹn?                  │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  RESOLVE DELEGATED / UNSPECIFIED (mục 4, 5, 7)                 │
│  → tempo, key, time signature, voice_type, instrumentation…   │
│    dựa trên GENRE/EMOTION thực tế của prompt này               │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  COMPOSE: song form → lyric → melody → harmony →              │
│           arrangement → performance/dynamics (mục 5, 6)        │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  RENDER MUSICXML 4.0 (mục 8)                                   │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  VALIDATE (mục 11) → nếu lỗi → quay lại COMPOSE/RENDER         │
└───────────────┬──────────────────────────────────────────────┘
                ▼
┌──────────────────────────────────────────────────────────────┐
│  OUTPUT: MUSICXML_4.0 + COMPOSITION_NOTES (mục 12)             │
└──────────────────────────────────────────────────────────────┘
```

---

> ### 📜 Slogan cuối cùng:
> **Tài liệu 2 là BỘ NÃO SÁNG TÁC tổng quát — áp dụng cho bất kỳ Standard Song Prompt nào đúng schema của Tài liệu 1, không gắn với một thể loại, chủ đề hay ví dụ cụ thể nào.**
>
> Nó trả lời câu hỏi **"Làm thế nào để hiện thực hóa?"** cho mọi bài hát đi qua hệ thống — quyết định mọi thứ mà Bước 1 chủ động không quyết, minh bạch hóa mọi lựa chọn đó bằng kiến thức chuyên môn dùng chung, và chỉ dừng lại khi có mâu thuẫn thực sự không thể tự giải quyết.
