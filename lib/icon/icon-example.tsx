import React from "react";
import { FC } from "react";
import Icon from "./icon";
import "./icon-example.scss";
const IconExample: FC = function () {
  return (
    <div>
      <Icon name="wechat" />
      <Icon name="cat" />
      <Icon name="loading" className="loading-icon" />
    </div>
  );
};
export default IconExample;
