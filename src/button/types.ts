import React from "react";

export type ButtonType = "primary" | "default";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<any>, "type" | "onClick"> {
  type?: ButtonType;
  defaultType?: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLElement>;
  loading?: boolean;
}
