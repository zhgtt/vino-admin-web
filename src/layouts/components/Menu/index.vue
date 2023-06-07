<script lang="tsx" setup>
/**
 * @component 菜单组件
 */
import type { ItemType, MenuProps } from 'ant-design-vue';
import { Menu } from 'ant-design-vue';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useRouterPush } from '@/hooks';
import { useRouteState } from '@/store';
import { _findTreeNodePath } from '@/utils';

interface Props {
  mode: MenuProps['mode'];
}

const route = useRoute();
console.log('route: ', route);
const routeStore = useRouteState();
const { routerPush } = useRouterPush();

const { mode } = defineProps<Props>();

const menus = computed(() => routeStore.menus); // 渲染菜单
const activekeys = computed(() => [route.name] as string[]); // 选中的菜单
const openKeys = ref<string[]>([]); // 展开的菜单组

/** 菜单选中事件 */
const onSelect: MenuProps['onSelect'] = ({ item }) => {
  const menuItem = item as App.GlobalMenuOption;
  routerPush(menuItem.routePath);
};

/** 菜单组展开/折叠事件 */
const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
  console.log('keys: ', keys);
  // const lastOpenkey = keys.find((item) => openKeys.value.indexOf(item) === -1);
  // console.log('lastOpenkey: ', lastOpenkey);
  openKeys.value = keys.slice(-1) as string[];
};

/** 监听路由的 name，默认展开当前菜单的父级菜单 */
watch(
  () => route.name,
  () => {
    const activekey = activekeys.value[0];
    const defaultOpenKeys = _findTreeNodePath(menus.value, (item) => item.key === activekey);
    console.log('defaultOpenKeys: ', defaultOpenKeys);
    openKeys.value = defaultOpenKeys as string[];
  },
  { immediate: true }
);

const options: MenuProps = {
  mode,
  ...(mode === 'inline' && { inlineIndent: 16 }),
};
</script>

<template>
  <div :class="`vino-sider-${mode}-menu`">
    <Menu
      v-bind="{ ...options }"
      :items="(menus as ItemType[])"
      v-model:open-keys="openKeys"
      v-model:selected-keys="activekeys"
      @select="onSelect"
      @open-change="onOpenChange"
    />
  </div>
</template>

<style lang="scss">
@mixin common-style {
  background-color: rgba(0, 0, 0, 0.04) !important;
  color: var(--nav-menu-color-selected) !important;
}
@mixin menuitem-selected {
  .ant-menu-item:active,
  .ant-menu-item-selected,
  .ant-menu-submenu-selected > .ant-menu-submenu-title {
    @include common-style;
  }
}

.vino-sider-inline-menu,
.vino-sider-horizontal-menu {
  flex: 1 1 0%; // NOTE flex-grow，flex-shrink，flex-basis 的缩写（参考 https://www.runoob.com/cssref/css3-pr-flex.html）

  .ant-menu,
  .ant-menu-inline {
    border: none !important;
    background-color: transparent !important;
    width: 100%;
  }
  .ant-menu-item,
  .ant-menu-overflow-item,  // 顶部菜单容器
  .ant-menu-submenu-title {
    border-radius: 4px !important;
    color: var(--nav-menu-color);
  }
  @include menuitem-selected;
  /* 选中的菜单组 */
  .ant-menu-submenu-selected > .ant-menu-submenu-title {
    background-color: transparent !important;
  }
}

/* 侧边栏的菜单 */
.vino-sider-inline-menu {
  overflow: hidden auto;
  .ant-menu-item {
    margin-bottom: 8px;
  }
  .ant-menu-submenu-title:active,
  .ant-menu-submenu-title:hover,
  .ant-menu-inline-collapsed .ant-menu-submenu-selected > .ant-menu-submenu-title {
    @include common-style;
  }
}

/* 顶部导航栏的菜单 */
.vino-sider-horizontal-menu {
  flex: 1 1 0%;
  min-width: 0;
  display: flex;
  align-items: center;
  padding-inline: 6px;
  padding-block: 6px;
  line-height: 44px;
  .ant-menu-overflow-item {
    &::after {
      border-bottom-width: 0 !important;
      border-bottom-color: rgba(0, 0, 0, 0.95);
    }
  }
}

/* 折叠后弹出的菜单样式 */
.vino-sider-submenu-popup {
  @include menuitem-selected;
}
</style>
