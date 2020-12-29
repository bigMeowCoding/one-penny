import React, { useEffect, useState } from "react";
import { FC } from "react";
import { TreeNode } from "./types";
import Node from "./tree-node";
import { addLevel, flatTree } from "./process-tree-data";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";

interface Props {
  treeData: TreeNode[];
  checkAble?: boolean;
  checkedKeys?: string[];
  checkedKeysChange?: (keys: string[]) => void;
}

const addClassByPrefix = makeClassByPrefix("zyj-ui-tree");
const Tree: FC<Props> = ({
  treeData,
  checkAble,
  checkedKeys,
  checkedKeysChange,
}) => {
  const [nodes, setNodes] = useState<TreeNode[]>(treeData),
    [checkedKeysValue, setCheckedKeysValue] = useState<string[]>(
      checkedKeys || []
    );
  useEffect(() => {
    setNodes(flatTree(addLevel(treeData)));
  }, []);
  const onCheck: (key: string, checked: boolean) => void = (key, checked) => {
    let keys;
    if (checked) {
      keys = checkedKeysValue.concat(key);
    } else {
      keys = checkedKeysValue.filter((item) => item !== key);
    }
    setCheckedKeysValue(keys);
    if (checkedKeysChange) {
      checkedKeysChange(keys);
    }
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
