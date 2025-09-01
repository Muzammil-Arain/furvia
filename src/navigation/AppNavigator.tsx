import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import OnboardingScreen from '../screens/auth/onboarding';
import SplashScreen from '../screens/auth/splash';
import LoginScreen from '../screens/auth/login';
import VerificationScreen from '../screens/auth/verification';
import ForgotPasswordScreen from '../screens/auth/forgotpassword';
import NewPasswordScreen from '../screens/auth/newpassword';
import MapLocationScreen from '../screens/auth/maplocation';
import PetProfileScreen from '../screens/profile/pet';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="MapLocation" component={MapLocationScreen} />
      <Stack.Screen name="PetProfile" component={PetProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
