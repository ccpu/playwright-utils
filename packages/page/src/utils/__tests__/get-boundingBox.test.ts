import { getBoundingBox } from '../get-boundingBox';
import { pagePropsMock } from '@playwright-utils/mocks';

describe('getBoundingBox', () => {
  it('should throw error if selector not exist', async () => {
    await expect(
      getBoundingBox(pagePropsMock(), '#invalid-selector'),
    ).rejects.toThrowError('Unable to find selector!');
  });

  it('should return rect', async () => {
    await expect(
      getBoundingBox(pagePropsMock(), '#selector-null'),
    ).rejects.toThrowError('Unable to get boundingBox!');
  });

  it('should return bounding box', async () => {
    const box = await getBoundingBox(pagePropsMock(), '#selector');
    expect(box).toStrictEqual({ height: 100, width: 100, x: 0, y: 0 });
  });
});
