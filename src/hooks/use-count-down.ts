/**
 * 倒计时
 */
import { computed, onScopeDispose, ref } from 'vue';

import { useBoolean } from '@/hooks';

export const useCountDown = (second: number) => {
  if (second <= 0 && second % 1 !== 0) {
    throw new Error('倒计时的时间应该为一个正整数');
  }

  const { setTrue, setFalse } = useBoolean();

  const counts = ref(0); // 计数
  const isCounting = computed(() => Boolean(counts.value)); // 倒计时的状态（为 true 表示正在倒计时，为 false 表示倒计时结束）

  let timer: any = null; // 定时器

  /**
   * 开始计时
   * @param updateSecond - 更改一开始传入的倒计时时间
   */
  const start = (updateSecond: number = second) => {
    if (!counts.value) {
      setFalse();
      counts.value = updateSecond;

      timer = setInterval(() => {
        counts.value -= 1;
        if (counts.value <= 0) {
          clearInterval(timer);
          setTrue();
        }
      }, 1000);
    }
  };

  /**
   * 停止计时
   */
  const stop = () => {
    timer = clearInterval(timer);
    counts.value = 0;
  };

  /**
   * 组件或者 hooks 销毁时，清除定时器
   */
  onScopeDispose(stop);

  return { start, stop, counts, isCounting };
};
