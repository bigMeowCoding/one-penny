import React, { FC, HTMLAttributes } from "react";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import "./scroll.scss";
import scrollbarWidth from "../common/utils/scroll-bar-width";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const addClassByPrefix = makeClassByPrefix("zyj-ui-scroll");

const Scroll: FC<Props> = function ({ className, children, ...rest }) {
  return (
    <div className={addClassByPrefix("wrapper")} {...rest}>
      <div
        className={addClassByPrefix("inner")}
        style={{ right: -1 * scrollbarWidth() }}
      >
        {children}
      </div>
    </div>
  );
};
export default Scroll;
