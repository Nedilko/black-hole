import React from 'react';
import { GameDataContext, GameDispatchContext } from '../store/GameStore';
import type { IGameData, Dispatch } from '../store/GameStore';

const useGameData = () => {
  const context = React.useContext(GameDataContext);
  if (context === undefined) {
    throw new Error('useGameData must be used within a GameContextProvider');
  }
  return context;
};

const useGameDispatch = () => {
  const context = React.useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useGameDispatch must be used within a GameContextProvider'
    );
  }
  return context;
};

const useGameStore = (): [IGameData, Dispatch] => {
  return [useGameData(), useGameDispatch()];
};

export { useGameStore, useGameData, useGameDispatch };
