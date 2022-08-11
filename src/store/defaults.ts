import { SettingsState } from '../store/actions/settings';

const easySettings: SettingsState = {
  size: {
    width: 8,
    height: 8,
  },
  holesCount: 10,
};

const mediumSettings: SettingsState = {
  size: {
    width: 15,
    height: 15,
  },
  holesCount: 20,
};

const hardSettings: SettingsState = {
  size: {
    width: 20,
    height: 20,
  },
  holesCount: 30,
};

export const getDefaultSettings = (): SettingsState =>
  Object.create({
    size: Object.create(easySettings.size),
    holesCount: easySettings.holesCount,
  });

export const getSettings = (settings: SettingsState): SettingsState =>
  Object.create({
    size: Object.create(settings.size),
    holesCount: settings.holesCount,
  });

export const settings = {
  easy: getSettings(easySettings),
  medium: getSettings(mediumSettings),
  hard: getSettings(hardSettings),
};
