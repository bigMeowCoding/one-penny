import React, { FC, ReactNode } from 'react';
import { PropagationEvent } from '../utils/with-stop-propagation';
import { GetContainer } from '../utils/render-to-container';

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
export const InternalToast: FC<ToastProps> = props => {
  const { content } = props;
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
            icon ? `${classPrefix}-main-icon` : `${classPrefix}-main-text`
          )}
        >
          {iconElement && (
            <div className={`${classPrefix}-icon`}>{iconElement}</div>
          )}
          <AutoCenter>{content}</AutoCenter>
        </div>
      </div>
    </Mask>
  );
};
