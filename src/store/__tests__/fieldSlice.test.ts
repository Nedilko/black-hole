import { setupStore } from '..';
import fieldReducer, {
  FieldSize,
  openCell,
  renewField,
  setupField,
  toggleMarkCell,
} from '../fieldSlice';
jest.mock('../../game/logic', () => ({
  ...jest.requireActual('../../game/logic'),
  getHolesIndexes: <T extends number>(
    { width, height }: FieldSize,
    holesCount: number
  ): T[] => {
    return Array.from({ length: holesCount }, () => width * height - 1) as T[];
  },
}));

describe('field reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle initial state', () => {
    expect(fieldReducer(undefined, { type: 'unknown' })).toEqual({
      cells: [],
      holesCount: 10,
      holesIndexes: [63, 63, 63, 63, 63, 63, 63, 63, 63, 63],
      openedCellIndexes: [],
      remainingCellsCount: 54,
      size: {
        width: 8,
        height: 8,
      },
      totalCellsCount: 54,
    });
  });

  it('should handle setupField', () => {
    const actual = fieldReducer(
      undefined,
      setupField({
        size: {
          width: 3,
          height: 3,
        },
        holesCount: 1,
      })
    );
    expect(actual).toEqual({
      cells: [
        {
          index: 0,
          isHole: false,
          isOpen: false,
          isMarked: false,
          holesNearCount: 0,
          position: {
            x: 0,
            y: 0,
          },
        },
        {
          index: 1,
          isHole: false,
          isOpen: false,
          isMarked: false,
          holesNearCount: 0,
          position: {
            x: 1,
            y: 0,
          },
        },
        {
          index: 2,
          isHole: false,
          isOpen: false,
          isMarked: false,
          holesNearCount: 0,
          position: {
            x: 2,
            y: 0,
          },
        },
        {
          index: 3,
          isHole: false,
          isOpen: false,
          isMarked: false,
          holesNearCount: 0,
          position: {
            x: 0,
            y: 1,
          },
        },
        {
          index: 4,
          isHole: false,
          isOpen: false,
          isMarked: false,
          holesNearCount: 1,
          position: {
            x: 1,
            y: 1,
          },
        },
        {
          index: 5,
          isHole: false,
          isOpen: false,
          isMarked: false,
          holesNearCount: 1,
          position: {
            x: 2,
            y: 1,
          },
        },
        {
          index: 6,
          isHole: false,
          isOpen: false,
          isMarked: false,
          holesNearCount: 0,
          position: {
            x: 0,
            y: 2,
          },
        },
        {
          index: 7,
          isHole: false,
          isOpen: false,
          isMarked: false,
          holesNearCount: 1,
          position: {
            x: 1,
            y: 2,
          },
        },
        {
          index: 8,
          isHole: true,
          isOpen: false,
          isMarked: false,
          holesNearCount: 0,
          position: {
            x: 2,
            y: 2,
          },
        },
      ],
      holesCount: 1,
      holesIndexes: [8],
      openedCellIndexes: [],
      remainingCellsCount: 8,
      size: {
        width: 3,
        height: 3,
      },
      totalCellsCount: 8,
    });
  });

  it('should handle renewField', () => {
    const store = setupStore();
    store.dispatch(
      setupField({ size: { width: 3, height: 3 }, holesCount: 1 })
    );
    const actual = fieldReducer(store.getState().field, renewField());
    expect(actual).toEqual({
      cells: [
        {
          holesNearCount: 0,
          index: 0,
          isHole: false,
          isMarked: false,
          isOpen: false,
          position: {
            x: 0,
            y: 0,
          },
        },
        {
          holesNearCount: 0,
          index: 1,
          isHole: false,
          isMarked: false,
          isOpen: false,
          position: {
            x: 1,
            y: 0,
          },
        },
        {
          holesNearCount: 0,
          index: 2,
          isHole: false,
          isMarked: false,
          isOpen: false,
          position: {
            x: 2,
            y: 0,
          },
        },
        {
          holesNearCount: 0,
          index: 3,
          isHole: false,
          isMarked: false,
          isOpen: false,
          position: {
            x: 0,
            y: 1,
          },
        },
        {
          holesNearCount: 1,
          index: 4,
          isHole: false,
          isMarked: false,
          isOpen: false,
          position: {
            x: 1,
            y: 1,
          },
        },
        {
          holesNearCount: 1,
          index: 5,
          isHole: false,
          isMarked: false,
          isOpen: false,
          position: {
            x: 2,
            y: 1,
          },
        },
        {
          holesNearCount: 0,
          index: 6,
          isHole: false,
          isMarked: false,
          isOpen: false,
          position: {
            x: 0,
            y: 2,
          },
        },
        {
          holesNearCount: 1,
          index: 7,
          isHole: false,
          isMarked: false,
          isOpen: false,
          position: {
            x: 1,
            y: 2,
          },
        },
        {
          holesNearCount: 0,
          index: 8,
          isHole: true,
          isMarked: false,
          isOpen: false,
          position: {
            x: 2,
            y: 2,
          },
        },
      ],
      holesCount: 1,
      holesIndexes: [8],
      openedCellIndexes: [],
      remainingCellsCount: 8,
      size: {
        height: 3,
        width: 3,
      },
      totalCellsCount: 8,
    });
  });

  it('should handle openCell', () => {
    const store = setupStore();
    store.dispatch(
      setupField({ size: { width: 3, height: 3 }, holesCount: 1 })
    );
    const thunk = openCell(0);
    thunk(store.dispatch, store.getState);

    expect(store.getState().field.cells[0]).toEqual({
      index: 0,
      isHole: false,
      isOpen: true,
      isMarked: false,
      holesNearCount: 0,
      position: {
        x: 0,
        y: 0,
      },
    });
  });

  it('should handle toggleMarkCell', () => {
    const store = setupStore();
    store.dispatch(
      setupField({ size: { width: 3, height: 3 }, holesCount: 1 })
    );
    const actual = fieldReducer(store.getState().field, toggleMarkCell(0));
    expect(actual.cells[0]).toEqual({
      index: 0,
      isHole: false,
      isOpen: false,
      isMarked: true,
      holesNearCount: 0,
      position: {
        x: 0,
        y: 0,
      },
    });
  });

  it('should handle toggleMarkCell on opened cell', () => {
    const store = setupStore();
    store.dispatch(
      setupField({ size: { width: 3, height: 3 }, holesCount: 1 })
    );
    const thunk = openCell(0);
    thunk(store.dispatch, store.getState);
    const actual = fieldReducer(store.getState().field, toggleMarkCell(0));
    expect(actual.cells[0]).toEqual({
      index: 0,
      isHole: false,
      isOpen: true,
      isMarked: false,
      holesNearCount: 0,
      position: {
        x: 0,
        y: 0,
      },
    });
  });

  it('should handle openAllHoles', () => {
    const store = setupStore();
    store.dispatch(
      setupField({ size: { width: 3, height: 3 }, holesCount: 1 })
    );
    const thunk = openCell(8);
    thunk(store.dispatch, store.getState);

    expect(store.getState().field.cells[8]).toEqual({
      index: 8,
      isHole: true,
      isOpen: true,
      isMarked: false,
      holesNearCount: 0,
      position: {
        x: 2,
        y: 2,
      },
    });
  });
});
