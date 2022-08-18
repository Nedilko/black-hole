import { createSlice } from '@reduxjs/toolkit';
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
  time: string;
}

const defaultStateValue: GameState = {
  showGameField: false,
  showGameControls: false,
  remainingCellsCount: 0,
  totalCellsCount: 0,
  showTime: false,
  showCounter: false,
  showSettings: true,
  time: '00:00',
};

const gameSlice = createSlice({
  name: 'game',
  initialState: defaultStateValue,
  reducers: {
    finishGame: (state) => {
      state.showGameControls = true;
      state.showTime = false;
      state.showCounter = false;
    },
    showMainMenu: (state) => {
      state.showGameField = false;
      state.showGameControls = false;
      state.showCounter = false;
      state.showTime = false;
      state.showSettings = true;
    },
    showGameField(state) {
      state.showGameControls = false;
      state.showCounter = true;
      state.showTime = true;
      state.showSettings = false;
      state.showGameField = true;
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
  };;

export default gameSlice.reducer;

export const gameActions = gameSlice.actions;
