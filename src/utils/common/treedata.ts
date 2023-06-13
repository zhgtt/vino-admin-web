interface TreeDataTypes {
  children?: TreeDataTypes[];
  [key: string]: any;
}

/**
 * 根据唯一值，递归查找树结构中 该节点及其父节点的路径，返回一个 由这些路径组成的数组
 * @param tree - 数据源
 * @param func - 接收 一个判断条件 作为参数
 * @param path - 路径拼接的数组
 * @param field - 唯一字段值，是个 string，如果不传，则存入 item
 */
export const _findTreeNodePath = (
  tree: TreeDataTypes[],
  func: (item: TreeDataTypes) => boolean,
  field?: string,
  path: (string | number | TreeDataTypes)[] = []
) => {
  if (!tree) return [];

  for (const item of tree) {
    field ? path.push(item[field]) : path.push(item);

    if (func(item)) return path;
    if (item.children) {
      const res = _findTreeNodePath(item.children, func, field, path) as (string | number | TreeDataTypes)[];
      if (res.length) return res;
    }
    path.pop(); // 避免数组存在之前的缓存数据
  }
  return [];
};

/**
 * 根据唯一值，递归查找该节点及其父节点
 * @param tree - 数据源
 * @param func - 接收 一个判断条件 作为参数
 */
export const _filterTreeNode = (tree: TreeDataTypes[], func: (item: TreeDataTypes) => boolean): TreeDataTypes[] => {
  return tree
    .map((item) => ({ ...item })) // 使用 map 复制一下节点，避免修改到原树
    .filter((node) => {
      node.children = node?.children ? _filterTreeNode(node.children, func) : [];
      return func(node) || (node.children && node.children.length);
    });
};

/**
 * 将树结构转成普通数组，平铺展示
 * @param tree - 数据源
 * @param result - 结果数据
 * @param level - 层级
 */
export const _treeToData = (tree: TreeDataTypes[], result: TreeDataTypes[] = [], level = 0) => {
  tree.forEach((item) => {
    result.push(item);
    item.level = level + 1;
    item.children && _treeToData(item.children, result, level + 1);
  });
  return result;
};
