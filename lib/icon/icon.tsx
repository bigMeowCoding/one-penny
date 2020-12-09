import React, { FC, MouseEventHandler, SVGAttributes } from "react";
import "./importAllIcons";
import "./icon.scss";
import classNames from "../common/utils/classNames";
interface Props extends SVGAttributes<SVGElement> {
  name: string;
}


const Icon: FC<Props> = function ({ name, className, ...rest }) {
  return (
    <svg className={classNames("zyj-ui-icon", className)} {...rest}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};
export default Icon;
