<script lang="tsx" setup>
/**
 * 用户头像，使用 store 动态展示用户头像信息
 */
import type { MenuProps } from 'ant-design-vue';
import { Avatar, Dropdown, Menu, Modal } from 'ant-design-vue';

import { SvgIcon } from '@/components';
import { useAuthStore } from '@/store';

type DropdownKey = 'user-center' | 'logout';

const auth = useAuthStore();

const { userName, src } = auth.userInfo;

const items: MenuProps['items'] = [
  { key: 'user-center', label: '个人中心', icon: <SvgIcon icon="meh-outlined" /> },
  { type: 'divider', key: 'divider' },
  { key: 'logout', label: '退出登录', icon: <SvgIcon icon="logout-outlined" /> },
];

// 菜单点击
const handleClick: MenuProps['onClick'] = ({ key }) => {
  const optionKey = key as DropdownKey;
  if (optionKey === 'logout') {
    Modal.confirm({
      title: '提示',
      content: '您确定要退出登录吗？',
      okText: '确定',
      // icon: null,  // 可以自定义 icon
      onOk() {
        // 返回一个 promise，异步关闭
        // return new Promise((resolve, reject) => {
        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        // }).catch(() => console.log('Oops errors!'));
        auth.resetAuthStore();
      },
    });
  }
};
</script>

<template>
  <div :class="['vino-layout-avatar', 'h-full px-4 inline-flex items-center justify-center cursor-pointer']">
    <Dropdown :class="['avatar-dropdown', 'flex items-center p-2 rounded-md']" placement="bottomRight">
      <span>
        <Avatar
          class="avatar-img"
          :src="src || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'"
        />
        <span class="ml-2">{{ userName }}</span>
      </span>

      <template #overlay>
        <Menu :items="items" @click="handleClick" />
      </template>
    </Dropdown>
  </div>
</template>

<style lang="scss">
.vino-layout-avatar {
  color: rgba(0, 0, 0, 0.45);

  .avatar-dropdown {
    height: 44px;
    transition: all 0.32s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }

  .avatar-img {
    width: 28px;
    height: 28px;
  }
}
</style>
