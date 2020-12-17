import React, { FC, useEffect, useRef, useState } from "react";
import "./button.scss";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import classNames from "../common/utils/classNames";
import Wave from "../common/component/wave/wave";
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
  const ref = useRef<HTMLButtonElement>(null),
    [waveColor, setWaveColor] = useState("");
  useEffect(() => {
    const btnElement = ref.current;
    if (btnElement) {
      btnElement.addEventListener(
        "click",
        () => {
          const node = ref.current;
          if (node) {
            const color =
              getComputedStyle(node).getPropertyValue("border-top-color") || // Firefox Compatible
              getComputedStyle(node).getPropertyValue("border-color") ||
              getComputedStyle(node).getPropertyValue("background-color");
            setWaveColor(color);
          }
        },
        false
      );
    }
  }, []);
  const buttonNode = (
    <button
      ref={ref}
      className={classNames(
        className,
        addClassNamePrefix(""),
        makeButtonTypeClassName(type)
      )}
      {...rest}
    >
      {children}
    </button>
  );
  return <Wave waveColor={waveColor}>{buttonNode}</Wave>;
};
export default Button;
