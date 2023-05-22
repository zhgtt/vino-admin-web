import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import { IModuleType } from './types';

/** NOTE
 * @说明 import.meta.glob 表示从文件系统导入多个模块，默认是动态导入的（vite 支持的特殊导入语法，https://cn.vitejs.dev/guide/features.html#dynamic-import）
 * @功能 modules 是一个对象，文件系统中的每个 module 都代表一级菜单
 */
const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', {
  eager: true, // 直接引入所有模块（静态导入）
});
console.log('modules: ', modules);

// 遍历引入的 modules
const routeModuleList = Object.keys(modules).reduce((preList: RouteRecordRaw[], item) => {
  const mod = modules[item].default ?? {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  return [...preList, ...modList];
}, []);

console.log('routeModuleList: ', routeModuleList);

// 首页路由
// export const RootRoute: RouteRecordRaw = {
//   path: '/',
//   name: 'Root',
//   redirect: '/welcome', // 重定向路由
//   meta: { title: 'Root' },
// };

// 登录路由
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: { title: '登录' },
};

// NOTE 需要验证权限的路由
export const asyncRoutes = [...routeModuleList];

// NOTE 普通路由，无需验证权限
// export const constantRouter = [LoginRoute, RootRoute, RedirectRoute];
// export const constantRouter = [LoginRoute, RootRoute];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: asyncRoutes,
  strict: false, // 是否禁止地址尾部斜杠
  scrollBehavior: () => ({ left: 0, top: 0 }), // 页面跳转时控制滚动条的位置，可以返回一个 promise 来延迟滚动
});

export default router;
