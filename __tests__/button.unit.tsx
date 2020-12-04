import render from "react-test-renderer";
import Button from "../lib/button";
import React from "react";

describe("button", () => {
  it("is div", () => {
    const json = render.create(<Button />).toJSON();
    expect(json).toMatchSnapshot();
  });
});
