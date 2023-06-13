/** 主题相关类型 */
declare namespace Theme {}

/** 系统、菜单相关类型 */
declare namespace App {
  /** 菜单项 */
  type GlobalMenuOption = import('ant-design-vue').ItemType & {
    key: string; // 唯一值
    label: string; // 名称，标题
    routeName?: string;
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
    breadcrumbName: string; // 名称
    path?: string; // 路径
    icon?: () => import('vue').Component;
    childList?: GlobalMenuOption[]; // 面包屑中的子菜单
    readonly?: boolean; // 是否只读
  };
}
