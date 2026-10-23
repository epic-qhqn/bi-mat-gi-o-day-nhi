# QUY TẮC HOẠT ĐỘNG: TEAM SYNC & TOKEN TỐI ƯU

## 1. Trước khi bắt đầu bất kỳ yêu cầu nào (Pre-Task)
- Luôn kiểm tra remote repository: `git fetch --all --prune`
- Kiểm tra `git status` và các nhánh (`git branch -a`) xem có commit/nhánh mới nào từ team không.
- Nếu có cập nhật từ nhánh khác hoặc upstream:
  - Dung hoà, merge hoặc rebase sạch sẽ, giải quyết triệt để mọi xung đột nếu có.
  - Nếu cần thiết để tránh trùng lặp/xung đột với đồng đội đang làm việc song song, tạo hoặc chuyển sang nhánh làm việc phù hợp.
  - Đảm bảo dự án không có lỗi cú pháp hay conflict markers trước khi bắt đầu code.

## 2. Sau khi hoàn thành bất kỳ yêu cầu nào (Post-Task)
- Kiểm tra lại remote (`git fetch origin`) để bắt kịp các commit mới phát sinh trong lúc làm.
- Dung hoà hoàn hảo mọi thay đổi.
- Đảm bảo toàn bộ dự án hoạt động trơn tru, không lỗi phát sinh.

## 3. Phong cách phản hồi
- **Âm thầm thực hiện toàn bộ quy trình Git & Sync**: Không báo cáo chi tiết các câu lệnh git, không giải thích dài dòng.
- **Tiết kiệm tokens tối đa**: Chỉ trả lời ngắn gọn kết quả chính của yêu cầu.
