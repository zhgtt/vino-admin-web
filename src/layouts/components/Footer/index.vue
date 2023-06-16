<script lang="ts" setup>
/**
 * footer - 版权文字说明
 */
import { layout } from '@/settings';

const { footer } = layout;
</script>

<template>
  <template v-if="footer?.copyright">
    <footer class="vino-footer">
      <span>{{ footer.copyright }}</span>
    </footer>
  </template>
</template>

<style lang="scss">
.vino-footer {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  animation-name: footerLazy;
  animation-duration: 0.3s;
  animation-timing-function: ease;
  text-align: center;
  padding-inline: 40px;
  padding-block-end: 16px;
  line-height: 1.3;
}

@keyframes footerLazy {
  0% {
    display: none;
    opacity: 0;
  }
  80% {
    display: none;
    opacity: 0;
  }
  100% {
    display: unset;
    opacity: 1;
  }
}
</style>
