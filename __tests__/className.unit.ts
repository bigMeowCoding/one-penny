import classNames from "../lib/common/utils/classNames";

describe("组合class name", () => {
  it("一个class", () => {
    expect(classNames("a")).toEqual("a");
  });
  it("传空", () => {
    expect(classNames("")).toEqual("");
    expect(classNames(null)).toEqual("");
    expect(classNames(undefined)).toEqual("");
  });
  it("传多个class", () => {
    expect(classNames("a", "b c", undefined, null, "姓名", "true")).toEqual(
      "a b c 姓名 true"
    );
  });
  it("class 前边有多余空格", () => {
    expect(classNames(" a ")).toEqual("a");
    expect(classNames(" a ", "b")).toEqual("a b");
  });
});
