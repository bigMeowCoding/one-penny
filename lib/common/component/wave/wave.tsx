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
interface Props {}
const addClassByPrefix = makeClassByPrefix("zyj-ui-wave");

const Wave: FC<Props> = function ({ children }) {
  const ref = useRef<HTMLDivElement>(null);
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
