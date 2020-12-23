import React, { FC, useEffect, useRef, useState } from "react";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import "./input.scss";
import Wave from "../common/component/wave/wave";
import { changeWaveBaseColorOnClick } from "../button/_util";
interface Props {
  placeholder?: string;
}

const addClassByPrefix = makeClassByPrefix("zyj-ui-input");
const Input: FC<Props> = function ({ placeholder }) {
  const [waveColor, setWaveColor] = useState(""),
    ref = useRef(null);

  useEffect(() => {
    const btnElement = ref.current;
    if (btnElement) {
      changeWaveBaseColorOnClick(btnElement, setWaveColor);
    }
  }, []);
  return (
    <Wave waveColor={waveColor}>
      <input
        ref={ref}
        placeholder={placeholder}
        className={addClassByPrefix("")}
      />
    </Wave>
  );
};
export default Input;
