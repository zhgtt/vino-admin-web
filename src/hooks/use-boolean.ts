/**
 * 标识 hook，给一些具有标识意义的字段设置状态
 * @param initValue - 初始值
 */
import { ref } from 'vue';

export const useBoolean = (initValue = false) => {
  const bool = ref(initValue);

  function setBool(value: boolean) {
    bool.value = value;
  }

  const setTrue = () => setBool(true);

  const setFalse = () => setBool(false);

  // 取反
  const toggle = () => setBool(!bool.value);

  return { bool, setTrue, setFalse, toggle };
};
