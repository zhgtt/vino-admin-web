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

const { mode, title, logo } = layout;
</script>

<template>
  <!-- logo 的布局随 mode 的模式不同而变化 -->
  <!-- logo 在侧边栏 -->
  <template v-if="mode === 'side'">
    <div
      :class="[
        'vino-sider-logo',
        'flex justify-between items-center',
        app.siderCollapse && 'vino-sider-logo-collapsed',
      ]"
    >
      <a href="/" class="vino-logo">
        <img v-bind="{ ...logo }" />
        <h1 v-if="!app.siderCollapse">{{ title }}</h1>
      </a>
      <AppsMenu :style="app.siderCollapse ? { fontSize: '16px', marginBlockEnd: '8px' } : {}" />
    </div>
  </template>

  <!-- logo 在顶部导航栏 -->
  <template v-else>
    <div :class="['vino-header-logo', 'flex items-center']">
      <AppsMenu :style="{ marginInline: '-8px 16px' }" />
      <a href="/" class="vino-logo">
        <img v-bind="{ ...logo }" />
        <h1>{{ title }}</h1>
      </a>
    </div>
  </template>
</template>

<style lang="scss">
.vino-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  min-height: 22px;

  > img {
    width: 24px;
    height: 24px;
  }

  > h1 {
    display: inline-block;
    margin-block: 0;
    margin-inline-end: 0;
    margin-inline-start: 6px; // 等同于 margin-left
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 18px;
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
