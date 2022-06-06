interface ClassToggle {
  [K: string]: boolean;
}
interface Options {
  extra: string;
}
export default function (
  prefix: string,
): (className: string | ClassToggle, options?: Options | undefined) => string;
export declare function makeComponentPrefixClass(className: string): string;
export {};
