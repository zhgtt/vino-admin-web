/**
 * @description 由前端定义的权限路由（需要和后端返回的路由保持一致）
 * @说明 import.meta.glob 表示从文件系统导入多个模块，默认是动态导入的（vite 支持的特殊导入语法，https://cn.vitejs.dev/guide/features.html#dynamic-import）
 * @功能 modules 是一个对象，文件系统中的每个 module 都代表一级菜单
 */

// import { sortRoutes } from '@/router/utils';

const modules = import.meta.glob<AuthRoute.RouteModule>('./**/*.ts', {
  eager: true, // 直接引入所有模块（静态导入）
});
console.log('modules: ', modules);

// 遍历引入的 modules
const routeModuleList = Object.keys(modules).reduce((preList: AuthRoute.Route[], item) => {
  const mod = modules[item].default ?? {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  return [...preList, ...modList];
}, []);

// 排序
// sortRoutes(routeModuleList);

console.log('routeModuleList: ', routeModuleList);

export const staticRoutes = [...routeModuleList];
