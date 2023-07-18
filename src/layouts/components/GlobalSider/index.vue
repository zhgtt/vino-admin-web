<script lang="ts" setup>
/**
 * @component 侧边栏
 */

import { LayoutSider } from 'ant-design-vue';
import { computed, ref, watch } from 'vue';

import { SvgIcon } from '@/components';
import { GlobalNavMenu } from '@/layouts/components';
import { layout } from '@/settings';
import { useAppStore } from '@/store';

const { aside, mode } = layout;

const app = useAppStore();

const collapsed = ref<boolean>(false); // 是否收起侧边栏

const siderMaskingWidth = computed(() => (collapsed.value ? 64 : aside?.width)); // 侧边栏底层蒙版
const siderStyle = computed(() => {
  let height: number;
  if (mode === 'mix') {
    height = app.isShowlAlert ? 106 : 56;
  } else {
    height = app.isShowlAlert ? 48 : 0;
  }
  return { height: `calc(100% - ${height}px)`, insetBlockStart: `${height}px` };
});

watch(collapsed, (newVal) => {
  app.setSiderCollapse(newVal);
});
</script>

<template>
  <div
    class="overflow-hidden"
    :style="{
      width: `${siderMaskingWidth}px`,
      maxWidth: `${siderMaskingWidth}px`,
      minWidth: `${siderMaskingWidth}px`,
      flex: `0 0 ${siderMaskingWidth}px`,
      transition: 'all 0.2s ease 0s',
    }"
  />
  <LayoutSider
    :width="aside?.width"
    :class="['vino-layout-sider', '!fixed']"
    collapsible
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsed-width="64"
    :style="siderStyle"
  >
    <!-- 菜单 -->
    <GlobalNavMenu menu-mode="side" />
    <!-- TODO 侧边栏操作区域内容 -->
    <!-- TODO 用户头像 -->
    <!-- 侧栏收起/展开的按钮 -->
    <div
      :class="[
        'vino-sider-collapsed-button',
        'absolute text-center rounded-full flex justify-center items-center cursor-pointer',
      ]"
      @click="collapsed = !collapsed"
    >
      <SvgIcon
        icon="bottom-outlined"
        type="local"
        :style="{ transform: `rotate(${collapsed ? '-90deg' : '90deg'})` }"
      />
    </div>
  </LayoutSider>
</template>

<style lang="scss">
.vino-layout-sider {
  z-index: 100;
  background: transparent !important;
  transition: all 0.2s, background 0s;

  .ant-layout-sider-children {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-inline: 8px; // 左右内边距
    padding-block: 0;
    border-inline-end: 1px solid rgba(5, 5, 5, 0.06); // NOTE 右侧边框
    margin-inline-end: -1px; // 外右边距
  }

  .vino-sider-collapsed-button {
    inset-block-start: 18px;
    z-index: 101;
    width: 24px;
    height: 24px;
    inset-inline-end: -13px;
    transition: color 0.3s, transform 0.3s;
    background-color: #ffffff;
    color: rgba(0, 0, 0, 0.25);
    box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(25, 15, 15, 0.07), 0 0 1px 0 rgba(0, 0, 0, 0.08);

    &:hover {
      color: rgba(0, 0, 0, 0.65);
      box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.05), 0 2px 8px -2px rgba(25, 15, 15, 0.07),
        0 1px 2px 0 rgba(0, 0, 0, 0.08);
    }

    > svg {
      transition: transform 0.3s;
    }
  }
}
</style>
