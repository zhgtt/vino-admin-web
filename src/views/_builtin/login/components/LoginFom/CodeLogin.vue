<script lang="ts" setup>
/**
 * 手机号登录
 */
import { reactive } from 'vue';

import { SvgIcon } from '@/components';
import { useSmsCode } from '@/hooks';

interface FormState {
  phone: string;
  verifyCode: string;
}

const { label, isCounting, loading: smsLoading, getSmsCode } = useSmsCode();

const formState = reactive<FormState>({
  phone: '',
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
  <Form :model="formState" name="phone_login" @finish="onFinish" @finishFailed="onFinishFailed">
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
    <FormItem>
      <Button class="w-full" size="large" type="primary" html-type="submit">登录</Button>
    </FormItem>
    <FormItem no-style>
      还没有账号?
      <a class="" href="">前去注册</a>
    </FormItem>
  </Form>
</template>
