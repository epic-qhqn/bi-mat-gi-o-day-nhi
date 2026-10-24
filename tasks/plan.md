# KẾ HOẠCH TỔNG THỂ: MỞ RỘNG TRẮC NGHIỆM HOA & ĐẠI PHẪU THUẬT VĂN PHONG TIẾNG VIỆT

> **Dự án**: Điều Bí Mật Epic - Trải nghiệm Hoa Di sản Thơ ca Việt Nam tặng phái nữ 20/10.
> **Trọng tâm**: Không sửa code vội vàng. Lên kế hoạch chi tiết, sâu sắc, tinh tế để người dùng duyệt trước khi triển khai từng phase.

---

## I. BỐI CẢNH & MỤC TIÊU NGHỆ THUẬT

### 1. Hiện trạng văn phong & Nhu cầu nâng cấp
- **Milestone 1 (Đã hoàn thành)**: Đã đại phẫu thuật văn phong 5 Phase, xóa bỏ hoàn toàn từ ngữ sến súa, máy móc, xưng hô "nàng", "ngọc ngà", "bóng hồng", mang lại sự tươi trẻ, trang nhã và tôn vinh phái nữ.
- **Milestone 2 (Mục tiêu mới theo yêu cầu User)**:
  - Hiện tại hệ thống có **27 loài hoa**.
  - Người dùng yêu cầu mở rộng lên **hơn 50 loài hoa** (kết hợp giữa các loài hoa quen thuộc, phổ biến nhất và những loài hoa độc đáo, hiếm gặp nhưng có tầng ý nghĩa triết lý sâu sắc).
  - Tăng số lượng câu hỏi trắc nghiệm (từ 12 lên 16 - 18 kịch bản giàu chất thơ), tăng số lượng và độ sâu của các nhánh rẽ tâm lý (adaptive branching tree), giúp việc định danh loài hoa đạt độ chuẩn xác, thuyết phục và lay động lòng người.

### 2. Tuyên ngôn Văn phong Mới (Voice & Tone Manifesto)
1. **Tự nhiên & Tinh tế (Natural & Subtle)**: Ngôn từ đời thường mộc mạc mà có chiều sâu, như lời thủ thỉ của một người bạn tâm giao hiểu và trân quý phái đẹp.
2. **Mềm mại mà không sến súa (Lyrical yet Grounded)**: Lắng đọng, thi vị, gợi cảm xúc chân thật; tuyệt đối tránh những lời tâng bốc hoa mỹ sáo rỗng hay các khẩu hiệu gượng gạo.
3. **Đậm đà Hồn Việt & Di sản**: Sử dụng vốn từ tiếng Việt giàu hình ảnh, nhịp điệu êm ái, gợi liên tưởng đến giọt sương mai, hương hoa đồng nội, tà áo lụa và sự an yên trong tâm hồn.
4. **Tôn vinh bản lĩnh & sự dịu dàng của phụ nữ hiện đại**: Trân trọng cả nét độc lập, tự chủ lẫn những khoảng lặng cần được yêu thương, vỗ về.

---

## II. LỘ TRÌNH MILESTONE 1 (ĐÃ HOÀN THÀNH & PUSHED)
- [x] **Phase 1**: Mở rộng Trắc nghiệm & Xây dựng Nhánh rẽ Tâm hồn (12 câu hỏi giác quan, rẽ nhánh Góc Mộc/Hoa/Nắng/Mơ).
- [x] **Phase 2**: Đại phẫu thuật văn phong Nghi thức Nung sáp, Mascot Rối cắt giấy & Stage HUD.
- [-] **Phase 3**: [Bỏ qua theo chỉ đạo User để các bạn nam trong CLB tự tay viết thiệp thật].
- [x] **Phase 4**: Viết lại toàn bộ 27 hồ sơ hoa di sản & phân tích tương hợp tâm lý học trong `js/flowers-data.js`.
- [x] **Phase 5**: Tinh chỉnh Bưu thiếp Story 1080x1920, HUD Real-Time Guide và kiểm định toàn diện.

---

## III. LỘ TRÌNH MILESTONE 2: ĐẠI NÂNG CẤP 54 LOÀI HOA DI SẢN & HÀNH TRÌNH TÂM HỒN ĐA TẦNG

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 6: Bách Khoa Toàn Thư 54 Loài Hoa Di Sản (js/flowers-data.js)    │
│ (27 loài hiện tại + 27 loài mới giàu tính triết lý & Floriography)     │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ PHASE 7: Kiến Tạo Hành Trình Trắc Nghiệm Đa Nhánh Sâu Sắc              │
│ (Mở rộng từ 12 lên 16 kịch bản giác quan, phân nhánh thích ứng 5 chặng)│
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ PHASE 8: Giải Thuật Phân Bổ Điểm & Phá Thế Hòa Điểm 54 Hoa Thông Minh  │
│ (Multi-Dimensional Trait Matrix & Vector Affinity Matching Engine)     │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ PHASE 9: Đồng Bộ Hiển Thị UI/Canvas & Thẩm Định Chất Lượng Toàn Diện   │
│ (Polaroid 3D, Postcard Canvas 1080x1920, Node -c & Balanced CSS)       │
└────────────────────────────────────────────────────────────────────────┘
```

---

### PHASE 6: BÁCH KHOA TOÀN THƯ 54 LOÀI HOA DI SẢN (`js/flowers-data.js`)
*Mục tiêu: Đưa số lượng hoa từ 27 lên 54 loài (> 50 loài) với đầy đủ chiều sâu biểu tượng, màu sắc, quote, tính cách và ma sát hành vi thực tế.*

#### 1. Danh mục 27 loài hoa hiện có (Bảo tồn & chuẩn hóa):
1. **Hoa Sen** (`lotus`): Tinh tế, an nhiên, giữ tâm sáng giữa xô bồ.
2. **Mai Vàng** (`apricot_blossom`): Kiên định, ấm áp, rực rỡ khí chất.
3. **Hoa Đào** (`peach_blossom`): Duyên dáng, tươi mới, đón lộc thanh xuân.
4. **Hoa Lài** (`jasmine`): Thuần khiết, dịu êm, thơm ngát ban sơ.
5. **Hoa Hồng** (`rose`): Quyến rũ, độc lập, có gai để tự bảo vệ.
6. **Mẫu Đơn** (`peony`): Vương giả, đài các, phúc hậu bao dung.
7. **Lan Hồ Điệp** (`orchid`): Sang trọng, trí tuệ, sâu sắc nội tâm.
8. **Hoa Tulip** (`tulip`): Kiêu hãnh, thanh lịch, tinh tế kín đáo.
9. **Hướng Dương** (`sunflower`): Lạc quan, tích cực, ngập tràn sức sống.
10. **Đồng Tiền** (`gerbera`): Hồn nhiên, tươi vui, lan tỏa tiếng cười.
11. **Hoa Anh Túc** (`poppy`): Bí ẩn, cuốn hút, cảm xúc mãnh liệt.
12. **Hành Kiểng** (`allium`): Độc bản, kiên nhẫn, cá tính khác biệt.
13. **Cúc Họa Mi** (`daisy`): Bình dị, tự tại, trong trẻo đầu đông.
14. **Hoa Baby** (`baby_breath`): Nhẹ nhàng, nâng niu, điểm tựa thầm lặng.
15. **Oải Hương** (`lavender`): Thư thái, an yên, chữa lành tâm hồn.
16. **Cẩm Tú Cầu** (`hydrangea`): Thấu cảm, biết ơn, muôn vàn cảm xúc.
17. **Hoa Bách Hợp** (`lily`): Thanh nhã, đoan trang, kiêu sa chuẩn mực.
18. **Mộc Lan** (`magnolia`): Quý phái, can trường, kiên định trước gió.
19. **Hoa Trà** (`camellia`): Trầm tĩnh, kiên nhẫn, đằm thắm bền lâu.
20. **Cẩm Chướng** (`carnation`): Ấm áp, chở che, chu đáo chân tình.
21. **Hoa Sứ** (`plumeria`): Mộc mạc, bình thản, an trú hiện tại.
22. **Hoa Súng** (`water_lily`): Lắng đọng, kiên trì, hướng thiện trong veo.
23. **Hoa Lưu Ly** (`forget_me_not`): Thủy chung, hoài niệm, trân quý kỷ niệm.
24. **Hoa Salem** (`statice`): Bền bỉ, khiêm nhường, không phai trước thời gian.
25. **Cúc Vạn Thọ** (`marigold`): Ấm cúng, vững chãi, sum vầy nghĩa tình.
26. **Hoa Anh Đào** (`cherry_blossom`): Tinh khôi, bay bổng, trân trọng từng khoảnh khắc.
27. **Hoa Phù Dung** (`hibiscus`): Biến chuyển uyển chuyển, trọn vẹn từng phút giây.

#### 2. Danh mục 27 loài hoa bổ sung (Nghiên cứu Floriography & Văn hóa Việt Nam):
28. **Hoa Cát Tường** (`lisianthus`): May mắn, kiên cường ẩn sau nét mỏng manh như lụa.
29. **Hoa Linh Lan** (`lily_of_the_valley`): Hạnh phúc tìm về, thuần khiết trong ngần, chuông ngân hy vọng.
30. **Hoa Quỳnh** (`queen_of_the_night`): Nữ hoàng bóng đêm, kiêu sa tĩnh lặng, dâng trọn hương sắc cho khoảnh khắc tinh túy nhất.
31. **Hoa Ngọc Lan** (`white_champaca`): Hương thơm thanh tao vấn vương, vẻ đẹp đoan trang hướng thiện.
32. **Hoa Thiên Điểu** (`bird_of_paradise`): Khí chất tự do, kiêu hãnh vươn mình tới ánh sáng, bản lĩnh độc lập.
33. **Hoa Mộc Hương** (`osmanthus`): Khiêm nhường đằm thắm, hương thơm sâu lắng lan xa, nét duyên thầm bền bỉ.
34. **Hoa Bồ Công Anh** (`dandelion`): Tự do, ước mơ cất cánh, lòng dũng cảm buông bỏ để đón nhận điều mới.
35. **Hoa Thanh Liễu** (`wax_flower`): Sự bền bỉ dẻo dai, kiên nhẫn trong tình cảm, vẻ đẹp thanh tao sang trọng.
36. **Hoa Diên Vĩ** (`iris`): Trí tuệ sắc bén, lòng dũng cảm và niềm hy vọng rạng ngời.
37. **Hoa Thược Dược** (`dahlia`): Kiêu hãnh, biến hóa đa tài, nội lực bứt phá phi thường.
38. **Hoa Tử Đằng** (`wisteria`): Tình yêu bền chặt qua năm tháng, lòng kiên nhẫn và sự gắn kết thâm tình.
39. **Cúc Thạch Thảo** (`aster`): Lưu luyến hoài niệm, sự chung thủy dung dị, nét dịu dàng mùa thu.
40. **Hoa Thủy Tiên** (`narcissus`): Tự tin kiêu hãnh, biết yêu thương trân trọng chính mình, may mắn khởi sắc.
41. **Hoa Sim Rừng** (`sim_flower`): Tình cảm nguyên sơ, mộc mạc thủy chung miền sơn cước, e ấp chân tình.
42. **Hoa Mộc Miên / Hoa Gạo** (`bombax`): Sự chở che ấm áp, mộc mạc kiên trung, sức sống nồng nàn đất mẹ.
43. **Hoa Bách Nhật** (`globe_amaranth`): Bền bỉ sắc màu trước thời gian, tấm lòng son sắt không phai nhạt.
44. **Cúc Tana** (`tana_daisy`): Nắng mai trong trẻo, hồn nhiên tươi mới, nụ cười làm bừng sáng mọi khoảng lặng.
45. **Hoa Sử Quân Tử** (`rangoon_creeper`): Vươn lên mạnh mẽ bất chấp nghịch cảnh, tinh thần hiên ngang và kiên cường.
46. **Hoa Dạ Lan Hương** (`hyacinth`): Khao khát thấu cảm, sự chữa lành và tình cảm sâu lắng giấu kín.
47. **Hoa Huệ Ta** (`tuberose`): Tinh khiết cao quý, hương đêm thanh nhã, nét đẹp truyền thống đoan trang.
48. **Hoa Phong Lữ** (`geranium`): Sự an ủi, chở che ấm cúng, nguồn năng lượng xoa dịu tâm hồn.
49. **Hoa Mua** (`melastoma`): Sức sống mãnh liệt nơi sườn đồi, nét duyên thầm kiên cường thôn dã.
50. **Hoa Dừa Cạn** (`periwinkle`): Sức sống dẻo dai phi thường, kiên trì nở hoa qua mọi mùa nắng gió.
51. **Hoa Tuyết Mai** (`spiraea`): Thanh mảnh quý phái, tinh khôi tao nhã, nét duyên thanh xuân tươi mới.
52. **Hoa Hồng Môn** (`anthurium`): Trái tim nhiệt thành, hiếu khách, nồng ấm và tràn đầy sinh khí.
53. **Lan Vũ Nữ** (`oncidium`): Bay bổng phóng khoáng, tự tin tỏa sáng như một điệu vũ tự do.
54. **Hoa Bằng Lăng** (`crape_myrtle`): Dịu dàng hoài niệm, trong trẻo tuổi thanh xuân, nét duyên trầm lắng thủy chung.

---

### PHASE 7: KIẾN TẠO HÀNH TRÌNH TRẮC NGHIỆM ĐA NHÁNH SÂU SẮC (16 KỊCH BẢN GIÁC QUAN)
*Mục tiêu: Đưa người chơi vào hành trình khám phá tâm hồn 5 chặng, có nhánh rẽ độc bản phản ánh đúng góc nhìn cuộc sống.*

1. **Chặng 1: Thức Giác Sớm Mai (Sensory Awakening)**:
   - Câu 1: Thanh âm hoặc nhịp điệu đầu tiên làm bạn thấy ngày mới thực sự bắt đầu.
   - Câu 2: Hương vị ấm áp bạn muốn chạm vào trước khi bước ra thế giới tất bật.
2. **Chặng 2: 4 Nhánh Trải Nghiệm Không Gian Độc Bản (Adaptive 4-Way Branching)**:
   - Câu 3: Lựa chọn góc trú ẩn tâm hồn:
     - *Góc Mộc* (Mộc mạc thôn dã, hương đất ẩm, cỏ cây bình dị).
     - *Góc Thơ* (Cổ điển đoan trang, hoài niệm, giá sách gỗ, trà sen).
     - *Góc Nắng* (Năng lượng rạng rỡ, tiếng cười rộn rã, quán xá nhộn nhịp).
     - *Góc Gió* (Khoáng đạt tự do, ban công lộng gió, ngắm mây trời phiêu lãng).
   - Câu 4: Kịch bản rẽ nhánh độc quyền tương ứng với từng góc (Góc Mộc: chăm chút mầm cây; Góc Thơ: trang viết dang dở; Góc Nắng: chia sẻ niềm vui bất ngờ; Góc Gió: kế hoạch cho chuyến đi ngẫu hứng).
3. **Chặng 3: Phản Xạ Nội Tâm & Bản Lĩnh Trước Thử Thách (Resilience & Pressure)**:
   - Câu 5: Khi một dự định ấp ủ bỗng gặp trục trặc bất ngờ, điều đầu tiên bạn làm là gì?
   - Câu 6: Trước một lời đánh giá thiếu thiện chí từ người xa lạ, tâm thế bạn giữ cho mình là gì?
   - Câu 7: Khi cạn kiệt năng lượng giữa guồng quay bộn bề, "trạm sạc" hiệu nghiệm nhất của bạn là gì?
4. **Chặng 4: Ngôn Ngữ Yêu Thương & Sự Thấu Cảm (Emotional Intimacy)**:
   - Câu 8: Cách bạn chọn để ở bên một người bạn thân đang rơi vào nỗi buồn sâu sắc.
   - Câu 9: Khoảnh khắc nào trong một mối quan hệ khiến bạn cảm thấy trái tim mình thực sự được vỗ về?
   - Câu 10: Nhánh rẽ ngày nghỉ tự do (Một mình tận hưởng khoảng lặng, tụ họp ấm áp, khám phá điều mới mẻ, hay hoàn thành việc ấp ủ).
   - Câu 11: Món quà tinh thần có sức nặng nhất mà bạn từng trao hoặc từng nhận.
5. **Chặng 5: Đêm Thu Lắng Đọng & Nguyện Ước Sâu Kín (Soul Synthesis)**:
   - Câu 12: Khi đứng dưới bầu trời đầy sao trong một đêm thu tĩnh mịch, ý nghĩ thường đến nhất trong bạn là gì?
   - Câu 13: Một phẩm chất ở bản thân mà bạn luôn tự hào và gìn giữ qua năm tháng.
   - Câu 14: Nếu được gửi một lời thì thầm nhắn nhủ đến chính mình của 5 năm trước, bạn sẽ nói điều gì?
   - Câu 15: Khi nghe một bản nhạc không lời da diết, hình ảnh hiện lên đầu tiên trong tâm trí bạn.
   - Câu 16: Lời chúc ngày 20/10 chạm đến tận đáy lòng bạn nhất là lời chúc về điều gì?

---

### PHASE 8: GIẢI THUẬT PHÂN BỔ ĐIỂM & PHÁ THẾ HÒA ĐIỂM 54 HOA THÔNG MINH
*Mục tiêu: Đảm bảo cả 54 loài hoa đều có cơ hội xuất hiện chuẩn xác, khoa học và tinh tế.*

1. **Ma trận điểm số đa chiều (Multi-Dimensional Trait Matrix)**:
   - 8 trục tính cách định danh:
     - `serene` (Tĩnh tại, an nhiên, lắng đọng)
     - `radiant` (Rực rỡ, lạc quan, tràn đầy sức sống)
     - `resilient` (Bản lĩnh, kiên cường, dẻo dai)
     - `gentle` (Dịu dàng, chu đáo, chở che)
     - `free` (Tự do, phóng khoáng, thích khám phá)
     - `poetic` (Mộng mơ, hoài niệm, sâu sắc)
     - `noble` (Kiêu hãnh, quý phái, độc lập)
     - `authentic` (Chân thật, mộc mạc, không màu mè)
2. **Giải thuật Phá thế Hòa điểm Thông minh (Smart Affinity Tie-Breaker)**:
   - Lưu trữ lịch sử lựa chọn của người dùng dưới dạng vector trọng số.
   - Khi có 2 hay nhiều loài hoa có tổng điểm bằng nhau, thuật toán sẽ tính khoảng cách cosine / độ khớp vector đặc trưng giữa câu trả lời của người dùng và hồ sơ tâm lý của hoa.
   - Đảm bảo kết quả luôn mang tính tất định, độc bản và hoàn toàn thuyết phục.

---

### PHASE 9: ĐỒNG BỘ HIỂN THỊ UI/CANVAS & THẨM ĐỊNH TOÀN DIỆN
1. Cập nhật thẻ bưu thiếp Polaroid 3D trong `js/secret-letter.js`.
2. Cập nhật bộ chọn và xuất ảnh Canvas 1080x1920 trong `js/boarding-pass-modal.js` và `js/boarding-pass-canvas.js`.
3. Kiểm tra cú pháp toàn bộ `node -c js/*.js`, cân bằng CSS và kiểm thử trải nghiệm trên Mobile & Desktop.
4. Git commit & đồng bộ an toàn theo chuẩn Team 3 Devs.

---

## V. LỘ TRÌNH MILESTONE 3: ĐẠI PHẪU THUẬT CON TRỎ HƯỚNG DẪN & BỘ NÂNG CẤP TRẢI NGHIỆM TINH TẾ (PC & MOBILE)

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 10: Tái Sinh Con Trỏ Hướng Dẫn Nghệ Thuật & Vòng Sương Mai Cảm Ứng│
│ (Xóa emoji thô, cọ thư họa SVG, Dewdrop Ripple Mobile, Drag Trail lụa) │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ PHASE 11: Bộ Nâng Cấp Xúc Giác Haptic & Vi Tương Tác Giác Quan         │
│ (Web Vibration API: gảy đàn, dập sáp, quẹt diêm; Vệt bụi hoa PC 60fps) │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ PHASE 12: Chế Độ Chiêm Ngưỡng Tĩnh Lặng (Zen Mode) & Ảnh Kỷ Niệm Nhanh  │
│ (Ẩn toàn bộ UI để ngắm trọn vẹn Cây hoa Áo Dài; Instant Polar-shot)    │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ PHASE 13: Cá Nhân Hóa Quà Tặng Qua Deep Link & URL Hash Gifting        │
│ (Tự động khắc tên người nhận trên triện son qua #to=Ten & ?from=NguoiGui)
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ PHASE 14: Thẩm Định Đa Thiết Bị, Tối Ưu Mượt Mà & Đồng Bộ Git Safe     │
│ (Kiểm thử PC & Mobile Landscape/Portrait, Node -c, Balanced CSS)       │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 1. BỐI CẢNH & PHÂN TÍCH HIỆN TRẠNG CON TRỎ CHỈ DẪN
- **Vấn đề cốt lõi của Con trỏ Chỉ dẫn hiện tại (`js/realtime-guide.js`, `css/components.css`)**:
  1. **Sử dụng Emoji hệ điều hành thô kệch**: Đang dùng emoji hệ thống `👇`, `👆`, `👉`, `👈` (`.pointer-hand-glyph`). Trên Windows/Android/iOS, emoji này hiển thị màu vàng hoạt hình, viền đen dày cộp, lạc quẻ hoàn toàn với phong cách Thư họa & Giấy Dó Trầm Tĩnh của website.
  2. **Khung ngắm cơ học kiểu Game Bắn Súng (Sci-Fi Crosshair)**: Ô vuông chỉ dẫn có 4 góc ngoặc cơ khí `.c-tl, .c-tr, .c-bl, .c-br` và bóng neon rực sáng như màn hình ngắm bắn quân sự (HUD shooter), gây xung đột thị giác nghiêm trọng với tinh thần Á Đông truyền thống.
  3. **Che khuất điểm chạm trên Mobile (Touch Obstruction)**: Ngón tay người dùng trên điện thoại vốn đã to, con trỏ bàn tay to bản trỏ đè lên vật thể khiến người dùng bị che mất tầm nhìn, khó bấm chính xác.
  4. **Chuyển động nhấp nháy giật cục (Constant Bouncing Fatigue)**: Animation nảy liên tục 1.2s không ngừng nghỉ dễ tạo cảm giác hối thúc, sốt ruột thay vì thư thái dạo vườn.

---

### 2. CHI TIẾT TỪNG PHASE & SUB-PHASE NÂNG CẤP

#### PHASE 10: TÁI SINH CON TRỎ HƯỚNG DẪN NGHỆ THUẬT & VÒNG SƯƠNG MAI CẢM ỨNG
*File trọng tâm: `js/realtime-guide.js`, `css/components.css`*

- **Sub-phase 10.1: Tuyệt tác Cọ Thư Pháp Dát Vàng / Cánh Sen Ánh Kim (Vector SVG)**
  - Thay thế 100% emoji bàn tay bằng Vector SVG nội suy thuần:
    - Trên PC: Biểu tượng ngọn Cọ Lông Thư Họa dát vàng (Gold Calligraphy Brush) nghiêng góc 45° thanh thoát, đầu ngọn cọ chấm nhẹ vào vật thể với vệt bụi vàng kim tuyến rơi li ti.
    - Chuyển động thở êm ái (Gentle Breathing Glow & Float) với chu kỳ 2.4s mềm mại (cubic-bezier 0.4, 0, 0.2, 1) thay vì nảy giật cục.
- **Sub-phase 10.2: Chế độ Vòng Tròn Sương Mai Cảm Ứng (Touch Aura / Dewdrop Ripple) trên Mobile**
  - Sử dụng Media Query `(pointer: coarse)` hoặc Touch Sniffing để tự động ẩn ngọn cọ trên điện thoại/máy tính bảng.
  - Thay bằng **Vòng Sương Mai Thở Nhẹ (Dewdrop Ripple)**: Vòng tròn ánh kim đồng mỏng manh tỏa ra nhẹ nhàng xung quanh nút cần chạm (tương tự giọt sương mai khẽ rơi trên mặt hồ tĩnh lặng). Tuyệt đối không che khuất ngón tay và tầm nhìn.
- **Sub-phase 10.3: Vệt Cử Chỉ Hướng Dẫn Trực Quan (Animated Drag / Swipe Gesture Trail)**
  - Với các thao tác cần kéo thả (Quẹt diêm qua bao diêm, Kéo đám mây sương, Kéo vệt nắng ban mai, Rót sáp lỏng, Dập triện son):
    - Vẽ một vệt lụa ánh kim mềm mại lướt nhẹ theo quỹ đạo cần kéo (Ghost Drag Curve) rồi tan biến dịu dàng.
    - Giúp người dùng cả PC lẫn Mobile hiểu ngay cử chỉ cần thực hiện mà không cần phải đọc từng dòng chữ hướng dẫn dài dòng.
- **Sub-phase 10.4: Thanh Lọc Khung Ngắm Sci-Fi, Thay Bằng Hào Quang Thủy Mặc**
  - Xóa bỏ 4 góc ngoặc cơ học `.realtime-target-corners` và bóng đổ neon thô.
  - Thay bằng viền gân lụa dát vàng siêu mảnh (`1px solid rgba(212, 175, 55, 0.45)`) kèm lớp quầng sáng sương mờ dịu mắt (`backdrop-filter: blur(1px)` và `box-shadow` màu hổ phách ấm), hài hòa tuyệt đối với nền Giấy Dó.

---

#### PHASE 11: BỘ NÂNG CẤP XÚC GIÁC HAPTIC & VI TƯƠNG TÁC GIÁC QUAN
*File trọng tâm: `js/audio-vfx.js`, `js/environment.js`*

- **Sub-phase 11.1: Tích Hợp Phản Hồi Xúc Giác Haptic (Mobile Taptic Engine)**
  - Tận dụng `navigator.vibrate` trên thiết bị di động (kiểm tra an toàn `if ('vibrate' in navigator)`):
    - Chạm gảy dây đàn Botanical Harp: nhịp rung vi mô 10ms mô phỏng cảm giác bật dây đàn thật.
    - Quẹt que diêm: chuỗi rung lách tách `[8, 15, 12]ms` mô phỏng ma sát đầu diêm bốc lửa.
    - Dập triện son vào sáp: nhịp nén đầm 30ms mô phỏng độ nặng của con dấu đồng ép vào sáp ấm.
    - Lật thẻ Polaroid 3D & Chạm Cỏ 4 Lá: nhịp rung nhẹ 15ms.
    - Tạo cảm giác "chạm vào vật lý thật" vô cùng sang trọng và đắt giá trên smartphone.
- **Sub-phase 11.2: Vệt Cánh Sen & Bụi Kim Tuyến Theo Chuột trên PC (Stardust & Blossom PC Trail)**
  - Trên PC: Khi di chuột trên khung trời khu vườn, một vệt cánh hoa sen li ti và bụi kim tuyến lướt theo chuyển động chuột (Canvas Particle Trail siêu nhẹ, tối ưu 60fps) và tan dần trong gió thu.
  - Chuột hover vào các vật thể tương tác: con trỏ chuyển thành búp sen khẽ hé nở.
  - Tự động tắt 100% trên thiết bị cảm ứng để bảo vệ pin và hiệu năng.

---

#### PHASE 12: CHẾ ĐỘ CHIÊM NGƯỠNG TĨNH LẶNG (ZEN MODE) & BỨC ẢNH KỶ NIỆM
*File trọng tâm: `index.html`, `js/garden-stages.js`, `css/components.css`*

- **Sub-phase 12.1: Nút "Chế Độ Tĩnh Lặng" (Zen Mode Toggle)**
  - Bổ sung một nút biểu tượng "Trăng Rằm / Tĩnh Lặng" thanh nhã ở góc trên màn hình.
  - Khi kích hoạt: Tự động trôi mượt mà (smooth fade-out) toàn bộ HUD, nút bấm, bảng chữ, chỉ giữ lại khung cảnh khu vườn: Cây tình yêu nở hoa rực rỡ, cánh hoa bay theo gió, tà áo dài thướt tha, và tiếng đàn du dương.
  - Người dùng có thể đắm chìm vào không gian thư thái không chút vướng bận. Chạm nhẹ bất kỳ đâu vào màn hình để gọi lại giao diện.
- **Sub-phase 12.2: Chụp Khoảnh Khắc Vườn Kỷ Niệm (Instant Garden Polaroid Capture)**
  - Nút chụp nhanh lưu lại khung cảnh khu vườn hiện tại của người dùng (kèm tên người nhận đã khắc trên triện son) dưới dạng ảnh Polaroid cổ điển để tải về máy hoặc chia sẻ Story ngay.

---

#### PHASE 13: CÁ NHÂN HÓA QUÀ TẶNG QUA LIÊN KẾT BÍ MẬT (DEEP LINK GISTING)
*File trọng tâm: `js/main.js`, `js/wax-seal-ceremony.js`*

- **Sub-phase 13.1: Hỗ Trợ URL Hash & Query Parameters**
  - Hỗ trợ tham số URL dạng `#to=ThuHuong&crest=lotus` hoặc `?to=Thu+Huong`.
  - Khi mở link: Tên "Thu Hường" đã được tự động điền sẵn lên khuôn đồng, hoặc tự động chuẩn bị hoa văn sen.
  - Giúp bạn nam trong CLB khi gửi link cho bạn nữ, bạn nữ mở ra là thấy ngay sự chuẩn bị riêng cho mình, cảm xúc bất ngờ và xúc động tăng lên gấp bội.
  - 100% Client-Side, không cần server/database, an toàn và tải nhanh tức thì.

---

#### PHASE 14: THẨM ĐỊNH ĐA THIẾT BỊ, TỐI ƯU MƯỢT MÀ & ĐỒNG BỘ GIT SAFE
- **Sub-phase 14.1: Kiểm định toàn diện trên các kích thước màn hình**
  - Màn hình Desktop/Laptop (Chuột, Trackpad, màn hình 2K/4K).
  - Điện thoại thông minh (iPhone notch/Dynamic Island, Android tai thỏ, chế độ xoay ngang Orientation Guard).
- **Sub-phase 14.2: Kiểm tra tiêu chuẩn chất lượng nghiêm ngặt**
  - Syntax check toàn bộ `node -c js/*.js` (18/18 file).
  - CSS brace check cân bằng tuyệt đối.
  - Hiệu năng 60fps mượt mà, không giật lag.
  - Git fetch, rebase, commit và push sạch sẽ theo tiêu chuẩn Team 3 Devs.

---

## VI. BẢNG TIÊU CHÍ NÂNG CẤP CON TRỎ & TRẢI NGHIỆM

| Hạng mục | Hiện Trạng (Cũ) | Nâng Cấp Tinh Tế (Mới) | Lợi Ích Cảm Xúc |
| :--- | :--- | :--- | :--- |
| **Biểu tượng con trỏ** | Emoji hệ thống `👇 👆 👉 👈` màu vàng hoạt hình viền đen dày | Ngọn cọ thư họa dát vàng SVG (PC) / Cánh sen ánh kim | Tinh tế, đậm chất di sản Việt, không bị thô kệch |
| **Trải nghiệm Mobile** | Con trỏ to che khuất ngón tay và vật thể bấm | Vòng sương mai cảm ứng (Dewdrop Ripple) tỏa nhẹ | Thoáng đãng, chạm chính xác, không vướng víu |
| **Chỉ dẫn kéo/vuốt** | Dòng chữ dài + emoji nảy liên tục | Vệt lụa ánh kim uốn lượn (Ghost Drag Curve) | Hiểu ngay cử chỉ trong 0.5s mà không cần đọc chữ |
| **Khung viền spotlight** | 4 góc ngắm bắn cơ học sci-fi + neon chói | Viền gân lụa dát vàng mảnh + quầng sáng sương mờ | Sang trọng, hài hòa với chất liệu giấy Dó |
| **Cảm giác xúc giác** | Chỉ có âm thanh click loa ngoài | Haptic vibration (Taptic Engine) chân thật | Cảm nhận lực nén triện son, dây đàn rung dưới tay |
| **Không gian ngắm cảnh** | Nút bấm và HUD luôn phủ kín màn hình | Nút "Chế độ Tĩnh Lặng" (Zen Mode) 1 chạm ẩn UI | Thảnh thơi ngắm cây hoa tình yêu và tà áo dài |
| **Cá nhân hóa quà tặng** | Phải tự nhập tên thủ công từ đầu | Deep link `#to=TenNguoiNhan` khắc sẵn tên | Bất ngờ, chu đáo, cá nhân hóa cho từng bạn nữ |

---

## VII. YÊU CẦU DUYỆT TỪ NGƯỜI DÙNG
Kế hoạch nâng cấp Milestone 3 đã được thiết kế tỉ mỉ, tập trung vào những nét chấm phá siêu tinh tế mà không làm xáo trộn kiến trúc sẵn có. Xin vui lòng xem xét và duyệt kế hoạch này để tôi bắt tay vào thực hiện từng Phase!

