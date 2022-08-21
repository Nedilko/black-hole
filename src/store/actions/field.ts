import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCellSurroundingIndexes, getHolesIndexes } from '../../game/logic';
import { gameActions } from './game';

export interface CellPosition {
  x: number;
  y: number;
}

export interface FieldCell {
  index: number;
  position: CellPosition;
  isHole: boolean;
  isOpen: boolean;
  isMarked: boolean;
  holesNearCount: number;
}

export interface FieldSize {
  width: number;
  height: number;
}

export interface FieldSettings {
  size: FieldSize;
  holesCount: number;
}

interface FieldState extends FieldSettings {
  holesIndexes: number[];
  cells: FieldCell[];
  remainingCellsCount: number;
  totalCellsCount: number;
  openedCellIndexes: number[];
}

const getCellsWithData = (
  size: FieldSize,
  holesIndexes: number[]
): FieldCell[] => {
  const isHole = (index: number) => holesIndexes.includes(index);
  const { width, height } = size;
  const result: FieldCell[] = [];
  for (let i = 0, index = 0; i < height; i++) {
    for (let j = 0; j < width; j++, index++) {
      const position = { x: j, y: i };
      result.push({
        index,
        position,
        isHole: isHole(index),
        isOpen: false,
        isMarked: false,
        holesNearCount: getCellSurroundingIndexes(position, size).filter(isHole)
          .length,
      });
    }
  }
  return result;
};

const getTotalCellsCount = (size: FieldSize, holesCount: number): number =>
  size.width * size.height - holesCount;

const defaultSize: FieldSize = { width: 8, height: 8 };
const defaultHolesCount: number = 10;
const defaultHolesIndexes: number[] = getHolesIndexes(
  defaultSize,
  defaultHolesCount
);
const totalCellsCount = getTotalCellsCount(defaultSize, defaultHolesCount);

const defaultStateValue: FieldState = {
  size: defaultSize,
  holesCount: defaultHolesCount,
  holesIndexes: defaultHolesIndexes,
  cells: [],
  remainingCellsCount: totalCellsCount,
  totalCellsCount: totalCellsCount,
  openedCellIndexes: [],
};

const fieldSlice = createSlice({
  name: 'settings',
  initialState: defaultStateValue,
  reducers: {
    setupField: (
      state,
      action: PayloadAction<{ size: FieldSize; holesCount: number }>
    ) => {
      const { size, holesCount } = action.payload;
      const holesIndexes = getHolesIndexes(size, holesCount);
      const totalCellsCount = getTotalCellsCount(size, holesCount);
      state.size = size;
      state.holesCount = holesCount;
      state.holesIndexes = holesIndexes;
      state.cells = getCellsWithData(size, holesIndexes);
      state.remainingCellsCount = totalCellsCount;
      state.totalCellsCount = totalCellsCount;
      state.openedCellIndexes = [];
    },
    renewField: (state) => {
      const holesIndexes = getHolesIndexes(state.size, state.holesCount);
      state.holesIndexes = holesIndexes;
      state.cells = getCellsWithData(state.size, holesIndexes);
      state.remainingCellsCount = state.totalCellsCount;
      state.openedCellIndexes = [];
    },
    openCell: (state, action: PayloadAction<number>) => {
      state.cells[action.payload].isOpen = true;
      state.remainingCellsCount--;
      state.openedCellIndexes.push(action.payload);
    },
    toggleMarkCell: (state, action: PayloadAction<number>) => {
      if (!state.cells[action.payload].isOpen) {
        state.cells[action.payload].isMarked =
          !state.cells[action.payload].isMarked;
      }
    },
    openAllHoles: (state) => {
      state.holesIndexes.forEach((index) => {
        state.cells[index].isOpen = true;
      });
    },
  },
});

export const openCell =
  (index: number): any =>
  (dispatch: any, getState: any) => {
    const { field, game } = getState();

    if (!game.isStarted && !game.isFinished) {
      dispatch(gameActions.startCountdown());
    }

    if (
      field.cells[index].isOpen ||
      field.cells[index].isMarked ||
      game.isFinished
    )
      return;

    if (field.cells[index].isHole) {
      dispatch(fieldActions.openAllHoles());
      dispatch(gameActions.finishGame());
      return;
    }

    if (field.remainingCellsCount === 1) {
      dispatch(fieldActions.openCell(index));
      dispatch(gameActions.winGame());
      return;
    }

    dispatch(fieldActions.openCell(index));

    if (field.cells[index].holesNearCount === 0) {
      getCellSurroundingIndexes(
        field.cells[index].position,
        field.size
      ).forEach((i) => {
        if (!field.openedCellIndexes.includes(i)) {
          dispatch(openCell(i));
        }
      });
    }
  };

export default fieldSlice.reducer;

export const fieldActions = fieldSlice.actions;
