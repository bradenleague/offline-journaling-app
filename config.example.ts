interface AppConfig {
  lmStudio: {
    baseUrl: string;
    model?: string;
    timeout?: number;
  };
}

export const config: AppConfig = {
  lmStudio: {
    baseUrl: 'http://localhost:1234', // Replace with your LM Studio server
    model: '', // Leave empty to use the loaded model, or specify exact model name
    timeout: 30000, // 30 seconds timeout
  },
}; 