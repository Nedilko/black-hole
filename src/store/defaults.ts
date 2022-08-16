import { FieldSettings } from './actions/field';

const easySettings: FieldSettings = {
  size: {
    width: 8,
    height: 8,
  },
  holesCount: 10,
};

const mediumSettings: FieldSettings = {
  size: {
    width: 15,
    height: 15,
  },
  holesCount: 20,
};

const hardSettings: FieldSettings = {
  size: {
    width: 20,
    height: 20,
  },
  holesCount: 30,
};

// export const getDefaultSettings = (): SettingsState =>
//   Object.create({
//     size: Object.create(easySettings.size),
//     holesCount: easySettings.holesCount,
//   });

export const getDefaultSettings = (): FieldSettings => easySettings;

export const getSettings = (settings: FieldSettings): FieldSettings =>
  Object.create({
    size: Object.create(settings.size),
    holesCount: settings.holesCount,
  });

export const settings = {
  easy: getSettings(easySettings),
  medium: getSettings(mediumSettings),
  hard: getSettings(hardSettings),
};
