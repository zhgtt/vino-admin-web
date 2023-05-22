import type { RouteRecordRaw } from 'vue-router';

const Layout = () => import('@/layout/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/welcome',
    meta: {
      title: '首页',
      // icon: '',
      sort: 0,
    },
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
];

export default routes;
