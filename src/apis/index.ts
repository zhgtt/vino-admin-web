/**
 * @description 对 alova 进行封装，管理实例，可以管理多个 alova 实例
 */

import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
import { mockAdapter } from './mock';

// NOTE 创建实例，基础公共实例，参考文档 https://alova.js.org/zh-CN/learning/alova-instance
export const baseAlovaInst = createAlova({
  // 请求的根路径
  baseURL: '/',

  // 请求的状态，和 ahooks 中的 useRequest 相似，返回对应的 loading、data、success、error 回调等对象
  statesHook: VueHook,

  // 请求适配器，默认适配 window.fetch
  requestAdapter: GlobalFetch(),

  // 请求超时时间，单位为毫秒，默认为 0，表示永不超时
  timeout: 50000,

  // NOTE 请求拦截器，可以是一个异步函数
  beforeRequest(method) {
    // method 是一个实例对象，包含 url、params、data、headers、config 等请求数据
  },
  //   async beforeRequest(method) {},

  // NOTE 响应拦截器，可以是一个异步函数
  responded: {
    // 请求成功的拦截器
    // 当使用 GlobalFetch 请求适配器时，第一个参数接收 Response 对象
    // 第二个参数为当前请求的 method 实例，可以用它同步请求前后的配置信息
    onSuccess: async (response, method) => {
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const json = await response.json(); // 响应数据
      // console.log('json: ', json);
      if (json.code !== 200) {
        // 抛出错误或返回 reject 状态的 Promise 实例时，此请求将抛出错误
        throw new Error(json.message);
      }

      // 解析的响应数据将传给 method 实例的 transformData 钩子函数
      return json.data;
    },
    // 请求失败的拦截器
    onError: (err, method) => {
      alert(err.message);
    },
  },
  // 如果不需要设置请求失败的拦截器，可以直接传入请求成功的拦截器函数，而不再需要通过对象来设置回调。
  //  async responded(response, method) {
  // 请求成功的拦截器
  //   }
});

// 适用于 mock 请求的实例
export const mockAlovaInst = createAlova({
  baseURL: '/',
  statesHook: VueHook,
  requestAdapter: mockAdapter,
  async responded(response, method) {
    const json = await response.json(); // 响应数据
    return json.data;
  },
});
