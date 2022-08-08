import React, { useReducer, ReactNode } from 'react';

export interface IGameData {
  showGameField: boolean;
  showGameControls: boolean;
  remainingCellsCount: number;
  totalCellsCount: number;
}

const gameInitialSettings: IGameData = {
  showGameField: false,
  showGameControls: false,
  remainingCellsCount: 0,
  totalCellsCount: 0,
};

const SHOW_GAME_FIELD = 'showGameField';
const HIDE_GAME_FIELD = 'hideGameField';
const SHOW_GAME_CONTROLS = 'showGameControls';
const HIDE_GAME_CONTROLS = 'hideGameControls';
const UPDATE_REMAINIG_CELLS_COUNT = 'updateRemainingCellsCount';

interface PayloadedAction<T, P> {
  type: T;
  payload: P;
}

interface Action<T> {
  type: T;
}

interface IShowGameFieldAction extends Action<typeof SHOW_GAME_FIELD> {}
interface IHideGameFieldAction extends Action<typeof HIDE_GAME_FIELD> {}
interface IShowGameControlsAction extends Action<typeof SHOW_GAME_CONTROLS> {}
interface IHideGameControlsAction extends Action<typeof HIDE_GAME_CONTROLS> {}
interface IUpdateRemainingCellsCountAction
  extends PayloadedAction<typeof UPDATE_REMAINIG_CELLS_COUNT, number> {}

type GameActionsType =
  | IShowGameFieldAction
  | IHideGameFieldAction
  | IShowGameControlsAction
  | IHideGameControlsAction
  | IUpdateRemainingCellsCountAction;

function createPayloadedAction<
  T extends PayloadedAction<T['type'], T['payload']>
>(
  type: T['type']
): (payload: T['payload']) => PayloadedAction<T['type'], T['payload']> {
  return (payload: T['payload']) => ({
    type: type,
    payload,
  });
}

function createAction<T extends Action<T['type']>>(
  type: T['type']
): () => Action<T['type']> {
  return () => ({
    type: type,
  });
}

export const GameActions = {
  showGameField: createAction<IShowGameFieldAction>(SHOW_GAME_FIELD),
  hideGameField: createAction<IHideGameFieldAction>(HIDE_GAME_FIELD),
  showGameControls: createAction<IShowGameControlsAction>(SHOW_GAME_CONTROLS),
  hideGameControls: createAction<IHideGameControlsAction>(HIDE_GAME_CONTROLS),
  updateRemainingCellsCount:
    createPayloadedAction<IUpdateRemainingCellsCountAction>(
      UPDATE_REMAINIG_CELLS_COUNT
    ),
};

function assertNever(never: never) {
  console.error('Never touched');
}

const settingsReducer = (state: IGameData, action: GameActionsType) => {
  switch (action.type) {
    case SHOW_GAME_FIELD: {
      return { ...state, showGameField: true };
    }
    case HIDE_GAME_FIELD: {
      return { ...state, showGameField: false };
    }
    case SHOW_GAME_CONTROLS: {
      return { ...state, showGameControls: true };
    }
    case HIDE_GAME_CONTROLS: {
      return { ...state, showGameControls: false };
    }
    case UPDATE_REMAINIG_CELLS_COUNT: {
      return { ...state, remainingCellsCount: action.payload };
    }
    default:
      assertNever(action);
      return state;
  }
};

type ProviderProps = {
  children: ReactNode;
};

export type Dispatch = (action: GameActionsType) => void;

const GameDataContext = React.createContext<IGameData | undefined>(undefined);
const GameDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const GameContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(settingsReducer, gameInitialSettings);
  return (
    <GameDataContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameDataContext.Provider>
  );
};

export { GameContextProvider, GameDataContext, GameDispatchContext };
