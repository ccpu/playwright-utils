import { ExtendedPlaywrightPageFunctions } from './typings';

import {
  scrollSelector,
  mouseDownOnSelector,
  mouseMoveToSelector,
  dragDropSelector,
  setSelectorSize,
  clearInput,
  selectorMouseWheel,
} from '.';

export function extendPage<T>(page: T) {
  const thisPage = page as ExtendedPlaywrightPageFunctions & T;

  thisPage.dragDropSelector = dragDropSelector;
  thisPage.scrollSelector = scrollSelector;
  thisPage.mouseDownOnSelector = mouseDownOnSelector;
  thisPage.mouseMoveToSelector = mouseMoveToSelector;
  thisPage.setSelectorSize = setSelectorSize;
  thisPage.clearInput = clearInput;
  thisPage.selectorMouseWheel = selectorMouseWheel;

  return thisPage;
}
