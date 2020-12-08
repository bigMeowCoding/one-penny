import React, { FC, MouseEventHandler, SVGAttributes } from "react";
import "./importAllIcons";
import "./icon.scss";
interface Props extends SVGAttributes<SVGElement> {
  name: string;
}

const Icon: FC<Props> = function ({ name, ...props }) {
  console.log(props);
  return (
    <svg className="zyj-ui-icon" {...props}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};
export default Icon;
