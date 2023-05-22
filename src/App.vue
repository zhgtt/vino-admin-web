<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'; // antd 全局配置

import { Application } from '@/components/Application';
</script>

<template>
  <ConfigProvider>
    <Application>
      <RouterView />
    </Application>
  </ConfigProvider>
</template>

<style scoped></style>
