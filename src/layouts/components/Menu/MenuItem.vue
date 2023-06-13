<script lang="tsx" setup>
import { Menu } from 'ant-design-vue';
import { defineComponent, PropType } from 'vue';

const { SubMenu, Item } = Menu;

interface Props {
  menus: App.GlobalMenuOption[];
}

const { menus } = defineProps<Props>();

/** 递归渲染子菜单 */
const ChildMenuItem = defineComponent({
  props: {
    menuData: {
      type: Object as PropType<App.GlobalMenuOption>,
      required: true,
    },
  },
  setup(props, _context) {
    const { key, label, children = [], icon, hide, ...rest } = props.menuData;

    const LabelRender = () => <span>{label}</span>;

    return () =>
      children.length ? (
        <SubMenu key={key} title={<LabelRender />} icon={icon && icon()} popupClassName="vino-sider-submenu-popup">
          {children.map((child) => (
            <ChildMenuItem key={child.key} menuData={child} />
          ))}
        </SubMenu>
      ) : (
        <>
          {!hide && (
            <Item key={key} icon={icon && icon()} title={label} {...(rest as Omit<App.GlobalMenuOption, 'key'>)}>
              <LabelRender />
            </Item>
          )}
        </>
      );
  },
});
</script>

<template>
  <template v-for="menu in menus" :key="menu.key">
    <ChildMenuItem :menu-data="menu" />
  </template>
</template>
