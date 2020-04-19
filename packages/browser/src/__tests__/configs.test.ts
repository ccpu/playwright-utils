import { getConfigs, setConfigs, ConfigProps } from '../configs';

describe('configs', () => {
  it('should set config', () => {
    const getWsEndpointMock = jest.fn();
    const executablePath = { chromium: 'c', firefox: 'f', webkit: 'w' };
    const def: ConfigProps = {
      browserLocation: 'local',
      executablePath,
      getWsEndpoint: getWsEndpointMock,
      wsEndpoint: 'ws',
    };
    setConfigs(def);
    const conf = getConfigs();

    expect(conf.browserLocation).toBe('local');
    expect(conf.executablePath).toStrictEqual(executablePath);
    expect(conf.wsEndpoint).toBe('ws');

    conf.getWsEndpoint('ws');
    expect(getWsEndpointMock).toHaveBeenCalledTimes(1);
  });
});
