import React, { FC} from "react";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import "./input.scss";
import Wave from "../common/component/wave/wave";
import useWave from "../common/hooks/useWave";
interface Props {
  placeholder?: string;
}

const addClassByPrefix = makeClassByPrefix("zyj-ui-input");
const Input: FC<Props> = function ({ placeholder }) {
  const { waveColor, ref } = useWave();

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
