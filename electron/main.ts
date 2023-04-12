import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

// Add these lines for hot reloading
import electronReload from 'electron-reload';
if (process.env['NODE_ENV'] !== 'production') {
  electronReload(path.join(__dirname, '/../choses'), {
    electron: require.resolve('electron'),
    hardResetMethod: 'exit',
  });
}

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startUrl =
  process.env['NODE_ENV'] === 'production'
    ? url.format({
        pathname: path.join(__dirname, '/../choses/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    : 'http://localhost:4200';

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
