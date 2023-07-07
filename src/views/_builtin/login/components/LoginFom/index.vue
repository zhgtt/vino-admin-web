<script lang="ts" setup>
import { Segmented } from 'ant-design-vue';
import { reactive, ref } from 'vue';

import { OtherLogin } from '../index';
import CodeLogin from './CodeLogin.vue';
import PwdLogin from './PwdLogin.vue';

const activeKey = ref('1');
const options = reactive([
  { value: '1', label: '账号密码登录' },
  { value: '2', label: '手机号登录' },
]);
</script>

<template>
  <Segmented :options="options" v-model:value="activeKey" size="large" class="mb-4" />

  <!-- <transition name="fade"> -->
  <PwdLogin v-if="activeKey === '1'" />
  <!-- </transition> -->

  <!-- <transition name="fade"> -->
  <CodeLogin v-if="activeKey === '2'" />
  <!-- </transition> -->

  <!-- 其他登录方式 -->
  <OtherLogin />
</template>
