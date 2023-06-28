/**
 * 这里注册全局组件（只对部分组件进行全局注册）
 * 全局组件的 ts 类型提示可在 components.d.ts 文件中查看
 */
import type { App } from 'vue';

import ProContainer from '@/components/ProContainer/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import VueP5Wrapper from '@/components/VueP5Wrapper/index.vue';

const setupComponents = (app: App) => {
  app.component('ProContainer', ProContainer);
};

/** 组件 */
export { SvgIcon, VueP5Wrapper };

/** 全局组件 */
export default setupComponents;
