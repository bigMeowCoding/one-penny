import React, { FC } from "react";
import {  FormProps } from "./types";
import Input from "../input/input";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import "./form.scss";
import { controlHasError } from "./utils";

const addClassByPrefix = makeClassByPrefix("zyj-ui-form");
const Form: FC<FormProps> = function ({
  onSubmit,
  fields,
  value,
  onChange,
  buttons,
  errors,
}) {
  const onSubmitHandle: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); // 防止表单提交刷新页面
    onSubmit(e);
  };

  return (
    <form onSubmit={onSubmitHandle}>
      <div>
        {fields.map((field) => {
          return (
            <div className={addClassByPrefix("row")} key={field.name}>
              <div className={addClassByPrefix("label")}>{field.label}</div>
              <div className={addClassByPrefix("control")}>
                <Input
                  type={field.input.type}
                  value={value[field.name]}
                  className={
                    errors && controlHasError(errors, field.name)
                      ? "has-error"
                      : ""
                  }
                  onChange={(e) => {
                    onChange({ ...value, [field.name]: e.target.value });
                  }}
                />
                <div className={addClassByPrefix('error-message')}>
                  {errors && controlHasError(errors, field.name)
                    ? errors[field.name].map((item, index) => {
                        return <div key={index}>{item}</div>;
                      })
                    : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={addClassByPrefix("buttons")}>{buttons}</div>
    </form>
  );
};
export default Form;
