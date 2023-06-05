/** 主题相关类型 */
declare namespace Theme {}

/** 系统、菜单相关类型 */
declare namespace App {
  type GlobalMenuOption = import('ant-design-vue').ItemType & {
    key: string;
    label: string;
    routeName?: string;
    routePath: string;
    icon?: () => import('vue').VNodeChild | string;
    children?: GlobalMenuOption[];
    i18nTitle?: string;
  };
}
