import { combineReducers, configureStore } from '@reduxjs/toolkit';
import watchlistReducer from './features/watchlistSlice';

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
