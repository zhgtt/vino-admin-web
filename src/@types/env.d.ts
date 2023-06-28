interface ImportMetaEnv {
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string;

  /** 项目名称 */
  readonly VITE_APP_NAME: string;

  /** 项目标题 */
  readonly VITE_APP_TITLE: string;

  /** 项目描述 */
  readonly VITE_APP_DESC: string;

  /** 路由首页地址 */
  readonly VITE_ROUTE_HOME_PATH: string;

  /**
   * 权限路由模式
   * - static - 前端声明的静态路由
   * - dynamic - 后端返回的动态路由
   */
  readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic';
}
