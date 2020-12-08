import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Icon from "./icon";

ReactDOM.render(
  <Fragment>
    <Icon name="wechat" /> <Icon name="cat" />
    <Icon name="dog" />
  </Fragment>,
  document.querySelector("#root")
);
