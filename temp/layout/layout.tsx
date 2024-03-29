import React, { FC, ReactElement } from 'react';
import makeClassByPrefix from '../common/utils/makeClassByPrefix';
import classNames from '../common/utils/classNames';
import './layout.scss';
import { LAYOUT_PREFIX } from './config';
import { Aside } from './aside';
interface Props extends React.HTMLAttributes<HTMLElement> {
  children: ReactElement | ReactElement[];
}

const addClassByPrefix = makeClassByPrefix(LAYOUT_PREFIX);

export const Layout: FC<Props> = ({ className, ...rest }) => {
  const children = rest.children as ReactElement[];
  const hasAside =
    children.length &&
    children.some((item) => {
      return item.type === Aside;
    });
  return (
    <div
      className={classNames(className, addClassByPrefix(''), hasAside ? 'has-aside' : null)}
      {...rest}
    >
      {children}
    </div>
  );
};
