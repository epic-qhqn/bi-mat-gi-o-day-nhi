# TODO: TÍCH HỢP 12 CUNG HOÀNG ĐẠO & TRÌNH DIỄN CHÒM SAO THIÊN VĂN 2 GIÂY (PHASE 3)

> **Mục tiêu**: Thực thi lộ trình 5 giai đoạn trong `tasks/plan.md`. Cho phép người dùng nhập ngày & tháng sinh ở Bàn chế tác Stage 0 $\rightarrow$ tra Cung Hoàng Đạo $\rightarrow$ nối chòm sao hoàng đạo tương ứng ở Stage 3 $\rightarrow$ **trình diễn toàn cảnh hình vẽ chòm sao thần thoại phát sáng trong 2 giây** đúng theo hình ảnh mẫu trước khi nở hoa ở Stage 4.  
> **Cam kết**: 100% Client-Side Pure Static Web (Offline-ready), Touch Target $\ge 48\text{px}$, Zero PC Regression.

---

### Phase 1: Chuẩn Hóa CSDL & Bộ Vector Art 12 Chòm Sao Di Sản (Zodiac Vector Art & Star Topology)
- [x] 1.1: Thiết kế và số hóa 12 vector SVG nét trắng/vàng bạc thanh nhã (`viewBox="0 0 1100 680"`) cho 12 cung hoàng đạo (Bạch Dương, Kim Ngưu, Song Tử, Cự Giải, Sư Tử, Xử Nữ, Thiên Bình, Thiên Yết, Nhân Mã, Ma Kết, Bảo Bình, Song Ngư) đồng bộ phong cách ảnh mẫu.
- [x] 1.2: Định nghĩa bản đồ tọa độ các ngôi sao thật `pts` và thứ tự nối `edges` cho từng cung hoàng đạo trong `SIGNS` (`js/zodiac-constellation.js`), khớp 1:1 với các điểm sao chủ chốt trên hình vẽ vector.
- [x] 1.3: Xây dựng script kiểm thử tự động `scratch/test_zodiac_bounds.js`: chạy mô phỏng Monte Carlo xác nhận 100% các ngôi sao của cả 12 cung nằm trong vùng trời an toàn, không va chạm với 4 vùng cấm (HUD trên, tán cây giữa, mascot góc trái, mộc cầm góc phải).

#### Checkpoint 1: Sau Phase 1
- [x] Chạy `node scratch/test_zodiac_bounds.js` đạt 100% pass với 0 va chạm.
- [x] 12/12 chòm sao có đầy đủ vector SVG và bộ tọa độ sao hợp lệ.

---

### Phase 2: Tối Ưu UX/UI Thẻ Ngày Sinh Tại Bàn Chế Tác Stage 0 (Heritage Birthday Atelier)
- [x] 2.1: Tinh chỉnh mỹ thuật `.zodiac-birth-card` trong `css/zodiac.css`: chuyển từ màu tím sang phong cách Giấy Dó ngà `#FAF7F0`, viền đồng mạ `#D4AF37`, cỡ chữ select 16px chống Safari tự zoom, touch target $\ge 44\text{px}$.
- [x] 2.2: Đồng bộ trạng thái vào `window.gardenState.zodiac` và `localStorage['epic.birthday']`; xây dựng cơ chế tự động gán cung hoàng đạo thi vị dự phòng nếu người chơi không nhập ngày sinh (không bắt buộc, không chặn dập sáp).
- [x] 2.3: Tối ưu hiển thị responsive đa chiều cho thẻ ngày sinh:
  - Mobile Portrait: Căn giữa thanh thoát, không đẩy lệch khay sáp và bếp nến.
  - Mobile Landscape (cao $\le 540\text{px}$): Thu gọn tối đa $\le 60\text{px}$ trong cột trái bàn chế tác, cuộn mượt mà.
  - Desktop PC: Cân xứng, hài hòa tuyệt đối với vintage brass letterpress.

#### Checkpoint 2: Sau Phase 2
- [x] Chọn ngày/tháng tra đúng 12 cung hoàng đạo và lưu state chuẩn xác.
- [x] Giao diện thẻ ngày sinh hòa quyện với Bàn chế tác dập sáp trên cả điện thoại (dọc/ngang) và PC.

---

### Phase 3: Tái Cấu Trúc Minigame Stage 3 Nối Sao Theo Cung Hoàng Đạo (Dynamic Constellation Linker)
- [x] 3.1: Nâng cấp `startConstellationGame()` trong `js/garden-minigames.js`: đọc `window.getZodiacConstellation()` để nạp bộ sao thật (5–7 sao đánh số thứ tự) cùng 1–2 sao ảo decoys (cách xa $\ge 95\text{px}$) của đúng cung hoàng đạo người chơi.
- [x] 3.2: Tối ưu cảm ứng bắt dính ngón tay (`proximityRadius` $\ge 48\text{px}$ trên mobile) và hỗ trợ vẽ đường nối sao rực sáng nối tiếp mượt mà, hỗ trợ khép vòng kín cho các cung khép kín (Thiên Bình, Ma Kết, Nhân Mã).
- [x] 3.3: Tích hợp cơ chế bỏ qua cứu nguy (Graceful Skip Fallback): nếu thử sai quá 5 lần hoặc quá 40 giây, hiển thị nút `#constellation-skip-btn`; khi bấm skip sẽ tự động nối sao và vẫn kích hoạt trọn vẹn màn trình diễn 2 giây.

#### Checkpoint 3: Sau Phase 3
- [x] Thao tác kéo ngón tay nối sao trên điện thoại và chuột trên PC hoạt động trơn tru.
- [x] Nút Bỏ qua cứu nguy kích hoạt chính xác sau 5 lần sai hoặc 40s.

---

### Phase 4: Trình Diễn Toàn Cảnh Chòm Sao 2 Giây & Audio VFX (Grand 2-Second Celestial Reveal)
- [x] 4.1: Xây dựng container đồ họa `#zodiac-artwork-reveal`: khi hoàn thành nối sao (hoặc skip), hiển thị toàn cảnh hình tượng vector thần thoại phát sáng ngân hà (`filter: drop-shadow`) đè khớp lên cụm sao vừa nối kèm thẻ thông điệp thi vị.
- [x] 4.2: Xây dựng bộ đếm thời gian và biên đạo hoạt họa `triggerCelestialGrandReveal()`:
  - Khóa tương tác tạm thời để bảo vệ màn trình diễn (`isRevealingConstellation = true`).
  - Phát hiệu ứng `celestial-bloom` trong đúng 2000ms.
  - Sau 2000ms, mờ dần (`fade-out 400ms`), dọn dẹp DOM sạch sẽ và gọi `window.advanceStage(2)` kích hoạt cây nở hoa (Stage 4).
- [x] 4.3: Thiết kế âm thanh thiên thể kỳ ảo `playCelestialGrandRevealSFX()` trong `js/audio-vfx.js`: hợp âm ngũ cung Web Audio API ngân vang thanh khiết, tự động ducking 30% nhạc nền trong 2 giây.
- [x] 4.4: Tích hợp câu chúc mừng riêng biệt của Linh vật Mascot (`#mascot-companion`) tương ứng với tính cách của cung hoàng đạo đó trong 2 giây trình diễn.

#### Checkpoint 4: Sau Phase 4
- [x] Màn trình diễn toàn cảnh chòm sao hiển thị trọn vẹn đúng 2000ms với hiệu ứng ánh sáng và âm thanh thiên thể lung linh.
- [x] Tự động chuyển cảnh sang Stage 4 mượt mà, không bị khựng hay lỗi console.

---

### Phase 5: Kiểm Thử Toàn Diện Đa Thiết Bị, Zero PC Regression & Git 3-Dev Harmony
- [ ] 5.1: Xây dựng bộ test tự động `scratch/test_phase9_zodiac_constellation.js`: kiểm tra toàn diện 12 cung hoàng đạo, logic cutoff ngày sinh, chu trình 2s và cơ chế skip.
- [ ] 5.2: Kiểm tra cú pháp toàn bộ file JavaScript (`node -c js/*.js`) và đếm số lượng dấu ngoặc `{}` trên toàn bộ file CSS (`base.css`, `layout.css`, `components.css`, `zodiac.css`) đảm bảo cân bằng tuyệt đối.
- [ ] 5.3: Kiểm thử thị giác đa thiết bị: Mobile Landscape (iPhone 14/15/16, Samsung S22, Pixel, Sony Xperia, màn hình gập 320px), Mobile Portrait, Tablet, PC Desktop ($1920 \times 1080$, 4K) cam kết Zero PC Regression.
- [ ] 5.4: Thực hiện quy trình Git 3-Dev: `git fetch --all --prune`, giải quyết xung đột với các commit đồng đội (nếu có), commit và push nhánh feature sạch sẽ.

#### Checkpoint 5: Hoàn Tất Bàn Giao
- [ ] Tất cả các bài kiểm tra tự động chạy qua không lỗi.
- [ ] Working tree sạch sẽ, nhánh feature đồng bộ hoàn hảo.
