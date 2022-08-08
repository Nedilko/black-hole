import type { IBoardSize } from './field';
import type { ICellPosition } from './cell';
import { getSize } from './helpers';

export const getHolesIndexes = (
  size: IBoardSize,
  holesCount: number
): number[] => {
  const indexesArray: number[] = [];
  while (indexesArray.length < holesCount) {
    const randomIndex = Math.floor(Math.random() * getSize(size));
    if (!indexesArray.includes(randomIndex)) {
      indexesArray.push(randomIndex);
    }
  }
  return indexesArray;
};

export const getCellSurroundingIndexes = (
  position: ICellPosition,
  size: IBoardSize
) => {
  const indexesArray: number[] = [];
  const { x, y } = position;
  const xMin = x - 1;
  const xMax = x + 1;
  const yMin = y - 1;
  const yMax = y + 1;
  for (let i = xMin; i <= xMax; i++) {
    for (let j = yMin; j <= yMax; j++) {
      if (
        i >= 0 &&
        i < size.width &&
        j >= 0 &&
        j < size.height &&
        !(i === x && j === y)
      ) {
        indexesArray.push(i + j * size.width);
      }
    }
  }
  return indexesArray;
};
