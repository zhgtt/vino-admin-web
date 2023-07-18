<script lang="ts" setup>
/**
 * 主体内容
 */
import { LayoutContent } from 'ant-design-vue';
</script>

<template>
  <RouterView #default="{ Component, route }">
    <LayoutContent>
      <div :class="['vino-page-container']">
        <!-- NOTE 动态渲染组件：is 表示组件，key 表示唯一标识 -->
        <component :is="Component" :key="route.fullPath" />
      </div>
    </LayoutContent>
  </RouterView>
</template>

<style lang="scss">
.vino-page-container {
  padding-inline: 40px;
  padding-block-start: 12px;
}
</style>
