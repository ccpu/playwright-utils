import { Page } from 'playwright-core';
import { ExtendedPage } from './typings';

import {
  scrollSelector,
  mouseDownOnSelector,
  mouseMoveToSelector,
  dragDropSelector,
} from '.';

export const extendPage = <T extends Page>(page: T): ExtendedPage => {
  const thisPage = (page as unknown) as ExtendedPage;
  thisPage.dragDropSelector = dragDropSelector;
  thisPage.scrollSelector = scrollSelector;
  thisPage.mouseDownOnSelector = mouseDownOnSelector;
  thisPage.mouseMoveToSelector = mouseMoveToSelector;

  return thisPage;
};
