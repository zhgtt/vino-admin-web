interface TreeNodeTypes {
  children?: TreeNodeTypes[];
  [key: string]: any;
}

/**
 * 根据唯一值，递归查找树结构中 该节点及其父节点的路径，返回一个 由这些路径组成的数组
 * @param tree - 数据源
 * @param func - 接收 一个判断条件 作为参数
 * @param path - 路径拼接的数组
 * @param field - 唯一字段值，是个 string，如果不传，则存入 item
 */
type PathType = (string | number | TreeNodeTypes)[];

export const _findTreeNodePath = (
  tree: TreeNodeTypes[],
  func: (item: TreeNodeTypes) => boolean,
  field?: string,
  path: PathType = []
): PathType => {
  if (!tree) return [];

  for (const item of tree) {
    field ? path.push(item[field]) : path.push(item);

    if (func(item)) return path;
    if (item.children) {
      const res = _findTreeNodePath(item.children, func, field, path);
      if (res.length) return res;
    }
    path.pop(); // 避免数组存在之前的缓存数据
  }
  return [];
};

/**
 * 将树结构转成普通数组，平铺展示
 * @param tree - 数据源
 * @param result - 结果数据
 * @param level - 层级
 */
export const _treeToData = (tree: TreeNodeTypes[], result: TreeNodeTypes[] = [], level = 0) => {
  tree.forEach((item) => {
    result.push(item);
    item.level = level + 1;
    item.children && _treeToData(item.children, result, level + 1);
  });
  return result;
};
