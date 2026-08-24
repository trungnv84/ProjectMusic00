Đây là một ý tưởng rất hay và thực ra không phải bắt đầu từ số 0 — có nền tảng ngôn ngữ học lẫn công nghệ để bạn dựa vào. Tôi chia thành 4 phần: cơ sở đã có, các định dạng "ngôn ngữ hát" hiện đại có thể tham khảo, đề xuất thiết kế bộ ký hiệu hợp nhất, và lộ trình xây dựng.

## 1. Cơ sở ngôn ngữ học đã tồn tại

Tiếng Việt có 6 thanh điệu, mỗi thanh có **đường nét cao độ (contour)** riêng:
- **Ngang**: bằng phẳng
- **Huyền**: đi xuống, thấp
- **Sắc**: đi lên
- **Hỏi**: xuống rồi lên (hình võng)
- **Ngã**: lên nhưng bị ngắt (gãy giọng)
- **Nặng**: xuống nhanh, ngắt

Trong âm nhạc truyền thống Việt Nam (chèo, ca trù, quan họ, dân ca), có một nguyên tắc bất thành văn nhưng rất chặt: **giai điệu phải "đi theo" hướng của thanh điệu**, nếu không sẽ gây "trại giọng" — người nghe hiểu sai nghĩa từ (vì tiếng Việt là ngôn ngữ có nghĩa phân biệt bằng thanh điệu). Đây chính là quy tắc cốt lõi mà một bộ luật của bạn cần hình thức hóa. Nó đã được các nhà nghiên cứu âm nhạc dân tộc học Việt Nam mô tả (dù rải rác, chưa có bộ luật số hóa hoàn chỉnh) — bạn sẽ phải tự hệ thống hóa phần này, đây chính là phần giá trị nhất trong dự án của bạn.

## 2. Các định dạng "ngôn ngữ hát bằng văn bản" đã có sẵn để tham khảo

Đây là phần quan trọng vì bạn không cần phát minh lại từ đầu cách biểu diễn nốt+lời+kỹ thuật hát bằng text:

| Định dạng | Biểu diễn được gì |
|---|---|
| **UST (UTAU) / VSQx (Vocaloid)** | Lời (theo âm tiết) + cao độ + trường độ + kỹ thuật (rung/vibrato, bend cao độ) — gần nhất với thứ bạn muốn |
| **DiffSinger data format** | phoneme + note + note_duration + is_slur (đánh dấu luyến) — rất phù hợp làm khung tham khảo cho phần "luyến láy" |
| **MusicXML** | Chuẩn trao đổi bản nhạc, có gắn lời vào từng nốt, hỗ trợ ký hiệu biểu cảm (ornament) |
| **ABC notation** | Ký âm dạng text thuần, gọn, dễ AI sinh ra vì ít token |
| **ChordPro** | Gắn hợp âm vào giữa dòng lời — dùng tham khảo cho phần hoà âm/nhạc cụ |

## 3. Đề xuất thiết kế bộ ký hiệu hợp nhất

Tôi nghĩ bạn nên thiết kế theo **kiến trúc nhiều lớp (layered)**, mỗi âm tiết mang đủ thông tin:

```
Âm tiết: "em"
├─ Thanh điệu: ngang (bằng phẳng)
├─ Vần: nhóm A (em/đêm/thêm...)
├─ Nốt nhạc: C4
├─ Trường độ: 1/4
├─ Kỹ thuật: none | luyến(C4→D4) | láy | nhấn | rung(vibrato)
└─ Hợp âm nền: Cmaj
```

Ví dụ cú pháp gợi ý (dạng inline, dễ AI sinh và dễ parser đọc):

```
em[ngang|C4:1/4|-] về[huyền|A3:1/8→G3:1/8(luyến)|-] đây[sắc|E4:1/4|nhấn] {Cmaj}
```

Điểm mấu chốt: **thanh điệu quyết định hướng đi của nốt nhạc** (ví dụ thanh sắc không thể gán nốt đi xuống mạnh), còn **luyến/láy/nhấn** là lớp kỹ thuật hát chồng lên trên, tương tự cách UST/DiffSinger đánh dấu `is_slur`.

## 4. Lộ trình xây dựng

**Bước 1 – Hệ thống hóa luật thanh điệu ↔ giai điệu**
Đây là phần nghiên cứu, không phải lập trình: liệt kê chính xác với mỗi thanh, khoảng cao độ nào là "an toàn" (không đảo nghĩa), khoảng nào là "cấm". Có thể tham khảo cách các nhạc sĩ phổ thơ Việt Nam vẫn làm theo bản năng, rồi rút ra quy tắc tường minh.

**Bước 2 – Thiết kế cú pháp DSL (ngôn ngữ ký hiệu)**
Chọn dạng dễ AI sinh (ưu tiên ít token, cấu trúc rõ ràng) — có thể dùng JSON/YAML cho máy đọc, và một dạng rút gọn như ví dụ trên cho AI sinh trực tiếp.

**Bước 3 – Xây parser + validator**
Viết chương trình kiểm tra: nếu AI sinh ra một câu vi phạm luật thanh điệu (ví dụ thanh huyền nhưng gán nốt nhảy vọt lên), validator báo lỗi — dùng để tự động sửa hoặc làm tín hiệu phản hồi khi fine-tune.

**Bước 4 – Dạy AI dùng ngôn ngữ này**
Không cần train từ đầu — có thể few-shot prompting: đưa cho Claude/GPT vài chục ví dụ mẫu theo đúng cú pháp, kèm bộ luật viết rõ ràng dạng văn bản, rồi yêu cầu sinh theo. Nếu muốn chất lượng cao và ổn định hơn, fine-tune một model nhỏ mã nguồn mở trên tập dữ liệu bạn tự tạo theo DSL này.

**Bước 5 – Bộ chuyển đổi (renderer)**
Viết converter: DSL của bạn → MIDI/MusicXML (cho phần nhạc) và → định dạng DiffSinger/NNSVS (cho phần hát) → cuối cùng ra audio.

**Bước 6 – Vòng lặp cải thiện**
Dùng chính bộ luật làm "giám khảo" tự động để đánh giá và fine-tune tiếp AI sinh nội dung.

---

Đây thực chất là một dự án nghiên cứu (âm vị học + âm nhạc học tính toán) chứ không chỉ là kỹ thuật thuần túy — phần khó nhất và giá trị nhất chính là Bước 1. Nếu bạn muốn, tôi có thể giúp soạn một **tài liệu đặc tả (spec) chi tiết** cho bộ luật thanh điệu-giai điệu và cú pháp DSL này dưới dạng file để bạn dùng làm nền tảng phát triển — bạn có muốn tôi làm việc đó không?

---

Tôi đã soạn xong tài liệu đặc tả gồm 9 phần: bảng ánh xạ 6 thanh điệu → hướng đi nốt nhạc, quy tắc vần, quy tắc giai điệu/trường độ, ký hiệu kỹ thuật hát (luyến/láy/nhấn/rung), khung hòa âm, cú pháp DSL (cả dạng inline dễ AI sinh lẫn dạng JSON để huấn luyện), thiết kế validator, và lộ trình 5 giai đoạn triển khai.

Vài điểm bạn nên lưu ý khi dùng tài liệu này:

- Bảng quy tắc thanh điệu ở mục 2.2 là **giả thuyết làm việc ban đầu** dựa trên quan sát thực tế trong dân ca/nhạc truyền thống — chưa phải luật đã kiểm chứng học thuật đầy đủ, nên bạn cần đối chiếu thêm với tài liệu ngôn ngữ học hoặc chuyên gia âm nhạc dân tộc học trước khi dùng làm dữ liệu huấn luyện quy mô lớn.
- Tôi đề xuất bắt đầu hẹp: chỉ Lớp 1 + Lớp 2 (thanh điệu + giai điệu cơ bản) làm MVP trước, để bạn có thể test validator nhanh bằng cách chấm lại các bài hát nổi tiếng đã biết là "phổ đúng".

Bạn muốn tôi tiếp tục với phần nào tiếp theo — viết code Python mẫu cho validator (kiểm tra luật thanh điệu-hướng nốt), hay soạn bộ 15-30 ví dụ mẫu theo cú pháp DSL để dùng few-shot prompting với API Claude?

# Đặc tả: Bộ quy tắc Thanh điệu–Giai điệu và Ngôn ngữ Ký hiệu (DSL) cho Sáng tác & Phổ nhạc Tiếng Việt

**Phiên bản:** 0.1 (bản nháp làm nền tảng phát triển)
**Mục tiêu:** Xây dựng một hệ thống quy tắc và cú pháp văn bản thuần túy để AI có thể sáng tác lời, phổ nhạc, gán kỹ thuật hát (luyến, láy, nhấn, rung) và hòa âm cho tiếng Việt một cách nhất quán, không "trại giọng", không sai nghĩa.

---

## 1. Tổng quan kiến trúc

Hệ thống gồm 4 lớp quy tắc độc lập nhưng liên kết với nhau qua một đơn vị chung: **âm tiết (syllable)**.

```
Lớp 1: NGÔN NGỮ      — thanh điệu, vần, số âm tiết/dòng
Lớp 2: GIAI ĐIỆU      — cao độ, trường độ, hướng đi của nốt
Lớp 3: KỸ THUẬT HÁT   — luyến, láy, nhấn, rung, ngân, ngắt hơi
Lớp 4: HÒA ÂM         — hợp âm nền, nhạc cụ, tiết tấu
```

Mỗi âm tiết trong bài hát được biểu diễn như một "gói dữ liệu" mang đủ 4 lớp thông tin trên. Đây là đơn vị nguyên tử của toàn bộ DSL.

---

## 2. Lớp 1 — Quy tắc Ngôn ngữ (Thanh điệu & Vần)

### 2.1 Bảng 6 thanh điệu và đường nét cao độ chuẩn

| Thanh | Dấu | Đường nét (contour) | Mô tả vật lý |
|---|---|---|---|
| Ngang | (không dấu) | Bằng phẳng, trung bình | Cao độ giữ nguyên, không lên không xuống |
| Huyền | ` | Đi xuống, thấp dần | Bắt đầu trung bình, xuống thấp, hơi kéo dài |
| Sắc | ´ | Đi lên, ngắn | Bắt đầu trung bình/cao, đi lên dứt khoát |
| Hỏi | ̉ | Xuống rồi lên (hình võng) | Đi xuống trước, sau đó nhấc lên nhẹ ở cuối |
| Ngã | ~ | Lên nhưng bị ngắt giữa chừng | Đi lên, có điểm gãy/ngắt thanh quản ở giữa |
| Nặng | ̣ | Xuống nhanh, ngắn, ngắt | Đi xuống đột ngột, âm ngắn, kết thúc dứt khoát |

### 2.2 Quy tắc ánh xạ Thanh điệu → Hướng đi của nốt nhạc

Đây là **quy tắc lõi**, quyết định việc phổ nhạc có làm sai nghĩa từ hay không (gọi là hiện tượng "trại giọng").

**Luật bắt buộc:**
1. Với 2 âm tiết liên tiếp có thanh điệu khác nhau, **hướng chuyển động cao độ giữa 2 nốt phải cùng chiều hoặc trung lập** với hướng đường nét thanh điệu của âm tiết sau so với âm tiết trước.
2. Không được gán nốt đi lên mạnh (quãng 4, 5 trở lên) cho một âm tiết mang thanh Huyền, Hỏi, hoặc Nặng nếu âm tiết trước có cao độ thấp hơn hoặc bằng — vì sẽ nghe giống thanh Sắc hoặc Ngã.
3. Không được gán nốt đi xuống mạnh cho âm tiết mang thanh Sắc, Ngã — vì sẽ nghe giống thanh Huyền hoặc Nặng.
4. Thanh Ngang là thanh "an toàn nhất" — chấp nhận được với nhiều hướng đi nốt hơn (vì không có yêu cầu contour rõ rệt), nhưng vẫn nên giữ ở quãng hẹp nếu âm tiết liền kề có thanh rõ nét (Sắc/Huyền/Ngã/Hỏi/Nặng).
5. Thanh Hỏi và Ngã cần một **điểm gãy** trong giai điệu — có thể thể hiện bằng: (a) hai nốt liền kề trong cùng âm tiết (melisma ngắn), hoặc (b) kỹ thuật láy/rung ở đúng âm tiết đó.

**Bảng tra nhanh mức độ tương thích (dùng cho validator):**

| Thanh của âm tiết hiện tại | Hướng nốt cho phép so với âm tiết trước | Hướng bị cấm |
|---|---|---|
| Ngang | Cùng cao độ, hoặc lên/xuống nhẹ (≤ quãng 2) | Nhảy quãng lớn (≥ quãng 5) đột ngột |
| Huyền | Giữ nguyên hoặc đi xuống | Đi lên (đặc biệt ≥ quãng 3) |
| Sắc | Đi lên | Đi xuống |
| Hỏi | Xuống rồi lên trong nội bộ âm tiết, kết ở mức trung bình-thấp | Đi lên thẳng một mạch không có điểm võng |
| Ngã | Đi lên có ngắt giữa chừng | Đi xuống, hoặc đi lên liền mạch không ngắt |
| Nặng | Đi xuống, ngắn, có ngắt cuối | Đi lên, hoặc kéo dài ngân nga |

> **Ghi chú kỹ thuật:** Bảng trên là điểm khởi đầu dựa trên quan sát thực tế trong dân ca/nhạc truyền thống Việt Nam. Đây KHÔNG phải luật vật lý ngữ âm học đã được kiểm chứng khoa học đầy đủ — bạn nên coi đây là giả thuyết làm việc (working hypothesis) và tinh chỉnh dần bằng cách: (1) đối chiếu với các bài hát nổi tiếng đã "phổ đúng", (2) thử nghiệm A/B với người nghe bản ngữ để xác nhận từ có bị hiểu sai nghĩa không.

### 2.3 Quy tắc vần (rhyme)

- Vần được xác định theo **phần vần** của âm tiết (không tính phụ âm đầu), ví dụ: "em", "đêm", "thêm" cùng nhóm vần "êm".
- Với thơ lục bát / song thất lục bát truyền thống: vị trí gieo vần cố định (chữ cuối câu 6 vần với chữ thứ 6 câu 8, v.v.) — nếu dự án hỗ trợ thể thơ dân tộc, nên có sẵn bộ khuôn mẫu số âm tiết/vị trí vần cho: lục bát, song thất lục bát, thất ngôn.
- Với lời bài hát hiện đại: vần thường ở cuối câu/dòng nhạc (thường trùng với cuối câu nhạc hoặc trước dấu lặng).
- Nên phân biệt: **vần chính** (giống hệt phần vần) và **vần thông** (gần giống, ví dụ "an"–"ang") để tăng độ linh hoạt khi sinh lời.

---

## 3. Lớp 2 — Quy tắc Giai điệu

### 3.1 Tham số mỗi âm tiết

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `pitch` | Tên nốt (VD: C4, D#4) hoặc danh sách nốt nếu melisma | Cao độ |
| `duration` | Phân số nhịp (VD: 1/4, 1/8, 1/8.) | Trường độ |
| `beat_position` | Vị trí trong ô nhịp | Dùng để xác định phách mạnh/nhẹ |

### 3.2 Quy tắc phách mạnh–nhẹ và trọng âm từ

- Âm tiết mang trọng âm ngữ nghĩa cao (thường là từ nội dung: danh từ, động từ chính) nên rơi vào **phách mạnh**.
- Hư từ (thì, là, mà, đã...) nên rơi vào **phách nhẹ** hoặc nốt ngắn.
- Đây là quy tắc mềm (soft constraint) — dùng để chấm điểm "độ tự nhiên" chứ không cấm tuyệt đối.

### 3.3 Quy tắc trường độ theo thanh điệu

- Thanh Huyền, Ngã thường được ngân dài hơn tự nhiên trong khẩu ngữ Việt → nên ưu tiên gán trường độ dài hơn hoặc bằng trung bình.
- Thanh Sắc, Nặng thường ngắn, dứt khoát → nên ưu tiên trường độ ngắn hơn hoặc bằng trung bình.

---

## 4. Lớp 3 — Kỹ thuật hát (Luyến, Láy, Nhấn, Rung, Ngắt hơi)

| Kỹ thuật | Ký hiệu đề xuất | Điều kiện áp dụng |
|---|---|---|
| Luyến (một âm tiết trải trên ≥2 nốt, không đổi âm tiết) | `luyến(C4→D4)` | Thường dùng khi cần nối mượt giữa 2 thanh có hướng khác nhau, hoặc thể hiện thanh Hỏi/Ngã |
| Láy (lặp lại nhanh 1 quãng nhỏ quanh nốt chính) | `láy` | Thường ở cuối câu, cuối đoạn, tạo màu sắc dân gian |
| Nhấn (accent) | `nhấn` | Âm tiết mang trọng âm ngữ nghĩa, rơi vào phách mạnh |
| Rung (vibrato) | `rung(tốc độ, biên độ)` | Nốt ngân dài, thường cuối câu hoặc cuối bài |
| Ngắt hơi | `|` (dấu ngắt giữa các cụm từ) | Đánh dấu ranh giới hơi thở, không cắt giữa từ ghép |
| Ngân (hold) | `ngân(số phách)` | Nốt cuối câu/đoạn, thường trên nguyên âm mở |

**Quy tắc liên kết với thanh điệu (đề xuất ban đầu):**
- Hỏi, Ngã → ưu tiên gán `luyến` hoặc `láy` để thể hiện đúng đường nét gãy khúc.
- Nặng, Sắc → hạn chế `ngân` dài vì bản chất các thanh này ngắn, dứt khoát trong khẩu ngữ.
- Cuối câu/đoạn (bất kể thanh gì) → có thể thêm `rung` nếu là nốt kết thúc dài.

---

## 5. Lớp 4 — Hòa âm & Nhạc cụ

### 5.1 Khung tối giản ban đầu (khuyến nghị bắt đầu từ đây)

- Gán hợp âm theo từng ô nhịp hoặc từng câu, dùng ký hiệu kiểu ChordPro: `{Cmaj}`, `{Am7}`, `{G/B}`...
- Chọn vòng hòa âm (chord progression) theo thể loại: ví dụ Pop/Ballad Việt thường dùng I–V–vi–IV hoặc vi–IV–I–V.
- Nhạc cụ: khởi đầu chỉ cần gán "vai trò" (đệm hợp âm / bè giai điệu / bass line / trống-tiết tấu) thay vì mô tả chi tiết kỹ thuật chơi từng nhạc cụ — việc này để renderer (MIDI/audio) xử lý.

### 5.2 Mở rộng sau này (giai đoạn 2, chưa cần làm ngay)

- Quy tắc riêng cho từng nhạc cụ dân tộc (đàn tranh, đàn bầu, sáo trúc...) — mỗi nhạc cụ có âm vực, kỹ thuật rung/nhấn riêng, ánh xạ với kỹ thuật hát ở Lớp 3.
- Quy tắc phối khí theo thể loại (dân ca Bắc Bộ, cải lương, pop hiện đại...).

*(Đây là phần nên để lại giai đoạn sau — nếu cố làm chi tiết ngay từ đầu sẽ làm dự án quá tải trước khi có bản MVP chạy được.)*

---

## 6. Cú pháp DSL đề xuất (bản rút gọn, dễ AI sinh)

### 6.1 Cú pháp inline mỗi âm tiết

```
<âm_tiết>[<thanh>|<nốt>:<trường_độ>(<kỹ_thuật>)|<ghi_chú>]
```

### 6.2 Ví dụ một dòng lời hoàn chỉnh

```
{Cmaj}
em[ngang|C4:1/4|-] về[huyền|A3:1/8→G3:1/8(luyến)|-] đây[sắc|E4:1/4|nhấn] {G7}
nghe[ngang|D4:1/8|-] gió[sắc|F4:1/4|nhấn] hát[sắc|G4:1/4(láy)|-] |
ru[ngang|E4:1/4|-] đời[huyền|C4:1/2(rung:5,vừa)|ngân] {Am}
```

Giải thích:
- `{Cmaj}`, `{G7}`, `{Am}`: hợp âm nền tại thời điểm đó.
- `|` cuối dòng thứ 2: dấu ngắt hơi.
- `(luyến)`, `(láy)`, `(rung:5,vừa)`: kỹ thuật hát gắn kèm.
- `nhấn`, `ngân`: ghi chú thêm ở vị trí cuối.

### 6.3 Dạng dữ liệu có cấu trúc (JSON) — dùng cho máy xử lý, huấn luyện, validator

```json
{
  "syllable": "về",
  "tone": "huyen",
  "rhyme_group": "e",
  "pitch": ["A3", "G3"],
  "duration": ["1/8", "1/8"],
  "technique": "luyen",
  "beat_position": "weak",
  "chord": "Cmaj",
  "phrase_break": false
}
```

**Khuyến nghị:** dùng JSON làm định dạng lưu trữ/huấn luyện chính thức (máy đọc chắc chắn, dễ validate), còn cú pháp inline ở mục 6.2 dùng làm định dạng AI sinh trực tiếp (ít token hơn, dễ đọc cho người). Viết một bộ chuyển đổi 2 chiều giữa 2 định dạng này.

---

## 7. Bộ Validator (chương trình kiểm tra tự động)

Chức năng validator cần có, theo thứ tự ưu tiên xây dựng:

1. **Kiểm tra thanh điệu–hướng nốt**: so từng cặp âm tiết liền kề với bảng ở mục 2.2, báo lỗi nếu vi phạm luật cấm.
2. **Kiểm tra vần**: xác nhận các vị trí cần vần (theo thể thơ hoặc theo cấu trúc câu nhạc) có đúng nhóm vần không.
3. **Kiểm tra số âm tiết/dòng** khớp với khuôn mẫu thể thơ đã chọn (nếu dùng thể cố định như lục bát).
4. **Kiểm tra kỹ thuật hát hợp lý theo thanh điệu** (mục 5 phần "quy tắc liên kết").
5. **Điểm số tổng hợp (soft score)**: thay vì chỉ pass/fail, nên tính điểm 0–100 cho "độ tự nhiên" để dùng làm tín hiệu fine-tune hoặc reranking nhiều bản sinh ra từ AI.

---

## 8. Lộ trình triển khai kỹ thuật (đề xuất theo giai đoạn)

**Giai đoạn 1 — MVP (chỉ Lớp 1 + Lớp 2 cơ bản)**
- Viết bảng luật thanh điệu-hướng nốt thành code (dạng dictionary/rule table).
- Viết validator kiểm tra 1 bài lời + giai điệu có vi phạm luật cấm không.
- Test bằng cách chấm điểm lại vài bài hát Việt Nam nổi tiếng đã biết là "phổ đúng" — xem validator có báo sai không (dùng để hiệu chỉnh lại luật nếu cần).

**Giai đoạn 2 — Sinh tự động bằng few-shot prompting**
- Soạn 15–30 ví dụ mẫu đúng cú pháp DSL (mục 6.2), kèm bộ luật rút gọn dạng system prompt.
- Gọi API Claude/GPT sinh lời + giai điệu trực tiếp theo cú pháp, sau đó chạy qua validator ở Giai đoạn 1, nếu lỗi thì yêu cầu AI tự sửa lại (self-correction loop).

**Giai đoạn 3 — Renderer (DSL → audio)**
- Viết converter DSL → MIDI/MusicXML (dùng thư viện như `music21` cho Python).
- Viết converter DSL → định dạng input cho DiffSinger/NNSVS để sinh giọng hát.
- Ghép với hòa âm/nhạc cụ (Lớp 4) bằng soundfont hoặc gọi thêm model sinh nhạc nền (MusicGen).

**Giai đoạn 4 — Fine-tune riêng (nếu cần chất lượng cao hơn few-shot)**
- Dùng chính output đã qua validator (điểm cao) làm tập dữ liệu huấn luyện.
- Fine-tune một model mã nguồn mở (Llama/Mistral) chuyên sinh theo DSL này.

**Giai đoạn 5 — Mở rộng Lớp 4 chi tiết**
- Thêm quy tắc riêng cho nhạc cụ dân tộc, thể loại nhạc cụ thể.

---

## 9. Rủi ro & lưu ý quan trọng

- **Luật ở mục 2.2 là giả thuyết ban đầu, chưa được kiểm chứng học thuật đầy đủ** — nên tham khảo thêm tài liệu ngôn ngữ học về thanh điệu tiếng Việt (âm vực, âm điệu) và nếu có thể, tham vấn người có chuyên môn âm nhạc dân tộc học để tinh chỉnh bảng quy tắc trước khi dùng làm dữ liệu huấn luyện quy mô lớn.
- Nên bắt đầu hẹp: chỉ 1 thể loại (VD: ballad hiện đại, số âm tiết tự do) trước khi mở rộng sang thể thơ cố định (lục bát...) — tránh làm luật quá phức tạp ngay từ đầu.
- Việc sinh giọng hát khớp hoàn toàn với DSL (đặc biệt phần luyến láy) vẫn là bài toán kỹ thuật khó nhất trong toàn bộ hệ thống — nên coi Giai đoạn 3 phần DiffSinger là phần rủi ro cao nhất về mặt thời gian.

---

*Tài liệu này là bản nháp làm nền tảng — nên coi là "living document", cập nhật liên tục khi có kết quả thử nghiệm thực tế.*