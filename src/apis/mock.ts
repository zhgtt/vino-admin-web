/**
 * @description mock 适配器
 */

import { createAlovaMockAdapter } from '@alova/mock';
import GlobalFetch from 'alova/GlobalFetch';

// mock api
import User_API from '../../mock/user';

// 创建 mock 模拟请求适配器
export const mockAdapter = createAlovaMockAdapter([User_API], {
  // 全局控制是否启用mock接口，默认为true
  enable: true,

  // 非模拟请求适配器，用于未匹配 mock 接口时发送请求
  httpAdapter: GlobalFetch(),

  // mock接口响应延迟，单位毫秒
  delay: 2000,

  // 是否打印 mock 接口请求信息
  mockRequestLogger: true,

  // 模拟接口回调，data 为返回的模拟数据，你可以用它构造任何你想要的对象返回给 alova
  // 以下为默认的回调函数，它适用于使用 GlobalFetch 请求适配器
  // 如果你使用的是其他请求适配器，在模拟接口回调中请自定义返回适合适配器的数据结构
  // onMockResponse: (data) => {
  //    return new Response(JSON.stringify(data);
  // }
});
