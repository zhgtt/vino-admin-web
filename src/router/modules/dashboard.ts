const routes: AuthRoute.Route[] = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: 'basic',
    redirect: '/dashboard/workbench',
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined',
      order: 0
    },
    children: [
      {
        name: 'dashboard_workbench',
        path: '/dashboard/workbench',
        component: 'self',
        meta: {
          title: '工作台',
        },
      },
    ],
  },
];

export default routes;
