import React from "react";
import { FC } from "react";
import { TreeNode } from "./types";
import "./node.scss";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";

const addClassByPrefix = makeClassByPrefix("zyj-ui-node");
interface Props {
  nodeData: TreeNode;
}
const Node: FC<Props> = ({ nodeData }) => {
  return (
    <div className={addClassByPrefix("")}>
      <span
        className={addClassByPrefix("indent")}
        style={{ width: `${((nodeData.level || 0) - 1) * 8}px` }}
      />
      {nodeData.title}
    </div>
  );
};

export default Node;
