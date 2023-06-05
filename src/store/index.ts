import { createPinia } from 'pinia';
import type { App } from 'vue';

// 创建 pinia 实例
const store = createPinia();

export const setupStore = (app: App) => {
  app.use(store);
};

export * from './modules';
