import React, { FC, useEffect, useRef } from "react";
import "./wave.scss";
import { Event } from "css-animation";
import classNames from "../../utils/classNames";
import makeClassByPrefix from "../../utils/makeClassByPrefix";
import {
  getAttributeName,
  onTransitionEnd,
  onTransitionStart,
  resetEffect,
} from "./_util";
interface Props {
  waveColor: string;
}
const addClassByPrefix = makeClassByPrefix("zyj-ui-wave");

const Wave: FC<Props> = function ({ children, waveColor }) {
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
  useEffect(() => {
    const styleElement = styleRef.current
    if(styleElement && waveColor) {
      styleElement.innerHTML = `
      [ant-click-animating-without-extra-node='true']::after {
        --antd-wave-shadow-color: ${waveColor};
      }`;
      if (!document.body.contains(styleElement)) {
        document.body.append(styleElement);
      }
    }

  }, [waveColor]);
  return (
    <div
      ref={ref}
      className={classNames(addClassByPrefix("box"))}
      onClick={() => {
        if (ref.current) {
          resetEffect(ref.current);
        }
        clickWaveTimerId = window.setTimeout(() => {
          const attribute = getAttributeName();
          const node = ref.current;
          if (node) {
            node.setAttribute(attribute, "true");
            Event.addStartEventListener(node, (e: any) => {
              if (ref.current) {
                onTransitionStart(e, ref.current);
              }
            });
            Event.addEndEventListener(node, onTransitionEnd);
          }
        }, 0);
      }}
    >
      {children}
    </div>
  );
};
export default Wave;
