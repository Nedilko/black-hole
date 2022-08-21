import { DIFFUCULTY, Results } from '../store/actions/game';

export const getDefaultResults = (): Results => {
  return {
    [DIFFUCULTY.EASY]: 0,
    [DIFFUCULTY.MEDIUM]: 0,
    [DIFFUCULTY.HARD]: 0,
    [DIFFUCULTY.CUSTOM]: 0,
  };
};
