/**
 * 全局管理 网站 app 的状态
 */
import { defineStore } from 'pinia';

interface AppState {
  /** 侧边栏折叠状态（为 true 表示折叠状态） */
  siderCollapse: boolean;
}

export const useAppStore = defineStore('app-store', {
  state: (): AppState => ({
    siderCollapse: false,
  }),
  actions: {
    /** 设置侧边栏折叠的状态 */
    setSiderCollapse(collapse: boolean) {
      this.siderCollapse = collapse;
    },
  },
});
