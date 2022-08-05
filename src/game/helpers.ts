import type { IBoardSize } from './field';

export const getSize = ({ width, height }: IBoardSize) => {
  return width * height;
};
