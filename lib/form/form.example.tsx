import React, { FC, Fragment, useState } from "react";
import Form from "./form";
import { FormValue, InputType } from "./types";
import Button from "../button/button";

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
  return (
    <div>
      <article>
        <h2>example 1</h2>
        <section>
          <Form
            value={formData}
            fields={fields}
            onSubmit={() => {
              console.log(formData);
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
