export interface ElectronAPI {
  getSystemSpecs: () => Promise<any>;
  getRecommendations: (specs: any) => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
