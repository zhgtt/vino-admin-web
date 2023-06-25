/**
 * 全局管理 网站 app 的状态
 */
import { defineStore } from 'pinia';

import { system } from '@/settings';

const { alert } = system;

interface AppState {
  /** 侧边栏折叠状态（为 true 表示折叠状态） */
  siderCollapse: boolean;
  /** 全局配置项 */
  // globalSettings
  /** 顶部全局告示 alert 展示状态 */
  isShowlAlert: boolean;
  /** 页面级别的 footerBar 展示状态 */
  hasFooterBar: boolean;
  /** 是否显示侧边栏 */
  isShowAside: boolean;
}

export const useAppStore = defineStore('app-store', {
  state: (): AppState => ({
    siderCollapse: false,
    isShowlAlert: !!alert?.message,
    hasFooterBar: false,
    isShowAside: true,
  }),
  actions: {
    /** 设置侧边栏折叠的状态 */
    setSiderCollapse(collapse: boolean) {
      this.siderCollapse = collapse;
    },
    /** 设置告示栏显隐的状态 */
    setAlertStatus(status: boolean) {
      this.isShowlAlert = status;
    },
    /** 设置 footerBar 显隐的状态 */
    setFooterBarStatus(status: boolean) {
      this.hasFooterBar = status;
    },
    /** 设置 Aside 侧边栏的显隐的状态 */
    setAsideStatus(status: boolean) {
      this.isShowAside = status;
    },
  },
});
