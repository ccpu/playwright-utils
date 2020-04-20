type Location = 'remote' | 'local';

type GetEndPoint = (browserType: string) => Promise<string>;

export interface BrowserInstance {
  chromium?: string;
  firefox?: string;
  webkit?: string;
}

export interface BrowserManagerConfigs {
  executablePath?: BrowserInstance;
  wsEndpoint?: BrowserInstance | string;
  browserLocation?: Location;
  getWsEndpoint?: GetEndPoint;
}

class Configs implements BrowserManagerConfigs {
  getWsEndpoint!: GetEndPoint;

  private _executablePath: BrowserInstance | undefined;

  private _wsEndpoint: BrowserInstance | undefined;

  private _browserLocation: Location | undefined;

  public get executablePath() {
    return this._executablePath;
  }

  public set executablePath(value) {
    this._executablePath = value;
  }

  public get wsEndpoint() {
    return this._wsEndpoint;
  }

  public set wsEndpoint(value) {
    this._wsEndpoint = value;
  }

  public get browserLocation() {
    return this._browserLocation;
  }

  public set browserLocation(value) {
    this._browserLocation = value;
  }
}

const configs = new Configs();

export const getConfigs = () => configs;

export const setConfigs = (props: BrowserManagerConfigs) => {
  Object.keys(props).forEach((key) => {
    configs[key] = props[key];
  });
};
