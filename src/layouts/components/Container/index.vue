<script lang="ts" setup>
/**
 * 主体内容
 */
import { LayoutContent } from 'ant-design-vue';

import { Footer, Header } from '@/layouts/components';
import { useAppStore } from '@/store';

const app = useAppStore();
</script>

<template>
  <RouterView #default="{ Component, route }">
    <div :class="['vino-layout-container', 'relative w-full flex flex-col bg-transparent']">
      <Header />

      <LayoutContent>
        <div :class="['vino-page-container']">
          <!-- NOTE 动态渲染组件：is 表示组件，key 表示唯一标识 -->
          <component :is="Component" :key="route.fullPath" />
        </div>

        <Footer />
        <!-- 判断页面中有无 footerbar 组件，给页面底部添加一个空的 div，防止 Footer 组件被遮挡 -->
        <div v-if="app.hasFooterBar" class="h-16"></div>
      </LayoutContent>
    </div>
  </RouterView>
</template>

<style lang="scss">
.vino-layout-container {
  .vino-page-container {
    padding-inline: 40px;
    padding-block-start: 12px;
  }
}
</style>
