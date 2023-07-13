/**
 * 顶部进度条插件
 * 相关资料：https://cloud.tencent.com/developer/article/2192271
 */

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  easing: 'ease-in-out', // 动画方式，参考 https://www.runoob.com/cssref/css3-pr-transition-timing-function.html
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载 ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', // 指定进度条的父容器
});

/** 开启进度条 */
export const start = () => {
  return NProgress.start();
};

/** 关闭进度条 */
export const close = () => {
  return NProgress.done();
};
