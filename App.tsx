import useFirebaseMessaging from 'hooks/useMessaging';
import MainNavigation from 'navigation/MainNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from 'store/store';
import { ThemeProvider } from 'theme/ThemeContext';

const App = () => {
  useFirebaseMessaging();
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <MainNavigation />
        </Provider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
