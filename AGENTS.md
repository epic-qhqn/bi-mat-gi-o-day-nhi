# AGENTS.md - QUY TẮC DỰ ÁN & BẢN ĐỒ KIẾN TRÚC TOÀN DIỆN

> **Dự án**: Điều Bí Mật Epic - Trải nghiệm Hoa Di sản Thơ ca Việt.
> **Kiến trúc**: 100% Client-Side Static Web (Offline-ready, GitHub Pages).
> **Bắt buộc**: Mọi agent phải đọc file này trước khi code để tiết kiệm token.

---

## 1. QUY TẮC ĐIỀU PHỐI TEAM (3 DEVS) & ĐỒNG BỘ GIT TỰ ĐỘNG
- **Pre-Task (Trước khi làm)**: Chạy `git fetch --all --prune` rà soát toàn bộ nhánh.
  Nếu có commit mới từ đồng đội, merge/rebase sạch và giải quyết 100% conflict trước khi code.
- **Tách nhánh an toàn**: Khi làm tính năng mới hoặc tránh đè code, tạo nhánh `feat/<ten>` mới.
- **Post-Task (Sau khi làm)**: Chạy lại `git fetch origin` bắt kịp commit mới từ các dev khác.
  Dung hòa tuyệt đối, đảm bảo không syntax error, commit và push trạng thái ổn định.
- **Âm thầm & Tiết kiệm Token**: Thực hiện toàn bộ quy trình Git trong im lặng.
  Phản hồi cực ngắn gọn, không giải thích dài dòng các lệnh git đã chạy.

---

## 2. NGUYÊN TẮC BẤT BIẾN CỦA KIẾN TRÚC (ARCHITECTURAL INVARIANTS)
1. **Thuần Static Web**: Chỉ dùng HTML5, Vanilla CSS3, Modern ES6+ JS, Web Audio API, Canvas 2D.
2. **Không runtime ngoài**: Không Node.js/npm runtime, không bundler (Vite/Webpack), không React/Vue.
   Không gọi API mạng (`fetch`/`XHR`). Chạy trực tiếp trên trình duyệt & GitHub Pages.
3. **Thư mục gốc sạch**: Chỉ chứa asset chính (`index.html`, `css/`, `js/`, `img/`, `audio/`, `tasks/`).
   Tuyệt đối không đẩy file rác/tạm vào repo. Asset tham khảo (`20-10.html`) phải luôn gitignored.

---

## 3. BẢN ĐỒ TÀI NGUYÊN & TRÁCH NHIỆM FILE (FILE DIRECTORY MAP)

### A. Markup Layer
- `index.html`: Khung DOM ngữ nghĩa, thứ tự nạp CSS/JS và cấu trúc tầng tương tác.

### B. Styling Layer (`css/` - 3 file độc lập)
- `css/base.css`: Design tokens Di sản Việt, reset CSS, typography chuẩn, shared utility.
- `css/layout.css`: Khung bố cục không gian, bầu trời 4 thì, canvas `#wrap`, Áo Dài, responsive.
- `css/components.css`: Widget tương tác (Xi sáp, Orrery, Minigame, Bưu thiếp, Thư bí mật, Mascot, Guide).

### C. Logic Layer (`js/` - 17 module độc lập)
- `js/content.js`: Dữ liệu tĩnh: 8 thư bí mật (`secretLettersDeck`), 12 hồ sơ tính cách hoa di sản.
- `js/audio-vfx.js`: Bộ tổng hợp Web Audio API (chuông gió, lách cách, sáp rơi), BGM ducking, sound trigger.
- `js/environment.js`: Chu kỳ 4 thì (Bình minh, Ngày, Hoàng hôn, Đêm), hạt thiên thể, lá rơi 3D, WeatherFX.
- `js/wax-seal-ceremony.js`: Cổng thời gian, nung sáp cẩm thạch, đóng dấu đồng, thức tỉnh khu vườn (Stage 0).
- `js/atmosphere-shifter.js`: HUD Thời tiết sống động (giọt sương mưa, vệt nắng mai, chạm tiểu cảnh).
- `js/botanical-harp.js`: Đàn mộc cầm thực vật 5 dây, vuốt glissando, nốt phát sáng bay bổng.
- `js/celestial-orrery.js`: La bàn thiên thể 360° theo mùa & nút sao Bắc Đẩu thu gọn.
- `js/garden-minigames.js`: Minigame Simon Melody (Điệu nhạc tình yêu) & Nối chòm sao thiên văn với sao mồi.
- `js/garden-stages.js`: Vòng đời cây sinh trưởng (Stage 0-4), quản lý dọn dẹp chuyển cảnh (`cleanupStage`).
- `js/mascot-companion.js`: Linh vật rối cắt giấy, thoại dân gian dí dỏm, chớp mắt, biểu cảm cử động.
- `js/secret-letter.js`: Máy gõ chữ, thẻ ảnh Polaroid 3D, nút đổi kiểu chữ tay/dễ đọc, trắc nghiệm hoa 3D.
- `js/boarding-pass-modal.js`: Bưu thiếp Di sản dạng modal (tính cách hoa, tem ảnh kỷ niệm, dấu xi).
- `js/boarding-pass-canvas.js`: Trình xuất ảnh Canvas 2D 1080x1920 (Retina) tải bưu thiếp Story.
- `js/love.js`: Canvas vẽ cây trái tim nở rộ theo giải thuật tham số (không gian tọa độ ảo 1100x680).
- `js/experience-guide.js`: Hướng dẫn onboarding trải nghiệm hành trình qua các bước tương tác.
- `js/realtime-guide.js`: HUD hướng dẫn thời gian thực, spotlight động, theo dõi nhiệm vụ từng bước.
- `js/main.js`: Bộ điều phối trung tâm, thuật toán tự co giãn (`resizeWrap`), pipeline vòng đời stage.

---

## 4. VÒNG ĐỜI GIAI ĐOẠN & ĐIỀU PHỐI DỮ LIỆU
1. **Pipeline 5 Giai đoạn**:
   - `Stage 0 (Awakening)`: Nhập tên, nung và đóng dấu sáp trong `wax-seal-ceremony.js` để mở vườn.
   - `Stage 1 (Sprout & Clover)`: Mầm non nhú cùng cỏ 4 lá trong `garden-stages.js`; tưới nước, sưởi nắng.
   - `Stage 2 (Simon Melody)`: `garden-minigames.js` kích hoạt trí nhớ giai điệu qua cung an toàn.
   - `Stage 3 (Constellation Linker)`: Nối 5 sao thật và 2 sao mồi qua thuật toán Poisson-disk.
   - `Stage 4 (Full Blossom & Áo Dài)`: Cây tim nở rộ (`love.js`), Áo Dài xuất hiện, mở bưu thiếp & thư.
2. **Quản lý State Toàn cục**:
   - Đồng bộ qua `window.gardenState` (`currentStage`, `isWatered`, `isFertilized`, `userName`, ...).
   - Giao tiếp giữa các module qua window API (`window.showMascotSpeech`, `window.cleanupStage`).
3. **Clean Unmount**: Khi chuyển cảnh, `cleanupStage` phải hủy mọi listener, animation, DOM tạm.

---

## 5. HỆ THỐNG THIẾT KẾ & TIÊU CHUẨN RESPONSIVE
1. **Design System Di sản Thơ ca Việt**:
   - Bảng màu: Giấy Dó (`#FAF7F0`), Hồng Sen (`#D47A88`), Cốm Non (`#6A8D73`), Gỗ Mộc (`#4A3728`).
   - Hình khối: Bo góc nếp gấp giấy (10px-14px), đổ bóng mờ sương. Không dùng bo tròn 999px hay neon.
   - Typography: Giao diện dùng `Outfit`, câu thơ bay bổng dùng `Playfair Display` hoặc `Dancing Script`.
2. **Chuẩn Responsive Đa thiết bị**:
   - Không cuộn ngang (`scrollWidth <= clientWidth`) trên mọi màn hình (320px đến 4K).
   - Tự co giãn (`resizeWrap`): Desktop ưu tiên chiều cao; Mobile Portrait ưu tiên chiều rộng.
   - Vùng cảm ứng tối thiểu 44px theo chuẩn WCAG và Apple HIG.

---

## 6. TIÊU CHUẨN KIỂM ĐỊNH CHẤT LƯỢNG (QUALITY GATES)
1. **Kiểm tra JavaScript**: Mọi file JS sửa đổi bắt buộc phải pass: `node -c js/<file.js>`.
2. **Kiểm tra CSS**: Các file CSS phải tuyệt đối cân bằng số lượng dấu ngoặc `{` và `}`.
3. **Tính toàn vẹn**: Không bao giờ để lại conflict markers, syntax errors hay vỡ layout.
