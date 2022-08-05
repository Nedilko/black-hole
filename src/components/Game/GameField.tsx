import { useCallback } from 'react';
import { useState } from 'react';
import Cell from './Cell';

type GameFieldProps = {
  width: number;
  height: number;
};

const getHolesIndexes = (size: number, holesCount: number): number[] => {
  const randIndexes: number[] = [];
  while (randIndexes.length < holesCount) {
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
  holessCount: number;
  holesIndexes: number[];
  cells: ICell[];
  handleHoleClick: (index: number) => void;
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
  isHole: boolean;
  holesNearCount: number;
}

const gameFieldArray = (
  width: number,
  height: number,
  holesCount: number
): IGameCell[] => {
  const size = width * height;
  const holesIndexes = getHolesIndexes(size, holesCount);

  const gameField: IGameCell[] = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      gameField.push({
        isHole: holesIndexes.includes(i * width + j),
        position: {
          x: i,
          y: j,
        },
        holesNearCount: 0,
        isOpen: false,
      });
    }
  }
  return gameField;
};

const fillNumbers = (gameField: IGameCell[]) => {
  gameField.forEach((cell) => {
    if (!cell.isHole) {
      const holesNearCount = gameField
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
        .filter((c) => c.isHole).length;
      cell.holesNearCount = holesNearCount;
    }
  });

  return gameField;
};

let CellItem = class {
  private readonly _position: ICellPosition;
  private _isOpen: boolean;
  private readonly _isHole: boolean;
  private readonly _holesNearCount: number;
  private readonly _board: IBoard;

  constructor(
    position: ICellPosition,
    isOpen: boolean,
    isHole: boolean,
    holesNearCount: number,
    board: IBoard
  ) {
    this._position = position;
    this._isOpen = isOpen;
    this._isHole = isHole;
    this._holesNearCount = holesNearCount;
    this._board = board;
  }

  public get position(): ICellPosition {
    return this._position;
  }

  private get isHole(): boolean {
    return this._isHole;
  }

  public get HolesNearCount(): number {
    return this._holesNearCount;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  private set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
  }

  private get board(): IBoard {
    return this._board;
  }

  public open(): void {
    this.isOpen = true;
    if (this.isHole) {
      this.board.cells.forEach((cell) => {
        cell.isOpen = true;
      });
      this.board.handleHoleClick(this.index);
    }
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
              isHole={cells[i].isHole}
              holesNearCount={cells[i].holesNearCount}
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
