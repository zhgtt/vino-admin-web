<script lang="ts" setup>
/**
 * @component 侧边栏
 */

import { UserOutlined } from '@ant-design/icons-vue';
import { LayoutSider, Menu, SubMenu } from 'ant-design-vue';
import { computed, ref } from 'vue';

import { LeftOutlined } from '@/components/Svg';
import { layout } from '@/config/setting';
import { Logo } from '../index';

const { Item: MenuItem } = Menu;
const { asideWidth, mode } = layout;

const collapsed = ref<boolean>(false); // 是否收起侧边栏
const siderMaskingWidth = computed(() => (collapsed.value ? 64 : asideWidth)); // 侧边栏底层蒙版
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
    :width="asideWidth"
    :class="['vino-layout-sider', `vino-layout-${mode}`, '!fixed']"
    collapsible
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsed-width="64"
  >
    <!-- logo -->
    <Logo v-if="mode === 'side'" :collapsed="collapsed" />
    <!-- 菜单 -->
    <div class="vino-sider-menu">
      <Menu mode="inline" :inlineIndent="16">
        <MenuItem key="1"><UserOutlined /><span>nav1</span></MenuItem>
        <MenuItem key="2"><UserOutlined /><span>nav2</span></MenuItem>
        <SubMenu key="sub1">
          <template #title>
            <span>
              <UserOutlined />
              <span>User</span>
            </span>
          </template>
          <MenuItem key="3"><UserOutlined />nav3</MenuItem>
        </SubMenu>
      </Menu>
    </div>
    <!-- 侧边栏底部内容 -->
    <div>sider-fooer</div>
    <!-- 侧栏收起/展开的按钮 -->
    <div
      :class="[
        'vino-sider-collapsed-button',
        'absolute text-center rounded-full flex justify-center items-center cursor-pointer',
      ]"
      @click="collapsed = !collapsed"
    >
      <LeftOutlined :style="{ transform: `rotate(${collapsed ? '-90deg' : '90deg'})` }" />
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
    box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(25, 15, 15, 0.07),
      0 0 1px 0 rgba(0, 0, 0, 0.08);

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

.vino-layout-mix {
  height: calc(100% - 56px);
  inset-block-start: 56px; // 上外边距
}

.vino-layout-side {
  height: 100%;
}
</style>
