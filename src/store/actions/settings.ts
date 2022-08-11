import { createSlice } from '@reduxjs/toolkit';
import type { IBoardSize } from '../../game/board';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  size: IBoardSize;
  holesCount: number;
}
const defaultStateValue: SettingsState = {
  holesCount: 10,
  size: { width: 8, height: 8 },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: defaultStateValue,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsState>) => {
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
