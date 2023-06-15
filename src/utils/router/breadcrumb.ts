import { _findTreeNodePath } from '@/utils';

/**
 * 根据 route.name 和 menus 获取面包屑数据
 * @param activeKey - 当前路由的 name，也就是菜单的 key
 * @param menus - 菜单
 */
export const getBreadcrumbByRouteKey = (activeKey: string, menus: App.GlobalMenuOption[]): App.GlobalBreadcrumb[] => {
  // 根据当前路由的 name，找到其对应的菜单及父级菜单
  const breadList = _findTreeNodePath(menus, (item) => item.key === activeKey) as App.GlobalMenuOption[];
  // console.log('breadList: ', breadList);

  return breadList.map(({ routePath, icon, children, label, key }, index) => ({
    key,
    path: routePath,
    breadcrumbName: label as string,
    ...(icon && { icon }),
    ...(children && children.length > 0 && { childList: children }),
    readonly: index === breadList.length - 1,
  }));
};
