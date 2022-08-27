import { RootState } from '.';

export const selectGame = (state: RootState) => state.game;
export const selectField = (state: RootState) => state.field;
export const selectFieldSize = (state: RootState) => state.field.size;
export const selectFieldCells = (state: RootState) => state.field.cells;
