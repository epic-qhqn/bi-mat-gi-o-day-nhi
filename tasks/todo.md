# TODO LIST: NÂNG CẤP GIAI ĐOẠN, MASCOT, DÂY ĐÀN & LA BÀN THIÊN VĂN

## Phase 1: Nâng Cấp Thanh Trạng Thái Giai Đoạn (Stage & Ritual Progression)
- [x] Sub-phase 1.1: Hiện đại hóa Garden Stage Selector (`#garden-stage-selector`) thành "Hành Trình Đơm Hoa" với dải nhựa sống hữu cơ, vầng sáng breathing halo và con trượt phát sáng lướt mềm mại.
- [x] Sub-phase 1.2: Nâng cấp thanh tiến trình làm sáp (`.ritual-step-bar`) thành chuỗi ngọc khảm sơn mài ánh kim cao cấp.
- [x] Sub-phase 1.3: Cập nhật CSS/JS đồng bộ trạng thái giai đoạn mượt mà, hỗ trợ responsive trên cả mobile và desktop.

## Phase 2: Thay Thế Mascot Arms Bằng Tương Tác Cảm Xúc (Inspiration Meow Meow 20-10.html)
- [x] Sub-phase 2.1: Gỡ bỏ hoàn toàn các cánh tay robot `#mascot-arm-water`, `#mascot-arm-fertilize` và các props cơ học trong `index.html`, `js/mascot-companion.js` và `css/components.css`.
- [x] Sub-phase 2.2: Lập trình hệ thống ánh mắt dõi theo con trỏ chuột/chạm (gaze & pupil tracking) với giới hạn góc nhìn tự nhiên.
- [x] Sub-phase 2.3: Bổ sung tương tác vuốt ve cưng nựng (pet/nuzzle) kèm biểu cảm tít mắt cười `(>‿<)`, má hồng e ấp sen hồng và câu chúc ấm áp.
- [x] Sub-phase 2.4: Thay thế hoạt ảnh tưới sương và sưởi nắng bằng hiệu ứng đám mây nhiệm màu và đốm sáng đom đóm cổ tích.

## Phase 3: Di Dời Dây Đàn Hạc Khỏi Tâm Màn Hình (Aesthetic Botanical Lyre)
- [x] Sub-phase 3.1: Chuyển vị trí `plant-harp-strings-wrap` từ giữa màn hình (540px, 480px) về góc dưới bên phải cạnh dải hoa cỏ.
- [x] Sub-phase 3.2: Thiết kế khung đàn hạc mộc cầm uốn lượn phong cách thảo mộc, giữ nguyên cử chỉ gảy dây C5-A5 & vuốt glissando.
- [x] Sub-phase 3.3: Tối ưu UI/UX cho mobile/tablet dạng dải dây đàn thanh mảnh dễ thao tác mà không che các nút dock hoặc mầm cây.

## Phase 4: Tối Tân Hóa La Bàn Thiên Văn Mượt 100% & Bổ Sung Tính Năng Kỳ Diệu
- [x] Sub-phase 4.1: Xóa bỏ triệt để giật lag: cache bounding rect, chuyển sang `requestAnimationFrame` + lerp smoothing và vật lý quán tính (inertia damping).
- [x] Sub-phase 4.2: Tách biệt render kim xoay khỏi kích hoạt hiệu ứng thời tiết (chỉ trigger khi kim dừng hoặc chuyển vùng dứt khoát).
- [x] Sub-phase 4.3: Bổ sung tính năng "Kinh Độ Định Mệnh" (4 góc phương vị bí mật nở hoa may mắn) và nút ngọc "Hòa Điệu Thiên Hà".

## Phase 5: Kiểm Thử Đa Thiết Bị, Thẩm Mỹ & Đồng Bộ Git
- [x] Sub-phase 5.1: Kiểm tra cú pháp toàn bộ file JS (`node -c`) - 15/15 files passed OK.
- [x] Sub-phase 5.2: Kiểm tra tính cân bằng thẻ đóng mở và dấu ngoặc CSS - 3/3 files balanced OK.
- [x] Sub-phase 5.3: Kiểm thử toàn diện trên Mobile, Tablet, PC với zero horizontal overflow.
- [x] Sub-phase 5.4: Kiểm tra git commit/status, merge hoàn hảo và bàn giao.
