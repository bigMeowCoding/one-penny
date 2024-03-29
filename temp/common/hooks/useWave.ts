import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { changeWaveBaseColorOnClick } from '../../button/_util';

const useWave: () => [string, MutableRefObject<any>] = () => {
  const ref = useRef<HTMLElement>(null),
    [waveColor, setWaveColor] = useState('');

  useEffect(() => {
    const btnElement = ref.current;
    if (btnElement) {
      changeWaveBaseColorOnClick(btnElement, setWaveColor);
    }
  }, [ref, setWaveColor]);

  return [waveColor, ref];
};

export default useWave;
