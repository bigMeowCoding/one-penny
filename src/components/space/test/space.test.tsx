import { testA11y } from "testing";
import { Space } from "one-penny";
import React from "react";
import { fireEvent, render } from "one-penny/src/tests/testing";
import { getByText } from "@testing-library/react";
const classPrefix = `op-space`;
describe("Space", () => {
  test("a11y", async () => {
    await testA11y(<Space>test</Space>);
  });
  test("basic", () => {
    const { getByTestId, container } = render(
      <Space>
        <div data-testid='block'>block1</div>
        <div>block2</div>
        <div>block3</div>
      </Space>
    );
    const opSpace = container.getElementsByClassName(`${classPrefix}`)[0];
    expect(opSpace).toHaveClass(`${classPrefix}-horizontal`);
    expect(opSpace.firstChild).toHaveStyle(
      "margin-right:var(--gap-horizontal)"
    );
    expect(getByTestId("block").parentElement).toHaveClass(
      `${classPrefix}-item`
    );
  });
  test("renders with wrap", () => {
    const { container } = render(
      <Space wrap>
        <div>block1</div>
        <div>block2</div>
        <div>block3</div>
      </Space>
    );
    const opSpace = container.getElementsByClassName(classPrefix)[0];
    expect(opSpace).toHaveClass(`${classPrefix}-wrap`);
  });
  test("renders with direction", () => {
    const { container } = render(
      <Space direction='vertical'>
        <div>block1</div>
        <div>block2</div>
        <div>block3</div>
      </Space>
    );
    const opSpace = container.getElementsByClassName(classPrefix)[0];
    expect(opSpace).toHaveClass(`${classPrefix}-vertical`);
  });
  test("renders with justify", () => {
    const justify = "center";
    const { container } = render(
      <Space justify={justify}>
        <div>block1</div>
        <div>block2</div>
        <div>block3</div>
      </Space>
    );
    const opSpace = container.getElementsByClassName(classPrefix)[0];
    expect(opSpace).toHaveClass(`${classPrefix}-justify-${justify}`);
  });
  test("renders with align", () => {
    const align = "end";
    const { container } = render(
      <Space align={align}>
        <div>block1</div>
        <div>block2</div>
        <div>block3</div>
      </Space>
    );
    const opSpace = container.getElementsByClassName(classPrefix)[0];
    expect(opSpace).toHaveClass(`${classPrefix}-align-${align}`);
  });
  test("renders with onClick event", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Space onClick={onClick}>
        <div>block</div>
      </Space>
    );
    fireEvent.click(getByText("block"));
    expect(onClick).toBeCalledTimes(1);
  });
});
