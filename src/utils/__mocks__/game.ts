import type { Results } from '../../store/gameSlice';
import { DIFFUCULTY } from '../../utils/game';

export const getDefaultResults = (): Results => {
  return {
    [DIFFUCULTY.EASY]: 0,
    [DIFFUCULTY.MEDIUM]: 1,
    [DIFFUCULTY.HARD]: 2,
    [DIFFUCULTY.CUSTOM]: 3,
  };
};
