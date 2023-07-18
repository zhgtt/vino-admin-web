<script lang="ts" setup>
/**
 * 顶部告示栏
 */
import { Alert } from 'ant-design-vue';

import { system } from '@/settings';
import { useAppStore } from '@/store';
import { _renderCustomContent } from '@/utils';

const { alert } = system;

const app = useAppStore();

/** message 渲染 */
const MessageRender = () => {
  return _renderCustomContent(alert?.message!);
};

const handleClose = () => {
  // TODO 关闭之后，将关闭的状态存在 local，不要每次刷新都出现 alert
  app.setAlertStatus(false);
};
</script>

<template>
  <!-- 如果需要动效的关闭，将 @close 改成 :after-close -->
  <Alert
    banner
    closable
    :style="{ height: '48px', background: alert?.background || 'black' }"
    class="vino-global-alert"
    :show-icon="!!alert?.isShowIcon"
    @close="handleClose"
  >
    <template #message>
      <MessageRender />
    </template>
  </Alert>
</template>

<style lang="scss">
.vino-global-alert {
  .ant-alert-icon,
  .ant-alert-content,
  .ant-alert-close-icon .anticon-close,
  .ant-alert-close-icon .anticon-close:hover {
    color: #fff;
    font-size: 14px;
  }
}
</style>
