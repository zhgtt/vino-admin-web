<script lang="ts" setup>
import { Segmented } from 'ant-design-vue';
import { computed, h, reactive, ref } from 'vue';

import { useRouterPush } from '@/hooks';
import LoginHeader from '../LoginHeader/index.vue';
import CodeRegister from './CodeRegister.vue';
import EmailRegister from './EmailRegister.vue';

const { toLoginModule } = useRouterPush();

const activeKey = ref('1');
const options = reactive([
  { value: '1', label: '手机号注册' },
  { value: '2', label: '邮箱注册' },
]);

const component = computed(() => {
  if (activeKey.value === '1') return h(CodeRegister);
  return h(EmailRegister);
});
</script>

<template>
  <LoginHeader title="账号注册" @back="toLoginModule('account-login')" />

  <Segmented :options="options" v-model:value="activeKey" size="large" class="mb-4" />

  <!-- <keep-alive> -->
  <component :is="component" />
  <!-- </keep-alive> -->
</template>

<style scoped></style>
