import { h } from 'vue';

import { SvgIcon } from '@/components';

/** 不将路由转换成菜单 */
const hideInMenu = (route: AuthRoute.Route) => Boolean(route.meta?.hide);

/** 渲染 icon */
const iconRender = (icon: AuthRoute.RouteMeta['icon']) => {
  if (typeof icon === 'string') {
    return () => h(SvgIcon, { name: icon });
  } else {
    return () => h(SvgIcon, icon);
  }
};

/**
 * 路由转成菜单
 */
export const _transformAuthRouteToMenu = (routes: AuthRoute.Route[]) => {
  const globalMenu: App.GlobalMenuOption[] = [];

  routes.forEach((route) => {
    const { name, path, meta } = route;
    const { icon, title, hide, multi = true } = meta || {};
    let menuChildren: App.GlobalMenuOption[] | undefined; // 没有子路由时，将 children 设置为 undefined

    if (route.children && route.children.length > 0) {
      menuChildren = _transformAuthRouteToMenu(route.children);
    }
    const menuItem: App.GlobalMenuOption = {
      key: name,
      label: title || '无标题',
      routePath: path,
      hide: !!hide,
      ...(icon && { icon: iconRender(icon) }),
      ...(menuChildren && { children: menuChildren, multi }),
    };

    // if (!hideInMenu(route)) {
    globalMenu.push(menuItem);
    // }
  });

  return globalMenu;
};

/**
 *
 */
