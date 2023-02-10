import { combineReducers, configureStore } from '@reduxjs/toolkit';
import topmoversReducer from './features/topmovers/topmoversSlice';
import watchlistReducer from './features/watchlist/watchlistSlice';
import newsReducer from './features/news/newsSlice';

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
  topMovers: topmoversReducer,
  news: newsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
