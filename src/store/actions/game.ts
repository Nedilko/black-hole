import { createSlice } from '@reduxjs/toolkit';

const defaultStateValue = {
  showGameField: false,
  showGameControls: false,
  remainingCellsCount: 0,
  totalCellsCount: 0,
  showTime: true,
  showCounter: true,
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
    updateRemainingCellsCount: (state, action) => {
      state.remainingCellsCount = action.payload;
    },
    updateTotalCellsCount: (state, action) => {
      state.totalCellsCount = action.payload;
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
  },
});

export default gameSlice.reducer;

export const gameActions = gameSlice.actions;
