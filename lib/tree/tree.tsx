import React, { useEffect, useState } from "react";
import { FC } from "react";
import { TreeNode } from "./types";
import Node from "./tree-node";
import { addLevel, flatTree } from "./process-tree-data";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import { makeNewCheckedKeys } from "./utils/tree-check";
interface TreeBaseType {
  treeData: TreeNode[];
}
type TreeCheckType = {
  checkAble: boolean;
  checkedKeysChange: (keys: string[]) => void;
  checkedKeys: string[];
  multiply: boolean | undefined;
} & TreeBaseType;
type Props = TreeBaseType | TreeCheckType;
function isCheckedType(tree: {} | TreeCheckType): tree is TreeCheckType {
  return (tree as TreeCheckType).checkAble;
}

const addClassByPrefix = makeClassByPrefix("zyj-ui-tree");

const Tree: FC<Props> = ({ treeData, children, ...rest }) => {
  const [nodes, setNodes] = useState<TreeNode[]>(treeData),
    [checkedKeysValue, setCheckedKeysValue] = useState<string[]>(
      (rest as TreeCheckType).checkedKeys || []
    ),
    [checkAble, setCheckAble] = useState<boolean>(false);
  useEffect(() => {
    setNodes(flatTree(addLevel(treeData)));
    if (isCheckedType(rest)) {
      setCheckAble(true);
    }
  }, []);
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
  return (
    <div className={addClassByPrefix("")}>
      {nodes.map((node) => {
        return (
          <Node
            checkedKeys={checkedKeysValue}
            nodeData={node}
            checkAble={checkAble}
            key={node.key}
            onCheck={onCheck}
          />
        );
      })}
    </div>
  );
};

export default Tree;
