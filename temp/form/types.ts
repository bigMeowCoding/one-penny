import React, { ReactFragment } from 'react';

export enum InputType {
  number = 'number',
  password = 'password',
  text = 'text',
}
export interface FormValue {
  [key: string]: string;
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
  transformError?: (msg: string) => string;
}
export interface FormRule {
  key: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validator?: {
    name: string;
    validate: (value: string) => Promise<any>;
  };
}
export interface ErrorMessage {
  message?: string;
  promise?: Promise<boolean>;
}
export type FormRules = FormRule[];
export interface FormErrors {
  [key: string]: string[];
}
export type formRuleType = 'required' | 'minLength' | 'maxLength' | 'pattern' | 'validator';
