<script lang="ts" setup>
/**
 * @component 内容
 */

import { LayoutContent } from 'ant-design-vue';

import { layout } from '@/settings';
import { Header } from '../index';

const { mode } = layout;
</script>

<template>
  <div :class="['vino-layout-container', 'relative w-full flex flex-col bg-transparent']">
    <Header v-if="mode !== 'side'" />
    <LayoutContent>
      <div :class="['vino-page-container']">
        <RouterView>
          <!-- NOTE 动态渲染组件：is 表示组件，key 表示唯一标识 -->
          <template #default="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </template>
        </RouterView>
      </div>
    </LayoutContent>
  </div>
</template>

<style lang="scss">
.vino-layout-container {
  .ant-layout-content {
    padding-block: 24px;
    padding-inline: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background: transparent;
  }

  .vino-page-container {
  }
}
</style>
