import React, { useReducer, ReactNode } from 'react';

export interface IGameData {
  showGameField: boolean;
  showGameControls: boolean;
  remainingCellsCount: number;
  totalCellsCount: number;
  time: string;
  showTime: boolean;
}

const gameInitialSettings: IGameData = {
  showGameField: false,
  showGameControls: false,
  remainingCellsCount: 0,
  totalCellsCount: 0,
  time: '00:00',
  showTime: false,
};

const SHOW_GAME_FIELD = 'showGameField';
const HIDE_GAME_FIELD = 'hideGameField';
const SHOW_GAME_CONTROLS = 'showGameControls';
const HIDE_GAME_CONTROLS = 'hideGameControls';
const UPDATE_REMAINIG_CELLS_COUNT = 'updateRemainingCellsCount';
const UPDATE_TOTAL_CELLS_COUNT = 'updateTotalCellsCount';
const SHOW_TIME = 'showTime';
const HIDE_TIME = 'hideTime';

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
interface IUpdateTotalCellsCountAction
  extends PayloadedAction<typeof UPDATE_TOTAL_CELLS_COUNT, number> {}
interface IShowTimeAction extends Action<typeof SHOW_TIME> {}
interface IHideTimeAction extends Action<typeof HIDE_TIME> {}

type GameActionsType =
  | IShowGameFieldAction
  | IHideGameFieldAction
  | IShowGameControlsAction
  | IHideGameControlsAction
  | IUpdateRemainingCellsCountAction
  | IUpdateTotalCellsCountAction
  | IShowTimeAction
  | IHideTimeAction;

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
  updateTotalCellsCount: createPayloadedAction<IUpdateTotalCellsCountAction>(
    UPDATE_TOTAL_CELLS_COUNT
  ),
  showTime: createAction<IShowTimeAction>(SHOW_TIME),
  hideTime: createAction<IHideTimeAction>(HIDE_TIME),
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
    case UPDATE_TOTAL_CELLS_COUNT: {
      return { ...state, totalCellsCount: action.payload };
    }
    case SHOW_TIME: {
      return { ...state, showTime: true };
    }
    case HIDE_TIME: {
      return { ...state, showTime: false };
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
