import { Page } from 'playwright-core';

export interface Position {
  x?: number;
  y?: number;
}

export interface DragDropOptions {
  mouseDownRelativeToSelector?: Position;
  to: Position;
}

export interface ElementHandleBoundingBox {
  /**
   * the x coordinate of the element in pixels.
   */
  x: number;

  /**
   * the y coordinate of the element in pixels.
   */
  y: number;

  /**
   * the width of the element in pixels.
   */
  width: number;

  /**
   * the height of the element in pixels.
   */
  height: number;
}

export interface ExtendedPage extends Page {
  dragDropSelector: (
    selector: string,
    options: DragDropOptions,
  ) => Promise<void>;
  scrollSelector: (selector: string, point: Position) => Promise<void>;
  mouseDownOnSelector: (selector: string, point?: Position) => Promise<void>;
  mouseMoveToSelector: (selector: string, point?: Position) => Promise<void>;
}
