import React, { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import "./scroll.scss";
import scrollbarWidth from "../common/utils/scroll-bar-width";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const addClassByPrefix = makeClassByPrefix("zyj-ui-scroll");

const Scroll: FC<Props> = function ({ className, children, ...rest }) {
  const [scrollBarHeight, setScrollBarHeight] = useState<number>();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const scrollHeight = ref.current.scrollHeight,
      clientHeight = ref.current.getBoundingClientRect().height;
    setScrollBarHeight((clientHeight * clientHeight) / scrollHeight);
  }, []);
  return (
    <div className={addClassByPrefix("wrapper")} {...rest}>
      <div
        ref={ref}
        className={addClassByPrefix("inner")}
        style={{ right: -1 * scrollbarWidth() }}
      >
        {children}
      </div>
      <div className={addClassByPrefix("bar-wrapper")}>
        <div
          className={addClassByPrefix("bar")}
          style={{ height: scrollBarHeight }}
        />
      </div>
    </div>
  );
};
export default Scroll;
