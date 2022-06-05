import React, { FC, HTMLAttributes } from "react";
import classNames from "../common/utils/classNames";
interface Props extends HTMLAttributes<HTMLElement> {}

export const Footer: FC<Props> = function ({ className, ...rest }) {
  return <div className={classNames(className)}>{rest.children}</div>;
};
