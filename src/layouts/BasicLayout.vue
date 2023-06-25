<script setup lang="ts">
/**
 * NOTE 整体布局方式
 * Container - 内容; Header - 顶部导航; Aside - 侧边栏; Menu - 菜单; Logo - logo和跨站点导航菜单（只有 Aside 和 Container 是独立的）
 * Container 中包含 Header
 * Header 包含 Menu 和 Logo
 * Aside 包含 Menu 和 Logo
 *
 * top 模式下：只有 Container
 * side 和 mix 模式下：既有 Container，又有 Aside
 *
 * mix 模式下：Logo 只会显示在 Header 中，Aside 中不能有 Logo
 */
import { Layout } from 'ant-design-vue';

import { layout } from '@/settings';
import { useAppStore } from '@/store';
import { Aside, Container } from './components';

const { mode } = layout;

const app = useAppStore();
</script>

<template>
  <!-- layout -->
  <div :class="['vino-layout']">
    <!-- layout 背景 -->
    <div :class="['vino-layout-bg', 'w-full h-full fixed overflow-hidden']">
      <img
        src="https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png"
        class="absolute"
        style="left: 85px; bottom: 100px; height: 303px"
      />
      <img
        src="https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png"
        class="absolute"
        style="bottom: -68px; right: -45px; height: 303px"
      />
      <img
        src="https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png"
        class="absolute"
        style="bottom: 0px; left: 0px; width: 331px"
      />
    </div>
    <!-- 布局 -->
    <Layout class="min-h-full">
      <Aside v-if="app.isShowAside && mode !== 'top'" />
      <Container />
    </Layout>
  </div>
</template>

<style lang="scss">
.vino-layout {
  &-bg {
    background: linear-gradient(#ffffff, #f5f5f5 28%);
    pointer-events: none; // NOTE 是否对指针事件做出反应，比如 鼠标移到 a 标签处，左下角会有链接显示
    inset-block-start: 0; // NOTE 等同于 left/right 属性
    inset-inline-start: 0; // NOTE 等同于 top/bottom 属性
    z-index: 0;
  }
}
</style>
