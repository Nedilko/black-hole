import { useCallback } from 'react';
import { useState } from 'react';
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

interface IBoardSize {
  width: number;
  height: number;
}

interface IBoard {
  size: IBoardSize;
  minesCount: number;
  minesIndexes: number[];
  cells: ICell[];
}

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

let CellItem = class {
  private readonly _position: ICellPosition;
  private _isOpen: boolean;
  private readonly _isMine: boolean;
  private readonly _minesNearCount: number;
  private readonly _board: IBoard;

  constructor(
    position: ICellPosition,
    isOpen: boolean,
    isMine: boolean,
    minesNearCount: number,
    board: IBoard
  ) {
    this._position = position;
    this._isOpen = isOpen;
    this._isMine = isMine;
    this._minesNearCount = minesNearCount;
    this._board = board;
  }

  public get position(): ICellPosition {
    return this._position;
  }

  public get isMine(): boolean {
    return this._isMine;
  }

  public get MinesNearCount(): number {
    return this._minesNearCount;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }
  public set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
  }

  private get board(): IBoard {
    return this._board;
  }

  public get index(): number {
    return this.position.x + this.board.size.width * this.position.y;
  }
};

const GameField = ({ width, height }: GameFieldProps) => {
  const count = width * height;

  const [cells, setCells] = useState(() =>
    fillNumbers(gameFieldArray(width, height, 10))
  );

  const handleOpen = useCallback((index: number, isMark: boolean) => {
    setCells((current) => {
      current[index].isOpen = true;
      return [...current];
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div className={`grid gap-2 grid-cols-${width} grid-rows-${height} p-4`}>
        {Array.from({ length: count }, (_, i) => {
          return (
            <Cell
              key={i}
              index={i}
              isMine={cells[i].isMine}
              minesNearCount={cells[i].minesNearCount}
              isOpen={cells[i].isOpen}
              onOpen={handleOpen}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameField;
