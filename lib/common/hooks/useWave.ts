import { MutableRefObject, useEffect, useRef, useState } from "react";
import { changeWaveBaseColorOnClick } from "../../button/_util";

const useWave: () => { waveColor: string; ref: MutableRefObject<any> } = () => {
  const ref = useRef(null),
    [waveColor, setWaveColor] = useState("");

  useEffect(() => {
    const btnElement = ref.current;
    if (btnElement) {
      changeWaveBaseColorOnClick(btnElement, setWaveColor);
    }
  }, []);
  return { waveColor, ref };
};

export default useWave;
