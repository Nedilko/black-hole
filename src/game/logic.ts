import type { CellPosition, FieldSize } from '../store/fieldSlice';

export const getHolesIndexes = <T extends number>(
  { width, height }: FieldSize,
  holesCount: number
): T[] => {
  const indexesArray: T[] = [];
  while (indexesArray.length < holesCount) {
    const randomIndex = Math.floor(Math.random() * (width * height)) as T;
    if (!indexesArray.includes(randomIndex)) {
      indexesArray.push(randomIndex);
    }
  }
  return indexesArray;
};

export const getCellSurroundingIndexes = <T extends number>(
  { x, y }: CellPosition,
  { width, height }: FieldSize
): T[] => {
  const indexesArray: T[] = [];

  const xMin = x - 1;
  const xMax = x + 1;
  const yMin = y - 1;
  const yMax = y + 1;

  for (let i = xMin; i <= xMax; i++) {
    for (let j = yMin; j <= yMax; j++) {
      if (
        i >= 0 &&
        i < width &&
        j >= 0 &&
        j < height &&
        !(i === x && j === y)
      ) {
        indexesArray.push((i + j * width) as T);
      }
    }
  }
  return indexesArray;
};
