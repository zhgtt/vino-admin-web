/**
 * 获取手机验证码
 */
import { message } from 'ant-design-vue';
import { computed } from 'vue';

import { REGEXP_PHONE } from '@/constants';
import { useCountDown, useLoading } from '@/hooks';

export const useSmsCode = () => {
  const { loading, startLoading, endLoading } = useLoading();
  const { counts, start, isCounting } = useCountDown(60);

  const initLabel = '获取验证码';
  const countingLabel = (second: number) => `${second} 秒后重新获取`;

  /**
   * 按钮文案
   */
  const label = computed(() => {
    if (isCounting.value) {
      return countingLabel(counts.value);
    }
    return initLabel;
  });

  /**
   * 判断手机号码格式是否正确
   */
  function isPhoneValid(phone: string) {
    if (phone.trim() === '') {
      message.error('手机号码不能为空！');
      return false;
    }
    if (!REGEXP_PHONE.test(phone)) {
      message.error('手机号码格式错误！');
      return false;
    }
    return true;
  }

  /**
   * 获取短信验证码
   */
  async function getSmsCode(phone: string) {
    console.log('phone: ', phone);
    const valid = isPhoneValid(phone);
    if (!valid) return;

    // TODO 调用发送验证码的接口
    startLoading();

    setTimeout(() => {
      message.success('验证码发送成功！');
      start();
      endLoading();
    }, 3000);

    // const { data } = await fetchSmsCode(phone);
    // if (data) {
    //   message?.success('验证码发送成功！');
    //   start();
    // }
    // endLoading();
  }

  return {
    label, // 按钮文案
    isCounting, // 是否开始倒计时
    loading, // 接口请求状态
    getSmsCode, // 调用接口，开始计时
  };
};
