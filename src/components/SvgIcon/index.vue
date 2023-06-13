<script lang="ts" setup>
/**
 * svg 图标组件，支持 antd、iconfont.cn 及 本地图标（未来也想支持其他组件库的图标，动态图标等）
 */

import * as antdIcon from '@ant-design/icons-vue';
import type { CSSProperties } from 'vue';
// import { ref } from 'vue';

// import {  } from "@/settings";

/** 定义组件的 name */
defineOptions({ name: 'SvgIcon' });

/** 定义组件的 类型 */
const { createFromIconfontCN, ...antdIconList } = antdIcon;

type antdIconTypes = keyof typeof antdIconList; // 利用 typeof 将对象转成 联合类型

export interface Props {
  name: string; // 图标名称（TODO 很遗憾，暂时没有 antd 图标的类型提示）
  type?: 'antd' | 'iconfont' | 'local'; // 图标类型，默认是 antd 图标
  style?: CSSProperties;
  twoToneColor?: string; // 双色图标的色值，仅适用于 antd 的双色图标
  spin?: boolean; // 是否有旋转动画，仅适用于 antd 的图标
  class?: string;
  // ...
}

/** iconfont.cn 的图标 script 地址 */
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  extraCommonProps: {},
});

const { name, type, style, twoToneColor } = withDefaults(defineProps<Props>(), {
  type: 'antd',
});

if (!name) {
  throw new Error('没有传递图标名称，请确保给 icon 传递有效值!');
}
</script>

<template>
  <!-- TODO 渲染本地 svg 图标 -->
  <template v-if="type === 'local'">
    <svg></svg>
  </template>

  <!-- 渲染 antd icon -->
  <template v-if="type === 'antd'">
    <component
      :is="antdIconList[name as antdIconTypes]"
      :style="style"
      :twoToneColor="twoToneColor"
      :spin="spin"
      :class="class"
    />
  </template>

  <!-- TODO 渲染 iconfont.cn 的图标 -->
  <template v-if="type === 'iconfont'">
    <IconFont :type="name" />
  </template>
</template>
