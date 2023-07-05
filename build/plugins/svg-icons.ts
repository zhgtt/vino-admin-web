/**
 * 渲染本地 svg 的插件
 */
import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default function SvgIconPlugin() {
  // 本地 svg 图标路径
  const localIconPath = resolve(process.cwd(), 'src/assets/svg-icons');

  // 本地 svg 图标集合名称
  const localIconName = 'icon-local';

  return [
    /** 渲染本地 local 图标 */
    createSvgIconsPlugin({
      iconDirs: [localIconPath], // 指定本地图标的路径
      symbolId: `${localIconName}-[dir]-[name]`, // 指定 symbolId 格式
      inject: 'body-last', // 指定如何让本地的 svg 集合及源码注入到页面中，这里是指注入到 body 的末尾
      customDomId: '__SVG_ICON_LOCAL__', // 自定义 dom 的 id 属性
    }),
  ];
}
