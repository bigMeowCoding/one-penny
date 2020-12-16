interface ClassToggle {
  [K: string]: boolean;
}
interface Options {
  extra: string;
}
export default function (prefix: string) {
  /**
   * @param options 直接添加的className
   */
  return (className?: string | ClassToggle, options?: Options) => {
    let result;
    if (typeof className === "string" || typeof className === "undefined") {
      result = [prefix, className].filter(Boolean).join("-");
    } else {
      const names = Object.entries(className)
        .filter((kv) => kv[1])
        .map((item) => item[0]);
      result = names
        .map((name) => {
          return [prefix, name].filter(Boolean).join("-");
        })
        .join(" ");
    }
    if (options && options.extra) {
      result = [result, options.extra].filter(Boolean).join(" ");
    }
    return result;
  };
}
