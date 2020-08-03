import { NewPageFunc } from './typings';

import {
  scrollSelector,
  mouseDownOnSelector,
  mouseMoveToSelector,
  dragDropSelector,
  setSelectorSize,
  clearInput,
} from '.';

export function extendPage<T>(page: T) {
  const thisPage = page as NewPageFunc & T;

  thisPage.dragDropSelector = dragDropSelector;
  thisPage.scrollSelector = scrollSelector;
  thisPage.mouseDownOnSelector = mouseDownOnSelector;
  thisPage.mouseMoveToSelector = mouseMoveToSelector;
  thisPage.setSelectorSize = setSelectorSize;
  thisPage.clearInput = clearInput;

  return thisPage;
}
