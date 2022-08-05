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

interface ICellPosition {
  x: number;
  y: number;
}

interface ICell {
  isOpen: boolean;
  position: ICellPosition;
}

interface IGameCell extends ICell {
  isMine: boolean;
  minesNearCount: number;
}

const gameFieldArray = (
  width: number,
  height: number,
  minesCount: number
): IGameCell[] => {
  const size = width * height;
  const minesIndexes = fillIndexes(size, minesCount);

  const gameField: IGameCell[] = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      gameField.push({
        isMine: minesIndexes.includes(i * width + j),
        position: {
          x: i,
          y: j,
        },
        minesNearCount: 0,
        isOpen: false,
      });
    }
  }
  return gameField;
};

const fillNumbers = (gameField: IGameCell[]) => {
  gameField.forEach((cell) => {
    if (!cell.isMine) {
      const minesNearCount = gameField
        .filter((c) => {
          return (
            (c.position.x === cell.position.x &&
              c.position.y === cell.position.y - 1) ||
            (c.position.x === cell.position.x &&
              c.position.y === cell.position.y + 1) ||
            (c.position.x === cell.position.x - 1 &&
              c.position.y === cell.position.y) ||
            (c.position.x === cell.position.x + 1 &&
              c.position.y === cell.position.y) ||
            (c.position.x === cell.position.x - 1 &&
              c.position.y === cell.position.y - 1) ||
            (c.position.x === cell.position.x + 1 &&
              c.position.y === cell.position.y - 1) ||
            (c.position.x === cell.position.x - 1 &&
              c.position.y === cell.position.y + 1) ||
            (c.position.x === cell.position.x + 1 &&
              c.position.y === cell.position.y + 1)
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
    () => fillNumbers(gameFieldArray(width, height, 20)),
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
