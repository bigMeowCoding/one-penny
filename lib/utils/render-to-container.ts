import { ReactElement } from 'react';
import { canUseDom } from './can-use-dom';
import { resolveContainer } from './get-container';
import { createPortal } from 'react-dom';

export type GetContainer = HTMLElement | (() => HTMLElement) | null;
export function renderToContainer(
  getContainer: GetContainer,
  node: ReactElement
) {
  if (canUseDom && getContainer) {
    const container = resolveContainer(getContainer);
    return createPortal(node, container);
  }
  return node;
}
