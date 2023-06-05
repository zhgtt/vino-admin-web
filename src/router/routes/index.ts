/**
 * @description 静态路由（登录页、404等）
 */

/** 根路由（也可以是动态路由） */
export const ROOT_ROUTE: AuthRoute.Route = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: { title: 'Root' },
};

/** 固定的静态路由 */
export const constantRoutes: AuthRoute.Route[] = [
  ROOT_ROUTE,
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/_builtin/login/index.vue'),
    meta: { title: '登录' },
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/_builtin/404/index.vue'),
    meta: { title: '页面丢失了' },
  },
  {
    name: '403',
    path: '/403',
    component: () => import('@/views/_builtin/403/index.vue'),
    meta: { title: '无权限' },
  },
  {
    name: '500',
    path: '/500',
    component: () => import('@/views/_builtin/500/index.vue'),
    meta: { title: '服务器出错啦' },
  },
  /** 捕获所有 not-found 页面 */
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*', // 正则匹配
    component: () => import('@/views/_builtin/404/index.vue'),
    meta: { title: '未找到页面' },
  },
];
