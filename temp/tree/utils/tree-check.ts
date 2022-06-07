import { TreeNode, TreeNodeProp } from '../types';
import {
  addNodeLeafParentProp,
  findNode,
  getAllChild,
  getAllChildKeys,
  getFistCheckParentNode,
  getParentNodes,
} from '../process-tree-data';

export function makeNewCheckedKeys(
  checked: boolean,
  checkedKeysValue: string[],
  key: string,
  multiply: boolean,
): string[] {
  let keys: string[];
  if (multiply) {
    if (checked) {
      keys = checkedKeysValue.concat(key);
    } else {
      keys = checkedKeysValue.filter((item) => item !== key);
    }
  } else {
    if (checked) {
      keys = [key];
    } else {
      keys = [];
    }
  }
  return keys;
}
export function unCheckEffectHandle(
  treeData: TreeNodeProp[],
  checkNodeKey: string,
  currentCheckedKeys: string[],
): string[] {
  let values: string[] = currentCheckedKeys.slice(0);
  // 拿到checked node所有父节点
  const parentNodes = getParentNodes(treeData, checkNodeKey);
  // 找到第一个选中的父节点
  const parentNode = getFistCheckParentNode(parentNodes, values);
  // 获取这个父节点下所有的子节点key
  if (parentNode) {
    values = values.filter((item) => {
      return item !== parentNode?.key;
    });
    const childNodeKeys = getAllChild(parentNode).map((child) => child.key);
    // 拿到check node所有父节点key
    const checkNodeParentsKeys = parentNodes.map((item) => item.key);
    // 去掉子节点中checkNode的父节点key
    values = values.concat(
      childNodeKeys.filter((childKey) => {
        return !checkNodeParentsKeys.includes(childKey);
      }),
    );
  }
  return values;
}

export function checkEffectHandle(
  treeData: TreeNode[],
  checkNodeKey: string,
  newCheckedKeys: string[],
): string[] {
  const nodes = addNodeLeafParentProp(treeData);
  const node = findNode(nodes, checkNodeKey);
  if (!node) {
    return [];
  }
  // 去掉已选的子节点key
  const childNodesKeys = getAllChildKeys(node);
  newCheckedKeys = newCheckedKeys.filter((item) => {
    return !childNodesKeys.includes(item);
  });
  // 合并子节点key
  let parentNode = node.parentNode;
  while (parentNode && parentNode.childNodes) {
    const childKeys: string[] = parentNode.childNodes.map((item) => item.key);
    const allChecked = childKeys.every((childKey) => {
      return newCheckedKeys.includes(childKey);
    });
    if (allChecked) {
      newCheckedKeys = newCheckedKeys.filter((item) => {
        return !childKeys.includes(item);
      });
      if (!newCheckedKeys.includes(parentNode.key)) {
        newCheckedKeys.push(parentNode.key);
      }
    }
    parentNode = parentNode.parentNode;
  }
  return newCheckedKeys;
}
