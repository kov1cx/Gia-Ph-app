# 🌳 Gia Phả Số - Digital Genealogy

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Web-orange.svg)]()
[![Style](https://img.shields.io/badge/style-Glassmorphism-9cf)]()
[![Tech](https://img.shields.io/badge/built%20with-HTML5%20%7C%20JS-yellow)]()

> Một giải pháp tạo lập gia phả dòng họ hiện đại, bảo mật và thẩm mỹ ngay trên trình duyệt web. Biến file Excel khô khan thành cây gia phả sống động và xuất file in thành quyển để lưu giữ sau này.
<img width="2557" height="1271" alt="image" src="https://github.com/user-attachments/assets/5db26794-ebda-48cc-b0d5-c8256cb8849e" />



## ✨ Tính năng nổi bật (Key Features)

* **🎨 Giao diện Glassmorphism:** Thiết kế kính mờ sang trọng, độ tương phản cao, hỗ trợ Dark Mode giúp tôn vinh sự trang trọng.
* **🚀 Serverless & Private:** Chạy trực tiếp trên trình duyệt (Client-side). Dữ liệu nằm trong túi bạn, không gửi lên máy chủ lạ.
* **📂 Excel Import:** Tự động đọc và phân tích file Excel (`.xlsx`) để dựng cây gia phả tức thì.
* **🔗 Auto-Link Logic:** Thuật toán tự động nối dây quan hệ huyết thống dựa trên `ID` và `Parent_ID`.
* **🖨️ Print Ready:** Chế độ in ấn thông minh, tự động chuyển đổi sang khổ giấy A4 để đóng thành sách.
* **🔍 Interactive:** Phóng to, thu nhỏ, kéo thả cây gia phả mượt mà.

## 🛠️ Công nghệ sử dụng

* **Core:** HTML5, CSS3 (Variables, Flexbox, Grid).
* **Logic:** Vanilla JavaScript (ES6+).
* **Library:** [SheetJS (xlsx)](https://sheetjs.com/) để xử lý dữ liệu Excel.
* **Visualization:** CSS Pseudo-elements vẽ sơ đồ cây (nhẹ hơn Canvas/SVG).


### 📝 Cấu trúc file Excel

Để ứng dụng vẽ đúng cây, file Excel cần có các cột sau (tên cột không phân biệt hoa thường):

| ID | Parent_ID | HoTen | NamSinh | NamMat | TieuSu |
|:---|:---|:---|:---|:---|:---|
| 1 | *(Trống)* | Nguyễn Văn A | 1920 | 1990 | Cụ Tổ |
| 2 | 1 | Nguyễn Văn B | 1950 | - | Con cụ A |
| 3 | 2 | Nguyễn Văn C | 1980 | - | Cháu cụ A |

> **Lưu ý:** `Parent_ID` là ID của người cha. Người đứng đầu dòng họ để trống ô này.

## 🤝 Đóng góp (Contributing)

Mọi đóng góp đều được hoan nghênh! Nếu bạn muốn cải thiện thuật toán vẽ cây hoặc thêm giao diện mới:
1.  Fork dự án này.
2.  Tạo nhánh mới (`git checkout -b feature/AmazingFeature`).
3.  Commit thay đổi (`git commit -m 'Add some AmazingFeature'`).
4.  Push lên nhánh (`git push origin feature/AmazingFeature`).
5.  Mở Pull Request.

## 👤 Tác giả

**kov1cx**
* Github: [@kov1cx](https://github.com/kov1cx)

---
*Dự án này được xây dựng với niềm tự hào về cội nguồn.* ❤️
