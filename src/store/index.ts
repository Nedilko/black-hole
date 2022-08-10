import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './actions/game';
import settingsReducer from './actions/settings';

export default configureStore({
  reducer: { game: gameReducer, settings: settingsReducer },
});
