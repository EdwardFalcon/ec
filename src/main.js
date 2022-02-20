const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.loadFile('index.html');
  window.webContents.openDevTools();
};

app.on('ready', createWindow);
