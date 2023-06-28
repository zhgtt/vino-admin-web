/**
 * 这里给全局组件提供类型提示
 */
import ProContainer from '@/components/ProContainer/index.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ProContainer: typeof ProContainer;
  }
}
