<script lang="ts" setup>
import type { MenuProps } from 'ant-design-vue';
import { Dropdown, Menu } from 'ant-design-vue';
import { useRoute } from 'vue-router';

import { useRouterPush } from '@/hooks';

interface Props {
  route: App.GlobalBreadcrumb;
}

const vueRoute = useRoute();
const { routerPush } = useRouterPush();

const { route } = defineProps<Props>();

const { childList = [], breadcrumbName, icon } = route;

/** 图标 render */
const IconRender = icon && icon();

const onClick: MenuProps['onClick'] = ({ item }) => {
  const menuItem = item as App.GlobalMenuOption;
  routerPush(menuItem.routePath);
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
            <Menu.Item
              v-if="!menu.hide"
              v-bind="{ ...menu as Omit<App.GlobalMenuOption, 'key'>  }"
              :disabled="menu.key === vueRoute.name"
            >
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
