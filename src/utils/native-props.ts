import { CSSProperties, ReactElement } from 'react';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import React from 'react';
export interface NativeProps {
  className: string;
  tabIndex?: number;
  style?: CSSProperties;
}
export function withNativeProps<P extends NativeProps>(p: P, el: ReactElement) {
  const props = { ...el.props };
  if (p.style) {
    props.style = {
      ...props.style,
      ...p.style,
    };
  }
  props.className = classNames(props.className, p.className);
  if (!isUndefined(p.tabIndex)) {
    props.tabIndex = p.tabIndex;
  }
  for (const key in p) {
    if (!p.hasOwnProperty(key)) {
      continue;
    }
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      props[key] = p[key];
    }
  }
  return React.cloneElement(el, props);
}
