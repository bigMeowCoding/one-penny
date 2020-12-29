import React from "react";
import { FC } from "react";
import Tree from "./tree";
import { TreeNode } from "./types";

const TreeExample: FC = () => {
  const data1: TreeNode[] = [
    {
      title: "0-0",
      key: "0-0",
      childNodes: [
        {
          title: "0-0-0",
          key: "0-0-0",
          childNodes: [
            { title: "0-0-0-0", key: "0-0-0-0" },
            { title: "0-0-0-1", key: "0-0-0-1" },
            { title: "0-0-0-2", key: "0-0-0-2" },
          ],
        },
        {
          title: "0-0-1",
          key: "0-0-1",
          childNodes: [
            { title: "0-0-1-0", key: "0-0-1-0" },
            { title: "0-0-1-1", key: "0-0-1-1" },
            { title: "0-0-1-2", key: "0-0-1-2" },
          ],
        },
        {
          title: "0-0-2",
          key: "0-0-2",
        },
      ],
    },
    {
      title: "0-1",
      key: "0-1",
      childNodes: [
        { title: "0-1-0-0", key: "0-1-0-0" },
        { title: "0-1-0-1", key: "0-1-0-1" },
        { title: "0-1-0-2", key: "0-1-0-2" },
      ],
    },
    {
      title: "0-2",
      key: "0-2",
    },
  ];
  return (
    <article>
      <section>
        <h2>example1</h2>
        <div>
          <Tree treeData={data1} />
        </div>
      </section>
    </article>
  );
};

export default TreeExample;
