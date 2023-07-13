/**
 * 对组件、module 的类型定义，以免 ts 不认识
 */
declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare module '@/sketchs' {
  const waves: (p: P5Methods) => void;
  export { waves };
}

declare module '*.svg' {
  const content: string;
  export default content;
}
