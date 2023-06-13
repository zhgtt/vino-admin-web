import { defineStore } from 'pinia';

import { router, staticRoutes } from '@/router';
import { _filterAuthRoutesByUserPermission, _transformAuthRouteToMenu, _transformAuthRouteToVueRoutes } from '@/utils';

interface RouteState {
  /**
   * 权限路由有两种模式
   * - static: 前端声明的静态路由
   * - dynamic: 后端返回的动态路由
   */
  authRouteMode: ImportMetaEnv['VITE_AUTH_ROUTE_MODE'];
  // 是否初始化了权限路由
  isInitAuthRoute: boolean;
  // 菜单
  menus: App.GlobalMenuOption[];
}

export const useRouteState = defineStore('route-store', {
  state: (): RouteState => ({
    authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    isInitAuthRoute: false,
    menus: [],
  }),
  // NOTE actions 中支持 同步 / 异步 对状态进行操作
  actions: {
    /** 重置路由的 store */
    /** 重置路由数据，保留固定路由 */
    /** 是否为固定路由 */
    /** 是否为有效的固定路由 */

    /**
     * 处理权限路由，将处理后的路由 转换成菜单、添加到 router 中
     */
    handleAuthRoute(routes: AuthRoute.Route[]) {
      // console.log('routes: ', routes);
      // 将处理后的路由添加到菜单中
      this.menus = _transformAuthRouteToMenu(routes);
      console.log('this.menus: ', this.menus);

      // 将处理后的路由添加到 router 中（再触发 router 钩子守卫函数）
      const vueRoutes = _transformAuthRouteToVueRoutes(routes);
      console.log('vueRoutes: ', vueRoutes);
      vueRoutes.forEach((route) => {
        router.addRoute(route);
      });
    },

    /** 动态路由模式下，更新根路由的重定向 */

    /** 初始化动态路由 */
    async initDynamicRoute() {},

    /**
     * 初始化静态路由
     */
    async initStaticRoute() {
      const routes = _filterAuthRoutesByUserPermission(staticRoutes); // 先根据用户权限过滤路由
      this.handleAuthRoute(routes); // 再处理理由

      // 改变状态
      this.isInitAuthRoute = true;
    },

    /**
     * 初始化权限路由
     */
    async initAuthRoute() {
      if (this.authRouteMode === 'dynamic') {
        await this.initDynamicRoute();
      } else {
        await this.initStaticRoute();
      }
    },

    /** 从缓存中去除某个路由 */
    /** 添加某个缓存路由 */
  },
});
