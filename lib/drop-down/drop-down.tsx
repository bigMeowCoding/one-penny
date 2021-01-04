import React, { ReactNode, useEffect, useRef, useState } from "react";
import { FC } from "react";
import ReactDOM from "react-dom";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import "./drop-down.scss";
interface Props {
  overlay: (() => ReactNode) | ReactNode;
}
type Position = { top: string; left: string };

const addClassByPrefix = makeClassByPrefix("zyj-ui-drop-down");

const DropDown: FC<Props> = ({ children, overlay }) => {
  const targetRef = useRef<HTMLDivElement>(null),
    positionRef = useRef<Position | null>(null),
    [layVisible, setLayVisible] = useState(false);
  useEffect(() => {
    if (!targetRef.current) {
      return;
    }
    const targetElement = targetRef.current;
    positionRef.current = {
      top:
        targetElement.getBoundingClientRect().top +
        targetElement.getBoundingClientRect().height +
        "px",
      left: targetRef.current.getBoundingClientRect().left + "px",
    };
  }, []);
  const panelContent = (position: Position | null) => {
    if (!position) {
      return;
    }
    return ReactDOM.createPortal(
      <div className={addClassByPrefix("layer-wrapper")}>
        <div
          className={addClassByPrefix("layer")}
          style={{ left: position.left, top: position.top }}
        >
          {typeof overlay === "function" ? overlay() : overlay}
        </div>
      </div>,
      document.body
    );
  };
  return (
    <>
      <div
        ref={targetRef}
        className={addClassByPrefix("")}
        onMouseOver={() => {
          setLayVisible(true);
        }}
        onMouseOut={() => {
          setLayVisible(false);
        }}
      >
        {children}
      </div>
      {layVisible ? panelContent(positionRef && positionRef.current) : null}
    </>
  );
};

export default DropDown;
