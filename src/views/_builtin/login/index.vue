<script lang="ts" setup>
// import { ref } from 'vue';
import { Card, Col, Row } from 'ant-design-vue';

import WelcomeSVG from '@/assets/image/welcome.svg';
import { SvgIcon, VueP5Wrapper } from '@/components';
import NipponColors from '@/constants/colors/NipponColors.json'; // 日本传统色
import { waves } from '@/sketchs';
import { _colorToRGB, _getRandomInteger } from '@/utils';
import { LoginFom } from './components';

// 随机颜色
const num = _getRandomInteger(1, 253);
console.log('num: ', num);
const rendomColor = NipponColors[num]?.color;
console.log('rendomColor: ', rendomColor);

const rgbColor = _colorToRGB(rendomColor, 0.28);
</script>

<template>
  <div class="vino-login-page">
    <Card
      :bordered="false"
      class="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-transparent w-[62%]"
      :body-style="{ padding: 0 }"
    >
      <Row :class="['login-container', 'relative ']">
        <Col :span="10" class="px-4 rounded-s-lg" :style="{ backgroundColor: rgbColor }">
          <img :src="WelcomeSVG" alt="" class="w-full h-full" />
        </Col>
        <Col :span="14" :class="['login-right', 'pb-8 pt-12 relative rounded-e-lg']">
          <!-- <div class="text-center">
            <div :class="['login-header-desc']">走走停停，不如定定</div>
          </div> -->
          <div :class="['login-main']">
            <div :class="['login-title', 'mb-10 relative flex items-end']">
              <SvgIcon icon="dino-drawing" type="local" :style="{ fontSize: '44px' }" />
              <h2 class="inline-block ml-3">欢迎登录 Vino Web!</h2>
            </div>
            <!-- 表单 -->
            <LoginFom />
          </div>
        </Col>
      </Row>
    </Card>
    <!-- canvas 图层 -->
    <VueP5Wrapper :sketch="waves" :options="{ waveColor: rendomColor }" />
  </div>
</template>

<style lang="scss" scoped>
.vino-login-page {
  height: 100vh;
  overflow: hidden;
  /* background-image: url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png');
  background-size: contain;
  width: 100%; */
  .login-container {
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: transparent;
      backdrop-filter: blur(8px); // 毛玻璃特效
      z-index: -1;
    }
  }
  .login-right {
    background-color: rgba(255, 255, 255, 0.82);

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

      .login-title {
        > h2 {
          /* border-bottom-left-radius: 15px 3px;
          border-bottom-right-radius: 15px 5px;
          border-bottom: 5px solid #4096ff; */
        }
      }

      // antd form
      :deep(.ant-form-item) {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
