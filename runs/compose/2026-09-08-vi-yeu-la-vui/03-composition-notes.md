# 03-composition-notes — Yêu Là Vui Thế Thôi

```text
COMPOSITION_NOTES
──────────────────────────────────────────────
central_poetic_image:
  chosen_image: "bầu trời xanh / nắng mới / mây bay"
  development_across_song: "Verse mở bằng ánh sáng và phố; pre-chorus đưa cảm xúc lên bằng hình ảnh mùa xuân; chorus mở không gian thành trời, mây và sắc màu; bridge giữ niềm vui qua hình ảnh mưa/gió; final chorus khép bằng bình minh và cảm giác có nhau."

literary_devices_used:
  - device: "điệp ngữ"
    location: "Chorus / Final Chorus"
    purpose: "neo hook 'Yêu là vui thế thôi'"
  - device: "ẩn dụ hình ảnh"
    location: "toàn bài"
    purpose: "dùng nắng, trời xanh, mây, bình minh để tạo cảm giác yêu trong sáng và bay bổng"
  - device: "vần cuối nhẹ + lặp âm"
    location: "Verse / Chorus"
    purpose: "tăng độ nhớ nhưng không ép nghĩa câu"

reference_style_handling:
  - style_card_id: "STYLE.VN.VPOP-BALLAD"
    how_applied: "đặc trưng khái quát only: hòa âm pop chức năng I–V–vi–IV, verse tương đối bước liền, chorus nâng register, hook ngắn lặp, texture lead-sheet tối giản"
    no_copy_affirmation: true

resolved_delegated_fields:
  - field: "tempo"
    decision: "112 BPM"
    rationale: "Yêu cầu user 'vui tươi nhanh' là yêu cầu tường minh; dải 65–80 BPM của style card được xem là hint, không khóa bài."
    alternatives_considered: ["96 BPM", "104 BPM", "112 BPM"]
  - field: "time_signature"
    decision: "4/4"
    rationale: "Phù hợp cảm giác V-Pop phổ thông và delivery nhanh, rõ."
    alternatives_considered: ["2/4"]
  - field: "key"
    decision: "C major"
    rationale: "sáng, dễ hát và phù hợp hòa âm I–V–vi–IV; đây là quyết định sáng tác, không phải yêu cầu user."
    alternatives_considered: ["G major", "D major"]
  - field: "harmonic_language"
    decision: "C–G–Am–F với biến thể Em/Dm ở pre/bridge"
    rationale: "giữ màu pop rõ chức năng và tạo không gian cho melody bay bổng."
    alternatives_considered: ["C–Am–F–G", "G–D–Em–C"]

tone_melody_tradeoffs:
  - "Các từ khóa của hook được ưu tiên giữ cao độ ổn định hoặc đi lên ở âm tiết có thanh sắc; hạn chế đường nét ngược nghĩa ở từ khóa."
  - "Thanh huyền/nặng được đặt ở vùng thấp hơn hoặc nốt ngắn hơn khi có lựa chọn hợp lý."
  - "Không dùng melisma trong lead sheet này, vì tiếng Việt và hook cần độ rõ âm tiết cao."
  - "Một số âm tiết chức năng được phép linh hoạt hơn để giữ nhịp câu và motif; không có tradeoff cố ý làm đảo nghĩa từ khóa."

deviations_or_tradeoffs:
  - "REFERENCE_STYLE là V-Pop Ballad nhưng user đồng thời yêu cầu bài nhanh, vui tươi. Vì hai yêu cầu đều thuộc user-level nhưng khác mục tiêu, bản compose giữ màu hòa âm / melodic lyricism của ballad và đẩy tempo + groove lên 112 BPM. Điều này không dùng style tempo 65–80 BPM như constraint."
  - "Bước 3 chỉ xuất lead sheet gồm Voice + Piano reduction, không full band arrangement."

musicxml_parts:
  - id: P1
    name: Voice
  - id: P2
    name: Piano

structure:
  tempo_bpm: 112
  meter: "4/4"
  key: "C major"
  form:
    - INTRO: measures 1–4
    - VERSE_1: measures 5–14
    - PRE_CHORUS: measures 15–18
    - CHORUS: measures 19–28
    - VERSE_2: measures 29–38
    - PRE_CHORUS_2: measures 39–42
    - CHORUS_2: measures 43–52
    - BRIDGE: measures 53–60
    - FINAL_CHORUS: measures 61–70
    - OUTRO: measures 71–74
  lyric_policy:
    syllable_to_note: "1 Vietnamese syllable → 1 note"
    syllabic: "single"
    melisma: false

lyrics_by_section:
  - section: INTRO
    measures: "1-4"
    lines: []
  - section: VERSE_1
    measures: "5-14"
    lines:
      - "Nắng nghiêng qua ô cửa"
      - "Gió gọi tên ban mai"
      - "Mắt em như vì sao"
      - "Chạm vào tim anh rồi"
      - "Phố hôm nay trong veo"
      - "Môi cười như nắng sớm"
      - "Bàn tay mình chạm khẽ"
      - "Nghe trời xanh ngân nga"
      - "Mây trôi qua thật nhẹ"
      - "Mình bước chung một đường"
  - section: PRE_CHORUS
    measures: "15-18"
    lines:
      - "Tim reo lên một chút"
      - "khi em cười bên anh"
      - "Nghe mùa xuân thức giấc"
      - "Từ trong đôi mắt xanh"
  - section: CHORUS
    measures: "19-28"
    lines:
      - "Yêu là vui thế thôi"
      - "Khi hai ta có nhau"
      - "Trời trong như mắt em"
      - "Mây bay qua rất mau"
      - "Yêu là vui thế thôi"
      - "Tim ngân lên sắc màu"
      - "Cho đôi môi biết cười"
      - "Và ngày xanh biết hát"
      - "Ta đi qua phố nắng"
      - "Mơ một trời dịu dàng"
  - section: VERSE_2
    measures: "29-38"
    lines:
      - "Chiều nghiêng trên vai áo"
      - "Lá rung theo bước chân"
      - "Có em bên cạnh nhé"
      - "Phố thành vườn mê say"
      - "Ta nghe chim ngoài phố"
      - "Gọi mùa yêu sang trang"
      - "Những điều chưa từng nói"
      - "Bỗng hóa thành dịu dàng"
      - "Ánh sao treo trên tóc"
      - "Và mắt em long lanh"
  - section: PRE_CHORUS_2
    measures: "39-42"
    lines:
      - "Tim reo lên một chút"
      - "khi em cười bên anh"
      - "Nghe mùa xuân thức giấc"
      - "Từ trong đôi mắt xanh"
  - section: CHORUS_2
    measures: "43-52"
    lines:
      - "Yêu là vui thế thôi"
      - "Khi hai ta có nhau"
      - "Trời trong như mắt em"
      - "Mây bay qua rất mau"
      - "Yêu là vui thế thôi"
      - "Tim ngân lên sắc màu"
      - "Cho đôi môi biết cười"
      - "Và ngày xanh biết hát"
      - "Ta đi qua phố nắng"
      - "Mơ một trời dịu dàng"
  - section: BRIDGE
    measures: "53-60"
    lines:
      - "Mai nếu mưa ghé qua"
      - "Ta vẫn cười như nắng"
      - "Vì trong tim mình có"
      - "Một trời xanh rất gần"
      - "Mai nếu ngày đổi gió"
      - "Tay vẫn tìm tay thôi"
      - "Mình giữ nhau bằng những"
      - "Điều bé xinh trên đời"
  - section: FINAL_CHORUS
    measures: "61-70"
    lines:
      - "Yêu là vui thế thôi"
      - "Mình trao nhau ước mơ"
      - "Trời trong theo bước chân"
      - "Mây bay trên mái nhà"
      - "Yêu là vui thế thôi"
      - "Tim ngân lên sắc màu"
      - "Cho đôi môi biết cười"
      - "Và ngày xanh biết hát"
      - "Ta ôm trọn bình minh"
      - "Mơ một trời có nhau"
  - section: OUTRO
    measures: "71-74"
    lines:
      - "Yêu là vui thế thôi"
      - "Mình đi trong nắng mới"
      - "Tim ngân lên sắc màu"
      - "Và ngày xanh biết hát"

validation:
  - "MusicXML 4.0 partwise + DTD"
  - "part-list count equals actual parts"
  - "measure numbering continuous 1→74 in both parts"
  - "all written note durations > 0"
  - "each 4/4 measure totals 16 divisions"
  - "midi-program values are within 1–128"
  - "no archive/ content used"
  - "no copyrighted lyric, melody, hook, or riff copied"
```
