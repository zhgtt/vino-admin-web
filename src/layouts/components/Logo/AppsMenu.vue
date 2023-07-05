<script lang="tsx" setup>
import { Popover } from 'ant-design-vue';
import type { CSSProperties } from 'vue';
import { PropType, defineComponent, ref } from 'vue';

import { SvgIcon } from '@/components';
import { layout } from '@/settings';

const { appList = [] } = layout;

interface Props {
  style?: CSSProperties;
}

const { style } = defineProps<Props>();

const actived = ref<boolean>(false);

/** 渲染 applist */
const AppItemRender = defineComponent({
  props: {
    appItem: {
      type: Object as PropType<Omit<App.GlobalAppsMenu, 'children'>>,
      required: true,
    },
  },
  setup(props, _context) {
    const { title, icon, desc, url } = props.appItem;

    return () => (
      <li class="app-content-item">
        <a href={url} rel="noreferrer" target="_blank">
          <img width="40" height="40" src={icon} alt="logo" />
          <div>
            <span>{title}</span>
            <span>{desc}</span>
          </div>
        </a>
      </li>
    );
  },
});
</script>

<template>
  <!-- TODO 等待 antd 更新，支持将箭头去掉 -->
  <Popover
    trigger="click"
    overlayClassName="pop-style"
    v-model:open="actived"
    placement="bottomLeft"
    destroyTooltipOnHide
    v-if="appList.length > 0"
  >
    <div
      :class="[
        'apps-icon',
        actived && 'apps-icon-actived',
        'inline-flex items-center justify-center cursor-pointer rounded-md',
      ]"
      :style="style"
    >
      <SvgIcon icon="apps-menu" type="local" />
    </div>

    <template #content>
      <div class="apps-list">
        <ul class="app-content">
          <template v-for="(app, index) in appList">
            <!-- 分组 -->
            <div v-if="app.children && app.children.length" :key="index" class="app-group mb-4">
              <div class="app-group-title font-semibold">{{ app.title }}</div>
              <ul>
                <AppItemRender v-for="(item, i) in app.children" :key="i" :app-item="item" />
              </ul>
            </div>

            <!-- 无分组 -->
            <AppItemRender v-else :key="String(index)" :app-item="app" />
          </template>
        </ul>
      </div>
    </template>
  </Popover>
</template>

<style lang="scss">
.pop-style {
  position: fixed; // 不让卡片随滚动条而滚动
}

.apps-icon {
  padding-inline: 4px;
  padding-block: 0;
  font-size: 14px;
  height: 28px;
  width: 28px;
  color: var(--nav-menu-color);
  transition: all 0.3s;
  transition: font-size 0.2s ease-in-out, color 0.2s ease-in-out;
}

.apps-icon:hover,
.apps-icon-actived {
  color: #000;
  background-color: rgba(0, 0, 0, 0.04);
}

.apps-list {
  max-height: calc(100vh - 48px);
  overflow: auto;

  .app-group {
    &-title {
      margin: 12px 0 8px 12px;
      color: rgba(0, 0, 0, 0.88);
      font-size: 16px;
      opacity: 0.85;
      line-height: 1.5;
    }
  }

  .app-content {
    max-width: 656px;
    &-item {
      position: relative;
      display: inline-block;
      width: 328px;
      height: 72px;
      padding-inline: 16px;
      padding-block: 16px;
      vertical-align: top;
      transition: all 0.2s cubic-bezier(0.333, 0, 0, 1);
      border-radius: 6px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
    }

    a {
      display: flex;
      height: 100%;
      > div {
        margin-inline-start: 14px;
        color: rgba(0, 0, 0, 0.88);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        > span {
          display: inline-block;
          max-width: 230px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        > span:last-child {
          color: rgba(0, 0, 0, 0.65);
          font-size: 12px;
        }
      }
    }
  }
}
</style>
