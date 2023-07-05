<script lang="ts" setup>
// import { ref } from 'vue';
import { Card } from 'ant-design-vue';

import { SvgIcon, VueP5Wrapper } from '@/components';
// import ChinaColors from '@/constants/colors/ChinaColors.json'; // 中国色
import NipponColors from '@/constants/colors/NipponColors.json'; // 日本传统色
import { waves } from '@/sketchs';
import { _getRandomInteger } from '@/utils';
import { LoginFom } from './components';

// 随机数
const num = _getRandomInteger(1, 254);
</script>

<template>
  <div class="vino-login-page">
    <Card
      :bordered="false"
      :class="['login-card', 'absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4']"
      :body-style="{ padding: 0 }"
    >
      <div :class="['login-form', 'py-8 px-32 w-full relative']">
        <div class="text-center">
          <div class="flex justify-center items-center">
            <span :class="['login-header-logo']">
              <SvgIcon icon="logo" type="local" :style="{ fontSize: '44px' }" />
            </span>
            <span :class="['login-header-title']">Vino Admin</span>
          </div>
          <div :class="['login-header-desc']">走走停停，不如定定</div>
        </div>
        <div :class="['login-main']">
          <!-- 表单 -->
          <LoginFom />
        </div>
      </div>
    </Card>
    <!-- canvas 图层 -->
    <VueP5Wrapper :sketch="waves" :options="{ waveColor: NipponColors[num]?.color }" />
  </div>
</template>

<style lang="scss" scoped>
.vino-login-page {
  height: 100vh;
  overflow: hidden;
  /* background-image: url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png');
  background-size: contain;
  width: 100%; */
  .login-card {
    background-color: rgba(255, 255, 255, 0.88);
    /* backdrop-filter: blur(8px); // 毛玻璃特效 */
  }

  .login-form {
    .login-header-logo {
      width: 44px;
      height: 44px;
      margin-inline-end: 16px;
      display: block;
    }
    .login-header-title {
      font-weight: 600;
      font-size: 33px;
    }
    .login-header-desc {
      margin-block-start: 12px;
      margin-block-end: 40px;
      color: rgba(0, 0, 0, 0.65);
    }

    .login-main {
      width: 328px;
      margin: 0 auto;
    }
  }
}
</style>
