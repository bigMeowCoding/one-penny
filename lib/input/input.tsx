import React, { FC, InputHTMLAttributes } from "react";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import "./input.scss";
import Wave from "../common/component/wave/wave";
import useWave from "../common/hooks/useWave";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const addClassByPrefix = makeClassByPrefix("zyj-ui-input");
const Input: FC<Props> = function ({ placeholder, type, onChange }) {
  const { waveColor, ref } = useWave();

  return (
    <Wave waveColor={waveColor}>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={addClassByPrefix("")}
      />
    </Wave>
  );
};
export default Input;
