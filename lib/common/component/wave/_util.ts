import { Event } from "css-animation";
import React from "react";

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

export function changeWaveShadowVariable(
  styleRef: React.MutableRefObject<HTMLStyleElement>,
  waveColor: string
) {
  const styleElement = styleRef.current;
  if (styleElement && waveColor) {
    styleElement.innerHTML = `
      [ant-click-animating-without-extra-node='true']::after {
        --antd-wave-shadow-color: ${waveColor};
      }`;
    if (!document.body.contains(styleElement)) {
      document.body.append(styleElement);
    }
  }
}

export function waveClickHandle(waveElement: HTMLDivElement): number {
  if (!waveElement) {
    return -1;
  }
  resetEffect(waveElement);
  return window.setTimeout(() => {
    const attribute = getAttributeName(),
      node = waveElement;
    if (!node) {
      return;
    }

    node.setAttribute(attribute, "true");
    Event.addStartEventListener(node, (e: any) => {
      if (!waveElement) {
        return;
      }
      onTransitionStart(e, waveElement);
    });
    Event.addEndEventListener(node, onTransitionEnd);
  }, 0);
}
