import { getSize, getPosition, getIndex } from './helpers';
import { getHolesIndexes, getCellSurroundingIndexes } from './logic';
import type { IGameCell } from './cell';
import { GameCell } from './cell';

const getGameCellsArray = (board: IBoardWithCells): IGameCell[] => {
  const { size } = board;
  const holesIndexes = board.holesIndexes;

  return Array.from({ length: getSize(size) }, (_, i) => {
    const position = getPosition(i, size);
    const isHole = (index: number) => holesIndexes.includes(index);

    return GameCell.create(
      position,
      isHole(i),
      getCellSurroundingIndexes(position, size).filter(isHole).length,
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
}

export interface IBoardWithCells extends IBoard {
  remainingCellsCount: number;
  holesCount: number;
  holesIndexes: number[];
  cells: IGameCell[];
  openedCellIndexes: number[];
  isFinished: boolean;
  handleFinish: () => void;
  handleOpenSurroundingCells: (index: number) => void;
  handleOpenAllHoles: () => void;
}

export class GameBoard implements IBoard {
  private readonly _size: IBoardSize;
  private readonly _holesCount: number;
  private _holesIndexes: number[];
  private readonly _cells: IGameCell[];
  private _openCellCallback: (index: number) => void;
  private _finishCallback: () => void;
  private _openedCellIndexes: number[];
  private _isFinished: boolean;

  constructor(
    size: IBoardSize,
    holesCount: number,
    holesIndexes: number[],
    openCellCallback: (index: number) => void,
    finishCallback: () => void
  ) {
    this._size = size;
    this._holesCount = holesCount;
    this._holesIndexes = holesIndexes;
    this._cells = getGameCellsArray(this);
    this._openCellCallback = openCellCallback;
    this._finishCallback = finishCallback;
    this._openedCellIndexes = [];
    this._isFinished = false;
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

  public get isFinished() {
    return this._isFinished;
  }

  public set isFinished(value: boolean) {
    this._isFinished = value;
  }

  private get openedCellCount() {
    return this.cells.filter((cell) => !cell.isHole && cell.isOpen).length;
  }

  public get remainingCellsCount() {
    return this.cells.length - this.holesCount - this.openedCellCount;
  }

  public handleOpenSurroundingCells(index: number) {
    this._openedCellIndexes.push(index);

    const surrounding = getCellSurroundingIndexes(
      this.cells[index].position,
      this.size
    );

    if (this.cells[index].holesNearCount === 0) {
      surrounding.forEach((i) => {
        if (!this.openedCellIndexes.includes(i)) {
          setTimeout(() => this.cells[i].handleOpen(), 40);
        }
      });
    }

    this._openCellCallback(index);
  }

  public handleOpenAllHoles() {
    const cellsWithHoles = this.cells.filter((cell) => cell.isHole);
    cellsWithHoles.forEach((cell) => {
      const index = getIndex(cell.position, this.size);
      this._openedCellIndexes.push(index);
      cell.isOpen = true;
      this._openCellCallback(index);
    });
  }

  public handleFinish() {
    this.isFinished = true;
    this._finishCallback();
    console.log('GameBoard: finish');
  }

  public get openedCellIndexes() {
    return this._openedCellIndexes;
  }

  public static create(
    size: IBoardSize,
    holesCount: number,
    openCellCallback: (index: number) => void,
    finishCallback: () => void
  ) {
    const holesIndexes = getHolesIndexes(size, holesCount);
    return new GameBoard(
      size,
      holesCount,
      holesIndexes,
      openCellCallback,
      finishCallback
    );
  }
}
