<script lang="tsx" setup>
/**
 * @component 顶部导航栏的菜单组件
 * 当 menu.position 为 top 时，这里的数据只展示第一层外的数据
 */
import type { MenuProps } from 'ant-design-vue';
import { Menu } from 'ant-design-vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useRouterPush } from '@/hooks';
import { layout } from '@/settings';
import { useRouteStore } from '@/store';
import { _findTreeNodePath } from '@/utils';
import MenuItem from './components/MenuItem.vue';

const { mode, menu } = layout;

const route = useRoute();
const routeStore = useRouteStore();
const { routerPush } = useRouterPush();

// 是否为 mix 模式，并且含有顶部菜单
const isHasTopMenu = computed(() => mode === 'mix' && menu?.position === 'top');
/** 渲染菜单 */
const menus = computed(() => {
  if (isHasTopMenu.value) {
    // 只取第一层数据
    return routeStore.menus.map((item) => {
      const { children, ...rest } = item;
      return rest;
    });
  }
  return routeStore.menus;
});
/** 选中的菜单 */
const activekeys = computed(() => {
  if (isHasTopMenu.value) {
    // 根据路由递归取第一层的菜单的 key，将它作为选中的菜单
    const result = _findTreeNodePath(routeStore.menus, (item) => item.key === route.name, 'key') as string[];
    return result.length ? [result[0]] : [];
  }
  return [route.meta?.activeMenu || route.name] as string[];
});

/** 菜单点击事件 */
const onClick: MenuProps['onClick'] = ({ item }) => {
  const menuItem = item as App.GlobalMenuOption;
  routerPush(menuItem.routePath);
};
</script>

<template>
  <div :class="['vino-horizontal-menu', 'flex items-center min-w-0']">
    <template v-if="mode === 'top' || isHasTopMenu">
      <Menu mode="horizontal" v-model:selected-keys="activekeys" @click="onClick">
        <MenuItem :menus="menus as App.GlobalMenuOption[]" />
      </Menu>
    </template>
  </div>
</template>
