# TODO LIST: ĐẠI NÂNG CẤP TRẢI NGHIỆM TINH TẾ & HỆ THỐNG CHỈ DẪN NGHỆ THUẬT

> **Trạng thái**: Milestone 1 & 2 đã hoàn tất 100% và push lên nhánh chính. Đã xây dựng kế hoạch chi tiết cho **Milestone 3: Đại Nâng Cấp Trải Nghiệm Tinh Tế & Hệ Thống Chỉ Dẫn Nghệ Thuật (PC & Mobile)**. Đang chờ User phê duyệt kế hoạch trước khi bắt tay thực hiện!

---

## MILESTONE 1: ĐẠI PHẪU THUẬT VĂN PHONG TIẾNG VIỆT (ĐÃ HOÀN TẤT & PUSHED)
- [x] **Phase 1**: Mở rộng trắc nghiệm 12 câu giác quan & rẽ nhánh thích ứng trong `js/secret-letter.js`.
- [x] **Phase 2**: Đại phẫu thuật văn phong Nghi thức mở vườn, Mascot & Stage HUD (`js/wax-seal-ceremony.js`, `js/mascot-companion.js`, `js/garden-stages.js`).
- [-] **Phase 3**: [BỎ QUA THEO YÊU CẦU USER] Lời chúc được huy động các bạn nam trong CLB tự tay viết để tăng tính chân thật và ý nghĩa.
- [x] **Phase 4**: Viết lại toàn bộ 27 hồ sơ hoa di sản & phân tích tương hợp tâm lý học trong `js/flowers-data.js`.
- [x] **Phase 5**: Tinh chỉnh Bưu thiếp Story Canvas 1080x1920, HUD Real-Time Guide và kiểm định toàn diện.

---

## MILESTONE 2: ĐẠI NÂNG CẤP 54 LOÀI HOA DI SẢN & TRẮC NGHIỆM TÂM HỒN ĐA TẦNG (ĐÃ HOÀN TẤT & PUSHED)
- [x] **Phase 6**: Bách Khoa Toàn Thư 54 Loài Hoa Di Sản (`js/flowers-data.js`).
- [x] **Phase 7**: Kiến Tạo Hành Trình Trắc Nghiệm Đa Nhánh Sâu Sắc (16 Kịch Bản Giác Quan).
- [x] **Phase 8**: Tối Ưu Giải Thuật Điểm Số Đa Chiều & Phá Thế Hòa Điểm Cho 54 Loài Hoa.
- [x] **Phase 9**: Tích Hợp Đồng Bộ Giao Diện, Bưu Thiếp Canvas & Kiểm Thử Toàn Diện.

---

## MILESTONE 3: ĐẠI PHẪU THUẬT CON TRỎ HƯỚNG DẪN & BỘ NÂNG CẤP TRẢI NGHIỆM TINH TẾ (CHỜ DUYỆT)

### Phase 10: Tái Sinh Con Trỏ Hướng Dẫn Nghệ Thuật & Vòng Sương Mai Cảm Ứng (`js/realtime-guide.js`, `css/components.css`)
- [ ] 10.1: **Bút Lông Thư Họa / Cánh Sen Dát Vàng (Vector SVG)**: Xóa bỏ 100% emoji bàn tay thô (`👇👆👉👈`). Thay bằng biểu tượng cọ lông dát vàng thanh thoát hoặc cánh sen lấp lánh với góc nghiêng tự nhiên 45°, chuyển động thở êm ái (breathe animation).
- [ ] 10.2: **Vòng Tròn Sương Mai Cảm Ứng (Touch Aura / Morning Dewdrop Ripple) trên Mobile**: Tự động nhận diện thiết bị cảm ứng `(pointer: coarse)` để ẩn hình bàn tay/cọ (tránh che khuất ngón tay người dùng). Thay bằng vòng sóng nước sương mai ánh kim đồng tỏa nhẹ quanh nút cần chạm.
- [ ] 10.3: **Vệt Cử Chỉ Hướng Dẫn Trực Quan (Animated Drag / Swipe Gesture Trail)**: Với các thao tác quẹt que diêm, kéo mây mưa sương, kéo nắng ấm, kéo triện son: hiển thị một vệt lụa ánh kim mềm mại lướt nhẹ theo quỹ đạo cần kéo (Ghost Drag Curve) rồi tan biến, giúp hiểu ngay động tác mà không cần đọc chữ.
- [ ] 10.4: **Thanh Lọc Khung Ngắm Sci-Fi & Tạo Hào Quang Thủy Mặc**: Gỡ bỏ 4 góc ngắm cơ học bắn tỉa `.realtime-target-corners` và bóng neon rực chói. Thay bằng viền gân lụa dát vàng siêu mảnh kèm quầng sáng sương mờ (`backdrop-filter` nhẹ và hào quang vàng nhạt), đồng điệu 100% với giấy Dó.

---

### Phase 11: Bộ Nâng Cấp Xúc Giác Haptic & Vi Tương Tác Giác Quan (`js/audio-vfx.js`, `js/environment.js`)
- [ ] 11.1: **Tích hợp Phản Hồi Xúc Giác Haptic (Mobile Taptic Engine)**: Thêm các nhịp rung vi mô thông qua Web Vibration API: nhịp gảy 10ms khi chạm dây đàn harp, chuỗi lách tách `[8, 15, 12]ms` khi quẹt diêm lấy lửa, một nhịp nén đầm 30ms khi triện son ấn vào sáp ấm, nhịp rung nhẹ 15ms khi lật thiệp Polaroid.
- [ ] 11.2: **Vệt Cánh Sen & Bụi Kim Tuyến Theo Chuột trên PC (Stardust & Blossom Trail)**: Canvas hạt vi mô siêu nhẹ (60fps, tự động tắt trên Mobile) tỏa ra những cánh hoa sen li ti và bụi kim tuyến lướt theo chuyển động chuột của người dùng trên PC, hover vào tương tác hé nở búp hoa.

---

### Phase 12: Chế Độ Chiêm Ngưỡng Tĩnh Lặng & Bức Ảnh Kỷ Niệm (`index.html`, `js/garden-stages.js`, `css/components.css`)
- [ ] 12.1: **Chế Độ Tĩnh Lặng (Zen Mode Toggle)**: Nút biểu tượng "Trăng Rằm / Tĩnh Lặng" thanh nhã ở góc trên màn hình. Khi bấm, toàn bộ HUD, nút bấm, hướng dẫn sẽ trôi mượt mà (smooth fade-out), chỉ để lại trọn vẹn cảnh cây hoa tình yêu đung đưa, tà áo dài thướt tha, cánh hoa rơi và tiếng đàn du dương. Chạm bất kỳ đâu để hiện lại.
- [ ] 12.2: **Chụp Khoảnh Khắc Vườn Kỷ Niệm (Instant Garden Polaroid Capture)**: Tự động chụp một bức ảnh kỷ niệm lưu lại khu vườn đang nở rộ của riêng người dùng (kèm tên người nhận đã khắc trên triện son) dưới dạng ảnh Polaroid cổ điển để tải về ngay.

---

### Phase 13: Cá Nhân Hóa Quà Tặng Qua Liên Kết Bí Mật (`js/main.js`, `js/wax-seal-ceremony.js`)
- [ ] 13.1: **Hỗ Trợ Deep Link & URL Hash Gifting**: Đọc tham số URL dạng `#to=ThuHuong&crest=lotus` hoặc `?to=Thu+Huong`. Tên người nhận sẽ được tự động khắc sẵn lên khuôn triện son hoặc hiển thị lời chào trân trọng bất ngờ khi bạn nữ mở link. 100% client-side, bảo mật, không cần backend.

---

### Phase 14: Thẩm Định Đa Thiết Bị, Tối Ưu Mượt Mà & Đồng Bộ Git Safe
- [ ] 14.1: Thẩm định toàn diện trên PC (chuột, trackpad, màn hình lớn) và Mobile (iOS Safari, Android Chrome, xoay màn hình ngang/dọc).
- [ ] 14.2: Đảm bảo cú pháp JS `node -c js/*.js`, cân bằng CSS tuyệt đối, 60fps mượt mà, commit & push an toàn theo chuẩn Team 3 Devs.

