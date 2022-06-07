import { GetContainer } from './render-to-container';
import isFunction from 'lodash/isFunction';

export function resolveContainer(getContainer: GetContainer) {
  const container = isFunction(getContainer) ? getContainer() : getContainer;
  return container || document.body;
}
