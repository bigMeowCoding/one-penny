import React, { FC } from 'react';
import classNames from '../common/utils/classNames';
interface Props extends React.HTMLAttributes<HTMLElement> {}
export const Header: FC<Props> = function ({ className, ...rest }) {
  return <div className={classNames(className)}>{rest.children}</div>;
};
