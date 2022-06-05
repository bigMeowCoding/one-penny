import React, {
  FC,
  HTMLAttributes,
  MouseEventHandler,
  TouchEventHandler,
  UIEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import "./scroll.scss";
import scrollbarWidth from "../common/utils/scroll-bar-width";
import Icon from "../icon/icon";
import classNames from "../common/utils/classNames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  onPull?: () => Promise<boolean>;
}
const addClassByPrefix = makeClassByPrefix("zyj-ui-scroll");

const Scroll: FC<Props> = ({ className, children, onPull, ...rest }) => {
  const [scrollBarHeight, setScrollBarHeight] = useState<number>(0),
    [scrollBarWidth, setScrollBarWidth] = useState<number>(0),
    ref = useRef<HTMLDivElement>(null),
    [scrollBarVisible, setScrollBarVisible] = useState<boolean>(false),
    [scrollBarTop, setScrollBarTop] = useState<number>(),
    [transLateY, setTranslateY] = useState<number>(0),
    [pulling, setPulling] = useState<boolean>(false),
    firstBarTopRef = useRef<number>(),
    mouseDownYRef = useRef<number>(),
    beginDragRef = useRef<boolean>(),
    dragDeltaRef = useRef<number>(),
    timerRef = useRef<number>(),
    lastTouchYRef = useRef<number>(),
    pullingRef = useRef<boolean>(),
    moveCountRef = useRef<number>();

  function selectStart(e: Event) {
    if (mouseDownYRef.current) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const scrollHeight = ref.current.scrollHeight,
      clientHeight = ref.current.getBoundingClientRect().height;
    setScrollBarHeight((clientHeight * clientHeight) / scrollHeight);
    setScrollBarWidth(scrollbarWidth());
    document.addEventListener("mouseup", mouseUpHandle, false);
    document.addEventListener("mousemove", mouseMoveHandle, false);
    document.addEventListener("selectstart", selectStart, false);
    return () => {
      document.removeEventListener("mouseup", mouseUpHandle, false);
      document.removeEventListener("mousemove", mouseMoveHandle, false);
      document.removeEventListener("selectstart", selectStart, false);
    };
  }, []);

  const onScroll: UIEventHandler = () => {
    if (!ref.current) {
      return;
    }
    setScrollBarVisible(true);
    const scrollHeight = ref.current.scrollHeight,
      scrollTop = ref.current.scrollTop,
      clientHeight = ref.current.getBoundingClientRect().height;
    setScrollBarHeight((clientHeight * clientHeight) / scrollHeight);
    setScrollBarTop((scrollTop * clientHeight) / scrollHeight);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setScrollBarVisible(false);
    }, 300);
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

  const mouseMoveHandle = (e: MouseEvent) => {
    if (!beginDragRef.current || !ref.current) {
      return;
    }
    const beginBarTop = mouseDownYRef.current || 0;
    dragDeltaRef.current = e.clientY - beginBarTop;
    const scrollBarTopValue = restrictScrollBarTopValue(
      (firstBarTopRef.current || 0) + (dragDeltaRef.current || 0)
    );
    setScrollBarTop(scrollBarTopValue);
    const scrollHeight = ref.current.scrollHeight,
      viewHeight = ref.current.getBoundingClientRect().height;
    ref.current.scrollTop = (scrollBarTopValue * scrollHeight) / viewHeight;
  };

  const mouseUpHandle = () => {
    beginDragRef.current = false;
  };

  const touchStartHandle: TouchEventHandler = (e) => {
    const scrollTop = ref.current?.scrollTop;
    if (scrollTop) {
      return;
    }
    lastTouchYRef.current = e.touches[0].clientY;
    pullingRef.current = true;
    moveCountRef.current = 0;
  };

  const touchMoveHandle: TouchEventHandler = (e) => {
    if (moveCountRef.current == null) {
      return;
    }
    moveCountRef.current += 1;
    const deltaY = e.touches[0].clientY - (lastTouchYRef.current || 0);
    if (moveCountRef.current === 1 && deltaY < 0) {
      pullingRef.current = false;
    }
    if (!pullingRef.current) {
      return;
    }
    setTranslateY(deltaY);
  };

  function clearPullingStatus() {
    setTranslateY(0);
    setPulling(false);
    pullingRef.current = false;
  }

  const touchEndHandle: TouchEventHandler = () => {
    setPulling(true);
    if (onPull) {
      onPull().then(
        () => {
          clearPullingStatus();
        },
        () => {
          clearPullingStatus();
        }
      );
    } else {
      clearPullingStatus();
    }
  };

  return (
    <div className={addClassByPrefix("wrapper")} {...rest}>
      <div
        ref={ref}
        onScroll={onScroll}
        className={addClassByPrefix("inner")}
        style={{
          right: -1 * (scrollBarWidth || 0),
          transform: `translateY(${transLateY}px)`,
        }}
        onTouchStart={touchStartHandle}
        onTouchMove={touchMoveHandle}
        onTouchEnd={touchEndHandle}
      >
        {children}
      </div>
      <div
        className={addClassByPrefix("pulling")}
        style={{ height: transLateY }}
      >
        <Icon
          name="refresh"
          className={classNames(
            pulling ? addClassByPrefix("loading-icon") : ""
          )}
        />
      </div>
      {scrollBarVisible ? (
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
      ) : null}
    </div>
  );
};
export default Scroll;
