import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FieldSize } from './field';
import type { AppDispatch } from '..';
import { fieldActions } from './field';
import { loadResults } from '../../utils';

export enum DIFFUCULTY {
  EASY,
  MEDIUM,
  HARD,
  CUSTOM,
}

export interface Results {
  [DIFFUCULTY.EASY]: number;
  [DIFFUCULTY.MEDIUM]: number;
  [DIFFUCULTY.HARD]: number;
  [DIFFUCULTY.CUSTOM]: number;
}

export interface GameState {
  showGameField: boolean;
  showGameControls: boolean;
  remainingCellsCount: number;
  totalCellsCount: number;
  showTime: boolean;
  showCounter: boolean;
  showSettings: boolean;
  time: number;
  isStarted: boolean;
  isFinished: boolean;
  isWon: boolean;
  difficulty: DIFFUCULTY;
  results: Results;
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
  isStarted: false,
  isFinished: false,
  isWon: false,
  difficulty: DIFFUCULTY.EASY,
  results: loadResults(),
};

const gameSlice = createSlice({
  name: 'game',
  initialState: defaultStateValue,
  reducers: {
    finishGame(state) {
      state.showGameControls = true;
      state.isFinished = true;
      state.isStarted = false;
    },
    showMainMenu(state) {
      state.showGameField = false;
      state.showGameControls = false;
      state.showCounter = false;
      state.showTime = false;
      state.showSettings = true;
      state.time = 0;
      state.isFinished = false;
      state.isWon = false;
    },
    showGameField(state) {
      state.showGameControls = false;
      state.showCounter = true;
      state.showTime = true;
      state.showSettings = false;
      state.showGameField = true;
      state.time = 0;
      state.isFinished = false;
      state.isWon = false;
    },
    updateTime(state) {
      state.time++;
    },
    startCountdown(state) {
      state.isStarted = true;
    },
    winGame(state) {
      state.isWon = true;
      state.showGameField = false;
      state.showGameControls = true;
      state.isFinished = true;
      state.isStarted = false;
      if (
        state.results[state.difficulty] > state.time ||
        state.results[state.difficulty] === 0
      ) {
        state.results[state.difficulty] = state.time;
      }
    },
    registerDifficulty(state, action: PayloadAction<DIFFUCULTY>) {
      state.difficulty = action.payload;
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
