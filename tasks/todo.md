# TODO LIST: ĐẠI NÂNG CẤP 54 LOÀI HOA DI SẢN & HÀNH TRÌNH TRẮC NGHIỆM ĐA TẦNG

> **Trạng thái**: Đã nghiên cứu Google Floriography kỹ lưỡng, đã lập kế hoạch chi tiết cho Milestone 2, đang chờ User duyệt kế hoạch trước khi bắt tay thực hiện từng Phase.

---

## MILESTONE 1: ĐẠI PHẪU THUẬT VĂN PHONG TIẾNG VIỆT (ĐÃ HOÀN TẤT & PUSHED)
- [x] **Phase 1**: Mở rộng trắc nghiệm 12 câu giác quan & rẽ nhánh thích ứng trong `js/secret-letter.js`.
- [x] **Phase 2**: Đại phẫu thuật văn phong Nghi thức mở vườn, Mascot & Stage HUD (`js/wax-seal-ceremony.js`, `js/mascot-companion.js`, `js/garden-stages.js`).
- [-] **Phase 3**: [BỎ QUA THEO YÊU CẦU USER] Lời chúc được huy động các bạn nam trong CLB tự tay viết để tăng tính chân thật và ý nghĩa.
- [x] **Phase 4**: Viết lại toàn bộ 27 hồ sơ hoa di sản & phân tích tương hợp tâm lý học trong `js/flowers-data.js`.
- [x] **Phase 5**: Tinh chỉnh Bưu thiếp Story Canvas 1080x1920, HUD Real-Time Guide và kiểm định toàn diện.

---

## MILESTONE 2: ĐẠI NÂNG CẤP 54 LOÀI HOA DI SẢN & TRẮC NGHIỆM TÂM HỒN ĐA TẦNG

### Phase 6: Bách Khoa Toàn Thư 54 Loài Hoa Di Sản (`js/flowers-data.js`)
- [x] 6.1: Bảo tồn và chuẩn hóa 27 loài hoa hiện tại, giữ tính tương thích 100% với các tính năng đang chạy.
- [x] 6.2: Nghiên cứu và soạn thảo 27 loài hoa di sản bổ sung (Cát Tường, Linh Lan, Quỳnh, Ngọc Lan, Thiên Điểu, Mộc Hương, Bồ Công Anh, Thanh Liễu, Diên Vĩ, Thược Dược, Tử Đằng, Cúc Thạch Thảo, Thủy Tiên, Sim Rừng, Mộc Miên, Bách Nhật, Cúc Tana, Sử Quân Tử, Dạ Lan Hương, Huệ Ta, Phong Lữ, Hoa Mua, Dừa Cạn, Tuyết Mai, Hồng Môn, Lan Vũ Nữ, Bằng Lăng).
- [x] 6.3: Thiết kế đầy đủ bộ nhận diện cho 27 loài hoa mới (`title`, `quote`, `traits`, `match`, `clash`, `checklist: friend, love, pressure`).
- [x] 6.4: Kiểm tra tính cân bằng cảm xúc và tâm lý học giữa các loài hoa, đảm bảo không có loài nào bị lép vế hay thiếu chiều sâu (54 loài hoa, 0 trùng lặp, 100% đầy đủ thuộc tính).

---

### Phase 7: Kiến Tạo Hành Trình Trắc Nghiệm Đa Nhánh Sâu Sắc (16 Kịch Bản Giác Quan)
- [x] 7.1: Thiết kế 16 kịch bản trắc nghiệm sâu sắc, chia làm 5 chặng hành trình tâm hồn tự nhiên, không gượng ép.
- [x] 7.2: Mở rộng nhánh rẽ thích ứng đa tầng (Chặng 2: 4 góc không gian độc bản Góc Mộc, Góc Thơ, Góc Nắng, Góc Gió; Chặng 4: Nhánh ngày nghỉ tự do).
- [x] 7.3: Tinh chỉnh câu từ các phương án lựa chọn: giàu hình ảnh, nhịp điệu êm ái, chạm vào cảm xúc người đọc.

---

### Phase 8: Tối Ưu Giải Thuật Điểm Số Đa Chiều & Phá Thế Hòa Điểm Cho 54 Loài Hoa
- [ ] 8.1: Xây dựng ma trận ánh xạ điểm số đa chiều (8 trục tính cách: Serene, Radiant, Resilient, Gentle, Free, Poetic, Noble, Authentic).
- [ ] 8.2: Lập trình thuật toán phá thế hòa điểm thông minh (Vector Affinity Tie-Breaker) dựa trên độ tương đồng vector đặc trưng tâm hồn.
- [ ] 8.3: Kiểm tra tính phân bổ xác suất, đảm bảo cả 54 loài hoa đều có kịch bản lựa chọn để xuất hiện.

---

### Phase 9: Tích Hợp Đồng Bộ Giao Diện, Bưu Thiếp Canvas & Kiểm Thử Toàn Diện
- [ ] 9.1: Đồng bộ hóa hiển thị 54 loài hoa trong thẻ bưu phẩm Polaroid 3D (`js/secret-letter.js`).
- [ ] 9.2: Đồng bộ hóa bộ chọn hoa và chức năng xuất ảnh Canvas 1080x1920 Story trong `js/boarding-pass-modal.js` và `js/boarding-pass-canvas.js`.
- [ ] 9.3: Thực hiện kiểm định chất lượng: cú pháp JS (`node -c js/*.js`), cân bằng CSS và kiểm thử giao diện responsive trên mọi thiết bị.
- [ ] 9.4: Báo cáo kết quả và đồng bộ Git sạch sẽ theo tiêu chuẩn Team 3 Devs.
