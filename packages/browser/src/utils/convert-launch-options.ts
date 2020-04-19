import { BrowserLaunchOptions } from '../typings';

export const launchOptionsToUrlParts = (
  options?: BrowserLaunchOptions,
): string => {
  if (!options) return '';
  const urlPart = Object.keys(options).reduce((arr, optionKey) => {
    const optValStr = JSON.stringify(options[optionKey]);
    arr.push(`server-${optionKey}=${optValStr}`);
    return arr;
  }, [] as string[]);
  return `/${urlPart.join('/')}`;
};
