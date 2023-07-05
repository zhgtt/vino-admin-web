<script lang="ts" setup>
import { Tabs } from 'ant-design-vue';
import { ref } from 'vue';

import { OtherLogin } from '../index';
import CodeLogin from './CodeLogin.vue';
import PwdLogin from './PwdLogin.vue';

const { TabPane } = Tabs;

const activeKey = ref('1');
</script>

<template>
  <Tabs v-model:active-key="activeKey" centered>
    <TabPane key="1" tab="账号密码登录">
      <PwdLogin />
    </TabPane>
    <TabPane key="2" tab="手机号登录">
      <CodeLogin />
    </TabPane>
  </Tabs>

  <!-- 其他登录方式 -->
  <OtherLogin />
</template>
