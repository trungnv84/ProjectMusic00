# ProjectMusic00

Kho tài liệu giúp AI (hoặc người) **sáng tác bài hát tiếng Việt → MusicXML** qua 4 bước, và **tự cải thiện** kho khi kết quả chưa đạt.

## Cho AI — một link là đủ

Đọc file này trước mọi việc:

- Blob: [`docs/m-guide/for-ai.md`](docs/m-guide/for-ai.md)
- Raw: `https://raw.githubusercontent.com/<owner>/<repo>/<branch>/docs/m-guide/for-ai.md`

Thay `<owner>`, `<repo>`, `<branch>` theo repo thật (thường `main`).

## Cho người

- Hướng dẫn kho: [`docs/m-guide/README.md`](docs/m-guide/README.md)
- Kết quả chạy trong editor: [`runs/`](runs/)
- Tài liệu cũ (không dùng sáng tác): [`archive/`](archive/)

## Hai chức năng

1. **Sáng tác (4 bước):** meta-prompt → 2 prompt chuyên biệt (+ DOC_REFS) → MusicXML sáng tác → MusicXML phối khí.
2. **Tự nâng cấp:** curator (bổ sung kho) + improver (sau lần chạy không đạt). Đề xuất ghi vào `runs/upgrade/`; **chỉ merge vào `docs/m-guide/` khi người dùng yêu cầu rõ**.
