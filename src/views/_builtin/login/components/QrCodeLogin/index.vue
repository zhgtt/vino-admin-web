<script lang="ts" setup>
import type { QRCodeProps } from 'ant-design-vue';
import { QRCode } from 'ant-design-vue';
import { computed } from 'vue';

import { useCountDown } from '@/hooks';

const { start, isCounting } = useCountDown(60);

// 开始倒计时
start();

// 二维码状态
const status = computed<QRCodeProps['status']>(() => {
  if (!isCounting.value) return 'expired'; // 倒计时结束，二维码将失效
  return 'active';
});

// 刷新二维码
const refreshChange = () => {
  start();
};
</script>

<template>
  <div :class="['qrcode-login', 'flex flex-col items-center']">
    <QRCode
      error-level="H"
      value="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      :size="200"
      :status="status"
      @refresh="refreshChange"
    />
    <span class="pt-6 pb-20">扫一扫登录, 注册代表同意 <a>隐私政策</a></span>
  </div>
</template>

<style lang="scss" scoped>
.qrcode-login {
  :deep(.ant-qrcode) {
    border: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
}
</style>
