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
  const [nodes, setNodes] = useState<TreeNode[]>(treeData),
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
    console.log(newTreeData)
    newTreeData = flatTree(newTreeData, expandKeysValue);
    setNodes(newTreeData);
  }, [expandKeysValue, checkedKeysValue]);

  // useEffect(() => {
  //   let newTreeData: TreeNode[];
  //   newTreeData = addNodeLeafParentProp(treeData);
  //   newTreeData = addLevel(newTreeData);
  //   newTreeData = flatTree(newTreeData, expandKeysValue);
  //   setNodes(newTreeData);
  // }, [checkedKeysValue]);

  const onCheck: (key: string, checked: boolean) => void = (key, checked) => {
    if (!isCheckedType(rest)) {
      return;
    }
    const { checkedKeysChange } = rest;
    let keys;
    keys = makeNewCheckedKeys(
      checked,
      checkedKeysValue,
      key,
      rest.multiply || false
    );
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
      {nodes.map((node) => {
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
