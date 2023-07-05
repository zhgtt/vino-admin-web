import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'; // 配置 vue 使用 jsx/tsx
import type { PluginOption } from 'vite';
import progress from 'vite-plugin-progress'; // 在命令面板显示 vite 构建的进度条和状态

import SvgIconPlugin from './svg-icons';

export function setupVitePlugins(viteEnv: any): (PluginOption | PluginOption[])[] {
  const plugins = [
    vue({
      script: {
        defineModel: true, // 开启组合式 API 的模型定义，为 vue 组件提供更好的类型支持
      },
    }),
    vueJsx(),
    progress(),
    ...SvgIconPlugin(),
  ];

  return plugins;
}
