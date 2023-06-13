<script lang="ts" setup>
/**
 * @component Logo + Apps 展示
 */
import {} from 'vue';

import { AppsIcon } from '@/components/Svg';
import { layout } from '@/settings';

interface Props {
  collapsed?: boolean;
}

const { collapsed } = defineProps<Props>();

const { mode, title, logo } = layout;
</script>

<template>
  <!-- logo 的布局随 mode 的模式不同而变化 -->
  <div
    v-if="mode === 'side'"
    :class="['vino-sider-logo', 'flex justify-between items-center', collapsed && 'vino-sider-logo-collapsed']"
  >
    <a href="/" class="vino-logo">
      <img v-bind="{ ...logo }" width="22" height="22" />
      <h1 v-if="!collapsed">{{ title }}</h1>
    </a>
    <span class="apps-icon">
      <AppsIcon />
    </span>
  </div>

  <div v-else :class="['vino-header-logo', 'flex items-center']">
    <span class="apps-icon">
      <AppsIcon />
    </span>
    <a href="/" class="vino-logo">
      <img v-bind="{ ...logo }" width="22" height="22" />
      <h1>{{ title }}</h1>
    </a>
  </div>
</template>

<style lang="scss">
.vino-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  min-height: 22px;

  > h1 {
    display: inline-block;
    height: 22px;
    margin-block: 0;
    margin-inline-end: 0;
    margin-inline-start: 6px; // 等同于 margin-left
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    vertical-align: middle;
  }
}

/* TODO */
.apps-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-inline: 4px;
  padding-block: 0;
  font-size: 14px;
  line-height: 14px;
  height: 28px;
  width: 28px;
  cursor: pointer;
  color: var(--nav-menu-color);
  &:hover {
    color: #000;
    background-color: rgba(0, 0, 0, 0.04);
  }
}

.vino-sider-logo {
  padding-inline: 12px;
  padding-block: 16px;
  color: var(--nav-menu-color);
  border-block-end: 1px solid rgba(0, 0, 0, 0.06);
}

.vino-sider-logo-collapsed {
  flex-direction: column-reverse;
  padding: 12px;
  .apps-icon {
    margin-block-end: 8px;
    font-size: 16px;
    transition: font-size 0.2s ease-in-out, color 0.2s ease-in-out;
  }
}

.vino-header-logo {
  .apps-icon {
    margin-inline-end: 16px;
    margin-inline-start: -8px;
  }
  .vino-logo {
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    overflow: hidden;
  }
}
</style>
