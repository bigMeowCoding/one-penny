import React from "react";
import { FC } from "react";
import { TreeNode } from "./types";
import Node from "./tree-node";
import { addLevel, flatTree } from "./process-tree-data";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";

interface Props {
  treeData: TreeNode[];
}

const addClassByPrefix = makeClassByPrefix("zyj-ui-tree");
const Tree: FC<Props> = ({ treeData }) => {
  treeData = flatTree(addLevel(treeData));
  return (
    <div className={addClassByPrefix("")}>
      {treeData.map((node) => {
        return <Node nodeData={node} key={node.key} />;
      })}
    </div>
  );
};

export default Tree;
