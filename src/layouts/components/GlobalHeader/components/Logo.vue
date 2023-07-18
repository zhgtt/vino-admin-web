<script lang="ts" setup>
/**
 * @component Logo
 */
import { layout } from '@/settings';

const { title, logo } = layout;
</script>

<template>
  <div :class="['vino-header-logo', 'h-full']">
    <a href="/" :class="['vino-logo', 'flex justify-center items-center']">
      <img v-bind="{ ...logo }" />
      <h1 class="inline-block font-semibold">{{ title }}</h1>
    </a>
  </div>
</template>

<style lang="scss">
.vino-header-logo {
  .vino-logo {
    font-size: 22px;
    min-height: 22px;

    > img {
      width: 24px;
      height: 24px;
    }

    > h1 {
      margin-inline-start: 6px; // 等同于 margin-left
      color: rgba(0, 0, 0, 0.88);
      font-size: 18px;
    }
  }
}
</style>
