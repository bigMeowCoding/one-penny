import React, { useEffect, useState } from "react";
import { FC } from "react";
import { TreeNode } from "./types";
import Node from "./tree-node";
import {
  addLevel,
  addNodeCheckedProp,
  addNodeLeafParentProp,
  findNode,
  flatTree,
  getAllChild,
  getFistCheckParentNode,
  getParentNodes,
} from "./process-tree-data";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import { makeNewCheckedKeys } from "./utils/tree-check";

interface TreeBaseType {
  treeData: TreeNode[];
  expandKeys?: string[];
}

type TreeCheck = {
  checkAble: boolean;
  checkedKeysChange: (keys: string[]) => void;
  checkedKeys: string[];
  multiply: boolean | undefined;
} & TreeBaseType;
type Props = TreeBaseType | TreeCheck;
function isCheckedType(tree: {} | TreeCheck): tree is TreeCheck {
  return (tree as TreeCheck).checkAble;
}

const addClassByPrefix = makeClassByPrefix("zyj-ui-tree");

const Tree: FC<Props> = ({ treeData, children, expandKeys, ...rest }) => {
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>(treeData),
    [checkedKeysValue, setCheckedKeysValue] = useState<string[]>(
      (rest as TreeCheck).checkedKeys || []
    ),
    [expandKeysValue, setExpandKeysValue] = useState<string[]>(
      expandKeys || []
    ),
    [checkAble, setCheckAble] = useState<boolean>(false);
  useEffect(() => {
    if (isCheckedType(rest)) {
      setCheckAble(true);
    }
  }, []);
  useEffect(() => {
    let newTreeData: TreeNode[];
    newTreeData = addLevel(treeData);
    newTreeData = addNodeLeafParentProp(newTreeData);
    addNodeCheckedProp(newTreeData, checkedKeysValue);
    newTreeData = flatTree(newTreeData, expandKeysValue);
    setTreeNodes(newTreeData);
  }, [expandKeysValue, checkedKeysValue]);

  function unCheckChildNodeKeysChange(
    key: string,
    keysValue: string[]
  ): string[] {
    let values: string[] = keysValue.slice(0);
    // 拿到checked node所有父节点
    const parentNodes = getParentNodes(treeData, key);
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
        })
      );
    }
    return values;
  }

  const onCheck: (key: string, checked: boolean) => void = (key, checked) => {
    if (!isCheckedType(rest)) {
      return;
    }
    const { checkedKeysChange } = rest;
    let keys: string[],
      keysValue = checkedKeysValue.slice(0);
    // 如果操作是取消选中状态并且节点key不在checkedKeys中做特殊处理
    if (!checked && !checkedKeysValue.includes(key)) {
      keysValue = unCheckChildNodeKeysChange(key, keysValue);
    }
    keys = makeNewCheckedKeys(checked, keysValue, key, rest.multiply || false);
    if (checked) {
      const nodes = addNodeLeafParentProp(treeData);
      const node = findNode(nodes, key);
      let parentNode = node?.parentNode;
      while (parentNode && parentNode.childNodes) {
        const childKeys: string[] = parentNode.childNodes.map(
          (item) => item.key
        );
        const allChecked = childKeys.every((childKey) => {
          return keys.includes(childKey);
        });
        if (allChecked) {
          keys = keys.filter((item) => {
            return !childKeys.includes(item);
          });
          if(!keys.includes(parentNode.key)) {
            keys.push(parentNode.key)
          }
        }
        parentNode = parentNode.parentNode;
      }
    }
    setCheckedKeysValue(keys);
    checkedKeysChange(keys);
  };

  const collapseHandle = (key: string) => {
    const keys = expandKeysValue.filter((item) => item !== key);
    setExpandKeysValue(keys);
  };

  const expandHandle = (key: string) => {
    const keys = [...expandKeysValue, key];
    setExpandKeysValue(keys);
  };

  return (
    <div className={addClassByPrefix("")}>
      {treeNodes.map((node) => {
        return (
          <Node
            nodeData={node}
            checkAble={checkAble}
            key={node.key}
            onCollapse={collapseHandle}
            onExpand={expandHandle}
            onCheck={onCheck}
          />
        );
      })}
    </div>
  );
};

export default Tree;
