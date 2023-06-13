import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import { _transformAuthRouteToVueRoutes } from '@/utils';
import { createRouterGuards } from './guards';
import { constantRoutes } from './routes';

// 创建路由实例
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: _transformAuthRouteToVueRoutes(constantRoutes), // 转换固定的路由
  strict: false, // 是否禁止地址尾部斜杠
  scrollBehavior: () => ({ left: 0, top: 0 }), // 页面跳转时控制滚动条的位置，可以返回一个 promise 来延迟滚动
});

/** NOTE
 * @description 先挂载静态路由，然后在路由守卫中处理权限路由，再挂载
 */
export const setupRouter = async (app: App) => {
  app.use(router);
  createRouterGuards(router); // 创建路由守卫钩子
  await router.isReady(); // 路由准备就绪后挂载 App 实例
};

/** 定义所有的路由名称 */
export const routeName = (key: AuthRoute.AllRouteKey) => key;
/** 定义所有的路由路径 */
// export const routePath = (key: Exclude<AuthRoute.AllRouteKey, 'not-found'>) => transformRouteNameToRoutePath(key);

export * from './modules'; // 引入前端定义的静态路由（和后端返回的一一对应）
export * from './routes'; // 引入固定的静态路由
