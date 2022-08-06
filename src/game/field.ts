import { getSize } from './helpers';

export const getPosition = (index: number, size: IBoardSize): ICellPosition => {
  const x = index % size.width;
  const y = Math.floor(index / size.width);
  return { x, y };
};

export const getIndex = (position: ICellPosition, size: IBoardSize): number => {
  return position.y * size.width + position.x;
};

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

export const getSurroundingIndexes = (
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

export const getGameCellsData = (board: IBoardWithCells): IGameCell[] => {
  const { size, holesCount } = board;
  const holesIndexes = getHolesIndexes(size, holesCount);

  return Array.from({ length: getSize(size) }, (_, i) => {
    const position = getPosition(i, size);
    const isHole = (index: number) => holesIndexes.includes(index);

    return GameCell.create(
      position,
      isHole(i),
      getSurroundingIndexes(position, size).filter(isHole).length,
      board
    );
  });
};

export interface IBoardSize {
  width: number;
  height: number;
}

export interface IBoard {
  size: IBoardSize;
  holesCount: number;
  holesIndexes: number[];
  handleOpenCell: (index: number) => void;
}

export interface IBoardWithCells extends IBoard {
  cells: IGameCell[];
  openedCellIndexes: number[];
}

export class GameBoard implements IBoardWithCells {
  private readonly _size: IBoardSize;
  private readonly _holesCount: number;
  private _holesIndexes: number[];
  private readonly _cells: IGameCell[];
  private _openCellCallback: (index: number) => void;
  private _openedCellIndexes: number[];

  constructor(
    size: IBoardSize,
    holesCount: number,
    holesIndexes: number[],
    openCellCallback: (index: number) => void
  ) {
    this._size = size;
    this._holesCount = holesCount;
    this._holesIndexes = holesIndexes;
    this._cells = getGameCellsData(this);
    this._openCellCallback = openCellCallback;
    this._openedCellIndexes = [];
  }

  public get size() {
    return this._size;
  }

  public get holesCount() {
    return this._holesCount;
  }

  public get holesIndexes() {
    return this._holesIndexes;
  }

  public get cells() {
    return this._cells;
  }

  public handleOpenCell(index: number) {
    this._openedCellIndexes.push(index);

    const surrounding = getSurroundingIndexes(
      this.cells[index].position,
      this.size
    );

    if (this.cells[index].holesNearCount === 0) {
      surrounding.forEach((i) => {
        if (!this.openedCellIndexes.includes(i)) {
          //TODO: setTimeout(() => this.cells[i].handleOpen(), 30);
          this.cells[i].handleOpen();
        }
      });
    }

    this._openCellCallback(index);
  }

  public get openedCellIndexes() {
    return this._openedCellIndexes;
  }

  public static create(
    size: IBoardSize,
    holesCount: number,
    holesIndexes: number[],
    openCellCallback: (index: number) => void
  ) {
    return new GameBoard(size, holesCount, holesIndexes, openCellCallback);
  }
}

interface ICellPosition {
  x: number;
  y: number;
}

interface ICell {
  position: ICellPosition;
}

export interface IGameCell extends ICell {
  isOpen: boolean;
  isHole: boolean;
  holesNearCount: number;
  handleOpen: () => void;
}

export class GameCell implements IGameCell {
  private readonly _position: ICellPosition;
  private _isOpen: boolean;
  private readonly _isHole: boolean;
  private readonly _holesNearCount: number;
  private readonly _board: IBoardWithCells;

  constructor(
    position: ICellPosition,
    isOpen: boolean,
    isHole: boolean,
    holesNearCount: number,
    board: IBoardWithCells
  ) {
    this._position = position;
    this._isOpen = isOpen;
    this._isHole = isHole;
    this._holesNearCount = holesNearCount;
    this._board = board;
    this.handleOpen = this.handleOpen.bind(this);
  }

  public get position(): ICellPosition {
    return this._position;
  }

  public get isHole(): boolean {
    return this._isHole;
  }

  public get holesNearCount(): number {
    return this._holesNearCount;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  private set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
  }

  private get board(): IBoardWithCells {
    return this._board;
  }

  public get index(): number {
    return this.position.x + this.board.size.width * this.position.y;
  }

  public handleOpen() {
    // if (this.isHole) {
    //   return;
    // }
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;

    this.board.handleOpenCell(this.index);
  }

  public static create(
    position: ICellPosition,
    isHole: boolean,
    holesNearCount: number,
    board: IBoardWithCells
  ): IGameCell {
    return new GameCell(position, false, isHole, holesNearCount, board);
  }
}
