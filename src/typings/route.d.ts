declare type RawRouteComponent = import('vue-router').RouteComponent | Lazy<import('vue-router').RouteComponent>;

declare namespace AuthRoute {
  /** 根路由路径 */
  type RootRoutePath = '/';

  /** 所有路由名称 */
  type NotFoundRouteKey = 'not-found';

  type AllRouteKey = string | NotFoundRouteKey;

  /**
   * 路由组件
   * - basic - 基础布局，也就是项目中的 layout 布局
   * - blank - 空白页面，提供最基础的样式
   * - self - 自身组件页面
   * - multi - 多级菜单，当需要多级菜单时，将它设为父级路由的 component
   */
  type RouteComponentType = 'basic' | 'self' | 'blank' | 'multi';

  type LayoutComponentType = 'basic' | 'blank';

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
    activeMenu?: string;
    /** 作为单级路由的父级路由组件（通常用于单级路由也需要页面布局） */
    singleLayout?: Extract<RouteComponentType, 'basic' | 'blank'>;
    /** TODO 菜单后缀的标签，给菜单醒目的提示 */
    /** TODO 菜单后缀的角标，用于展示数字 */
    /** 表示是否是多级路由的中间级路由，也就是菜单中负责展开/收起的父级菜单（用于转换路由数据时筛选多级路由的标识，将其设置为 false 时，表示菜单不可展开/收起）*/
    multi?: boolean;
  }

  type Route<> = K extends AllRouteKey
    ? {
        /** 路由名称（路由的唯一标识符） */
        name: string;
        /** 路由组件 */
        component?: RouteComponentType;
        /** 路由描述 */
        meta?: RouteMeta;
        /** 子路由 */
        children?: Route[];
        /** 路由重定向 */
        redirect?: string;
      } & Omit<import('vue-router').RouteRecordRaw, 'name' | 'component' | 'meta' | 'children' | 'redirect'>
    : never;

  /** 前端导入的路由模块 */
  type RouteModule = Record<string, { default: Route }>;
}
