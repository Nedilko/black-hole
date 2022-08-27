import {
  selectField,
  selectFieldCells,
  selectFieldSize,
  selectGame,
} from '../selectors';
import { setupStore } from '../index';

describe('selectors', () => {
  it('selectGame', () => {
    const store = setupStore();
    const state = store.getState();
    expect(selectGame(state)).toEqual(state.game);
  });

  it('selectField', () => {
    const store = setupStore();
    const state = store.getState();
    expect(selectField(state)).toEqual(state.field);
  });

  it('selectFieldSize', () => {
    const store = setupStore();
    const state = store.getState();
    expect(selectFieldSize(state)).toEqual(state.field.size);
  });

  it('selectFieldCells', () => {
    const store = setupStore();
    const state = store.getState();
    expect(selectFieldCells(state)).toEqual(state.field.cells);
  });
});
