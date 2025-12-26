const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getSystemSpecs: () => ipcRenderer.invoke('get-system-specs'),
  getRecommendations: (specs) => ipcRenderer.invoke('get-recommendations', specs),
});
