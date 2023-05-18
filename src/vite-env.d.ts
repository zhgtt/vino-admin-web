/// <reference types="vite/client" />

// 声明 .vue 五文件
declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
