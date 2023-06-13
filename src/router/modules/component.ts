const routes: AuthRoute.Route[] = [
  {
    name: 'component',
    path: '/component',
    component: 'basic',
    redirect: '/components/button',
    meta: {
      title: '组件示例',
      icon: 'LikeOutlined',
      order: 1,
    },
    children: [
      {
        name: 'component_qrcode',
        path: '/component/qrcode',
        component: 'self',
        meta: {
          title: '二维码',
          order: 0,
        },
      },
      {
        name: 'component_button',
        path: '/component/button',
        component: 'self',
        meta: {
          title: '按钮',
          order: 1,
          multi: false,
        },
      },
      {
        name: 'component_button-detail',
        path: '/component/button/detail',
        component: 'self',
        meta: {
          title: '按钮详情页',
          hide: true,
          activeMenu: 'component_button',
        },
      },
    ],
  },
];

export default routes;
