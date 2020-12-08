import React, { Fragment, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import Icon from "./icon/icon";

const clickHandle: MouseEventHandler<SVGElement> = function (e) {
  console.log(e);
};

ReactDOM.render(
  <Fragment>
    <Icon name="wechat"  onClick={clickHandle} />
  </Fragment>,
  document.querySelector("#root")
);
