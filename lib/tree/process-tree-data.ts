import { LeafNode, TreeNode } from "./types";

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

export function childNodeIsExpanded(
  node: TreeNode,
  expandKeys: string[]
): boolean {
  if (expandKeys.length) {
    return expandKeys.includes(node.key);
  }
  return false;
}

export function flatTree(
  treeData: TreeNode[],
  expandKeys?: string[]
): TreeNode[] {
  let result: TreeNode[] = [];
  if (!Array.isArray(treeData)) {
    return result;
  }
  for (const node of treeData) {
    const newNode = { ...node, childNodes: [] };
    newNode.expanded =
      Array.isArray(expandKeys) && expandKeys.includes(newNode.key);
    result.push(newNode);
    if (
      node.childNodes &&
      node.childNodes.length &&
      childNodeIsExpanded(node, expandKeys || [])
    ) {
      result = result.concat(flatTree(node.childNodes, expandKeys));
    }
  }
  return result;
}

export function addNodeAdditionalProp(
  nodes: TreeNode[],
  parent?: TreeNode
): TreeNode[] {
  const result: TreeNode[] = [];
  for (const node of nodes) {
    const newNode: TreeNode = {
      ...node,
      parentNode: parent == null ? null : parent,
    };
    if (node.childNodes && node.childNodes.length) {
      newNode.childNodes = addNodeAdditionalProp(node.childNodes, newNode);
    } else {
      (newNode as LeafNode).isLeaf = true;
    }
    result.push(newNode);
  }
  return result;
}
