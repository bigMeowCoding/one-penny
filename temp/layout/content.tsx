import React, { FC, HTMLAttributes } from 'react';
import './content.scss';
import makeClassByPrefix from '../common/utils/makeClassByPrefix';
import { LAYOUT_PREFIX } from './config';
import classNames from '../common/utils/classNames';
interface Props extends HTMLAttributes<HTMLElement> {}
export const Content: FC<Props> = function ({ className, ...rest }) {
  return (
    <div className={classNames(makeClassByPrefix(LAYOUT_PREFIX)('content'), className)}>
      {rest.children}
    </div>
  );
};
