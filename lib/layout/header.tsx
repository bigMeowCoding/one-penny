import React, { FC } from "react";
interface Props extends React.HTMLAttributes<HTMLElement> {}
export const Header: FC<Props> = function ({ className, ...rest }) {
  return <div>{rest.children}</div>;
};
