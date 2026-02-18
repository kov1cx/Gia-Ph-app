
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Kiểm tra xem có đang ở chế độ phát triển không
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Gia Phả Số - Digital Genealogy",
    backgroundColor: "#050505",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  if (isDev) {
    // Nếu đang dev, load từ Vite server
    win.loadURL('http://localhost:5173');
    // win.webContents.openDevTools(); // Mở console để debug nếu cần
  } else {
    // Nếu đã build, load file tĩnh trong thư mục dist
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }

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
