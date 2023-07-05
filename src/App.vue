<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'; // antd 全局配置
</script>

<template>
  <ConfigProvider>
    <RouterView />
  </ConfigProvider>
</template>

<style scoped></style>
