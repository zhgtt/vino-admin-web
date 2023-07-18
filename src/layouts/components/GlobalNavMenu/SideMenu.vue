<script lang="tsx" setup>
/**
 * @component 侧边栏的菜单组件
 * 当 menu.position 为 top 时，这里的数据只展示除第一层外的数据
 */
import type { MenuProps } from 'ant-design-vue';
import { Menu } from 'ant-design-vue';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useRouterPush } from '@/hooks';
import { layout } from '@/settings';
import { useAppStore, useRouteStore } from '@/store';
import { _findTreeNodePath } from '@/utils';
import MenuItem from './components/MenuItem.vue';

const { mode, menu } = layout;

const route = useRoute();
console.log('route: ', route);
const routeStore = useRouteStore();
const app = useAppStore();

const { routerPush } = useRouterPush();

// 是否为 mix 模式，并且含有顶部菜单
const isHasTopMenu = computed(() => mode === 'mix' && menu?.position === 'top');
/** 渲染菜单 */
const menus = computed(() => {
  if (isHasTopMenu.value) {
    // 根据路由过滤第一层的数据
    const result = _findTreeNodePath(routeStore.menus, (item) => item.key === route.name);
    const data = (result[0] as App.GlobalMenuOption)?.children ?? [];
    // 设置侧边栏的显隐状态，如果是单路由，将侧边栏隐藏
    app.setAsideStatus(!!data.length);
    return data;
  }
  return routeStore.menus;
});
const activekeys = computed(() => [route.meta?.activeMenu || route.name] as string[]); // 选中的菜单
const openKeys = ref<string[]>([]); // 展开的菜单组

/** 菜单点击事件 */
const onClick: MenuProps['onClick'] = ({ item }) => {
  const menuItem = item as App.GlobalMenuOption;
  routerPush(menuItem.routePath);
};

/** TODO 菜单组展开/折叠事件，缺少只展示当前路由菜单的逻辑 */
const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
  // console.log('keys: ', keys);
  // const lastOpenkey = keys.find((item) => openKeys.value.indexOf(item) === -1);
  // console.log('lastOpenkey: ', lastOpenkey);
  // openKeys.value = keys.slice(-1) as string[];
  openKeys.value = keys as string[];
};

/** 监听路由的 name，默认展开当前菜单的父级菜单 */
watch(
  () => route.name,
  () => {
    // 在侧边栏的折叠模式下，无需默认展开
    if (app.siderCollapse) {
      openKeys.value = [];
      return;
    }

    const activekey = activekeys.value[0];
    const defaultOpenKeys = _findTreeNodePath(menus.value, (item) => item.key === activekey, 'key') as string[];
    console.log('defaultOpenKeys: ', defaultOpenKeys);
    openKeys.value = defaultOpenKeys;
  },
  { immediate: true }
);

const options: MenuProps = {
  onClick,
};
</script>

<template>
  <div class="vino-inline-menu">
    <Menu
      mode="inline"
      :inline-indent="16"
      v-bind="{ ...options }"
      v-model:open-keys="openKeys"
      v-model:selected-keys="activekeys"
      @open-change="onOpenChange"
    >
      <MenuItem :menus="menus" />
    </Menu>
  </div>
</template>
