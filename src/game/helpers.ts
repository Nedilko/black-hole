import type { IBoardSize } from './field';
import type { ICellPosition } from './cell';

export const getSize = ({ width, height }: IBoardSize) => {
  return width * height;
};

export const getPosition = (index: number, size: IBoardSize): ICellPosition => {
  const x = index % size.width;
  const y = Math.floor(index / size.width);
  return { x, y };
};

export const getIndex = (position: ICellPosition, size: IBoardSize): number => {
  return position.y * size.width + position.x;
};
