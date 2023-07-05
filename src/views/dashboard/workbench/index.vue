<script lang="ts" setup>
import { SvgIcon } from '@/components';
</script>

<template>
  <ProContainer>
    工作台页面
    <SvgIcon icon="dashboard-outlined" :style="{ color: '#f00' }" />

    <SvgIcon icon="apps-menu" type="local" :style="{ color: '#f00', fontSize: '50px' }" />

    <SvgIcon icon="logos:airbnb" type="iconify" />
  </ProContainer>
</template>
