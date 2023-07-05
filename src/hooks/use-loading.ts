/**
 * 标识 hook
 * - 用于标识 loading 的状态，同 useBoolean 一样
 */
import { useBoolean } from '@/hooks';

export const useLoading = (initValue = false) => {
  const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(initValue);

  return { loading, startLoading, endLoading };
};
