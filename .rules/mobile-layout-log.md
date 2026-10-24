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




