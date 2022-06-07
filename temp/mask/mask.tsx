import React, { useMemo, useRef, useState } from 'react';
import { FC } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { GetContainer, renderToContainer } from '../utils/render-to-container';
import { PropagationEvent, withStopPropagation } from '../utils/with-stop-propagation';
import { NativeProps, withNativeProps } from '../utils/native-props';
import { useShouldRender } from '../utils/should-render';
import { mergeProps } from '../utils/with-default-props';
import { useUnmountedRef } from 'ahooks';
import { useLockScroll } from '../utils/use-lock-scroll';
type opacityType = 'default' | 'thin' | 'thick';
export type MaskProps = {
  visible?: boolean;
  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  destroyOnClose?: boolean;
  forceRender?: boolean;
  disableBodyScroll?: boolean;
  color?: 'black' | 'white';
  opacity?: opacityType | number;
  getContainer?: GetContainer;
  afterShow?: () => void;
  afterClose?: () => void;
  stopPropagation?: PropagationEvent[];
} & NativeProps<'--z-index'>;
const classPrefix = `adm-mask`;
const opacityRecord = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75,
};
const defaultProps = {
  visible: true,
  destroyOnClose: false,
  forceRender: false,
  color: 'black',
  opacity: 'default',
  disableBodyScroll: true,
  getContainer: null,
  stopPropagation: ['click'],
};
const Mask: FC<MaskProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const [active, setActive] = useState(!!props.visible);
  const ref = useRef<HTMLDivElement>(null);
  useLockScroll(ref, !!(props.visible && props.disableBodyScroll));

  const background = useMemo(() => {
    const propOpacity = (props.opacity ?? 'default') as opacityType;
    const opacity = opacityRecord[propOpacity] ?? props.opacity;
    const rgb = props.color === 'white' ? '255, 255, 255' : '0, 0, 0';
    return `rgba(${rgb}, ${opacity})`;
  }, [props.color, props.opacity]);
  const unmountedRef = useUnmountedRef();

  const { opacity } = useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 30,
      clamp: true,
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      if (unmountedRef.current) return;
      setActive(!!props.visible);
      if (props.visible) {
        props.afterShow?.();
      } else {
        props.afterClose?.();
      }
    },
  });
  const shouldRender = useShouldRender(active, props.forceRender, props.destroyOnClose);
  const node = withStopPropagation(
    props.stopPropagation || [],
    withNativeProps(
      props,
      <animated.div
        ref={ref}
        className={classPrefix}
        style={{
          background,
          opacity,
          ...props.style,
          display: active ? 'unset' : 'none',
        }}
      >
        {props.onMaskClick && (
          <div className={`${classPrefix}-aria-button`} role="button" onClick={props.onMaskClick} />
        )}
        <div className={`${classPrefix}-content`}>{shouldRender && props.children}</div>
      </animated.div>,
    ),
  );

  return renderToContainer(props.getContainer || null, node);
};

export default Mask;
