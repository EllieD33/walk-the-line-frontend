import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import store from './src/store/store';
import AppContent from './src/AppContent';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <AppContent />
    </Provider>
  );
}