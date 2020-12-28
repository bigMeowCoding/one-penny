import React, {
  FC,
  HTMLAttributes,
  MouseEventHandler,
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
  const [scrollBarHeight, setScrollBarHeight] = useState<number>(0),
    [scrollBarWidth, setScrollBarWidth] = useState<number>(0),
    ref = useRef<HTMLDivElement>(null),
    [scrollBarTop, setScrollBarTop] = useState<number>(),
    firstBarTopRef = useRef<number>(),
    mouseDownYRef = useRef<number>(),
    beginDragRef = useRef<boolean>(),
    dragDeltaRef = useRef<number>();

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

  const mouseDownHandle: MouseEventHandler = (e) => {
    beginDragRef.current = true;
    mouseDownYRef.current = e.clientY;
    firstBarTopRef.current = scrollBarTop;
  };

  function restrictScrollBarTopValue(value: number): number {
    if (!ref.current) {
      return 0;
    }
    if (value < 0) {
      value = 0;
    }
    const clientHeight = ref.current.getBoundingClientRect().height;
    if (value + scrollBarHeight > clientHeight) {
      value = clientHeight - scrollBarHeight;
    }
    return value;
  }

  const mouseMoveHandle: MouseEventHandler = (e) => {
    if (beginDragRef.current) {
      const beginBarTop = mouseDownYRef.current || 0;
      dragDeltaRef.current = e.clientY - beginBarTop;
      setScrollBarTop(
        restrictScrollBarTopValue(
          (firstBarTopRef.current || 0) + (dragDeltaRef.current || 0)
        )
      );
    }
  };

  const mouseUpHandle: MouseEventHandler = () => {
    beginDragRef.current = false;
  };

  return (
    <div
      className={addClassByPrefix("wrapper")}
      onMouseUp={mouseUpHandle}
      onMouseMove={mouseMoveHandle}
      {...rest}
    >
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
          onMouseDown={mouseDownHandle}
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
