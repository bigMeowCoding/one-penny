import React, { FC, useEffect, useRef } from "react";
import "./wave.scss";
import classNames from "../../utils/classNames";
import makeClassByPrefix from "../../utils/makeClassByPrefix";
import { waveClickHandle } from "./_util";

interface Props {
  waveColor: string;
  isInline?: boolean;
}

const addClassByPrefix = makeClassByPrefix("zyj-ui-wave");

const Wave: FC<Props> = function ({ children, isInline, waveColor }) {
  const ref = useRef<HTMLDivElement>(null),
    styleRef = useRef<HTMLStyleElement>(document.createElement("style"));
  let clickWaveTimerId = -1;

  useEffect(() => {
    return () => {
      if (clickWaveTimerId) {
        clearTimeout(clickWaveTimerId);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={
        isInline
          ? classNames(addClassByPrefix("inline-box"))
          : classNames(addClassByPrefix("box"))
      }
      onClick={() => {
        if (!ref.current) {
          return;
        }
        clickWaveTimerId = waveClickHandle(
          ref.current,
          styleRef.current,
          waveColor
        );
      }}
    >
      {children}
    </div>
  );
};
export default Wave;
