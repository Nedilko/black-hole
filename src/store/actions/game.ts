import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FieldSize } from './field';
import type { AppDispatch } from '..';
import { fieldActions } from './field';

export interface GameState {
  showGameField: boolean;
  showGameControls: boolean;
  remainingCellsCount: number;
  totalCellsCount: number;
  showTime: boolean;
  showCounter: boolean;
  showSettings: boolean;
  time: number;
  isFinished: boolean;
}

const defaultStateValue: GameState = {
  showGameField: false,
  showGameControls: false,
  remainingCellsCount: 0,
  totalCellsCount: 0,
  showTime: false,
  showCounter: false,
  showSettings: true,
  time: 0,
  isFinished: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: defaultStateValue,
  reducers: {
    finishGame(state) {
      state.showGameControls = true;
      state.showTime = false;
      state.showCounter = false;
      state.isFinished = true;
    },
    showMainMenu(state) {
      state.showGameField = false;
      state.showGameControls = false;
      state.showCounter = false;
      state.showTime = false;
      state.showSettings = true;
      state.time = 0;
      state.isFinished = false;
    },
    showGameField(state) {
      state.showGameControls = false;
      state.showCounter = true;
      state.showTime = true;
      state.showSettings = false;
      state.showGameField = true;
      state.time = 0;
      state.isFinished = false;
    },
    updateTime(state) {
      state.time++;
    },
  },
});

export const restartGame = (): any => (dispatch: AppDispatch) => {
  dispatch(fieldActions.renewField());
  dispatch(gameSlice.actions.showGameField());
};

export const startGame =
  (size: FieldSize, holesCount: number): any =>
  (dispatch: AppDispatch): any => {
    dispatch(fieldActions.setupField({ size, holesCount }));
    dispatch(gameSlice.actions.showGameField());
  };

export default gameSlice.reducer;

export const gameActions = gameSlice.actions;
