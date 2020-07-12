const browserFuncMock = {
  close: async () => {
    return new Promise((resolve) => {
      resolve();
    });
  },
  newContext: async () => {
    return new Promise((resolve) => {
      resolve({
        newPage: async () => {
          return new Promise((resolve) => {
            resolve({});
          });
        },
      });
    });
  },
};

const mocks = {
  connect: async () => {
    return new Promise((resolve) => {
      resolve({ ...browserFuncMock });
    });
  },
  launch: async () => {
    return new Promise((resolve) => {
      resolve({ ...browserFuncMock });
    });
  },
};
const chromium = { ...mocks };
const firefox = { ...mocks };
const webkit = { ...mocks };

export { chromium, firefox, webkit };
