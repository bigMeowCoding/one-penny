import React, { Fragment } from "react";
import { FC } from "react";
import { TreeNode } from "./types";
import Node from "./tree-node";

interface Props {
  treeData: TreeNode[];
}

const Tree: FC<Props> = ({ treeData }) => {
  return (
    <Fragment>
      {treeData.map((node) => {
        return <Node {...node} />;
      })}
    </Fragment>
  );
};

export default Tree;
