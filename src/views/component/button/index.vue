<script lang="ts" setup>
import { Button } from 'ant-design-vue';

import { useRouterPush } from '@/hooks';

const { routerPush } = useRouterPush();
</script>

<template>
  <ProContainer>
    按钮组件
    <Button @click="() => routerPush('/component/button/detail')">跳转至详情页</Button>
  </ProContainer>
</template>
