/**
 * 全局方法、变量类型提示
 */

/** 懒加载 */
declare type Lazy<T> = () => Promise<T>;

/** 自定义内容，可以是字符串，或 纯函数组件，或 vue 状态组件 */
declare type CustomContentType = string | (() => JSX.Element) | import('vue').Component;

/** p5.js 公共方法 */
declare type P5Methods = import('P5') & {
  updateWithProps?: (props: { [key: string]: any }) => void;
};

/** 全局变量 */
declare namespace UnionKey {
  /**
   * 登录相关模块、页面
   * - account-login: 普通登录
   * - qrcode-login: 二维码登录
   * - register: 账号注册
   * - reset-pwd: 重置密码
   */
  type LoginModule = 'account-login' | 'qrcode-login' | 'register' | 'reset-pwd';

  /** http请求头的content-type类型 */
  type ContentType = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data';

  /**
   * 过渡动画类型
   * - zoom-fade: 渐变
   * - zoom-out: 闪现
   * - fade-slide: 滑动
   * - fade: 消退
   * - fade-bottom: 底部消退
   * - fade-scale: 缩放消退
   */
  type ThemeAnimateMode = 'zoom-fade' | 'zoom-out' | 'fade-slide' | 'fade' | 'fade-bottom' | 'fade-scale';
}
