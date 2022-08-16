import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import gameReducer from './actions/game';
import fieldReducer from './actions/field';

const rootReducer = combineReducers({
  game: gameReducer,
  field: fieldReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
