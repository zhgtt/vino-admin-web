<script lang="ts" setup>
/**
 * 页容器，内含面包屑，标题、footer 等（有时候热更新会失效，刷新一下页面就行）
 */
import type { PageHeaderProps } from 'ant-design-vue';
import { Card, PageHeader } from 'ant-design-vue';
import { computed, ref, useSlots, watch } from 'vue';
import { useRoute } from 'vue-router';

import { _removeEmptyKey } from '@/utils';

defineOptions({ name: 'ProContainer' });

type Props = Omit<PageHeaderProps, 'breadcrumb' | 'backIcon'> & {
  isShowHeader?: boolean; // 是否展示 header
  isShowBread?: boolean; // 是否展示面包屑
};

const route = useRoute();

const { isShowBread, isShowHeader, title, ...restProps } = withDefaults(defineProps<Props>(), {
  isShowHeader: true,
  isShowBread: true,
});

const menuTitle = ref<string>('');

const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];
watch(
  () => route.name,
  () => {
    // menuTitle.value = route.meta?.title as string;
  },
  { immediate: true }
);

const options = computed<PageHeaderProps>(() =>
  _removeEmptyKey({
    ...restProps,
    ...(isShowBread && { breadcrumb: { routes } }),
    title: title || route.meta?.title, // 没有该值时，取菜单的 title
  })
);
// console.log('options: ', options);

/** PageHeader 组件下的所有 slot 插槽 */
const slots = ['title', 'subTitle', 'extra', 'tags', 'footer'];
</script>

<template>
  <PageHeader v-if="isShowHeader" class="vino-page-header" v-bind="{ ...options }">
    <template v-for="item in slots" :key="item" #[item]>
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
