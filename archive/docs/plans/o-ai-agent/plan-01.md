# AI Council - Chrome Extension Plan 01

> Bản kế hoạch chi tiết cho AI Council: hệ thống điều phối 5 AI (ChatGPT, Claude, Gemini, Grok, DeepSeek) qua các tab web đã đăng nhập, theo workflow Hội đồng 7 vòng với phân vai động, phản biện chéo, Red Team và Chủ tọa tổng hợp.

---

## 1. Tổng quan

### 1.1 Vấn đề

Khi có 5 tab AI mở riêng lẻ, việc copy/paste câu trả lời giữa chúng để phản biện chéo trở nên tốn thời gian và dễ sai sót. Người dùng trở thành "API thủ công" thay vì tập trung vào chất lượng quyết định.

### 1.2 Giải pháp

Chrome Extension (Manifest V3) đóng vai **Orchestrator** tự động:
- Nhận câu hỏi 1 lần từ giao diện dashboard
- Quét và nhận diện 5 tab AI đang đăng nhập
- Phân vai động tùy loại câu hỏi (kinh doanh, lập trình, pháp lý, ...)
- Chạy 7 vòng workflow tự động: độc lập → phản biện → giải pháp → đánh giá → chủ tọa → red team → final judge
- Hiển thị tiến độ real-time và lưu toàn bộ transcript
- Trả về kết luận cuối cùng có cấu trúc rõ ràng

### 1.3 Nguyên tắc thiết kế

| Nguyên tắc | Giải thích |
|---|---|
| **Không dùng API** | Extension thao tác trực tiếp DOM của 5 tab web đang đăng nhập, không tốn quota API riêng |
| **Adapter riêng cho mỗi provider** | Mỗi website AI có 1 file adapter DOM độc lập, dễ sửa khi provider đổi UI |
| **Workflow có giới hạn vòng** | 7 vòng cố định (MVP), tránh tranh luận lan man |
| **Judge không bình chọn** | Chủ tọa đánh giá chất lượng lập luận + bằng chứng, không đếm số AI đồng ý |
| **Red Team bắt buộc** | Luôn có 1 AI cố phá quyết định trước khi chốt cuối |

---

## 2. Phạm vi & Mục tiêu

### 2.1 MVP 1.0 (Hiện tại đã implement)

- [x] Manifest V3 với 3 permissions: `tabs`, `scripting`, `storage`
- [x] Host permissions cho 5 providers: ChatGPT, Claude, Gemini, Grok, DeepSeek
- [x] Dashboard đầy đủ trong tab riêng (không dùng popup/side panel)
- [x] Quét tự động 5 tab AI đang mở *(fix v1.0.1: regex URL bỏ trailing slash bắt buộc, unify detectProvider ở 3 file, thêm scan summary + URL hint)*
- [x] Phân vai động theo 3 chủ đề: lập trình / kinh doanh / pháp lý / mặc định
- [x] Workflow 7 vòng cố định
- [x] 5 adapter DOM cho từng provider
- [x] Real-time log + phase tracking
- [x] Lưu state vào `chrome.storage.local`
- [x] Transcript đầy đủ + kết luận cuối

### 2.2 Mục tiêu v1.0 (Hoàn thiện)

- [ ] Cơ chế retry adapter khi selector lỗi
- [ ] Timeout động tùy vòng / độ dài câu trả lời
- [ ] Export kết quả: Markdown / JSON / Copy to clipboard
- [ ] Lịch sử các cuộc họp (list + view lại)
- [ ] Cho phép tùy chỉnh Judge + Red Team provider
- [ ] Mode nhanh (3-4 vòng) / cân bằng (7 vòng) / sâu (9-10 vòng)
- [ ] Xác nhận vai trò trước khi chạy (người dùng có thể override)

### 2.3 Mục tiêu v2.0 (Nâng cao)

- [ ] AI Manager (tầng trên cùng) quyết định số vòng / đổi vai giữa các vòng
- [ ] Dynamic Role Library (20+ vai trò, tự chọn theo câu hỏi)
- [ ] Fact-checking tích hợp web search
- [ ] Scoring AI theo chất lượng từng cuộc họp → học cách phân vai tốt hơn
- [ ] Preset đội hình: Business, Coding, Research, Legal, Investment
- [ ] Xuất báo cáo PDF
- [ ] Side Panel thay vì tab dashboard (tùy chọn)
- [ ] API mode (backup cho DOM adapter khi provider chặn)

---

## 3. Kiến trúc hệ thống

### 3.1 Luồng dữ liệu tổng quan

```
Người dùng (Dashboard)
        │
        ▼
┌───────────────────────┐
│   background.js       │  Service Worker
│  (Message Hub)        │
└──────────┬────────────┘
           │ chrome.runtime.sendMessage
           ▼
┌───────────────────────┐
│   Orchestrator        │  Core workflow engine
│  (7-round FSM)        │
└──────────┬────────────┘
           │
     ┌─────┼─────┬─────────────┬─────────┐
     ▼     ▼     ▼             ▼         ▼
RoleMgr Debate  Judge         Tab      Provider
        Engine              Controller Config
           │
           ▼
    chrome.scripting.executeScript
           │
     ┌─────┼─────┬─────┬───────┐
     ▼     ▼     ▼     ▼       ▼
ChatGPT Claude Gemini Grok  DeepSeek
 (adapter DOM cho từng tab)
```

### 3.2 Phân tách module

| File | Vai trò | Chịu trách nhiệm |
|---|---|---|
| [manifest.json](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/manifest.json) | Cấu hình extension | Permissions, host, service worker, action |
| [background.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/background.js) | Service Worker | Message routing, khởi tạo orchestrator, import `scanAllTabsWithProviderInfo()` từ tab-controller *(v1.0.1: không tự định nghĩa scanTabs/detectProvider nữa)* |
| [dashboard.html](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/dashboard.html) | Giao diện | Form câu hỏi, mode, provider status, log, result, transcript |
| [dashboard.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/dashboard.js) | Frontend logic | Gửi message sang background, render state realtime, scan summary + URL hint + tab info *(v1.0.1)* |
| [orchestrator.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/orchestrator.js) | Core engine | FSM 7 vòng, persist state, gọi DebateEngine theo từng vòng |
| [role-manager.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/role-manager.js) | Phân vai + prompt builder | chooseRoles(), buildRoundPrompts() cho từng vòng |
| [debate-engine.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/debate-engine.js) | Gọi AI | Inject adapter, chạy prompt trên tab, nhận kết quả text |
| [judge.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/judge.js) | Final + Red Team prompts | buildFinalJudgePrompt(), buildRedTeamPrompt() |
| [providers.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/providers.js) | Cấu hình provider | URL match patterns *(v1.0.1: bỏ trailing slash bắt buộc, flag i)*, vai trò phù hợp, đường dẫn adapter, export `detectProvider()` + `PROVIDER_ORDER` dùng chung |
| [tab-controller.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/tab-controller.js) | Quét tab | scanProviderTabs() tìm đúng 5 AI theo URL regex *(v1.0.1: thêm scanAllTabsWithProviderInfo() trả về đủ field cho dashboard)* |
| [adapter-runtime.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/adapter-runtime.js) | Loader adapter | Map provider → file adapter |
| adapters/*.js | Adapter DOM | Từng file 1 provider: chọn selector, điền input, bấm send, poll kết quả |

### 3.3 State Machine (Orchestrator)

Trạng thái lưu trong `chrome.storage.local`:

```js
{
  status: 'idle' | 'running' | 'completed' | 'stopped' | 'error',
  phase:  'scan' | 'ROUND 1..7' | 'done' | 'error',
  question: string,
  mode: 'fast' | 'balanced' | 'deep',
  assignments: { chatgpt, claude, gemini, grok, deepseek, judge, redTeam },
  tabs: ProviderTab[],
  log: { at: number, message: string }[],
  transcript: { round1..round5, redTeam, final },
  final: string,
  error: string | null,
  startedAt: number,
  endedAt: number
}
```

---

## 4. Workflow 7 Vòng Chi Tiết

### Vòng 1 — Độc lập (ROUND 1)

**Mục tiêu**: 5 AI suy nghĩ độc lập theo vai trò đã phân, không ảnh hưởng lẫn nhau.

- **Input**: Câu hỏi gốc + vai trò
- **AI thực hiện**: Tất cả 5 AI (ChatGPT, Claude, Gemini, Grok, DeepSeek)
- **Prompt yêu cầu cấu trúc**:
  1. Vấn đề cốt lõi
  2. Dữ kiện đã biết
  3. Điều chưa biết
  4. Giả định cần kiểm tra
  5. Phân tích
  6. Các phương án khả thi
  7. Phương án nghiêng về
  8. Điểm chưa chắc chắn

### Vòng 2 — Phản biện chéo (ROUND 2)

**Mục tiêu**: Mỗi AI đọc toàn bộ kết quả Round 1 và đóng vai Devil's Advocate.

- **Input**: Toàn bộ transcript Round 1 (JSON stringify)
- **AI thực hiện**: Tất cả 5 AI
- **Prompt yêu cầu**: Điểm mạnh / điểm yếu / sai lầm / giả định chưa chứng minh / rủi ro / điều bỏ sót / kết luận sau phản biện

### Vòng 3 — Xây dựng giải pháp (ROUND 3)

**Mục tiêu**: Chuyên gia hóa vai trò theo hướng giải pháp.

- **Input**: Round 1 + Round 2
- **Phân công cụ thể**:
  - DeepSeek → Solution Architect (1-3 phương án + đánh giá 6 chiều)
  - Gemini → Researcher/Fact Checker (kiểm chứng dữ kiện + đề xuất)
  - ChatGPT → Strategist (hợp nhất + phương án chiến lược)
  - Claude → Devil's Advocate (điều kiện thất bại + giảm rủi ro)
  - Grok → Trend/Counter-example (counter-example + kịch bản ngược)

### Vòng 4 — Đánh giá & Xếp hạng (ROUND 4)

**Mục tiêu**: Tất cả 5 AI trở thành Evaluator, chấm điểm độc lập.

- **Input**: Round 1+2+3
- **Tiêu chuẩn chấm điểm**: Hiệu quả / Chi phí / Khả năng thực thi / Tốc độ / Rủi ro / Mở rộng / Bền vững
- **Yêu cầu**: Tự đặt trọng số → chuẩn hóa → loại bỏ phương án không khả thi → xếp hạng → nêu trade-off

### Vòng 5 — Chủ tọa (ROUND 5)

**Mục tiêu**: Judge (mặc định ChatGPT) tổng hợp toàn bộ và đưa ra quyết định.

- **AI thực hiện**: `roles.judge` (default: ChatGPT)
- **Input**: Round 1+2+3+4
- **Nguyên tắc**: Không chọn theo đa số; kiểm tra lập luận/bằng chứng/giả định; phát hiện khả năng cả hội đồng cùng sai
- **Output bắt buộc có 6 mục**:
  1. **KẾT LUẬN**
  2. **TẠI SAO CHỌN PHƯƠNG ÁN NÀY**
  3. **CÁC PHƯƠNG ÁN ĐÃ LOẠI**
  4. **RỦI RO**
  5. **KẾ HOẠCH HÀNH ĐỘNG**
  6. **THÔNG TIN CẦN BỔ SUNG**

### Vòng 6 — Red Team (ROUND 6)

**Mục tiêu**: AI cố tình chứng minh quyết định của Judge là sai.

- **AI thực hiện**: `roles.redTeam` (default: Claude)
- **Input**: Câu hỏi gốc + quyết định Round 5
- **Prompt yêu cầu**: Tìm giả định ẩn / phản ví dụ / rủi ro cuối cùng / tình huống thất bại; nếu không phá vỡ được, giải thích tại sao quyết định vẫn đứng vững

### Vòng 7 — Final Judge (ROUND 7)

**Mục tiêu**: Judge xem xét phản biện Red Team và chốt phiên bản cuối.

- **AI thực hiện**: `roles.judge` (ChatGPT)
- **Input**: Prompt Round 5 ban đầu + transcript Red Team
- **Quyết định**: Thay đổi nếu có lý do chính đáng; nếu không, giải thích tại sao giữ nguyên; đưa ra phiên bản quyết định cuối cùng

---

## 5. Phân vai Động (Dynamic Role Assignment)

### 5.1 Role Library (hiện có 15 vai)

```
Strategic Analyst   - Phân tích chiến lược
Devil's Advocate    - Phản biện, tìm lỗ hổng
Solution Architect  - Kiến trúc giải pháp
Evaluator           - Đánh giá, chấm điểm
Researcher          - Nghiên cứu
Market Analyst      - Phân tích thị trường
Financial Analyst   - Phân tích tài chính
Risk Analyst        - Phân tích rủi ro
Fact Checker        - Kiểm tra bằng chứng
Logic Checker       - Kiểm tra logic
Security Expert     - Chuyên gia bảo mật
Performance Expert  - Chuyên gia hiệu năng
Reviewer            - Người review
Trend Analyst       - Phân tích xu hướng
Counter-example Analyst - Tìm phản ví dụ
```

### 5.2 Quy tắc phát hiện chủ đề

Hàm `chooseRoles()` trong [role-manager.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/role-manager.js#L15-L45) dùng regex đơn giản trên câu hỏi:

| Chủ đề | Regex keywords | Đội hình mặc định |
|---|---|---|
| **Lập trình** | code, bug, software, api, database, typescript, javascript, go, php, architecture | GPT: Architect, Claude: Reviewer, Gemini: Researcher, Grok: Edge-case, DeepSeek: Debugger |
| **Kinh doanh** | business, kinh doanh, đầu tư, doanh thu, roi, thị trường | GPT: Strategist, Claude: Devil's Adv, Gemini: Market, Grok: Trend, DeepSeek: Financial |
| **Pháp lý** | luật, pháp lý, hợp đồng, legal, contract, tranh chấp | GPT: Case Analyst, Claude: Legal Reasoner, Gemini: Researcher, Grok: Counter-example, DeepSeek: Logic Checker |
| **Mặc định** | (không khớp trên) | GPT: Strategic Analyst, Claude: Devil's Adv, Gemini: Researcher, Grok: Trend, DeepSeek: Logic Checker |

### 5.3 Cấu hình Judge + Red Team (cố định MVP)

```js
roles.judge = 'chatgpt'    // Chủ tọa (synthesis mạnh)
roles.redTeam = 'claude'   // Red Team (reasoning + critique mạnh)
```

---

## 6. Adapter DOM: Thiết kế & Hạn chế

### 6.1 Mẫu adapter chung (xem [chatgpt.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/adapters/chatgpt.js))

Mỗi adapter có 3 giai đoạn:

1. **Tìm ô nhập** (`textarea` hoặc `contenteditable div`)
   - Dùng danh sách selectors fallback theo độ ưu tiên
   - Kiểm tra element visible (không ẩn/hidden)

2. **Điền prompt + Submit**
   - Dùng `Object.getOwnPropertyDescriptor` setter cho React/Vue controlled input (tránh value không sync)
   - Dispatch `input` / `keydown Enter` event để framework bắt được
   - Tìm nút Send (`button[data-testid]`, `aria-label`, `title`) → click; fallback nhấn Enter

3. **Poll kết quả** (stability detection)
   - Đếm số tin nhắn assistant trước khi gửi
   - Sau mỗi 1s, lấy tin nhắn cuối cùng
   - Kiểm tra "stable" = nội dung không đổi trong >1.8s (nghĩa là AI đã trả lời xong)
   - Timeout mặc định: 120s / lượt

### 6.2 Tình trạng adapter per provider (MVP)

| Provider | Adapter file | Độ ổn định ước tính | Ghi chú |
|---|---|---|---|
| ChatGPT | [chatgpt.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/adapters/chatgpt.js) | 7/10 | Dùng `[data-message-author-role="assistant"]`, selector có thể đổi khi OpenAI cập nhật UI |
| Claude | [claude.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/adapters/claude.js) | 6/10 | Cần theo dõi Anthropic UI đổi thường xuyên |
| Gemini | [gemini.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/adapters/gemini.js) | 6/10 | Google đổi UI khá nhiều, cần theo dõi selector |
| Grok | [grok.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/adapters/grok.js) | 5/10 | UI mới (x.com/grok.com), selector dễ vỡ |
| DeepSeek | [deepseek.js](file:///d:/Projects/ProjectMusic00/features/o-ai-agent/AI-Council/adapters/deepseek.js) | 6/10 | Cần kiểm tra các selector contenteditable |

### 6.3 Điểm yếu của kiến trúc DOM adapter

- **Fragile**: Provider đổi UI bất kỳ → adapter hỏng → phải cập nhật selector thủ công
- **Race condition**: Nếu người dùng thao tác trên tab AI trong lúc extension chạy → conflict
- **Rate limit ngầm**: Các website có thể chặn / rate limit request quá nhanh
- **Điều khoản dịch vụ**: Tự động hóa web UI có thể vi phạm ToS của 1 số provider
- **Login state**: Nếu session hết hạn, extension không biết → báo lỗi timeout

---

## 7. Roadmap & Milestones

### Giai đoạn 0: MVP ổn định (0-2 tuần)

**Mục tiêu**: Làm cho MVP 1.0 hoạt động đáng tin cậy trong 80% trường hợp.

1. **Test adapter**: Mở 5 tab thực tế → chạy 10 cuộc họp khác nhau → ghi nhận adapter nào lỗi selector nhiều
2. **Thêm retry logic** trong DebateEngine:
   - Nếu `ask()` lỗi lần 1 → chờ 2s → inject lại adapter → retry 1 lần
   - Tối đa 2 lần retry / lượt
3. **[x] Cảnh báo rõ ràng**: Khi 1 tab không được tìm thấy, chỉ rõ provider nào thiếu + URL nên mở *(đã làm trong v1.0.1: scan summary X/5, hint URL, hiển thị URL/title tab thực tế)*
4. **Confirm trước khi chạy**: Người dùng nhìn thấy vai trò phân cho từng AI, có thể đổi thủ công
5. **Auto-scroll log**: Dashboard luôn cuộn xuống log mới nhất

### Giai đoạn 1: Hoàn thiện v1.0 (2-4 tuần)

1. **Lịch sử cuộc họp**:
   - Mỗi cuộc họp có id, lưu vào storage (array `history[]`)
   - Màn hình "Lịch sử": list theo thời gian → click xem chi tiết transcript + kết luận
2. **Export kết quả**:
   - Nút "Copy kết luận" / "Copy transcript"
   - "Export Markdown" (.md file)
   - "Export JSON" (dữ liệu thô state)
3. **Tùy chỉnh đội hình**:
   - Cho phép đổi Judge (gpt/claude/gemini/...)
   - Cho phép đổi Red Team
   - Cho phép override từng vai trò trước khi chạy
4. **Mode động**:
   - **Nhanh (~3-5 phút)**: Chạy Round 1 → Round 3 → Round 5 → Round 7 (bỏ Round 2 đánh giá, bỏ Round 6 red team tùy chọn)
   - **Cân bằng (~7-12 phút)**: 7 vòng chuẩn
   - **Sâu (~15-25 phút)**: Thêm Round 2.5 (response to critique), Round 4.5 (response to evaluation)

### Giai đoạn 2: Thông minh v2.0 (4-8 tuần)

1. **AI Manager lớp trên**:
   - 1 AI (ví dụ GPT) đọc câu hỏi → quyết định số vòng, đội hình, độ sâu
   - Theo dõi chất lượng giữa các vòng → quyết định có cần thêm vòng không
   - Đổi vai giữa các vòng: ví dụ nếu vòng 1 thấy AI nào làm vai chưa tốt, đổi vai cho vòng sau
2. **Scoring AI sau mỗi cuộc họp**:
   - Self-scoring: Judge đánh giá chất lượng từng AI
   - Lưu score vào `aiScores[provider][domain]`
   - Sau 20+ cuộc họp: `chooseRoles()` dùng score để phân vai tự động tốt hơn
3. **Preset đội hình**:
   - Tạo UI chọn preset: Business / Coding / Research / Legal / Investment / Writing
   - Mỗi preset map → 5 vai trò cố định + trọng số prompt
4. **Fact-checking hook**:
   - Trước Round 4, Gemini đọc các claim → tìm kiếm web (nếu có SerpAPI) hoặc yêu cầu người dùng xác nhận
5. **API backup mode**:
   - Tùy chọn: Người dùng nhập API keys (OpenAI/Anthropic/Gemini/...)
   - Extension ưu tiên API trước, lỗi mới fallback DOM adapter (giảm fragile)

### Giai đoạn 3: Productization (8+ tuần)

- Chrome Web Store listing (ảnh, video, mô tả)
- Error telemetry (anonymized, chỉ log loại lỗi adapter, không log nội dung)
- Auto-update adapter selector (tải từ URL file config)
- Team sharing: đồng bộ lịch sử cuộc họp qua cloud sync
- Xuất PDF đẹp (kèm watermark AI Council)

---

## 8. Rủi ro & Kế hoạch Giảm thiểu

| Rủi ro | Xác suất | Tác động | Giảm thiểu |
|---|---|---|---|
| Provider đổi UI → adapter hỏng | **Cao** | Cao | Mỗi provider 1 adapter riêng; test kĩ sau mỗi lần cập nhật UI; có cảnh báo rõ lỗi selector nào |
| Provider chặn automation (ToS / anti-bot) | **Trung bình** | Cao | Đánh dấu extension là công cụ cá nhân; thêm delay giữa các lượt (1.5s - 3s); API mode backup |
| Session hết hạn giữa chừng | **Trung bình** | Trung bình | Kiểm tra login state trong adapter (thêm bước kiểm tra selector login form); báo rõ lỗi "đăng nhập lại tab X" |
| 7 vòng quá dài, người dùng mất kiên nhẫn | **Cao** | Trung bình | Mode nhanh (3-4 vòng); progress bar rõ ràng; ước tính thời gian còn lại |
| Trùng lặp nội dung các vòng, AI nói lại nhau | **Trung bình** | Trung bình | Prompt yêu cầu "không lặp lại nội dung các vòng trước"; AI Manager v2.0 tự nhận diện và yêu cầu nội dung mới |
| Storage quota chrome.storage.local (10MB) | **Thấp** | Trung bình | Giới hạn lịch sử 100 cuộc họp; auto xóa cũ nhất; export trước khi xóa |
| Judge thiên vị / sai lầm hệ thống | **Cao** | Quan trọng | Bắt buộc Red Team; prompt Judge yêu cầu kiểm tra "khả năng cả hội đồng cùng sai"; cho đổi Judge provider |

---

## 9. Tiêu chí Thành Công

### 9.1 Kỹ thuật

- [ ] 5/5 adapter hoạt động ổn định với UI hiện tại của 5 providers (test 20 lần liên tục không lỗi selector)
- [ ] Timeout < 5% tổng số lượt gọi (timeout rate ≤ 1 trong 20 lượt)
- [ ] Một cuộc họp cân bằng (7 vòng) hoàn tất trong < 15 phút (trừ thời gian AI sinh text)
- [ ] Không có memory leak trong service worker sau 10 cuộc họp liên tục
- [ ] Dashboard không lag khi render transcript dài (> 10.000 từ)

### 9.2 Sản phẩm

- [ ] Người dùng mới cài, làm theo hướng dẫn 5 bước → chạy được cuộc họp đầu tiên trong < 5 phút
- [ ] Người dùng đánh giá kết luận cuối cùng "có giá trị hơn câu trả lời đơn AI" trong ≥ 70% trường hợp
- [ ] Không có feedback "vòng lặp vô ích / AI nói lại nhau" quá 20% số cuộc họp
- [ ] Export / Lịch sử dùng được trong thực tế hàng ngày

### 9.3 Học hỏi

- [ ] Score tracking cho thấy rõ từng AI mạnh ở lĩnh vực nào (ít nhất 50 cuộc họp mẫu)
- [ ] Preset đội hình được tạo ra từ score thực tế, không chỉ cảm tính

---

## 10. Hướng dẫn Sử dụng (Quick Start)

Bước 1 - Chuẩn bị 5 tab:
```
Mở và đăng nhập:
  https://chatgpt.com/
  https://claude.ai/
  https://gemini.google.com/
  https://grok.com/
  https://chat.deepseek.com/
Không đóng các tab này.
```

Bước 2 - Load extension:
```
1. chrome://extensions/
2. Bật Developer mode
3. Load unpacked → chọn thư mục AI-Council
4. Bấm icon extension → mở tab dashboard
```

Bước 3 - Chạy:
```
1. Dashboard: Nhập câu hỏi → chọn mode → Quét 5 tab
2. Xác nhận 5 provider đều xanh ✅
3. Bấm 🚀 Bắt đầu họp
4. Xem tiến độ real-time trong phần Điều phối
5. Khi hoàn tất, xem Kết luận + mở chi tiết cuộc tranh luận
```

---

## 11. Cấu trúc File System (Reference)

```
AI-Council/
├── manifest.json            # MV3 config
├── background.js            # Service Worker (message hub)
├── dashboard.html           # Giao diện tab chính
├── dashboard.css            # Styles dashboard
├── dashboard.js             # UI logic + message sender
├── orchestrator.js          # Core FSM 7 vòng
├── role-manager.js          # Phân vai + build prompts
├── debate-engine.js         # Inject adapter + run prompt
├── judge.js                 # Final judge + red team prompts
├── providers.js             # Config 5 providers (URL regex, roles)
├── tab-controller.js        # Quét tab theo URL
├── adapter-runtime.js       # Map provider → adapter file
└── adapters/
    ├── chatgpt.js           # DOM adapter ChatGPT
    ├── claude.js            # DOM adapter Claude
    ├── gemini.js            # DOM adapter Gemini
    ├── grok.js              # DOM adapter Grok
    └── deepseek.js          # DOM adapter DeepSeek
```

---

_Lưu ý: Plan này định tuyến theo MVP đã được implement. Tất cả module core (orchestrator, role-manager, debate-engine, 5 adapters) đã có code. Công việc tiếp theo là test độ ổn định adapter, thêm retry, lịch sử, export, sau đó mới đến v2.0 thông minh hơn._
