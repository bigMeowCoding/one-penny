import React, { FC, HTMLAttributes } from "react";
import "./content.scss";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import { LAYOUT_PREFIX } from "./config";
interface Props extends HTMLAttributes<HTMLElement> {}
export const Content: FC<Props> = function ({ className, ...rest }) {
  return (
    <div className={makeClassByPrefix(LAYOUT_PREFIX)("content")}>
      {rest.children}
    </div>
  );
};
