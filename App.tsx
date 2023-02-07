import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { store } from './src/store/store';

export type AppDispatch = typeof store.dispatch;

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
