import React, {
  FC,
  HTMLAttributes,
  UIEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import "./scroll.scss";
import scrollbarWidth from "../common/utils/scroll-bar-width";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const addClassByPrefix = makeClassByPrefix("zyj-ui-scroll");

const Scroll: FC<Props> = ({ className, children, ...rest }) => {
  const [scrollBarHeight, setScrollBarHeight] = useState<number>(),
    [scrollBarWidth, setScrollBarWidth] = useState<number>(),
    ref = useRef<HTMLDivElement>(null),
    [scrollBarTop, setScrollBarTop] = useState<number>();
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const scrollHeight = ref.current.scrollHeight,
      clientHeight = ref.current.getBoundingClientRect().height;
    setScrollBarHeight((clientHeight * clientHeight) / scrollHeight);
    setScrollBarWidth(scrollbarWidth());
  }, []);
  const onScroll: UIEventHandler = () => {
    if (!ref.current) {
      return;
    }
    const scrollHeight = ref.current.scrollHeight,
      scrollTop = ref.current.scrollTop,
      clientHeight = ref.current.getBoundingClientRect().height;
    setScrollBarHeight((clientHeight * clientHeight) / scrollHeight);
    setScrollBarTop((scrollTop * clientHeight) / scrollHeight);
  };
  return (
    <div className={addClassByPrefix("wrapper")} {...rest}>
      <div
        ref={ref}
        onScroll={onScroll}
        className={addClassByPrefix("inner")}
        style={{ right: -1 * (scrollBarWidth || 0) }}
      >
        {children}
      </div>
      <div className={addClassByPrefix("bar-wrapper")}>
        <div
          className={addClassByPrefix("bar")}
          style={{
            height: scrollBarHeight,
            transform: `translateY(${scrollBarTop}px)`,
          }}
        />
      </div>
    </div>
  );
};
export default Scroll;
