import { h } from 'vue';

import SvgIcon from '@/components/SvgIcon/index.vue';

/**
 * 不将路由转换成菜单
 */
const hideInMenu = (route: AuthRoute.Route) => Boolean(route.meta?.hide);

/**
 * 渲染 icon
 */
const iconRender = (icon: AuthRoute.RouteMeta['icon']) => {
  if (typeof icon === 'string') {
    return () => h(SvgIcon, { name: icon });
  } else {
    return () => h(SvgIcon, icon);
  }
};

/**
 * @description 路由转成菜单
 */
export const transformAuthRouteToMenu = (routes: AuthRoute.Route[]) => {
  const globalMenu: App.GlobalMenuOption[] = [];

  routes.forEach((route) => {
    const { name, path, meta } = route;
    const { icon, title } = meta || {};
    let menuChildren: App.GlobalMenuOption[] | undefined; // 没有子路由时，将 children 设置为 undefined

    if (route.children && route.children.length > 0) {
      menuChildren = transformAuthRouteToMenu(route.children);
    }
    const menuItem: App.GlobalMenuOption = {
      key: name,
      label: title || '无标题',
      routePath: path,
      ...(icon && { icon: iconRender(icon) }),
      ...(menuChildren && { children: menuChildren }),
      popupClassName: 'vino-sider-submenu-popup', // 折叠
    };

    // const menuItem =
    if (!hideInMenu(route)) {
      globalMenu.push(menuItem);
    }
  });

  return globalMenu;
};

/**
 * 获取当前路由所在的菜单 key 组成的数组
 */
export const getActiveKeyPathsOfMenus = (
  menus: App.GlobalMenuOption[],
  func: (item: App.GlobalMenuOption) => boolean, // 接收 一个判断条件 作为参数
  path: string[] = []
) => {
  if (!menus) return [];
  for (const item of menus) {
    path.push(item.key);
    if (func(item)) return path;
    if (item.children) {
      const res = getActiveKeyPathsOfMenus(item.children, func, path) as string[];
      if (res.length) return res;
    }
    path.pop(); // 避免数组存在之前的缓存数据
  }
  return [];
};
