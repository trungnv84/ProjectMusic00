## ROUND 3 — DEVIL'S ADVOCATE: ĐIỀU KIỆN THẤT BẠI & GIẢM RỦI RO

Trước khi vào nội dung: `claude` và `deepseek` tiếp tục không có nội dung thực chất ở cả 2 vòng (chỉ có nhãn trạng thái như "Sleuthing", "Reckoning", hoặc câu tuyên bố ý định). Tôi loại 2 phiếu này khỏi phân tích — không suy diễn nội dung không tồn tại. `chatgpt` bị "Connection interrupted" ở Round 2 nên không có phản biện chéo từ AI này ở vòng này. Còn lại 2 câu trả lời Round 2 có thực chất: Gemini và Grok, cả hai đều hội tụ khá mạnh với nhau — điều này tự nó là tín hiệu đáng tin, nhưng tôi sẽ vẫn phản biện cả hai.

Nguyên tắc cho vòng này: mỗi phương án được đánh giá bằng câu hỏi **"nó thất bại trong điều kiện thử nghiệm cụ thể nào, và điều kiện đó có khả năng xảy ra trong dữ liệu thật hay không?"** — không phải "nó có nghe hợp lý không".

---

### PHƯƠNG ÁN A — Giữ nguyên bản gốc: Syllable-atomic + 4-layer trên mỗi syllable + JSON ground truth

**Điều kiện thất bại (đã có bằng chứng cụ thể trong chính tài liệu, không cần giả định):**
1. **Thất bại về chi phí/token — đã chứng minh bằng phép tính của Gemini Round 2**: ví dụ JSON cho 4 âm tiết ("Mình còn thương nhau") đã dài ~1.200 token. Ngoại suy tuyến tính cho bài 300-400 âm tiết → ~100.000+ token/bài. Đây không phải ước lượng bi quan, đây là phép nhân trực tiếp trên ví dụ mà chính bản PLAN đưa ra để minh hoạ ưu điểm của mình — **bằng chứng phản bác nằm ngay trong tài liệu ủng hộ**.
2. **Thất bại khi gặp non-vocal event** (trống, piano arpeggio, automation) — không có syllable nào để gắn 4 lớp vào, nên phải "thoát ra ngoài" cấu trúc syllable bằng `global_tracks_library` — chính bản C.1 JSON đã tự làm điều này, tức là tự vi phạm Nguyên tắc bất biến A.3 #4 mà nó tuyên bố.
3. **Thất bại khi hard rule tone-melody gặp phương ngữ Nam/Trung** (Gemini chỉ ra) — sẽ reject sai (false positive) hàng loạt lời hát viết theo giọng không phải chuẩn Bắc.
4. **Thất bại khi gặp code-switching** (Grok Round 1) — `tone_id` = null cho từ tiếng Anh, rule tone-melody không có nhánh xử lý.

**Điều kiện thành công (khi nào phương án A vẫn ổn, không nên vứt bỏ hoàn toàn):**
- Nếu phạm vi MVP giới hạn: 1 giọng hát chính, 1 hợp âm nền đơn giản, tiếng Việt chuẩn không phương ngữ, không melisma dài — phương án A hoạt động và đơn giản để implement nhanh nhất.

**Giảm rủi ro:**
- Không dùng JSON làm định dạng trao đổi với LLM (đồng ý với đề xuất "2-Pass Compiler" của Gemini Round 2) — LLM chỉ sinh/đọc Inline compact, JSON chỉ là internal storage sau parse.
- Thêm `dialect_profile` như Gemini đề xuất, nhưng **phải kiểm chứng bằng cách chạy thử hard rule trên ít nhất 20 bài lời hát Nam/Trung thật** trước khi coi rule đã "ổn" — nếu không, thêm field `dialect_profile` chỉ là giải pháp trên giấy, chưa chắc rule engine đã tôn trọng nó đúng cách.
- Cho phép `tone_id: foreign` là một giá trị hợp lệ, và rule tone-melody phải có nhánh `applies_when: tone_id != foreign` tường minh — không được để hệ thống crash hay silent-skip khi gặp null.

---

### PHƯƠNG ÁN B — ChatGPT: Event Graph (NoteEvent/ChordEvent/PerformanceEvent + reference/ID, Canonical AST là ground truth)

**Điều kiện thất bại:**
1. **Thất bại vì over-engineering trước khi có bằng chứng cần thiết** — đây chính là điểm Grok Round 2 nêu và tôi đồng ý: ChatGPT đề xuất kiến trúc graph phức tạp *dựa trên lý luận trừu tượng* (trống/piano không có syllable), nhưng **không đưa ra bằng chứng thống kê nào cho thấy tỷ lệ non-vocal event trong corpus V-Pop/bolero thực tế đủ lớn để biện minh cho chi phí kiến trúc này**. Nếu 90% bài hát mục tiêu (V-Pop ballad, bolero) chỉ có 1 vocal-lead + chord pad + vài instrument đơn giản, thì việc xây graph tổng quát cho polyphony phức tạp là giải quyết một bài toán chưa xảy ra, trong khi trì hoãn bài toán đang xảy ra (viết bài hát đầu tiên).
2. **Thất bại về authoring ergonomics — đây là rủi ro cụ thể, kiểm chứng được**: cú pháp `s12 → n31, n32` (mapping quan hệ) đòi hỏi người viết tay phải quản lý ID thủ công trên nhiều block tách biệt (`## Verse`, `## Performance`, `## Arrangement`). Điều kiện thất bại cụ thể: **nếu người dùng sửa 1 dòng lyric ở block Lyrics mà quên cập nhật reference tương ứng ở block Performance, hệ thống sẽ có dangling reference** — một lớp lỗi hoàn toàn mới không tồn tại trong thiết kế phẳng (flat) ban đầu. Đây không phải giả thuyết — đó là hệ quả tất yếu của bất kỳ hệ thống dùng ID tham chiếu chéo qua nhiều block do con người chỉnh sửa tay.
3. **Thất bại nếu grammar EBNF chưa được viết trước khi đánh giá** — như chính ChatGPT tự thừa nhận ở mục 22 Round 1 ("tôi sẽ không cho team chốt grammar ngay"). Nghĩa là đề xuất B hiện tại **chưa khả thi để implement**, chỉ là hướng kiến trúc.

**Điều kiện thành công:**
- Nếu dữ liệu thực tế cho thấy tỷ lệ polyphony/counter-melody/non-vocal-heavy tracks chiếm tỷ trọng đáng kể (ví dụ >30% bài mục tiêu có từ 2 track giai điệu đồng thời trở lên) — lúc đó chi phí graph là hợp lý.

**Giảm rủi ro:**
- **Không triển khai B ngay.** Thay vào đó: chạy thống kê corpus (như Grok đề xuất) để đo tỷ lệ thực tế cần polyphony trước khi quyết định có cần graph hay không.
- Nếu buộc phải đi theo hướng B sau này, bắt buộc phải có **validator kiểm tra referential integrity** (phát hiện dangling reference) chạy tự động mỗi lần parse — không thể để con người tự đảm bảo tính nhất quán tham chiếu bằng mắt.

---

### PHƯƠNG ÁN C — Grok: Giữ syllable-atomic + escape hatch (semantic_word_id, exception flag) + stable ID cho partial edit

**Điều kiện thất bại:**
1. **Thất bại khi gặp polyphony thật (multi-vocal, counter-melody)** — chính Grok tự thừa nhận phương án này "không giải quyết gốc vấn đề polyphony". Điều kiện thất bại cụ thể: **ngay khi có 1 bài hát yêu cầu bè (harmony vocal) hát cùng lúc với lead vocal**, cấu trúc `Line → Phrase → Syllable` tuyến tính (1 dòng = 1 chuỗi âm tiết theo thời gian) không biểu diễn được 2 giọng hát chạy song song trên cùng 1 line — sẽ phải hack bằng cách nhân đôi Line hoặc thêm field `voice_id` tùy biến ngoài kế hoạch, phá vỡ chính "kỷ luật cấu trúc" mà escape hatch đang cố giữ.
2. **Thất bại khi escape hatch bị lạm dụng** — Grok tự nêu nhược điểm này ("dễ bị lạm dụng, rule engine phức tạp hơn") nhưng không đưa ra cơ chế cụ thể để phát hiện lạm dụng. Điều kiện thất bại: nếu >50% syllable trong 1 bài hát thực tế cần dùng exception flag (ví dụ vì code-switching nhiều, non-lexical filler nhiều trong dân ca có "ơ, à, hờ"), thì bản thân "exception" đã trở thành "quy tắc" — lúc đó kiến trúc chính (rule cho trường hợp thường) không còn mô tả đúng phần lớn dữ liệu thật.
3. **Thất bại về tính bảo thủ không có cơ sở** — như tôi đã nêu ở Round 2: lý do Grok chọn giữ nguyên tắc là "nguyên tắc đã được tuyên bố" (status quo bias), không phải bằng chứng nguyên tắc đó đúng. Nếu corpus thực tế cho thấy melisma dài hoặc polyphony phổ biến hơn dự kiến, phương án C sẽ cần refactor lớn — và lúc đó chi phí đã đầu tư vào escape hatch riêng lẻ (thay vì kiến trúc tổng quát ngay từ đầu) trở thành lãng phí gấp đôi.

**Điều kiện thành công:**
- Nếu corpus thực tế xác nhận: (a) tỷ lệ syllable-note 1:1 hoặc melisma ngắn (2-3 note) chiếm đa số áp đảo, (b) polyphony hiếm gặp trong phạm vi MVP (V-Pop ballad, bolero solo vocal) — phương án C là lựa chọn thực dụng tốt nhất để có sản phẩm chạy được nhanh.

**Giảm rủi ro:**
- Bắt buộc chạy thống kê corpus **trước khi cam kết** vào phương án C, không phải sau. Nếu tỷ lệ exception vượt ngưỡng (ví dụ >15-20% syllable cần escape hatch), phải dừng và đánh giá lại có cần chuyển sang hướng B hay không.
- Thiết kế escape hatch với **audit log bắt buộc** (Grok đã đề xuất "exception/override flag có audit") — nhưng cụ thể hóa: mỗi lần dùng exception phải ghi lý do (reason code), để sau này thống kê được loại exception nào phổ biến nhất, từ đó quyết định có nên "chính thức hóa" nó thành field chuẩn hay không.

---

### PHƯƠNG ÁN D — Gemini: Viết EBNF + parser Go ngay lập tức cho Inline compact format

**Điều kiện thất bại:**
1. **Thất bại chắc chắn nếu Semantic Model chưa ổn định** — đây là điểm cả Grok và tôi đồng ý độc lập ở Round 2: nếu EBNF được viết trước khi biết rõ Timeline model, Syllable↔Note mapping, Control semantics (LOCK/KEEP/CHANGE) trông như thế nào, thì **grammar sẽ phải viết lại hoàn toàn** khi các quyết định kiến trúc nền tảng thay đổi. Đây không phải rủi ro giả định — nó là hệ quả logic tất yếu: cú pháp bề mặt luôn phải phản ánh model dữ liệu bên dưới, viết cú pháp trước là đặt cỗ xe trước ngựa.
2. **Thất bại về lựa chọn công cụ (Go) không có cơ sở** — Gemini chọn Go dựa trên "hiệu năng", nhưng **không có yêu cầu hiệu năng nào được định lượng trong toàn bộ tài liệu** (không có SLA về thời gian parse, không có ước tính số bài hát/giây cần xử lý). Việc chọn ngôn ngữ implement trước khi biết độ phức tạp của grammar và tần suất sử dụng là quyết định thiếu thông tin.

**Điều kiện thành công:**
- Sau khi Canonical Semantic Model đã chốt (Timeline, mapping, control semantics) — lúc đó viết EBNF và chọn công cụ implement là bước hợp lý và cần thiết.

**Giảm rủi ro:**
- Hoãn quyết định công cụ (Go hay ngôn ngữ khác) đến khi có ít nhất 1 bản grammar nháp đã test qua 10-20 ví dụ thật.
- Nếu muốn "làm gì đó ngay" để giữ tiến độ, nên viết **parser thử nghiệm (throwaway prototype)** bằng ngôn ngữ nhanh để viết (Python/TypeScript) chỉ để kiểm chứng ambiguity của cú pháp, không đầu tư vào parser production (Go) cho đến khi grammar ổn định — tránh lãng phí công sức viết lại.

---

### PHƯƠNG ÁN E — Gemini Round 2: "2-Pass Compiler" — DSL chỉ chứa L1+L2 (Content+Musical), L3+L4 (Performance+Arrangement) được suy luận tự động (auto-hydrate) từ Rule Engine + Genre Profile

Đây là đề xuất mạnh nhất và cụ thể nhất trong Round 2 — cần phân tích kỹ.

**Điều kiện thất bại:**
1. **Thất bại nếu "tự động sinh L3/L4" tạo ra kết quả nghe máy móc, thiếu cảm xúc** — chính Nguyên tắc bất biến A.3 #2 của bản gốc đã cảnh báo trước: "Cấm luật cứng 100% tất cả mọi thứ (sẽ sinh ra bài hát máy móc)". Nếu pitch-bend/vibrato/technique đều do thuật toán suy luận tự động dựa trên tone + genre preset, mà không có cơ chế injectable randomness hoặc artistic variation, kết quả sẽ đồng nhất đến mức nhàm chán giữa các bài cùng thể loại — đây chính là rủi ro mà Grok Round 1 cũng nêu ("Auto-fill technique/pitch-bend từ YAML có thể tạo artifact nghe máy móc hơn là artistic"). **Hai AI độc lập hội tụ vào cùng lo ngại này** (Gemini không nhận ra mâu thuẫn với chính đề xuất của mình, Grok đã cảnh báo trước từ Round 1).
2. **Thất bại nếu Rule Engine suy luận sai và người dùng không có cách nào biết** — khi L3/L4 hoàn toàn "ẩn" khỏi tầng authoring (người viết chỉ thấy L1+L2), **làm sao người dùng phát hiện và sửa khi kết quả suy luận sai** (ví dụ pitch-bend suy ra cho thanh "hỏi" nghe không tự nhiên trong một melisma cụ thể)? Đề xuất E không có cơ chế "override + feedback loop" rõ ràng — chỉ nói "người dùng chỉ can thiệp khi cần tinh chỉnh sâu", nhưng không định nghĩa quy trình đó trông như thế nào trong DSL.
3. **Thất bại về tính nhất quán với LOCK semantics** — nếu L3/L4 được sinh tự động ở mỗi lần compile, thì `LOCK melody` (chỉ khóa L1/L2) không đảm bảo L3/L4 (kỹ thuật hát cụ thể) giữ nguyên giữa 2 lần generate — vi phạm chính mục tiêu ban đầu của partial edit (A.1 điểm yếu #1: "giữ nguyên toàn bộ giai điệu Chorus"). Nếu người dùng LOCK melody nhưng L3 performance thay đổi mỗi lần compile lại, kết quả nghe sẽ khác nhau dù về mặt kỹ thuật "giai điệu" (pitch) giữ nguyên.

**Điều kiện thành công:**
- Nếu L3/L4 tự động sinh **chỉ đóng vai trò default/gợi ý ban đầu**, với mọi giá trị suy luận được ghi lại tường minh vào JSON (không ẩn), và người dùng/AI có thể override từng field cụ thể mà không phải viết lại toàn bộ — lúc đó đây là giải pháp giảm gánh nặng authoring hợp lý, không mất khả năng kiểm soát.

**Giảm rủi ro:**
- Bắt buộc: mọi giá trị L3/L4 tự động sinh phải **ghi rõ nguồn gốc** (`derived_by: rule_id`, không phải giá trị "câm") trong JSON, để khi debug hoặc audit, biết chính xác rule nào tạo ra giá trị nào — tương tự khái niệm `DERIVED` field mà ChatGPT đề xuất ở Round 1 mục 11.
- Cố định (freeze) L3/L4 sau lần compile đầu tiên trừ khi người dùng chủ động yêu cầu regenerate — để LOCK semantics có ý nghĩa thực sự trên cả performance layer, không chỉ pitch/lyric.
- Thêm một tham số `variation_seed` hoặc tương đương để kiểm soát mức độ ngẫu nhiên có chủ đích trong suy luận L3, tránh kết quả đồng nhất máy móc.

---

### Cơ chế xuyên suốt (cross-cutting) — điều kiện thất bại chung, áp dụng cho MỌI phương án trên

**1. Validation Loop 3 vòng (Nguyên tắc bất biến A.3 #3):**
- **Điều kiện thất bại**: nếu 1 hard rule sai (ví dụ ngưỡng "≥4 semitone" không phù hợp thực tế — điều mà cả tôi, ChatGPT, Gemini đều độc lập cảnh báo ở Round 1-2), thì validation loop sẽ **buộc AI "sửa" một cách vô nghĩa 3 lần liên tục cho một bài hát thực chất đã đúng về mặt nghệ thuật**, tốn chi phí LLM mà không cải thiện chất lượng — rồi rơi về "lấy bản soft score cao nhất" (tức là thừa nhận thất bại nhưng vẫn xuất ra). Đây là rủi ro tôi đã nêu ở Round 1: chi phí vận hành có thể tốn cho việc enforce luật sai.
- **Giảm rủi ro**: bắt buộc gắn `status: experimental/provisional/validated` cho từng rule (đề xuất của ChatGPT, tôi đồng thuận độc lập) — và **rule ở trạng thái `experimental` chỉ được chạy như soft rule (cảnh báo, không fail-compile)** cho đến khi có Gold Test Suite xác nhận. Đây phải là quy tắc vận hành bắt buộc, không phải khuyến nghị tùy chọn.

**2. Adapter Pattern cho AI Provider (Suno/Udio/ACE-Step):**
- **Điều kiện thất bại — đây là phát hiện quan trọng nhất của toàn bộ Round 2, do Gemini nêu**: các provider blackbox hiện tại (Suno, Udio) **không có API nhận fine-grained IR** — chỉ nhận text prompt. Nếu điều này đúng (cần xác minh, tôi không có quyền truy cập để kiểm chứng API hiện tại của các dịch vụ này, và thông tin có thể đã thay đổi sau kiến thức của tôi), thì **toàn bộ giá trị của việc mã hóa chi tiết L3/L4 (pitch-bend 14-bit, vibrato...) sẽ mất tác dụng khi render qua nhóm adapter này** — downgrade thành prompt văn xuôi, đúng như vấn đề #1 mà A.1 đang cố giải quyết vẫn tồn tại nguyên vẹn cho nhóm provider đó.
- Đây là điều kiện thất bại **có khả năng làm sụp đổ toàn bộ giá trị đề xuất (A.2 "giá trị không thể đánh đổi được")** nếu đúng, nên cần được kiểm chứng ưu tiên cao nhất, cao hơn cả việc chọn cú pháp DSL.
- **Giảm rủi ro**: phân loại Adapter thành 2 nhóm rõ ràng như Gemini đề xuất — Full-Feature (OpenUTAU, DiffSinger, MIDI/MusicXML, VSTi — lossless) vs Lossy Prompt Adapters (Suno, Udio — chấp nhận mất chi tiết, chỉ dịch ra structural prompt tags). **Quan trọng hơn: phải quyết định ngay từ đầu dự án nhắm vào nhóm nào là chính** — nếu mục tiêu chính là kiểm soát chi tiết như A.1 mô tả, thì nhóm Full-Feature (vocal synth local) mới thực sự phát huy giá trị DSL, còn nhóm Suno/Udio chỉ nên coi là output phụ, không phải lý do chính để đầu tư vào độ chi tiết L3/L4.

**3. LOCK/KEEP/CHANGE (Partial Edit) khi xung đột với Hard Rule:**
- **Điều kiện thất bại — do Gemini nêu, tôi cho là sắc bén nhất trong Round 2**: nếu người dùng LOCK melody Chorus nhưng CHANGE lời câu 2, và lời mới có thanh điệu xung đột trực tiếp với giai điệu đã khóa → **bản thiết kế hiện tại không có quy tắc giải quyết xung đột này**. Đây là lỗ hổng đặc tả thật, không phải suy diễn — không có mục nào trong toàn bộ 4 phần A-D nói rõ khi LOCK constraint và Hard Rule mâu thuẫn thì bên nào thắng.
- **Giảm rủi ro**: bắt buộc thiết kế **L5 Control layer** (đề xuất của ChatGPT, được Grok Round 2 đồng thuận độc lập) với cơ chế priority rõ ràng — ví dụ: khi LOCK melody + CHANGE lyric tạo xung đột hard rule, hệ thống phải báo lỗi tường minh cho người dùng chọn: (a) nới LOCK để melody đổi theo lời mới, hoặc (b) chấp nhận vi phạm hard rule ở mức cảnh báo (downgrade thành soft), thay vì để hệ thống tự ý quyết định ngầm.

---

### Kết luận Round 3 (Devil's Advocate)

Không có phương án nào trong 5 phương án trên **sẵn sàng để implement ngay** — mỗi phương án đều có ít nhất 1 điều kiện thất bại cụ thể, kiểm chứng được, chưa được giải quyết. Điều đáng chú ý nhất của Round 2 không phải là ai đúng ai sai giữa các phương án kiến trúc (đó vẫn là tranh luận trên giấy, thiếu dữ liệu), mà là **2 phát hiện cụ thể, có khả năng phủ quyết toàn bộ giá trị dự án nếu đúng**, cần verify ngay trước khi bàn tiếp cú pháp:

1. **Khả năng tương thích API thực tế của Suno/Udio với fine-grained IR** (Gemini) — nếu adapter chỉ có thể downgrade về text prompt, giá trị cốt lõi của L3/L4 chi tiết sụp đổ cho nhóm provider này.
2. **Xung đột chưa giải quyết giữa LOCK constraint và Hard Rule** (Gemini) — lỗ hổng đặc tả thật trong chính mục tiêu partial-edit mà dự án tuyên bố là giá trị lớn nhất.

Cả hai đều là bằng chứng cụ thể, không phải ý kiến thẩm mỹ — nên được ưu tiên xác minh trước khi hội đồng tiếp tục tranh luận Round 4 về chọn cú pháp DSL nào.