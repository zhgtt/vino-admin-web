<script lang="ts" setup>
/**
 * 账号密码登录
 */
import { Checkbox, InputPassword } from 'ant-design-vue';
import { reactive } from 'vue';

import { SvgIcon } from '@/components';
import { useRouterPush } from '@/hooks';
import { useAuthStore } from '@/store';

interface FormState {
  username: string;
  password: string;
  verifyCode: string;
  remember: boolean;
}

const { toLoginModule } = useRouterPush();

const auth = useAuthStore();

const formState = reactive<FormState>({
  username: '',
  password: '',
  verifyCode: '',
  remember: false,
});

// 提交表单且数据验证成功后的回调
const onFinish = () => {
  auth.login(formState);
};

// 提交表单且数据验证失败后的回调
const onFinishFailed = () => {};
</script>

<template>
  <Form :model="formState" name="account_login" @finish="onFinish" @finishFailed="onFinishFailed">
    <FormItem name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
      <Input v-model:value="formState.username" placeholder="用户名: admin or user" size="large">
        <template #prefix>
          <SvgIcon icon="user-outlined" />
        </template>
      </Input>
    </FormItem>
    <FormItem name="password" :rules="[{ required: true, message: '请输入密码!' }]">
      <InputPassword v-model:value="formState.password" placeholder="密码: vino" size="large">
        <template #prefix>
          <SvgIcon icon="lock-outlined" />
        </template>
      </InputPassword>
    </FormItem>
    <FormItem name="verifyCode" :rules="[{ required: true, message: '请输入正确的验证码!' }]">
      <Input v-model:value="formState.verifyCode" placeholder="验证码,点击图片刷新" size="large">
        <template #prefix>
          <SvgIcon icon="lock-outlined" />
        </template>
      </Input>
    </FormItem>
    <FormItem>
      <FormItem name="remember" no-style>
        <Checkbox v-model:checked="formState.remember">自动登录</Checkbox>
      </FormItem>
      <a class="float-right" @click="toLoginModule('reset-pwd')">忘记密码?</a>
    </FormItem>
    <FormItem>
      <Button class="w-full" size="large" type="primary" html-type="submit" :loading="auth.loginLoading">登录</Button>
    </FormItem>
    <FormItem no-style>
      还没有账号?
      <a @click="toLoginModule('register')">前去注册</a>
    </FormItem>
  </Form>
</template>
