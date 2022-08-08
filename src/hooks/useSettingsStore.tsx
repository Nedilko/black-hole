import React from 'react';
import {
  SettingsDataContext,
  SettingsDispatchContext,
} from '../store/SettingsStore';
import type { ISettings, Dispatch } from '../store/SettingsStore';

const useSettingsData = () => {
  const context = React.useContext(SettingsDataContext);
  if (context === undefined) {
    throw new Error(
      'useSettingsData must be used within a SettingsContextProvider'
    );
  }
  return context;
};

const useSettingsDispatch = () => {
  const context = React.useContext(SettingsDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useSettingsDispatch must be used within a SettingsContextProvider'
    );
  }
  return context;
};

const useSettingsStore = (): [ISettings, Dispatch] => {
  return [useSettingsData(), useSettingsDispatch()];
};

export { useSettingsStore, useSettingsData, useSettingsDispatch };
