/**
 * 全局管理 router 的状态
 */
import { defineStore } from 'pinia';

import { router, staticRoutes } from '@/router';
// import { layout } from '@/settings';
import { useAuthStore } from '@/store';
import {
  filterAuthRoutesByUserPermission,
  transformAuthRouteToMenu,
  transformAuthRouteToVueRoutes,
} from '@/utils/router';

// const { mode, menu } = layout;

interface RouteState {
  /**
   * 权限路由有两种模式
   * - static: 前端声明的静态路由
   * - dynamic: 后端返回的动态路由
   */
  authRouteMode: ImportMetaEnv['VITE_AUTH_ROUTE_MODE'];
  // 是否初始化了权限路由
  isInitAuthRoute: boolean;
  // 菜单（全部）
  menus: App.GlobalMenuOption[];
}

export const useRouteStore = defineStore('route-store', {
  state: (): RouteState => ({
    authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    isInitAuthRoute: false,
    menus: [],
  }),
  // NOTE actions 中支持 同步 / 异步 对状态进行操作
  actions: {
    /** 重置路由的 store */
    resetRouteStore() {
      this.resetRoutes();
      this.$reset();
    },

    /** 重置路由数据，保留固定路由 */
    resetRoutes() {
      const routes = router.getRoutes(); // 获取所有路由
      routes.forEach((route) => {
        const name = route.name || 'root';
        // if (!this.) {
        // router.removeRoute(name);
        // }
      });
    },

    /** 是否为固定路由 */
    isConstantRoute(name: string) {
      //   const constantRouteNames =
    },

    /** 是否为有效的固定路由 */
    isValidConstantRoute(name: string) {},

    /**
     * NOTE 处理权限路由，将处理后的路由 转换成菜单、添加到 router 中
     */
    handleAuthRoute(routes: AuthRoute.Route[]) {
      // console.log('routes: ', routes);
      // 将处理后的路由添加到菜单中
      this.menus = transformAuthRouteToMenu(routes);
      console.log('this.menus: ', this.menus);

      // 将处理后的路由添加到 router 中（再触发 router 钩子守卫函数）
      const vueRoutes = transformAuthRouteToVueRoutes(routes);
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
      const auth = useAuthStore();

      // 先根据用户权限过滤路由
      const routes = filterAuthRoutesByUserPermission(staticRoutes, auth.userInfo.userRole);
      // 再处理路由
      this.handleAuthRoute(routes);

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
