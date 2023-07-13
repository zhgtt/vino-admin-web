/**
 * @description 静态路由（登录页、404等）
 */
const getLoginModuleRegExp = () => {
  const modules: UnionKey.LoginModule[] = ['account-login', 'qrcode-login', 'register', 'reset-pwd'];
  return modules.join('|');
};

/** 根路由（也可以是动态路由） */
export const ROOT_ROUTE: AuthRoute.Route = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: { title: 'Root' },
};

/** 固定的静态路由 */
export const constantRoutes: AuthRoute.Route[] = [
  ROOT_ROUTE,
  {
    name: 'login',
    path: '/login',
    component: 'self',
    meta: {
      title: '登录',
      singleLayout: 'blank',
      dynamicPath: `/login/:module(${getLoginModuleRegExp()})?`, // 动态路由（括号中的值表示对动态参数进行约束）
    },
    /** NOTE 给对应的路由组件传递属性，实现数据共享 */
    props: (route) => {
      const moduleType = (route.params.module as UnionKey.LoginModule) || 'account-login';
      return { module: moduleType };
    },
  },
  {
    name: '404',
    path: '/404',
    component: 'self',
    meta: { title: '页面丢失了', singleLayout: 'blank' },
  },
  {
    name: '403',
    path: '/403',
    component: 'self',
    meta: { title: '无权限', singleLayout: 'blank' },
  },
  {
    name: '500',
    path: '/500',
    component: 'self',
    meta: { title: '服务器出错啦', singleLayout: 'blank' },
  },
  /** 捕获所有 not-found 页面 */
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*', // 正则匹配
    component: 'self',
    meta: { title: '未找到页面', singleLayout: 'blank' },
  },
];
