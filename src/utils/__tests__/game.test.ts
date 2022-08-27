import { getDefaultResults } from '../game';
import { DIFFUCULTY } from '../game';

describe('game', () => {
  it('getDefaultResults', () => {
    expect(getDefaultResults()).toEqual({
      [DIFFUCULTY.EASY]: 0,
      [DIFFUCULTY.MEDIUM]: 0,
      [DIFFUCULTY.HARD]: 0,
      [DIFFUCULTY.CUSTOM]: 0,
    });
  });
});
