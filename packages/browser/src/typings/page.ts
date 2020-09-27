import { Page as PlaywrightPage } from 'playwright';

export interface Page extends PlaywrightPage {
  __browserType: string;
}
