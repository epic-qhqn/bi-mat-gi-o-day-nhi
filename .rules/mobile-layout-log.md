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
