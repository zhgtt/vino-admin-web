const baseRouter = {
  
}

const systemRouter = {
  path: '/system',
  meta: {
    icon: 'setting',
    title: 'menus.hssysManagement',
    // rank: system,
  },
  children: [
    {
      path: '/system/user/index',
      name: 'User',
      meta: {
        icon: 'flUser',
        title: 'menus.hsUser',
        roles: ['admin'],
      },
    },
    {
      path: '/system/role/index',
      name: 'Role',
      meta: {
        icon: 'role',
        title: 'menus.hsRole',
        roles: ['admin'],
      },
    },
    {
      path: '/system/dept/index',
      name: 'Dept',
      meta: {
        icon: 'dept',
        title: 'menus.hsDept',
        roles: ['admin'],
      },
    },
  ],
};

export default [systemRouter];
