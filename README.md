# Find Black Holes Application

This project due to Take Home Interview. \
To start application in development mode please run `npm start`. \
Application available at [http://localhost:3000](http://localhost:3000)

---
## Part 1: (main data structure)

Data structure was choosen due to application functionality. \
It consists of 4 major parts:
- Board
- Cell 
- Game
- Settings

Architecture was constructed in such way, where you can easily replace main game engine with any other, that implements it's interface. \
Also, main game engine (open cell, populate black holes, open hole, finish game) implemented as custom react hook.

As state manager I use React hooks and Context API. \
This was enough for this kind of application.
### Board

Board consists of Cells. \
Board operate for opening cells.
#### Data structure of board:
```typescript
remainingCellsCount: number;
holesCount: number;
holesIndexes: number[];
cells: IGameCell[];
openedCellIndexes: number[];
isFinished: boolean;
handleFinish: () => void;
handleOpenSurroundingCells: (cell: IGameCell) => void;
handleOpenAllHoles: () => void;
```

The most interesting class methods are `handleOpenSurroundingCells` and `handleOpenAllHoles`

Method `handleOpenSurroundingCells` calculates indexes of cells which surround opened cell and if there are no black holes it openes each surrounding cell.

This methos invokes in particular ocattions when cell opens. \
Using my implementation I it recursively invokes this method for each cell if particular conditions meets. \

`setTimeout` here is only for UI animating decorations.
```typescript
public handleOpenSurroundingCells(cell: IGameCell) {
  this._openedCellIndexes.push(cell.index);

  const surrounding = getCellSurroundingIndexes(cell.position, this.size);

  if (cell.holesNearCount === 0) {
    surrounding.forEach((i) => {
      if (!this.openedCellIndexes.includes(i)) {
        setTimeout(() => this.cells[i].handleOpen(), 40);
      }
    });
  }

  this._openCellCallback(cell.index);
}
```
Method `handleOpenAllHoles` gets all cella which are black holes, and opens them.

This method invokes only if black hole cell was opened.
```typescript
public handleOpenAllHoles() {
  const cellsWithHoles = this.cells.filter((cell) => cell.isHole);
  cellsWithHoles.forEach((cell) => {
    this._openedCellIndexes.push(cell.index);
    cell.isOpen = true;
    this._openCellCallback(cell.index);
  });
}
```

#### Compelete Board class:
```typescript
class GameBoard implements IBoardWithCells {
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

  public handleOpenSurroundingCells(cell: IGameCell) {
    this._openedCellIndexes.push(cell.index);

    const surrounding = getCellSurroundingIndexes(cell.position, this.size);

    if (cell.holesNearCount === 0) {
      surrounding.forEach((i) => {
        if (!this.openedCellIndexes.includes(i)) {
          setTimeout(() => this.cells[i].handleOpen(), 40);
        }
      });
    }

    this._openCellCallback(cell.index);
  }

  public handleOpenAllHoles() {
    const cellsWithHoles = this.cells.filter((cell) => cell.isHole);
    cellsWithHoles.forEach((cell) => {
      this._openedCellIndexes.push(cell.index);
      cell.isOpen = true;
      this._openCellCallback(cell.index);
    });
  }

  public handleFinish() {
    this.isFinished = true;
    this._finishCallback();
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
```
### Cell

Cell structure consists of its position on board, index, if this cell is black hole, count of holes near, if its open and link to board which cell refers and cell open handler
```typescript
position: ICellPosition;
index: number;
isOpen: boolean;
isHole: boolean;
holesNearCount: number;
handleOpen: () => void;
```

The most interesting class method is `handleOpen`. \
It checks if cell is black hole, if cell is open and if surrounding cells should be opened recursively.
```typescript
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

  this.board.handleOpenSurroundingCells(this);
}
```

---
## Part 2: (Populate black holes)

I decided to randomly place all black holes and distribute random placement on all board size. \
This is done via method `getHolesIndexes`. \
Here I randomly fill array of black holes indexes until this array length reaches predefined black holes amount. \

Black hole's random index calculates using this formula `randomIndex = Math.floor(Math.random() * (width * height))`, where *width* and *height* are board dimentions.
```typescript
const getHolesIndexes = (
  { width, height }: IBoardSize,
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
```

---
## Part 3: (adjucent black holes count)

I use method `getCellSurroundingIndexes` to calculate index of cells, which surround specific cell. \
Here I take into account that call can be positioned near board borders, and also I not count specific cell itself.

```typescript
const getCellSurroundingIndexes = (
  { x, y }: ICellPosition,
  { width, height }: IBoardSize
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
```

---
## Part 4: (open cells recursively)

Each cell has precalculated amount of black adjucent black holes. \
If cell has 0 (zero) adjucent black holes, it starts the recursively opening all surrounding cells. Each cell in its turn does the same. \
Here I added a condition to check if this cell is already opened, because each two near cells can start opening each other infinitely. \
Also I added slow animation effect for better UI experience.
```typescript
if (cell.holesNearCount === 0) {
  surrounding.forEach((i) => {
    if (!this.openedCellIndexes.includes(i)) {
      setTimeout(() => this.cells[i].handleOpen(), 40);
    }
  });
}
```

---
## Part 5: (UI/UX)

I Used ReactJS as UI library, typescript for better data structure control, React context API and hooks for application store, Tailwind as atomic css library.

I added a simple menu for defining game setup such as board size (width and height) and black holes amount.

As was mentioned in the requirements, I didn't implement ***flag*** functionality.

As base for project I used Create React App, so that I could start imeplemnting as soon as possible.

UI Design was made by myself and based on my own preferences.