import { useMemo } from 'react';
import Cell from './Cell';

type GameFieldProps = {
  width: number;
  height: number;
};

const fillIndexes = (size: number, minesCount: number): number[] => {
  const randIndexes: number[] = [];
  while (randIndexes.length < minesCount) {
    const index = Math.floor(Math.random() * size);
    if (!randIndexes.includes(index)) {
      randIndexes.push(index);
    }
  }
  return randIndexes;
};

type GameCell = {
  isMine: boolean;
  coordinates: {
    x: number;
    y: number;
  };
  minesNearCount: number;
};

const gameFieldArray = (
  width: number,
  height: number,
  minesCount: number
): GameCell[] => {
  const size = width * height;
  const minesIndexes = fillIndexes(size, minesCount);
  const gameField: GameCell[] = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      gameField.push({
        isMine: minesIndexes.includes(i * width + j),
        coordinates: {
          x: i,
          y: j,
        },
        minesNearCount: 0,
      });
    }
  }
  return gameField;
};

const fillNumbers = (gameField: GameCell[]) => {
  gameField.forEach((cell) => {
    if (!cell.isMine) {
      const minesNearCount = gameField
        .filter((c) => {
          return (
            (c.coordinates.x === cell.coordinates.x &&
              c.coordinates.y === cell.coordinates.y - 1) ||
            (c.coordinates.x === cell.coordinates.x &&
              c.coordinates.y === cell.coordinates.y + 1) ||
            (c.coordinates.x === cell.coordinates.x - 1 &&
              c.coordinates.y === cell.coordinates.y) ||
            (c.coordinates.x === cell.coordinates.x + 1 &&
              c.coordinates.y === cell.coordinates.y) ||
            (c.coordinates.x === cell.coordinates.x - 1 &&
              c.coordinates.y === cell.coordinates.y - 1) ||
            (c.coordinates.x === cell.coordinates.x + 1 &&
              c.coordinates.y === cell.coordinates.y - 1) ||
            (c.coordinates.x === cell.coordinates.x - 1 &&
              c.coordinates.y === cell.coordinates.y + 1) ||
            (c.coordinates.x === cell.coordinates.x + 1 &&
              c.coordinates.y === cell.coordinates.y + 1)
          );
        })
        .filter((c) => c.isMine).length;
      cell.minesNearCount = minesNearCount;
    }
  });

  return gameField;
};

const GameField = ({ width, height }: GameFieldProps) => {
  const count = width * height;
  const field = useMemo(
    () => fillNumbers(gameFieldArray(width, height, 10)),
    [width, height]
  );

  return (
    <div className="flex flex-col">
      <div className={`grid gap-2 grid-cols-${width} grid-rows-${height}`}>
        {Array.from({ length: count }, (_, i) => {
          return (
            <Cell
              key={i}
              index={i}
              isMine={field[i].isMine}
              minesNearCount={field[i].minesNearCount}
            />
          );
        })}
      </div>
    </div>
  );
};;

export default GameField;
