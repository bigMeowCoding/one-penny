import { Event } from "css-animation";

export function getAttributeName() {
  return "ant-click-animating-without-extra-node";
}

export function onTransitionStart(e: AnimationEvent, node: HTMLDivElement) {
  if (!e || e.target !== node) {
    return;
  }
}

export function onTransitionEnd(
  e: AnimationEvent,
  styleElement: HTMLStyleElement
) {
  if (!e || e.animationName !== "fadeEffect") {
    return;
  }
  resetEffect(e.target as HTMLDivElement);
  if (styleElement) {
    styleElement.parentElement?.removeChild(styleElement);
  }
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
  styleElement: HTMLStyleElement,
  waveColor: string
) {
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

export function waveClickHandle(
  waveElement: HTMLDivElement,
  styleElement: HTMLStyleElement,
  waveColor: string
): number {
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
    Event.addStartEventListener(node, (e: AnimationEvent) => {
      changeWaveShadowVariable(styleElement, waveColor);
      onTransitionStart(e, waveElement);
    });
    Event.addEndEventListener(node, (e: AnimationEvent) => {
      onTransitionEnd(e, styleElement);
    });
  }, 0);
}
