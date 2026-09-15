# Changelog — Improver

## 2026-09-14

| Đề xuất | Lỗi sản phẩm nhắm tới | Lý do |
|---|---|---|
| `knowledge/melody/catchiness.md` | Giai điệu không catchy dù không vi phạm exact-repetition | Bổ sung mô hình catchiness: hook salience, rhythmic identity, contour, repetition-with-variation, singability, tension/release, predictability-vs-surprise và listener recall proxies. |
| `knowledge/melody/anti-patterns.md` | Giai điệu rời rạc/nhàm chán do “near-repeat” và low-information phrasing | Bổ sung family-level repetition, constant-onset monotony, cadence monotony và “feature-flatness”. |
| `knowledge/melody/musical-quality-gate.md` | Gate PASS nhưng người nghe vẫn thấy bài nhạt | Bổ sung `REQUIRE_CATCHY_HOOK`, candidate evidence và minimum catchiness score/evidence. |
| `pipeline/step-03-compose.md` | AI khóa candidate đầu tiên, thiếu vai trò songwriter/editor/listener | Đề xuất internal multi-candidate loop: 3 independent composer passes → blind-ish critic pass → selection → final polish → gate. |
| `02-compose-prompt` contract | AI chỉ nhận “hãy viết hook dễ nhớ” nhưng không có phương pháp | Ép AI nghiên cứu 3–5 reference songs ở cấp độ đặc trưng, sau đó synthesize abstract principles rồi mới invent original material. |
| `catalog.yml` | DOC_REFS chưa có knowledge về catchiness | Thêm `KNOW.MELODY.CATCHINESS` để Bước 3 luôn fetch đúng trang. |

### Sources
- https://doi.org/10.1525/mp.2024.2322897
- https://pubmed.ncbi.nlm.nih.gov/36991289/
- https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.906190/full
- https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2017.00621/full
- https://pubmed.ncbi.nlm.nih.gov/36622014/
- https://pubmed.ncbi.nlm.nih.gov/32583211/
