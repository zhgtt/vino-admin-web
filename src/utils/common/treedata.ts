interface TreeDataTypes {
  children?: TreeDataTypes[];
  [key: string]: any;
}

/**
 * 根据唯一值，递归查找树结构中 该节点及其父节点的路径，返回一个 由这些路径组成的数组
 * @param arr - 数据源
 * @param func - 接收 一个判断条件 作为参数
 * @param path - 路径拼接的数组
 * @param field - 唯一字段值，默认为 key
 */
export const _findTreeNodePath = (
  arr: TreeDataTypes[],
  func: (item: TreeDataTypes) => boolean,
  path: (string | number)[] = [],
  field: string = 'key'
) => {
  if (!arr) return [];
  for (const item of arr) {
    path.push(item[field]);
    if (func(item)) return path;
    if (item.children) {
      const res = _findTreeNodePath(item.children, func, path, field) as string[];
      if (res.length) return res;
    }
    path.pop(); // 避免数组存在之前的缓存数据
  }
  return [];
};
