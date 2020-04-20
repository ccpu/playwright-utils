import { Page as PlaywrightPage } from 'playwright-core';

export interface Page extends PlaywrightPage {
  __browserType: string;
}
