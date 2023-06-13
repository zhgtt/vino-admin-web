/**
 * 定义所有的页面路由，结构为 name: component，其中 name 必须和 router 中定义的 name 保持一致
 */

import type { RouteComponent } from 'vue-router';

export const views: Record<string, RouteComponent | (() => Promise<{ default: RouteComponent }>)> = {
  /** 固定的页面 */
  404: () => import('./_builtin/404/index.vue'),
  403: () => import('./_builtin/403/index.vue'),
  500: () => import('./_builtin/500/index.vue'),
  login: () => import('./_builtin/login/index.vue'),
  'not-found': () => import('./_builtin/404/index.vue'),

  /** 自定义的页面 */
  component_button: () => import('./component/button/index.vue'),
  component_qrcode: () => import('./component/qrcode/index.vue'),
  dashboard_workbench: () => import('./dashboard/workbench/index.vue'),
  about: () => import('./about/index.vue'),
  'multi-menu_first_second': () => import('./about/index.vue'),
  'multi-menu_first_second-new_third': () => import('./about/index.vue'),
  'component_button-detail': () => import('./about/index.vue'),
};
