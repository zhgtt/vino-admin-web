/**
 * 过滤掉对象中所有值为空的字段，返回一个新对象，该方法并不适用于大多数场景
 * @param obj - 源数据
 * @param isFilterAll - 是否过滤所有空值，默认为 true；反之只过滤值为 null | undefined 的字段
 */
export const _removeEmptyKey = (obj: { [key: string]: any }, isFilterAll = true) => {
  let newObj = {};
  /**
   * NOTE 方式一
   * 使用 Object.entries() 将对象的键值对以数组的形式返回
   * 再过滤掉为空的值
   * 再使用 Object.fromEntries() 将数组转换成一个对象
   */
  const filterEmpty = Object.entries(obj).filter(([_key, value]) =>
    isFilterAll ? Boolean(value) : value !== undefined && value !== null
  );
  newObj = Object.fromEntries(filterEmpty);

  /**
   * NOTE 方式二
   * 使用 Object.keys 将对象所有的 key 转成一个数组
   * 再使用 reduce 转成对象
   */
  // const keys = Object.keys(obj).filter((item) => Boolean(obj[item]));
  // newObj = keys.reduce((prevItem, item) => ({ ...prevItem, [item]: obj[item] }), {});

  // console.log('newObj: ', newObj);
  return newObj;
};
