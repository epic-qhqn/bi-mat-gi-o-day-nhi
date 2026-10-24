# QUY TẮC BẮT BUỘC: ĐIỀU PHỐI TEAM (3 DEVS) & TỐI ƯU HÓA TOKEN

Dự án có 3 lập trình viên làm việc song song, liên tục đẩy commit và cập nhật trên các nhánh (`main`, nhánh tính năng `feat/*`, v.v.). Mọi phiên làm việc phải tuân thủ nghiêm ngặt quy trình dưới đây:

## 1. Trước khi thực hiện bất kỳ yêu cầu nào (Pre-Task)
1. **Kiểm tra remote toàn diện**: Chạy `git fetch --all --prune` và rà soát tất cả các nhánh (`git branch -a`, `git log --all --oneline -n 10`).
2. **Dung hòa nhánh & commit mới từ đồng đội**:
   - Nếu có commit mới từ nhánh chính hoặc các nhánh phụ của dev khác, tiến hành merge/rebase sạch sẽ, giải quyết triệt để 100% xung đột nếu phát sinh.
   - Nếu dev khác đang làm việc song song trên cùng khu vực hoặc để tránh đè code, tạo nhánh làm việc mới phù hợp trước khi triển khai.
3. **Bảo đảm tính toàn vẹn**: Dự án tuyệt đối không được có syntax errors, broken layout hoặc conflict markers trước khi bắt đầu code.

## 2. Sau khi hoàn thành bất kỳ yêu cầu nào (Post-Task)
1. **Bắt kịp commit phát sinh**: Chạy lại `git fetch origin` để kiểm tra các commit mới do dev khác vừa đẩy lên trong lúc đang làm.
2. **Dung hòa tuyệt đối**: Hòa hợp hoàn hảo các thay đổi mới nhất mà không làm mất tính năng của bất kỳ ai trong team.
3. **Kiểm tra trạng thái dự án**: Đảm bảo toàn bộ dự án hoạt động trơn tru, không có lỗi tiềm ẩn.

## 3. Phong cách phản hồi
- **Âm thầm thực hiện toàn bộ quy trình Git & Sync**: Tuyệt đối không báo cáo chi tiết các lệnh git hay giải thích dài dòng.
- **Tiết kiệm token tối đa**: Chỉ trả lời cực kỳ ngắn gọn, đi thẳng vào kết quả của yêu cầu.
