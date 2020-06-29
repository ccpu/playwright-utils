import { Page } from 'playwright-core';

export interface Position {
  x?: number;
  y?: number;
}

export interface Location {
  top?: number;
  left?: number;
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

export interface NewPageFunc {
  /**
   * This method fetches an element with `selector`, and move it to position given by user.
   * If there's no element matching `selector`, the method waits until a matching element appears in the DOM.
   * @param selector A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
   * @param to Required and selector will move to position given to this option
   * @param mouseDownRelativeToSelector By default the center on selector will be selected for mousedown, but if mouseDownRelativeToSelector set the specified position will be used for mousedown.
   */
  dragDropSelector: (
    selector: string,
    to: Position,
    mouseDownRelativeToSelector?: Position,
  ) => Promise<void>;
  /**
   * This method fetches an element with `selector`, and set the selector scrollLeft and scrollTop.
   * If there's no element matching `selector`, the method waits until a matching element appears in the DOM.
   * @param selector A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
   * @param scrollProperty
   */
  scrollSelector: (selector: string, scrollProperty: Location) => Promise<void>;
  /**
   * This method fetches an element with `selector`, and perform mousedown on selector.
   * If there's no element matching `selector`, the method waits until a matching element appears in the DOM.
   * @param selector A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
   * @param point
   */
  mouseDownOnSelector: (selector: string, point?: Position) => Promise<void>;
  /**
   * This method fetches an element with `selector`, and move the mouse to center of selector.
   * If there's no element matching `selector`, the method waits until a matching element appears in the DOM.
   * @param selector A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
   * @param point
   */
  mouseMoveToSelector: (selector: string, point?: Position) => Promise<void>;
}

export interface ExtendedPage extends Page, NewPageFunc {}
