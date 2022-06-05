import React, { FC, SVGAttributes } from "react";
import "./importAllIcons";
import "./icon.scss";
import classNames from "../common/utils/classNames";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
interface Props extends SVGAttributes<SVGElement> {
  name: string;
}
const addClassByPrefix = makeClassByPrefix("zyj-ui-icon");

const Icon: FC<Props> = ({ name, className, ...rest }) => (
  <svg
    className={classNames(
      addClassByPrefix(""),
      className,
      name === "pending" ? addClassByPrefix("loading") : ""
    )}
    {...rest}
  >
    <use xlinkHref={`#${name}`} />
  </svg>
);
export default Icon;
