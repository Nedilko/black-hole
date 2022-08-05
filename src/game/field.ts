import { getSize } from './helpers';

export interface IBoardSize {
  width: number;
  height: number;
}

interface ICellPosition {
  x: number;
  y: number;
}

interface ICell {
  position: ICellPosition;
}

interface IGameCell extends ICell {
  isOpen: boolean;
  isHole: boolean;
  holesNearCount: number;
}

const getHolesIndexes = (size: IBoardSize, holesCount: number): number[] => {
  const indexesArray: number[] = [];
  while (indexesArray.length < holesCount) {
    const randomIndex = Math.floor(Math.random() * getSize(size));
    if (!indexesArray.includes(randomIndex)) {
      indexesArray.push(randomIndex);
    }
  }
  return indexesArray;
};

export const getGameCellsData = (
  size: IBoardSize,
  holesCount: number
): IGameCell[] => {
  const { width, height } = size;
  const holesIndexes = getHolesIndexes(size, holesCount);

  const gameField: IGameCell[] = [];
  //TODO: Array.from({ length: getSize(size) }, (_, i) => ({}))
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

// interface IBoard {
//   size: IBoardSize;
//   holessCount: number;
//   holesIndexes: number[];
//   cells: ICell[];
//   handleHoleClick: (index: number) => void;
// }

// let CellItem = class {
//   private readonly _position: ICellPosition;
//   private _isOpen: boolean;
//   private readonly _isHole: boolean;
//   private readonly _holesNearCount: number;
//   private readonly _board: IBoard;

//   constructor(
//     position: ICellPosition,
//     isOpen: boolean,
//     isHole: boolean,
//     holesNearCount: number,
//     board: IBoard
//   ) {
//     this._position = position;
//     this._isOpen = isOpen;
//     this._isHole = isHole;
//     this._holesNearCount = holesNearCount;
//     this._board = board;
//   }

//   public get position(): ICellPosition {
//     return this._position;
//   }

//   private get isHole(): boolean {
//     return this._isHole;
//   }

//   public get HolesNearCount(): number {
//     return this._holesNearCount;
//   }

//   public get isOpen(): boolean {
//     return this._isOpen;
//   }

//   private set isOpen(isOpen: boolean) {
//     this._isOpen = isOpen;
//   }

//   private get board(): IBoard {
//     return this._board;
//   }

//   public open(): void {
//     this.isOpen = true;
//     if (this.isHole) {
//       this.board.cells.forEach((cell) => {
//         cell.isOpen = true;
//       });
//       this.board.handleHoleClick(this.index);
//     }
//   }

//   public get index(): number {
//     return this.position.x + this.board.size.width * this.position.y;
//   }
// };

export const fillNumbers = (gameField: IGameCell[]) => {
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
