import { TreeNode } from "./types";

export function addLevel(treeData: TreeNode[], level = 1): TreeNode[] {
  const result: TreeNode[] = [];
  for (const node of treeData) {
    const newNode = { ...node, level };
    if (node.childNodes && node.childNodes.length) {
      newNode.childNodes = addLevel(node.childNodes, level + 1);
    }
    result.push(newNode);
  }
  return result;
}

export function flatTree(treeData: TreeNode[]): TreeNode[] {
  let result: TreeNode[] = [];
  if (!Array.isArray(treeData)) {
    return result;
  }
  for (const node of treeData) {
    const newNode = { ...node, childNodes: [] };
    result.push(newNode);
    if (node.childNodes && node.childNodes.length) {
      result = result.concat(flatTree(node.childNodes));
    }
  }
  return result;
}
