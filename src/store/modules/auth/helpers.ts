/**
 * 动态获取用户信息
 */
export const getUserInfo = () => {
  const emptyInfo: Auth.UserInfo = {
    userId: '007',
    userName: '叫啥呀',
    userRole: 'user',
    src: '',
  };
  const userInfo: Auth.UserInfo = '' || emptyInfo;

  return userInfo;
};

/**
 * 获取用户 token
 */
export const getToken = () => {
  return '';
};

/**
 * 去除用户相关缓存
 */
export const clearAuthStorage = () => {};
