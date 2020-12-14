import React, { FC, HTMLAttributes } from "react";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
interface Props extends HTMLAttributes<HTMLElement> {}
const addClassByPrefix = makeClassByPrefix("zyj-layout");

export const Footer: FC<Props> = function ({ className, ...rest }) {
  return <div>{rest.children}</div>;
};
