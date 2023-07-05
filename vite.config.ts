import { resolve } from 'path';
import { defineConfig } from 'vite';

import { setupVitePlugins } from './build';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const rootPath = resolve(process.cwd()); // 项目根路径
  const srcPath = `${rootPath}/src`;
  // 或
  // const srcPath = resolve(__dirname, 'src');

  return {
    /** 项目根路径 */
    base: '/',

    /** 配置项目别名 */
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },

    // define:

    /** 插件 */
    plugins: setupVitePlugins(),
    css: {
      // 配置全局样式文件（全局变量、函数）
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`, // 一定要加上分号
        },
      },
    },

    /** 项目服务（包括代理配置） */
    server: {
      open: true, // 默认打开浏览器
      port: 5173, // 端口号
      // proxy:
    },

    /** 压缩配置 */
    // optimizeDeps: {}

    /** 打包配置（生产） */
    // build: {
    //   sourcemap: false,  // 关闭 sourcemap 源码检查
    // },
  };
});
