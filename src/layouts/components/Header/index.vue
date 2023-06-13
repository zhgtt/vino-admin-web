<script lang="ts" setup>
/**
 * @component 顶部导航栏
 */

import {} from 'ant-design-vue';

import { layout } from '@/settings';
import { Logo, VMenu } from '../index';

const { mode, menuPosition } = layout;
</script>

<template>
  <header :style="{ height: '56px', lineHeight: '56px' }" class="bg-transparent z-[19]" />
  <header :class="['vino-layout-header', 'fixed w-full']">
    <div class="relative w-full h-full bg-transparent">
      <div :class="['vino-header-main', 'flex h-full']">
        <Logo />
        <!-- menuPosition = 'mix' 时，只会显示一级菜单 -->
        <VMenu v-if="mode === 'top' || (mode === 'mix' && menuPosition === 'mix')" mode="horizontal" />
        <div class="vino-header-main-right"></div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.vino-layout-header {
  height: 56px;
  line-height: 56px;
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
