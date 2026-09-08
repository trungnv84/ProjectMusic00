# Upgrade changelog

---

## Summary

- type: curator
- one_line: Làm giàu 13 style card đã có bằng `works_or_artists_as_labels` chuẩn hóa theo era (3–8 nhãn/thẻ) và mục hint mới phân biệt "cổ điển hơn" vs "hiện đại hơn" trong cùng dòng nhạc (2–4 hint/thẻ); không thêm nội dung kiểu encyclopedia, không merge.

## Changes

| action | path (under proposed/docs/m-guide/) | product_issue_targeted | needs_approval | notes |
|--------|--------------------------------------|-------------------------|----------------|-------|
| update | docs/m-guide/knowledge/styles/pop-ballad-generic.md | labels chỉ có placeholder chung, thiếu phân biệt era; không có mục Hints | true | Thêm 4 nhãn era (power ballad 80s–90s → piano ballad 2020s); thêm mục Hints cổ điển/hiện đại mới (card gốc chưa có Hints) |
| update | docs/m-guide/knowledge/styles/vn-vpop-ballad.md | label placeholder chung; hint cổ điển/hiện đại có nhưng chỉ 2 dòng ngắn, chưa gắn era rõ | true | Thêm 4 nhãn era; mở rộng Hints hiện có thành 4 hint rõ era + giữ dòng kế thừa `STYLE.POP.BALLAD-GENERIC` |
| update | docs/m-guide/knowledge/styles/rock-generic.md | label chỉ có 2 nhãn chung chung, không có era; chưa phân biệt rock cũ/mới | true | Thêm 5 nhãn era (classic rock 70s–80s → rock đương đại 2010s–2020s); thêm mục Hints cổ điển/hiện đại mới, giữ nguyên mục Hints gốc |
| update | docs/m-guide/knowledge/styles/vn-heroic-march.md | label chỉ 1 nhãn placeholder; không có mục Hints | true | Thêm 3 nhãn theo giai đoạn lịch sử (1945–1975 / đổi mới / đương đại); thêm mục Hints cổ điển/hiện đại mới |
| update | docs/m-guide/knowledge/styles/vn-bolero-tru-tinh.md | label có nghệ sĩ nhưng thiếu nhãn era hải ngoại/phục hưng | true | Thêm era vào nhãn nghệ sĩ có sẵn + 1 nhãn era mới (bolero phục hưng 2010s–2020s); mở rộng Hints hiện có |
| update | docs/m-guide/knowledge/styles/vn-dan-ca-contemporary.md | label theo vùng miền nhưng thiếu chiều thời gian (era) | true | Thêm 2 nhãn era (cải biên 1954–1975; dân ca pha pop 2010s–2020s); mở rộng Hints hiện có |
| update | docs/m-guide/knowledge/styles/vn-vpop-uptempo.md | label nghệ sĩ không gắn era, dễ đọc nhầm là đương đại tuyệt đối | true | Gắn era vào từng nghệ sĩ + thêm 2 nhãn era dòng (EDM-pop 2015–2020 / R&B-trap-pop 2020s); mở rộng Hints hiện có |
| update | docs/m-guide/knowledge/styles/vn-acoustic-indie.md | label nghệ sĩ không gắn era | true | Gắn era vào từng nghệ sĩ (2014–2018 / 2018–nay) + tách 2 nhãn làn sóng; mở rộng Hints hiện có |
| update | docs/m-guide/knowledge/styles/edm-dance-pop-generic.md | thiếu nhãn tiền thân (eurodance) và làn sóng hiện đại hơn (future-bass) | true | Thêm 2 nhãn era hai đầu dòng thời gian; mở rộng Hints hiện có |
| update | docs/m-guide/knowledge/styles/rnb-soul-generic.md | label có 90s/2000s nhưng thiếu classic soul gốc và alt-R&B hiện đại | true | Thêm 2 nhãn era (classic soul 60s–70s; alt-R&B 2010s–2020s); mở rộng Hints hiện có |
| update | docs/m-guide/knowledge/styles/jazz-pop-light.md | thiếu nhãn tiền thân vocal jazz và mốc đương đại rõ | true | Thêm 2 nhãn era; mở rộng Hints hiện có |
| update | docs/m-guide/knowledge/styles/hiphop-melodic.md | label không phân biệt underground cũ vs mainstream mới | true | Thêm 2 nhãn era (underground 2010–2017; mainstream 2018–nay); mở rộng Hints hiện có |
| update | docs/m-guide/knowledge/styles/folk-acoustic-generic.md | thiếu nhãn tiền thân folk revival và mốc indie-folk | true | Thêm 2 nhãn era; mở rộng Hints hiện có |

Không có mục `add` / `deprecate` — chỉ `update` làm giàu 13 thẻ đã tồn tại theo đúng phạm vi run (không tạo thẻ mới, không đụng `_template.md`).

`docs/m-guide/catalog.yml`: **không đổi**. Không thẻ nào thay đổi `summary` trong catalog — chỉ thay đổi nội bộ (`works_or_artists_as_labels` + mục Hints), nên theo yêu cầu run này không cần cập nhật catalog.

## Sources (web)

```text
- none (no external refs)
```

Ghi chú: các nhãn era (thập niên, tên phong trào nhạc, tên nghệ sĩ) dùng lại chính xác những gì đã có sẵn trong kho hoặc là mốc thời gian/thể loại phổ biến, không dựa trên tra cứu ngoài mới trong run này.

## Cấm đã tuân thủ

- Không trích lời / giai điệu / progression độc bản của bất kỳ nhãn nào.
- Không biến `works_or_artists_as_labels` thành nguồn copy — vẫn giữ nguyên câu cảnh báo "không phải nguồn copy" ở đầu mỗi mục.
- Không mở rộng thành encyclopedia: mỗi hint mới đều ngắn (1 câu), chỉ mô tả đặc trưng dùng được lúc sáng tác/phối khí (harmony, texture, tempo/feel, cấu trúc), không kể lịch sử/tiểu sử.
- Không merge vào `docs/m-guide/`.

## Merge

Chỉ áp dụng vào `docs/m-guide/` khi user yêu cầu rõ. Xem `pipeline/merge-policy.md`.
