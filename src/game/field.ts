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
  // onOpen: (position: ICellPosition) => void;
  // onMark: (postision: ICellPosition) => void;
}

const getPosition = (index: number, size: IBoardSize): ICellPosition => {
  const x = index % size.width;
  const y = Math.floor(index / size.width);
  return { x, y };
};

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

const getSurroundingIndexes = (position: ICellPosition, size: IBoardSize) => {
  const indexesArray: number[] = [];
  const { x, y } = position;
  const xMin = x - 1;
  const xMax = x + 1;
  const yMin = y - 1;
  const yMax = y + 1;
  for (let i = xMin; i <= xMax; i++) {
    for (let j = yMin; j <= yMax; j++) {
      if (i >= 0 && i < size.width && j >= 0 && j < size.height) {
        indexesArray.push(i + j * size.width);
      }
    }
  }
  return indexesArray;
};

export const getGameCellsData = (
  size: IBoardSize,
  holesCount: number
): IGameCell[] => {
  const holesIndexes = getHolesIndexes(size, holesCount);

  return Array.from({ length: getSize(size) }, (_, i) => {
    const position = getPosition(i, size);
    const isHole = (index: number) => holesIndexes.includes(index);

    return {
      isHole: isHole(i),
      position,
      holesNearCount: getSurroundingIndexes(position, size).filter(isHole)
        .length,
      isOpen: false,
    };
  });
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
