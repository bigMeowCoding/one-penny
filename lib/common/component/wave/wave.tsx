import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import "./wave.scss";
import ReactDOM, { findDOMNode } from "react-dom";
import classNames from "../../utils/classNames";
import makeClassByPrefix from "../../utils/makeClassByPrefix";
interface Props {}
const addClassByPrefix = makeClassByPrefix("zyj-ui-wave");
const clickHandle: React.MouseEventHandler<HTMLDivElement> = (e) => {
  // Get wave color from target
  const node = e.target as HTMLDivElement;
  console.log(node);
  if (node) {
    const waveColor =
      getComputedStyle(node).getPropertyValue("border-top-color") || // Firefox Compatible
      getComputedStyle(node).getPropertyValue("border-color") ||
      getComputedStyle(node).getPropertyValue("background-color");
    console.log(waveColor);
  }
};
const Wave: FC<Props> = function ({ children }) {
  const ref = useRef(null);
  let waveTimer: any = null;
  // let childNodes = null;
  const [wave, setWave] = useState(false);
  useEffect(() => {
    return () => {
      if (waveTimer) {
        clearTimeout(waveTimer);
      }
    };
  }, []);
  return (
    <div
      ref={ref}
      className={classNames(
        wave ? "ant-click-animating-without-extra-node" : "",
        addClassByPrefix("box")
      )}
      onClick={() => {
        setWave(false);
        setTimeout(() => {
          setWave((wave) => !wave);
        });
      }}
    >
      {children}
    </div>
  );
};
export default Wave;
