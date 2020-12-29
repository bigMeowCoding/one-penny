import React from "react";
import { FC } from "react";
import "./tree-checkbox.scss";
import makeClassByPrefix from "../../common/utils/makeClassByPrefix";
import classNames from "../../common/utils/classNames";
interface Props {
  id: string;
  checked: boolean;
  onCheck: (key: string, checked: boolean) => void;
}
const addClassByPrefix = makeClassByPrefix("zyj-ui-tree-checkbox");
const TreeCheckBox: FC<Props> = ({ id, checked, onCheck }) => {
  return (
    <span
      className={classNames(
        addClassByPrefix(""),
        checked ? addClassByPrefix("checked") : ""
      )}
      onClick={() => {
        onCheck(id, !checked);
      }}
    >
      <span className={addClassByPrefix("inner")} />
    </span>
  );
};

export default TreeCheckBox;
