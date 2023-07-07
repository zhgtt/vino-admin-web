<script lang="ts" setup>
/**
 * 账号密码登录
 */
import { Checkbox, InputPassword } from 'ant-design-vue';
import { reactive } from 'vue';

import { SvgIcon } from '@/components';

interface AccountLoginFormState {
  username: string;
  password: string;
  verifyCode: string;
  remember: boolean;
}

const accountLoginForm = reactive<AccountLoginFormState>({
  username: '',
  password: '',
  verifyCode: '',
  remember: false,
});

// 提交表单且数据验证成功后的回调
const onFinish = () => {};

// 提交表单且数据验证失败后的回调
const onFinishFailed = () => {};
</script>

<template>
  <Form :model="accountLoginForm" name="account_login" @finish="onFinish" @finishFailed="onFinishFailed">
    <FormItem name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
      <Input v-model:value="accountLoginForm.username" placeholder="用户名: admin or user" size="large">
        <template #prefix>
          <SvgIcon icon="user-outlined" />
        </template>
      </Input>
    </FormItem>
    <FormItem name="password" :rules="[{ required: true, message: '请输入密码!' }]">
      <InputPassword v-model:value="accountLoginForm.password" placeholder="密码: vino" size="large">
        <template #prefix>
          <SvgIcon icon="lock-outlined" />
        </template>
      </InputPassword>
    </FormItem>
    <FormItem name="verifyCode" :rules="[{ required: true, message: '请输入正确的验证码!' }]">
      <Input v-model:value="accountLoginForm.verifyCode" placeholder="验证码,点击图片刷新" size="large">
        <template #prefix>
          <SvgIcon icon="lock-outlined" />
        </template>
      </Input>
    </FormItem>
    <FormItem>
      <FormItem name="remember" no-style>
        <Checkbox v-model:checked="accountLoginForm.remember">自动登录</Checkbox>
      </FormItem>
      <a class="float-right" href="">忘记密码?</a>
    </FormItem>
    <FormItem>
      <Button class="w-full" size="large" type="primary" html-type="submit">登录</Button>
    </FormItem>
    <FormItem no-style>
      还没有账号?
      <a class="" href="">前去注册</a>
    </FormItem>
  </Form>
</template>
