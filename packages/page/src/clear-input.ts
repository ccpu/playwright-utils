import { Page } from 'playwright-core';
import { ClearInputOptions } from './typings';

export async function clearInput(
  this: Page,
  selector: string,
  options?: ClearInputOptions,
) {
  await this.fill(selector, '');
  if (!options) return;
  if (options.blur) {
    await this.$eval(selector, (e) => e.blur());
  }
  if (options.timeout) {
    await this.waitForTimeout(options.timeout);
  }
}
