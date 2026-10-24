# KẾ HOẠCH TỔNG THỂ: MỞ RỘNG TRẮC NGHIỆM HOA & ĐẠI PHẪU THUẬT VĂN PHONG TIẾNG VIỆT

> **Dự án**: Điều Bí Mật Epic - Trải nghiệm Hoa Di sản Thơ ca Việt Nam tặng phái nữ 20/10.
> **Trọng tâm**: Không sửa code vội vàng. Lên kế hoạch chi tiết, sâu sắc, tinh tế để người dùng duyệt trước khi triển khai từng phase.

---

## I. BỐI CẢNH & MỤC TIÊU NGHỆ THUẬT

### 1. Hiện trạng văn phong
- Nhiều câu từ trên website còn mang dấu ấn dịch máy, hơi cứng nhắc, ngữ điệu hành chính hoặc đôi chỗ bị sáo rỗng, sến súa (ví dụ: *"chúc các bóng hồng công tác tốt"*, *"visual đỉnh chóp"*, *"chiều chuộng như công chúa"*).
- Thiếu đi hơi thở tự nhiên, sự mềm mại, ấm áp và tinh tế của tiếng Việt đời thường do con người viết bằng cả tấm lòng.
- Trắc nghiệm hoa dù đã có 10 câu nhưng cần mở rộng thêm các tình huống sâu sắc hơn, nhánh rẽ phong phú và thi vị hơn để người chơi cảm nhận trọn vẹn sự đồng điệu với bản thân.

### 2. Tuyên ngôn Văn phong Mới (Voice & Tone Manifesto)
1. **Tự nhiên & Tinh tế (Natural & Subtle)**: Ngôn từ đời thường mộc mạc mà có chiều sâu, như lời thủ thỉ của một người bạn tâm giao, một người đàn ông tinh tế hiểu và trân quý phái đẹp.
2. **Mềm mại mà không sến súa (Lyrical yet Grounded)**: Lắng đọng, thi vị, gợi cảm xúc chân thật; tuyệt đối tránh những lời tâng bốc hoa mỹ sáo rỗng hay các khẩu hiệu gượng gạo.
3. **Đậm đà Hồn Việt & Di sản**: Sử dụng vốn từ tiếng Việt giàu hình ảnh, nhịp điệu êm ái, gợi liên tưởng đến giọt sương mai, hương hoa đồng nội, tà áo lụa và sự an yên trong tâm hồn.
4. **Tôn vinh bản lĩnh & sự dịu dàng của phụ nữ hiện đại**: Trân trọng cả nét độc lập, tự chủ lẫn những khoảng lặng cần được yêu thương, vỗ về.

---

## II. LỘ TRÌNH TRIỂN KHAI 5 PHASE TUẦN TỰ (CHỜ USER DUYỆT)

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Mở rộng Trắc nghiệm & Kiến tạo Các Nhánh Rẽ Tâm Hồn Sâu Sắc    │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ PHASE 2: Đại phẫu thuật Văn phong Nghi thức Mở Vườn, Mascot & Stage HUD │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ PHASE 3: Viết lại Thư chúc chính 20/10 & 23 Lời chúc Nam Đồng nghiệp   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ PHASE 4: Nâng tầm Ngôn từ 27 Hồ sơ Hoa Di sản & Phân tích Tương hợp   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ PHASE 5: Tinh chỉnh Bưu thiếp Story, Realtime Guide & Thẩm định Toàn diện│
└────────────────────────────────────────────────────────────────────────┘
```

---

### PHASE 1: MỞ RỘNG TRẮC NGHIỆM & KIẾN TẠO CÁC NHÁNH RẼ TÂM HỒN
*Mục tiêu: Đưa người chơi vào hành trình khám phá bản thân qua các câu hỏi giác quan sống động và phân nhánh đa chiều.*

1. **Mở rộng kho câu hỏi (Từ 10 lên 14 - 16 kịch bản phong phú)**:
   - Tăng thêm các lát cắt cuộc sống: Khi một mình giữa đêm khuya tĩnh lặng, cách bạn chọn một cuốn sách/bộ phim, hương thơm làm bạn xao xuyến, thái độ trước một lời khen bất ngờ, cách bạn đối diện với một vết thương cũ.
2. **Đa dạng hóa Nhánh rẽ Động (Adaptive Multi-Branching)**:
   - Nhánh 1: *Thanh Tịnh & Mộc Mạc* (Hơi thở thiên nhiên, cỏ cây, trà ấm, chữa lành).
   - Nhánh 2: *Kiêu Sa & Vương Giả* (Bản lĩnh, gu thẩm mỹ, khí chất nữ vương, độc lập).
   - Nhánh 3: *Rạng Rỡ & Nắng Ấm* (Tiếng cười, sự hân hoan, ngẫu hứng, kết nối mọi người).
   - Nhánh 4: *Thấu Cảm & Hoài Niệm* (Chiều sâu tâm tưởng, thủy chung, lắng đọng ký ức).
3. **Tự nhiên hóa câu hỏi và các đáp án**:
   - Biến các lựa chọn A/B/C/D thành những phản xạ tâm lý rất "người", đọc lên là thấy hình ảnh của chính mình trong đó, không còn cảm giác làm bài thi trắc nghiệm.
4. **Tối ưu giải thuật phân bổ điểm & Phá thế hòa điểm thông minh**:
   - Tinh chỉnh ma trận trọng số cho 27 loài hoa để kết quả phản ánh sắc nét từng nét duyên độc bản.

---

### PHASE 2: ĐẠI PHẪU THUẬT VĂN PHONG NGHI THỨC MỞ VƯỜN, MASCOT & STAGE HUD
*Mục tiêu: Xóa bỏ hoàn toàn cảm giác "hệ thống máy móc", thay bằng không gian cổ tích ấm áp.*

1. **Nghi thức Niêm Phong Sáp & Thức Tỉnh Khu Vườn (`wax-seal-ceremony.js`, `index.html`)**:
   - Viết lại lời mời nhập tên: Nhẹ nhàng, trang trọng như một tấm thiệp mời danh dự vào khu vườn bí mật.
   - Lời dẫn từng thao tác: Đốt nến sưởi ấm, rót sáp cẩm thạch, đóng dấu đồng khắc tên. Dùng từ ngữ gợi tả sự nâng niu, trân trọng.
2. **Linh vật Rối Cắt Giấy Đồng Hành (`mascot-companion.js`)**:
   - Rà soát toàn bộ các câu thoại của Mascot qua từng Stage.
   - Thay các câu đùa gượng ép bằng giọng điệu hóm hỉnh, mộc mạc, đậm chất dân gian ấm cúng, như một người bạn nhỏ luôn dõi theo và khích lệ.
3. **Các thông điệp chuyển cảnh (Stage 1 đến Stage 4)**:
   - Stage 1 (Mầm Non & Cỏ 4 Lá): Lời nhắn tưới cây và sưởi nắng thật đượm tình, gợi niềm tin về sự sinh sôi nảy nở.
   - Stage 2 (Simon Melody - Điệu Nhạc Tình Yêu): Lời mời gảy đàn mộc cầm như hòa nhịp trái tim với thiên nhiên.
   - Stage 3 (Chòm Sao Thiên Văn): Lời dẫn nối sao định mệnh bay bổng, gắn kết các vì tinh tú với ước nguyện bình an.
   - Stage 4 (Cây Nở Hoa & Thiếu Nữ Áo Dài): Những câu thơ 20/10 thanh tao, sâu lắng bên bóng dáng Áo Dài, ca ngợi vẻ đẹp tâm hồn người phụ nữ Việt Nam.

---

### PHASE 3: VIẾT LẠI THƯ CHÚC 20/10 & 23 LỜI CHÚC NAM ĐỒNG NGHIỆP
*Mục tiêu: Đưa cảm xúc chân thực của các chàng trai đồng nghiệp vào từng con chữ, tự nhiên, hóm hỉnh và ấm áp.*

1. **Bức thư ngỏ chính 20/10 (`letterContent`)**:
   - Viết lại hoàn toàn: Bỏ sạch lối hành văn "CLB/Công ty chúc các bóng hồng", thay bằng bức tâm thư chân tình từ những người anh em/đồng nghiệp nam sát cánh mỗi ngày.
   - Thể hiện sự biết ơn chân thành vì sự dịu dàng, năng lượng tích cực và những hy sinh thầm lặng của chị em trong công việc lẫn cuộc sống.
   - Câu CTA mở món quà bí mật được lồng ghép duyên dáng, thôi thúc và ấm lòng.
2. **23 Lá thư cá nhân từ các thành viên nam (`randomClubLetters`)**:
   - Brainstorm và tạo nét cá tính riêng biệt cho từng bạn nam (Hải Đăng, Minh Quân, Hoàng Phong, Tuấn Anh...):
     - Có người hóm hỉnh, duyên dáng, chúc chuyện trà sữa, deadline nhẹ tênh mà vẫn tinh tế.
     - Có người điềm đạm, sâu sắc, chúc sự an yên trong tâm hồn và bình thản trước sóng gió.
     - Có người nhiệt thành, cổ vũ tinh thần, ca ngợi năng lực và sự độc lập của người phụ nữ.
   - Loại bỏ các câu chúc rập khuôn "ăn ngon không béo", "ví tiền rủng rỉnh", "chúc công tác tốt" đang bị lặp lại thiếu chiều sâu.

---

### PHASE 4: NÂNG TẦM NGÔN TỪ 27 HỒ SƠ HOA DI SẢN & PHÂN TÍCH TƯƠNG HỢP
*Mục tiêu: Từng bông hoa là một chân dung sống động, sắc sảo và tôn vinh đúng bản chất người nhận.*

1. **27 Tiêu đề & Câu châm ngôn (Titles & Poetic Quotes)**:
   - Soạn lại từng câu quote cho 27 loài hoa (Sen, Mai, Đào, Hồng, Mẫu Đơn, Lan, Tulip, Hướng Dương, Oải Hương, Cúc Họa Mi, Bách Hợp...): Mỗi câu là một tứ thơ cô đọng, giàu sức gợi và thấm đẫm triết lý nhân sinh.
2. **Bộ 3 Nét Duyên & Phân tích Tâm lý Chi tiết (`checklist`)**:
   - *Nét duyên ngày thường (`friend`)*: Viết sắc bén, chỉ ra đúng điểm đáng yêu khiến ai cũng muốn làm bạn.
   - *Khi trao yêu thương (`love`)*: Miêu tả cách người phụ nữ thuộc loài hoa đó yêu thương (sâu lắng, cháy bỏng, chăm chút hay tự do).
   - *Khi đối diện âu lo (`pressure`)*: Ca ngợi sức mạnh nội tâm, cách họ vượt qua áp lực mà vẫn giữ trọn cốt cách.
3. **Mối quan hệ Tương Hợp (Match) & Tương Khắc (Clash)**:
   - Viết lại lời bình giải thích tại sao hợp và tại sao lệch sóng: dí dỏm, thông minh, mang tính tâm lý học hành vi thay vì phán xét cứng nhắc.

---

### PHASE 5: TINH CHỈNH BƯU THIẾP STORY, REALTIME GUIDE & THẨM ĐỊNH TOÀN DIỆN
*Mục tiêu: Đảm bảo sản phẩm cuối cùng xuất sắc đến từng dấu chấm, dấu phẩy, sẵn sàng trao tặng.*

1. **Tấm Bưu Thiếp Di Sản Xuất Ảnh Canvas (`boarding-pass-modal.js`, `boarding-pass-canvas.js`)**:
   - Rà soát các dòng chữ in trên con tem, dấu bưu chính và mặt sau tấm thiệp Story 1080x1920.
   - Tối ưu ngữ nghĩa để khi người dùng tải ảnh về chia sẻ lên mạng xã hội (Facebook, Story, Instagram), tấm thiệp toát lên vẻ trang nhã, sang trọng và đầy kiêu hãnh.
2. **Hệ thống Chỉ dẫn Thời gian thực (`realtime-guide.js`, `experience-guide.js`)**:
   - Viết lại các gợi ý hành động ngắn gọn, khéo léo, mang tính gợi mở thay vì thúc giục.
3. **Quy trình Kiểm định & Nghiệm thu (Quality Gate)**:
   - Đọc diễn cảm toàn bộ văn bản để kiểm tra nhịp điệu và độ trôi chảy (read-aloud test).
   - Kiểm tra cú pháp JavaScript (`node -c js/*.js`), cân bằng CSS và kiểm thử giao diện responsive trên mọi kích thước màn hình.
   - Đồng bộ Git an toàn theo quy chuẩn Team 3 Devs.

---

## III. BẢNG TIÊU CHÍ SO SÁNH VĂN PHONG (TRƯỚC & SAU KHI NÂNG CẤP)

| Hạng mục | Văn phong Cũ (Gượng gạo / Sáo rỗng) | Văn phong Mới (Mềm mại, Tinh tế, Chân thật) |
| :--- | :--- | :--- |
| **Thư ngỏ 20/10** | *"Chúc các bóng hồng công tác tốt, học giỏi, luôn hạnh phúc với những gì mình có..."* | *"Cảm ơn vì góc phòng làm việc mỗi ngày đều sáng lên nhờ nụ cười của bạn. Chúc bạn luôn đủ kiên cường trước sóng gió, và đủ dịu dàng để yêu thương chính mình trọn vẹn..."* |
| **Lời chúc nam đồng nghiệp** | *"Chúc visual đỉnh chóp, bug tự biến mất, ví tiền rủng rỉnh nha!"* | *"Có bạn trong team là một điều may mắn. Cảm ơn sự cẩn trọng và năng lượng ấm áp bạn luôn mang vào từng cuộc họp. Chúc bạn một ngày 20/10 thật thảnh thơi, không âu lo..."* |
| **Mascot hướng dẫn** | *"Hãy nhanh tay nhấp vào bình tưới để cây lớn nhanh nào!"* | *"Kìa, mầm cây đang khát sương mai đó. Bạn khẽ tưới cho bạn ấy một ngụm nước trong lành nhé..."* |
| **Hồ sơ hoa** | *"Bạn 'hay là...', bạn ấy cần kế hoạch. Ý lạ gặp checklist dễ cãi nhau."* | *"Một người bay bổng giữa những ý tưởng ngẫu hứng, một người tìm kiếm sự an toàn trong lịch trình. Cần chút kiên nhẫn để cùng nhìn về một hướng..."* |
| **Câu hỏi trắc nghiệm** | *"Deadline dí sát nút rối tung bạn sẽ làm gì?"* | *"Một buổi chiều khi mọi dự định bỗng chao đảo như con thuyền gặp giông, điểm tựa đầu tiên trong tâm trí bạn là..."* |

---

## IV. YÊU CẦU DUYỆT TỪ NGƯỜI DÙNG
Xin mời bạn xem qua bản Kế hoạch Tổng thể trên. Khi bạn duyệt và hài lòng với định hướng văn phong cùng các phase triển khai, tôi sẽ bắt đầu thực hiện **từng Phase một** theo đúng chỉ đạo!
