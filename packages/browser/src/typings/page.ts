import { Page as PlaywrightPage } from 'playwright-core';

export interface Points {
  x?: number;
  y?: number;
}

export interface DragDropOptions {
  mouseDownRelativePoint?: Points;
  mouseMoveRelativePoint: Points;
}

export interface Page extends PlaywrightPage, PageCommonProps {
  prototype: Record<string, unknown>;
  storybookIdentifier: string;
  browserType: string;
}

export interface PageCommonProps {
  updatePassedSnapshot?: boolean;
  snapshotDelay?: number;
}
