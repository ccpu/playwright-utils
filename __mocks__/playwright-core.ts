const selectorOperations = (
  selector: unknown,
  callBack: (...ars: unknown[]) => void,
  ...arg: unknown[]
) =>
  new Promise((resolve) => {
    let elm: unknown = undefined;
    if (selector === '#selector') {
      elm = {
        boundingBox: () =>
          new Promise((resolveBox) =>
            resolveBox({
              height: 100,
              width: 100,
              x: 0,
              y: 0,
            }),
          ),
      };
    } else if (selector === '#selector-null') {
      elm = {
        boundingBox: () => new Promise((resolveBox) => resolveBox(null)),
      };
    }
    if (elm && callBack) callBack(elm, ...arg);
    resolve(elm);
  });

const funcs = async () =>
  new Promise((resolveFun) => {
    resolveFun({
      close: () => new Promise((resolve) => resolve({})),
      newContext: () =>
        new Promise((resolveContext) =>
          resolveContext({
            newPage: () => {
              let image = '';
              return new Promise((resolvePage) => {
                resolvePage({
                  $: selectorOperations,
                  $eval: selectorOperations,
                  close: () => new Promise((resolve) => resolve({})),
                  goto: () => new Promise((resolve) => resolve({})),
                  mouse: {
                    down: () => new Promise((resolve) => resolve({})),
                    move: () => new Promise((resolve) => resolve({})),
                    up: () => new Promise((resolve) => resolve({})),
                  },
                  // for test only
                  screenshot: () =>
                    new Promise((resolve) => {
                      const buffer = Buffer.from(image, 'base64');
                      resolve(buffer);
                    }),
                  setScreenshot: (base64Image: string) => {
                    image = base64Image;
                  },
                  waitFor: () => new Promise((resolve) => resolve({})),
                });
              });
            },
          }),
        ),
    });
  });

const connect = {
  connect: funcs,
  launch: funcs,
};

jest.genMockFromModule('playwright-core');
module.exports = {
  chromium: connect,
  firefox: connect,
  webkit: connect,
};
