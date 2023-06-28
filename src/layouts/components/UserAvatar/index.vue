<script lang="ts" setup>
/**
 * 用户头像，使用 store 动态展示用户头像信息
 */
import { Avatar, Dropdown, Menu } from 'ant-design-vue';

import { useAuthStore } from '@/store';

const auth = useAuthStore();

const { userName, src } = auth.userInfo;
</script>

<template>
  <div :class="['vino-layout-avatar', 'h-full px-4 inline-flex items-center justify-center cursor-pointer']">
    <Dropdown :class="['avatar-dropdown', 'flex items-center p-2 rounded-md']">
      <span>
        <Avatar
          class="avatar-img"
          :src="src || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'"
        />
        <span class="ml-2">{{ userName }}</span>
      </span>

      <template #overlay>
        <Menu>
          <Menu.Item>
            <a href="javascript:;">1st menu item</a>
          </Menu.Item>
          <Menu.Item>
            <a href="javascript:;">2st menu item</a>
          </Menu.Item>
        </Menu>
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
