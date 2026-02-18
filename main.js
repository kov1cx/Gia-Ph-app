
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

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

  // Load file index.html từ thư mục gốc
  win.loadFile('index.html');

  // Ẩn Menu bar mặc định để trông chuyên nghiệp hơn
  Menu.setApplicationMenu(null);

  // Mở DevTools nếu cần (nhấn Ctrl+Shift+I trong app)
  // win.webContents.openDevTools();
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
