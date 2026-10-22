# KẾ HOẠCH NÂNG CẤP & SỬA LỖI HỆ THỐNG: ÂM THANH, LA BÀN, BỘ ĐIỀU HƯỚNG PHASE & ÁO DÀI 20/10

> **Nguyên tắc cốt lõi**: Giữ vững kiến trúc **100% Web Tĩnh (Full-Static Client-Side)**, bảo toàn chuẩn mực thiết kế **Vietnamese Poetic Heritage**, tuân thủ nghiêm ngặt **Concurrent Git Protocol** và quy tắc `.antigravity/rules.md`.

---

## TỔNG QUAN 6 YÊU CẦU CẢI TIẾN & KHẮC PHỤC

| STT | Yêu cầu | Hiện trạng | Giải pháp xử lý hoàn hảo |
| :--- | :--- | :--- | :--- |
| **1** | **Xoá hẳn QR tym.png** | File `img/tym.png` tồn tại, được nhúng trong `js/content.js` dòng 11 | Xóa triệt để file `img/tym.png` khỏi git; cập nhật `js/content.js` loại bỏ thẻ `<img>`, thay câu dẫn thành lời mời mở món quà bí mật tinh tế, ấm áp. |
| **2** | **Sửa bug xoay kim la bàn phát âm thanh đàn** | Khi xoay kim la bàn nhanh, hàm `pluckHarp` liên tục kích hoạt nốt đàn hạc gối lên nhau, gây ồn ào và lấn át BGM | Gỡ bỏ hoàn toàn việc gọi `pluckHarp` trong `handleOrreryClimateShift`. La bàn thiên văn chỉ phát tiếng bánh răng ngọc thạch tinh tế (`tickSFX`) có giới hạn tần suất (throttle 150ms) và chỉ phát chuông mùa khi dừng lại. |
| **3** | **Phase 2 (đánh đàn): Giảm dần nhạc nền trong 2s** | Khi bước vào phase 2 (Simon hòa âm), BGM chạy bình thường lấn át các nốt nhạc ma thuật | Bổ sung cơ chế Audio Ducking: fade in chuông nốt đồng thời hạ dần âm lượng BGM (`#myAudio`) xuống ~0.02 trong đúng 2 giây (2000ms). Khi hoàn thành hoặc rời phase 2, tự động khôi phục BGM về mức ban đầu qua 2s. |
| **4** | **Giấu thanh xem lại từng phase ở vị trí an toàn** | `#garden-stage-selector` nằm cố định ở đỉnh giữa màn hình (`top: 16px; left: 50%`), đè lên HUD trạng thái và dễ gây lỗi đè trạng thái khi tua lại | Di dời thanh về vị trí an toàn (nút bấm thu gọn góc dưới `↺ Lộ trình`). Mặc định ẩn gọn gàng, chỉ mở dạng drawer/popup khi người dùng chủ động bấm. Bổ sung dọn dẹp triệt để trạng thái minigame cũ khi tua phase. |
| **5** | **Sửa thanh chữ bấm hiện ra 2 cô gái** | Thanh chữ `.ao-dai-poem-badge` bị tràn sang trái đè lấn các phần tử khác; nội dung câu thơ đơn điệu, sáo rỗng | Định vị lại huy hiệu thơ bay bổng ngay trên đầu 2 thiếu nữ (`left: 50%; top: -45px; transform: translateX(-50%)`), có `max-width`, tự bọc dòng, `z-index: 1000`. Soạn 5 câu thơ 20/10 sâu lắng, tôn vinh nét đẹp trí tuệ và dịu dàng. |
| **6** | **Thu nhỏ 2 cô gái áo dài 50% & đứng dưới gốc cây** | Hiện đứng lệch phải mép màn hình (`right: 25px`) với chiều cao quá lớn (`height: 490px`) | Thu nhỏ đúng 50% (`height: 245px`), di dời vào chân gốc cây cổ thụ bên dưới thảm hoa sen (`left: 565px; bottom: 25px;` trong `#wrap`). Hưởng lợi thế từ cơ chế auto-scale của `#wrap`, co giãn hoàn hảo trên PC, tablet và mobile. |

---

## KẾ HOẠCH CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### BƯỚC 1: XÓA BỎ HOÀN TOÀN QR TYM.PNG
1. Xóa file `img/tym.png` bằng lệnh git.
2. Sửa `js/content.js`: loại bỏ thẻ `<img>`, trau chuốt lại câu CTA mở thư/quà Google Drive trang trọng và duyên dáng.

### BƯỚC 2: KHẮC PHỤC TRIỆT ĐỂ LỖI ÂM THANH XOAY LA BÀN
1. Trong `js/celestial-orrery.js`:
   - Gỡ bỏ hoàn toàn `pluckHarp` và `cancelHarp` cùng các lệnh `pluckHarpIfAudible` trong `handleOrreryClimateShift`.
   - Giữ lại tiếng khấc bánh răng đồng cổ nhẹ nhàng khi xoay, thêm throttle chống spam audio khi người dùng vẩy kim xoay tít.
   - Âm thanh chuyển mùa chỉ kích hoạt khi kim dừng lại hoặc nhả tay (`pointerup` / inertia settle).

### BƯỚC 3: XÂY DỰNG AUDIO DUCKING (GIẢM NHẠC NỀN 2S Ở PHASE 2)
1. Trong `js/audio-vfx.js`:
   - Bổ sung `window.duckBgmForMinigame(isDucking, durationMs = 2000)` điều khiển âm lượng nền mượt mà.
   - Lưu lại `originalAudioVolume` để khi khôi phục không bị mất âm lượng người dùng đã chỉnh.
2. Trong `js/garden-minigames.js` & `js/garden-stages.js`:
   - Khi kích hoạt `startSimonGame`: gọi `duckBgmForMinigame(true, 2000)` để nhạc nền dịu xuống, làm nổi bật giai điệu mộc cầm.
   - Khi hoàn tất minigame hoặc chuyển stage: gọi `duckBgmForMinigame(false, 2000)` để trả lại âm lượng nhạc nền.

### BƯỚC 4: TÁI CẤU TRÚC & GIẤU THANH XEM LẠI PHASE (`#garden-stage-selector`)
1. Trong `index.html` & `css/layout.css`:
   - Chuyển thanh xem lại phase thành dạng drawer/popover thu gọn ở góc dưới màn hình hoặc nút ngọc `↺ Lộ trình` tinh tế.
   - Mặc định ẩn hoàn toàn, không nổi lơ lửng trên đầu màn hình làm che khuất HUD mầm non và vòm cây.
2. Trong `js/garden-stages.js`:
   - Tối ưu hóa hàm `jumpToGardenStage`: reset sạch các listener cũ, dọn sạch canvas hạt giống / chùm sao / simon game trước khi nạp stage mới để chống lỗi đè dữ liệu (state collision).

### BƯỚC 5 & 6: ĐỊNH VỊ 2 CÔ GÁI ÁO DÀI DƯỚI GỐC CÂY & NÂNG CẤP BANNER THƠ
1. Trong `css/layout.css`:
   - Đặt `#ao-dai-viet-stage4` ở vị trí chân gốc cây bên trong `#wrap` (`left: 565px; bottom: 25px;`).
   - Giảm 50% kích thước: `height: 245px;` (trên mobile `145px - 160px`), kế thừa auto-scale từ `#wrap`.
   - Chỉnh `.ao-dai-poem-badge` căn giữa đỉnh đầu, chống tràn lề, bảo đảm `z-index: 1000` không bị bất kỳ phần tử nào đè lên.
2. Trong `js/garden-stages.js` & `index.html`:
   - Cập nhật bộ thơ 20/10 sâu sắc, ý nghĩa và giàu cảm xúc.

### BƯỚC 7: KIỂM THỬ ĐA THIẾT BỊ, THẨM MỸ & ĐỒNG BỘ GIT HOÀN HẢO
1. Chạy `node -c js/*.js` trên tất cả file JS để đảm bảo 100% cú pháp sạch.
2. Kiểm tra tính toàn vẹn CSS (cân bằng ngoặc nhọn).
3. Kiểm thử hiển thị trên PC (1920x1080), Tablet (768x1024), Mobile (375x667, 390x844).
4. Kiểm tra commit mới trên remote, commit sạch và đồng bộ git.
