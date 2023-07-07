<script lang="ts" setup>
/**
 * @component Logo + Apps 展示
 */
import {} from 'vue';

import { layout } from '@/settings';
// import { useAppStore } from '@/store';
import AppsMenu from './AppsMenu.vue';

// interface Props {}

// const app = useAppStore();

// const {} = defineProps<Props>();

const { title, logo } = layout;
</script>

<template>
  <div :class="['vino-header-logo', 'flex items-center']">
    <AppsMenu :style="{ marginInline: '-8px 16px' }" />
    <a href="/" class="vino-logo">
      <img v-bind="{ ...logo }" />
      <h1>{{ title }}</h1>
    </a>
  </div>
</template>

<style lang="scss">
.vino-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  min-height: 22px;

  > img {
    width: 24px;
    height: 24px;
  }

  > h1 {
    display: inline-block;
    margin-block: 0;
    margin-inline-end: 0;
    margin-inline-start: 6px; // 等同于 margin-left
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 18px;
  }
}

.vino-header-logo {
  .vino-logo {
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    overflow: hidden;
  }
}
</style>
