import React, { ReactNode, useReducer } from 'react';
import { IBoardSize } from '../game/board';
import { getDefaultSettings, getSettings } from './defaults';

export interface ISettings {
  size: IBoardSize;
  holesCount: number;
}

const defaultSettings: ISettings = getDefaultSettings();

const SET_SETTINGS = 'setSettings';
const SET_DEFAULT_SETTINGS = 'setDefaultSettings';
const SET_LAST_SETTINGS = 'setLastSettings';

type Action =
  | { type: 'setSettings'; payload: ISettings }
  | { type: 'setDefaultSettings' }
  | { type: 'setLastSettings' };
export type Dispatch = (action: Action) => void;

const SettingsDataContext = React.createContext<ISettings | undefined>(
  undefined
);
const SettingsDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

export const SettingsActions: {
  [key: string]: (payload: ISettings) => Action;
} = {
  setSettings: (payload: ISettings) => ({
    type: SET_SETTINGS,
    payload,
  }),
  setDefaultSettings: () => ({ type: SET_DEFAULT_SETTINGS }),
  setLastSettings: () => ({ type: SET_LAST_SETTINGS }),
};

const settingsReducer = (state: ISettings, action: Action) => {
  switch (action.type) {
    case SET_SETTINGS: {
      return getSettings(action.payload);
    }
    case SET_DEFAULT_SETTINGS: {
      return getDefaultSettings();
    }
    case SET_LAST_SETTINGS: {
      return getSettings(state);
    }
  }
};

type ProviderProps = {
  children: ReactNode;
};

const SettingsContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(settingsReducer, defaultSettings);
  return (
    <SettingsDataContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsDataContext.Provider>
  );
};

export {
  SettingsContextProvider,
  SettingsDataContext,
  SettingsDispatchContext,
};
