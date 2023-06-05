/**
 * 对 vue-router 中的路由跳转做一个拓展
 */
import type { RouteLocationRaw } from 'vue-router';
import { useRouter } from 'vue-router';

export const useRouterPush = () => {
  const router = useRouter();

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
   * 返回上一级
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

  return { routerPush, routerBack, routerToHome };
};
