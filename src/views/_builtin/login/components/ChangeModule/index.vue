<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue';
import { computed, inject } from 'vue';

import { SvgIcon } from '@/components';
import { useRouterPush } from '@/hooks';

/** NOTE 父子组件共享属性 */
const module = inject<UnionKey.LoginModule>('module');

const { toLoginModule } = useRouterPush();

const changeModule = computed<{ label: string; icon: string; toLink: UnionKey.LoginModule }>(() => {
  if (module === 'qrcode-login') {
    return { label: '密码 / 手机登录', icon: 'account', toLink: 'account-login' };
  }
  return { label: '二维码登录 / 注册', icon: 'qrcode', toLink: 'qrcode-login' };
});
</script>

<template>
  <Tooltip placement="left" :title="changeModule.label">
    <div class="absolute right-0 top-0 w-16 h-16 overflow-hidden">
      <!-- 画一个平行四边形 -->
      <div :class="['change-box-tips']" @click="toLoginModule(changeModule.toLink)">
        <SvgIcon type="local" :class="['change-icon']" :icon="changeModule.icon" />
      </div>
    </div>
  </Tooltip>
</template>

<style lang="scss" scoped>
.change-box-tips {
  /* background-color: #f5f5f5; */
  transform: skewY(45deg); // 倾斜
  transform-origin: top right;
  box-shadow: rgb(204, 219, 232) 0px 10px 10px -6px;
  color: #a9aeb8;
  transition: color 0.3s;
  width: 64px;
  height: 64px;
  border-top-right-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    color: #1677ff;
  }

  :deep(.change-icon) {
    position: absolute;
    transform: skewY(315deg);
    top: 42px;
    left: 10px;
    font-size: 44px;
  }
}
</style>
