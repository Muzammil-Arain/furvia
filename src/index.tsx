import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';
import { ThemeProvider } from './context/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import { toastRef } from './util/toast';
import { navigationRef } from './util/navigation';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <ThemeProvider>
        <ToastProvider
          ref={toastRef}
          placement="top"
          duration={3000}
          animationType="slide-in"
          swipeEnabled={true}
        >
          <AppNavigator />
        </ToastProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
