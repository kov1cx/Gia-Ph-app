
# 🌳 Gia Phả Số v1.5 (Final Heritage Edition) - Hướng dẫn tạo file EXE

Đây là phiên bản thương mại/di sản đã sẵn sàng để đóng gói thành phần mềm máy tính độc lập.

## 🛠 Yêu cầu hệ thống
1. **Node.js**: Phiên bản 18 trở lên (Tải tại [nodejs.org](https://nodejs.org/)).
2. **Git**: (Tùy chọn) để quản lý mã nguồn.

## 🚀 Quy trình 3 bước để có file .exe

### Bước 1: Khởi tạo môi trường
Mở thư mục dự án trong Terminal/Command Prompt và chạy:
```bash
npm install
```
*Lưu ý: Quá trình này có thể mất 1-2 phút để tải Electron.*

### Bước 2: Kiểm tra trước khi đóng gói (Tùy chọn)
Chạy thử ứng dụng dưới dạng phần mềm để kiểm tra giao diện:
```bash
npm run dev
```

### Bước 3: Đóng gói chính thức
Chạy lệnh quan trọng nhất:
```bash
npm run dist
```

## 📦 Kết quả
Sau khi lệnh hoàn tất, hãy vào thư mục **`dist_electron`**.
Bạn sẽ thấy file: `GiaPhaSo_v1.5_Final_1.5.0_portable.exe`.

---

## 💡 Ưu điểm của bản Portable EXE:
* **Chạy ngay không cần cài đặt**: Bạn có thể copy file này vào USB và chạy trên bất kỳ máy Windows nào.
* **Biểu tượng chuyên nghiệp**: Ứng dụng chạy trong cửa sổ riêng, không có thanh địa chỉ web.
* **Bảo mật dữ liệu**: Dữ liệu được lưu trữ cục bộ, không gửi lên bất kỳ máy chủ nào.

## 📝 Lưu ý quan trọng:
* Ứng dụng hiện tại vẫn sử dụng CDN cho CSS (Tailwind) và Excel (SheetJS). Do đó, máy tính cần có kết nối Internet khi chạy lần đầu để tải các thư viện này vào cache.
* Để chuyển sang **Offline hoàn toàn**, bạn cần tải các file `.js` và `.css` từ CDN về thư mục `public/` và sửa lại đường dẫn trong `index.html`.

---
*Tôn vinh cội nguồn - Kết nối tương lai*
