import React from "react";
import { FC } from "react";
import { LeafNode, TreeNode } from "./types";
import "./node.scss";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import TreeCheckBox from "./tree-checkbox/tree-checkbox";
import classNames from "../common/utils/classNames";
import Icon from "../icon/icon";

const addClassByPrefix = makeClassByPrefix("zyj-ui-node");
interface Props {
  nodeData: TreeNode;
  checkAble?: boolean;
  checkedKeys?: string[];
  onCheck: (key: string, checked: boolean) => void;
  onExpand?: (key: string) => void;
  onCollapse?: (key: string) => void;
}
const Node: FC<Props> = ({
  nodeData,
  checkedKeys,
  checkAble,
  onCheck,
  onExpand,
  onCollapse,
}) => {
  const checked =
    checkAble && Array.isArray(checkedKeys)
      ? checkedKeys.includes(nodeData.key)
      : false;
  return (
    <div className={addClassByPrefix("")}>
      <span
        className={addClassByPrefix("indent")}
        style={{ width: `${((nodeData.level || 0) - 1) * 8}px` }}
      />

      <span
        className={addClassByPrefix("switch")}
        onClick={() => {
          if (nodeData.expanded) {
            if (onCollapse) {
              onCollapse(nodeData.key);
            }
          } else {
            if (onExpand) {
              onExpand(nodeData.key);
            }
          }
        }}
      >
        {!(nodeData as LeafNode).isLeaf ? (
          <Icon name={nodeData.expanded ? "down" : "right"} />
        ) : null}
      </span>

      {checkAble ? (
        <TreeCheckBox
          id={nodeData.key}
          className={addClassByPrefix("checkbox")}
          checked={checked}
          onCheck={onCheck}
        />
      ) : null}
      <span
        className={classNames(
          addClassByPrefix("title"),
          checked ? addClassByPrefix("title-selected") : ""
        )}
        onClick={() => {
          onCheck(nodeData.key, !checked);
        }}
      >
        {nodeData.title}
      </span>
    </div>
  );
};

export default Node;
