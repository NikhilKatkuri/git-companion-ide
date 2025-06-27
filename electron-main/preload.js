// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expose a limited set of IPC methods to the renderer process.
// This is a security best practice: avoid exposing the entire 'ipcRenderer' object.
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Sends a message to the main process to minimize the window.
   */
  minimize: () => ipcRenderer.send('window-minimize'),
  
  /**
   * Sends a message to the main process to maximize/unmaximize the window.
   */
  maximize: () => ipcRenderer.send('window-maximize'),
  
  /**
   * Sends a message to the main process to close the window.
   */
  close: () => ipcRenderer.send('window-close'),

  /**
   * Listens for window state changes (e.g., maximized/unmaximized) from the main process.
   * @param {function(string): void} callback - The function to call when the window state changes.
   */
  onWindowStateChange: (callback) => {
    // It's important to clean up listeners when the component unmounts
    // to prevent memory leaks. This uses a standard Electron pattern.
    const listener = (event, state) => callback(state);
    ipcRenderer.on('window-state-changed', listener);
    // Return an unsubscribe function
    return () => ipcRenderer.removeListener('window-state-changed', listener);
  }
});