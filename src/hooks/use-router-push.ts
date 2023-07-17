/**
 * 对 vue-router 中的路由跳转做一个拓展
 */
import type { RouteLocationRaw } from 'vue-router';
import { useRouter } from 'vue-router';

import { router as globalRouter, routeName } from '@/router';

/**
 * 处理路由跳转
 * @param inSetup - 是否在 vue 页面/组件的 setup 中调用，因为在异步函数（接口请求）中 里无法使用 useRouter 和 useRoute
 */
export const useRouterPush = (inSetup = true) => {
  const router = inSetup ? useRouter() : globalRouter;
  /**
   * NOTE
   * globalRouter 表示 router 实例，包含很多它的实例对象
   */
  console.log('globalRouter: ', globalRouter);
  const route = globalRouter.currentRoute; // 当前路由，它是一个 RefImpl 对象，其中的 value 属性就是当前路由的实例对象，包括 meta、query 等

  /**
   * 路由跳转
   * @param to - 需要跳转的路由
   * @param newTab - 是否在新标签页打开
   */
  const routerPush = (to: RouteLocationRaw, newTab = false) => {
    if (newTab) {
      const routerData = router.resolve(to); // 解析目标位置
      window.open(routerData.href, '_blank');
      return Promise.resolve();
    }
    return router.push(to);
  };

  /**
   * 返回上一级路由
   */
  const routerBack = () => {
    router.go(-1);
  };

  /**
   * 跳转首页
   * @param newTab - 在新标签页打开
   */
  const toHome = (newTab = false) => {
    routerPush({ name: routeName('root') }, newTab);
  };

  /**
   * 跳转登录页面
   */
  const toLogin = (loginModule?: UnionKey.LoginModule, redirectUrl?: string) => {
    const module = loginModule || 'account-login';
    const routeLocation = { name: routeName('login'), params: { module } };
    const redirect = redirectUrl || route.value.fullPath;

    // 合并对象
    Object.assign(routeLocation, { query: { redirect } });
    routerPush(routeLocation);
  };

  /**
   * 登录页切换其他模块，比如注册、二维码登录等
   */
  const toLoginModule = (module: UnionKey.LoginModule) => {
    const { query } = route.value;
    routerPush({ name: routeName('login'), params: { module }, query });
  };

  /**
   * 登录成功后跳转重定向的地址
   */
  const toLoginRedirect = () => {
    const { query } = route.value;
    if (query?.redirect) {
      routerPush(query.redirect as string); // 跳转重定向的地址
    } else {
      toHome(); // 跳转至首页
    }
  };

  return { routerPush, routerBack, toHome, toLogin, toLoginModule, toLoginRedirect };
};
