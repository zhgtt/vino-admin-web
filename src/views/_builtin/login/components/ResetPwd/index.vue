<script lang="ts" setup>
/**
 * 忘记密码、重置密码
 */
import { InputPassword } from 'ant-design-vue';
import { reactive } from 'vue';

import { SvgIcon } from '@/components';
import { useRouterPush, useSmsCode } from '@/hooks';
import LoginHeader from '../LoginHeader/index.vue';

interface FormState {
  password1: string;
  password: string;
  phone: string;
  verifyCode: string;
}

const { toLoginModule } = useRouterPush();
const { label, isCounting, loading: smsLoading, getSmsCode } = useSmsCode();

const formState = reactive<FormState>({
  password1: '',
  phone: '',
  password: '',
  verifyCode: '',
});

// 提交表单且数据验证成功后的回调
const onFinish = () => {};

// 提交表单且数据验证失败后的回调
const onFinishFailed = () => {};

// 发送验证码
const handleSmsCode = () => {
  getSmsCode(formState.phone);
};
</script>

<template>
  <LoginHeader title="重置密码" @back="toLoginModule('account-login')" />

  <Form :model="formState" name="account_login" @finish="onFinish" @finishFailed="onFinishFailed">
    <FormItem name="phone" :rules="[{ required: true, message: '请输入正确的手机号!' }]">
      <Input v-model:value="formState.phone" placeholder="手机号" size="large">
        <template #prefix>
          <SvgIcon icon="tablet-outlined" />
        </template>
      </Input>
    </FormItem>
    <FormItem name="verifyCode" :rules="[{ required: true, message: '请输入验证码!' }]">
      <div class="flex items-center">
        <Input v-model:value="formState.verifyCode" placeholder="请输入验证码" size="large">
          <template #prefix>
            <SvgIcon icon="lock-outlined" />
          </template>
        </Input>
        <Button size="large" class="ml-2" @click="handleSmsCode" :disabled="isCounting" :loading="smsLoading">
          {{ label }}
        </Button>
      </div>
    </FormItem>
    <FormItem name="password" :rules="[{ required: true, message: '请输入密码!' }]">
      <InputPassword v-model:value="formState.password" placeholder="密码" size="large">
        <template #prefix>
          <SvgIcon icon="lock-outlined" />
        </template>
      </InputPassword>
    </FormItem>
    <FormItem name="password1" :rules="[{ required: true, message: '请输入确认密码!' }]">
      <InputPassword v-model:value="formState.password1" placeholder="确认密码" size="large">
        <template #prefix>
          <SvgIcon icon="lock-outlined" />
        </template>
      </InputPassword>
    </FormItem>
    <FormItem>
      <Button class="w-full" size="large" type="primary" html-type="submit">确定</Button>
    </FormItem>
  </Form>
</template>
