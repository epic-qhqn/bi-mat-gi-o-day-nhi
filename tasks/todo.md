# TODO LIST: SỬA LỖI & NÂNG CẤP HỆ THỐNG THEO YÊU CẦU

## Mục 1: Xoá Hẳn QR tym.png
- [x] 1.1: Xóa file `img/tym.png` khỏi dự án.
- [x] 1.2: Cập nhật `js/content.js` gỡ bỏ thẻ `<img src="./img/tym.png">` và hoàn thiện câu chúc mở quà tặng bí mật 20/10.

## Mục 2: Sửa Bug Xoay Kim La Bàn Đổi Thời Gian Gây Ồn
- [x] 2.1: Gỡ bỏ việc kích hoạt nốt đàn hạc (`pluckHarp`, `pluckHarpIfAudible`) khi xoay kim la bàn trong `js/celestial-orrery.js`.
- [x] 2.2: Tối ưu throttle âm thanh bánh răng khi xoay nhanh, chỉ phát âm thanh chuyển mùa trọn vẹn khi kim đã dừng hẳn.

## Mục 3: Phase 2 Đánh Đàn - Fade In Âm Thanh 2s Để Giảm Nhạc Nền
- [x] 3.1: Xây dựng hàm `window.duckBgmForMinigame(isDucking, durationMs = 2000)` trong `js/audio-vfx.js`.
- [x] 3.2: Tích hợp giảm dần BGM trong 2s khi bắt đầu chơi Simon game và tự động khôi phục BGM qua 2s khi hoàn thành trong `js/garden-minigames.js` & `js/garden-stages.js`.

## Mục 4: Giấu Thanh Xem Lại Phase Ở Vị Trí Kín Đáo & Ngừa Lỗi Đè Trạng Thái
- [x] 4.1: Di dời `#garden-stage-selector` từ đỉnh giữa màn hình về nút ngọc thu gọn `↺ Lộ trình` ở góc dưới.
- [x] 4.2: Thiết kế giao diện đóng/mở popover gọn gàng cho cả PC lẫn Mobile.
- [x] 4.3: Tối ưu hóa logic `cleanupStage` và `jumpToGardenStage` để reset sạch sẽ trạng thái minigame cũ, không để lỗi mới đè lỗi cũ.

## Mục 5: Sửa Thanh Chữ Hiện Ra 2 Cô Gái & Nâng Cấp Nội Dung Thơ
- [x] 5.1: Sửa vị trí `.ao-dai-poem-badge` căn giữa đỉnh đầu, xử lý `max-width`, tự xuống dòng và `z-index: 1000` không bị che khuất hay tràn mép màn hình.
- [x] 5.2: Viết lại 5 câu thơ 20/10 sâu sắc, tinh tế, giàu chất thơ và tôn vinh người phụ nữ Việt Nam trong `js/garden-stages.js` và `index.html`.

## Mục 6: Thu Nhỏ 2 Cô Gái Áo Dài 50%, Đặt Dưới Gốc Cây & Auto-Scale
- [x] 6.1: Đặt `#ao-dai-viet-stage4` ở vị trí chân gốc cây cổ thụ bên trong `#wrap` (`left: 550px; bottom: 8px;`).
- [x] 6.2: Thu nhỏ kích thước đúng 50% (`height: 240px;` trên desktop, `230px` trên mobile), thừa hưởng auto-scale từ `#wrap`.
- [x] 6.3: Kiểm thử hiển thị trên các thiết bị PC, tablet, mobile.

## Kiểm Thử & Đồng Bộ Git
- [x] 7.1: Chạy kiểm tra cú pháp toàn diện: `node -c js/*.js` - 15/15 files passed OK.
- [x] 7.2: Kiểm tra cân bằng cú pháp CSS - 3/3 files balanced OK.
- [x] 7.3: Kiểm tra `git fetch origin`, commit sạch sẽ và bàn giao.
