const { contextBridge } = require('electron');
const { getDirContent } = require('./api');

contextBridge.exposeInMainWorld('electronCommanderAPI', {
  getDirContent,
});
