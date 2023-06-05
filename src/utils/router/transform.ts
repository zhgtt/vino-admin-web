import type { RouteComponent, RouteRecordRaw } from 'vue-router';

interface ModuleComponent {
  default: RouteComponent;
}

type LayoutComponent = Record<AuthRoute.LayoutComponentType, Lazy<ModuleComponent>>; // Record 属性映射

type ComponentAction = Record<AuthRoute.LayoutComponentType, () => void>;

/**
 * 布局页面
 * @param layoutType - 布局类型（目前仅支持一种） - 'basic'
 */
const getLayoutComponent = (layoutType: AuthRoute.LayoutComponentType) => {
  const layoutComponent: LayoutComponent = {
    basic: () => import('@/layouts/index.vue'),
  };
  return layoutComponent[layoutType];
};

/**
 * 是否有路由组件
 */
const hasComponent = (route: AuthRoute.Route) => Boolean(route.component);

/**
 * 批量转换路由组件（一般是第一层路由）
 */
export const transformAuthRouteToVueRoutes = (routes: AuthRoute.Route[]) => {
  return routes.map((route) => transformAuthRouteToVueRoute(route)).flat(1);
};

/**
 * 转换单个路由组件
 */
export const transformAuthRouteToVueRoute = (item: AuthRoute.Route) => {
  const resultRoute: RouteRecordRaw[] = [];

  const itemRoute = { ...item } as RouteRecordRaw;
  console.log('item: ', item);

  if (hasComponent(item)) {
    const actions: ComponentAction = {
      basic() {
        itemRoute.component = getLayoutComponent('basic');
      },
    };
    try {
      actions[item.component as AuthRoute.LayoutComponentType]();
    } catch (error) {
      window.console.error('路由组件解析失败：', item);
    }
  }

  resultRoute.push(itemRoute);

  return resultRoute;
};

// 对路由进行排序
export const sortRoutes = (routes: AuthRoute.Route[]) => {};
