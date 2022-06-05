import { CLASS_PREFIX } from "../config/ui";

interface ClassToggle {
  [K: string]: boolean;
}
interface Options {
  extra: string; // 直接添加的className
}
export default function (prefix: string) {
  return (className: string | ClassToggle, options?: Options) => {
    const namesObject =
      typeof className === "string" ? { [className]: true } : className;
    const names = Object.entries(namesObject)
      .filter((kv) => kv[1])
      .map((item) => item[0]);
    return names
      .map((name) => {
        return [prefix, name].filter(Boolean).join("-");
      })
      .concat(options ? options.extra : [])
      .join(" ");
  };
}
export function makeComponentPrefixClass(className: string): string {
  return [CLASS_PREFIX, className].join("-");
}
