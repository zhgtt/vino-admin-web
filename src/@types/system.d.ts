/** 主题相关类型 */
declare namespace Theme {}

/** 系统、菜单相关类型 */
declare namespace App {
  /** 菜单项 */
  type GlobalMenuOption = import('ant-design-vue').ItemType & {
    key: string; // 唯一值
    label: string; // 名称，标题
    routePath: string; // 路径
    icon?: () => import('vue').Component;
    children?: GlobalMenuOption[];
    i18nTitle?: string;
    hide?: boolean; // 是否隐藏此菜单（默认为 false）
    multi?: boolean; // 多级菜单是否可展开/收起，如果不需要展开/收起，将其设置为 false（true）
    activeMenu?: string; // 一些不显示在菜单栏，但是需要高亮某个菜单，需要指定该属性
  };

  /** 面包屑 */
  type GlobalBreadcrumb = {
    key: string; // 唯一值
    breadcrumbName: string; // 名称
    path?: string; // 路径
    icon?: () => import('vue').Component;
    childList?: GlobalMenuOption[]; // 面包屑中的子菜单
    readonly?: boolean; // 是否只读
  };

  /** 跨站点导航 */
  type GlobalAppsMenu = {
    title: string; // 标题，有 children 时，它就是分组标题
    desc?: string; // 描述
    children?: GlobalAppsMenu[]; // 分组 list
    icon?: string; // 图标地址（TODO 暂时不支持本地）
    url?: string; // 链接地址
  };

  /**
   * layout 布局模式
   * - top - 只展示顶部导航栏
   * - mix - 混合模式
   */
  type LayoutMode = 'top' | 'mix';

  /** 侧边栏设置 */
  type AsideOptions = {
    width: number; // 宽度
  };

  /** 菜单设置 */
  type MenuOptions = {
    position?: 'left' | 'top'; // 菜单位置，只在 mix 模式下生效，为 top 时，只展示第一层菜单，默认为 left
  };

  /** logo 设置 */
  type LogoOptions = {
    src: string; // logo 地址
    alt?: string; // 辅助说明
  };

  /** 全局公告栏设置 */
  type AlertOptions = {
    background?: string; // 背景颜色
    message: CustomContentType; // 自定义 message 内容
    isClosed?: boolean; // 是否可以关闭
    isShowIcon?: boolean?; // 是否显示图标
  };

  /** 页面布局配置项 */
  type GlobalLayoutSettings = {
    title: string; // 标题
    appList?: GlobalAppsMenu[]; // 跨站点导航
    mode: LayoutMode; // 布局模式
    menu?: MenuOptions; // 菜单设置
    aside: AsideOptions; // 侧边栏设置
    logo?: LogoOptions;
    // actionsRender?: any;  // 操作按钮
    // avatarProps?: any; // 头像
    footer?: {
      copyright?: string; // 版权文字说明
    };
  };

  /** 系统配置项 */
  type GlobalSystemSettings = {
    iconFontUrl?: string; // iconfot script 地址
    alert?: AlertOptions;
  };
}
