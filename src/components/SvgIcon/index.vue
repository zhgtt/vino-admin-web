<script lang="ts" setup>
/**
 * svg 图标组件，支持 antd、iconfont.cn、iconify 及 本地图标
 * - iconify 图标库地址：https://icones.netlify.app/ 或 https://icones.js.org/
 */
import * as antdIcon from '@ant-design/icons-vue';
import { Icon } from '@iconify/vue';
import { computed, useAttrs } from 'vue';

import { system } from '@/settings';
import { _convertToCamelCase } from '@/utils';

/**
 * 解构 antd-icons
 */
const { createFromIconfontCN, ...antdIconList } = antdIcon;

/**
 * iconfont.cn 的图标 script 地址
 */
const IconFont = createFromIconfontCN({
  scriptUrl: system?.iconFontUrl,
  extraCommonProps: {},
});

/** 定义组件的 name */
defineOptions({ name: 'SvgIcon' });

/** 定义组件的 类型 */
type antdIconTypes = keyof typeof antdIconList; // 利用 typeof 将对象转成 联合类型

export interface Props {
  icon: string; // 图标名称（TODO 很遗憾，暂时没有 antd 图标的类型提示）
  type?: 'antd' | 'iconfont' | 'local' | 'iconify'; // 图标类型，默认是 antd 图标
  twoToneColor?: string; // 双色图标的色值，仅适用于 antd 的双色图标
  spin?: boolean; // 是否有旋转动画，仅适用于 antd 的图标
}

const { icon, type, twoToneColor } = withDefaults(defineProps<Props>(), {
  type: 'antd',
});

const attrs = useAttrs();

// 渲染本地的 icon
const symbolId = computed(() => `#icon-local-${icon}`);

// antd 的 icon 名称，转成驼峰（省去手动转驼峰）
const iconName = computed<string>(() => {
  return _convertToCamelCase(icon, true);
});

// NOTE 添加公共属性
const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || '',
}));
</script>

<template>
  <!-- 渲染 antd icon -->
  <template v-if="type === 'antd'">
    <component :is="antdIconList[iconName as antdIconTypes]" v-bind="{ spin, twoToneColor, ...bindAttrs }" />
  </template>

  <!-- 渲染本地 svg 图标，利用 vite-plugin-svg-icons 插件，采用 use 的形式动态渲染（看不到 svg 源码） -->
  <!-- NOTE 给 svg 设置宽高后，font-size 会失效 -->
  <template v-if="type === 'local'">
    <svg aria-hidden="true" width="1em" height="1em" v-bind="bindAttrs">
      <use :xlink:href="symbolId" fill="currentColor" />
    </svg>
  </template>

  <!-- 渲染 iconify 图标 -->
  <template v-if="type === 'iconify'">
    <Icon :icon="icon" v-bind="bindAttrs" />
  </template>

  <!-- 渲染 iconfont.cn 的图标 -->
  <template v-if="type === 'iconfont'">
    <IconFont :type="icon" v-bind="bindAttrs" />
  </template>
</template>
