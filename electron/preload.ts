import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getSystemSpecs: () => ipcRenderer.invoke('get-system-specs'),
  getRecommendations: (specs: any) => ipcRenderer.invoke('get-recommendations', specs),
});
