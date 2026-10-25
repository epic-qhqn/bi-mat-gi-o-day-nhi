# TODO: ĐẠI TU TOÀN DIỆN LỖI MOBILE & CHỐNG VA CHẠM GIAO DIỆN ĐA THIẾT BỊ (MOBILE OVERHAUL & ZERO PC REGRESSION)

> **Mục tiêu**: Thực thi lộ trình 5 giai đoạn trong `tasks/plan.md` nhằm khắc phục 100% các lỗi mobile thực tế (từ 7 ảnh chụp trên iPhone 14 và máy Android qua Safari, Cốc Cốc, Chrome) và các lỗi mã nguồn tiềm tàng.  
> **Cam kết**: Zero PC Regression (100% không đụng vào UI trên PC Desktop), Touch Target $\ge 48\text{px}$, 100% Client-Side Pure Static Web.

---

### Phase 1: Chống Va Chạm Dock Trên, Khí Hậu Tự Nhiên & Linh Vật (Top Dock & Atmosphere HUD Anti-Collision)
- [x] 1.1: Tinh chỉnh khoảng cách dock góc phải trong `css/components.css`: chuyển `#top-experiential-dock` sang `right: calc(68px + var(--sar, 8px))` để triệt tiêu 100% va chạm giữa nút Kim chỉ nam (Orrery Lodestar) và nút Chụp ảnh (Camera Capture) trên mọi thiết bị mobile.
- [x] 1.2: Mở rộng khoảng cách 2 token khí hậu trong mobile landscape (`width: calc(100vw - 32px - var(--sal, 0px) - var(--sar, 0px))`) và ẩn nhãn chữ `.shifter-pill-label` rườm rà để không bao giờ đè lên bảng thông báo `#garden-ui`.
- [x] 1.3: Thêm quy tắc CSS cưỡng chế ẩn `#living-atmosphere-hud` ở Stage 2, 3 và 4 (`display: none !important; opacity: 0 !important;`) trong `css/layout.css` và `css/components.css`; cập nhật hàm chuyển cảnh trong `js/garden-stages.js`.
- [x] 1.4: Nâng vị trí Linh vật Mascot trong mobile landscape lên `bottom: calc(56px + var(--sab, 0px))` trong `css/components.css`, triệt tiêu hoàn toàn sự tiếp xúc/va chạm với thanh nhạc đáy màn hình `.bottom-system-dock`.

#### Checkpoint 1: Sau Phase 1
- [x] Không còn bất kỳ sự chồng chéo nút nào ở góc trên bên phải (Orrery vs Camera).
- [x] Token Mây Mưa và Nắng Vàng không đè lên bảng `#garden-ui` ở Stage 1 và biến mất hoàn toàn khi sang Stage 2.
- [x] Linh vật Mascot đứng tách biệt rõ ràng phía trên thanh âm thanh.

---

### Phase 2: Tái Thiết Kế Không Gian Stage 2 Chuông Hoa (Simon Melody Spatial Redesign)
- [x] 2.1: Tinh gọn bảng hướng dẫn `#garden-ui` ở Stage 2 trong `css/layout.css`: giới hạn chiều cao $\le 56\text{px}$ trên landscape, thu nhỏ nút "Nghe lại chuông" (`#simon-replay-btn`) dạng icon $36\text{px} \times 36\text{px}$ gọn gàng.
- [x] 2.2: Thay đổi tọa độ sinh 4 nốt chuông hoa trong `js/garden-minigames.js`: dời từ vùng $t: 34\% - 36\%$ xuống 2 vùng an toàn hai bên cánh gà ($t \ge 52\% - 70\%$, $l \in [14\%, 22\%]$ và $[78\%, 86\%]$), đảm bảo khoảng cách đến `#garden-ui` luôn $\ge 120\text{px}$.
- [x] 2.3: Đảm bảo vùng cảm ứng `hitbox` của mỗi nốt `.simon-node` đạt $\ge 50\text{px}$ qua pseudo-element `::after` (inset -16px landscape, -22px portrait) và kiểm tra hoạt động trơn tru của nút Bỏ qua cứu nguy `#simon-skip-btn` sau 5 lần sai hoặc 40 giây.

#### Checkpoint 2: Sau Phase 2
- [x] 100% nốt chuông hoa sinh ra ở vùng trống thoáng đãng bên dưới hai bên cánh gà, không bao giờ bị `#garden-ui` che khuất.
- [x] Người chơi chạm vào nốt phản hồi âm thanh ngũ cung tức thì, không bị nuốt touch.

---

### Phase 3: Đại Tu Bố Cục Màn Hình Dọc - Mặt Trời, Cây & Mặt Đất (Portrait Horizon Overhaul)
- [x] 3.1: Thêm quy tắc CSS trong `@media (max-width: 768px) and (orientation: portrait)` tại `css/layout.css`: neo giữ các thiên thể `.celestial-body.sun`, `.sun-dawn`, `.sun-dusk`, `.moon` ở vùng trời cao `top: 12% - 14%`, xóa bỏ lỗi mặt trời chìm xuống dưới rễ cây.
- [x] 3.2: Tinh chỉnh nét vẽ của `Footer` trong `js/love.js`: kiểm tra viewport dọc hoặc cấu hình màu, thay thế đường kẻ đen đặc `rgb(35, 31, 32)` bằng màu sương mờ `rgba(106, 141, 115, 0.25)` đồng điệu với màu thảm cỏ, xóa bỏ vết nứt đen lơ lửng giữa trời.
- [x] 3.3: Cân chỉnh vị trí `#wrap` trong portrait tại `css/layout.css` và bổ sung dải chuyển tiếp chân trời mềm mại giúp gốc cây cắm rễ tự nhiên vào mặt đất mẹ.

#### Checkpoint 3: Sau Phase 3
- [x] Mặt trời/mặt trăng ở đúng 1/4 trên cùng của bầu trời trên iPhone 14 và mọi máy dọc.
- [x] Cây hoa và mặt đất kết nối tự nhiên, không còn đường kẻ đen thô cứng cắt ngang bầu trời.

---

### Phase 4: Sửa Triệt Để Lỗi Chụp Ảnh Màn Hình Polaroid (Instant Garden Capture Engine)
- [ ] 4.1: Tại `js/main.js` hàm `moveAnimate()`: bắt snapshot cây nở hoa hoàn mỹ lưu vào `window.bloomedTreeSnapshotDataUrl` và nạp vào đối tượng ảnh `window.bloomedTreeImage` trước khi chuyển sang `jumpAnimate()`.
- [ ] 4.2: Tái cấu trúc hàm `renderGardenPolaroidToCanvas` trong `js/garden-stages.js`: vẽ hình ảnh cây nở hoa từ `window.bloomedTreeImage` hoặc `canvas.parentNode.style.backgroundImage` vào khung ảnh Polaroid trước khi vẽ cánh hoa rơi và thiếu nữ Áo Dài.
- [ ] 4.3: Tối ưu hóa tải ảnh và tương thích chia sẻ ảnh trên Safari iOS (`navigator.share` hoặc fallback mở tab mới) và Cốc Cốc.

#### Checkpoint 4: Sau Phase 4
- [ ] Bấm nút 📸 "Lưu Khoảnh Khắc", bức ảnh Polaroid xuất hiện và ảnh tải về chứa trọn vẹn 100% cây hoa trái tim nở rực rỡ, không bị rỗng như trong ảnh lỗi.
- [ ] Hoạt động trơn tru trên cả iPhone Safari, Cốc Cốc và Chrome Android.

---

### Phase 5: Bọc Khung Giới Hạn Hộp Thoại & Kiểm Thử Toàn Diện (Overlay Bounds & Comprehensive Verification)
- [ ] 5.1: Cấu hình giới hạn chiều cao `max-height: min(92dvh, 92vh)` và `overflow-y: auto` cho `.rotate-device-card` trong `css/components.css`; thu gọn kích thước mô hình điện thoại xuống 64px trong landscape để nút "Tiếp tục ở góc nhìn hiện tại" hiển thị 100% không bị che khuất trên trình duyệt có tab.
- [ ] 5.2: Tối ưu Bàn chế tác dập sáp Stage 0 trên mobile portrait: đưa 4 nút hoa văn triện về 1 hàng 4 cột cân xứng (`flex: 1 1 0`), thu gọn khoảng cách padding giúp người dùng Safari cuộn mượt mà và dễ dàng nhấn nút dập sáp.
- [ ] 5.3: Xây dựng script kiểm thử tự động toàn diện `scratch/test_mobile_overhaul_regression.js`:
  - Kiểm tra va chạm tọa độ giữa Simon nodes và `#garden-ui` ($\ge 70\text{px}$).
  - Kiểm tra va chạm giữa Orrery và Dock Camera ($\ge 10\text{px}$).
  - Kiểm tra va chạm giữa Mascot và Bottom Audio Dock ($\ge 10\text{px}$).
  - Kiểm tra vị trí mặt trời/mặt trăng trong media query portrait ($top \le 16\%$).
  - Kiểm tra logic cache cây nở hoa và vẽ ảnh chụp Polaroid.
  - Kiểm tra cân bằng tuyệt đối dấu ngoặc `{}` trên tất cả các file CSS.
  - Kiểm tra cú pháp JS (`node -c js/*.js`).
  - Kiểm tra Zero PC Regression (100% CSS Desktop không bị ảnh hưởng).
- [ ] 5.4: Thực hiện quy trình Git 3-Dev: `git fetch --all --prune`, giải quyết xung đột với commit đồng đội (nếu có), commit trên nhánh feature `feat/mobile-device-overhaul-fixes` sạch sẽ.

#### Checkpoint 5: Hoàn Tất Bàn Giao
- [ ] Khắc phục triệt để 100% lỗi từ 7 bức ảnh chụp thực tế và các lỗi tiềm tàng.
- [ ] Đạt 100% tiêu chí kiểm thử tự động.
- [ ] Giao diện Desktop PC giữ nguyên vẹn 100% (Zero PC Regression).
