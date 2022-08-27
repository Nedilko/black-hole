import type { Results } from '../store/gameSlice';
export enum DIFFUCULTY {
  EASY,
  MEDIUM,
  HARD,
  CUSTOM,
}

export const getDefaultResults = (): Results => {
  return {
    [DIFFUCULTY.EASY]: 0,
    [DIFFUCULTY.MEDIUM]: 0,
    [DIFFUCULTY.HARD]: 0,
    [DIFFUCULTY.CUSTOM]: 0,
  };
};
