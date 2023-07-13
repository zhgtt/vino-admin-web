<script lang="ts" setup>
import { Segmented } from 'ant-design-vue';
import { computed, h, reactive, ref } from 'vue';

import { OtherLogin } from '../index';
import CodeLogin from './CodeLogin.vue';
import PwdLogin from './PwdLogin.vue';

const activeKey = ref('1');
const options = reactive([
  { value: '1', label: '账号密码登录' },
  { value: '2', label: '手机号登录' },
]);

const component = computed(() => {
  if (activeKey.value === '1') {
    return h(PwdLogin);
  }
  return h(CodeLogin);
});
</script>

<template>
  <Segmented :options="options" v-model:value="activeKey" size="large" class="mb-4" />

  <!-- <keep-alive> -->
  <component :is="component" />
  <!-- </keep-alive> -->

  <!-- 其他登录方式 -->
  <OtherLogin />
</template>

<style scoped></style>
