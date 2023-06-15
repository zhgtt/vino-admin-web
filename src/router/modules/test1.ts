const routes: AuthRoute.Route[] = [
  {
    name: 'about',
    path: '/about',
    component: 'self',
    meta: {
      title: '关于',
      icon: 'DashboardOutlined',
      singleLayout: 'basic',
      order: 3
    },
  },
];

export default routes;
