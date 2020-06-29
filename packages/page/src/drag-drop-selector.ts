import { getPointByDirection } from './utils/get-point-by-direction';
import { DragDropOptions } from './typings';
import { Page } from 'playwright-core';
import { getBoundingBox } from './utils/get-boundingBox';

export async function dragDropSelector(
  this: Page,
  selector: string,
  opts: DragDropOptions,
) {
  const {
    mouseDownRelativeToSelector: mouseDownRelativePoint,
    to: mouseMoveRelativePoint,
  } = opts;

  const box = await getBoundingBox(this, selector);

  const mouseDownRelativeX = getPointByDirection(
    box.width / 2,
    'x',
    mouseDownRelativePoint,
  );

  const mouseDownRelativeY = getPointByDirection(
    box.height / 2,
    'y',
    mouseDownRelativePoint,
  );

  const mouseMoveX = getPointByDirection(0, 'x', mouseMoveRelativePoint);
  const mouseMoveY = getPointByDirection(0, 'y', mouseMoveRelativePoint);

  // move mouse to center of element or specified point
  await this.mouse.move(box.x + mouseDownRelativeX, box.y + mouseDownRelativeY);

  await this.mouse.down();

  await this.mouse.move(
    box.x + mouseDownRelativeX + mouseMoveX,
    box.y + mouseDownRelativeY + mouseMoveY,
  );

  await this.mouse.up();
}
