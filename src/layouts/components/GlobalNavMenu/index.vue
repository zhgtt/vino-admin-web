<script lang="tsx" setup>
/**
 * @component 菜单组件
 * 侧边栏必须含有菜单；
 * mix 模式下，顶部导航栏根据 menu 的配置来显示菜单，position 为 top 时，菜单只显示第一层数据
 */
import { computed, h } from 'vue';

import HeaderMenu from './HeaderMenu.vue';
import SideMenu from './SideMenu.vue';

interface Props {
  menuMode: 'side' | 'header';
}

const { menuMode } = defineProps<Props>();

const renderComponent = computed(() => {
  switch (menuMode) {
    case 'side':
      return h(SideMenu);

    case 'header':
      return h(HeaderMenu);
  }
});
</script>

<template>
  <component :is="renderComponent" />
</template>

<style lang="scss">
@mixin common-color {
  color: var(--nav-menu-color-selected) !important;
}
@mixin common-bgColor {
  background-color: rgba(0, 0, 0, 0.04) !important;
}

.vino-inline-menu,
.vino-horizontal-menu {
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
  /* 选中的菜单组 */
  .ant-menu-submenu-selected > .ant-menu-submenu-title {
    background-color: transparent !important;
  }
}

/* 侧边栏的菜单 */
.vino-inline-menu {
  overflow: hidden auto;
  .ant-menu-item {
    margin-bottom: 8px;
  }
  .ant-menu-item:active,
  .ant-menu-item-selected,
  .ant-menu-submenu-title:active,
  .ant-menu-submenu-selected > .ant-menu-submenu-title:hover,
  .ant-menu-inline-collapsed .ant-menu-submenu-selected > .ant-menu-submenu-title {
    @include common-bgColor;
    @include common-color;
  }
  .ant-menu-submenu-selected > .ant-menu-submenu-title {
    @include common-color;
  }
}

/* 折叠后弹出的菜单样式 */
.vino-submenu-popup {
  .ant-menu-item:active,
  .ant-menu-item-selected,
  .ant-menu-submenu-selected > .ant-menu-submenu-title {
    @include common-bgColor;
    @include common-color;
  }
}

/* 顶部导航栏的菜单 */
.vino-horizontal-menu {
  padding-inline: 12px;
  padding-block: 6px;
  line-height: 44px;
  .ant-menu-overflow-item::after {
    border-bottom-width: 0 !important;
    border-bottom-color: rgba(0, 0, 0, 0.95);
  }
  .ant-menu-overflow-item:hover {
    @include common-bgColor;
    @include common-color;
  }
  .ant-menu-item-selected,
  .ant-menu-submenu-selected > .ant-menu-submenu-title {
    @include common-color;
  }
}
</style>
