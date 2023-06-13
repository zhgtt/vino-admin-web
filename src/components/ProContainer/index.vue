<script lang="tsx" setup>
/**
 * 页容器，内含面包屑，标题、footer 等（有时候热更新会失效，刷新一下页面就行）
 */
import type { BreadcrumbProps, PageHeaderProps } from 'ant-design-vue';
import { Card, PageHeader } from 'ant-design-vue';
import { computed, useSlots } from 'vue';
import { useRoute } from 'vue-router';

import { useRouteState } from '@/store';
import { _getBreadcrumbByRouteKey, _removeEmptyKey } from '@/utils';
import BreadItem from './BreadItem.vue';

defineOptions({ name: 'ProContainer' });

type Props = Omit<PageHeaderProps, 'breadcrumb' | 'backIcon'> & {
  isShowHeader?: boolean; // 是否展示 header
  isShowBread?: boolean; // 是否展示面包屑
  tabList?: any[]; // 标签栏
  footerBar?: any[]; // 底部操作栏
};

const route = useRoute();
const routeStore = useRouteState();

const { isShowBread, isShowHeader, title, ...restProps } = withDefaults(defineProps<Props>(), {
  isShowHeader: true,
  isShowBread: true,
});

/** 监听路由的变化，渲染面包屑数据 */
const breadRoutes = computed<App.GlobalBreadcrumb[]>(() => {
  const breads = _getBreadcrumbByRouteKey(route.name as string, routeStore.menus);
  console.log('breads: ', breads);
  return breads;
});

/** 自定义面包屑中的组件 */
const BreadItemRender: BreadcrumbProps['itemRender'] = ({ route, params, routes, paths }) => {
  // console.log('route: ', route);
  if (!isShowBread) return null;

  return <BreadItem route={route} />;
};

const breadcrumb: BreadcrumbProps = {
  routes: breadRoutes.value as BreadcrumbProps['routes'], // 导航数据
  itemRender: BreadItemRender, // 对每一项 item 进行自定义
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

  <slot name="footerBar" />
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
}
</style>
