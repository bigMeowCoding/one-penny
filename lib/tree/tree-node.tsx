import React from "react";
import { FC } from "react";
import { TreeNode } from "./types";
import "./node.scss";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import TreeCheckBox from "./tree-checkbox/tree-checkbox";

const addClassByPrefix = makeClassByPrefix("zyj-ui-node");
interface Props {
  nodeData: TreeNode;
  checkAble?: boolean;
  checkedKeys?: string[];
  onCheck: (key: string, checked: boolean) => void;
}
const Node: FC<Props> = ({ nodeData, checkedKeys, checkAble, onCheck }) => {
  return (
    <div className={addClassByPrefix("")}>
      <span
        className={addClassByPrefix("indent")}
        style={{ width: `${((nodeData.level || 0) - 1) * 8}px` }}
      />
      {checkAble ? (
        <TreeCheckBox
          id={nodeData.key}
          checked={
            checkAble && Array.isArray(checkedKeys)
              ? checkedKeys.includes(nodeData.key)
              : false
          }
          onCheck={onCheck}
        />
      ) : null}
      <span>{nodeData.title}</span>
    </div>
  );
};

export default Node;
