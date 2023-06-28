<script lang="ts" setup>
// import { ref } from 'vue';
import { Card } from 'ant-design-vue';

import { VueP5Wrapper } from '@/components';
// import ChinaColors from '@/constants/colors/ChinaColors.json'; // 中国色
import LoginSVG from '@/assets/svg-icon/login.svg';
import NipponColors from '@/constants/colors/NipponColors.json'; // 日本传统色
import { waves } from '@/sketchs';
import { _getRandomInteger } from '@/utils';
import LoginForm from './LoginForm.vue';

// 随机数
const num = _getRandomInteger(1, 254);
</script>

<template>
  <div class="vino-login-page">
    <Card
      :bordered="false"
      :class="['login-card', 'absolute top-[100px] left-2/4 -translate-x-2/4 w-[60%]']"
      :body-style="{ padding: 0 }"
    >
      <div class="flex">
        <img :src="LoginSVG" width="540" height="600" alt="" />
        <div :class="['login-form', 'p-4 w-full relative']">
          <LoginForm />
        </div>
      </div>
    </Card>
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
    backdrop-filter: blur(8px); // 毛玻璃特效
  }

  .login-form {
    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 76%;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: #e6e6e6;
    }
  }
}
</style>
