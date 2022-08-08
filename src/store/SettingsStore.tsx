import React, { ReactNode, useReducer } from 'react';
import { IBoardSize } from '../game/board';
import { getDefaultSettings } from './defaults';

export interface ISettings {
  size: IBoardSize;
  holesCount: number;
}

type Action =
  | { type: 'changeSettings'; payload: ISettings }
  | { type: 'setDefaultSettings' };
export type Dispatch = (action: Action) => void;

const SettingsDataContext = React.createContext<ISettings | undefined>(
  undefined
);
const SettingsDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const CHANGE_SETTINGS = 'changeSettings';
const SET_DEFAULT_SETTINGS = 'setDefaultSettings';

export const SettingsActions: {
  [key: string]: (payload: ISettings) => Action;
} = {
  changeSettings: (payload: ISettings) => ({
    type: CHANGE_SETTINGS,
    payload,
  }),
  setSettings: () => ({ type: SET_DEFAULT_SETTINGS }),
};

const settingsReducer = (state: ISettings, action: Action) => {
  switch (action.type) {
    case CHANGE_SETTINGS: {
      return { ...state, ...action.payload };
    }
    case SET_DEFAULT_SETTINGS: {
      return getDefaultSettings();
    }
  }
};

type ProviderProps = {
  children: ReactNode;
};

const SettingsContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(settingsReducer, getDefaultSettings());
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
