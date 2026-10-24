# TODO: TỐI ƯU HÓA TOÀN DIỆN GIAO DIỆN MOBILE & TABLET (ƯU TIÊN MOBILE LANDSCAPE)

> **Mục tiêu**: Tập trung 100% fix lỗi và ổn định giao diện điện thoại & tablet (đặc biệt là chế độ xoay ngang), giữ nguyên vẹn 100% giao diện PC.

---

### Phase 1: Nghệ Thuật Hướng Dẫn Xoay Ngang Màn Hình (Poetic Landscape Orientation Experience)
- [x] 1.1: Tái thiết kế `#rotate-device-overlay` với thẩm mỹ Di Sản Thơ Ca (giấy Dó ngà, viền vàng kim `#D4AF37`, hoa sen sương mai, câu chúc tiếng Việt truyền cảm hứng).
- [x] 1.2: Xây dựng animation điện thoại xoay ngang 90 độ mềm mại, có vệt sáng lụa và cánh sen bay.
- [x] 1.3: Cân chỉnh media query CSS để overlay chỉ kích hoạt trên điện thoại cầm dọc (`max-width: 820px` & `portrait`), tự động biến mất khi xoay ngang, không ảnh hưởng tablet lớn hay PC.

---

### Phase 2: Kiến Trúc Viewport & Safe Area Mobile Landscape (`#wrap`, Insets & Auto-Scale)
- [x] 2.1: Tinh chỉnh động cơ co giãn tỷ lệ `resizeWrap` trong `js/main.js` tối ưu cho các tỉ lệ màn hình ngang dài (19.5:9, 20:9, 21:9) và chiều cao hạn chế ($320\text{px} - 420\text{px}$).
- [x] 2.2: Tích hợp safe-area insets (`env(safe-area-inset-left/right)`) bảo vệ các nút điều khiển khỏi tai thỏ, Dynamic Island và thanh cử chỉ home.
- [x] 2.3: Ổn định spatial layout chống rung giật khi thanh địa chỉ URL của trình duyệt di động (iOS Safari / Android Chrome) ẩn/hiện.

---

### Phase 3: Tối Ưu Giao Diện Đóng Dấu Sáp & Nhập Tên (Stage 0: Time Lock & Wax Seal Atelier Desk in Landscape)
- [x] 3.1: Tái cấu trúc `#time-lock-modal` thành bố cục ngang 2 cột thanh lịch, chiều cao $\le 90\text{vh}$, không bị cắt khuất nút bấm.
- [x] 3.2: Tái thiết kế `#atelier-stationery-desk` thành Bố cục 2 Cột Chế Tác Ngang (Cột trái: Khuôn đồng khắc tên, khay hạt sáp, chọn triện son; Cột phải: Ánh nến, muỗng đun sáp, vùng dập triện).
- [x] 3.3: Đảm bảo các tương tác quẹt diêm, khuấy vân sáp cẩm thạch, đóng dấu son mượt mà, không bị bàn phím ảo hay viền màn hình che khuất.

---

### Phase 4: Sắp Đặt Không Gian HUD & Triệt Tiêu Chồng Đè (In-Garden Spatial Harmony)
- [ ] 4.1: Phân bổ lại 4 góc màn hình HUD trên mobile landscape (Top-Left: Realtime Guide; Top-Right: Zen & Polaroid; Bottom-Left: Harp, Orrery & Thời tiết; Bottom-Right: Thư bí mật & Bưu thiếp).
- [ ] 4.2: Tối ưu vị trí Mascot Companion (`#garden-mascot-companion`) và Áo Dài Di Sản (`#ao-dai-viet-stage4`), đảm bảo bóng thoại mascot không đè lên bảng thơ.

---

### Phase 5: Thích Ứng Minigames & Tương Tác Cảm Giác (Simon Melody & Constellation Linker in Landscape)
- [ ] 5.1: Stage 2 (Simon Melody): Tính toán lại cung tròn 5 chuông hoa theo chiều ngang màn hình, nằm trọn vẹn trong tầm với của ngón cái 2 bên.
- [ ] 5.2: Stage 3 (Constellation Linker): Giới hạn thuật toán tọa độ sao trong vùng an toàn của canvas ngang, bán kính chạm $\ge 44\text{px}$.

---

### Phase 6: Hoàn Thiện Modal Thiệp, Bưu Thiếp & Thư Bí Mật (Polaroid, Postcard & Letter)
- [ ] 6.1: Modal Thư Bí Mật (`#letter-overlay-modal`): Thẻ Polaroid 3D và thư giấy Dó co giãn vừa khít chiều cao ngang, phông chữ $14\text{px} - 16\text{px}$ sắc nét, dễ đọc.
- [ ] 6.2: Modal Bưu Thiếp Di Sản (`#boarding-pass-modal`): Chế độ xem thiệp ngang linh hoạt, các nút tải ảnh và đổi hoa xếp hàng tiện lợi.
- [ ] 6.3: Modal Khoảnh Khắc Vườn Kỷ Niệm (`#garden-polaroid-modal`): Khung ảnh Polaroid tự động vừa khít chiều cao màn hình, nút tải ảnh luôn hiển thị.

---

### Phase 7: Kiểm Thử Đa Thiết Bị Thực Tế & Đóng Gói Hoàn Hảo (Testing & Git Harmony)
- [ ] 7.1: Ma trận kiểm thử giả lập trên iPhone SE (568x320), iPhone 14 Pro (844x390), Samsung Galaxy (800x360), iPad Mini (1024x768).
- [ ] 7.2: Kiểm tra đối chứng màn hình PC (1920x1080) đảm bảo 100% không hồi quy (Zero PC Regression).
- [ ] 7.3: Kiểm tra cú pháp JS `node -c js/*.js`, kiểm tra cân bằng CSS `{}` và push an toàn lên nhánh `main`.
