import React, { FC } from "react";
import Button from "./button";
import "./button-example.scss";
interface Props {}

const ButtonExample: FC<Props> = function () {
  return (
    <article>
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
    </article>
  );
};
export default ButtonExample;
