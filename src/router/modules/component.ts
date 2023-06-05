const routes: AuthRoute.Route[] = [
  {
    name: 'component',
    path: '/component',
    component: 'basic',
    redirect: '/components/button',
    meta: {
      title: '组件示例',
      icon: 'LikeOutlined'
    },
    children: [
      {
        name: 'component_button',
        path: '/component/button',
        component: () => import('@/views/component/button/index.vue'),
        meta: {
          title: '按钮',
        },
      },
      {
        name: 'component_qrcode',
        path: '/component/qrcode',
        component: () => import('@/views/component/qrcode/index.vue'),
        meta: {
          title: '二维码',
        },
      },
    ],
  },
];

export default routes;
