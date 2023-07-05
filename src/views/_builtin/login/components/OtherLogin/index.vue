<script lang="ts" setup>
import { Divider } from 'ant-design-vue';
import { reactive } from 'vue';

import { SvgIcon } from '@/components';

const otherLoginBtn = reactive([
  { icon: 'alipay-outlined', style: {}, action: null, key: 'alipay' },
  { icon: 'taobao-outlined', style: {}, action: null, key: 'taobao' },
  { icon: 'wechat-outlined', style: {}, action: null, key: 'wechat' },
]);
</script>

<template>
  <div class="flex flex-col items-center">
    <Divider dashed :style="{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.25)' }">第三方登录方式</Divider>
    <Space>
      <template v-for="item in otherLoginBtn" :key="item.key">
        <Button shape="circle" size="large">
          <SvgIcon :icon="item.icon" :style="{ ...item.style, fontSize: '18px' }" />
        </Button>
      </template>
    </Space>
  </div>
</template>
