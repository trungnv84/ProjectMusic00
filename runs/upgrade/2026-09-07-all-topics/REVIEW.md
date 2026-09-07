# Curator risk review

## Overall

- Status: proposed
- Scope: all current curator topics
- External refs: none
- Archive: not read

## Main risks

1. Một số đề xuất có thể bị hiểu thành luật cứng dù bản chất âm nhạc phụ thuộc genre, dialect, performer hoặc user intent. Vì vậy các constraint mới đều giữ `needs_approval: true` trong changelog.
2. MusicXML structural guidance cần được kiểm chứng bằng parser/validator thực tế trước khi active như constraint.
3. `section-energy` là framework điều hướng phối khí, nên phần lớn nội dung được thiết kế như hint thay vì công thức cố định.
4. Trang tiếng Việt bổ sung chỉ xử lý ưu tiên khi nhiều mục tiêu xung đột; không biến thống kê ngữ âm thành luật tuyệt đối.
