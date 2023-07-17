<script lang="ts" setup>
/**
 * logo、回退按钮、标题、辅助性标语
 */
import { computed } from 'vue';

import { SvgIcon } from '@/components';

interface Props {
  title: string;
  descriptions?: string;
  onBack?: ($event: any) => void;
}

const emits = defineEmits(['back']);

const props = defineProps<Props>();

const handleBack = () => {
  emits('back');
};

/**
 * 如果父组件没有传递 back 事件，则显示 logo；反之，隐藏 logo，显示 back 按钮
 */
const isShowBack = computed(() => {
  if (!props.onBack) return false;
  return true;
});
</script>

<template>
  <div class="mb-10 relative">
    <div :class="`flex ${!isShowBack ? 'items-end' : 'items-center'}`">
      <!-- logo -->
      <template v-if="!isShowBack">
        <SvgIcon icon="dino-drawing" type="local" :style="{ fontSize: '44px' }" />
      </template>

      <!-- back -->
      <template v-else>
        <div :class="['back-arrow', 'cursor-pointer rounded-md']" @click="handleBack" title="返回">
          <SvgIcon icon="charm:arrow-left" type="iconify" :style="{ fontSize: '24px' }" class="block" />
        </div>
      </template>

      <!-- title -->
      <h2 class="inline-block ml-3">{{ props.title }}</h2>
    </div>

    <!-- descriptions -->
    <!-- <div :class="['login-header-desc', 'pt-2']">走走停停，不如定定</div> -->
  </div>
</template>

<style lang="scss" scoped>
.back-arrow {
  color: rgba(0, 0, 0, 0.45);
  transition: color 0.3s;
  &:hover {
    color: #333;
  }
}
/* .login-header-desc {
  color: rgba(0, 0, 0, 0.45);
} */
</style>
