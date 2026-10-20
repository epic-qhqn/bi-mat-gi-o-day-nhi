# PROJECT ARCHITECTURE & ENGINEERING RULES (BỘ QUY TẮC BẤT BIẾN)
> **Dự án**: Điều Bí Mật Epic - Interactive Floral Web Experience (20/10 Special Edition)  
> **Kiến trúc**: 100% Full-Static Modular Web (Client-Side Only, GitHub Pages Ready)  
> **Phiên bản chuẩn hóa**: v2.0 Architecture & Quiet Luxury Atelier Master Standard  

---

## 1. NGUYÊN TẮC KIẾN TRÚC & CÔNG NGHỆ (100% STATIC WEB)

1. **Thuần Client-Side 100%**:
   - Sử dụng độc quyền: **HTML5 Semantic**, **Vanilla CSS3**, **Modern ES6+ JavaScript**, **Web Audio API**, **Canvas 2D API**, **Inline SVG**.
   - **Tuyệt đối KHÔNG sử dụng**: Node.js/npm runtime khi deploy, Webpack/Vite/Babel, framework nặng (React/Vue/Angular), server backend (Node/PHP/Python), SSR hay database.
   - **Tuyệt đối KHÔNG có lệnh gọi API bên ngoài**: Không `fetch()`, không `XMLHttpRequest` phụ thuộc server mạng. Toàn bộ tài nguyên (lời chúc, âm thanh synthesizer, canvas, thuật toán ngẫu nhiên) hoạt động ngoại tuyến (offline-ready) hoặc chạy mượt mà trên static web host (GitHub Pages, Cloudflare Pages, Vercel Static).

2. **Quy định Vệ sinh Thư mục Gốc (Clean Workspace Root)**:
   - Thư mục dự án chỉ chứa tài nguyên mã nguồn thực sự cần thiết (`index.html`, `css/`, `js/`, `img/`, `audio/`, `tasks/`, `.antigravity/`).
   - **CẤM để lại bất kỳ file script kiểm thử (`test_*.js`, scratchpad, file debug tạm) trong thư mục dự án**. Mọi script kiểm thử tự động, chẩn đoán CDP phải lưu trong thư mục scratch của agent (`<brain>/scratch/`) và tự động dọn dẹp sau khi nghiệm thu.

---

## 2. BẢN ĐỒ MÃ NGUỒN & PHÂN ĐỊNH TRÁCH NHIỆM (MODULAR ARCHITECTURE)

### A. Tầng Cấu Trúc HTML (`index.html`)
- Semantic layout phân lớp rõ ràng: Sky Backdrop ➔ Canvas `#wrap` ➔ DOM HUD & Minigame Overlays ➔ Bottom System Dock ➔ Modals.
- Nạp CSS và JS theo thứ tự tuần tự không phụ thuộc bundler.

### B. Tầng Giao Diện CSS (`css/` - Tách 3 File Lớn Logic)
1. [**`base.css`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/css/base.css):
   - Toàn bộ Design Tokens (`:root`: Safe Areas `--sat/--sab`, bảng màu Atelier `#FAF8F5`, `#131C4E`, `#F5CE56`, viền `#DCE3F2`, bo góc `--radius-pill/panel`, typography `--font-ui/script`).
   - CSS Reset, typography defaults (`Outfit` & `Dancing Script`), và các atomic utilities (`.lyrical-panel`, `.portal-badge`, `.lyrical-btn`, `.lyrical-input`, `.hidden`).
   - Universal Shared Keyframes (`@keyframes attentionPulse`, `badgeBounceGlow`, `zoom-in-lock`, `shake`, `toast-slide-in`).
2. [**`layout.css`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/css/layout.css):
   - Không gian hiển thị & kiểm soát tràn viền (`#main-container`, `#wrap`, `#canvas`, `#error`).
   - Hệ thống nền trời chuyển sắc 4 thì (`.sky-background`, `.sky-gradient`, `.layer-dawn/day/dusk/night`, mặt trời, mặt trăng, sao trời, đom đóm, cực quang, sao băng, đàn chim hoàng hôn).
   - Phân vùng không gian (Spatial Zoning): Top HUD, Bottom System Dock (`.bottom-system-dock`, `.music-panel`, `.floating-action-pills`), bảng đọc thư máy chữ (`#text`, `#code`, `.say`, `.space`), và lớp nền che phủ modal (`.modal-overlay`).
3. [**`components.css`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/css/components.css):
   - Toàn bộ giao diện các module tương tác: Cổng thời gian (`#time-lock-modal`), Atelier dập tên & dấu sáp son (`#name-modal`), Bàn đun sáp nến & thìa đồng, Hạt mầm ánh sáng thức tỉnh, Công cụ tưới nước/bón phân, Cụm mây mưa & vệt nắng (`#living-atmosphere-hud`), Đàn hạc thực vật 5 dây (`#plant-harp-strings-wrap`), Bánh xe thiên văn 360° Orrery (`#celestial-weather-orrery`), Minigame Simon & Constellation, Robot Mascot (`#garden-mascot-companion`), Thẻ Polaroid thư tình (`#secret-letter-modal`), Vé du hành photobooth (`#boarding-pass-modal`), Thanh chọn giai đoạn Replay (`#garden-stage-selector`), cùng toàn bộ Media Queries responsive của từng component.

### C. Tầng Logic JavaScript (`js/` - 15 Module Độc Lập)
1. [**`content.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/content.js): Kho dữ liệu lời chúc markdown, danh sách 8 thẻ bài bí mật ngẫu nhiên (`secretLettersDeck`), 12 hồ sơ hoa tính cách (`flowerPersonalityProfiles`).
2. [**`audio-vfx.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/audio-vfx.js): Động cơ âm thanh tổng hợp thuần Web Audio API (chime, click, bubble pop, candle light, wax drop, paper tear, gear tick, sweep glide) & bộ quản lý nhạc nền BGM.
3. [**`environment.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/environment.js): Chu kỳ ánh sáng tự nhiên 4 thì (Dawn, Day, Dusk, Night) và hiệu ứng thiên văn.
4. [**`mascot-companion.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/mascot-companion.js): Robot EPIC Cutout 2D: cử động thở, pháo nước Hydro, đũa phép sao, bong bóng thoại ngữ cảnh và tương tác nhảy ăn mừng.
5. [**`wax-seal-ceremony.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/wax-seal-ceremony.js): Cổng khóa thời gian mật mã, khuôn dập đồng nổi tên người nhận, thắp nến thơm, thả viên sáp đỏ ruby & vàng pearl, khuấy vân cẩm thạch marbled, dập triện son và bung tỏa hạt mầm ánh sáng thức tỉnh khu vườn.
6. [**`atmosphere-shifter.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/atmosphere-shifter.js): Cụm điều khiển kéo mây gọi mưa sương mai rơi hạt sỏi và kéo vệt nắng ban mai sưởi ấm rễ cây với hiệu ứng chạm terrarium ASMR.
7. [**`botanical-harp.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/botanical-harp.js): Đàn hạc thực vật 5 dây pha lê: gảy dây, vuốt glissando liên hoàn, nốt nhạc phát quang bay lượn.
8. [**`celestial-orrery.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/celestial-orrery.js): Bánh xe thiên văn 360° Celestial Orrery: kim xoay chỉ 4 góc mùa/khí hậu, click góc phần tư mượt mà, kéo thả chuột/cảm ứng, điều khiển phím mũi tên.
9. [**`garden-minigames.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/garden-minigames.js): 2 Minigame: Hòa âm Simon (Giai điệu tình yêu) và Nối chòm sao định mệnh (Constellation Linker với sao ảo decoy).
10. [**`garden-stages.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/garden-stages.js): Quản lý vòng đời tiến trình sinh trưởng cây hoa từ Stage 1 đến Stage 4, bộ dọn dẹp sạch sẽ `cleanupStage`, và thanh công cụ Replay Stage Selector.
11. [**`secret-letter.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/secret-letter.js): Động cơ máy chữ gõ thư trên thân cây hoa, Modal thẻ ảnh Polaroid 3D lật mặt rút thư ngẫu nhiên không trùng, nút chuyển đổi font viết tay/dễ đọc.
12. [**`boarding-pass-modal.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/boarding-pass-modal.js): Modal Vé du hành 20/10: đồng bộ tên người nhận, đổi hoa tính cách, tải ảnh selfie vào nhụy hoa, xé cuống vé lấp lánh, nghiêng thẻ 3D hologram foil và sao chép lời chúc.
13. [**`boarding-pass-canvas.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/boarding-pass-canvas.js): Động cơ Canvas 2D Retina 1080x1920: kết xuất ảnh vé Story sắc nét chất lượng cao tải về máy hoặc chia sẻ mạng xã hội.
14. [**`love.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/love.js): Động cơ toán học vẽ cây hoa tim vector (Tree Canvas Engine) trên không gian nội bộ 1100x680.
15. [**`main.js`**](file:///c:/Users/kishikuun/Documents/dieu-bi-mat-epic/js/main.js): **Orchestrator tinh gọn (~280 dòng)**: Khởi tạo cây hoa Canvas, điều phối tiến trình sinh trưởng cây qua Promise (`awaitNextStage`/`triggerNextStage`), công cụ kéo thả dự phòng Stage 0, và bộ thích ứng co giãn thông minh (Smart Autoscale Engine).

---

## 3. QUY TẮC THUẬT TOÁN ĐỘNG & NGẪU NHIÊN THẬT SỰ (TRULY PROCEDURAL GENERATION)

> **CẤM TRIỆT ĐỂ VIỆC HARDCODE DỮ LIỆU CỐ ĐỊNH HOẶC LẶP LẠI NHÀM CHÁN**. Mọi phiên trải nghiệm của người dùng phải mang tính độc bản, tươi mới và ngẫu nhiên thông minh.

1. **Phase 2: Hòa âm Simon (Giai Điệu Tình Yêu)**:
   - **Giai điệu ngẫu nhiên không trùng lặp**: Chuỗi nốt Simon (4-5 nốt) được sinh ngẫu nhiên theo thời gian thực và kiểm tra với `sessionStorage.getItem('last_simon_seq')`. Tải lại trang sẽ sinh chuỗi nốt mới.
   - **Tọa độ nốt động theo Cung Bán Nguyệt An Toàn (Safe Celestial Arc)**: 4 nốt nhạc được định vị ngẫu nhiên trong 4 ô cánh cung (top 20%-42%, left 28%-72%), tuyệt đối không bao giờ trùng lên mầm cây (top 50%+), linh vật mascot (góc dưới) hay thanh HUD trên cùng.
   - **Bảng âm sắc hợp âm đa dạng**: Tự động chuyển đổi giữa 4 trường phái hòa âm (Canon in D, Pop Anime Maj7, Neo-Soul Lofi, Ghibli Pentatonic).
   - **Cố định vị trí khi bấm sai (Fixed Node Memory)**: Nếu người dùng bấm sai, tọa độ 4 nốt giữ nguyên vị trí trực quan, chỉ phát lại giai điệu mẫu để người dùng ghi nhớ không gian. Nút `#simon-replay-btn` cho phép nghe lại chủ động.

2. **Phase 3: Chòm Sao Định Mệnh & Ngôi Sao Ảo (Constellation Linker)**:
   - **Phân bổ khoảng cách Poisson-Disk Sampling**: 5 ngôi sao thật và 2 ngôi sao ảo được tính toán khoảng cách Euclidean tối thiểu (`minDistance >= 88px` trên không gian 1100x680). Tuyệt đối không bao giờ có 2 ngôi sao bị chồng đè lên nhau.
   - **Kho hình mẫu chòm sao đa dạng (Archetypes Deck)**: Luân phiên không lặp lại giữa các chòm sao (*Corona Borealis*, *Cygnus Wings*, *Lyra Harp*, *Celestial Heart*, *Ursa Dipper*).
   - **Cơ chế Ngôi sao ảo (Decoy Stars)**: Khi người dùng bấm nhầm vào sao ảo, sao ảo rung lắc (`.wrong`), bốc khói tan biến (`.decoy-smoke-puff`), phát âm thanh sương mù ma thuật (`playDecoyMistSFX`), và Mascot robot động viên vui vẻ. Sao ảo biến mất sạch sẽ, không chặn tiến trình nối sao từ 1 đến 5.
   - **Độ nhạy cảm ứng mở rộng (Apple HIG min 48px)**: Vùng đón chạm nối sao được mở rộng với bán kính dung sai 72px và `::after` padding -20px, bảo đảm ngón tay vuốt nối sao mượt mà không bị hụt.

3. **Phase 4: Bánh Xe Thiên Văn 360° (Celestial Weather Orrery) & Ngôi Sao Phương Bắc (Celestial Lodestar)**:
   - Kim la bàn xoay 360° tự do liên tục, phản hồi góc quay thời gian thực, có âm thanh bánh răng ticking ASMR chân thực.
   - 4 cung khí hậu mùa (*Xuân - Mưa sương mai 45°*, *Hạ - Nắng ấm hoàng kim 135°*, *Thu - Gió biếc thu 225°*, *Đông/Đêm - Cực quang tinh tú 315°*), kích thích chồi non phát triển.
   - **Thiên thể phương bắc lung linh (Celestial Lodestar)**:
     - Khi hoàn thành giai đoạn hoặc chuyển cảnh (Stage 2 Simon, Stage 3 Constellation, Stage 4 Full Blossom), la bàn Orrery tự động thu nhỏ (`.orrery-minimized`) thành một ngôi sao la bàn 8 cánh bằng vàng khảm viền ngọc biển (`#orrery-lodestar-btn`) kích thước 44px (38px trên mobile).
     - Lodestar hiển thị pip biểu tượng mùa hiện tại, phát ánh hào quang thở nhẹ nhàng (`lodestar-pulse-idle`).
     - Người dùng có thể chạm vào nút Lodestar bất kỳ lúc nào để mở lại la bàn xoay 360°, hoặc bấm nút đóng `✕` trên la bàn để thu gọn lại.
     - Public APIs: `window.minimizeCelestialOrrery()`, `window.expandCelestialOrrery()`, `window.toggleCelestialOrrery()`.

4. **Thẻ Thư Bí Mật & Hồ Sơ Hoa Kỷ Niệm**:
   - Rút ngẫu nhiên từ kho 8 bức thư không trùng lặp (`getNextRandomLetter()`), đảm bảo mỗi lần lật thẻ Polaroid hoặc bấm nút đổi thư là một thông điệp mới.
   - Rút ngẫu nhiên từ kho 12 loài hoa tính cách 20/10 độc bản (`getNextFlowerProfile()`).

---

## 4. QUY TẮC VÒNG ĐỜI GIAO DIỆN & CHỐNG CHỒNG LẤN (STRICT LIFECYCLE & ZERO OVERLAP)

1. **Nguyên tắc "Dùng Xong Phải Biến Mất" (Clean Unmount Policy)**:
   - Hàm `cleanupStage(stageId)` trong `garden-stages.js` là người gác cổng tối cao.
   - Khi một giai đoạn hoàn thành hoặc người dùng chuyển stage qua Replay Toolbar, toàn bộ công cụ, cụm mây/nắng, nốt nhạc Simon, ngôi sao chòm sao, đường kẻ chỉ dẫn của giai đoạn trước **BẮT BUỘC** phải bị ẩn hoàn toàn (`display: none; opacity: 0; pointer-events: none;`) hoặc dọn sạch khỏi DOM.
   - Tuyệt đối không để lại bất kỳ tàn dư giao diện nào trôi nổi che lấp giai đoạn tiếp theo.

2. **Quy tắc Phân Vùng Không Gian (Spatial Zoning System)**:
   - **Khu vực Đỉnh (Top Zone - `top: 18px + var(--sat)`)**:
     - Góc trái: Thanh Replay Stage Selector (`#garden-stage-selector`) hoặc Chỉ số giai đoạn (`#garden-ui`). Khi Replay Selector hiện, Garden UI ẩn đi để tránh xung đột.
     - Góc phải: Bánh xe thiên văn Orrery (`#celestial-weather-orrery`).
   - **Khu vực Trung tâm (Center Canvas)**: Dành riêng cho Cây tình yêu và Minigame đang hoạt động.
   - **Khu vực Đáy (Bottom System Dock)**:
     - Nút Âm lượng (`.music-panel`) và Nút Mở Vé du hành (`#open-boarding-pass-btn`) nằm ở các vị trí cố định, có khoảng cách an toàn, không bao giờ bị đè lấn.
     - Thẻ Polaroid Thư bí mật (`#secret-letter-modal`) hiển thị dưới dạng modal độc lập với backdrop mờ riêng biệt, có nút đóng `✕` và hỗ trợ phím `Escape`.
   - **Điều phối Robot Mascot (`.relocated-for-letter`)**: Khi cây nở hoa và thẻ Polaroid xuất hiện ở góc phải, Robot Mascot tự động trượt sang góc trái màn hình và lật hướng nhìn vào giữa cây, triệt tiêu 100% khả năng che lấp thư.

3. **Thứ bậc Lớp Hiển Thị Chuẩn Hóa (Stacking Context & Z-Index)**:
   - `z-index: -2` / `0`: Nền trời `sky-background` và các lớp chuyển màu
   - `z-index: 10`: Canvas 2D vẽ cây hoa tim
   - `z-index: 100`: Các tầng hiệu ứng thiên nhiên (mưa, phấn hoa, cầu vồng, đàn hạc)
   - `z-index: 500`: HUD thông điệp sinh trưởng (`#garden-ui`)
   - `z-index: 1000`: Robot Mascot (`#garden-mascot-companion`)
   - `z-index: 1005`: Bánh xe thiên văn Orrery (`#celestial-weather-orrery`)
   - `z-index: 2000`: Thanh công cụ Replay (`#garden-stage-selector`)
   - `z-index: 2500`: Lớp tương tác Minigame (Simon nodes, Constellation stars & lines)
   - `z-index: 5000`: Thanh Dock đáy hệ thống (Music toggle, Boarding pass floating trigger)
   - `z-index: 9999+`: Toàn bộ các Modal toàn màn hình (Atelier, Boarding pass ticket, Time lock, Orientation hint)

---

## 5. QUY TẮC THIẾT KẾ ĐỒNG NHẤT (QUIET LUXURY ATELIER MASTER SYSTEM)

1. **Triệt tiêu phong cách lòe loẹt**:
   - Cấm triệt để màu neon cyberpunk, cấm viền đứt nét xoay lòe loẹt, cấm bóng đổ đen đặc nhòe nhoẹt.
2. **Bảng màu Atelier Master**:
   - **Nền ngày**: Cream Giấy Mỹ Thuật Vân Mây `#FAF8F5`.
   - **Nền đêm**: Midnight Navy Sâu Thẳm `#131C4E`.
   - **Điểm nhấn hoàng kim**: Honey Gold `#F5CE56` & Imperial Gold `#D4AF37`.
   - **Điểm nhấn son**: Ruby Velvet Son `#B83240` & Sáp thơm `#7A1822`.
   - **Đường viền biên tập**: 1.5px solid `#DCE3F2` sắc nét tinh tế.
3. **Typography chuẩn mực**:
   - UI toàn diện, nhãn, nút bấm, hướng dẫn: Google Fonts `Outfit` (sans-serif hiện đại, thanh thoát).
   - Thư chúc, lời nhắn cảm xúc: Google Fonts `Dancing Script` (cursive uyển chuyển).
   - Mã số vé, tọa độ: `SF Mono`, Consolas monospace.
4. **Chuẩn hóa Bo góc & Glassmorphism**:
   - Nút bấm, pills, badge: `border-radius: 999px` (Pill shape).
   - Panel, thẻ bài, modal: `border-radius: 24px` với viền 1.5px.
   - Glassmorphism: `backdrop-filter: blur(16px); background: rgba(250, 248, 245, 0.94);` (ngày) hoặc `rgba(19, 28, 78, 0.92);` (đêm).

---

## 6. QUY TẮC TỐI ƯU CẢM ỨNG, RESPONSIVE & THIẾT BỊ DI ĐỘNG (MOBILE-FIRST)

1. **Tiêu chuẩn Tuyệt đối Không Tràn Ngang (Zero Horizontal Overflow Constraint)**:
   - Trên mọi độ phân giải (đặc biệt là Mobile Portrait 390px x 844px iPhone 14), `document.documentElement.scrollWidth` **BẮT BUỘC** phải luôn bằng `390px` (`scrollWidth <= clientWidth`).
   - Mọi container nền cố định (`.sky-background`, `#main-container`) **BẮT BUỘC** phải có:
     ```css
     position: fixed; inset: 0; width: 100vw; height: 100vh;
     overflow: hidden !important; contain: strict; pointer-events: none;
     ```
   - Mascot Companion trên mobile: Dùng `position: fixed` neo góc dưới màn hình với Safe Area Insets (`var(--sab)`, `var(--sar)`).
   - Bong bóng thoại Mascot: Neo mở rộng hướng vào tâm màn hình (`right: 0; transform-origin: bottom right; max-width: min(260px, calc(100vw - 32px)); white-space: normal;`), triệt tiêu hoàn toàn lỗi dịch tâm `left: 50%` làm tràn lề phải.
   - Vầng sáng hào quang Mascot: Giới hạn chiều rộng linh hoạt `width: clamp(100px, 24vw, 135px); right: 20px;`.
   - Trên mobile landscape (xoay ngang `max-height: 540px`): Mascot tự động thu gọn `clamp(68px, 11vw, 92px)`, bong bóng thoại font `0.72rem`.

2. **Hệ thống Co Giãn Tách Biệt Thông Minh (Decoupled Smart Autoscale Engine)**:
   - Hàm `resizeWrap()` trong `main.js` tính toán tỷ lệ `scale` độc lập:
     - **Desktop Widescreen (16:9, 16:10, 21:9)**: Fit theo chiều cao `scale = vHeight / 680`, loại bỏ hoàn toàn viền đen thừa, cây nở hoa trọn vẹn từ đất lên trời.
     - **Mobile Portrait (390px)**: Fit theo chiều rộng `scale = (vWidth * 0.96) / 1100`, đẩy cây lên nửa trên màn hình (`top: 38%`), dành nửa dưới thoáng đãng cho thẻ đọc thư.
     - **Mobile Landscape (<= 540px)**: `scale = Math.min((vWidth * 0.94) / 1100, Math.max(180, vHeight - 76) / 680)`, nâng `#wrap` lên `top: 44%`, tạo khoảng thở an toàn không chạm lên thanh Dock đáy hệ thống.
   - Lắng nghe sự kiện `resize` (có debounce 120ms) và `orientationchange` (staged 150ms & 350ms) để tái bố cục hoàn hảo khi người dùng xoay màn hình.

3. **Chế độ Nhận Diện Máy Yếu, Tiết Kiệm Pin & Âm Thanh iOS (Low-End & Battery Saver Engine)**:
   - Biến toàn cục `window.isLowEndDevice` tự động phát hiện phần cứng (`navigator.hardwareConcurrency <= 4`, `navigator.deviceMemory <= 4` hoặc `prefers-reduced-motion`).
   - Giảm tải số lượng hạt hiệu ứng: Cánh hoa rơi tối đa 8 cánh (so với 18 trên máy mạnh), vệt mưa rơi 18 vệt (so với 36), phấn hoa vàng 14 hạt (so với 28).
   - Theo dõi `document.hidden` qua sự kiện `visibilitychange`: Tự động ngắt vẽ đường nối sao và đưa vòng lặp rơi hoa vào chu kỳ ngủ đông (`await sleep(500)`), ngắt 100% phụ tải CPU/GPU khi tab ẩn.
   - Tự động khôi phục Web Audio Context khi quay lại tab hoặc chạm màn hình.

---

## 7. TIÊU CHUẨN KIỂM THỬ TỰ ĐỘNG & NGHIỆM THU (TESTING CONTRACT)

1. **Kiểm thử cú pháp tự động**:
   - Trước khi nghiệm thu bất kỳ thay đổi nào, **BẮT BUỘC** phải chạy kiểm tra cú pháp trên toàn bộ 15 file JavaScript trong `js/` bằng lệnh:
     ```powershell
     Get-ChildItem js/*.js | ForEach-Object { node -c $_.FullName }
     ```
   - Tất cả các file phải vượt qua với exit code 0.

2. **Kiểm thử tự động thực tế qua Chrome DevTools Protocol (CDP)**:
   - Mọi tính năng mới (UI, âm thanh, kéo thả, minigame, responsive) phải được kiểm chứng qua headless Chrome thực tế bằng CDP.
   - Bộ kiểm thử E2E phải xác thực 7 luồng liên hoàn (Flow 1 đến Flow 7):
     1. Khởi tạo và tương tác không phát sinh exception console (0 console errors).
     2. Đóng/mở modal mượt mà và dọn dẹp sạch sẽ (Zero-overlap lifecycle).
     3. Khả năng tiếp cận bằng bàn phím (Keyboard accessibility) và cảm ứng touch (WCAG tap targets >= 38px).
     4. Thử nghiệm trên ma trận 10 cấu hình thiết bị (iPhone, iPad, Android, Laptop, Desktop cả dọc lẫn ngang): `scrollWidth <= clientWidth` (0px horizontal overflow).

3. **Vị trí lưu trữ file test & Quy định Vệ sinh Thư mục Gốc**:
   - Mọi script kiểm thử tự động CDP phải lưu trong thư mục scratch của agent:
     `C:\Users\kishikuun\.gemini\antigravity-ide\brain\<conversation-id>\scratch\`
   - Tuyệt đối không lưu vào thư mục gốc của repository. Toàn bộ thư mục dự án luôn giữ trạng thái sạch sẽ 100%, sẵn sàng deploy trực tiếp lên GitHub Pages.

