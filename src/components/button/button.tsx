import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { mergeProps } from 'one-penny/es/utils/with-default-props';
import { NativeProps, withNativeProps } from 'one-penny/es/utils/native-props';
export interface ButtonRef {
  nativeElement: HTMLButtonElement | null;
}
type NativeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export type ButtonProps = {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  fill?: 'solid' | 'outline' | 'none';
  size?: 'mini' | 'small' | 'middle' | 'large';
  block?: boolean;
  loading?: boolean | 'auto';
  loadingText?: string;
  loadingIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void | Promise<void> | unknown;
  type?: 'submit' | 'reset' | 'button';
  shape?: 'default' | 'rounded' | 'rectangular';
  children?: React.ReactNode;
} & Pick<NativeButtonProps, 'onMouseDown' | 'onMouseUp' | 'onTouchStart' | 'onTouchEnd'> &
  NativeProps<
    | '--text-color'
    | '--background-color'
    | '--border-radius'
    | '--border-width'
    | '--border-style'
    | '--border-color'
  >;
const defaultProps = {};
const Button = forwardRef<ButtonRef, ButtonProps>((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useImperativeHandle(ref, () => {
    return {
      get nativeElement() {
        return buttonRef.current;
      },
    };
  });
  return withNativeProps(props, <button ref={buttonRef}>{props.children}</button>);
});
export default Button;
