/**
 * 这里给全局组件提供类型提示
 */
import ProContainer from '@/components/ProContainer/index.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ProContainer: typeof ProContainer;
    Button: typeof import('ant-design-vue')['Button'];
    Table: typeof import('ant-design-vue')['Table'];
    Form: typeof import('ant-design-vue')['Form'];
    FormItem: typeof import('ant-design-vue')['FormItem'];
    Input: typeof import('ant-design-vue')['Input'];
    Space: typeof import('ant-design-vue')['Space'];
  }
}
