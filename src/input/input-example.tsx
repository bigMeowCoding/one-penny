import React, { FC } from "react";
import Input from "./input";

interface Props {}

const InputExample: FC<Props> = function () {
  return (
    <article>
      <section>
        <h2>example 1</h2>
        <div>
          <Input placeholder='占位符'/>
        </div>
          <div>
              <Input placeholder='占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符'/>
          </div>
      </section>
    </article>
  );
};
export default InputExample;
