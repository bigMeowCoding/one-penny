import React from "react";
import { FC } from "react";
import Tree from "./tree";
import { TreeNodeProp } from "./types";

const TreeExample: FC = () => {
  const data1: TreeNodeProp[] = [
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
        <h2>普通</h2>
        <div>
          <Tree treeData={data1} />
        </div>
      </section>
      <section>
        <h2>单选</h2>
        <div>
          <Tree
            checkAble={true}
            checkedKeys={["0-0-1"]}
            treeData={data1}
            checkedKeysChange={(keys) => {
              console.log(keys);
            }}
          />
        </div>
      </section>
      <section>
        <h2>多选</h2>
        <div>
          <Tree
            checkAble={true}
            checkedKeys={["0-0-0"]}
            treeData={data1}
            multiply={true}
            checkedKeysChange={(keys) => {
              console.log(keys);
            }}
          />
        </div>
        <h2>多选(严格模式)</h2>
        <div>
          <Tree
            checkAble={true}
            checkedKeys={["0-0-0"]}
            treeData={data1}
            multiply={true}
            checkStrictly={true}
            checkedKeysChange={(keys) => {
              console.log(keys);
            }}
          />
        </div>
      </section>
    </article>
  );
};

export default TreeExample;
