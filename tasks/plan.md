# KẾ HOẠCH NÂNG CẤP TOÀN DIỆN UI/UX: GIAI ĐOẠN, MASCOT, DÂY ĐÀN & LA BÀN THIÊN VĂN

> **Nguyên tắc cốt lõi**: Giữ vững kiến trúc **100% Web Tĩnh (Full-Static Client-Side)**, bảo toàn chuẩn mực thiết kế **Vietnamese Poetic Heritage**, tuân thủ nghiêm ngặt **Concurrent Git Protocol** và quy tắc `.antigravity/rules.md`.

---

## TỔNG QUAN CÁC ĐIỂM CẢI TIẾN CỐT LÕI

| Hạng mục | Hiện trạng | Giải pháp nâng cấp hiện đại & thơ mộng |
| :--- | :--- | :--- |
| **1. Thanh trạng thái giai đoạn** | Khối vuông `border-radius: 10px`, màu sắc đơn điệu | Thiết kế **"Hành Trình Đơm Hoa" (Botanical Constellation Rail)**: đường ray chỉ số sinh trưởng hữu cơ với thanh dẫn sáng (progress vein), nút mầm sống phát sáng thở, con trượt ánh kim trôi mềm mại (fluid sliding pill), kèm nâng cấp thanh tiến trình đóng sáp (Artisan Lacquer Strand). |
| **2. Mascot Companion** | Tay robot cơ khí thô ráp (`mascot-arm-water`, `mascot-arm-fertilize`) | **Loại bỏ triệt để cánh tay cơ học**. Thay thế bằng hệ thống tương tác cảm xúc lấy cảm hứng từ Meow Meow (`20-10.html`): đôi mắt dõi theo con trỏ chuột/chạm (pupil tracking), cử chỉ gọi mây sương/hoa đăng kỳ diệu, hiệu ứng vuốt ve cưng nựng (pet/nuzzle) với vệt ửng hồng sen e ấp (`////`) và lời đồng dao ấm áp. |
| **3. Dây đàn hạc (Botanical Harp)** | Chiếm giữa màn hình PC (`left: 540px; top: 480px`), che khuất mầm cây và Áo Dài | Di dời khéo léo về góc dưới (Aesthetic Corner Vignette) mô phỏng đàn hạc mộc cầm uốn lượn cạnh thảm cỏ; hỗ trợ thu gọn/mở rộng thanh thoát, tối ưu trượt ngón tay glissando trên cả Mobile & Tablet mà không che tâm điểm thị giác. |
| **4. La bàn thiên văn (Celestial Orrery)** | Giật lag khi xoay nhanh (layout thrashing do `getBoundingClientRect` liên tục); ít công dụng | **Tối ưu 60/120fps mượt mà 100%** bằng `requestAnimationFrame`, bộ đệm tọa độ (cached rect), vật lý xoay quán tính (inertia damping); bổ sung **"Kinh Độ Định Mệnh" (Celestial Wayfinding)** & nút ngọc **"Hòa Điệu Thiên Hà"** mở khóa điềm may và mưa sao băng. |

---

## KẾ HOẠCH CHI TIẾT TỪNG PHASE THỰC HIỆN

### PHASE 1: NÂNG CẤP THANH TRẠNG THÁI GIAI ĐOẠN (STAGE & RITUAL PROGRESSION)
- **1.1. Tái thiết kế Garden Stage Selector (`#garden-stage-selector`)**:
  - Chuyển đổi từ các nút bấm vuông thành **"Hành trình đơm hoa"**:
    * Đường ray quang học thủy tinh mờ (`backdrop-filter`) với dải nhựa sống (growth vine) phát sáng nối 4 chặng: `1. Mầm sinh` ➔ `2. Đồng dao` ➔ `3. Tinh tú` ➔ `4. Đơm hoa`.
    * Con trượt định vị phát sáng (gliding active thumb) chuyển động mượt mà dọc thanh ray bằng `cubic-bezier`.
    * Hiệu ứng pulse hạt sương/vầng sáng tại giai đoạn hiện tại.
  - Tối ưu hiển thị responsive trên Mobile (dạng micro-pill thanh mảnh, không chạm viền màn hình, tuân thủ `safe-area-inset`).
- **1.2. Nâng cấp thanh tiến trình làm sáp (`.ritual-step-bar`)**:
  - Thay thế các khối tròn thông thường bằng chuỗi ngọc khảm sơn mài (Artisan Filigree Beads) với đường kim tuyến nối các bước.
  - Hiệu ứng gợn sóng ánh vàng (golden ripple) khi hoàn tất từng bước chế tác.

### PHASE 2: THAY THẾ MASCOT ROBOT BẰNG COMPANION CẢM XÚC (INSPIRATION TỪ 20-10.HTML)
- **2.1. Dọn sạch cấu trúc cánh tay robot cơ học**:
  - Gỡ bỏ hoàn toàn `#mascot-arm-water`, `#mascot-arm-fertilize`, `.hydro-blaster-prop`, `.star-wand-prop`, `.mascot-water-jet`, `.mascot-star-burst` trong `index.html`, `mascot-companion.js` và `components.css`.
- **2.2. Xây dựng tương tác sống động**:
  - **Ánh mắt dõi theo (Pupil/Gaze Tracking)**: Tròng mắt di chuyển tự nhiên theo hướng chuột hoặc điểm chạm của người dùng với giới hạn góc nhìn mềm mại.
  - **Phản ứng vuốt ve (Petting Micro-Interaction)**: Khi người dùng nhấp hoặc xoa nhẹ chú bé, kích hoạt biểu cảm tít mắt cười `(>‿<)`, ửng hồng má sen `////`, kèm âm thanh tiếng rù rỉ/tiếng chuông trong trẻo và lời thì thầm chúc 20/10 dễ thương.
  - **Cử chỉ ma thuật thay thế tưới nước & bón phân**:
    * Tưới nước: Chú bé vẫy tay nhẹ gọi một đám mây nhỏ phát sáng buông những giọt mưa sương long lanh xuống mầm cây.
    * Sưởi nắng: Chú bé chụm tay thắp sáng vầng hào quang ấm áp như đốm lửa đom đóm gửi đến gốc cây.

### PHASE 3: DI DỜI DÂY ĐÀN HẠC (BOTANICAL HARP) VỀ GÓC MÀN HÌNH
- **3.1. Thiết kế lại vị trí & khung đàn hạc mộc**:
  - Chuyển `plant-harp-strings-wrap` khỏi tọa độ trung tâm (540px, 480px).
  - Đặt đàn hạc tại góc dưới bên phải màn hình (hoặc góc thanh thoát cạnh đồng cỏ), tạo hình như một nhánh cây phong lan/dây leo uốn thành khung đàn hạc cổ điển.
- **3.2. Trải nghiệm âm nhạc & cử chỉ trượt mượt mà**:
  - Giữ nguyên cơ chế vuốt glissando và phát nốt C5-A5 trong trẻo.
  - Tích hợp nút thu gọn/mở rộng nhẹ nhàng hoặc tự động ẩn mờ khi không tương tác để trả lại không gian ngắm trọn cây hoa và Áo Dài.
  - Tinh chỉnh riêng cho Mobile/Tablet: Bố trí dải dây đàn dạng vertical/arc strip góc dưới thuận tay cái lướt nhẹ, bảo đảm vùng chạm tối thiểu 44px (chuẩn WCAG).

### PHASE 4: TỐI TÂN HÓA LA BÀN THIÊN VĂN (CELESTIAL ORRERY) MƯỢT 100% & THÊM TÍNH NĂNG KỲ DIỆU
- **4.1. Khắc phục triệt để giật lag (Zero-Stutter Performance)**:
  - Loại bỏ hoàn toàn việc gọi `getBoundingClientRect()` trong vòng lặp `pointermove`. Cache tâm xoay khi `pointerdown` hoặc `resize`.
  - Áp dụng `requestAnimationFrame` và nội suy chuyển động (lerp damping) giúp kim xoay êm ru ở tần số quét 60fps/120fps.
  - Tách rời việc vẽ kim la bàn khỏi logic kích hoạt hiệu ứng thời tiết nặng nề (chỉ kích hoạt hiệu ứng sau khi kim dừng lại ở mùa mới hoặc lướt dứt khoát, chống nghẽn DOM).
  - Thêm vật lý trớn (flywheel inertia): Khi người dùng vuốt nhanh và thả tay, la bàn tiếp tục quay chậm dần rồi hít nhẹ vào góc phân vị mùa một cách tự nhiên.
- **4.2. Bổ sung các tính năng hữu ích & lôi cuốn**:
  - **Kinh độ kỳ diệu (Celestial Wayfinding)**: Bổ sung 4 phương vị thiên văn bí mật. Khi xoay kim trùng với phương vị, tâm la bàn rung nhẹ và nở ra chòm sao may mắn cùng thông điệp cổ thi.
  - **Hòa Điệu Thiên Hà (Center Astrolabe Jewel)**: Nhấp vào viên ngọc trung tâm sẽ kích hoạt chuỗi hợp âm 4 mùa đồng tấu, phát tán hào quang cực quang bao phủ khu vườn.

### PHASE 5: KIỂM THỬ ĐA THIẾT BỊ, THẨM MỸ & ĐỒNG BỘ GIT HOÀN HẢO
- Chạy kiểm tra cú pháp toàn diện: `node -c js/*.js`.
- Kiểm tra tính cân bằng thẻ đóng mở và dấu ngoặc CSS.
- Kiểm thử responsive trên các viewport: Mobile Portrait (375x667, 390x844), Tablet (768x1024), PC/Desktop (1920x1080).
- Đảm bảo website 100% web tĩnh, chạy offline mượt mà không có bất kỳ lỗi console nào.
- Tuân thủ Concurrent Git Protocol: kiểm tra remote, dung hòa commit và đẩy lên topic branch an toàn.
