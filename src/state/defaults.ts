import { IBoardSize } from '../game/field';

interface IGameSettings {
  size: IBoardSize;
  holesCount: number;
}

const easySettings: IGameSettings = {
  size: {
    width: 8,
    height: 8,
  },
  holesCount: 10,
};

const mediumSettings: IGameSettings = {
  size: {
    width: 15,
    height: 15,
  },
  holesCount: 20,
};

const hardSettings: IGameSettings = {
  size: {
    width: 20,
    height: 20,
  },
  holesCount: 30,
};

export const getDefaultSettings = (): IGameSettings =>
  Object.create({
    size: Object.create(easySettings.size),
    holesCount: easySettings.holesCount,
  });

const getSettings = (settings: IGameSettings): IGameSettings =>
  Object.create({
    size: Object.create(settings.size),
    holesCount: settings.holesCount,
  });

export const settings = {
  easy: getSettings(easySettings),
  medium: getSettings(mediumSettings),
  hard: getSettings(hardSettings),
};
