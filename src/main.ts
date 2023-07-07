import { createApp } from 'vue';

import setupComponents from '@/components';
import { setupAssets } from '@/plugins';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue';

import '@/styles/main.scss';

const setupApp = async () => {
  // 挂载全局插件（静态）
  setupAssets();

  // TODO 引入 App Loading

  const app = createApp(App);

  // 注册全局组件
  setupComponents(app);

  // 挂载全局状态管理
  setupStore(app);

  // 挂载路由
  await setupRouter(app);

  app.mount('#app');
};

void setupApp();
