import { CellPosition, FieldSize } from '../store/actions/field';

export const getHolesIndexes = (
  { width, height }: FieldSize,
  holesCount: number
): number[] => {
  const indexesArray: number[] = [];
  while (indexesArray.length < holesCount) {
    const randomIndex = Math.floor(Math.random() * (width * height));
    if (!indexesArray.includes(randomIndex)) {
      indexesArray.push(randomIndex);
    }
  }
  return indexesArray;
};

export const getCellSurroundingIndexes = (
  { x, y }: CellPosition,
  { width, height }: FieldSize
) => {
  const indexesArray: number[] = [];

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
        indexesArray.push(i + j * width);
      }
    }
  }
  return indexesArray;
};
