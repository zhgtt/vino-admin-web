<script lang="tsx" setup>
import { Card, Col, Row, Tooltip } from 'ant-design-vue';
import type { Component } from 'vue';
import { computed } from 'vue';

import WelcomeSVG from '@/assets/image/welcome.svg';
import { SvgIcon, VueP5Wrapper } from '@/components';
import NipponColors from '@/constants/colors/NipponColors.json'; // 日本传统色
import { useRouterPush } from '@/hooks';
import { waves } from '@/sketchs';
import { _colorToRGB, _getRandomInteger } from '@/utils';
import { LoginForm, QrCodeLogin, RegisterUser, ResetPwd } from './components';

interface Props {
  /** 登录模块分类 */
  module: UnionKey.LoginModule;
}

interface LoginModule {
  key: UnionKey.LoginModule;
  label: string; // 标题
  component: Component;
}

/** 随机颜色 */
const num = _getRandomInteger(1, 253);
console.log('num: ', num);
const rendomColor = NipponColors[num]?.color;
console.log('rendomColor: ', rendomColor);

const rgbColor = _colorToRGB(rendomColor, 0.28);

const { module } = defineProps<Props>();

const { toLoginModule } = useRouterPush();

const modules: LoginModule[] = [
  { key: 'account-login', label: '欢迎登录 Vino Web!', component: LoginForm },
  { key: 'qrcode-login', label: '微信安全登录', component: QrCodeLogin },
  { key: 'register', label: '账号注册', component: RegisterUser },
  { key: 'reset-pwd', label: '重置密码', component: ResetPwd },
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
const tooltipTitle = computed(() => {
  if (module === 'account-login') return '二维码登录';
  return '密码 / 手机登录';
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
      class="absolute bg-transparent w-[62%] animate__animated animate__zoomInDown backdrop-blur"
      :body-style="{ padding: 0 }"
    >
      <Row>
        <Col :span="10" class="px-4 rounded-s-lg" :style="{ backgroundColor: rgbColor }">
          <img :src="WelcomeSVG" alt="" class="w-full h-full" />
        </Col>
        <Col :span="14" :class="['login-right', 'pb-8 pt-12 relative rounded-e-lg']">
          <!-- check 切换 -->
          <template v-if="module !== 'reset-pwd'">
            <Tooltip placement="left" :title="tooltipTitle">
              <div class="absolute right-0 top-0 w-16 h-16 overflow-hidden">
                <div
                  :class="['change-box-tips']"
                  @click="toLoginModule(module === 'qrcode-login' ? 'account-login' : 'qrcode-login')"
                >
                  <SvgIcon
                    type="local"
                    :class="['change-icon']"
                    :icon="module === 'qrcode-login' ? 'account' : 'qrcode'"
                  />
                </div>
              </div>
            </Tooltip>
          </template>

          <!-- <div class="text-center">
            <div :class="['login-header-desc']">走走停停，不如定定</div>
          </div> -->
          <div :class="['login-main']">
            <div class="mb-10 relative flex items-end">
              <SvgIcon icon="dino-drawing" type="local" :style="{ fontSize: '44px' }" />
              <h2 class="inline-block ml-3">{{ activeModule.label }}</h2>
            </div>
            <!-- 表单 -->
            <component :is="activeModule.component" />
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
  /* background-image: url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png');
  background-size: contain;
  width: 100%; */
  .login-right {
    background-color: rgba(255, 255, 255, 0.82);
    /* .login-header-desc {
      color: rgba(0, 0, 0, 0.65);
    } */
    .change-box-tips {
      background-color: #f5f5f5;
      transform: skewY(45deg); // 倾斜
      transform-origin: top right;
      box-shadow: rgb(204, 219, 232) 0px 10px 10px -10px;
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
    .login-main {
      width: 328px;
      margin: 0 auto;

      // antd form
      :deep(.ant-form-item) {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
