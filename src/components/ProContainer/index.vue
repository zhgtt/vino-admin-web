<script lang="tsx" setup>
/**
 * 页容器，内含面包屑，标题、footer 等（有时候热更新会失效，刷新一下页面就行）
 */
import type { BreadcrumbProps, PageHeaderProps } from 'ant-design-vue';
import { Card, PageHeader } from 'ant-design-vue';
import { computed, useSlots } from 'vue';
import { useRoute } from 'vue-router';

import { layout } from '@/settings';
import { useAppStore, useRouteStore } from '@/store';
import { _removeEmptyKey } from '@/utils';
import { getBreadcrumbByRouteKey } from '@/utils/router';
import BreadItem from './BreadItem.vue';

defineOptions({ name: 'ProContainer' });

type Props = Omit<PageHeaderProps, 'breadcrumb' | 'backIcon'> & {
  isShowHeader?: boolean; // 是否展示 header
  isShowBread?: boolean; // 是否展示面包屑
  tabList?: any[]; // 标签栏
  footerBar?: () => JSX.Element; // 底部操作栏
};

const { aside } = layout;

const route = useRoute();
const routeStore = useRouteStore();
const app = useAppStore();

const { isShowBread, isShowHeader, title, ...restProps } = withDefaults(defineProps<Props>(), {
  isShowHeader: true,
  isShowBread: false,
});

/** 监听路由的变化，渲染面包屑数据 */
const breadRoutes = computed<App.GlobalBreadcrumb[]>(() => {
  if (!isShowBread) return [];

  const breads = getBreadcrumbByRouteKey(route.name as string, routeStore.menus);
  console.log('breads: ', breads);
  return breads;
});

/** 面包屑配置项 */
const breadcrumb: BreadcrumbProps = {
  routes: breadRoutes.value as BreadcrumbProps['routes'], // 导航数据
  // 对每一项 item 组件进行自定义
  itemRender: ({ route, routes, paths }) => {
    // console.log('route: ', route);
    return <BreadItem route={route as App.GlobalBreadcrumb} />;
  },
};

/** PageHeader 组件配置项 */
const pageHeaderOptions = computed<PageHeaderProps>(() =>
  isShowHeader
    ? _removeEmptyKey({
        ...restProps,
        ...(isShowBread && { breadcrumb }),
        title: title || route.meta?.title, // 没有该值时，取菜单的 title
      })
    : {}
);
// console.log('pageHeaderOptions: ', pageHeaderOptions);

/** PageHeader 组件下的所有 slot 插槽 */
const pageHeaderSlots = ['title', 'subTitle', 'extra', 'tags', 'footer'];
</script>

<template>
  <PageHeader v-if="isShowHeader" class="vino-page-header" v-bind="{ ...pageHeaderOptions }">
    <template v-for="item in pageHeaderSlots" :key="item" #[item]>
      <slot v-if="!!useSlots()[item]" :name="item" />
    </template>
  </PageHeader>

  <div class="vino-page-card">
    <Card :bordered="false" :body-style="{ padding: '16px 24px' }" class="h-full">
      <slot name="default" />
    </Card>
  </div>

  <!-- TODO tab 切换组件 -->

  <!-- footer-bar 底部操作栏 -->
  <template v-if="!!useSlots()['footerBar']">
    <div class="h-16 mt-6"></div>
    <div
      :class="['vino-page-footer-bar', 'fixed z-[99] flex items-center box-border']"
      :style="{ width: `calc(100% - ${app.siderCollapse ? 64 : aside?.width}px)` }"
    >
      <div class="footer-bar-left"></div>
      <div class="footer-bar-right">
        <slot name="footerBar" />
      </div>
    </div>
  </template>
</template>

<style lang="scss">
.vino-page-header {
  padding: 0;
  background-color: transparent;
  padding-block-end: 36px !important;
}

.vino-page-card {
  height: 100vh;
  min-height: 800px;
  padding-block-end: 24px;
}

.vino-page-footer-bar {
  inset-inline-end: 0; // 相当于 right = 0
  bottom: 0;
  padding-inline: 24px;
  padding-block: 0;
  background-color: rgba(255, 255, 255, 0.6);
  border-block-start: 1px solid rgba(5, 5, 5, 0.06);
  backdrop-filter: blur(8px);
  color: rgba(0, 0, 0, 0.88);
  transition: all 0.2s ease 0s;
  height: 64px;
  line-height: 64px;

  .footer-bar-left {
    flex: 1;
  }
  .footer-bar-right {
    > * {
      margin-inline-end: 8px; // 相当于 margin-right

      &:last-child {
        margin-block: 0;
        margin-inline: 0;
      }
    }
  }
}
</style>
