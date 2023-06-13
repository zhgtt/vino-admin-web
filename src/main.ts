import { createApp } from 'vue';

import setupComponents from '@/components';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue';

import 'ant-design-vue/dist/reset.css';
import './style.scss';

const setupApp = async () => {
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
