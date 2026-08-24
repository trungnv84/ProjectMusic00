# AI Council — Chrome Extension MVP 1.0

Đây là bản Chrome Extension Manifest V3 điều phối 5 tab AI đang đăng nhập theo workflow:

`Question → Round 1 → Round 2 → Round 3 → Round 4 → Judge → Red Team → Final Judge`

## 1. Chuẩn bị 5 tab

Mở và đăng nhập bình thường vào đúng 5 website:

- ChatGPT: https://chatgpt.com/
- Claude: https://claude.ai/
- Gemini: https://gemini.google.com/
- Grok: https://grok.com/
- DeepSeek: https://chat.deepseek.com/

Không đóng các tab này trong lúc chạy.

## 2. Cài extension

1. Mở `chrome://extensions/`
2. Bật **Developer mode**.
3. Chọn **Load unpacked**.
4. Chọn thư mục `AI-Council`.
5. Bấm icon extension. Extension sẽ **mở một tab dashboard đầy đủ**, không dùng popup và không dùng side panel.

## 3. Luồng chạy

- Round 1: 5 AI suy nghĩ độc lập.
- Round 2: phản biện các lập luận Round 1.
- Round 3: xây dựng/điều chỉnh giải pháp.
- Round 4: đánh giá, chấm điểm và xếp hạng.
- Round 5: ChatGPT làm Chair/Judge.
- Round 6: Claude làm Red Team, cố phá quyết định.
- Round 7: ChatGPT xem Red Team và chốt phiên bản cuối.

## 4. Cấu trúc

- `dashboard.html/css/js`: giao diện full tab.
- `background.js`: service worker, tab scanning và orchestration.
- `orchestrator.js`: workflow 7 vòng.
- `role-manager.js`: phân vai động theo loại câu hỏi.
- `debate-engine.js`: gọi adapter trên từng tab.
- `judge.js`: Judge + Red Team prompts.
- `adapters/*.js`: adapter DOM riêng cho từng website.

## 5. Giới hạn MVP

Các website AI có thể thay đổi DOM bất kỳ lúc nào. Khi một provider đổi giao diện, sửa selector trong adapter tương ứng. Extension này không dùng API quota; nó thao tác trực tiếp với các tab web đang đăng nhập nên tính ổn định phụ thuộc UI của từng website.
