import React from "react";
import * as renderer from "react-test-renderer";
import Icon from "../icon/icon";
describe("icon组件", () => {
  it("render correctly", () => {
    const json = renderer.create(<Icon name="wechat" />).toJSON();
    expect(json).toMatchSnapshot();
  });
});
