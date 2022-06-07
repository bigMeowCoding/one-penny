import { InternalToast, ToastProps } from './toast';
import { mergeProps } from '../utils/with-default-props';
import { resolveContainer } from '../utils/get-container';
import { createRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
const containers = [] as HTMLDivElement[];
function unmount(container: HTMLDivElement) {
  const unmountResult = ReactDOM.unmountComponentAtNode(container);
  if (unmountResult && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}
const defaultProps = {
  duration: 2000,
  position: 'center',
  maskClickable: true,
};
type ToastShowRef = ToastHandler;
export function show(p: ToastShowProps | string) {
  const props = mergeProps(defaultProps, typeof p === 'string' ? { content: p } : p);
  const { getContainer = () => document.body } = p as ToastShowProps;
  const container = document.createElement('div');
  const bodyContainer = resolveContainer(getContainer);
  bodyContainer.appendChild(container);
  clear();
  containers.push(container);
  let timer: NodeJS.Timer;
  const TemplateToast = forwardRef<ToastShowRef>((_, ref) => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      return () => {
        props.afterClose?.();
      };
    }, []);
    useEffect(() => {
      if (props.duration === 0) {
        return;
      }
      timer = setTimeout(() => {
        setVisible(false);
      }, props.duration);
      return () => {
        timer && clearTimeout(timer);
      };
    }, []);
    useImperativeHandle(ref, () => {
      return {
        close: () => {
          setVisible(false);
        },
      };
    });
    return (
      <InternalToast
        {...props}
        getContainer={() => container}
        visible={visible}
        afterClose={() => {
          unmount(container);
        }}
      />
    );
  });

  const ref = createRef<ToastShowRef>();
  ReactDOM.render(<TemplateToast ref={ref} />, container);
  return {
    close: () => {
      ref.current?.close();
    },
  } as ToastHandler;
}
export function clear() {
  while (true) {
    const container = containers.pop();
    if (!container) break;
    unmount(container);
  }
}
export function config() {}
export type ToastShowProps = Omit<ToastProps, 'visible'>;
export type ToastHandler = {
  close: () => void;
};
