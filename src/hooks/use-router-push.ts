/**
 * 对 vue-router 中的路由跳转做一个拓展
 */
import type { RouteLocationRaw } from 'vue-router';
import { useRouter } from 'vue-router';

import { router as globalRouter, routeName } from '@/router';

export const useRouterPush = () => {
  const router = useRouter();
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
    return router.go(-1);
  };

  /**
   * 跳转首页
   * @param newTab - 在新标签页打开
   */
  const routerToHome = (newTab = false) => {
    // routerPush({name})
  };

  /**
   * 跳转登录页面
   */
  const toLogin = () => {};

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
  const toLoginRedirect = () => {};

  return { routerPush, routerBack, routerToHome, toLogin, toLoginModule, toLoginRedirect };
};
