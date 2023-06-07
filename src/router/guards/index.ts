/**
 * @description 路由守卫钩子，进行动态路由校验、添加顶部进度条等
 */
import type { Router } from 'vue-router';

import { useTitle } from '@/hooks';
import { close, start } from '@/router/plugins/nprogress';
import { createPermissionGuard } from './permission';

export const createRouterGuards = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    // TODO 开始加载进度条
    start();

    // 页面跳转权限处理
    await createPermissionGuard(to, from, next);
  });

  router.afterEach((to, _, failure) => {
    // 设置 document 标签页标题
    useTitle(to.meta.title as string);

    // TODO 结束加载进度条
    close();
  });
};
