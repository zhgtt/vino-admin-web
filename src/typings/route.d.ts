declare type RawRouteComponent =
  | import('vue-router').RouteComponent
  | Lazy<import('vue-router').RouteComponent>;

declare namespace AuthRoute {
  /** 根路由路径 */
  type RootRoutePath = '/';

  /** 所有路由名称 */
  type NotFoundRouteKey = 'not-found';

  type AllRouteKey = string | NotFoundRouteKey;

  /**
   * 路由组件
   * - basic - 基础布局，layout 布局
   * - blank - 空白页面
   */
  type LayoutComponentType = 'basic';

  type RouteComponentType = LayoutComponentType | RawRouteComponent;

  /** 自定义路由描述 */
  interface RouteMeta<> {
    /** 路由标题，可以用来作 document.title 或 菜单 的标题 */
    title: string;
    /** 是否需要登录权限 */
    requiresAuth?: boolean;
    /** 是否为缓存页面 */
    keepAlive?: boolean;
    /**
     * 菜单和面包屑对应的图标（为 string 的话，默认去找 antd 的图标，支持对象的形式，来自定义本地图标或 iconfont 等，也可自定义样式）
     * 本地图标为 src/assets/svg-icon 文件夹中的 svg 文件名
     */
    icon?: string | import('@/components/SvgIcon/index.vue').Props;
    /** 外链链接 */
    href?: string;
    /** 路由排序顺序，用于菜单的排序 */
    order?: number;
    /**
     * 哪些类型的用户有权限才能访问的路由（空的话则表示不需要权限）
     * @description 后端动态路由数据不需要该属性，直接由后端根据用户角色返回对应权限的路由数据
     */
    permission?: [];
    /** 是否隐藏该路由对应的菜单，也就是不转换为菜单，通常用于详情页面，为 true 表示隐藏 */
    hide?: boolean;
    /** 当前路由需要选中的菜单项(用于跳转至不在左侧菜单显示的路由且需要高亮某个菜单的情况) */
    activeMenu?: RouteKey;
  }

  type Route<> = K extends AllRouteKey
    ? {
        /** 路由名称（路由的唯一标识符） */
        name: K;
        /** 路由组件 */
        component?: RouteComponentType;
        /** 路由描述 */
        meta?: RouteMeta;
        /** 子路由 */
        children?: Route[];
        /** 路由重定向 */
        redirect?: string;
      } & Omit<
        import('vue-router').RouteRecordRaw,
        'name' | 'component' | 'meta' | 'children' | 'redirect'
      >
    : never;

  /** 前端导入的路由模块 */
  type RouteModule = Record<string, { default: Route }>;
}
