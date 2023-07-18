<script setup lang="ts">
/**
 * 基础布局方式
 */
import { Layout } from 'ant-design-vue';

import { layout } from '@/settings';
import { useAppStore } from '@/store';
import { GlobalContent, GlobalFooter, GlobalHeader, GlobalSider, GlobalTabs } from './components';

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
      <!-- 侧边栏 -->
      <GlobalSider v-if="app.isShowAside && mode !== 'top'" />

      <div class="relative w-full flex flex-col bg-transparent">
        <!-- 顶部导航栏 -->
        <GlobalHeader />

        <!-- tabs 标签页 -->
        <GlobalTabs />

        <!-- 主体内容 -->
        <GlobalContent />

        <!-- 底部版权说明 -->
        <GlobalFooter />
        <!-- 判断页面中有无 footerBar 组件，给页面底部添加一个空的 div，防止 Footer 组件被遮挡 -->
        <div v-if="app.hasFooterBar" class="h-16"></div>
      </div>
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
