/**
 * 获取范围内的随机整数
 */
export const _getRandomInteger = (min: number, max: number) => {
  const minNum = Math.ceil(min); // 向上取整
  const maxNum = Math.floor(max); // 向下取整

  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};
