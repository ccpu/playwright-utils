import { launchOptionsToUrlParts } from '../convert-launch-options';

describe('launchOptionToUrlParts', () => {
  it('should return options key with server- attached to it', () => {
    const urlStr = launchOptionsToUrlParts({ headless: true });
    expect(urlStr).toBe('/server-headless=true');
  });

  it('should return multiple option', () => {
    const urlStr = launchOptionsToUrlParts({ headless: true, timeout: 300 });
    expect(urlStr).toBe('/server-headless=true/server-timeout=300');
  });

  it('should handle array', () => {
    const urlStr = launchOptionsToUrlParts({
      args: ['--hide-scrollbars', '--mute-audio'],
      headless: true,
    });
    expect(urlStr).toBe(
      '/server-args=["--hide-scrollbars","--mute-audio"]/server-headless=true',
    );
  });
});
