const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // __dirname apunta a la ruta del script que se está ejecutando actualmente 
      // path.join segmentos de ruta, creando una que funciona en todas las plataformas
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  ipcMain.handle('ping', () => 'pong');
  win.loadFile('index.html');
};

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});