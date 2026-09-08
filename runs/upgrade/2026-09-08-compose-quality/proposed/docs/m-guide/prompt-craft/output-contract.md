---
id: CRAFT.OUTPUT-CONTRACT
type: meta
status: active
version: "1.1"
tags: [prompt-craft]
serves-steps: [1]
last-updated: "2026-09-08"
---

# Output contract — Meta-prompt

File `01-meta-prompt.md` phải có các khối:

1. **ROLE** — AI nhận meta-prompt này sẽ tạo 2 prompt (compose + arrange).
2. **GOAL** — Hai prompt + DOC_REFS từ catalog; không nhét nguyên văn kho.
3. **CATALOG** — Chỉ dẫn đọc `catalog.yml` (path + raw URL nếu biết BASE). Chỉ path có trong catalog.
4. **COMPOSE_PROMPT_SPEC** — Vai trò composer, schema song request, pha 3a→3b→3c, DOC_REFS (gồm planning / anti-patterns / quality-gate / lyric-melody-fit), output plan + MusicXML lead sheet + notes.
5. **ARRANGE_PROMPT_SPEC** — Vai trò arranger, input = MusicXML Bước 3, DOC_REFS arrange, khóa lời/giai điệu/hòa âm, output MusicXML nhiều part.
6. **DOC_REFS_RULES** — Mỗi ref: id, path, url, why. Dựng URL theo link-scheme. Không path ngoài catalog.
7. **FORBIDDEN** — Không archive; không bản quyền nguyên văn; không tự sáng tác bài ở Bước 2; **không** invent Step 5 / vendor Suno-Udio; **không** bịa file catalog.
8. **DELIVERABLES** — Tên file: `02-compose-prompt.md`, `02-arrange-prompt.md`.

Dùng [meta-prompt.template.md](../artifacts/meta-prompt.template.md) làm khung điền.
