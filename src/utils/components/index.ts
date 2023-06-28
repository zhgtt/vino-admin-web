import type { ComponentOptions } from 'vue';
import { h } from 'vue';

import { isFunction, isObject } from '@/utils';
/**
 * 对自定义的内容进行组件渲染
 * - 如果是 vue 组件，使用 h 进行渲染
 * - 如果是纯函数组件，直接进行回调
 * - 如果是纯文本内容，则不做处理
 */
export const _renderCustomContent = (content: CustomContentType) => {
  if (!content) return null;

  if (isObject(content) && (content as ComponentOptions)?.setup) return h(content);

  if (isFunction(content)) return (content as () => JSX.Element)();

  return content;
};
