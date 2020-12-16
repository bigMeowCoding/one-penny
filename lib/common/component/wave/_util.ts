import { Event } from "css-animation";

export function getAttributeName() {
  return "ant-click-animating-without-extra-node";
}

export function onTransitionStart(e: AnimationEvent, node: HTMLDivElement) {
  if (!e || e.target !== node) {
    return;
  }
}
export function onTransitionEnd(e: AnimationEvent) {
  if (!e || e.animationName !== "fadeEffect") {
    return;
  }
  resetEffect(e.target as HTMLDivElement);
}

export function resetEffect(node: HTMLDivElement) {
  if (!node || !(node instanceof Element)) {
    return;
  }
  const attributeName = getAttributeName();
  node.setAttribute(attributeName, "false"); // edge has bug on `removeAttribute` #14466

  Event.removeStartEventListener(node, onTransitionStart);
  Event.removeEndEventListener(node, onTransitionEnd);
}
