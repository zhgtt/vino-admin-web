/**
 * @description 每次路由跳转时的处理逻辑（外链、权限路由等）
 */

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import { routeName } from '@/router';
import { useRouteState } from '@/store';

// 动态路由
const createDynamicRouteGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const route = useRouteState(); // 引入 route store 全局的状态管理

  // 初始化权限路由，如果未初始化动态权限路由，需走到 store 中（通常是第一次页面渲染或页面刷新）
  if (!route.isInitAuthRoute) {
    // 未登录的情况下直接跳转至登录页，登陆成功后再加载权限路由
    // if (!isLogin) {
    //   return false
    // }

    // 根据不同模式，执行其对应的初始化权限路由逻辑
    await route.initAuthRoute();

    next({ path: to.fullPath, replace: true });
  }

  console.log('to.name: ', to.name);

  // 权限路由已经加载，但仍然未找到路由，则重定向到 404
  if (to.name === routeName('not-found')) {
    next({ name: routeName('404'), replace: true });
    return false;
  }

  return true;
};

/**
 * @description 处理权限路由
 */
export const createPermissionGuard = async (
  to: RouteLocationNormalized, // 当前路由
  from: RouteLocationNormalized, // 上一个路由
  next: NavigationGuardNext // 跳转路由
) => {
  // 处理动态路由（包括前端定义的静态路由）
  const permission = await createDynamicRouteGuard(to, from, next);
  // console.log('permission: ', permission);
  if (!permission) return;

  // 外链路由，从新标签页打开，要返回上一个路由
  if (to.meta.href) {
    window.open(to.meta.href as string);
    next({ path: from.fullPath, replace: true, query: from.query });
    return;
  }

  // 第一次已登录状态跳转至首页

  // 已登录状态，有页面权限，直接通行

  // 已登录状态，无页面权限，重定向到 403 页面

  // 未登录状态，进行登录页面

  // 不需要登录状态的，直接通行，比如 404，403 等

  next();
};
