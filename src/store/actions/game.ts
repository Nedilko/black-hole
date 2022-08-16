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
    showGameField: (state) => {
      state.showGameField = true;
    },
    hideGameField: (state) => {
      state.showGameField = false;
    },
    showGameControls: (state) => {
      state.showGameControls = true;
    },
    hideGameControls: (state) => {
      state.showGameControls = false;
    },
    showCounter: (state) => {
      state.showCounter = true;
    },
    hideCounter: (state) => {
      state.showCounter = false;
    },
    showTime: (state) => {
      state.showTime = true;
    },
    hideTime: (state) => {
      state.showTime = false;
    },
    showSettings: (state) => {
      state.showSettings = true;
    },
    hideSettings: (state) => {
      state.showSettings = false;
    },
    finishGame: (state) => {
      state.showGameControls = true;
      state.showTime = false;
      state.showCounter = false;
    },
  },
});

export const showMainMenu = (): any => (dispatch: AppDispatch) => {
  dispatch(gameSlice.actions.hideGameField());
  dispatch(gameSlice.actions.hideGameControls());
  dispatch(gameSlice.actions.hideCounter());
  dispatch(gameSlice.actions.hideTime());
  dispatch(gameSlice.actions.showSettings());
};

export const restartGame = (): any => (dispatch: AppDispatch) => {
  dispatch(fieldActions.renewField());
  dispatch(gameSlice.actions.showCounter());
  dispatch(gameSlice.actions.showTime());
  dispatch(gameSlice.actions.hideGameControls());
};

export const startGame =
  (size: FieldSize, holesCount: number): any =>
  (dispatch: AppDispatch): any => {
    dispatch(fieldActions.setupField({ size, holesCount }));
    dispatch(gameSlice.actions.showGameField());
    dispatch(gameSlice.actions.hideGameControls());
    dispatch(gameSlice.actions.showCounter());
    dispatch(gameSlice.actions.showTime());
    dispatch(gameSlice.actions.hideSettings());
  };

export default gameSlice.reducer;

export const gameActions = gameSlice.actions;
