<script lang="ts" setup>
import type { MenuProps } from 'ant-design-vue';
import { Dropdown, Menu } from 'ant-design-vue';

interface Props {
  route: App.GlobalBreadcrumb;
}

const { route } = defineProps<Props>();

const { childList = [], path, breadcrumbName, icon, readonly } = route;

const IconRender = icon && icon();

const onClick: MenuProps['onClick'] = ({ item }) => {
  console.log('item: ', item);
};
</script>

<template>
  <template v-if="childList.length > 0">
    <Dropdown>
      <span class="cursor-pointer">
        <IconRender class="pr-2" />
        <span>{{ breadcrumbName }}</span>
      </span>
      <template #overlay>
        <Menu @click="onClick">
          <template v-for="menu in childList" :key="menu.key">
            <Menu.Item v-if="!menu.hide" v-bind="{ ...menu as Omit<App.GlobalMenuOption, 'key'>  }">
              {{ menu.label }}
            </Menu.Item>
          </template>
        </Menu>
      </template>
    </Dropdown>
  </template>

  <template v-else>
    <span>
      <IconRender class="pr-2" />
      <span>{{ breadcrumbName }}</span>
    </span>
  </template>
</template>
