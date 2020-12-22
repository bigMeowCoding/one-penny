import React, { FC, Fragment, useState } from "react";
import Form from "./form";
import { FormErrors, FormValue, InputType } from "./types";
import Button from "../button/button";
import Validator from "./validator";

interface Props {}

const FormExample: FC<Props> = function () {
  const [formData, setFormData] = useState<FormValue>({
    username: "",
    password: "",
  });
  const [fields] = useState([
    {
      name: "username",
      label: "用户名",
      input: {
        type: InputType.text,
      },
    },
    {
      name: "password",
      label: "密码",
      input: {
        type: InputType.password,
      },
    },
  ]);
  const [errors, setErrors] = useState<FormErrors>({});
  return (
    <div>
      <article>
        <h2>example 1</h2>
        <section>
          <Form
            value={formData}
            fields={fields}
            errors={errors}
            onSubmit={() => {
              // console.log(formData);
              setErrors({});
              const errors = Validator(formData, [
                {
                  key: "username",
                  required: true,
                  minLength: 3,
                  maxLength: 5,
                  pattern: /^\d+$/,
                },
                {
                  key: "password",
                  required: true,
                  pattern: /^\D+$/,
                },
              ]);
              if (Object.keys(errors).length > 0) {
                setErrors(errors);
              }
              console.log(errors);
            }}
            onChange={(value) => {
              setFormData(value);
            }}
            buttons={
              <Fragment>
                <Button type="primary" defaultType="submit">
                  提交
                </Button>
                <Button> 返回</Button>
              </Fragment>
            }
          />
        </section>
      </article>
    </div>
  );
};
export default FormExample;
