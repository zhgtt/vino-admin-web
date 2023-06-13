/**
 * 将定义的路由的 component 转换成真正的 vue 组件
 */
import type { RouteComponent } from 'vue-router';

import { BasicLayout, BlankLayout } from '@/layouts';
import { isFunction } from '@/utils';
import { views } from '@/views';

interface ModuleComponent {
  default: RouteComponent;
}

type LayoutComponent = Record<AuthRoute.LayoutComponentType, Lazy<ModuleComponent>>; // Record 属性映射

/** 判断是否为异步导入的组件 */
const isAsyncComponent = (component: RouteComponent | Lazy<ModuleComponent>): component is Lazy<ModuleComponent> => {
  return isFunction(component);
};

/**
 * 整体布局组件
 */
export const getLayoutComponent = (layoutType: AuthRoute.LayoutComponentType) => {
  const layoutComponent: LayoutComponent = {
    basic: BasicLayout,
    blank: BlankLayout,
  };
  return layoutComponent[layoutType];
};

/**
 * 获取路由对应的 vue 组件
 */
export const getViewComponent = (routeName: string) => {
  if (!views[routeName]) {
    throw new Error(`路由“${routeName}”没有对应的组件文件！`);
  }

  const componet = views[routeName] as RouteComponent | Lazy<ModuleComponent>;

  // 是否为懒加载的组件（必是一个函数）
  if (isAsyncComponent(componet)) {
    return async () => {
      // NOTE result 是一个 module 模块对象，内含 default 对象，default 中包含 render 属性（组件的渲染函数）
      const result = await componet();
      Object.assign(result.default, { name: routeName });
      // console.log('result: ', result);
      return result;
    };
  }

  Object.assign(componet, { name: routeName });

  return componet;
};
