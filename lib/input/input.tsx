import React, { FC, InputHTMLAttributes } from "react";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import "./input.scss";
import classNames from "../common/utils/classNames";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const addClassByPrefix = makeClassByPrefix("zyj-ui-input");
const Input: FC<Props> = ({
  className,
  placeholder,
  type,
  onChange,
  ...props
}) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    {...props}
    className={classNames(className, addClassByPrefix(""))}
  />
);
export default Input;
