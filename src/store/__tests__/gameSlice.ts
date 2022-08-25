import gameReducer, {
  finishGame,
  restartGame,
  showGameField,
  startGame,
} from '../gameSlice';
import * as hooks from '../../hooks';
import { renewField, setupField } from '../fieldSlice';
import { setupStore } from '..';

describe('game reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle initial state', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual({
      difficulty: 0,
      isFinished: false,
      isStarted: false,
      isWon: false,
      results: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
      },
      showCounter: false,
      showGameControls: false,
      showGameField: false,
      showSettings: true,
      showTime: false,
      time: 0,
      remainingCellsCount: 0,
      totalCellsCount: 0,
    });
  });

  it('should handle finishGame', () => {
    const actual = gameReducer(undefined, {
      type: 'game/finishGame',
    });
    expect(actual).toEqual({
      difficulty: 0,
      isFinished: true,
      isStarted: false,
      isWon: false,
      results: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
      },
      showCounter: false,
      showGameControls: true,
      showGameField: false,
      showSettings: true,
      showTime: false,
      time: 0,
      remainingCellsCount: 0,
      totalCellsCount: 0,
    });
  });

  it('should handle showMainMenu', () => {
    const actual = gameReducer(undefined, {
      type: 'game/showMainMenu',
    });
    expect(actual).toEqual({
      difficulty: 0,
      isFinished: false,
      isStarted: false,
      isWon: false,
      results: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
      },
      showCounter: false,
      showGameControls: false,
      showGameField: false,
      showSettings: true,
      showTime: false,
      time: 0,
      remainingCellsCount: 0,
      totalCellsCount: 0,
    });
  });

  it('should handle showGameField', () => {
    const actual = gameReducer(undefined, {
      type: 'game/showGameField',
    });
    expect(actual).toEqual({
      difficulty: 0,
      isFinished: false,
      isStarted: false,
      isWon: false,
      results: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
      },
      showCounter: true,
      showGameControls: false,
      showGameField: true,
      showSettings: false,
      showTime: true,
      time: 0,
      remainingCellsCount: 0,
      totalCellsCount: 0,
    });
  });

  it('should handle updateTime', () => {
    const actual = gameReducer(undefined, {
      type: 'game/updateTime',
    });
    expect(actual).toEqual({
      difficulty: 0,
      isFinished: false,
      isStarted: false,
      isWon: false,
      results: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
      },
      showCounter: false,
      showGameControls: false,
      showGameField: false,
      showSettings: true,
      showTime: false,
      time: 1,
      remainingCellsCount: 0,
      totalCellsCount: 0,
    });
  });

  it('should handle startCountdown', () => {
    const actual = gameReducer(undefined, {
      type: 'game/startCountdown',
    });
    expect(actual).toEqual({
      difficulty: 0,
      isFinished: false,
      isStarted: true,
      isWon: false,
      results: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
      },
      showCounter: false,
      showGameControls: false,
      showGameField: false,
      showSettings: true,
      showTime: false,
      time: 0,
      remainingCellsCount: 0,
      totalCellsCount: 0,
    });
  });

  it('should dispatch restart game inner dispatches', () => {
    const thunk = restartGame();
    const disp = jest.fn();
    thunk(disp);

    expect(disp).toHaveBeenCalledTimes(2);
    expect(disp).toHaveBeenCalledWith(renewField());
    expect(disp).toHaveBeenCalledWith(showGameField());
  });

  it('should dispatch start game inner dispatches', () => {
    const size = { width: 10, height: 10 };
    const holesCount = 10;

    const thunk = startGame(size, holesCount);
    const disp = jest.fn();
    thunk(disp);

    expect(disp).toHaveBeenCalledTimes(2);
    expect(disp).toHaveBeenCalledWith(setupField({ size, holesCount }));
    expect(disp).toHaveBeenCalledWith(showGameField());
  });
});
