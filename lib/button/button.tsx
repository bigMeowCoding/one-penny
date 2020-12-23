import React, { FC } from "react";
import "./button.scss";
import classNames from "../common/utils/classNames";
import Wave from "../common/component/wave/wave";
import { addButtonClassNamePrefix, makeButtonTypeClassName } from "./_util";
import { ButtonProps } from "./types";
import useWave from "../common/hooks/useWave";

const Button: FC<ButtonProps> = function ({
  children,
  className,
  type = "default",
  defaultType,
  ...rest
}) {
  const { waveColor, ref } = useWave();
  const buttonNode = (
    <button
      ref={ref}
      type={defaultType ? defaultType : "button"}
      className={classNames(
        className,
        addButtonClassNamePrefix(""),
        makeButtonTypeClassName(type)
      )}
      {...rest}
    >
      {children}
    </button>
  );

  return (
    <Wave waveColor={waveColor} isInline={true}>
      {buttonNode}
    </Wave>
  );
};
export default Button;
