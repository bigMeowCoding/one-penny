import React, { FC } from "react";
import "./button.scss";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import classNames from "../common/utils/classNames";
export type ButtonType = "primary" | "default";
interface Props
  extends Omit<React.ButtonHTMLAttributes<any>, "type" | "onClick"> {
  type: ButtonType;
  onClick?: React.MouseEventHandler<HTMLElement>;
}
const addClassNamePrefix = makeClassByPrefix("zyj-ui-button");
function makeButtonTypeClassName(type: ButtonType): string {
  if (!type || type === "default") {
    return "";
  }
  return addClassNamePrefix(type);
}
const Button: FC<Props> = function ({ children, className, type, ...rest }) {
  return (
    <button
      className={classNames(
        className,
        addClassNamePrefix(),
        makeButtonTypeClassName(type)
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
