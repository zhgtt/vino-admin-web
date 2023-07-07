<script lang="ts" setup>
/**
 * @component 顶部导航栏
 */
import { computed } from 'vue';

import { BoardAlert, Logo, NavMenu, UserAvatar } from '@/layouts/components';
import { useAppStore } from '@/store';

const app = useAppStore();

const headerStyle = computed(() => {
  const height = app.isShowlAlert ? 106 : 56;
  return { height: `${height}px`, lineHeight: `${height}px` };
});
</script>

<template>
  <header :style="headerStyle" class="bg-transparent z-[19]" />
  <header :class="['vino-layout-header', 'fixed w-full']" :style="headerStyle">
    <!-- 顶部 alert -->
    <BoardAlert v-if="app.isShowlAlert" />

    <!-- 顶部导航栏 -->
    <div class="relative w-full h-full bg-transparent" :style="{ height: '56px', lineHeight: '56px' }">
      <div :class="['vino-header-main', 'flex h-full']">
        <!-- logo -->
        <Logo />
        <!-- 菜单 -->
        <NavMenu menu-mode="header" />
        <!-- TODO 右侧操作区域 -->
        <!-- TODO 用户头像 -->
        <UserAvatar />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.vino-layout-header {
  z-index: 100;
  inset-block-start: 0;
  inset-inline-end: 0;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px); // NOTE 毛玻璃特效
  border-block-end: 1px solid rgba(5, 5, 5, 0.06); // NOTE 底部边框
  transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  flex: 0 0 auto;
  color: rgba(0, 0, 0, 0.88);

  .vino-header-main {
    padding-inline-start: 16px; // NOTE 左内边距
  }
}
</style>
