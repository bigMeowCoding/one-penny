import React from "react";
import { FC } from "react";
import Tree from "./tree";
import { TreeNode } from "./types";

const Node: FC<TreeNode> = ({ title, key, childNodes }) => {
  return (
    <div key={key}>
      {title}

      {childNodes && childNodes.length > 0 ? (
        <Tree treeData={childNodes} />
      ) : null}
    </div>
  );
};

export default Node;
