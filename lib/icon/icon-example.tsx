import React from "react";
import { FC } from "react";
import Icon from "./icon";
import "./icon-example.scss";
const IconExample: FC = () => (
  <div>
    <Icon name="wechat" />
    <Icon name="cat" />
    <Icon name="loading" className="loading-icon" />
    <Icon name="pending" className="loading-icon" />
  </div>
);
export default IconExample;
