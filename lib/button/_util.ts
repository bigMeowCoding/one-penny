import { ButtonType } from "./types";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";

export function getWaveBaseColor(node: HTMLButtonElement): string {
  return (
    getComputedStyle(node).getPropertyValue("border-top-color") || // Firefox Compatible
    getComputedStyle(node).getPropertyValue("border-color") ||
    getComputedStyle(node).getPropertyValue("background-color")
  );
}

export function changeWaveBaseColorOnClick(
  btnElement: HTMLButtonElement,
  setWaveColor: (color: string) => void
) {
  btnElement.addEventListener(
    "click",
    () => {
      const color = getWaveBaseColor(btnElement);
      setWaveColor(color);
    },
    false
  );
}

export function addButtonClassNamePrefix(type: string) {
  return makeClassByPrefix("zyj-ui-button")(type);
}

export function makeButtonTypeClassName(type: ButtonType): string {
  if (!type || type === "default") {
    return "";
  }
  return addButtonClassNamePrefix(type);
}
