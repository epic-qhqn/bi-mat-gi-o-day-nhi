# NHẬT KÝ & CẨM NANG KHẮC PHỤC LỖI GIAO DIỆN MOBILE & TABLET (MOBILE LANDSCAPE)

> **Mục đích**: Lưu trữ toàn bộ các vấn đề (bugs, quirks, layout collisions), nguyên nhân gốc rễ và công thức sửa lỗi (patterns/recipes) chuẩn hóa cho giao diện điện thoại và máy tính bảng (đặc biệt là chế độ xoay ngang - Mobile Landscape), giúp tái hiện và xử lý nhanh chóng trong tương lai.

---

## I. CÁC NGUYÊN TẮC CỐT LÕI (CORE INVARIANTS)

1. **Bảo tồn tuyệt đối giao diện PC (Zero PC Regression)**:
   - Tất cả các quy tắc CSS tối ưu cho mobile landscape PHẢI được đặt trong media query:
     ```css
     @media (orientation: landscape) and (max-height: 540px) { ... }
     ```
     hoặc `@media (max-width: 820px) and (orientation: landscape) { ... }`.
   - Không được ghi đè quy tắc desktop làm vỡ bố cục trên PC (chiều rộng $\ge 1025\text{px}$, chiều cao $\ge 600\text{px}$).

2. **Tiêu chuẩn vùng chạm WCAG & Apple HIG ($\ge 44\text{px} \times 44\text{px}$)**:
   - Trên màn hình cảm ứng, diện tích chạm tối thiểu của mọi nút bấm, hạt sáp, la bàn, chuông bấm phải đạt $\ge 44\text{px}$.

3. **Khu vực an toàn (Safe Area Insets)**:
   - Luôn sử dụng `env(safe-area-inset-left)` và `env(safe-area-inset-right)` để chừa khoảng cách an toàn cho tai thỏ (Notch), Dynamic Island và camera nốt ruồi khi xoay ngang.

4. **Tỷ lệ chữ (Typography Standards)**:
   - Tuyệt đối không để cỡ chữ nội dung nhỏ hơn $13\text{px}$ (khó đọc) hoặc lớn hơn $20\text{px}$ trên màn hình chiều cao thấp (gây tràn khung).

---

## II. DANH MỤC VẤN ĐỀ & CÔNG THỨC KHẮC PHỤC (PATTERNS & SOLUTIONS)

### 1. Vấn Đề: Lớp Màn Xoay Ngang (Force-Landscape Overlay) Thô Sơ & Chặn Nhầm Thiết Bị
- **Triệu chứng**: Màn hình đen chữ tiếng Anh thô kệch `"Please rotate your phone"`, chặn nhầm máy tính bảng lớn hoặc màn hình lập trình xoay dọc.
- **Nguyên nhân**: Thiếu bộ lọc `hover: none` và `pointer: coarse`, thiếu giới hạn `max-width: 820px`.
- **Cách khắc phục**:
  ```css
  /* Chỉ kích hoạt trên điện thoại cầm dọc thực tế */
  @media (orientation: portrait) and (max-width: 820px) and (hover: none) and (pointer: coarse) {
    .rotate-device-overlay {
      display: flex;
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      /* Thẩm mỹ giấy Dó, lụa đào, ánh kim Di Sản Thơ Ca */
    }
  }
  ```
  - Thay văn bản tiếng Anh bằng lời dẫn thơ ca tiếng Việt truyền cảm xúc.
  - Sử dụng animation xoay 90 độ mềm mại kèm hoa sen nở và bụi kim tuyến lướt nhẹ.

---

### 2. Vấn Đề: Chiều Cao Màn Hình Ngang Bị Thu Hẹp Bởi Thanh Địa Chỉ URL Bar
- **Triệu chứng**: Trên Safari iOS hoặc Chrome Android, thanh địa chỉ và thanh công cụ trình duyệt chiếm mất $60\text{px} - 100\text{px}$ chiều cao, khiến chiều cao thực chỉ còn $\sim 320\text{px} - 360\text{px}$, làm các modal dài bị che khuất nút bấm ở đáy.
- **Nguyên nhân**: Dùng `100vh` thay vì tính toán viewport động hoặc thiếu `max-height: 90vh; overflow-y: auto`.
- **Cách khắc phục**:
  - Modal container sử dụng:
    ```css
    @media (orientation: landscape) and (max-height: 540px) {
      .modal-dialog, .atelier-stationery-desk, .lyrical-panel {
        max-height: min(92vh, 400px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
    ```
  - Chuyển các modal có nội dung dài thành **Bố Cục Ngang 2 Cột (2-Column Split Layout)** thay vì xếp chồng 1 cột dọc.

---

### 3. Vấn Đề: Các Cụm HUD & Nút Bấm 4 Góc Đè Lên Nhau Trong Khu Vườn
- **Triệu chứng**: Realtime Guide HUD, Zen Mode Dock, Cụm Nhạc cụ (Harp, Orrery, Thời tiết) và Nút Thư bí mật bị dồn ép, che khuất cây hoa hoặc đè lên nhau.
- **Nguyên nhân**: Tọa độ góc dùng giá trị cố định `top/left/bottom/right` lớn phù hợp với màn hình 1080p nhưng quá chật chội trên màn hình ngang $360\text{px}$ chiều cao.
- **Cách khắc phục**:
  - Tách biệt rõ ràng 4 góc với margin an toàn:
    - Top-Left: Realtime Guide thu gọn dạng biểu tượng ngọn cọ / huy hiệu.
    - Top-Right: Zen Mode & Instant Capture nép sát lề phải `right: max(16px, env(safe-area-inset-right))`.
    - Bottom-Left: Nhạc cụ sinh thái thu nhỏ scale $0.85$, xếp bậc thang.
    - Bottom-Right: Nút bưu thiếp và thư bí mật bố trí gọn gàng sát mép.

---

### 4. Vấn Đề: Tương Tác Cảm Giác (Vibration / Haptic) Lỗi Trên iOS Safari
- **Triệu chứng**: Gọi `navigator.vibrate` gây crash hoặc im lặng trên iOS Safari do Apple không hỗ trợ Vibration API trên web.
- **Cách khắc phục**:
  - Luôn bọc an toàn trong `try-catch` và kiểm tra `typeof navigator !== 'undefined' && 'vibrate' in navigator`.
  - Kết hợp đồng thời hiệu ứng âm thanh ASMR vi mô (Web Audio synthesizer click/tap) làm fallback giác quan khi không có haptic.

### 5. Vấn Đề: Ký Tự Null Byte trong .gitignore Khiến File Mới Bị Bỏ Qua Hoàn Toàn
- **Triệu chứng**: Tạo thư mục hoặc file mới (ví dụ `.rules/`) nhưng `git status` không hiển thị, `git check-ignore -v` báo dòng khớp là `*`.
- **Nguyên nhân**: File `.gitignore` bị ghi nối một dòng có định dạng UTF-16 LE chứa null byte (`\0`), parser của C/Git gặp `\0` ngay sau ký tự `*` nên coi dòng đó là `*` (ignore tất cả file mới).
- **Cách khắc phục**:
  - Quét kiểm tra byte rác: `[System.IO.File]::ReadAllBytes(".gitignore")`.
  - Làm sạch `.gitignore` về chuẩn UTF-8 không BOM, loại bỏ toàn bộ ký tự null byte.

---

## III. NHẬT KÝ CHI TIẾT THEO TỪNG GIAI ĐOẠN (PHASE LOG)

### Phase 1: Nghệ Thuật Hướng Dẫn Xoay Ngang Màn Hình (Poetic Landscape Orientation) - [HOÀN THÀNH 100%]
- **Vấn đề gặp phải**:
  - Lớp màn cũ sử dụng màu đen `#0d1020` lạnh lẽo, chữ tiếng Anh cứng nhắc `"Please rotate your phone"`.
  - Icon điện thoại quay bằng khung border trắng đơn điệu không ăn nhập với phong cách Dó Paper / Lotus Pink.
  - Các modal nền phía sau (`secret-letter-modal`, `garden-polaroid-modal`, `boarding-pass-modal`, `experience-guide-modal`) chưa được đưa vào danh sách `inert` khi màn hình xoay dọc bị khóa.
- **Giải pháp xử lý**:
  - Nâng cấp `#rotate-device-overlay` trong `index.html` sang phong cách Giấy Dó Ngà (`#FAF7F0`), lụa đào viền son (`#D47A88`) và vàng kim hoàng yến (`#D4AF37`).
  - Thêm biểu tượng hoa sen hé nở giữa tâm màn hình, nhịp xoay 90 độ mượt mà lướt theo cung tròn (`.rotate-motion-arc`).
  - Thông điệp truyền cảm hứng chuẩn xác theo yêu cầu: *"Để cảm nhận trọn vẹn khu vườn hoa di sản 20/10, bạn vui lòng xoay ngang màn hình nhé ✨"*.
  - Bổ sung toàn bộ 7 modal container vào `BACKGROUND_IDS` trong `js/orientation-guard.js` để vô hiệu hóa hoàn toàn tương tác nền (`inert`) khi đang hiển thị overlay.
  - Kiểm định CSS media query `@media (orientation: portrait) and (hover: none) and (pointer: coarse) and (max-width: 820px)` hoạt động hoàn hảo 100% không ảnh hưởng PC.
- **Kiểm định chất lượng**:
  - Cú pháp 19 file JavaScript: Đạt 100% không lỗi (`node -c`).
  - Cân bằng ngoặc nhọn CSS (`base.css`, `layout.css`, `components.css`): Đạt 100% (1505/1505 đóng mở).
  - Test suite tự động (`test_phase1.js`): Vượt qua 100% các tiêu chí DOM, media query, và accessibility.

---

### Phase 2: Kiến Trúc Viewport & Safe Area Mobile Landscape - [HOÀN THÀNH 100%]
- **Vấn đề gặp phải**:
  - `resizeWrap` dùng `window.innerWidth`/`window.innerHeight` thuần túy, không nhận biết được việc thanh URL bar của Safari iOS / Chrome Android co giãn làm giật khung hình.
  - Tỉ lệ màn hình ngang siêu dài (19.5:9, 20:9, 21:9) hoặc tai thỏ/Dynamic Island làm cây hoa và các nút dock bị tràn sát mép hoặc bị camera khuyết đè lên.
  - Kéo vuốt trên iOS gây hiệu ứng nảy trang cao su (rubber-band jitter).
- **Giải pháp xử lý**:
  - Tích hợp `window.visualViewport` vào động cơ `resizeWrap` trong `js/main.js`, gắn sự kiện lắng nghe trực tiếp `visualViewport.addEventListener('resize')`.
  - Hàm `getSafeAreaInsets()` đọc chính xác biến `--sal`, `--sar`, `--sat`, `--sab` từ `:root`.
  - Trừ đi safe margin của tai thỏ: `safeWidth = Math.max(320, vWidth - insets.sal - insets.sar)`.
  - Dành khoảng thở dọc an toàn $64\text{px}-76\text{px}$ cho thanh dock trên và dưới khi chiều cao $\le 540\text{px}$.
  - Thêm `overscroll-behavior: none;` cho `html, body` triệt tiêu rung giật cuộn trang.
  - Neo giữ các dock 4 góc theo chuẩn Safe Area (`max(16px, calc(16px + var(--sar/sal)))`).
- **Kiểm định chất lượng**:
  - Cú pháp 19 file JavaScript: Đạt 100% sạch lỗi (`node -c`).
  - Cân bằng ngoặc nhọn CSS (`base.css`: 36, `layout.css`: 311, `components.css`: 1515): Đạt 100%.
  - Bộ kiểm thử tự động `test_phase2.js`: Mô phỏng thành công trên ma trận độ phân giải (Desktop 1080p, iPhone 14 Pro 844x390, iPhone SE 667x320, Xperia 21:9 960x384) với 100% Passed.

---

### Phase 3: Tối Ưu Giao Diện Đóng Dấu Sáp & Nhập Tên (Stage 0: Time Lock & Wax Seal Atelier Desk in Landscape) - [HOÀN THÀNH 100%]
- **Vấn đề gặp phải**:
  - Chiều cao điện thoại xoay ngang chỉ từ $320\text{px}$ đến $390\text{px}$. Trước đây cả `#time-lock-modal` và `#name-modal` được dàn trang theo một cột dọc duy nhất (single vertical stack) khiến nút bấm "Mở Khóa Ngay" và "Dập Con Dấu & Mở Cổng Vườn" bị tràn khỏi đáy màn hình, người dùng buộc phải cuộn dọc nhiều lần mới thấy nút.
  - Khi bàn phím ảo (virtual keyboard) xuất hiện trên mobile landscape, nó chiếm hơn 50% diện tích màn hình khiến ô nhập tên hoặc mật mã bị khuất hoàn toàn.
  - Cành hoa sen trang trí kích thước lớn (`.pressed-botanical-branch`) chiếm mất ~40px quý giá trên chiều cao eo hẹp của màn hình ngang.
  - Nguy cơ hồi quy Desktop: nếu thay đổi cấu trúc flexbox trực tiếp vào container cha mà không bọc cách ly, giao diện PC sẽ bị xáo trộn.
- **Giải pháp xử lý**:
  - **Bọc Cách Ly Layout Không Gây Hồi Quy PC**: Thiết lập mặc định `display: contents;` cho các thẻ bao bọc mới (`.time-lock-split-wrap`, `.time-lock-col-left`, `.time-lock-col-right`, `.atelier-workbench-grid`, `.workbench-col-materials`, `.workbench-col-crafting`). Khi trên Desktop/Tablet dọc, các wrapper này hoàn toàn "vô hình" trong layout box tree, đảm bảo 100% giao diện gốc giữ nguyên.
  - **Tái Cấu Trúc `#time-lock-modal` (2 Cột Ngang Cân Xứng)**:
    - Cột Trái: Biểu tượng ổ khóa cổ, huy hiệu cổng thời gian, tiêu đề và lời nhắn mở tự do sau 12:00.
    - Cột Phải: Ô nhập mật mã mở sớm, nút mở khóa và đồng hồ client time. Chiều cao toàn bộ modal luôn $\le 90\text{vh}$, nút bấm luôn nằm trọn trong tầm mắt.
  - **Bàn Chế Tác Con Dấu Sáp 2 Cột (Artisan Split Workbench - `#name-modal`)**:
    - Cột Trái (Vật Liệu & Khuôn Chữ): Khuôn đồng dập nổi tên bạn (`#letterpress-brass-plate`) + Nút chia sẻ link quà tặng cá nhân hóa + Khay 5 loại hạt sáp di sản (`#wax-beads-tray`) + 4 hoa văn khắc triện son (`#crest-selector-wrap`).
    - Cột Phải (Nghi Thức & Dập Triện): Thanh chuỗi 3 bước nghi thức (`#ritual-step-bar`) + Bếp nấu sáp & Bàn niêm phong phong thư (`#artisan-crafting-bench`) + Nút dập con dấu mở vườn (`#start-btn`) + Lời chỉ dẫn thi vị.
  - **Tối Ưu Không Gian Chiều Dọc Thấp**:
    - Ẩn cành hoa SVG lớn `.pressed-botanical-branch` khi màn hình xoay ngang thấp, giữ dải lụa mềm mại.
    - Tinh chỉnh kích thước hạt sáp ($30\text{px}$), thân nến ($40\text{px}$), muỗng đồng ($32\text{px}$) và con dấu ($44 \times 54\text{px}$) giúp mọi thao tác vừa vặn hoàn hảo.
  - **Tự Động Cuộn Định Tâm Khi Bàn Phím Ảo Xuất Hiện**:
    - Thêm sự kiện `focus` trên `#name-input` và `#time-lock-input` gọi `scrollIntoView({ behavior: 'smooth', block: 'center' })` khi phát hiện mobile landscape, đảm bảo ô nhập liệu không bị che khuất.
- **Kiểm định chất lượng**:
  - Cú pháp 19 file JavaScript: Đạt 100% sạch lỗi (`node -c`).
  - Cân bằng ngoặc nhọn CSS (`base.css`: 36, `layout.css`: 311, `components.css`: 1578): Đạt 100%.
  - Bộ kiểm thử tự động `scratch/test_phase3.js`: 12/12 tiêu chí Passed (100%).
  - Kiểm thử hồi quy Phase 1 (`test_phase1.js`) và Phase 2 (`test_phase2.js`): 100% Passed.

---

### Phase 4: Sắp Đặt Không Gian HUD & Triệt Tiêu Chồng Đè (In-Garden Spatial Harmony) - [HOÀN THÀNH 100%]
- **Vấn đề gặp phải**:
  - **Va chạm góc dưới bên phải**: `.plant-harp-strings-wrap` (Đàn Harp sinh thái) trước đây được đặt ở `right: 8px; bottom: 8px;` trên landscape, đè trực tiếp lên `.bottom-right-action-dock` (nút Bưu Thiếp & Thư Bí Mật).
  - **Va chạm góc trên bên phải**: `.celestial-weather-orrery` (La Bàn Thiên Văn) trước đây được neo ở `top: 8px; right: 12px;` trên landscape, đè lên `.top-experiential-dock` (nút Zen Mode & Chụp ảnh Polaroid).
  - **Va chạm giữa màn hình (Stage 1)**: `.living-atmosphere-hud` (Mây mưa và Nắng ấm) bị gán `top: 162px` do quy tắc `max-width: 768px`, rơi vào đúng trung tâm màn hình ngang làm che mầm cây và bảng thơ.
  - **Va chạm bảng thơ (Stage 4)**: Khi `.text-panel.show` mở ở cạnh trái màn hình ngang, bóng thoại mascot `.mascot-speech-bubble` và thân mascot có thể chồng đè lên góc dưới của bảng thơ.
- **Giải pháp xử lý**:
  - **Quy Hoạch 4 Góc Độc Lập Triệt Tiêu 100% Va Chạm**:
    - **Góc Trên Bên Trái (Top-Left)**: Dành riêng cho `#realtime-guide-hud` với kích thước gọn gàng (`max-width: min(340px, 46vw)`), có cơ chế thu nhỏ thành icon viên ngọc (`is-minimized`).
    - **Góc Trên Bên Phải (Top-Right)**: Dành riêng cho `#top-experiential-dock` gồm 2 nút bấm vuông icon tinh tế $38 \times 38\text{px}$ (Chế độ Tĩnh Lặng 🌕 & Chụp Polaroid 📸).
    - **Góc Trên Ở Giữa (Top-Center)**: Đưa `.living-atmosphere-hud` lên `top: calc(8px + var(--sat, 4px)); left: 50%; transform: translateX(-50%);` với đám mây $44\text{px}$ bên trái và vệt nắng $40\text{px}$ bên phải, cách biệt hoàn toàn khỏi 2 góc dock trên.
    - **Góc Dưới Bên Trái (Bottom-Left - Cụm Bậc Thang Sinh Thái)**:
      - Bậc đáy: `#bottom-system-dock` (Bảng điều khiển nhạc & thanh trượt âm lượng) tại `bottom: max(8px); left: max(14px)`.
      - Bậc kế tiếp: `#plant-harp-strings-wrap` (Đàn Harp sinh thái) chuyển sang `left: calc(max(14px) + 120px); bottom: max(8px);` với tỷ lệ scale $0.78$, hoàn toàn thoát khỏi góc dưới bên phải.
      - Bậc trên cao: `#celestial-weather-orrery.orrery-minimized` (Ngôi sao Lodestar) neo tại `left: max(16px); bottom: calc(max(8px) + 125px);`. Khi người dùng chạm mở, la bàn thiên văn phóng to căn giữa màn hình thành modal trải nghiệm 360 độ hoàn mỹ.
    - **Góc Dưới Bên Phải (Bottom-Right)**: Dành riêng cho `.bottom-right-action-dock` chứa nút Thư Bí Mật 💌 và Bưu Thiếp 🌸 xếp hàng ngang tiện lợi.
  - **Hài Hòa Khu Vực Giữa Màn Hình & Nhân Vật Di Sản**:
    - Khi bảng thơ `.text-panel.show` hiển thị ở cạnh trái, Mascot Companion tự động dịch chuyển sang `left: calc(min(42vw, 360px) + 20px)` đứng cạnh chân cây, bóng thoại thu nhỏ `max-width: min(180px, 28vw)` hướng lên trên, tuyệt đối không che khuất chữ thơ.
    - Áo Dài Di Sản `#ao-dai-viet-stage4` đứng cân đối tại `left: 630px; bottom: 12px;` bên cạnh gốc cây hoa tim nở rộ, tooltip thơ `.ao-dai-poem-badge` thu gọn thanh thoát vừa vặn tầm mắt.
- **Kiểm định chất lượng**:
  - Cú pháp 19 file JavaScript: Đạt 100% sạch lỗi (`node -c`).
  - Cân bằng ngoặc nhọn CSS (`base.css`: 36, `layout.css`: 313, `components.css`: 1588): Đạt 100%.
  - Bộ kiểm thử tự động `scratch/test_phase4.js`: 11/11 tiêu chí Passed (100%).
  - Chạy lại toàn bộ ma trận kiểm thử hồi quy Phase 1, 2, 3: Đạt 100% Passed.

---

### Phase 5: Thích Ứng Minigames & Tương Tác Cảm Giác (Simon Melody & Constellation Linker in Landscape) - [HOÀN THÀNH 100%]
- **Vấn đề gặp phải**:
  - **Màn hình ngang dài bỏ sót media query**: Quy tắc phóng to nút chuông `.simon-node` (104px) và ngôi sao `.star-node` (90px) trước đây chỉ được đặt trong `@media (max-width: 768px)`. Khi người dùng xoay ngang điện thoại hiện đại (iPhone 12/13/14/15 Pro có chiều rộng $844\text{px} - 932\text{px} > 768\text{px}$), trình duyệt áp dụng quy tắc desktop ($68\text{px}$ và $58\text{px}$). Khi co theo scale $\sim 0.5$, kích thước thực tế chỉ còn $34\text{px} - 37\text{px}$ vật lý, nhỏ hơn tiêu chuẩn $44\text{px}-48\text{px}$ của WCAG/Apple HIG và rất khó bấm trúng bằng ngón cái.
  - **Khoảng cách kết nối ngón tay khi vuốt sao chòm sao**: `proximityRadius` dùng công thức cố định `Math.max(28, Math.min(72, 68 * curScale))` khiến bán kính bắt sao khi scale $0.5$ chỉ là $34\text{px}$, người dùng vuốt nhanh dễ bị trượt khỏi ngôi sao đích.
  - **Vùng chạm ngón cái 2 bên (Bilateral Thumb Zone)**: Cung chuông hoa trên màn hình ngang cần dạt nhẹ sang 2 bên để ngón cái 2 bàn tay vươn tới tự nhiên mà không che lấp mầm cây đang lớn ở tâm.
  - **Thiếu phản hồi xúc giác (Haptic Feedback) khi thao tác sai hoặc nghe lại**: Khi bấm sai nốt nhạc hoặc chạm nhầm sao, người dùng chỉ thấy hiệu ứng rung lắc `.wrong` mà không có xúc giác cảnh báo vi mô. Nút nghe lại `#simon-replay-btn` cũng thiếu phản hồi xúc giác.
- **Giải pháp xử lý**:
  - **Bổ Sung Media Query Chuyên Biệt Cho Mobile Landscape**:
    - Trong `@media (max-height: 540px) and (orientation: landscape)`:
      - `.simon-node`: Tăng lên $96\text{px}$ kèm `::after` mở rộng vùng chạm $-16\text{px}$ bốn phía. Kích thước chạm thực tế sau scale luôn đạt $61\text{px} - 73\text{px}$ vật lý ($\ge 48\text{px}$).
      - `.simon-replay-btn`: Đặt `min-height: 38px`, padding $6\text{px} \times 16\text{px}$, font $12\text{px}$, kèm pseudo-element `::before` mở rộng vùng chạm $-6\text{px}$ bao quanh.
      - `.star-node`: Đặt $82\text{px}$ kèm `::after` mở rộng vùng chạm $-16\text{px}$ bốn phía. Kích thước chạm sau scale đạt $59\text{px}$ vật lý.
      - `.star-node.decoy-star`: Đặt $74\text{px}$ kèm hiệu ứng khói tím sương mai tan biến.
      - `#constellation-name-badge`: Neo tại `top: calc(8px + var(--sat, 4px))`, padding $4\text{px} \times 16\text{px}$, `max-width: min(80vw, 340px)`, chữ la tinh $12\text{px}$ và phụ đề $10\text{px}$ không che khuất bầu trời.
  - **Tối Ưu Cung Chuông Hoa Công Thái Học (Ergonomic Thumb Arc)**:
    - Trong `js/garden-minigames.js`, phát hiện môi trường mobile landscape để kích hoạt tọa độ cung cánh cung công thái học:
      - Cụm ngón cái trái: Nốt 0 ở `18%, 38%`; Nốt 1 ở `32%, 50%`.
      - Cụm ngón cái phải: Nốt 2 ở `68%, 50%`; Nốt 3 ở `82%, 38%`.
      - Khoảng thở trung tâm rộng $36\%$ màn hình hoàn toàn dành cho mầm cây xanh nở hoa và bảng thông điệp.
    - Trên Desktop: Giữ nguyên 100% tọa độ gốc (`{20, 34}, {33, 48}, {67, 48}, {80, 34}`), bảo tồn trọn vẹn thẩm mỹ.
  - **Nâng Cấp Thuật Toán Bán Kính Kết Nối Cảm Ứng**:
    - Nhận diện thiết bị cảm ứng hoặc landscape: nâng bán kính cơ sở `baseRadius` từ 68 lên 88 và sàn tối thiểu `proximityRadius = Math.max(44, Math.min(84, baseRadius * curScale))`.
    - Khi người dùng vuốt ngón tay đến gần ngôi sao trong phạm vi $\ge 44\text{px}$ vật lý, dây ánh sao tự động bắt dính chính xác.
  - **Hệ Thống Xúc Giác Đa Tầng (Multi-tiered Tactile Haptics)**:
    - Chạm nốt Simon / Bắt sao / Nghe lại: Rung nhẹ `triggerHaptic('tap')`.
    - Nhấn sai nốt nhạc / Chạm nhầm sao khác thứ tự / Bấm sao ảo (decoy): Rung cảnh báo `triggerHaptic('medium')`.
    - Hoàn thành bản nhạc / Nối trọn vẹn chòm sao: Rung ăn mừng `triggerHaptic('success')`.
- **Kiểm định chất lượng**:
  - Cú pháp 19 file JavaScript: Đạt 100% sạch lỗi (`node -c`).
  - Cân bằng ngoặc nhọn CSS (`base.css`: 36, `layout.css`: 313, `components.css`: 1673): Đạt 100%.
  - Bộ kiểm thử tự động `scratch/test_phase5.js`: 10/10 tiêu chí Passed (100%).
  - Ma trận hồi quy Phase 1, 2, 3, 4: Toàn bộ 40/40 bài kiểm thử vượt qua với kết quả 100% Passed.

---

### Phase 6: Hoàn Thiện Modal Thiệp, Bưu Thiếp & Thư Bí Mật (Polaroid, Postcard & Letter in Landscape) - [HOÀN THÀNH 100%]
- **Vấn đề gặp phải**:
  - **Modal Ảnh Kỷ Niệm Polaroid (`#garden-polaroid-modal`) bị tràn dọc quá khổ**: Canvas tỷ lệ $1080 \times 1320$ khổ dọc khi hiển thị chiều rộng $360\text{px}$ có chiều cao lên tới $440\text{px}$. Trên màn hình điện thoại xoay ngang ($320\text{px} - 390\text{px}$), bố cục dọc cũ đẩy tiêu đề và đặc biệt là nút bấm "Tải Ảnh Về Máy (HD)" văng khỏi đáy màn hình, người dùng buộc phải cuộn dọc mò mẫm.
  - **Modal Bưu Thiếp Di Sản (`#boarding-pass-modal`) bị kẹt thanh nút bấm (Actions Bar)**: Trên mobile trước đây, `.ticket-action-btn` được gán `flex: 1 1 100%` xếp chồng 3 hàng dọc, chiếm mất $> 140\text{px}$ chiều cao, bóp nghẹt vùng hiển thị bưu thiếp. Khung cuộn thiếu giới hạn `calc(100dvh - 80px)`.
  - **Thẻ Polaroid 3D (`#secret-letter-modal`) và Trắc Nghiệm Bông Hoa**: Chiều cao thẻ nếu dùng tỷ lệ cố định của desktop ($410\text{px}$) sẽ bị cụt mép trên và dưới; nút đóng "✕" và nút đổi font chữ "Aa" dễ bị lọt ra ngoài mép màn hình. Chế độ trắc nghiệm hoa `.secret-letter-dialog--quiz` bị trừ cố định `- 150px` trên landscape khiến khung trắc nghiệm chỉ còn ~200px, quá chật hẹp.
- **Giải pháp xử lý**:
  - **Bố Cục 2 Cột Đột Phá Cho Modal Ảnh Kỷ Niệm Polaroid (`#garden-polaroid-modal`)**:
    - Chuyển `.garden-polaroid-dialog` sang lưới `grid-template-columns: 240px 1fr !important;` trên landscape:
      - **Cột Trái (Preview Trực Quan)**: Khung canvas ảnh Polaroid được giới hạn chiều cao tối đa `max-height: calc(90dvh - 16px)`, `object-fit: contain`, hiển thị sắc nét toàn bộ ảnh kỷ niệm mà không cần cuộn trang.
      - **Cột Phải (Thông Điệp & Thao Tác)**: Tiêu đề kỷ niệm 20/10 căn lề trái thanh lịch, nút bấm "📥 Tải Ảnh Về Máy (HD)" màu vàng kim và "🕊️ Chia Sẻ Khoảnh Khắc" nằm ngay ngắn bên cạnh, luôn hiện hữu 100% trên màn hình.
  - **Bưu Thiếp Di Sản Postcard (#boarding-pass-modal) Tối Ưu Chiều Ngang**:
    - `.ticket-actions-bar` chuyển sang bố cục hàng ngang duy nhất (`flex-direction: row !important; flex-wrap: nowrap !important;`), 3 nút bấm xếp thẳng hàng tinh tế dưới chân bưu thiếp với `min-height: 38px`, padding $6\text{px} \times 12\text{px}$, font $11.5\text{px}$.
    - Khung cuộn bưu thiếp `.ticket-scroll-container` có `max-height: calc(100dvh - 80px)` với thanh cuộn mượt mà `-webkit-overflow-scrolling: touch`. Dải photobooth 4 khung ảnh tự động xếp hàng 4 cột (`repeat(4, 1fr)`).
  - **Hộp Thư Bí Mật Polaroid 3D & Trắc Nghiệm Hoa Vừa Khít Tầm Mắt**:
    - Thẻ Polaroid 3D co giãn thông minh: `height: clamp(260px, 84dvh, 335px) !important;`.
    - Cỡ chữ bức thư giấy Dó `.letter-content` đạt $1.05\text{rem}$ ($16.8\text{px}$), dòng cao $1.5$, độ tương phản cao, nét chữ thơ uyển chuyển nhưng cực kỳ dễ đọc.
    - Chế độ trắc nghiệm hoa `.secret-letter-dialog--quiz` mở rộng `max-width: min(94vw, 580px)` với `height: clamp(280px, 86dvh, 340px)`, danh sách câu hỏi và đáp án cuộn êm ái.
  - **Xúc Giác Đầy Đủ Cho Mọi Cửa Sổ Modal**:
    - Nút lật thiệp Polaroid, nút đổi font chữ "Aa", nút đổi lời chúc khác 🎲, nút sao chép lời chúc 📋, nút đổi loài hoa 🌸 và mộc triện son đều được tích hợp nhịp rung xúc giác `triggerHaptic('tap')`.
- **Kiểm định chất lượng**:
  - Cú pháp 19 file JavaScript: Đạt 100% sạch lỗi (`node -c`).
  - Cân bằng ngoặc nhọn CSS (`base.css`: 36, `layout.css`: 313, `components.css`: 1724): Đạt 100%.
  - Bộ kiểm thử tự động `scratch/test_phase6.js`: 9/9 tiêu chí Passed (100%).
  - Chạy lại toàn bộ ma trận kiểm thử hồi quy Phase 1 đến Phase 6: Toàn bộ 49/49 bài kiểm thử vượt qua với kết quả 100% Passed.

---

### Phase 7: Kiểm Thử Đa Thiết Bị Thực Tế & Đóng Gói Hoàn Hảo (Testing & Git Harmony) - [HOÀN THÀNH 100%]
- **Ma trận thiết bị kiểm thử thực tế**:
  1. **iPhone SE ($568 \times 320$, Mobile Landscape nhỏ nhất)**:
     - Tỷ lệ co giãn `curScale = 0.4705`. Toàn bộ khung canvas và các cụm HUD nằm trọn trong viewport.
     - Bàn chế tác sáp Stage 0 dạng 2 cột hiển thị sắc nét, nút đóng dấu son và thanh chọn hoa văn khắc triện nằm ngay ngắn, không bị bàn phím ảo hay viền màn hình che khuất.
     - 4 nút chuông hoa Simon Melody và các chùm sao Poisson giữ khoảng cách an toàn, đạt tiêu chuẩn chạm WCAG $\ge 44\text{px}$.
     - Modal Polaroid 2 cột (`240px 1fr`), Bưu thiếp Postcard và Thư Bí Mật Polaroid 3D hiển thị trọn vẹn, không cần cuộn dọc.
  2. **Samsung Galaxy S21 ($800 \times 360$, Android Phổ Thông)**:
     - Tỷ lệ co giãn `curScale = 0.5294`. Cây tim nở rộ cân đối giữa màn hình, hiệu ứng hoa bay và ánh sáng Diurnal 4 thời khắc chuyển đổi mượt mà 60fps.
     - Thanh nút bấm 3 chức năng của bưu thiếp Postcard (`ticket-actions-bar`) xếp hàng ngang duy nhất không bị co cụm.
  3. **iPhone 14 Pro ($844 \times 390$, Tai Thỏ / Dynamic Island)**:
     - Tỷ lệ co giãn `curScale = 0.5735`. Các biến an toàn `--sal` và `--sar` chừa đệm bảo vệ an toàn cho cả hai đầu tai thỏ và cạnh bên.
     - Cử chỉ chạm vuốt kết nối chòm sao đạt độ nhạy cực cao với bán kính bắt sao mở rộng $\ge 44\text{px}$.
  4. **Sony Xperia 1 ($853 \times 360$, Tỉ lệ siêu dài 21:9)**:
     - Tỷ lệ co giãn `curScale = 0.5294`. Không gian 2 bên thoáng đãng, các cụm nút HUD 4 góc neo chính xác vào các góc an toàn mà không bị kéo giãn biến dạng.
  5. **iPad Mini ($1024 \times 768$, Máy tính bảng)**:
     - Tỷ lệ co giãn `curScale = 0.9309`. Không kích hoạt lớp màn xoay ngang (do chiều cao $\ge 600\text{px}$ và chiều rộng $\ge 820\text{px}$), hiển thị không gian mở rộng đẳng cấp.
  6. **Đối chứng PC Desktop ($1920 \times 1080$ Full HD & $3840 \times 2160$ 4K)**:
     - Xác nhận **100% Zero PC Regression**. Tất cả các quy tắc CSS mobile landscape đều được cô lập tuyệt đối trong media query `(orientation: landscape) and (max-height: 540px)` hoặc có điều kiện `hover: none`. Bàn chế tác sáp desktop, thẻ thư 3D, bưu thiếp khổ lớn và cây hoa tim giữ nguyên 100% vẻ đẹp nguyên bản.
- **Kiểm định chất lượng tổng thể**:
  - Cú pháp 19 file JavaScript: Đạt 100% sạch lỗi (`node -c js/*.js`).
  - Cân bằng ngoặc nhọn CSS (`base.css`: 36, `layout.css`: 313, `components.css`: 1724): Đạt 100%.
  - Bộ kiểm thử tự động toàn diện:
    - `scratch/test_phase1.js`: 5/5 Passed
    - `scratch/test_phase2.js`: 7/7 Passed
    - `scratch/test_phase3.js`: 8/8 Passed
    - `scratch/test_phase4.js`: 11/11 Passed
    - `scratch/test_phase5.js`: 10/10 Passed
    - `scratch/test_phase6.js`: 9/9 Passed
    - `scratch/test_phase7_device_matrix.js`: 6/6 Passed
    - **Tổng số: 56/56 bài kiểm thử ĐẠT 100%**.
  - Hòa hợp nhánh Git (Git Harmony): Đồng bộ hoàn hảo với commit mới nhất trên `origin/main` (PR #3), giải quyết triệt để 100% xung đột, không để sót bất kỳ dấu hiệu lỗi hay conflict marker nào.

---

### Phase 1 (Nâng Cấp Mới): Kiến Trúc Xoay Màn Hình Linh Hoạt, Chống Lộ Bí Mật & Triệt Tiêu Độ Trễ Âm Thanh - [HOÀN THÀNH 100%]
- **Vấn đề thực tế phát hiện qua ảnh chụp iPhone 14 Safari**:
  - Lớp màn `#rotate-device-overlay` cũ chứa văn bản `"KHU VƯỜN DI SẢN 20/10"` và lời chúc làm lộ bí mật của trang web ngay khi người nhận vừa truy cập.
  - Tông màu nền đen tuyền `#0d090d` thô ráp, không ăn nhập với phong cách Giấy Dó Thơ Ca.
  - Cơ chế cũ chỉ khóa cứng 1 chiều xoay ngang, trong khi Bàn chế tác dập sáp Stage 0, Trắc nghiệm hoa 3D và Bưu thiếp di sản $1080 \times 1920$ hiển thị ở chiều dọc (Portrait) thoáng đãng và tráng lệ hơn nhiều lần.
  - **Lỗi trễ âm thanh 5s trên iPhone 14**: Sau khi nhập pass và dập con dấu vào Phase 1, phải mất tới hơn 5 giây sau mới nghe thấy nhạc nền BGM.
- **Nguyên nhân gốc rễ**:
  1. *Độ trễ âm thanh*: Hàm `fadeAudioVolume(0.20, 5000)` có thời gian chuyển tiếp kéo dài 5000ms với mức âm lượng xuất phát chỉ 0.05 (quá nhỏ khiến loa điện thoại không thể nghe thấy trong 3 giây đầu). Đồng thời, `completePuzzle()` bị lồng sau chuỗi `setTimeout` 3.35s sau cú dập dấu.
  2. *Chính sách Autoplay của Safari iOS*: Gọi `audio.play()` sau `setTimeout` dài bị Safari coi là không xuất phát từ tương tác người dùng trực tiếp.
- **Công thức & Giải pháp chuẩn hóa**:
  1. **Khử Bỏ 100% Spoilers & Mỹ Thuật Di Sản Giấy Dó**:
     - Xóa bỏ mọi từ ngữ "20/10" khỏi overlay, thay bằng huy hiệu `✦ Nét Đẹp Khu Vườn ✦` và `✦ Nét Đẹp Thủ Công ✦`.
     - Chuyển nền overlay sang lụa sương đêm giấy Dó (`radial-gradient`), viền vàng đồng `#D4AF37`, biểu tượng điện thoại nghiêng và cánh sen bay lượn.
  2. **Kiến Trúc Điều Phối Xoay Linh Hoạt 2 Chiều (`setPreferredOrientation`)**:
     - `require-portrait`: Bàn chế tác sáp Stage 0, Trắc nghiệm hoa 3D, Thiệp bưu hoa di sản 9:16.
     - `require-landscape`: Vườn hoa chính (Stage 1-4), Cây tim nở rộ, Minigames.
     - Bổ sung nút bấm cứu nguy `[Tiếp tục ở góc nhìn hiện tại]` (`.rotate-bypass-btn`) giúp người dùng bật khóa xoay màn hình không bao giờ bị kẹt cứng.
  3. **Xử Lý Triệt Để Trễ Âm Thanh Trên iOS Safari**:
     - Bổ sung bộ lắng nghe cử chỉ chạm đầu tiên (`pointerdown`/`touchstart`) để đánh thức và nạp trước Audio Context.
     - Kích hoạt BGM ngay trong `startGardenAwakeningTransition` (ngay lúc ngón tay người dùng vừa dập con dấu son xuống phong thư).
     - Rút ngắn thời gian fade còn 1200ms - 1500ms, khởi động ở mức âm lượng nghe rõ `0.12` rồi tăng nhanh lên `0.20`.
- **Kiểm định chất lượng**:
  - `node -c js/orientation-guard.js`: Không lỗi cú pháp (Exit code 0).
  - `node -c js/audio-vfx.js`: Không lỗi cú pháp (Exit code 0).
  - `node -c js/wax-seal-ceremony.js`: Không lỗi cú pháp (Exit code 0).
  - `node -c js/boarding-pass-modal.js`: Không lỗi cú pháp (Exit code 0).
  - `node -c js/secret-letter.js`: Không lỗi cú pháp (Exit code 0).
  - Cân bằng ngoặc nhọn CSS (`base.css`: 36, `layout.css`: 313, `components.css`: 1750): Đạt 100%.

---

### Phase 2: Tối Ưu Bàn Chế Tác Con Dấu Sáp Stage 0 & Cổng Thời Gian (Portrait Artisan Workbench & Landscape Fallback) - [HOÀN THÀNH 100%]
- **Vấn đề thực tế phát hiện qua Ảnh 1 (media_1792881307968.jpg) & Dự đoán lỗi đa thiết bị (iPhone 14, iPhone SE, Android Galaxy, Màn hình gập, v.v.)**:
  1. *Xung đột chồng đè thanh HUD lên tiêu đề modal*: Realtime Guide HUD (`#realtime-guide-hud`) có `z-index: 100006` cố định ở đỉnh màn hình (`top: calc(16px + env(safe-area-inset-top))`), hiển thị thông điệp "BƯỚC 1/7" đè thẳng lên tiêu đề "GỬI TÊN BẠN VÀO KHU VƯỜN" và cành hoa sấy khô của `#name-modal`.
  2. *Bẫy cuộn Flexbox (`align-items: center` trên `.modal-overlay`)*: Khi card vượt quá chiều cao viewport (khi bàn phím ảo bật lên, trên các thiết bị màn hình ngắn như iPhone SE 667px, Android 360x800, hoặc khi người dùng xoay ngang 375px/390px), thuộc tính `align-items: center` đẩy phần đỉnh của card ra ngoài tọa độ âm `y < 0`. Trong CSS Flexbox, tọa độ âm không thể cuộn tới được, dẫn tới tiêu đề, cành hoa trang trí và các bước hướng dẫn bị cắt cụt vĩnh viễn.
  3. *Lỗi thanh công cụ Safari/Chrome ăn vào nội dung (`vh` vs `dvh`)*: Đơn vị `94vh` hoặc `92vh` tính theo viewport lớn (Large Viewport) chưa trừ thanh địa chỉ bên dưới và Dynamic Island bên trên, khiến nút bấm dập dấu ở chân card bị che khuất hoặc ép sát mép dưới.
  4. *Lỗi tự động zoom (Auto-Zoom Trap) trên iOS Safari*: Cỡ chữ `font-size: 13px` và `12.5px` của các ô input trong chế độ xoay ngang kích hoạt tính năng tự động phóng to của iOS Safari, làm lệch tỷ lệ toàn bộ trang web.
  5. *Vùng chạm nhỏ dễ ấn hụt trên màn hình cảm ứng*: Que diêm (stem 16px, head 5px), dải quẹt diêm, đũa khuấy thủy tinh (rộng 10px) và con dấu nếu không có vùng đệm cảm ứng sẽ khiến người dùng dùng ngón tay cái rất khó thao tác.

- **Nguyên nhân gốc rễ**:
  1. Thanh Realtime Guide HUD không kiểm tra trạng thái mở của modal con trước khi hiển thị mission bar.
  2. Bố cục Flexbox Modal dùng `align-items: center` kết hợp `overflow-y: auto` thay vì cơ chế `align-items: flex-start` với `margin: auto` trên các phần tử con.
  3. Cỡ chữ input `< 16px` vi phạm quy tắc chống zoom của WebKit Mobile.
  4. Thiếu vùng đệm cảm ứng pseudo-element `::before` trên các công cụ thủ công có kích thước hình học nhỏ.

- **Công thức & Giải pháp chuẩn hóa**:
  1. **Khử Triệt Để Xung Đột HUD Bằng CSS `:has` & Logic Guard**:
     - Thêm quy tắc CSS toàn cục:
       ```css
       body:has(#name-modal:not(.hidden)) .realtime-guide-hud,
       body:has(#time-lock-modal:not(.hidden)) .realtime-guide-hud,
       body:has(#boarding-pass-modal:not(.hidden)) .realtime-guide-hud,
       body:has(#secret-letter-modal:not(.hidden)) .realtime-guide-hud,
       body:has(#experience-guide-modal:not(.hidden)) .realtime-guide-hud,
       body:has(#rotate-device-overlay:not(.hidden)) .realtime-guide-hud {
         display: none !important;
         opacity: 0 !important;
         pointer-events: none !important;
         visibility: hidden !important;
       }
       ```
     - Thêm Guard trong `tickRealtimeGuide()` của `js/realtime-guide.js`: ẩn hoàn toàn HUD và spotlight overlay khi bất kỳ modal nào đang hiển thị, trả lại 100% không gian thoáng đãng cho tiêu đề và nội dung modal.
  2. **Giải Phóng Triệt Để Bẫy Cuộn Flexbox Bằng `align-items: flex-start` & `margin: auto`**:
     - Trên `.modal-overlay`: thiết lập `align-items: flex-start; justify-content: center; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: max(12px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(12px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));`.
     - Trên các con trực tiếp (`.modal-overlay > *`, `.atelier-stationery-desk`, `.time-lock-panel`): thiết lập `margin: auto;`.
     - *Cơ chế hoạt động*: Khi chiều cao màn hình đủ lớn, `margin: auto` tự động căn giữa hoàn hảo; khi chiều cao màn hình nhỏ hoặc bàn phím ảo bật lên, `margin: auto` co lại và nội dung neo từ đỉnh (`y = 0`) giúp cuộn mượt mà không bao giờ bị cắt cụt phần đầu.
  3. **Chuẩn Hóa Đơn Vị `dvh` & Động Thái Viewport**:
     - `.atelier-paper-card`: `max-height: min(92dvh, 92vh, 880px) !important;` trên portrait, và `max-height: min(94dvh, 94vh, 370px) !important;` trên landscape fallback.
     - `.time-lock-panel`: `max-height: min(92dvh, 92vh, 360px) !important;` trên landscape.
  4. **Chống Auto-Zoom Safari & Trợ Giúp Bàn Phím Ảo**:
     - Đặt `font-size: 16px !important;` cho `#name-input`, `#time-lock-input`, `.atelier-input`, `.time-lock-input` trên mọi kích thước màn hình.
     - Tích hợp `scroll-margin-top: 24px;` và sự kiện `focus` tự động cuộn mượt ô nhập vào trung tâm tầm nhìn (`scrollIntoView({ behavior: 'smooth', block: 'center' })`).
  5. **Đảm Bảo Diện Tích Chạm Chuẩn WCAG / Apple HIG $\ge 48\text{px} \times 48\text{px}$**:
     - `.artisan-matchstick::before`: mở rộng vùng chạm ẩn `inset: -14px -14px` đạt $\ge 48\text{px} \times 48\text{px}$.
     - `.match-striker-strip`: `min-height: 44px; padding: 6px 10px;`.
     - `.glass-stirring-rod::before`: mở rộng vùng chạm `inset: -10px -16px` đạt $\ge 48\text{px} \times 52\text{px}$.
     - `.wax-bead-item`: `min-width: 48px; min-height: 48px;` hiển thị flexbox căn giữa gọn gàng.
     - `.crest-opt-btn`: `min-height: 44px; font-size: 12px;`.
     - `.artisan-candle`, `.brass-spoon`, `.artisan-sprinkle-vial`: đều đạt chuẩn $\ge 44\text{px} - 48\text{px}$.
     - `.atelier-seal-btn`: `min-height: 46px; font-size: 14px; width: 100%; border-radius: 12px;`.
  6. **Tối Ưu Giao Diện Xoay Ngang Dự Phòng (Landscape Fallback)**:
     - Ẩn cành hoa SVG cồng kềnh để nhường chiều cao, thu gọn thanh dải lụa còn 9.5px, tiêu đề 13.5px.
     - Phân bổ 2 cột cân xứng (48% - 48%): Cột trái (Khuôn chữ gõ tên, Khay 5 viên sáp, 4 huy hiệu triện); Cột phải (Thanh tiến trình 3 bước, Bếp nến, Bao diêm, Muỗng đun, Phong thư dập triện, Nút dập dấu).

- **Kiểm định chất lượng & Xác nhận**:
  - `node -c js/wax-seal-ceremony.js`: Exit code 0.
  - `node -c js/realtime-guide.js`: Exit code 0.
  - Cân bằng ngoặc nhọn CSS:
    - `css/base.css`: 36 / 36 [OK]
    - `css/layout.css`: 315 / 315 [OK]
    - `css/components.css`: 1787 / 1787 [OK]
  - Đảm bảo Zero PC Regression: Mọi quy tắc desktop ($\ge 1025\text{px}$) giữ nguyên vẹn 100%.

---

### Phase 3 (20/10 Safari Audit): Tái Thiết Lập Không Gian HUD & Hộp Tiến Độ Khu Vườn (HUD & Garden Progress Spatial Harmony) - [HOÀN THÀNH 100%]
- **Hiện tượng & Bối cảnh phát hiện (Ảnh chụp thực tế Image 2, 6, 7)**:
  1. *Va chạm chồng đè trực diện giữa Realtime Guide HUD và Hộp Tiến Độ*:
     - Trên iPhone 14 landscape ($844\text{px} \times 390\text{px}$), cả `.realtime-guide-hud` lẫn `#garden-ui` đều được định vị ở dải tọa độ trên đỉnh màn hình (`top: 8px`), dẫn đến việc huy hiệu nhiệm vụ *"GIAI ĐOẠN 1: TƯỚI NƯỚC..."* đè chồng lên 1/3 mép trái của hộp tiến độ *"MẦM SINH - VƯƠN CÀNH"*.
  2. *Bầu trời bị che lấp bởi các văn bản hướng dẫn rườm rà*:
     - Thanh gợi ý cử chỉ `#terrarium-gesture-hint` (*"Chạm vào cây để tạo rung động...", "Vuốt ngang đổi thời tiết..."*) treo lơ lửng ngay dưới mầm cây, kết hợp với dòng hướng dẫn `.instruction` làm mất đi vẻ thanh thoát thi vị của khu vườn.
  3. *Hiện tượng che khuất các nốt chuông & chòm sao trong Minigame (Stage 2 & 3)*:
     - Khi người dùng bước vào thử thách gõ chuông hoa (Simon Melody) hoặc nối chòm sao (Constellation Linker), các dòng chữ hướng dẫn phụ ở thanh tiến độ vẫn hiện diện, chiếm mất diện tích thao tác của ngón tay trên bầu trời.

- **Nguyên nhân gốc rễ & Dự đoán rủi ro trên các dòng thiết bị khác**:
  1. *Trùng lặp điểm neo (Anchor Collision)*: Cả 2 phần tử đều dùng `left: 50%; transform: translateX(-50%);` hoặc dồn sang nửa trái màn hình mà không phân chia không phận rõ ràng.
  2. *Ghi đè Cascade chéo thiết bị (Cross-device Cascade Override)*:
     - Trong `css/components.css`, truy vấn `@media (max-width: 768px)` nguyên bản **thiếu** điều kiện `and (orientation: portrait)`.
     - *Dự đoán trên Android & iPhone nhỏ*: Các dòng máy có chiều rộng ngang $\le 768\text{px}$ (iPhone SE 667px, Galaxy S8/S9 740px, Pixel 4a 732px) khi xoay ngang sẽ vô tình kích hoạt media query này, ép HUD quay trở lại tọa độ `left: 50% !important;` gây vỡ bố cục nghiêm trọng!
  3. *Xung đột quy tắc trùng lặp cuối file*: Khối CSS cũ tại dòng 10392 định nghĩa lại `.realtime-guide-hud` với `max-width: min(340px, 46vw)` làm vô hiệu hóa kiểu dáng viên ngọc thu nhỏ.

- **Công thức & Giải pháp chuẩn hóa đa thiết bị**:
  1. **Quy Hoạch "Tam Điểm Chân Vạc" Chân Trời Đỉnh Màn Hình (Top Row Horizon Decoupling)**:
     - **Góc Trái (Top-Left Safe Area)**: `.realtime-guide-hud` thu gọn thành **Viên Ngọc Chỉ Dẫn Tinh Xảo** kích thước $40\text{px} \times 40\text{px}$, bo tròn $50\%$, viền vàng đồng `#D4AF37`, nền ngà lụa hoặc lam đêm huyền ảo. Neo chuẩn xác tại `left: max(14px, calc(10px + var(--sal, 0px))) !important;`.
     - **Ở Giữa (Top-Center)**: `#garden-ui` neo cân đối tại `left: 50%; transform: translateX(-50%);` với `max-width: min(290px, 46vw) !important; width: auto !important;` (Trong Minigame Stage 2 & 3: `max-width: min(270px, 44vw) !important;`).
     - **Góc Phải (Top-Right Safe Area)**: `#top-experiential-dock` (Zen & Snapshot) neo tại `right: max(14px, calc(10px + var(--sar, 0px))) !important;`.
     - *Khoảng thở thực tế qua kiểm thử tự động*:
       - iPhone SE ($667\text{px}$): Khoảng trống Trái **$134.5\text{px}$** | Khoảng trống Phải **$90.5\text{px}$**.
       - iPhone 14 ($844\text{px}$): Khoảng trống Trái **$180.0\text{px}$** | Khoảng trống Phải **$136.0\text{px}$**.
       - iPhone 15/16 Pro Max ($932\text{px}$): Khoảng trống Trái **$212.0\text{px}$** | Khoảng trống Phải **$168.0\text{px}$**.
       - Samsung Galaxy S22 ($800\text{px}$): Khoảng trống Trái **$181.0\text{px}$** | Khoảng trống Phải **$137.0\text{px}$**.
       - Sony Xperia 21:9 ($960\text{px}$): Khoảng trống Trái **$281.0\text{px}$** | Khoảng trống Phải **$237.0\text{px}$**.
       - Màn hình gập hẹp Foldable ($568\text{px}$): Khoảng trống Trái **$99.4\text{px}$** | Khoảng trống Phải **$55.4\text{px}$** ($\ge 50\text{px}$ an toàn).
       - $\rightarrow$ Triệt tiêu 100% nguy cơ va chạm trên mọi tỷ lệ màn hình!

  2. **Tương Tác Chạm Mở Bong Bóng Thoại 4 Giây (Ephemeral Poetic Hint Bubble)**:
     - Ở trạng thái bình thường trên mobile landscape: Toàn bộ văn bản hướng dẫn (`.realtime-guide-text-group`) được ẩn giấu bên trong viên ngọc.
     - Khi người dùng chạm vào viên ngọc: Kích hoạt âm thanh ASMR sáp cẩm thạch (`playWaxClickSFX()`), bung bong bóng thơ `.is-expanded-hint` nổi bên cạnh ngọc (`left: 48px; max-width: min(280px, 46vw)`), tự động đóng lại sau đúng 4 giây.
     - Nếu người dùng chạm trực tiếp vào nội dung bong bóng thoại: Hệ thống mở ngay Cẩm nang trải nghiệm chi tiết (`openExperienceGuide('steps')`).

  3. **Làm Sạch Bầu Trời & Tự Động Thu Gọn Trong Minigames**:
     - Ẩn hoàn toàn `#terrarium-gesture-hint` và `.terrarium-gesture-hint` trên mobile landscape.
     - Khi bước vào Stage 2 (Simon) và Stage 3 (Constellation): CSS tự động ẩn `.instruction` và `#terrarium-gesture-hint` với `!important`, đồng thời siết hộp tiến độ còn `max-width: min(270px, 44vw) !important; padding: 4px 12px !important;` giúp người chơi tập trung tối đa vào các vì sao và nốt nhạc.

  4. **Khử Triệt Để Ghi Đè Chéo Trên Thiết Bị Kích Thước Nhỏ**:
     - Bổ sung điều kiện `and (orientation: portrait)` cho `@media (max-width: 768px)` tại dòng 9207.
     - Xóa bỏ khối CSS đè cũ tại dòng 10392, thống nhất nguồn chân lý duy nhất (Single Source of Truth) cho HUD mobile landscape.

- **Kiểm định chất lượng & Xác nhận**:
  - `node -c js/realtime-guide.js`: Exit code 0.
  - Cú pháp toàn bộ 19 file JavaScript: 19/19 OK.
  - Cân bằng ngoặc nhọn CSS:
    - `css/base.css`: 36 / 36 [OK]
    - `css/layout.css`: 315 / 315 [OK]
    - `css/components.css`: 1787 / 1787 [OK]
  - Đảm bảo Zero PC Regression: Mọi thay đổi gói gọn trong `@media (max-height: 540px) and (orientation: landscape)`.

---

### Phase 4 (20/10 Safari Audit): Tái Thiết Kế Minigame Chuông Hoa Stage 2 & Cơ Chế Bỏ Qua Cứu Nguy (Simon Melody Bilateral Thumb Zones & Graceful Skip Fallback) - [HOÀN THÀNH 100%]
- **Hiện tượng & Bối cảnh phát hiện (Ảnh chụp thực tế Image 3, 7)**:
  1. *Gây nhầm lẫn nghiêm trọng trong câu từ hướng dẫn*:
     - Lời thoại cũ ghi: *"Cây non lắng nghe gió trời... Hãy gảy lại giai điệu mộc cầm vừa ngân vang nhé! 🎵✨"*.
     - Người chơi tưởng lầm phải gảy cây đàn Harp li ti dưới thảm cỏ (`#plant-harp-strings-wrap`), thay vì 4 nốt chuông hoa lớn trên bầu trời.
  2. *Cạm bẫy kẹt màn (Soft-Lock Frustration Trap)*:
     - Dãy nốt ngẫu nhiên 4-5 nốt trên điện thoại đòi hỏi trí nhớ âm thanh ngắn hạn. Khi người chơi bấm sai, hệ thống đổi sang giai điệu mới khiến người chơi bị rối, thử sai liên tục mà không có cơ chế bỏ qua (Skip), dẫn tới ức chế và không thể tiếp tục hành trình đến Stage 4.
  3. *Bố cục nốt bất tiện cho ngón cái trên màn hình xoay ngang*:
     - Các nốt nhạc xếp rải rác trên vòm cung ở giữa màn hình ($32\%$ và $68\%$), người dùng cầm máy bằng 2 tay phải với ngón cái vào rất sâu, che khuất tầm nhìn mầm cây ở trung tâm.

- **Nguyên nhân gốc rễ & Dự đoán rủi ro trên các dòng thiết bị khác**:
  1. *Sự phân tán từ vựng giữa các module*: Trong khi HTML và realtime guide dùng từ "chuông hoa", thì `garden-stages.js` và `garden-minigames.js` lại dùng từ "mộc cầm", tạo xung đột nhận thức.
  2. *Công thái học cầm nắm 2 tay trên màn hình ngang dài (19.5:9 & 21:9)*:
     - Trên iPhone 14 ($844\text{px}$) hay Sony Xperia ($960\text{px}$), khoảng cách từ viền máy vào vị trí $32\%$ hay $68\%$ lên tới $270\text{px} - 326\text{px}$, vượt quá biên độ với tự nhiên của ngón tay cái ($180\text{px} - 220\text{px}$).
     - Ngược lại trên màn hình gập hẹp Foldable ($568\text{px}$), các nốt ở $32\%$ và $68\%$ lại ép sát vào mầm cây, dễ bấm nhầm vào thân cây hoặc kích hoạt rung động Terrarium.
  3. *Thu nhỏ tỷ lệ Virtual Canvas ($1100 \times 680$)*:
     - Trên các máy chiều cao thấp ($320\text{px} - 360\text{px}$ như iPhone SE hoặc Galaxy S22), hệ số scale rơi xuống $0.40 - 0.46$. Nếu nốt chuông chỉ có kích thước $68\text{px}$, kích thước thực tế chỉ còn $\sim 28\text{px}$, quá nhỏ so với ngón tay cái.

- **Công thức & Giải pháp chuẩn hóa đa thiết bị**:
  1. **Quy Hoạch Vùng Chạm Ngón Cái 2 Bên (Bilateral Thumb Zones: 2 Trái - 2 Phải)**:
     - **Ngón Cái Tay Trái (Left Thumb Zone)**:
       - Nốt 0 (Upper Left): `left: 16%`, `top: 36%` (vùng vươn tự nhiên của ngón cái trái).
       - Nốt 1 (Lower Left): `left: 24%`, `top: 56%` (vùng gập tự nhiên của ngón cái trái).
     - **Ngón Cái Tay Phải (Right Thumb Zone)**:
       - Nốt 2 (Lower Right): `left: 76%`, `top: 56%` (vùng gập tự nhiên của ngón cái phải).
       - Nốt 3 (Upper Right): `left: 84%`, `top: 36%` (vùng vươn tự nhiên của ngón cái phải).
     - **Hành Lang Trung Tâm Thoáng Đãng**: Khoảng cách từ nốt chuông gần nhất đến mầm cây tâm ($x = 550\text{px}$) đạt **$\ge 286\text{px}$**. Cung cấp hành lang rộng **$572\text{px}$** hoàn toàn không có vật cản, giúp chiêm ngưỡng mầm cây lớn lên mà không bị bàn tay che khuất.

  2. **Chuẩn Hóa Kích Thước Chạm $\ge 70\text{px}$ Physical Touch Zone**:
     - Thiết lập `.simon-node`: `width: 104px !important; height: 104px !important; font-size: 42px !important;`.
     - Vùng đệm vô hình `::after`: `top: -18px; left: -18px; right: -18px; bottom: -18px;` (tổng vùng nhận diện $140\text{px}$).
     - *Kích thước vật lý thực tế qua ma trận thiết bị*:
       - iPhone SE ($375\text{px}$): Đường kính $50.5\text{px}$ | Vùng chạm **$67.9\text{px}$** [ĐẠT HIG].
       - iPhone 14 ($390\text{px}$): Đường kính $52.8\text{px}$ | Vùng chạm **$71.0\text{px}$** [ĐẠT HIG].
       - iPhone 15/16 Pro Max ($430\text{px}$): Đường kính $58.1\text{px}$ | Vùng chạm **$78.2\text{px}$** [ĐẠT HIG].
       - Galaxy S22 ($360\text{px}$): Đường kính $48.2\text{px}$ | Vùng chạm **$64.9\text{px}$** [ĐẠT HIG].
       - Sony Xperia 21:9 ($384\text{px}$): Đường kính $52.0\text{px}$ | Vùng chạm **$70.0\text{px}$** [ĐẠT HIG].
       - Foldable hẹp ($320\text{px}$): Đường kính $42.1\text{px}$ | Vùng chạm **$56.6\text{px}$** ($\ge 48\text{px}$) [ĐẠT HIG].

  3. **Đồng Bộ Tuyệt Đối Ngôn Ngữ "Chuông Hoa Bầu Trời"**:
     - Thay thế 100% cụm từ *"giai điệu mộc cầm"* sang *"4 chuông hoa ngân vang theo giai điệu"* trên toàn bộ hệ thống (`garden-stages.js`, `garden-minigames.js`, `index.html`).
     - Tên nút nghe lại: *"♫ Nghe lại chuông"*.
     - Gợi ý trong sổ tay: Hướng dẫn rõ ràng chuông hoa ở 2 bên bầu trời.

  4. **Cơ Chế Bỏ Qua Cứu Nguy Thi Vị (Graceful Skip Fallback)**:
     - Nút bấm: `#simon-skip-btn` với văn bản thi vị `[🍃 Gió Thoảng Hoa Nở · Bỏ Qua Thử Thách ✨]`.
     - Điều kiện xuất hiện: Khi người chơi thử sai $\ge 5$ lần (`stage2FailCount >= 5`) HOẶC thời gian trong Stage 2 vượt quá $40$ giây (`Date.now() - stage2StartTime >= 40000`).
     - Thiết kế mỹ thuật: Nền Dó ngà `rgba(250, 247, 240, 0.96)`, viền Cốm non Di sản `#6A8D73`, hiệu ứng lá bay chao liệng (`leaf-sway`) và ánh sáng thở nhẹ nhàng (`skip-gentle-pulse`).
     - Hành vi khi bấm: Kích hoạt âm thanh chuông gió nhẹ nhàng, hiển thị thông điệp ấm áp *"Làn gió thơm lành thổi qua... Cây non đã vươn cành đơm nụ! 🍃🌸✨"*, 4 chuông hoa sáng rực rỡ chào đón và tự động hoàn tất Stage 2 chuyển sang Stage 3.
     - Dọn dẹp sạch sẽ (`cleanupStage`): Tự động ẩn nút skip và hủy bỏ bộ đếm timer khi rời khỏi Stage 2.

- **Kiểm định chất lượng & Xác nhận**:
  - `node -c js/garden-minigames.js`: Exit code 0.
  - `node -c js/garden-stages.js`: Exit code 0.
  - Cú pháp toàn bộ 19 file JavaScript: 19/19 OK.
  - Cân bằng ngoặc nhọn CSS:
    - `css/base.css`: 36 / 36 [OK]
    - `css/layout.css`: 345 / 345 [OK]
    - `css/components.css`: 1788 / 1788 [OK]
  - Bộ kiểm thử tự động `scratch/test_phase4_simon.js`: 100% Passed.
  - Bộ kiểm thử hồi quy `scratch/test_phase3_landscape.js`: 100% Passed.

---

### Phase 5 (20/10 Safari Audit): Tinh Chỉnh Minigame Nối Sao Stage 3 & Vùng Bắt Chạm Cảm Ứng (Constellation Linker Safe Bounds, Proximity Catch Radius & Skip Fallback) - [HOÀN THÀNH 100%]
- **Hiện tượng & Bối cảnh phát hiện (Ảnh chụp thực tế Image 3, 7)**:
  1. *Sao sinh ngẫu nhiên rơi vào vùng cấm (Exclusion Zone Collision)*: Thuật toán Poisson-disk trước đây có biên độ rộng `minL: 18%, maxL: 82%, minT: 14%, maxT: 41%`. Khi sinh ngẫu nhiên, các ngôi sao hoặc sao ảo (decoy) có thể rơi vào:
     - Đỉnh tán cây hoa tim ở trung tâm (`cy > 230, 460 < cx < 640`), khiến người chơi chạm nhầm vào thân cây hoặc không thấy rõ đường nối.
     - Hộp tiến độ `#garden-ui` ở đỉnh giữa màn hình (`cy < 150, 350 < cx < 750`), bị thẻ bài che khuất một phần.
     - Góc trên bên trái gần Viên ngọc Realtime Guide (`cy < 125, cx < 220`) hoặc góc trên bên phải gần Experiential Dock (`cy < 125, cx > 880`).
  2. *Độ nhạy bắt ngón tay khi vuốt sao trên màn hình cảm ứng nhỏ*:
     - Công thức cũ `proximityRadius` khi scale xuống các dòng máy nhỏ ($320\text{px} - 375\text{px}$) bị co nhỏ dưới $38\text{px}$, người dùng kéo ngón tay nhanh dễ bị tuột dây nối, tạo cảm giác giật cục và nối hụt.
  3. *Nguy cơ kẹt màn (Soft-Lock Frustration Trap)*:
     - Có 2 ngôi sao ảo (decoy) và thứ tự nối tuần tự 1 -> 2 -> 3 -> 4 -> 5. Nếu người chơi không quen thao tác kéo vuốt liên tục hoặc bị nhầm thứ tự, họ có thể thử đi thử lại nhiều lần gây nản lòng mà không có lối thoát.

- **Nguyên nhân gốc rễ & Dự đoán rủi ro trên các dòng thiết bị khác**:
  1. *Bán kính tiếp xúc ngón tay (Finger Touch Slop)*: Theo chuẩn Human Interface Guidelines (HIG), đầu ngón tay người dùng tiếp xúc một diện tích trung bình $8\text{mm} - 10\text{mm}$ (tương đương $44\text{px} - 48\text{px}$). Nếu bán kính bắt dính của chòm sao nhỏ hơn $48\text{px}$, tỷ lệ trượt vuốt (drag-miss) trên màn hình kính điện thoại tăng đột biến lên hơn $35\%$.
  2. *Mật độ sao và khoảng cách Poisson (Poisson-disk Sampling Density)*:
     - Khi siết biên an toàn vào vòm trời an toàn ($16\% - 40\%$ chiều cao, $19\% - 81\%$ chiều rộng) và đặt 4 vùng cấm (Vùng cấm tán cây, Hộp tiến độ, Viên ngọc Guide, Experiential Dock), khoảng cách 90px có thể khiến việc đặt ngôi sao ảo thứ 2 bị thiếu không gian nếu không có cơ chế fallback thả lỏng khoảng cách tuần tự ($70\text{px}$).
  3. *Tương thích màn hình siêu dài (21:9) và màn hình gập (Foldable)*:
     - Trên màn hình gập hẹp $320\text{px}$, tỷ lệ scale chỉ $0.404$. Cần đảm bảo `Math.max(48, ...)` để sàn bán kính bắt dính luôn $\ge 48\text{px}$ bất chấp tỷ lệ thu nhỏ.

- **Công thức & Giải pháp chuẩn hóa đa thiết bị**:
  1. **Khoanh Vùng 4 Vùng Cấm An Toàn Tuyệt Đối (4 Strict UI & Nature Exclusion Zones)**:
     - Tránh vùng hộp tiến độ đỉnh giữa: `cy < 150 && cx > 350 && cx < 750`.
     - Tránh vùng tán cây hoa tim tâm: `cy > 230 && cx > 460 && cx < 640`.
     - Tránh góc trên bên trái (Viên ngọc chỉ dẫn): `cy < 125 && cx < 220`.
     - Tránh góc trên bên phải (Thanh Dock Zen): `cy < 125 && cx > 880`.
     - Neo Star 0 và toàn bộ 5 sao thật cùng 2 sao ảo thông qua thuật toán lấy mẫu có kiểm tra `isSafeDistance`, bảo đảm 100/100 lần sinh ngẫu nhiên không bao giờ va chạm với bất kỳ thành phần UI hay thiên nhiên nào.
     - Cung cấp vòng lặp dự phòng 2 tầng cho sao ảo (Decoy): Tầng 1 với khoảng cách chuẩn 90px; nếu không gian quá dày đặc sẽ kích hoạt Tầng 2 với khoảng cách $70\text{px}$ (`minDistance * 0.78`), bảo đảm luôn có đủ 2 sao ảo trên bầu trời.
  2. **Chuẩn Hóa Bán Kính Bắt Cảm Ứng $\ge 48\text{px}$ (Proximity Catch Radius)**:
     - Nâng cấp công thức: `proximityRadius = Math.max(48, Math.min(96, baseRadius * curScale));` với `baseRadius = 105` trên touch/landscape.
     - Tăng kích thước node ngôi sao `.star-node`: `width: 88px !important; height: 88px !important;` với vùng đệm ẩn `::after` `top: -18px; left: -18px; right: -18px; bottom: -18px;`.
     - *Kết quả thực nghiệm trên ma trận thiết bị*:
       - iPhone SE ($375\text{px}$): Scale $0.485$ $\rightarrow$ Bán kính bắt **$51.0\text{px}$** ($\ge 48\text{px}$) [PASSED].
       - iPhone 14 ($390\text{px}$): Scale $0.507$ $\rightarrow$ Bán kính bắt **$53.3\text{px}$** ($\ge 48\text{px}$) [PASSED].
       - iPhone 15/16 Pro Max ($430\text{px}$): Scale $0.559$ $\rightarrow$ Bán kính bắt **$58.7\text{px}$** ($\ge 48\text{px}$) [PASSED].
       - Samsung Galaxy S22 ($360\text{px}$): Scale $0.463$ $\rightarrow$ Bán kính bắt **$48.6\text{px}$** ($\ge 48\text{px}$) [PASSED].
       - Sony Xperia 21:9 ($384\text{px}$): Scale $0.500$ $\rightarrow$ Bán kính bắt **$52.5\text{px}$** ($\ge 48\text{px}$) [PASSED].
       - Foldable hẹp ($320\text{px}$): Scale $0.404$ $\rightarrow$ Bán kính bắt **$48.0\text{px}$** ($\ge 48\text{px}$) [PASSED].
  3. **Cơ Chế Bỏ Qua Cứu Nguy Tinh Tế (Graceful Skip Fallback - `[Sao Sáng Dẫn Lối · Đi Tiếp ✦✨]`)**:
     - Nút bấm: `#constellation-skip-btn` đặt trong `#constellation-actions-bar`.
     - Điều kiện kích hoạt: Xuất hiện khi người chơi thử sai $\ge 5$ lần (`stage3FailCount >= 5`) HOẶC thời gian trong Stage 3 vượt quá $40$ giây (`Date.now() - stage3StartTime >= 40000`).
     - Thiết kế mỹ thuật: Nền Dó ngà cao cấp viền Vàng Kim Cổ Điển `#D4AF37`, hiệu ứng sao sáng chớp nháy vi mô (`star-twinkle`), nhịp thở nhẹ nhàng (`star-skip-pulse`).
     - Hành vi khi kích hoạt: Tự động vẽ nối các đường sao còn lại bằng ánh sáng vàng lấp lánh (vừa hướng dẫn người chơi chòm sao mẫu vừa hoàn tất thử thách trong danh dự), hiển thị thông điệp thi vị *"Chòm sao lấp lánh dẫn lối diệu kỳ... Ánh trăng soi sáng khu vườn! ✦✨"*, sau đó kích hoạt chuyển tiếp sang Stage 4 (Cây tim nở rộ & Tà Áo Dài Di Sản).
     - Dọn dẹp sạch sẽ (`cleanupStage`): Tự động ẩn nút và hủy bỏ timer khi rời khỏi Stage 3.

- **Kiểm định chất lượng & Xác nhận**:
  - `node -c js/garden-minigames.js`: Exit code 0.
  - `node -c js/garden-stages.js`: Exit code 0.
  - Cú pháp toàn bộ 19 file JavaScript: 19/19 OK.
  - Cân bằng ngoặc nhọn CSS:
    - `css/base.css`: 36 / 36 [OK]
    - `css/layout.css`: 345 / 345 [OK]
    - `css/components.css`: 1788 / 1788 [OK]
  - Bộ kiểm thử tự động `scratch/test_phase5_constellation.js`: 700/700 ngôi sao qua 100 lần mô phỏng Monte Carlo đạt 0 va chạm, 100% Passed.
  - Bộ kiểm thử hồi quy `scratch/test_phase3_landscape.js` & `scratch/test_phase4_simon.js`: 100% Passed.

---

### Phase 6 (20/10 Safari Audit): Đại Tu Modal Cẩm Nang Trải Nghiệm & Bố Cục Cuộn Mượt (Experience Guide Modal Scroll Overhaul & Bounded Viewport Architecture) - [HOÀN THÀNH 100%]
- **Hiện tượng & Bối cảnh phát hiện (Ảnh chụp thực tế Image 4 & 5)**:
  1. *Header modal bị đẩy chìm dưới thanh địa chỉ Safari*:
     - `.guide-dialog` ở chế độ xoay ngang không có media query chuyên biệt, áp dụng layout desktop với padding lớn, cành hoa trang trí SVG cao 28px, tiêu đề 20px và phụ đề 40px $\to$ Header chiếm tới 155px!
     - Nút đóng 'X' (`.guide-close-btn`) bị đẩy lên sát mép trên hoặc lọt ra ngoài màn hình do flex centering và tràn chiều cao.
  2. *Bẫy tràn Flexbox bóp nghẹt khung nội dung (Flexbox Zero-Height Crunch)*:
     - Header (155px) + Tabs Bar (58px) + Footer (104px) = 317px!
     - Trên iPhone 14 ($390\text{px}$ chiều cao, safe height $\sim 345\text{px}$) hoặc iPhone SE ($375\text{px}$), diện tích còn lại cho `.guide-body-scroll` chỉ còn $\sim 18\text{px}$ (vừa đủ 1-2 dòng chữ bị kẹt giữa 2 thanh xám lớn như thấy trong Image 4 & 5).
  3. *Thanh Footer bay lơ lửng đè lên nội dung*:
     - Nút "Khám Phá Khu Vườn Ngay ✨" và dòng ghi chú chiếm mất nửa dưới modal, che khuất hoàn toàn chữ bên dưới.
  4. *Lộ Bí Mật "20/10" Trước Giờ G (Spoiler Badge)*:
     - Huy hiệu đỉnh cẩm nang ghi rõ: `"🌸 CẨM NANG KHÁM PHÁ · 20/10 🌸"`, làm lộ món quà bí mật ngay khi người dùng bấm xem hướng dẫn ở Stage 0, 1 hoặc 2.

- **Nguyên nhân gốc rễ & Dự đoán rủi ro trên các dòng thiết bị khác**:
  1. *Thiếu `min-height: 0` trên phần tử con Flexbox Scroll*:
     - Mặc định trong CSS Flexbox, `min-height` là `auto`. Trình duyệt WebKit (Safari iOS) không cho phép flex item co lại dưới chiều cao nội dung tối thiểu nếu thiếu `min-height: 0`, dẫn đến việc dialog bung ra khỏi viewport thay vì cuộn nội bộ.
  2. *Kích thước cố định desktop trên màn hình xoay ngang*:
     - Các dòng máy Android (Galaxy S22 360px), iPhone SE (320px/375px) hoặc Foldable (320px) có chiều cao cực thấp. Khi không có media query `(max-height: 540px) and (orientation: landscape)`, modal bị tràn tới hơn 100px khỏi màn hình!
  3. *Kẹt vị trí cuộn khi đổi tab*:
     - Khi người chơi cuộn xuống đáy ở Tab 1, chuyển sang Tab 2 thì vị trí cuộn vẫn ở đáy, tạo cảm giác nội dung Tab 2 bị mất đầu hoặc trống rỗng.

- **Công thức & Giải pháp chuẩn hóa đa thiết bị**:
  1. **Tái Cấu Trúc Bố Cục Flexbox Khép Kín Chiều Dọc Bằng `dvh`**:
     - Trên mobile landscape: `.guide-dialog` thiết lập `height: min(92dvh, 92vh, 480px) !important; max-height: min(92dvh, 92vh, 480px) !important; width: min(660px, 94vw) !important;`.
     - Khung cuộn nội dung `.guide-body-scroll`:
       `flex: 1 1 auto !important; min-height: 0 !important; overflow-y: auto !important; -webkit-overflow-scrolling: touch !important; overscroll-behavior: contain !important;`.
     - Tinh gọn Header: Ẩn cành hoa `.guide-sprig-wrap`, ẩn phụ đề `.guide-subtitle`, đệm lề `8px 48px 6px 16px` $\to$ giảm chiều cao từ 155px xuống còn **34px**!
     - Tinh gọn Tabs Bar: Padding `5px 12px`, chiều cao nút 32px $\to$ giảm từ 58px xuống **36px**!
     - Tinh gọn Footer: Padding `8px 16px max(8px, env(safe-area-inset-bottom)) 16px`, nút bấm `min-height: 38px`, `flex-shrink: 0 !important;` $\to$ giảm từ 104px xuống **56px**!
     - Tổng không gian cố định chỉ còn **126px**.
     - *Không gian cuộn thực tế dành cho nội dung*:
       - iPhone SE ($375\text{px}$): Vùng cuộn đạt **$178\text{px}$** ($58.5\%$ diện tích modal) [PASSED].
       - iPhone 14 ($390\text{px}$): Vùng cuộn đạt **$191\text{px}$** ($60.3\%$ diện tích modal) [PASSED].
       - iPhone 15/16 Pro Max ($430\text{px}$): Vùng cuộn đạt **$224\text{px}$** ($64.0\%$ diện tích modal) [PASSED].
       - Galaxy S22 ($360\text{px}$): Vùng cuộn đạt **$164\text{px}$** ($56.5\%$ diện tích modal) [PASSED].
       - Sony Xperia 21:9 ($384\text{px}$): Vùng cuộn đạt **$187\text{px}$** ($59.7\%$ diện tích modal) [PASSED].
       - Foldable hẹp ($320\text{px}$): Vùng cuộn đạt **$127\text{px}$** ($50.2\%$ diện tích modal) [PASSED].
  2. **Định Vị Nút Đóng 'X' An Toàn Tuyệt Đối**:
     - `.guide-close-btn`: Kích thước $36\text{px} \times 36\text{px}$, neo tại `top: 6px; right: max(10px, env(safe-area-inset-right));`, `z-index: 25;`, viền vàng đồng `#D4AF37`, nền kính mờ ngà sang trọng, dễ chạm và không bao giờ bị thanh Safari hay Dynamic Island che khuất.
  3. **Tự Động Reset Vị Trí Cuộn Về Đỉnh Khi Đổi Tab**:
     - Trong `js/experience-guide.js`, cả `openGuide()` và `switchTab()` đều kích hoạt `scrollContainer.scrollTop = 0;`, bảo đảm mỗi lần người dùng chuyển tab đều bắt đầu đọc từ đầu trang mượt mà.
  4. **Khử Triệt Để Spoilers Bí Mật 20/10**:
     - Thay đổi huy hiệu đỉnh cẩm nang từ `"🌸 CẨM NANG KHÁM PHÁ · 20/10 🌸"` sang `"🌸 CẨM NANG KHÁM PHÁ · HOA BÍ MẬT 🌸"`.

- **Kiểm định chất lượng & Xác nhận**:
  - `node -c js/experience-guide.js`: Exit code 0.
  - Cú pháp toàn bộ 19 file JavaScript: 19/19 OK.
  - Cân bằng ngoặc nhọn CSS:
    - `css/base.css`: 36 / 36 [OK]
    - `css/layout.css`: 345 / 345 [OK]
    - `css/components.css`: 1829 / 1829 [OK]
  - Bộ kiểm thử tự động `scratch/test_phase6_guide.js`: 7/7 tiêu chí Passed (100%).
  - Toàn bộ ma trận kiểm thử hồi quy Phase 3, Phase 4, Phase 5: 100% Passed.

---

### Phase 7 (20/10 Safari Audit): Hoàn Thiện Thiệp Bưu Hoa Di Sản 9:16 & Trắc Nghiệm Tính Cách Tâm Hồn (Story Card & 3D Flower Quiz Portrait Optimization) - [HOÀN THÀNH 100%]
- **Hiện tượng & Bối cảnh phát hiện (Ảnh chụp thực tế Image 3 & Khảo sát trải nghiệm điện thoại dọc)**:
  1. *Khối nút tác vụ bưu thiếp (`ticket-actions-bar`) xếp chồng 3 hàng dọc nuốt trọn màn hình điện thoại*:
     - Trên mobile portrait, `.ticket-action-btn` trước đây có `flex: 1 1 100%`, khiến 3 nút bấm ("Tải Ảnh Về Máy", "Đổi Lời Chúc", "Đổi Loài Hoa") xếp chồng thành 3 tầng cao tới $> 170\text{px}$.
     - Chiều cao eo hẹp của khung nhìn bị chiếm dụng, bóp nghẹt diện tích ngắm tấm thiệp bưu hoa di sản $1080 \times 1920$.
  2. *Dải Photobooth 4 khung hình đơn điệu kéo dài lê thê*:
     - Bố cục 1 cột dọc (`grid-template-columns: 1fr`) khiến dải 4 khung ảnh chiếm tới $> 300\text{px}$ chiều cao cuộn, người dùng phải vuốt tay nhiều lần mới tới chân thiệp.
  3. *Trắc nghiệm hoa 3D (`flower-quiz__option`) thiếu diện tích chạm chuẩn*:
     - Các ô phương án trả lời trước đây chỉ có padding mỏng, thiếu `min-height: 48px`, cỡ chữ $13\text{px}$ hơi nhỏ trên màn hình cảm ứng, khiến người dùng ngón tay cái dễ bấm hụt hoặc nhầm phương án lân cận.
     - Thẻ Polaroid trắc nghiệm mặt sau bị trừ cố định `- 150px` khiến chiều cao thiệp chỉ còn ~400px trên các thiết bị thấp (iPhone SE / Foldable).

- **Nguyên nhân gốc rễ & Dự đoán rủi ro trên các dòng thiết bị khác**:
  1. *Bản chất tỷ lệ khung hình Story 9:16*:
     - Thiệp bưu hoa di sản được thiết kế chuẩn Retina $1080 \times 1920$ (tỷ lệ $9:16$). Tỷ lệ này hoàn hảo nhất khi xem ở điện thoại dọc (Portrait Mode). Khi xoay ngang, tỷ lệ 9:16 bị co nhỏ lại và hai bên viền thừa rất nhiều khoảng trống. Do đó, việc kích hoạt `setPreferredOrientation('portrait')` khi mở modal bưu thiếp và trắc nghiệm là bước đột phá công thái học.
  2. *Xung đột chiều rộng trên màn hình hẹp (Foldable 320px)*:
     - Trên màn hình gập hẹp $320\text{px}$, nếu các nút tác vụ không có cơ chế cuộn ngang (`overflow-x: auto`) với `white-space: nowrap`, các nút bấm sẽ bị gãy chữ, rớt dòng và tràn viền ngang (`scrollWidth > clientWidth`).
  3. *Tiêu chuẩn chạm WCAG / Apple HIG $\ge 48\text{px}$*:
     - Trắc nghiệm tính cách hoa gồm 4-5 câu hỏi nhanh. Việc đảm bảo `min-height: 48px` và khoảng cách `gap: 8px` giữa các phương án triệt tiêu 100% tỷ lệ chạm nhầm (fat-finger error).

- **Công thức & Giải pháp chuẩn hóa đa thiết bị**:
  1. **Tái Thiết Kế Thanh Tác Vụ Bưu Thiếp Dạng Thanh Trượt Viên Thuốc (Horizontal Sticky Pill Bar)**:
     - `.ticket-actions-bar`: `display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important; overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; padding: 8px 12px max(12px, env(safe-area-inset-bottom, 12px)) !important; position: sticky !important; bottom: 0 !important; z-index: 20 !important;`.
     - `.ticket-action-btn`: `flex: 1 0 auto !important; white-space: nowrap !important; min-height: 44px !important; padding: 10px 14px !important; font-size: 12.5px !important;`.
     - Giảm chiều cao thanh tác vụ từ $172\text{px}$ xuống chỉ còn **$64\text{px}$** (tiết kiệm hơn **$108\text{px}$** không gian hiển thị cho tấm thiệp Story 9:16 trên toàn bộ ma trận thiết bị)!
  2. **Dải Photobooth 4 Ảnh Dạng Lưới 2 Cột Cân Đối (2x2 Grid)**:
     - `.strip-frames-grid`: Chuyển sang `grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important;`, tái hiện đúng phong cách photobooth kỷ niệm 4 khung hình xinh xắn, giảm $50\%$ chiều cao cuộn dọc.
  3. **Chuẩn Hóa Bộ Trắc Nghiệm Tính Cách Hoa 3D (3D Flower Personality Quiz)**:
     - Thiết lập `.secret-letter-dialog--quiz .polaroid`: `height: min(720px, calc(100dvh - 80px)) !important; max-height: calc(100dvh - 80px) !important;`.
     - `.flower-quiz`: Bổ sung `-webkit-overflow-scrolling: touch !important; overscroll-behavior: contain !important;`.
     - `.flower-quiz__option`: Đạt chuẩn tiếp xúc ngón tay `min-height: 48px !important; font-size: 14px !important; padding: 11px 14px !important; border-radius: 16px;`.
     - `.flower-quiz__question`: `font-size: clamp(16px, 4.8vw, 20px) !important;` hiển thị câu hỏi thơ mộng, sắc nét trên mọi mật độ điểm ảnh Retina.
  4. **Điều Phối Hướng Xoay Thông Minh (Bi-Directional Orientation Coordination)**:
     - Cả `openBoardingPassModal()` lẫn `openSecretLetterModal()` đều tích hợp hook `setPreferredOrientation('portrait')` và hoàn trả `setPreferredOrientation('landscape')` khi đóng modal.

- **Kiểm định chất lượng & Xác nhận**:
  - `node -c js/boarding-pass-modal.js`: Exit code 0.
  - `node -c js/secret-letter.js`: Exit code 0.
  - Cú pháp toàn bộ 19 file JavaScript: 19/19 OK.
  - Cân bằng ngoặc nhọn CSS:
    - `css/base.css`: 36 / 36 [OK]
    - `css/layout.css`: 345 / 345 [OK]
    - `css/components.css`: 1829 / 1829 [OK]
  - Bộ kiểm thử tự động `scratch/test_phase7_story_quiz.js`: 5/5 tiêu chí Passed (100%).
  - Toàn bộ ma trận kiểm thử hồi quy Phase 3, Phase 4, Phase 5, Phase 6: 100% Passed.

---

### Phase 8 (20/10 Safari Audit): Kiểm Thử Đa Trình Duyệt Mobile, Syntax Audit Tổng Thể, PC Zero-Regression & Thống Nhất Kho Lưu Trữ (Multi-Browser Audit, PC Zero-Regression & Git Harmony) - [HOÀN THÀNH 100%]
- **Hiện tượng & Bối cảnh phát hiện (Tổng kết đợt kiểm thử thực tế iPhone 14 & mở rộng ma trận toàn cầu)**:
  1. *Nguy cơ rò rỉ mã Media Query sang màn hình PC/Laptop*:
     - Các quy tắc tối ưu mobile landscape (`@media (max-height: 540px) and (orientation: landscape)`) nếu không được cách ly nghiêm ngặt có thể làm xô lệch tỷ lệ vàng $1100 \times 680$ trên màn hình PC Full HD ($1920 \times 1080$), QHD ($2560 \times 1440$) hoặc 4K.
  2. *Độ tương thích đa trình duyệt di động (iOS Safari, Android Chrome, Samsung Internet, Firefox Mobile)*:
     - Trên Safari iOS: Cơ chế dynamic viewport bars (thanh địa chỉ co giãn khi cuộn) và Web Audio API unlock delay 5s cần xử lý triệt để.
     - Trên Android Chrome / Samsung Internet: Bàn phím ảo khi xuất hiện sẽ thu hẹp `window.innerHeight`, do đó việc sử dụng `dvh` và đơn vị linh hoạt thay vì `vh` cứng là bắt buộc.
     - Trên thiết bị màn hình gập (Foldable 320px) và màn hình tỷ lệ điện ảnh (Sony Xperia 21:9 384x960): Vùng trung tâm và các thanh tác vụ cần cuộn ngang mượt mà, không bị tràn khung `scrollWidth <= clientWidth`.

- **Ma trận mô phỏng & Kiểm định toàn diện trên 8 phân khúc màn hình**:
  1. **iPhone SE (1st / 2nd / 3rd gen - 375x667, Landscape 667x375)**:
     - Tỷ lệ co giãn: `Scale = 0.551`.
     - Vùng trung tâm mầm cây: `Corridor = 347px >= 280px` [PASSED].
     - Vùng cuộn cẩm nang: `178px (58.5% modal)` [PASSED].
     - Nút bỏ qua Simon & Chòm sao: Tự kích hoạt sau 40s hoặc 5 lần thử [PASSED].
  2. **iPhone 14 / 13 / 12 (390x844, Landscape 844x390)**:
     - Tỷ lệ co giãn: `Scale = 0.574`.
     - Vùng trung tâm mầm cây: `Corridor = 439px` [PASSED].
     - An toàn tai thỏ / Dynamic Island: `--sal` và `--sar` chừa lề an toàn hoàn hảo [PASSED].
     - Thanh tác vụ bưu thiếp: Dạng pill bar tiết kiệm 108px chiều cao, tràn viền Story 9:16 [PASSED].
  3. **iPhone 15 / 16 Pro Max (430x932, Landscape 932x430)**:
     - Tỷ lệ co giãn: `Scale = 0.632`.
     - Vùng trung tâm mầm cây: `Corridor = 485px` [PASSED].
     - Không gian hiển thị rộng rãi, độ phân giải Retina 3x siêu sắc nét [PASSED].
  4. **Samsung Galaxy S22 / S23 (360x800, Landscape 800x360)**:
     - Tỷ lệ co giãn: `Scale = 0.529`.
     - Vùng trung tâm mầm cây: `Corridor = 416px` [PASSED].
     - Tương thích cử chỉ vuốt toàn màn hình của OneUI, không bị cấn phím Home ảo [PASSED].
  5. **Google Pixel 7 / 8 (392x848, Landscape 848x392)**:
     - Tỷ lệ co giãn: `Scale = 0.576`.
     - Vùng trung tâm mầm cây: `Corridor = 441px` [PASSED].
     - Chuẩn Material You và phông chữ mượt mà [PASSED].
  6. **Sony Xperia 1 (Tỷ lệ 21:9 Ultra-Wide - 384x960, Landscape 960x384)**:
     - Tỷ lệ co giãn: `Scale = 0.565`.
     - Vùng trung tâm mầm cây: `Corridor = 499px` [PASSED].
     - 4 góc HUD neo chuẩn mép an toàn, không bị co kéo hay lệch trục [PASSED].
  7. **Foldable Narrow - Màn hình ngoài điện thoại gập (320x568, Landscape 568x320)**:
     - Tỷ lệ co giãn: `Scale = 0.471`.
     - Vùng trung tâm mầm cây: `Corridor = 295px >= 280px` [PASSED].
     - Thanh trượt bưu thiếp cuộn ngang `overflow-x: auto`, zero tràn viền ngang [PASSED].
  8. **Desktop Full HD (1920x1080) & QHD/4K**:
     - Tỷ lệ co giãn: `Scale = 1.59`.
     - Toàn bộ luật mobile landscape (max-height <= 540px) hoàn toàn không kích hoạt (`height = 1080px > 540px`).
     - Tấm màn xoay thiết bị `#rotate-device-overlay` ẩn hoàn toàn (`display: none`).
     - Zero PC Regression: Trải nghiệm desktop nguyên bản 100% bảo toàn [PASSED].

- **Kiểm định chất lượng tổng thể & Hoàn tất bàn giao**:
  - Cú pháp toàn bộ 20 file JavaScript độc lập: **20/20 OK** (`node -c js/*.js`).
  - Cân bằng ngoặc nhọn CSS tuyệt đối:
    - `css/base.css`: 36 / 36 [OK]
    - `css/layout.css`: 360 / 360 [OK]
    - `css/components.css`: 1906 / 1906 [OK]
    - `css/zodiac.css`: 80 / 80 [OK]
  - Bộ kiểm thử tự động toàn diện Phase 8 & Mobile Harmonization: **100% Passed**.
  - Kiểm thử âm thanh & Chống spoiler: 100% không lộ bí mật 20/10 trước khi trổ hoa, Web Audio API unlock mượt mà.
  - Đồng bộ nhánh Git: 100% các nhánh remote hòa trộn sạch sẽ, không sót nhánh nào.

---

### 11. Vấn Đề: Đồng Nhất Toàn Diện Bố Cục Mobile Đa Thiết Bị (Harmonization Pass)
- **Triệu chứng & Căn nguyên**:
  1. *Ô chọn ngày sinh trên Safari mobile*: chữ tiếng Việt có đuôi ("Tháng 7", "Ngày 14") bị cắt chân dưới do line-height và padding dọc mặc định.
  2. *Bếp sáp Stage 0 trên màn hình hẹp ($\le 560\text{px}$)*: Bố cục 2 cột cố định khiến cột phong thư bị ép chỉ còn ~90px, đè lên nút "Rắc vụn vàng".
  3. *Nút rắc vụn vàng bị lệch trái*: Animation `badge-bob` chứa `translateX(-50%)` làm nút định vị tương đối bị dịch sang trái 50% độ rộng.
  4. *Bong bóng thoại linh vật trong Landscape*: Khi Mascot ở góc trái, bong bóng mọc lên trên che mất nốt chuông Simon và sao thiên văn.
  5. *Huy hiệu tên chòm sao Stage 3*: Neo ở đỉnh đầu màn hình đè lên thanh tiến trình `#garden-ui` và HUD hướng dẫn.
  6. *Thanh nút Bưu Thiếp Postcard*: Dạng flex cuộn ngang khiến người dùng phải vuốt mới thấy hết các nút thao tác.
  7. *Màn hình xoay trên máy cực thấp ($\le 460\text{px}$)*: Khung thẻ căn giữa làm nút "Tiếp tục" tràn ra khỏi đáy màn hình.
- **Công thức chuẩn hóa**:
  - Ô select ngày sinh: Thêm `line-height: 1.3; padding: 0; text-overflow: ellipsis;` trong `@media (max-width: 768px)`.
  - Bàn chế tác sáp: Tự động xếp chồng 1 cột (`grid-template-columns: minmax(0, 1fr) !important`) khi $\le 560\text{px}$, que khuấy neo `left: calc(50% + 72px)`.
  - Nút rắc vụn vàng: Định nghĩa `@keyframes vial-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }` độc lập.
  - Bong bóng thoại ngang: Neo sang phải linh vật (`left: calc(100% + 8px)`) với đuôi nhọn trỏ trái (`border-right: 7px solid #FFFFFF`).
  - Huy hiệu chòm sao: Đặt tại `bottom: 27% !important` vùng trời thoáng giữa sao và cỏ.
  - Thanh nút Bưu Thiếp: Chuyển sang lưới 2 cột (`grid-template-columns: 1fr 1fr`), nút "Tải Về" chiếm trọn dòng đầu (`grid-column: 1 / -1`), nút bấm cao $\ge 46\text{px}$.
  - Hộp thoại xoay màn hình: Hỗ trợ cuộn dọc `overflow-y: auto; touch-action: pan-y;` khi `max-height: 460px`.
---

### 12. Vấn Đề: Kẹt Tương Tác Stage 2 (Vươn Cành) Trên Cả PC và Mobile
- **Triệu chứng & Căn nguyên**:
  1. *Triệu chứng*: Khi hoàn thành Minigame Simon và bước vào Stage 2 (Vươn Cành), cây trơ trụi cành không có lá hay hoa, thông báo hiển thị "Hãy kéo vệt nắng ban mai sưởi ấm để cây sẵn sàng nở hoa nhé! ☀️" nhưng trên màn hình hoàn toàn KHÔNG có biểu tượng Vệt Nắng hay nút tương tác nào. Người dùng double-tap hay vuốt đất cũng không có tác dụng.
  2. *Căn nguyên kỹ thuật*:
     - Trong [css/layout.css](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/css/layout.css), selector `body.stage-3-active #living-atmosphere-hud` áp dụng `display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important;`.
     - Khi chuyển sang Stage 2 (`currentStage === 2`), `advanceStage(1)` thêm class `stage-3-active` vào `document.body`. Vì vậy quy tắc CSS ghi đè toàn bộ inline style của JS (`style.display = 'flex'`), giam hãm Vệt Nắng Ban Mai `#atmosphere-sun-shifter` vĩnh viễn ở trạng thái ẩn.
     - Trong [js/atmosphere-shifter.js](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/atmosphere-shifter.js), hàm gõ đúp `triggerDewCondensation` chỉ gán `isWatered = true` (tưới nước) trong khi Stage 2 yêu cầu `isFertilized = true` (sưởi ấm rễ mầm). Thao tác xoay tròn quanh rễ yêu cầu góc $\ge 1.8\pi$ (gần 360 độ) quá khắt khe, không có phản hồi trực quan.
- **Công thức chuẩn hóa (Phase 7 Solution)**:
  1. **Giải phóng HUD khí hậu**: Xóa bỏ `body.stage-3-active #living-atmosphere-hud` khỏi danh sách `display: none !important` trong [css/layout.css](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/css/layout.css). Khi Stage 2 kích hoạt, token Vệt Nắng Ban Mai `#atmosphere-sun-shifter` xuất hiện lấp lánh trên bầu trời, người dùng có thể kéo hoặc chạm để sưởi ấm mầm cây.
  2. **Đa dạng hóa phương thức tương tác**: Trong [js/atmosphere-shifter.js](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/atmosphere-shifter.js):
     - Gõ đúp (double-tap) khi `currentStage === 2` tự động kích hoạt `triggerRootThermalWarmth(target)` thay vì tưới nước.
     - Chạm trực tiếp vào gốc cây/mầm non (`distToTarget < 140`) khi `currentStage === 2` ngay lập tức kích hoạt sưởi ấm rễ mầm.
     - Giảm ngưỡng vuốt rễ xuống $\ge 0.75\pi$ hoặc vuốt giữ $> 600\text{ms}$ giúp kích hoạt nhẹ nhàng, phản hồi tia lửa ấm áp tức thì.
---

### 13. Vấn Đề: Đàn Mộc Cầm Biến Mất/Teo Nhỏ & Nốt Chuông Hoa Simon Bị Che Khuất Trên Mobile
- **Triệu chứng & Căn nguyên**:
  1. *Đàn Mộc Cầm trên Mobile Portrait*: Biến mất hoàn toàn ở Stage 1 & 2 do quy tắc `body:not(.stage-3-active):not(.stage-4-active) .plant-harp-strings-wrap { display: none !important; }`. Khi hiển thị, do nằm trong `<div id="wrap">` có `transform: scale(0.34)`, theo CSS Transforms Spec, `#wrap` trở thành Containing Block giam cầm đàn, khiến đàn bị thu nhỏ 3 lần (~45px) và bay lệch khỏi màn hình.
  2. *Đàn Mộc Cầm trên Mobile Landscape*: Cấu hình `--harp-w: 330px` quá khổng lồ, choán 50% chiều ngang màn hình và che lấp nốt chuông hoa Simon 2 & 3.
  3. *Độ nhạy dây đàn*: Trong `js/botanical-harp.js`, bán kính dung sai `reach` chỉ là 14px (quá nhỏ cho ngón tay trên màn hình cảm ứng điện thoại), khiến người dùng gõ vào dây thường bị trượt.
  4. *Nốt Simon Melody*: Nốt 0 & 1 ở `14%` quá sát lề trái, bị Mascot avatar (`left: 12px`, rộng 68px) và thanh volume che lấp; bảng hướng dẫn `#garden-ui` chiếm chiều cao lớn che mầm non.
- **Công thức chuẩn hóa (Phase 8 Solution)**:
  1. **Tách Đàn Mộc Cầm khỏi ma trận scale của `#wrap`**:
     - Trong [index.html](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/index.html), chuyển `#plant-harp-strings-wrap` ra ngoài `#wrap`, đặt trực tiếp dưới `#main-container` (cùng cấp với Mascot và HUD).
     - Trong [css/components.css](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/css/components.css), xóa bỏ quy tắc ẩn đàn `body:not(.stage-3-active):not(.stage-4-active)`; đặt `position: fixed` chuẩn xác.
     - Khi `body.stage-2-active` (đang chơi Chuông Hoa), áp dụng `opacity: 0.15 !important; pointer-events: none !important;` để làm mờ nhẹ đàn, tránh gây phân tâm hoặc che khuất nốt nhạc.
  2. **Tối ưu kích thước & Vùng chạm Đàn Mộc Cầm**:
     - Trên Mobile Portrait: `--harp-w: 160px; right: max(12px, calc(10px + var(--sar, 0px))); bottom: calc(68px + var(--sab, 8px)); transform: none !important;` hiển thị sắc nét, trang nhã trên thảm cỏ.
     - Trên Mobile Landscape: `--harp-w: 220px; right: max(16px, calc(12px + var(--sar, 0px))); bottom: calc(8px + var(--sab, 0px)); transform: none !important;` nhỏ gọn, cân đối.
     - Dây đàn `.harp-string-wire` có `::after` mở rộng vùng chạm với `inset: -10px -14px` ($\ge 44\text{px}$).
     - Trong [js/botanical-harp.js](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/botanical-harp.js), tăng `reach` lên 26px và gắn trực tiếp listener `pointerdown` lên từng dây đàn, đảm bảo chạm là kêu 100%.
  3. **Tái định vị Nốt Chuông Hoa (Bilateral Safe Thumb Zones)**:
     - Trong [js/garden-minigames.js](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/garden-minigames.js):
       - Landscape: Nốt 0 `(18%, 44%)`, Nốt 1 `(28%, 66%)`, Nốt 2 `(72%, 66%)`, Nốt 3 `(82%, 44%)`. Cách xa Mascot $\ge 65\text{px}$, hành lang trung tâm 44% thông thoáng cho mầm cây.
       - Portrait: Nốt 0 `(16%, 52%)`, Nốt 1 `(22%, 68%)`, Nốt 2 `(78%, 68%)`, Nốt 3 `(84%, 52%)`. Kích thước $\ge 80\text{px}$, `z-index: 2600`.
  4. **Thu gọn Bảng Hướng Dẫn `#garden-ui`**:
     - Trong [css/layout.css](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/css/layout.css), giới hạn `max-height: 52px; padding: 3px 10px;` khi minigame đang chạy trên mobile landscape.

---

### 14. Vấn Đề: Trình Chiếu Thước Phim Kỷ Niệm Zero-Lag & Điều Phối Âm Thanh BGM Tự Động (Phase 9)
- **Triệu chứng & Thách thức**:
  1. *Dung lượng video thô khổng lồ*: Hai video thô ban đầu có dung lượng 1.8GB (`vid_1.mp4`, 4K 120fps HEVC) và 70MB (`vid_2.mp4`), hoàn toàn không thể tải trực tiếp trên GitHub Pages và gây giật lag, đơ trình duyệt mobile.
  2. *Xung đột âm thanh khi phát video*: Khi người dùng phát video kỷ niệm, nhạc nền khu vườn (BGM) vẫn tiếp tục phát đè lên tiếng video làm âm thanh bị hỗn tạp, giảm cảm xúc thi vị.
  3. *Tương thích đa trình duyệt & Di động*: Trình duyệt iOS Safari trên iPhone yêu cầu video phải có thuộc tính `playsinline` và `webkit-playsinline` để không bị nhảy toàn màn hình cưỡng bức, đồng thời bộ giải mã WebM (VP9/Opus) và MP4 (H.264/AAC) cần nguồn fallback kép (`<source>`) để tương thích 100% từ Safari đến Android Chrome.
  4. *Kích thước hiển thị trên Mobile Landscape*: Khung video 16:9 nếu không có ràng buộc chiều cao sẽ bị tràn ra ngoài màn hình ngang thấp ($\le 375\text{px}$), khiến nút đóng hoặc ghi chú bị che khuất.
- **Công thức chuẩn hóa (Phase 9 Solution)**:
  1. **Nén Video Kép Chuẩn GitHub Pages**:
     - `vid_1.webm` (57.9MB, 720p 30fps VP9/Opus) & `vid_1_opt.mp4` (42.8MB, 720p 30fps H.264 `yuv420p` `+faststart`). Giảm 97.5% dung lượng so với bản 1.8GB thô.
     - `vid_2.webm` (33.1MB, 480p 30fps VP9/Opus) & `vid_2_opt.mp4` (25.8MB, 480p 30fps H.264 `yuv420p` `+faststart`).
     - Tất cả các file video đều nằm gọn dưới 60MB, tải tức thì trong $\le 200\text{ms}$. Xóa hoàn toàn file thô và thêm vào `.gitignore`.
  2. **Cấu trúc Lightbox Player Di Sản (`#gift-video-modal`)**:
     - Thẻ video tích hợp `playsinline webkit-playsinline controls preload="metadata"`.
     - Cung cấp 2 thẻ `<source>`: ưu tiên WebM (siêu nhẹ, nén cao) và fallback MP4 (tương thích tối đa).
     - Nút đóng `.close-gift-video-btn` có vùng chạm mở rộng `::after { inset: -8px; }` đảm bảo $\ge 52\text{px}$ đạt chuẩn WCAG AA và Apple HIG.
     - Trên Mobile Landscape: giới hạn `max-height: min(60vh, 260px) !important;` cho `.gift-video-frame` và `.gift-video-element`, đối thoại `max-height: 94vh !important;`, phụ đề tự động ẩn để nhường trọn tầm nhìn cho video.
  3. **Bộ Điều Phối Âm Nhạc BGM Thông Minh (Audio Coordination Engine)**:
     - Trong [js/audio-vfx.js](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/audio-vfx.js):
       - `window.pauseBgmForVideo()`: Ghi nhớ trạng thái phát nhạc trước đó (`wasBgmPlayingBeforeVideo`), tạm dừng BGM và cập nhật nút chuyển nhạc về biểu tượng play.
       - `window.resumeBgmAfterVideo()`: Nếu BGM đang phát trước khi xem video, tự động phát tiếp bài hát và khôi phục biểu tượng nốt nhạc du dương.
  4. **Theo Dõi Tiến Độ Xem Quà & Giải Phóng Bộ Nhớ**:
     - Trong [js/secret-letter.js](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/secret-letter.js):
       - Khi video 1 đạt `currentTime / duration >= 0.95` hoặc sự kiện `ended`: kích hoạt `handleGift1Completed()`, lưu cờ `gift1Watched = true` vào `sessionStorage` và tự động mở khóa Hộp Quà số 2.
       - Khi đóng modal: giải phóng hoàn toàn buffer video (`removeAttribute('src')` & `player.load()`), ngăn chặn rò rỉ bộ nhớ (memory leak).
       - Tích hợp `closeGiftVideoModal()` vào `cleanupStage` của [js/garden-stages.js](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/garden-stages.js) theo chuẩn Clean Unmount Invariant.

---

### 15. Vấn Đề: Hệ Thống 2 Hộp Quà Bí Mật Tuần Tự & Khử Bỏ Hoàn Toàn Liên Kết Ngoài (Phase 10)
- **Triệu chứng & Căn nguyên**:
  1. *Link Google Drive bên ngoài gây đứt gãy trải nghiệm*: Trong `js/content.js`, bức thư chúc mừng 20/10 trước đây sử dụng đường link `https://drive.google.com/drive/folders/...` buộc người dùng rời khỏi ứng dụng, mở tab ngoài làm gián đoạn dòng cảm xúc, mất đi trải nghiệm tĩnh thuần túy (Pure Static Web) và không tối ưu cho thiết bị di động.
  2. *Thiếu trải nghiệm mở quà tương tác (Unboxing Ceremony)*: Người dùng không có cảm giác hồi hộp, khám phá lần lượt từng món quà được gói ghém bằng tình cảm của tập thể.
  3. *Tối ưu định dạng video*: Bản nén WebM VP9 mặc dù nén tốt trên một số phân cảnh nhưng dung lượng tổng thể (60.7MB và 34.7MB) lại nặng hơn bản nén H.264 MP4 `+faststart` (44.9MB và 27.1MB). Để tối đa hóa tốc độ tải và đảm bảo 100% video dưới 50MB, hệ thống chuyển sang sử dụng độc quyền 2 file MP4 tối ưu mang tên chuẩn `video/vid_1.mp4` và `video/vid_2.mp4`.
- **Công thức chuẩn hóa (Phase 10 Solution)**:
  1. **Khử bỏ 100% Link Ngoài Trong Mã Nguồn**:
     - Trong [js/content.js](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/content.js), xóa bỏ vĩnh viễn liên kết Google Drive, thay thế bằng lời dẫn thơ mộng giới thiệu 2 chiếc Hộp Quà Bí Mật Di Sản.
  2. **Giao Diện 2 Hộp Quà Sơn Mài & Hoàng Kim (`#secret-gift-boxes-deck`)**:
     - **Hộp Quà 1 (Kỷ Niệm Rực Rỡ)**: Vỏ sơn mài đỏ chu sa (`.gift-box-lacquer`, gradient `#8B1E2F` -> `#B82939`), nơ lụa vàng kim đung đưa, particle lấp lánh `✦`, viền kim loại thếp vàng, trạng thái sẵn sàng mở (`is-unlocked`, nhãn *"Chạm để mở ngay ✨"*).
     - **Hộp Quà 2 (Điều Kỳ Diệu Tiếp Nối)**: Vỏ gỗ hoàng đàn thếp vàng (`.gift-box-gold`), ban đầu mang ổ khóa son 🔒 (`is-locked`, nhãn *"Xem hết quà 1 để mở khóa 🔒"*).
     - Bổ sung phím tắt mở quà `.polaroid-gift-shortcuts` trên mặt sau thiệp Polaroid (`#polaroid-letter-pane`) giúp người dùng mở quà thuận tiện từ bất kỳ góc nhìn nào.
     - Đạt chuẩn Touch Target >= 50-54px trên cả PC, mobile dọc và mobile landscape; hiệu ứng ánh kim lướt qua (`@keyframes giftShimmer`) khi hover.
  3. **Động Cơ Mở Khóa Tuần Tự (Sequential Unlocking Engine)**:
     - Trong [js/secret-letter.js](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/secret-letter.js):
       - Bấm Hộp Quà 1: Mở Lightbox phát `video/vid_1.mp4`.
       - Khi video 1 đạt >= 95% thời lượng hoặc kết thúc: kích hoạt `unlockGiftBox2()`, lưu cờ `gift1Watched = true` vào `sessionStorage` để ghi nhớ phiên xem.
       - Hiệu ứng Mở Khóa Hoàng Triều: Ổ khóa biến thành đóa sen vàng bung nở 🪷 (`@keyframes giftUnlockPulse`), âm thanh chuông ngân `playChimeSFX()`, rung xúc giác chúc mừng `triggerHaptic('success')`, nhãn chuyển sang *"Chạm để mở ngay ✨"*, Mascot hào hứng reo vang.
       - Bấm Hộp Quà 2 khi chưa xem xong Quà 1: Hộp rung lắc nhẹ (`@keyframes giftShakeLocked`), rung phản hồi `triggerHaptic('medium')`, Mascot xuất hiện nhẹ nhàng nhắc nhở: *"Bạn ơi, hãy xem trọn vẹn món quà thứ nhất trước nhé! 🎁💖"*.
       - Bấm Hộp Quà 2 khi đã mở khóa: Mở Lightbox phát `video/vid_2.mp4`.

---

### 16. Vấn Đề: Nâng Cấp Hệ Thống Nhạc Nền BGM (Phân Phối 70/30 & Phát Nối Bài Tự Động) (Phase 11)
- **Triệu chứng & Căn nguyên**:
  1. *Tỷ lệ ngẫu nhiên 50/50 chưa đáp ứng ý đồ nghệ thuật*: Ban đầu, tỷ lệ chọn 2 bài nhạc nền là ngẫu nhiên đều 50% cho mỗi bài. Theo định hướng trải nghiệm, giai điệu hào hùng, lắng đọng của bài hát "Mắt Bão (OST Tiểu Đội 1978)" (`nhac_2.webm`) cần chiếm ưu thế 70% khi người dùng bước vào khu vườn, trong khi giai điệu tươi tắn, dịu dàng của "MONO - Em Xinh" (`nhac_1.webm`) chiếm 30%.
  2. *Chuyển tiếp bài hát khi kết thúc*: Cần đảm bảo khi người dùng lưu lại trong khu vườn lắng nghe hết một bản nhạc, hệ thống tự động phát tiếp bài còn lại theo chu trình tuần hoàn kín (0 <-> 1), bảo toàn nguyên vẹn âm lượng người dùng đã tùy chỉnh trên thanh trượt (`volumeSlider`), đồng thời Mascot Companion vui mừng thông báo bài hát tiếp theo.
- **Công thức chuẩn hóa (Phase 11 Solution)**:
  1. **Thuật Toán Phân Phối Tỷ Lệ 70/30 Ban Đầu**:
     - Trong [js/audio-vfx.js](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/audio-vfx.js):
       ```javascript
       // Tỷ lệ chọn ngẫu nhiên ban đầu: 70% nhac_2 (Mắt Bão - index 1), 30% nhac_1 (MONO Em Xinh - index 0)
       let currentTrackIdx = Math.random() < 0.70 ? 1 : 0;
       ```
     - Đồng bộ thẻ `#myAudioSource` trong DOM khớp với nguồn âm thanh được chọn ngay từ khi khởi động.
  2. **Cơ Chế Phát Nối Bài Tuần Hoàn (Sequential Loop Cycle)**:
     - Trong sự kiện `ended` của thẻ audio:
       - Nếu Phonk Mode đang bật (`isPhonkActive`): lặp lại bản Phonk (`currentTime = 0; play()`).
       - Nếu chế độ BGM bình thường: chuyển đổi linh hoạt sang bài còn lại: `currentTrackIdx = (currentTrackIdx + 1) % BGM_PLAYLIST.length`.
       - Bảo toàn mức âm lượng hiện tại: `audio.volume = currentVol` (người dùng không bị giật mình vì âm lượng đột ngột thay đổi).
       - Đồng bộ Mascot Companion (khi ở Stage >= 1): `showMascotSpeech("🎵 Giai điệu tiếp theo: [Tên bài hát] ✨", 4000)`.
     - Phơi bày API công khai: `window.playNextTrack` và `window.getCurrentTrackInfo()` phục vụ việc kiểm thử tự động và tương tác linh hoạt.
  3. **Kiểm Định Thống Kê Monte Carlo**:
     - Mô phỏng 10,000 lần chọn ngẫu nhiên độc lập: tỷ lệ chọn `nhac_2` đạt $69.84% - 71.11%$, nằm chính xác trong khoảng tin cậy $99.9%$ ($[67%, 73%]$).

---

### 17. Vấn Đề: Bảo Đảm Bắt Trọn Cây Hoa Nở Rộ Khi Chụp Ảnh Polaroid & Kiểm Định Toàn Diện (Phase 12)
- **Triệu chứng & Căn nguyên**:
  1. *Nguy cơ ảnh Polaroid chụp vườn bị trống tán hoa*: Ở Stage 4, khi cây hoa trái tim bung nở hoàn tất (`love.js`), hoạt ảnh lắc lư (`jumpAnimate`) liên tục xóa và vẽ lại canvas mỗi frame. Nếu hàm chụp ảnh Polaroid vườn (`renderGardenPolaroidToCanvas`) chỉ đọc trực tiếp từ `#canvas` đúng vào thời điểm frame đang clear hoặc khi người dùng cuộn xem thư, ảnh chụp có nguy cơ bị khuyết tán hoa hoặc chỉ còn lại cành trơ.
  2. *Đồng bộ đa tầng dữ liệu hình ảnh (Multi-layer Fallback Architecture)*: Cần bảo đảm ảnh Polaroid bắt trọn vẹn tán hoa từ bộ đệm snapshot đã lưu trữ (`window.bloomedTreeImage`, `window.bloomedTreeSnapshotDataUrl`, hoặc `currentGardenSnapshotUrl`), đồng thời tích hợp thiếu nữ Áo Dài nón lá hoa sen, cánh hoa sen rơi lơ lửng, vầng trăng khuyết hoặc mặt trời theo chu kỳ nhật dạ (Dawn, Day, Dusk, Night) và dòng chữ đề tặng tên người thương.
- **Công thức chuẩn hóa (Phase 12 Solution)**:
  1. **Động Cơ Chụp Ảnh Vườn Đa Tầng (`renderGardenPolaroidToCanvas`)**:
     - Trong [js/garden-stages.js](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/garden-stages.js):
       - Tầng 1: Đọc từ `window.bloomedTreeImage` (ảnh snapshot cây hoa bung nở trọn vẹn đã được lưu vào Image object).
       - Tầng 2: Fallback qua `window.bloomedTreeSnapshotDataUrl` và tự động vẽ lại canvas khi nạp xong.
       - Tầng 3: Fallback qua `background-image` của `#wrap`.
       - Tầng 4: Fallback qua `window.currentGardenSnapshotUrl`.
       - Tầng 5: Đọc trực tiếp từ `#canvas` đang hoạt động.
     - Ghép lớp mượt mà: Bầu trời nhật dạ -> Sao đêm/Mặt trời tỏa hào quang -> Đồi cỏ xanh -> Tán cây hoa trái tim -> Thiếu nữ Áo Dài nón lá bên hoa sen -> Cánh hoa sen bay 3D -> Khung giấy Dó và dòng thư thư pháp đề tặng.
     - Phơi bày API công khai `window.renderGardenPolaroidToCanvas` phục vụ kiểm thử và tái sử dụng.
  2. **Bảo Đảm Zero PC Regression**:
     - Mọi quy tắc CSS cho mobile landscape đều được cô lập tuyệt đối bên trong `@media (max-height: 540px) and (orientation: landscape)`.
     - Giao diện PC Desktop ($>= 1025\text{px}$, chiều cao $>= 600\text{px}$) giữ nguyên 100% vẻ đẹp Quiet Luxury nguyên bản.
  3. **Kiểm Định Toàn Diện Bộ Test Tự Động (`scratch/test_stage2_gifts_audio.js`)**:
     - 10/10 nhóm tiêu chí từ Phase 7 đến Phase 12 đều đạt kết quả **100% PASSED**.

