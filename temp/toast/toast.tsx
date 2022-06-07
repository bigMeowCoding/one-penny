import React, { FC, ReactNode, useMemo } from 'react';
import { PropagationEvent } from '../utils/with-stop-propagation';
import { GetContainer } from '../utils/render-to-container';
import Mask from '../mask';
import classNames from 'classnames';
import AutoCenter from '../auto-center';
import { CheckOutline, CloseOutline } from 'antd-mobile-icons';
import SpinLoading from '../spin-loading';

export interface ToastProps {
  afterClose?: () => void;
  maskStyle?: React.CSSProperties;
  maskClassName?: string;
  maskClickable?: boolean;
  content?: ReactNode;
  icon?: 'success' | 'fail' | 'loading' | React.ReactNode;
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
  visible?: boolean;
  getContainer?: GetContainer;
  stopPropagation?: PropagationEvent[];
}
const classPrefix = `adm-toast`;

export const InternalToast: FC<ToastProps> = (props) => {
  const { maskClickable, content, icon, position } = props;
  const iconElement = useMemo(() => {
    if (icon === null || icon === undefined) return null;
    switch (icon) {
      case 'success':
        return <CheckOutline />;
      case 'fail':
        return <CloseOutline />;
      case 'loading':
        return <SpinLoading color="white" className={`${classPrefix}-loading`} />;
      default:
        return icon;
    }
  }, [icon]);
  const top = useMemo(() => {
    switch (position) {
      case 'top':
        return '20%';
      case 'bottom':
        return '80%';
      default:
        return '50%';
    }
  }, [position]);
  return (
    <Mask
      visible={props.visible}
      destroyOnClose
      opacity={0}
      disableBodyScroll={!maskClickable}
      getContainer={props.getContainer}
      afterClose={props.afterClose}
      style={{
        pointerEvents: maskClickable ? 'none' : 'auto',
        ...props.maskStyle,
      }}
      className={classNames(`${classPrefix}-mask`, props.maskClassName)}
      stopPropagation={props.stopPropagation}
    >
      <div className={classNames(`${classPrefix}-wrap`)}>
        <div
          style={{ top }}
          className={classNames(
            `${classPrefix}-main`,
            icon ? `${classPrefix}-main-icon` : `${classPrefix}-main-text`,
          )}
        >
          {iconElement && <div className={`${classPrefix}-icon`}>{iconElement}</div>}
          <AutoCenter>{content}</AutoCenter>
        </div>
      </div>
    </Mask>
  );
};
