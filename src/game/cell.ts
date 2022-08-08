import type { IBoardWithCells } from './board';

export interface ICellPosition {
  x: number;
  y: number;
}

interface ICell {
  position: ICellPosition;
}

export interface IGameCell extends ICell {
  index: number;
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
    if (this.board.isFinished) {
      return;
    }

    if (this.isHole) {
      this.board.handleFinish();
      this.board.handleOpenAllHoles();
      return;
    }

    if (this.isOpen) {
      return;
    }

    if (this.board.remainingCellsCount === 1) {
      this.isOpen = true;
      this.board.handleFinish();
      return;
    }

    this.isOpen = true;

    this.board.handleOpenSurroundingCells(this.index);
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
