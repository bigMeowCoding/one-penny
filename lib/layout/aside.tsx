import React, { FC, HTMLAttributes } from "react";
interface Props extends HTMLAttributes<HTMLElement> {}

export const Aside: FC<Props> = function ({ className, ...rest }) {
  return <div>{rest.children}</div>;
};
