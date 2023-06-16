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
}

export const useAppStore = defineStore('app-store', {
  state: (): AppState => ({
    siderCollapse: false,
    isShowlAlert: !!alert?.message,
  }),
  actions: {
    /** 设置侧边栏折叠的状态 */
    setSiderCollapse(collapse: boolean) {
      this.siderCollapse = collapse;
    },
    /** 设置告示栏显影的状态 */
    setAlertStatus(status: boolean) {
      console.log('status: ', status);
      this.isShowlAlert = status;
    },
  },
});
