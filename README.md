
# 🌳 Gia Phả Số - Hướng dẫn đóng gói EXE

Phiên bản v1.5 đã được cấu hình sẵn để chuyển đổi thành ứng dụng Desktop (.exe).

## 🛠 Yêu cầu chuẩn bị
1. Cài đặt **Node.js** (tải tại [nodejs.org](https://nodejs.org/)).
2. Mở terminal (CMD hoặc PowerShell) tại thư mục chứa dự án này.

## 🚀 Các bước thực hiện

### Bước 1: Cài đặt thư viện cần thiết
Chạy lệnh sau để tải Electron và công cụ đóng gói:
```bash
npm install
```

### Bước 2: Chạy thử ứng dụng (Optional)
Để xem ứng dụng chạy dưới dạng cửa sổ phần mềm trước khi đóng gói:
```bash
npm start
```

### Bước 3: Đóng gói thành file .exe
Chạy lệnh này để tạo ra bản portable (chạy ngay không cần cài đặt):
```bash
npm run build
```

Sau khi chạy xong, bạn sẽ thấy thư mục `dist_electron`. File `GiaPhaSo.exe` nằm trong đó.

## 📝 Lưu ý quan trọng cho bản Desktop
* **Offline hoàn toàn**: Để ứng dụng chạy khi không có mạng, bạn nên tải các file CSS/JS từ CDN (như Tailwind, Google Fonts) về máy và sửa lại đường dẫn trong `index.html`.
* **Dữ liệu**: Dữ liệu vẫn được lưu trong `localStorage` của ứng dụng Desktop, tương tự như trên trình duyệt. Nếu bạn xóa file `.exe` và tải bản mới ở thư mục khác, dữ liệu có thể bị trống nếu không được xuất ra file Excel trước đó.

---
*Tự hào cội nguồn Việt - Phiên bản Di Sản v1.5*
