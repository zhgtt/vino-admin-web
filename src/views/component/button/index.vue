<script lang="ts" setup>
import { Button } from 'ant-design-vue';

import { useRouterPush } from '@/hooks';

const { routerPush } = useRouterPush();
</script>

<template>
  <ProContainer is-show-bread>
    <template #extra><Button type="primary">操作</Button></template>
    <template #footerBar>
      <Button type="primary">操作1</Button>
      <Button type="primary">操作2</Button>
      <Button type="primary">操作23</Button>
      <Button type="primary">操作4</Button>
    </template>

    按钮组件
    <Button @click="() => routerPush('/component/button/detail')">跳转至详情页</Button>
  </ProContainer>
</template>
