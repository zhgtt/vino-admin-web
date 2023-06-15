<script lang="ts" setup>
/**
 * @component Logo + Apps 展示
 */
import {} from 'vue';

import { layout } from '@/settings';
import { useAppStore } from '@/store';
import AppsMenu from './AppsMenu.vue';

// interface Props {}

const app = useAppStore();

// const {} = defineProps<Props>();

const { mode, title, logo, appList = [] } = layout;
</script>

<template>
  <!-- logo 的布局随 mode 的模式不同而变化 -->
  <!-- logo 在侧边栏 -->
  <div
    v-if="mode === 'side'"
    :class="['vino-sider-logo', 'flex justify-between items-center', app.siderCollapse && 'vino-sider-logo-collapsed']"
  >
    <a href="/" class="vino-logo">
      <img v-bind="{ ...logo }" width="22" height="22" />
      <h1 v-if="!app.siderCollapse">{{ title }}</h1>
    </a>
    <AppsMenu v-if="appList.length > 0" :style="app.siderCollapse ? { fontSize: '16px', marginBlockEnd: '8px' } : {}" />
  </div>

  <!-- logo 在顶部导航栏 -->
  <div v-else :class="['vino-header-logo', 'flex items-center']">
    <AppsMenu v-if="appList.length > 0" :style="{ marginInline: '-8px 16px' }" />
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

.vino-sider-logo {
  padding-inline: 12px;
  padding-block: 16px;
  color: var(--nav-menu-color);
  border-block-end: 1px solid rgba(0, 0, 0, 0.06);
}

.vino-sider-logo-collapsed {
  flex-direction: column-reverse;
  padding: 12px;
}

.vino-header-logo {
  .vino-logo {
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    overflow: hidden;
  }
}
</style>
