import React, {
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FC } from "react";
import ReactDOM from "react-dom";
import makeClassByPrefix from "../../utils/makeClassByPrefix";
import "./hover-panel.scss";
import { HoverPanelContext } from "../../config/context";
interface Props extends HTMLAttributes<HTMLElement> {
  overlay: (() => ReactNode) | ReactNode;
}
type Position = { top: string; left: string };
const addClassByPrefix = makeClassByPrefix("zyj-ui-hover-panel");
interface PanelContentProp extends HTMLAttributes<HTMLElement> {
  position: Position | null;
  overlay: ReactNode;
}
const PanelContent: FC<PanelContentProp> = ({
  position,
  overlay,
  ...props
}) => {
  if (!position) {
    return null;
  }
  const positionStyle = { left: position.left, top: position.top };
  const styleProp = props.style
    ? { ...props.style, ...positionStyle }
    : positionStyle;
  const context = useContext(HoverPanelContext);
  return ReactDOM.createPortal(
    <div className={addClassByPrefix("layer-wrapper")}>
      <div
        className={addClassByPrefix("layer")}
        onMouseLeave={() => {
          context.closePanel();
        }}
        style={styleProp}
      >
        {typeof overlay === "function" ? overlay() : overlay}
      </div>
    </div>,
    document.body
  );
};
const HoverPanel: FC<Props> = ({ children, overlay, ...props }) => {
  const [layVisible, setLayVisible] = useState(false),
    targetRef = useRef<HTMLDivElement>(null),
    positionRef = useRef<Position | null>(null);

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

  return (
    <HoverPanelContext.Provider
      value={{
        closePanel() {
          setLayVisible(false);
        },
      }}
    >
      <div
        ref={targetRef}
        className={addClassByPrefix("")}
        onMouseOver={() => {
          setLayVisible(true);
        }}
        {...props}
      >
        {children}
      </div>
      {layVisible ? (
        <PanelContent
          overlay={overlay}
          {...props}
          position={positionRef.current}
        />
      ) : null}
    </HoverPanelContext.Provider>
  );
};

export default HoverPanel;
