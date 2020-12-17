import React from "react";

export type ButtonType = "primary" | "default";

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<any>, "type" | "onClick"> {
    type: ButtonType;
    onClick?: React.MouseEventHandler<HTMLElement>;
}
