---
id: META.GUIDE-COMPOSE
type: meta
status: active
version: "1.0"
tags: [meta, compose, guide]
serves-steps: [1, 2, 3, 4]
sources: []
last-updated: "2026-09-08"
---

# Hướng dẫn Chức năng 1 — Sáng tác (4 bước)

> Dành cho **người dùng** (và AI khi user nhờ chạy sáng tác). Playbook kỹ thuật cho AI: [for-ai.md](../for-ai.md), [pipeline/overview.md](../pipeline/overview.md).

## Mục tiêu

Tạo bài hát (ưu tiên tiếng Việt) qua **4 bước độc lập**, xuất **MusicXML 4.0**:

| Bước | Đầu ra chính | Bạn làm gì |
|------|--------------|------------|
| 1 | `01-meta-prompt.md` | Duyệt / sửa meta-prompt |
| 2 | `02-compose-prompt.md` + `02-arrange-prompt.md` | Duyệt DOC_REFS + yêu cầu |
| 3 | `03-song.musicxml` + notes | Lead sheet: lời, giai điệu, hòa âm |
| 4 | `04-arranged.musicxml` + notes | Phối khí nhiều part |

Mỗi bước **dừng để bạn sửa**. Không bắt buộc chạy cả 4 trong một lần.

## Trước khi bắt đầu

1. Mở / gửi AI đọc: [`for-ai.md`](../for-ai.md) (điểm vào chính).
2. Chuẩn bị **yêu cầu bài hát** (chủ đề, cảm xúc, thể loại, ngôn ngữ, tempo nếu có). Schema đầy đủ: [song-request-schema.md](../meta/song-request-schema.md).
3. (Tuỳ) chọn **thẻ phong cách** — id trong bảng dưới — đưa vào `REFERENCE_STYLE`.
4. Workspace (Cursor): file ghi vào `runs/compose/<YYYY-MM-DD-slug>/`. Chỉ chat GitHub: AI xuất artifact trong chat theo template.

### Repo mẫu (URL)

Thay nếu fork khác. Branch mặc định repo này thường là `master`:

```text
OWNER  = trungnv84
REPO   = ProjectMusic00
BRANCH = master
FOR_AI = https://github.com/trungnv84/ProjectMusic00/blob/master/docs/m-guide/for-ai.md
```

## Thẻ phong cách (`REFERENCE_STYLE`)

Chỉ dùng **đặc trưng khái quát** — cấm sao chép lời/nhạc bài cụ thể.

| Id | Khi nào dùng |
|----|----------------|
| `STYLE.VN.VPOP-BALLAD` | Ballad V-Pop đương đại |
| `STYLE.POP.BALLAD-GENERIC` | Pop ballad chung |
| `STYLE.VN.BOLERO-TRU-TINH` | Bolero / nhạc vàng / trữ tình cũ |
| `STYLE.VN.DAN-CA-CONTEMPORARY` | Dân ca đương đại |
| `STYLE.VN.VPOP-UPTEMPO` | V-Pop / nhạc trẻ nhanh |
| `STYLE.VN.ACOUSTIC-INDIE` | Acoustic / indie VN nhẹ |
| `STYLE.VN.HEROIC-MARCH` | Hành khúc / khí thế |
| `STYLE.ROCK.GENERIC` | Rock guitar-driven |
| `STYLE.EDM.DANCE-POP-GENERIC` | Dance / EDM-pop |
| `STYLE.RNB.SOUL-GENERIC` | R&B / soul |
| `STYLE.JAZZ.POP-LIGHT` | Jazz-pop nhẹ |
| `STYLE.VN.HIPHOP-MELODIC` | Hip-hop melodic / rap-pop |
| `STYLE.FOLK.ACOUSTIC-GENERIC` | Folk acoustic generic |

Texture nhanh: [genre-textures.md](../knowledge/arrangement/genre-textures.md).

---

## Prompt mẫu

Copy khối phù hợp. Điền phần trong `"..."`.

### A. Cả chuỗi 4 bước (khuyến nghị lần đầu)

```text
Đọc https://github.com/trungnv84/ProjectMusic00/blob/master/docs/m-guide/for-ai.md
Thực hiện Chức năng 1 — cả 4 bước (dừng sau mỗi bước để tôi duyệt).
Nếu đang ở workspace: ghi vào runs/compose/<YYYY-MM-DD-slug>/.
Không sửa docs/m-guide/.

Yêu cầu bài hát:
- Tiêu đề làm việc: "..."
- Ngôn ngữ: tiếng Việt
- Chủ đề / CONCEPT: "..."
- Cảm xúc: "..."
- Thể loại / GENRE: "..."
- REFERENCE_STYLE: STYLE.VN.VPOP-BALLAD
- Form gợi ý: Verse – Pre – Chorus – Bridge – Chorus (hoặc để DELEGATED)
- Tempo / meter: (UNSPECIFIED hoặc ví dụ 72 BPM, 4/4)
- Vocal: (ví dụ giọng nữ, tessitura thoải mái)
- Ràng buộc cứng: không sao chép lời/nhạc có bản quyền; MusicXML 4.0

Sau Bước 1 và 2: chỉ tạo prompt + DOC_REFS, chưa viết bài.
Sau Bước 3: lead sheet (không full arrangement).
Sau Bước 4: phối khí; khóa lời/giai điệu/hòa âm từ Bước 3 trừ khi tôi nói được sửa.
```

### B. Chỉ Bước 1 (meta-prompt)

```text
Đọc https://github.com/trungnv84/ProjectMusic00/blob/master/docs/m-guide/for-ai.md
Làm Bước 1 (meta-prompt) theo pipeline/step-01-meta-prompt.md và prompt-craft/.
Workspace: ghi runs/compose/<YYYY-MM-DD-slug>/01-meta-prompt.md + STATUS.md.
Yêu cầu bài hát: "..."
REFERENCE_STYLE (nếu có): STYLE....
Mục tiêu meta-prompt: dạy AI Bước 2 đọc catalog và sinh 2 prompt (compose + arrange) kèm DOC_REFS — không viết lời/nhạc ở bước này.
```

### C. Chỉ Bước 2 (hai prompt chuyên biệt)

```text
Đọc https://github.com/trungnv84/ProjectMusic00/blob/master/docs/m-guide/for-ai.md
Làm Bước 2 theo pipeline/step-02-specialized-prompts.md.
Input: runs/compose/<run-id>/01-meta-prompt.md
         (hoặc dán meta-prompt dưới đây)
Yêu cầu bài hát: "..."
Xuất: 02-compose-prompt.md và 02-arrange-prompt.md — mỗi file có DOC_REFS lấy từ catalog.yml (URL raw), không nhét nguyên văn kho.
Không viết MusicXML ở bước này.
```

### D. Chỉ Bước 3 (sáng tác lead sheet)

```text
Đọc https://github.com/trungnv84/ProjectMusic00/blob/master/docs/m-guide/for-ai.md
Làm Bước 3 theo pipeline/step-03-compose.md.
Compose-prompt: runs/compose/<run-id>/02-compose-prompt.md
Yêu cầu bài hát: "..."
REFERENCE_STYLE: STYLE.VN.VPOP-BALLAD

Fetch mọi DOC_REFS trong compose-prompt + knowledge musicxml (rules, anti-patterns) + song-request-schema.
Xuất:
- runs/compose/<run-id>/03-song.musicxml  (lead sheet: vocal + lyrics + harmony)
- runs/compose/<run-id>/03-composition-notes.md  (bắt buộc lyrics_by_section — bản lời theo section để duyệt)
Cấm: full band arrangement; sao chép hook/lời bản quyền; bỏ qua thanh điệu tiếng Việt nếu primary_language = Vietnamese.
```

### E. Chỉ Bước 4 (phối khí)

```text
Đọc https://github.com/trungnv84/ProjectMusic00/blob/master/docs/m-guide/for-ai.md
Làm Bước 4 theo pipeline/step-04-arrange.md.
Arrange-prompt: runs/compose/<run-id>/02-arrange-prompt.md
Lead sheet khóa: runs/compose/<run-id>/03-song.musicxml
(+ 03-composition-notes.md nếu có)

Khóa lyric / melody / harmony từ Bước 3 — không đổi trừ khi tôi giao quyền.
Xuất:
- runs/compose/<run-id>/04-arranged.musicxml
- runs/compose/<run-id>/04-arrangement-notes.md
Dùng DOC_REFS arrange + style card + trang arrangement (orchestration, section-energy, drum-bass, intro-outro…) khi được trỏ.
```

### F. Ví dụ yêu cầu bài hát (điền sẵn mẫu)

```text
Yêu cầu bài hát:
- title: Mưa trên phố cũ (working title)
- language: Vietnamese
- CONCEPT: nhớ một mối tình đã qua trên phố quen; ngôi thứ nhất
- EMOTION: buồn ấm, hy vọng nhẹ ở chorus cuối
- GENRE: V-Pop ballad
- REFERENCE_STYLE: STYLE.VN.VPOP-BALLAD
- SONG_FORM: Intro – Verse – Pre – Chorus – Verse – Pre – Chorus – Bridge – Chorus – Outro
- RHYTHM: ~70 BPM, 4/4
- VOCAL: nữ, range vừa, tránh quá cao trừ climax chorus
- LYRIC: hook ngắn, dễ nhớ; tránh sáo rỗng; không tên thương hiệu
- HARMONY: DELEGATED trong biên ballad; tối đa 1 modulation nhẹ nếu hợp
- OUTPUT: MusicXML 4.0, có lời gắn nốt
```

### G. Sau khi chưa ưng — chuyển Improver (Chức năng 2b)

```text
Đọc https://github.com/trungnv84/ProjectMusic00/blob/master/docs/m-guide/for-ai.md
Chạy improver (prompts/improver.md).
Compose run: runs/compose/<run-id>/
Vấn đề: "..." (ví dụ: thanh điệu lệch / chorus yếu / MusicXML lỗi importer)
Ghi đề xuất vào runs/upgrade/<ngày-slug>/proposed/. Không sửa docs/m-guide/ cho đến khi tôi bảo merge.
```

---

## Checklist nhanh

- [ ] AI đã đọc `for-ai.md` + dùng `catalog.yml` (không dump cả kho)
- [ ] Mỗi bước có file trong `runs/compose/<run-id>/` (nếu workspace)
- [ ] Bước 3 = lead sheet; Bước 4 mới full parts
- [ ] `03-composition-notes.md` có `lyrics_by_section` khớp lời trong MusicXML
- [ ] Tiếng Việt: có xem tone-melody / syllable-priority khi viết lời+giai điệu
- [ ] `REFERENCE_STYLE` chỉ là nhãn đặc trưng — không copy bài mẫu
- [ ] MusicXML: part-list khớp part, measure liên tục, duration > 0, midi-program 1–128

## Liên kết thêm

| Mục | Path |
|-----|------|
| Vận hành AI | [for-ai.md](../for-ai.md) |
| Pipeline 4 bước | [pipeline/overview.md](../pipeline/overview.md) |
| Schema yêu cầu | [meta/song-request-schema.md](../meta/song-request-schema.md) |
| Prompt ngắn (cheatsheet) | [artifacts/user-message-ai.md](../artifacts/user-message-ai.md) |
| Thư mục kết quả | [../../../runs/README.md](../../../runs/README.md) |
| Catalog | [catalog.yml](../catalog.yml) |
