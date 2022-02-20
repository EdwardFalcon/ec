const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.loadFile('index.html');
};

app.on('ready', createWindow);
