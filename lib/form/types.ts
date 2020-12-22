import React, { ReactFragment } from "react";

export enum InputType {
  number = "number",
  password = "password",
  text = "text",
}
export interface FormValue {
  [key: string]: any;
}
export interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  value: FormValue;
  fields: {
    name: string;
    label: string;
    input: {
      type: InputType;
    };
  }[];
  onChange: (value: FormValue) => void;
  buttons: ReactFragment;
  errors?: FormErrors;
}
export interface FormRule {
  key: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}
export type FormRules = FormRule[];
export interface FormErrors {
  [key: string]: string[];
}