# TODO: KHẮC PHỤC TOÀN DIỆN LỖI GIAO DIỆN MOBILE & TABLET (IPHONE 14 SAFARI AUDIT)

> **Mục tiêu**: Thực thi lộ trình 8 giai đoạn trong `tasks/plan.md`, xử lý triệt để 100% các lỗi phát hiện qua 9 ảnh chụp iPhone 14 Safari, bảo toàn nguyên vẹn 100% giao diện PC (Zero PC Regression).

---

### Phase 1: Kiến Trúc Xoay Màn Hình Linh Hoạt & Chống Lộ Bí Mật (Dual-Orientation & Anti-Spoiler)
- [x] 1.1: Xóa bỏ hoàn toàn văn bản và huy hiệu có chữ "20/10" trong `#rotate-device-overlay` tại `index.html` (thay bằng "✦ NÉT ĐẸP KHU VƯỜN ✦" và lời mời xoay màn hình thi vị, không spoil bí mật).
- [x] 1.2: Thiết kế lại mỹ thuật màn hình nhắc xoay trong `css/components.css`: chuyển từ nền đen tuyền `#0d090d` sang nền lụa giấy Dó ngà `rgba(250, 247, 240, 0.96)`, viền vàng đồng `#D4AF37`, cánh sen chao liệng và icon điện thoại xoay chuyển mượt mà.
- [x] 1.3: Nâng cấp `js/orientation-guard.js` hỗ trợ cơ chế định hướng 2 chiều linh hoạt:
  - `require-landscape`: Áp dụng cho Vườn hoa chính (Stage 1-4) & Minigames.
  - `require-portrait`: Khuyến khích khi ở Bàn chế tác dập sáp Stage 0, Trắc nghiệm hoa 3D, Thiệp bưu hoa di sản 9:16.
- [x] 1.4: Bổ sung nút bấm thi vị "Tiếp tục ở góc nhìn này" (Bypass) để người dùng khóa xoay màn hình vẫn có thể tiếp tục trải nghiệm mà không bị chặn cứng.
- [x] 1.5 (Bổ sung): Triệt tiêu độ trễ âm thanh 5s trên iPhone 14/Safari: Mở khóa âm thanh từ cú chạm đầu tiên, rút ngắn fade từ 5000ms xuống 1500ms xuất phát ở mức nghe rõ 0.12, kích hoạt BGM tức thì ngay thời khắc dập con dấu son.

---

### Phase 2: Tối Ưu Bàn Chế Tác Con Dấu Sáp Stage 0 (Portrait Artisan Workbench & Landscape Fallback)
- [x] 2.1: Thiết lập chế độ hiển thị ưu tiên xoay dọc cho Stage 0 (`#atelier-stationery-desk` và `#time-lock-modal`), tận dụng tối đa chiều cao 844px để bố trí thoáng đãng: Khuôn chữ dập tên $\rightarrow$ Khay 5 loại hạt sáp $\rightarrow$ Bếp nến sưởi ấm & muỗng đồng $\rightarrow$ Phong thư dập triện son.
- [x] 2.2: Tối ưu phương án dự phòng khi xem ở chế độ xoay ngang (Landscape Fallback): Sử dụng đơn vị `dvh`, thu gọn thanh tiêu đề còn 36px, bố cục 2 cột cân xứng (48% - 48%) có thanh cuộn riêng biệt, chống tràn ra ngoài thanh công cụ Safari.
- [x] 2.3: Đảm bảo toàn bộ thao tác chạm quẹt diêm, khuấy sáp cẩm thạch và dập ấn đồng đạt diện tích chạm $\ge 48\text{px} \times 48\text{px}$, không bị bàn phím ảo đẩy vỡ layout.

---

### Phase 3: Giải Quyết Triệt Để Chồng Đè HUD & Hộp Tiến Độ (Spatial Harmony in Landscape)
- [x] 3.1: Tinh chỉnh `.realtime-guide-hud` trên mobile landscape: thu gọn thành biểu tượng ngọc chỉ dẫn nhỏ gọn ($40\text{px} \times 40\text{px}$) neo sát mép trái safe area (`left: max(14px, calc(10px + var(--sal, 0px)))`), chạm vào bung bong bóng thoại 4s rồi tự ẩn.
- [x] 3.2: Tái định vị hộp tiến độ làm vườn (`#garden-ui`): giới hạn chiều rộng $\le 300\text{px}$, căn giữa an toàn, triệt tiêu hoàn toàn sự giao thoa ~100px với Realtime Guide.
- [x] 3.3: Ẩn triệt để dòng chữ hướng dẫn phụ (`.instruction`) và gợi ý cử chỉ (`#terrarium-gesture-hint`) trong suốt thời gian diễn ra Stage 2 và Stage 3 để giải phóng không gian bầu trời.

---

### Phase 4: Tái Thiết Kế Minigame Stage 2 & Cơ Chế Skip Cứu Nguy (Simon Melody & Skip Fallback)
- [x] 4.1: Tái định vị 4 nốt chuông hoa Simon Melody trên mobile landscape vào 2 vùng chạm ngón cái tiện lợi (Trái: Nốt 1 & 2; Phải: Nốt 3 & 4), đường kính nốt $\ge 64\text{px}$ (vùng chạm 72px) với hào quang rực rỡ.
- [x] 4.2: Tinh chỉnh câu thoại trong `garden-stages.js` và `garden-minigames.js`: đổi từ "gảy lại giai điệu mộc cầm" thành "Chạm lại các chuông hoa ngân vang theo giai điệu nhé! 🌸🎵" để người chơi không nhầm lẫn với đàn Harp li ti dưới cỏ.
- [x] 4.3: Xây dựng cơ chế bỏ qua cứu nguy (Graceful Skip Fallback): Thêm bộ đếm `stage2FailCount` và thời gian; nếu thử sai quá 5 lần hoặc quá 40 giây, tự động hiển thị nút bấm thi vị `[Gió Thoảng Hoa Nở · Bỏ Qua Thử Thách 🍃✨]`.
- [x] 4.4: Xử lý sự kiện click nút skip: phát âm thanh chuông gió, tự động hoàn thành Stage 2 và kích hoạt mầm cây vươn cành mượt mà.

---

### Phase 5: Cân Chỉnh Minigame Stage 3 & Bán Kính Chạm An Toàn (Constellation Linker & Skip Fallback)
- [x] 5.1: Giới hạn thuật toán phân bổ tọa độ 5 ngôi sao thật và 2 ngôi sao phụ trong vùng an toàn tuyệt đối của canvas ngang, tránh xa thanh tiến độ trên đỉnh và dock điều khiển 2 bên.
- [x] 5.2: Tăng bán kính nhận diện chạm nối sao (`proximityRadius`) lên $\ge 48\text{px}$ trên màn hình cảm ứng Safari iOS.
- [x] 5.3: Tích hợp nút bỏ qua cứu nguy cho Stage 3: nếu nối sai quá 5 lần hoặc quá 40 giây, hiển thị nút `[Sao Sáng Dẫn Lối · Đi Tiếp ✦✨]`, tự động nối hoàn chỉnh chòm sao và kích hoạt cây trổ hoa (Stage 4).

---

### Phase 6: Đại Tu Modal Cẩm Nang Trải Nghiệm & Cuộn Mượt Mobile (Experience Guide Scroll Overhaul)
- [x] 6.1: Tái cấu trúc `.guide-dialog` trên mobile landscape: áp dụng `height: min(92dvh, 520px)`, bố cục Flexbox dọc hoàn chỉnh.
- [x] 6.2: Thu nhỏ header `.guide-header` (padding `8px 16px`, tiêu đề 1 dòng, ẩn cành cây phụ trang trí); định vị nút đóng 'X' trong vùng safe area không bị thanh Safari che khuất.
- [x] 6.3: Thiết lập `.guide-content` thành khung cuộn độc lập (`overflow-y: auto`, `-webkit-overflow-scrolling: touch`), cỡ chữ $13.5\text{px} - 14.5\text{px}$, đảm bảo toàn bộ nội dung cả 3 tab cuộn mượt mà từ đầu đến cuối.
- [x] 6.4: Cố định footer `.guide-footer` ở đáy trong dòng chảy flexbox (`flex-shrink: 0`), nút "Khám Phá Khu Vườn Ngay" nằm gọn gàng dưới chân, không bay lơ lửng đè lên nội dung.

---

### Phase 7: Hoàn Thiện Thiệp Bưu Hoa 9:16 & Trắc Nghiệm Tính Cách (Story Card & Quiz Portrait)
- [x] 7.1: Tối ưu modal bưu thiếp (`#boarding-pass-modal`): gợi ý xoay dọc để tấm thiệp bưu hoa di sản $1080 \times 1920$ hiển thị tràn viền tráng lệ như một Story di động; các nút tải ảnh và đổi hoa neo cố định dưới đáy.
- [x] 7.2: Tinh chỉnh bộ câu hỏi trắc nghiệm hoa 3D (`#secret-letter-modal`): vùng chạm phương án $\ge 48\text{px}$, phông chữ thơ $14\text{px} - 16\text{px}$ rõ nét, cuộn mượt mà không bị giật lag.

---

### Phase 8: Kiểm Thử Đa Trình Duyệt Mobile, Syntax Audit & Git Harmony
- [x] 8.1: Kiểm tra cú pháp JavaScript: chạy `node -c js/*.js` trên toàn bộ 19 module độc lập, đảm bảo zero syntax error.
- [x] 8.2: Kiểm tra cân bằng CSS: đếm dấu ngoặc nhọn `{}` trên 3 file `base.css`, `layout.css`, `components.css` đảm bảo cân bằng tuyệt đối.
- [x] 8.3: Kiểm tra đối chứng màn hình PC ($1920 \times 1080$): Đảm bảo 100% không có bất kỳ sự thay đổi hay lỗi hồi quy nào trên desktop (Zero PC Regression).
- [x] 8.4: Kiểm tra và đồng bộ Git: Chạy `git fetch origin`, kiểm tra commit mới từ đồng đội, merge hoặc rebase sạch sẽ, commit và chuẩn bị trạng thái ổn định nhất.
