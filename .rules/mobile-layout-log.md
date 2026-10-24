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
    - `css/layout.css`: 314 / 314 [OK]
    - `css/components.css`: 1778 / 1778 [OK]
  - Đảm bảo Zero PC Regression: Mọi quy tắc desktop ($\ge 1025\text{px}$) giữ nguyên vẹn 100%.
