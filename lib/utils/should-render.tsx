import { useInitialized } from './use-initialized';

export function shouldRender(
  active: boolean,
  forceRender?: boolean,
  destroyOnClose?: boolean
) {
  const initiated = useInitialized(active);
  if (forceRender) {
    return true;
  }
  if (active) {
    return true;
  }
  if (!initiated) {
    return false;
  }
  return !destroyOnClose;
}
