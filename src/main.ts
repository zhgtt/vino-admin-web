import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'ant-design-vue/dist/reset.css';
import './style.scss';

const app = createApp(App);
app.use(router); // 挂载路由

app.mount('#app');
