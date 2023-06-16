import appList from './apps.json';

export const layout: App.GlobalLayoutSettings = {
  title: 'Vino Admin Web',
  mode: 'mix',
  aside: {
    width: 216,
  },
  menu: {
    position: 'side',
  },
  logo: {
    src: 'https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png',
    alt: 'Vino Admin',
  },
  appList,
  footer: {
    copyright: 'Copyright © 2023 Vino Admin Web',
  },
};

export const system: App.GlobalSystemSettings = {
  iconFontUrl: '',
  // alert: {
  //   message: '本网站提供的部分服务在你当前浏览器中无法使用，建议你更换为 Chrome 浏览器查看本网站。',
  //   isShowIcon: true,
  // },
};
