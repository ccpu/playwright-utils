import { ExtendedPage, Position } from './typings';

export async function scrollSelector(
  this: ExtendedPage,
  selector: string,
  point: Position,
) {
  await this.waitForSelector(selector);

  const result = await this.$eval(
    selector,
    (el, points) => {
      if (points.y) {
        (el as HTMLElement).scrollTop = points.y;
      }
      if (points.x) {
        (el as HTMLElement).scrollLeft = points.x;
      }
    },
    point,
  );
  return result;
}
