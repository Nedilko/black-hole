import { createSlice } from '@reduxjs/toolkit';
import { IBoardSize } from '../../game/board';

export interface ISettings {
  size: IBoardSize;
  holesCount: number;
}
const defaultStateValue = { holesCount: 10, size: { width: 8, height: 8 } };

const settingsSlice = createSlice({
  name: 'settings',
  initialState: defaultStateValue,
  reducers: {
    setSettings: (state, action) => {
      state.size = action.payload.size;
      state.holesCount = action.payload.holesCount;
    },
    setDefaultSettings: (state) => {
      state.size = defaultStateValue.size;
      state.holesCount = defaultStateValue.holesCount;
    },
    setLastSettings: (state) => {
      state.size = { width: state.size.width, height: state.size.height };
    },
  },
});

export default settingsSlice.reducer;

export const settingsActions = settingsSlice.actions;
