const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

// Enable electron-reload in development
try {
  require('electron-reload')(__dirname, {
    electron: require('electron'),
    hardResetMethod: 'exit',
  });
} catch (e) {
  console.warn(
    'electron-reload failed to initialize. This is expected in production.',
    e.message
  );
}

// Declare win globally so it's accessible in IPC handlers
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false, // Custom title bar
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, '../assets/Star_Fall_Minimalistic.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:3000');
  win.removeMenu();

  // Optional: for detecting maximize/unmaximize
  win.on('maximize', () => {
    win.webContents.send('window-state-changed', 'maximized');
  });

  win.on('unmaximize', () => {
    win.webContents.send('window-state-changed', 'unmaximized');
  });
}

// Event: All windows closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Event: App ready
app.whenReady().then(() => {
  createWindow();

  // IPC Window Control Listeners
  ipcMain.on('window-minimize', () => {
    if (win) win.minimize();
  });

  ipcMain.on('window-maximize', () => {
    if (win) {
      if (win.isMaximized()) win.unmaximize();
      else win.maximize();
    }
  });

  ipcMain.on('window-close', () => {
    if (win) win.close();
  });

  // macOS: recreate window when dock icon clicked and no windows open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
