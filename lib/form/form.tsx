import React, { FC } from "react";
import { FormProps } from "./types";
import Input from "../input/input";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import "./form.scss";
import { controlHasError } from "./utils";
import { DefaultErrorMessage } from "./cofig";

const addClassByPrefix = makeClassByPrefix("zyj-ui-form");
const Form: FC<FormProps> = function ({
  onSubmit,
  fields,
  value,
  onChange,
  buttons,
  transformError,
  errors,
}) {
  const onSubmitHandle: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); // 防止表单提交刷新页面
    onSubmit(e);
  };

  return (
    <form onSubmit={onSubmitHandle}>
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
              <div className={addClassByPrefix("error-message")}>
                {errors && controlHasError(errors, field.name) ? (
                  <span>
                    {errors[field.name]
                      .map((item) => {
                        return (
                          (transformError && transformError(item)) ||
                          DefaultErrorMessage[item] ||
                          "未知错误"
                        );
                      })
                      .join(",")}
                  </span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div className={addClassByPrefix("row")}>
        <div className={addClassByPrefix("label")}>&nbsp;</div>
        <div className={addClassByPrefix("buttons")}>{buttons}</div>
      </div>
    </form>
  );
};
export default Form;
