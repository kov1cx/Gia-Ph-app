
# 🌳 Gia Phả Số - Digital Genealogy (Desktop Ready)

Bản cập nhật v1.1 hỗ trợ lưu trữ dữ liệu vĩnh viễn trên máy tính và sẵn sàng đóng gói thành ứng dụng Windows (.exe).

## 🚀 Cách biến thành App Windows (.exe)

Nếu bạn muốn biến project này thành một file `.exe` chạy độc lập, hãy làm theo các bước sau:

### Bước 1: Khởi tạo Project Electron
Trong thư mục chứa code của bạn, chạy lệnh:
```bash
npm init -y
npm install electron --save-dev
```

### Bước 2: Tạo file `main.js` (Cấu hình Electron)
Tạo một file mới tên là `main.js` với nội dung sau:
```javascript
const { app, BrowserWindow } = require('electron')
function createWindow () {
  const win = new BrowserWindow({
    width: 1200, height: 800,
    icon: __dirname + '/icon.ico',
    webPreferences: { nodeIntegration: true }
  })
  win.loadFile('index.html') // Load file HTML của bạn
}
app.whenReady().then(createWindow)
```

### Bước 3: Đóng gói thành EXE
Sử dụng công cụ `electron-packager`:
```bash
npx electron-packager . GiaPhaSo --platform=win32 --arch=x64 --out=dist/
```

## 🛠️ Tính năng Offline (Mới)
* **Auto-Save**: Mọi thay đổi về thành viên hoặc tiểu sử sẽ tự động được lưu vào `localStorage` của máy tính.
* **No Internet Required**: Ứng dụng có thể mở và xem lại gia phả cũ ngay cả khi không có mạng (sau lần tải đầu tiên để trình duyệt cache các thư viện).

## 📝 Lưu ý quan trọng
Để app hoạt động **100% offline không cần mạng lần đầu**, bạn nên:
1. Tải file `xlsx.full.min.js` từ CDN về thư mục gốc.
2. Sửa lại thẻ `<script src="...">` trong `index.html` để trỏ vào file nội bộ thay vì link web.

---
*Phát triển bởi kov1cx • Tự hào cội nguồn Việt.* ❤️
