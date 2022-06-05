import React, { FC } from "react";
import Button from "./button";
import "./button-example.scss";
interface Props {}

const ButtonExample: FC<Props> = function () {
  return (
    <article>
      <section>
        <h2>example1</h2>
        <section className="button-list">
          <Button
            type="primary"
            onClick={(e) => {
              console.log("click", e);
            }}
          >
            primary
          </Button>
          <Button
            type="default"
            onClick={(e) => {
              console.log("click", e);
            }}
          >
            default
          </Button>
        </section>
      </section>
      <section>
        <h2>example 2</h2>
        <div>
          <Button type="primary" loading={true}>
            loading
          </Button>
        </div>
      </section>
    </article>
  );
};
export default ButtonExample;
