<script lang="ts" setup>
/**
 * 登录表单，随意改
 */
import { Form, Input, Tabs } from 'ant-design-vue';
import { reactive, ref } from 'vue';

import { SvgIcon } from '@/components';

interface AccountLoginFormState {
  username: string;
  password: string;
  remember: boolean;
}
interface PhoneLoginFormState {
  phone: string;
  verifyCode: string;
}

const activeKey = ref('1');
const AccountLoginForm = reactive<AccountLoginFormState>({
  username: '',
  password: '',
  remember: false,
});
const PhoneLoginForm = reactive<PhoneLoginFormState>({
  phone: '',
  verifyCode: '',
});

// 提交表单且数据验证成功后的回调
const onFinish = () => {};

// 提交表单且数据验证失败后的回调
const onFinishFailed = () => {};
</script>

<template>
  <div :class="['vino-login-container']">
    <div class="text-center">
      <div class="flex justify-center items-center">
        <span :class="['login-header-logo']">
          <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" class="w-full" />
        </span>
        <span :class="['login-header-title']">Vino Admin</span>
      </div>
      <div :class="['login-header-desc']">走走停停，不如定定</div>
    </div>

    <!-- 登录表单 -->
    <div :class="['login-main']">
      <Tabs v-model:active-key="activeKey" centered>
        <Tabs.TabPane key="1" tab="账号密码登录" />
        <Tabs.TabPane key="2" tab="手机号登录" />
      </Tabs>

      <!-- 账号密码登录 -->
      <template v-if="activeKey === '1'">
        <Form
          :model="AccountLoginForm"
          name="account_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <Form.Item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
            <Input v-model:value="AccountLoginForm.username" placeholder="用户名: admin or user" size="large">
              <template #prefix>
                <SvgIcon name="UserOutlined" />
              </template>
            </Input>
          </Form.Item>
          <Form.Item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
            <Input v-model:value="AccountLoginForm.password" placeholder="密码: vino" size="large">
              <template #prefix>
                <SvgIcon name="LockOutlined" />
              </template>
            </Input>
          </Form.Item>
        </Form>
      </template>

      <!-- 手机验证码登录 -->
      <template v-if="activeKey === '2'">
        <Form
          :model="PhoneLoginForm"
          name="phone_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <Form.Item name="phone" :rules="[{ required: true, message: 'Please input your username!' }]">
            <Input v-model:value="PhoneLoginForm.phone" placeholder="手机号: admin or user" size="large">
              <template #prefix>
                <SvgIcon name="TabletOutlined" />
              </template>
            </Input>
          </Form.Item>
          <Form.Item name="verifyCode" :rules="[{ required: true, message: 'Please input your password!' }]">
            <Input v-model:value="PhoneLoginForm.verifyCode" placeholder="请输入验证码" size="large">
              <template #prefix>
                <SvgIcon name="LockOutlined" />
              </template>
            </Input>
          </Form.Item>
        </Form>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vino-login-container {
  padding-block-start: 32px;
  .login-header-logo {
    width: 44px;
    height: 44px;
    margin-inline-end: 16px;
    display: block;
  }
  .login-header-title {
    font-weight: 600;
    font-size: 33px;
  }
  .login-header-desc {
    margin-block-start: 12px;
    margin-block-end: 40px;
    color: rgba(0, 0, 0, 0.65);
  }

  .login-main {
    width: 328px;
    margin: 0 auto;
  }
}
</style>
