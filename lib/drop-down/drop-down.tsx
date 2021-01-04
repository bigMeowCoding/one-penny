import React, { ReactNode } from "react";
import { FC } from "react";
import "./drop-down.scss";
import HoverPanel from "../common/component/hover-panel/hover-panel";
interface Props {
  overlay: (() => ReactNode) | ReactNode;
}

const DropDown: FC<Props> = ({ children, overlay }) => {
  return (
    <>
      <HoverPanel overlay={overlay}>{children}</HoverPanel>
    </>
  );
};

export default DropDown;
