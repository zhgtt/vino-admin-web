/**
 * 整体布局的配置项
 */
import appList from './apps.json';

export const layout: App.GlobalLayoutSettings = {
  title: 'Vino Admin',
  mode: 'mix',
  aside: { width: 216 },
  menu: { position: 'left' },
  logo: {
    src: 'https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png',
    alt: 'Vino Admin',
  },
  appList,
  footer: { copyright: 'Copyright © 2023 Vino Admin Web' },
};
