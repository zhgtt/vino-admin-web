/**
 * 获取范围内的随机整数
 */
export const _getRandomInteger = (min: number, max: number) => {
  const minNum = Math.ceil(min); // 向上取整
  const maxNum = Math.floor(max); // 向下取整

  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
};

/**
 * 横线命名的单词转驼峰
 * @param word - 单词
 * @param capitalizeFirstLetter - 是否首字母大写
 */
export const _convertToCamelCase = (word: string, capitalizeFirstLetter: boolean = false) => {
  if (!word) return '';

  const regex = /[_-](\w)/g;
  const convertedWord = word.replace(regex, (_, c) => c.toUpperCase());

  return capitalizeFirstLetter ? convertedWord.charAt(0).toUpperCase() + convertedWord.slice(1) : convertedWord;
};
