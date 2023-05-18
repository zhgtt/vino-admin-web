import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
      //   keepAlive: true,
    },
    component: () => import('@/views/home/index.vue'), // 路由懒加载
  },
  // ......
];

export default routes;
