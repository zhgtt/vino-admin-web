import { defineMock } from '@alova/mock';
import asyncRoutes from './asyncRoutes';

export default defineMock(
  {
    // get 请求
    '/api/routes/list': () => ({ success: true, code: 200, message: '', data: asyncRoutes }),
  },
  true
);
