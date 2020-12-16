import makeClassByPrefix from "../lib/common/utils/makeClassByPrefix";

describe("测试给class加前缀功能", () => {
  it("base", () => {
    const addClassByPrefix = makeClassByPrefix("zyj-ui");
    expect(addClassByPrefix("")).toEqual("zyj-ui");
    expect(addClassByPrefix("ccc")).toEqual("zyj-ui-ccc");
    expect(addClassByPrefix("null")).toEqual("zyj-ui-null");
    expect(addClassByPrefix({ x: true, y: false })).toEqual("zyj-ui-x");
    expect(addClassByPrefix({ x: true, y: false }, { extra: "z" })).toEqual(
      "zyj-ui-x z"
    );
    expect(addClassByPrefix({ x: true, y: true })).toEqual("zyj-ui-x zyj-ui-y");
  });
});
