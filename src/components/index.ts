/**
 * 这里注册全局组件（只对部分组件进行全局注册）
 */
import type { App } from 'vue';

import ProContainer from '@/components/ProContainer/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

const setupComponents = (app: App) => {
  app.component('ProContainer', ProContainer);
};

/** 组件 */
export { SvgIcon };

/** 全局组件 */
export default setupComponents;
