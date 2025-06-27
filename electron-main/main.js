const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

// Enable electron-reload in development
// This should typically be required directly at the top.
// The try-catch block is good for production to prevent errors if the module isn't installed.
try {
  require('electron-reload')(__dirname, {
    // electron: require('electron'), // This line is usually not needed as electron-reload finds it automatically
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

/**
 * Creates the main application window.
 */
function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    minWidth: 600,
    height: 800,
    minHeight: 700,
    frame: false, // Custom title bar - set to true for default frame
    titleBarStyle: 'hidden', // 'hidden' makes the title bar hidden but controls visible (for macOS)
    icon: path.join(__dirname, '../assets/Star_Fall_Minimalistic.png'), // Path to your application icon
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Preload script for secure IPC
      contextIsolation: true, // Crucial for security
      nodeIntegration: false, // Prevents Node.js APIs in renderer process for security
    },
  });

  // Load the React app from the development server
  win.loadURL('http://localhost:3000');
  
  // Remove the default menu bar (optional, typically used with custom frame)
  win.removeMenu();

  // Event listeners for window state changes, useful for custom title bars
  win.on('maximize', () => {
    win.webContents.send('window-state-changed', 'maximized');
  });

  win.on('unmaximize', () => {
    win.webContents.send('window-state-changed', 'unmaximized');
  });

  // Optional: Open DevTools for debugging during development
  // win.webContents.openDevTools();
}

// Event: All windows closed - Quits the app when all windows are closed,
// unless on macOS (darwin), where applications typically stay active in the dock.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Event: App ready - This event is emitted when Electron has finished
// initializing and is ready to create browser windows.
app.whenReady().then(() => {
  createWindow();

  // IPC Window Control Listeners
  // Handle minimize action from renderer process
  ipcMain.on('window-minimize', () => {
    if (win) {
      win.minimize();
    }
  });

  // Handle maximize/unmaximize action from renderer process
  ipcMain.on('window-maximize', () => {
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }
  });

  // Handle close action from renderer process
  ipcMain.on('window-close', () => {
    if (win) {
      win.close();
    }
  });

  // macOS specific: Recreate a window when the dock icon is clicked and no windows are open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});