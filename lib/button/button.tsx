import React, { FC, useEffect, useRef, useState } from "react";
import "./button.scss";
import classNames from "../common/utils/classNames";
import Wave from "../common/component/wave/wave";
import {
  addButtonClassNamePrefix,
  changeWaveBaseColorOnClick,
  makeButtonTypeClassName,
} from "./_util";
import { ButtonProps } from "./types";

const Button: FC<ButtonProps> = function ({
  children,
  className,
  type,
  ...rest
}) {
  const ref = useRef<HTMLButtonElement>(null),
    [waveColor, setWaveColor] = useState("");

  useEffect(() => {
    const btnElement = ref.current;
    if (btnElement) {
      changeWaveBaseColorOnClick(btnElement, setWaveColor);
    }
  }, []);

  const buttonNode = (
    <button
      ref={ref}
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
  return <Wave waveColor={waveColor}>{buttonNode}</Wave>;
};
export default Button;
