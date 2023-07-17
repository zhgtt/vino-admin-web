<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'; // antd 全局配置
// import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <RouterView />
  </ConfigProvider>
</template>

<style scoped></style>
