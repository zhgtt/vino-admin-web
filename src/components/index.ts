/**
 * 这里注册全局组件（只对部分组件进行全局注册）
 * 全局组件的 ts 类型提示可在 components.d.ts 文件中查看
 */
import { Button, Form, Input, Modal, Space, Table } from 'ant-design-vue';
import type { App } from 'vue';

import ImageVerify from '@/components/ImageVerify/index.vue';
import ProContainer from '@/components/ProContainer/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import VueP5Wrapper from '@/components/VueP5Wrapper/index.vue';

const setupComponents = (app: App) => {
  /** 自定义组件 */
  app.component('ProContainer', ProContainer);

  /** antd 组件 */
  app.component('Button', Button);
  app.component('Table', Table);
  app.component('Form', Form);
  app.component('FormItem', Form.Item);
  app.component('Input', Input);
  app.component('Modal', Modal);
  app.component('Space', Space);
};

/** 组件 */
export { SvgIcon, VueP5Wrapper, ImageVerify };

/** 全局组件 */
export default setupComponents;
