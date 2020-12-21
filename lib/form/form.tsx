import React, { FC } from "react";
import { FormProps } from "./types";

const Form: FC<FormProps> = function ({
  onSubmit,
  fields,
  value,
  onChange,
  buttons,
}) {
  const onSubmitHandle: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); // 防止表单提交刷新页面
    onSubmit(e);
  };
  return (
    <form onSubmit={onSubmitHandle}>
      {fields.map((field) => {
        return (
          <div key={field.name}>
            {field.label}
            <input
              type={field.input.type}
              value={value[field.name]}
              onChange={(e) => {
                onChange({ ...value, [field.name]: e.target.value });
              }}
            />
          </div>
        );
      })}
      <div>{buttons}</div>
    </form>
  );
};
export default Form;
