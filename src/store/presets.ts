import { FieldSettings } from './actions/field';
import { DIFFUCULTY } from './actions/game';

export const PRESET: Omit<
  Record<DIFFUCULTY, FieldSettings>,
  DIFFUCULTY.CUSTOM
> = {
  [DIFFUCULTY.EASY]: {
    size: {
      width: 8,
      height: 8,
    },
    holesCount: 10,
  },
  [DIFFUCULTY.MEDIUM]: {
    size: {
      width: 15,
      height: 15,
    },
    holesCount: 20,
  },
  [DIFFUCULTY.HARD]: {
    size: {
      width: 20,
      height: 20,
    },
    holesCount: 30,
  },
};

export const getPresetName = (difficulty: DIFFUCULTY) => {
  switch (difficulty) {
    case DIFFUCULTY.EASY:
      return 'Easy';
    case DIFFUCULTY.MEDIUM:
      return 'Medium';
    case DIFFUCULTY.HARD:
      return 'Hard';
    default:
      return 'Custom';
  }
};
