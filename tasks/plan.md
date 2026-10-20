# MASTER PLAN V3.0: THƠ MỘNG LÀNG QUÊ & NÉT DUYÊN CON GÁI VIỆT (VIETNAMESE POETIC HERITAGE)

> **Mục tiêu**: Chuyển đổi toàn diện phong cách từ "hiện đại bóng bẩy, tròn tròn kỳ cục" sang chất thơ mộng đồng quê thanh bình và nét duyên dáng, tinh tế của người con gái Việt Nam. Dung hợp hài hòa các yếu tố tinh hoa từ [20-10.html](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/20-10.html) vào website hiện tại.  
> **Nguyên tắc bất biến**:
> 1. **100% Full-Static Web**: Không Node runtime khi chạy, không bundler, không API ngoài, hoạt động ngoại tuyến và GitHub Pages.
> 2. **Git Workflow Đa Lập Trình Viên**: Luôn kiểm tra fetch commit mới từ remote `https://github.com/epic-qhqn/bi-mat-gi-o-day-nhi.git`, phân nhánh độc lập, dung hòa tuyệt đối không xung đột mã nguồn.
> 3. **Thanh nhã & Tự nhiên**: Triệt tiêu bo góc kiểu viên thuốc (999px) bóng bẩy và đổ bóng neon công nghệ; thay bằng chất liệu giấy Dó vân mây, lụa sen, nét vẽ mực mộc và bóng sương mai.

---

## 1. NGUYÊN TẮC QUY HOẠCH & DUNG HỢP TÀI NGUYÊN TỪ 20-10.HTML

### 1.1. Bức Họa Thiếu Nữ Áo Dài - Nón Lá & Hoa Sen (`ao-dai-viet.png`)
- Trích xuất bức vẽ line-art màu trắng tinh tế của hai thiếu nữ Việt Nam mặc áo dài thướt tha, nón lá nghiêng che và ôm đóa hoa sen.
- Xuất hiện trang nhã ở **Giai đoạn Cây hoa nở rộ (Stage 4)** và trở thành biểu tượng nghệ thuật trung tâm trên **Bưu Thiếp Hương Đồng Cỏ Nội**.

### 1.2. Dải Hoa Cỏ Đồng Nội Đung Đưa Dưới Chân Trang (`#co-hoa`)
- Dải cỏ lau và hoa dại SVG uốn lượn mềm mại dưới chân gốc cây tình yêu.
- Chuyển động đung đưa nhịp nhàng theo làn gió quê hương (`@keyframes gio`, `@keyframes veNet`), biến không gian thành một khu vườn quê yên ả.

### 1.3. Cơn Mưa Lá Thu & Cánh Hoa Rơi Chao Nghiêng 3D (`laCanvas` / `natureCanvas`)
- Cải tiến hệ thống hạt thời tiết: những cánh hoa sen, cánh hoa đào và lá vàng rơi nhẹ nhàng, xoay nghiêng 3D theo luồng gió tự nhiên, tạo không khí lãng đãng mùa thu.

### 1.4. Nhánh Cỏ Bốn Lá May Mắn (`clover-sample-garden`)
- Ngọn cỏ bốn lá phát sáng ngọc bích rung rinh xuất hiện ở giai đoạn hạt mầm thức tỉnh (Stage 1) và là quà tặng may mắn kèm bức thư bí mật.

### 1.5. Tinh Chỉnh Linh Vật Đồng Dao Thân Thương
- Thay đổi phong cách Robot súng nước cơ khí sang hình tượng chú mèo nhỏ đồng dao / bạn nhỏ hiền hòa có đôi mắt to tròn biết chớp (`nham`), má hồng e ấp (`////`), nụ cười mèo tít mắt (`ω`) và lời thoại mộc mạc ấm áp.

### 1.6. Chuyển Hóa Tấm Vé Hàng Không Thành "Bưu Thiếp Hương Đồng Cỏ Nội"
- Bỏ hoàn toàn concept vé máy bay công nghệ (barcode, số hiệu chuyến bay, Life4Cuts).
- Thay bằng tấm thiệp giấy Dó vân mây, con tem hoa sen truyền thống, dấu triện son cẩm thạch mang tên người nhận và ảnh kỷ niệm.

---

## 2. BẢNG MÀU THƠ MỘNG ĐỒNG NỘI (VIETNAMESE POETIC PALETTE)

* **Trắng Ngà Giấy Dó / Lụa Tơ Tằm (`#FAF7F0`, `#F4EFEA`)**: Màu nền chính mềm dịu, không chói gắt.
* **Hồng Cánh Sen / Má Phấn (`#D47A88`, `#F2C4CE`)**: Điểm nhấn nữ tính, đằm thắm của người con gái Việt.
* **Xanh Ngọc Cốm Non / Lá Mạ (`#6A8D73`, `#8EA885`)**: Sắc màu đồng lúa, đầm sen, lũy tre làng.
* **Nâu Gỗ Mộc Trầm (`#4A3728`, `#5C4433`)**: Màu chữ và viền thanh nhã thay cho màu Navy thép lạnh.
* **Vàng Hoàng Yến / Nắng Thu Dịu (`#DEB853`, `#E6C66E`)**: Sắc nắng thu ấm áp bên hiên nhà.

---

## 3. LỘ TRÌNH TRIỂN KHAI 5 MASTER PHASES

### 🌾 PHASE 1: Tách Chiết, Tối Ưu & Tích Hợp Tài Nguyên Hồn Việt (BẮT ĐẦU NGAY)
- **1.1**: Tách và tối ưu hóa hình vẽ Áo Dài - Nón Lá - Hoa Sen vào `img/ao-dai-viet.png` (Retina sắc nét, nền trong suốt).
- **1.2**: Tách hình ký họa thiếu nữ ôm tim vào `img/thieu-nu-tim.png` & chuẩn hóa vector ngọn cỏ 4 lá may mắn.
- **1.3**: Tích hợp dải hoa cỏ đồng nội SVG (`#co-hoa`) vào chân trang `#wrap` với chuyển động gió đưa êm dịu.
- **1.4**: Tích hợp cỗ máy lá vàng và cánh hoa rơi chao nghiêng 3D (`laCanvas`) vào hệ thống thời tiết tĩnh.
- **1.5**: Kiểm tra tương thích tĩnh 100%, không tăng tải CPU/GPU, responsive hoàn hảo trên cả mobile và desktop.

### 📜 PHASE 2: Đại Tu Ngôn Ngữ Thẩm Mỹ & Loại Bỏ Phong Cách Tròn Bóng
- **2.1**: Triệt tiêu bo góc viên thuốc `999px` và bóng đổ neon công nghệ trong `base.css` và `components.css`.
- **2.2**: Áp dụng hệ thống tokens Vietnamese Poetic Palette (Giấy Dó, Hồng Sen, Cốm Non, Gỗ Mộc).
- **2.3**: Đồng nhất Typography thanh nhã, viền giấy thủ công mềm mại.

### 💌 PHASE 3: Chuyển Hóa Tấm Vé Máy Bay Thành "Bưu Thiếp Hương Đồng Cỏ Nội"
- **3.1**: Tái thiết kế Modal vé thành Bưu Thiếp Lụa Sen 20/10 với con tem bưu hoa truyền thống.
- **3.2**: Nhúng họa tiết thiếu nữ áo dài nón lá và mộc triện son tên nàng thơ vào thiệp.
- **3.3**: Cập nhật động cơ Canvas 2D (`boarding-pass-canvas.js`) kết xuất ảnh Story 9:16 phong cách bưu thiếp cổ phong.

### 🌸 PHASE 4: Tái Sinh Linh Vật Đồng Dao & Điểm Xuyết Thiếu Nữ Áo Dài
- **4.1**: Cập nhật Mascot Companion với mắt chớp, má hồng e ấp, biểu cảm ngộ nghĩnh và lời thoại đậm chất Việt.
- **4.2**: Hiển thị bóng dáng thiếu nữ áo dài nón lá thanh thoát khi cây hoa nở trọn vẹn (Stage 4).
- **4.3**: Bổ sung nhánh cỏ 4 lá may mắn vào mầm hoa thức tỉnh và thư bí mật.

### 🛡️ PHASE 5: Tổng Duyệt Toàn Diện, Git Sync & Nghiệm Thu Bàn Giao
- **5.1**: Chạy kiểm tra cú pháp toàn bộ file JS (`node -c`).
- **5.2**: Kiểm tra hiển thị responsive không tràn ngang trên mọi kích thước màn hình.
- **5.3**: Đồng bộ Git sạch sẽ, đảm bảo an toàn tuyệt đối cho team 3 người.
