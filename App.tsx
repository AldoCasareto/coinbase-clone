import AppNavigator from './src/navigation/AppNavigator';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import watchlistReducer from './src/store/reducers/watchlist';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
