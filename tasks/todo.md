# TODO: KHẮC PHỤC TRIỆT ĐỂ BUGS PC & MOBILE, HỘP QUÀ BÍ MẬT TUẦN TỰ & NÂNG CẤP ÂM NHẠC

> **Mục tiêu**: Thực thi lộ trình 6 giai đoạn mới (Phase 7 đến Phase 12) trong `tasks/plan.md` nhằm khắc phục 100% các lỗi mobile thực tế (từ 5 ảnh chụp trên iPhone và PC trong thư mục `test_thực_tế_trên_iphone/`), hoàn thiện hệ thống 2 Hộp Quà bí mật tuần tự, nén video siêu nhẹ và nâng cấp hệ thống âm nhạc BGM.  
> **Cam kết**: Zero PC Regression (100% không ảnh hưởng UI Desktop PC), Touch Target $\ge 48\text{px}$, 100% Client-Side Pure Static Web.

---

### [Hoàn Thành Trước Đây] Phase 1 - Phase 6
- [x] Phase 1: Chống va chạm dock trên & khí hậu tự nhiên (Orrery vs Camera, Mascot vs Volume Dock).
- [x] Phase 2: Tái thiết kế không gian Stage 2 chuông hoa bước đầu.
- [x] Phase 3: Đại tu bố cục màn hình dọc (Mặt trời, cây & mặt đất).
- [x] Phase 4: Sửa lỗi chụp ảnh màn hình Polaroid lưu giữ cây hoa nở rộ.
- [x] Phase 5: Bọc khung giới hạn hộp thoại xoay màn hình & kiểm thử gắt gao.
- [x] Phase 6: Đồng nhất mã nguồn đồng nghiệp & dọn dẹp toàn diện workspace.

---

### Phase 7: Sửa Triệt Để Lỗi Kẹt Tương Tác Stage 2 (Vươn Cành) Trên Cả PC và Mobile
- [x] 7.1: Gỡ bỏ `display: none !important; opacity: 0 !important;` trên `body.stage-3-active #living-atmosphere-hud` trong `css/layout.css`; bảo đảm Vệt Nắng Ban Mai `#atmosphere-sun-shifter` xuất hiện lấp lánh ở Stage 2 để người dùng tương tác kéo/chạm sưởi ấm mầm cây.
- [x] 7.2: Khắc phục lỗi double-tap trong `js/atmosphere-shifter.js`: khi đang ở Stage 2 (`currentStage === 2`), nếu người dùng double-tap màn hình hoặc vuốt/chạm rễ cây, hệ thống thông minh kích hoạt sưởi ấm mầm cây (`isFertilized = true` & `triggerRootThermalWarmth()`), thay vì gọi `isWatered` khiến người dùng bị kẹt vô vọng.
- [x] 7.3: Bổ sung Graceful Auto-Fallback cho Stage 2: nếu sau 25 giây người dùng chưa tương tác sưởi nắng, hệ thống tự động thổi làn gió nắng ấm giúp cây vươn cành và tiến lên Stage 3 (kết nối chòm sao).

#### Checkpoint 7: Sau Phase 7
- [x] Người dùng trên cả PC và Mobile khi bước vào Stage 2 (Vươn Cành) đều thấy Vệt Nắng Ban Mai rõ ràng, kéo nắng hoặc double-tap sưởi ấm cây thành công 100%, không bao giờ bị kẹt.

---

### Phase 8: Tái Cấu Trúc Toàn Diện Chuông Hoa (Simon Melody) & Chống Va Chạm Linh Vật, Đàn Mộc Cầm
- [x] 8.1: Chống va chạm phía Trái trên Mobile Landscape: Tái định vị 2 nốt Simon trái (slot 0: `l: 18%, t: 44%`, slot 1: `l: 28%, t: 66%`), cách xa Linh vật Mascot và thanh volume dock $\ge 65\text{px}$, không bao giờ bị đè lấp.
- [x] 8.2: Chống va chạm phía Phải trên Mobile Landscape: Giảm kích thước Đàn Mộc Cầm trên mobile landscape từ `--harp-w: 330px` về `--harp-w: 220px`; khi Minigame Simon đang chạy (`body.stage-2-active`), tạm thời làm mờ hoặc ẩn Đàn Mộc Cầm (`opacity: 0.15; pointer-events: none;`) để giải phóng toàn bộ không gian cho nốt Simon 2 và 3 (`l: 72%, t: 66%` và `l: 82%, t: 44%`).
- [x] 8.3: Tối ưu hiển thị Chuông Hoa trên Mobile Portrait & Chế độ Bypass: Định vị 4 nốt Simon ở 2 bên thân mầm cây (`l: 16%, 22%, 78%, 84%`), kích thước $\ge 80\text{px}$ với `hitbox ::after` mở rộng, nâng `z-index: 2600` cao hơn lớp cỏ `#co-hoa` và mầm cây, bảo đảm hiển thị sắc nét và chạm nhạy trên màn hình dọc.
- [x] 8.4: Tinh gọn bảng hướng dẫn `#garden-ui` khi `body.stage-2-active` trên landscape $\le 52\text{px}$, padding $4\text{px} \times 12\text{px}$, không che khuất mầm cây.
- [x] 8.5: Đại tu toàn diện Đàn Mộc Cầm trên Mobile (Landscape & Portrait): Tách đàn ra ngoài `#wrap` đặt trực tiếp dưới `#main-container` để không bị scale co cụm; xóa bỏ quy tắc ẩn đàn trên portrait; neo giữ đàn trang nhã ở góc phải dưới thảm cỏ với `--harp-w: 160px` trên portrait và `--harp-w: 220px` trên landscape; mở rộng vùng chạm dây đàn $\ge 44\text{px}$ và tăng độ nhạy `reach` lên 26px kèm click listener trực tiếp.

#### Checkpoint 8: Sau Phase 8
- [x] 4 nốt chuông hoa Simon xuất hiện hoàn toàn ở vùng trống thoáng đãng trên cả điện thoại ngang và dọc, không bị Mascot hay Đàn Mộc Cầm che khuất, ngón cái hai bên chạm cực kỳ thuận tiện.
- [x] Đàn Mộc Cầm hiển thị cân đối, vừa vặn, không bao giờ bị biến mất hoàn toàn trên màn hình dọc hay quá to/quá nhỏ trên màn hình ngang.

---

### Phase 9: Nén Video Siêu Nhẹ & Thuật Toán Trình Chiếu Zero-Lag
- [x] 9.1: Hoàn tất chuyển đổi nén video bằng `ffmpeg`:
  - `vid_2.mp4` (70MB) -> `video/vid_2_opt.mp4` (27.1MB, H.264 `yuv420p` `+faststart`) và `video/vid_2.webm` (33.1MB, VP9/Opus).
  - `vid_1.mp4` (1.8GB) -> `video/vid_1_opt.mp4` (44.9MB, 720p 30fps H.264 `yuv420p` `+faststart`, giảm 97.5%) và `video/vid_1.webm` (57.9MB, VP9/Opus).
  - Cập nhật `.gitignore` loại trừ các file video gốc `vid_1.mp4` và `vid_2.mp4` nặng gần 2GB.
- [x] 9.2: Thuật toán trình chiếu Video tối ưu (Zero-Lag Lightbox Player) trong `index.html` và `css/components.css`: `preload="metadata"`, `playsinline`, tự động pause BGM khi phát video (`pauseBgmForVideo`) và khôi phục BGM êm dịu khi đóng video hoặc kết thúc (`resumeBgmAfterVideo`), bộ điều khiển `openGiftVideoModal` & `closeGiftVideoModal` trong `js/secret-letter.js`.

#### Checkpoint 9: Sau Phase 9
- [x] Cả 2 video đều nén tối ưu dưới dạng kép WebM & MP4, nạp ngay tức thì qua GitHub Pages, video chạy mượt mà không lag giật, quản lý âm thanh chuyển tiếp hoàn hảo và giải phóng bộ nhớ khi đóng.

---

### Phase 10: Hệ Thống 2 Hộp Quà Bí Mật Tuần Tự (Interactive Dual Gift Boxes)
- [x] 10.1: Xóa bỏ hoàn toàn link Google Drive trong `js/content.js`, thay bằng cấu trúc nội dung và giới thiệu 2 Hộp Quà Bí Mật.
- [x] 10.2: Thiết kế giao diện 2 Hộp Quà Di Sản Sơn Mài Dó Paper (`#gift-box-1` & `#gift-box-2`) ở cuối bức thư và phím tắt `.polaroid-gift-shortcuts` trên thiệp: Hộp 1 màu đỏ chu sa nơ vàng kim sẵn sàng mở, Hộp 2 màu hoàng đàn thếp vàng kèm ổ khóa son 🔒.
- [x] 10.3: Xây dựng cơ chế Khóa & Mở Khóa Tuần Tự trong `js/secret-letter.js`:
  - Mở Hộp 1 phát `video/vid_1.mp4`.
  - Theo dõi tiến trình xem video 1: khi xem hết ($\ge 95\%$ hoặc `ended`), mở khóa Hộp 2 với hiệu ứng Unlocking Ceremony (sen vàng bung nở 🪷, chuông ngân `playChimeSFX()`, rung cảm ứng `triggerHaptic('success')`).
  - Mở Hộp 2 phát `video/vid_2.mp4`.
  - Nếu bấm Hộp 2 khi chưa xem xong video 1, Mascot nhắc nhở nhẹ nhàng và hộp quà rung lắc cảnh báo (`giftShakeLocked`).

#### Checkpoint 10: Sau Phase 10
- [x] Trải nghiệm mở quà tuần tự mượt mà, cảm xúc bất ngờ và sang trọng, không còn liên kết Drive ngoại vi.

---

### Phase 11: Nâng Cấp Hệ Thống Âm Nhạc BGM (Random 70/30 & Phát Nối Bài)
- [x] 11.1: Cập nhật thuật toán chọn nhạc ngẫu nhiên trong `js/audio-vfx.js`: `Math.random() < 0.7 ? 1 : 0` (70% `nhac_2.webm` - Mắt Bão, 30% `nhac_1.webm` - MONO Em Xinh).
- [x] 11.2: Hoàn thiện cơ chế phát nối bài tiếp theo (`ended` event listener): khi nghe hết bài hiện tại, tự động chuyển sang bài còn lại và hiển thị mascot thông báo giai điệu mới.
- [x] 11.3: Bảo đảm tính tương thích với Phonk Mode và nút điều chỉnh âm lượng (bảo toàn volume người dùng đã chỉnh khi chuyển bài).

#### Checkpoint 11: Sau Phase 11
- [x] Kiểm nghiệm Monte Carlo 10,000 lần xác nhận phân phối 70% `nhac_2` và 30% `nhac_1`; bài hát tự động nối tiếp liền mạch khi kết thúc.

---

### Phase 12: Đảm Bảo Ảnh Polaroid Trọn Vẹn Cây Hoa Nở Rộ & Kiểm Thử Toàn Diện
- [x] 12.1: Bảo đảm hàm `renderGardenPolaroidToCanvas` trong `js/garden-stages.js` luôn vẽ trọn vẹn tán hoa trái tim nở rộ rực rỡ, chim hạc, nón lá, áo dài ở Stage 4; hiển thị mầm cây thi vị nếu chụp ở Stage 1-3.
- [x] 12.2: Xây dựng kịch bản kiểm thử tự động Node.js `scratch/test_stage2_gifts_audio.js` kiểm tra 100% các tiêu chí logic, cú pháp và bố cục.
- [x] 12.3: Kiểm thử Zero PC Regression (100% giao diện Desktop PC giữ nguyên vẻ đẹp Quiet Luxury).
- [x] 12.4: Đồng bộ Git 3-Dev: chạy `git fetch --all --prune`, đảm bảo không có xung đột, commit và push nhánh feature sạch sẽ.

#### Checkpoint 12: Nghiệm Thu Toàn Diện
- [x] 100% các lỗi trên cả PC và Mobile (5 ảnh thực tế) được khắc phục triệt để.
- [x] Đạt 100% bài kiểm tra tự động (`test_stage2_gifts_audio.js`).
- [x] Toàn bộ yêu cầu chính và phụ của người dùng hoàn thành xuất sắc.
