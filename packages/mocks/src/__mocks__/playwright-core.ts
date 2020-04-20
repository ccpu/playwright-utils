import { pageProps } from '../pageProps';

export const pageMock = () => {
  return new Promise((resolvePage) => {
    resolvePage(pageProps());
  });
};

export const browserMock = async () =>
  new Promise((resolveFun) => {
    resolveFun({
      close: () => new Promise((resolve) => resolve({})),
      newContext: () =>
        new Promise((resolveContext) =>
          resolveContext({
            newPage: pageMock,
          }),
        ),
    });
  });

const connect = {
  connect: browserMock,
  launch: browserMock,
};

jest.genMockFromModule('playwright-core');
module.exports = {
  chromium: connect,
  firefox: connect,
  webkit: connect,
};
