import useFirebaseMessaging from 'hooks/useMessaging';
import MainNavigation from 'navigation/MainNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import MenuScreen from 'screens/petowner/Menu';
import store from 'store/store';

const App = () => {
  useFirebaseMessaging();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <MainNavigation />
        {/* <MenuScreen /> */}
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
