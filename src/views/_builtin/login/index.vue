<script lang="tsx" setup>
import { Card, Col, Row } from 'ant-design-vue';
import type { Component } from 'vue';
import { computed, provide } from 'vue';

import WelcomeSVG from '@/assets/image/welcome.svg';
import { VueP5Wrapper } from '@/components';
import NipponColors from '@/constants/colors/NipponColors.json'; // 日本传统色
import { waves } from '@/sketchs';
import { _colorToRGB, _getRandomInteger } from '@/utils';
import { AccountLogin, ChangeModule, QrCodeLogin, RegisterUser, ResetPwd } from './components';

interface Props {
  /** 登录模块分类 */
  module: UnionKey.LoginModule;
}

interface LoginModule {
  key: UnionKey.LoginModule;
  component: Component;
}

/** 随机颜色 */
const num = _getRandomInteger(1, 253);
console.warn('num: ', num);
const rendomColor = NipponColors[num]?.color;
console.warn('rendomColor: ', rendomColor);

const rgbColor = _colorToRGB(rendomColor, 0.28);

const { module } = defineProps<Props>();

/** NOTE 父子组件共享属性 */
provide('module', module);

/** 登录模块 */
const modules: LoginModule[] = [
  { key: 'account-login', component: AccountLogin },
  { key: 'qrcode-login', component: QrCodeLogin },
  { key: 'register', component: RegisterUser },
  { key: 'reset-pwd', component: ResetPwd },
];

const activeModule = computed(() => {
  const active = { ...modules[0] };
  const findItem = modules.find((item) => item.key === module);
  if (findItem) {
    // 对象合并（覆盖）
    Object.assign(active, findItem);
  }
  return active;
});
</script>

<template>
  <div :class="['vino-login-page', 'h-screen overflow-hidden flex justify-center items-center']">
    <!-- animate__zoomInDown -->
    <!-- animate__fadeIn -->
    <!-- animate__fadeInDown -->
    <!-- animate__fadeInLeft -->
    <Card
      :bordered="false"
      class="absolute bg-transparent w-[56%] animate__animated animate__zoomInDown backdrop-blur"
      :body-style="{ padding: 0 }"
    >
      <Row>
        <Col :span="10" class="px-4 rounded-s-lg" :style="{ backgroundColor: rgbColor }">
          <img :src="WelcomeSVG" alt="" class="w-full h-full" />
        </Col>
        <Col :span="14" :class="['login-right', 'rounded-e-lg relative']">
          <!-- 右上角的切换模块（在 重置密码、注册账号 模块不展示） -->
          <template v-if="module !== 'reset-pwd'">
            <ChangeModule />
          </template>

          <div :class="['login-main', 'py-12 m-auto']">
            <!-- 表单 -->
            <component :is="activeModule.component" />
          </div>
        </Col>
      </Row>
    </Card>

    <!-- canvas 图层 -->
    <div class="absolute w-full h-full -z-10 overflow-hidden">
      <VueP5Wrapper :sketch="waves" :options="{ waveColor: rendomColor }" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vino-login-page {
  /* background-image: url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png');
  background-size: contain;
  width: 100%; */
  .login-right {
    background-color: rgba(255, 255, 255, 0.82);

    .login-main {
      width: 328px;

      // antd form
      :deep(.ant-form-item) {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
