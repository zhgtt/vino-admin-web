/**
 * 对路由进行处理，转换 vue 组件、处理单路由、多级路由、路由重定向等、对路由排序等
 */
import type { RouteRecordRaw } from 'vue-router';

import { getLayoutComponent, getViewComponent } from './component';

/** 是否为动态权限路由 */
const hasDynamicPath = (item: AuthRoute.Route) => Boolean(item.meta?.dynamicPath);

/** 是否有组件 */
const hasComponent = (item: AuthRoute.Route) => Boolean(item.component);

/** 是否有子路由 */
const hasChildren = (item: AuthRoute.Route) => Boolean(item.children && item.children.length);

/** 是否为单路由 */
const hasSingleRoute = (item: AuthRoute.Route) => Boolean(item.meta?.singleLayout);

/** 是否为外链路由 */
const hasHref = (item: AuthRoute.Route) => Boolean(item.meta?.href);

/**
 * 批量转换路由组件，将路由中的 component 转换成 vue 组件（递归处理路由）
 * 转换的是 modules 里面的路由及后端返回的动态路由，不包含定义的固定路由
 */
export const transformAuthRouteToVueRoutes = (routes: AuthRoute.Route[]) => {
  return routes.map((route) => transformAuthRouteToVueRoute(route)).flat(1); // flat 将二维数组铺平
};

/**
 * 转换单个路由组件
 */
type ComponentAction = Record<AuthRoute.RouteComponentType, () => void>;

export const transformAuthRouteToVueRoute = (item: AuthRoute.Route) => {
  const resultRoute: RouteRecordRaw[] = [];

  const itemRoute = { ...item } as RouteRecordRaw;

  /** 处理动态路由 */
  if (hasDynamicPath(item)) {
    Object.assign(itemRoute, { path: item.meta?.dynamicPath });
  }

  /** 处理外链路由，将该路由的页面设置为 404 */
  if (hasHref(item)) {
    Object.assign(itemRoute, { component: getViewComponent('404') });
  }

  /** 判断是否含有组件，渲染相对应的 vue 组件 */
  if (hasComponent(item)) {
    const actions: ComponentAction = {
      basic() {
        itemRoute.component = getLayoutComponent('basic');
      },
      blank() {
        itemRoute.component = getLayoutComponent('blank');
      },
      self() {
        itemRoute.component = getViewComponent(item.name);
      },
      multi() {
        // 多级路由一定含有子路由，将其 component 删除掉
        if (hasChildren(item)) {
          Object.assign(itemRoute, { meta: { ...itemRoute.meta, multi: true } as AuthRoute.RouteMeta });
          delete itemRoute.component;
        } else {
          window.console.error('多级路由缺少子路由: ', item);
        }
      },
    };
    try {
      actions[item.component as AuthRoute.LayoutComponentType]();
    } catch (error) {
      window.console.error('路由组件解析失败：', item);
    }
  }

  /** 判断是否为单路由，给单路由的页面添加基础布局（由于单路由不应该再有子路由，因此它的处理逻辑要放在前面） */
  if (hasSingleRoute(item)) {
    if (hasChildren(item)) {
      window.console.error('单独路由不应该有子路由', item);
    }
    // 捕捉无效的路由
    if (item.name === 'not-found') {
      itemRoute.children = [
        {
          path: '',
          name: item.name,
          component: getViewComponent('not-found'),
        },
      ];
    } else {
      // 添加布局组件
      const parentPath = `${item.path}-parent`;
      const layout = item.meta?.singleLayout === 'basic' ? getLayoutComponent('basic') : getLayoutComponent('blank');
      const parentRoute: RouteRecordRaw = {
        path: parentPath,
        component: layout,
        redirect: item.path,
        children: [itemRoute],
      };
      // console.log('parentRoute: ', parentRoute);

      return [parentRoute];
    }
  }

  /** 判断是否含有子组件，将子组件递归处理相同的逻辑 */
  if (hasChildren(item)) {
    const children = (item.children as AuthRoute.Route[]).map((child) => transformAuthRouteToVueRoute(child)).flat(1);

    // 如果没有定义 redirect，将多级路由下的第一个路由（不能为多级路由）作为重定向路由，以免在导致页面跳转失败的问题（也可以在路由中自定义）
    const redirectPath = item.redirect || children.find((item) => !item.meta?.multi)?.path || '/';

    if (redirectPath === '/') {
      window.console.error('该多级路由下没有有效的子路径', item);
    }

    if (item.component === 'multi') {
      // 多级路由，将子路由提取出来变成同级
      resultRoute.push(...children);
      delete itemRoute.children;
    } else {
      itemRoute.children = children;
    }
    itemRoute.redirect = redirectPath; // 赋值重定向路由
  }

  resultRoute.push(itemRoute);

  return resultRoute;
};

/**
 * 对路由进行排序
 * NOTE next - 下一个数据，pre - 上一个数据；返回值 > 0，next 在 pre 的后面，反之 next 在 pre 的前面
 */
export const sortRoutes = (routes: AuthRoute.Route[]) => {
  return routes
    .sort((next, pre) => Number(next.meta?.order) - Number(pre.meta?.order))
    .map((item) => {
      if (item.children) sortRoutes(item.children);
      return item;
    });
};
