
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1366,
    height: 850,
    minWidth: 1024,
    minHeight: 768,
    title: "Gia Phả Số - Phiên Bản Di Sản v1.5",
    backgroundColor: "#050505",
    show: false, // Không hiển thị ngay để tránh nháy trắng
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // Nếu cần dùng các hàm hệ thống sau này
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  // Hiển thị mượt mà khi đã load xong
  win.once('ready-to-show', () => {
    win.show();
  });

  // Mở các link ngoài bằng trình duyệt mặc định của máy
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Loại bỏ menu mặc định để tăng tính thẩm mỹ
  Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
