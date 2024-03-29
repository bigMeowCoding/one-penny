import React, { HTMLAttributes } from 'react';
import { FC } from 'react';
import './tree-checkbox.scss';
import makeClassByPrefix from '../../common/utils/makeClassByPrefix';
import classNames from '../../common/utils/classNames';
interface Props extends HTMLAttributes<HTMLSpanElement> {
  id: string;
  checked: boolean;
  indeterminate?: boolean;
  onCheck: (key: string, checked: boolean) => void;
}
const addClassByPrefix = makeClassByPrefix('zyj-ui-tree-checkbox');
const TreeCheckBox: FC<Props> = ({ id, checked, className, onCheck, indeterminate }) => {
  return (
    <span
      className={classNames(
        className,
        addClassByPrefix(''),
        indeterminate ? addClassByPrefix('indeterminate') : '',
        !indeterminate && checked ? addClassByPrefix('checked') : '',
      )}
      onClick={() => {
        onCheck(id, !checked);
      }}
    >
      <span className={addClassByPrefix('inner')} />
    </span>
  );
};

export default TreeCheckBox;
