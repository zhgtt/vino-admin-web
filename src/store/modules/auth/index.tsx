/**
 * 全局管理登录状态，用户信息，包括用户操作（可能会根据权限来判断）
 */
import { notification } from 'ant-design-vue';
import { defineStore } from 'pinia';

import { useRouteStore } from '@/store';
import { getToken, getUserInfo } from './helpers';

interface AuthState {
  /** 用户信息 */
  userInfo: Auth.UserInfo;
  /** 用户 token */
  token: string;
  /** 登录的加载状态 */
  loginLoading: boolean;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false,
  }),
  /** NOTE
   * getters 相当于 store 中的计算属性
   * 根据 state 中的数据计算出衍生数据，并且缓存计算结果，使多个组件可以共享同一个数据源
   */
  getters: {
    /** 判断是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    },
  },
  actions: {
    /**
     * 登录
     */
    async login() {
      this.loginLoading = true;
      /** TODO 这里处理登录的逻辑，调用接口 */
      // const { data } = await fetchLogin();
      // if (data) {
      await this.handleActionAfterLogin();
      // }
      this.loginLoading = false;
    },

    /**
     * 重置 auth 状态
     */
    resetAuthStore() {
      this.$reset(); // 重置状态
    },

    /**
     * NOTE 处理登录成功/失败的逻辑
     */
    async handleActionAfterLogin() {
      const route = useRouteStore();

      /** 根据 token 获取用户信息，表明登录成功 */
      const loginSuccess = await this.loginByToken();

      if (loginSuccess) {
        await route.initAuthRoute(); // 初始化路由

        // 跳转登录后的地址

        // 登录成功弹出欢迎提示（需等待路由初始化完成）
        if (route.isInitAuthRoute) {
          notification.success({
            message: '登录成功',
            description: `欢迎回来，${this.userInfo.userName}`,
            duration: 4.5,
          });
        }

        return;
      }

      // 不成功则重置状态
      this.resetAuthStore();
    },

    /**
     * 根据 token 获取用户信息，判断是否真正的登录成功
     */
    async loginByToken() {
      let successFlag = false;

      // 将 token 存储在缓存中

      // 获取用户信息
      // const { data } = await fetchUserInfo();

      // if (data) {
      // 成功后将用户信息存储到缓存中

      // 更新状态

      successFlag = true;
      // }

      return successFlag;
    },

    /**
     * 切换账号，更换用户权限
     */
    async updateUserRole() {},
  },
});
