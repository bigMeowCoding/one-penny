import React, { useEffect, useState } from "react";
import { FC } from "react";
import { TreeNode } from "./types";
import Node from "./tree-node";
import {
  addLevel,
  addNodeCheckedProp,
  addNodeLeafParentProp,
  flatTree,
} from "./process-tree-data";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import {
  checkEffectHandle,
  makeNewCheckedKeys,
  unCheckEffectHandle,
} from "./utils/tree-check";

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

  const onCheck: (key: string, checked: boolean) => void = (key, checked) => {
    if (!isCheckedType(rest)) {
      return;
    }
    const { checkedKeysChange } = rest;
    let keys: string[],
      keysValue = checkedKeysValue.slice(0);
    if (!checked && !checkedKeysValue.includes(key)) {
      // 如果操作是取消选中状态并且节点key不在checkedKeys中做特殊处理
      keysValue = unCheckEffectHandle(treeData, key, keysValue);
    }
    keys = makeNewCheckedKeys(checked, keysValue, key, rest.multiply || false);
    if (checked) {
      keys = checkEffectHandle(treeData, key, keys);
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
