<script lang="ts" setup>
/**
 * 主体内容
 */
import { LayoutContent } from 'ant-design-vue';

import { Header } from '@/layouts/components';
// import { layout } from '@/settings';

// const { mode } = layout;
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
