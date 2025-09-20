import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COMMON_TEXT, SCREENS } from 'constants/index';
// import { useUserLoginStatus } from 'hooks/index';
import { useBackHandler, useTranslation } from 'hooks/index';
import { SignUp } from 'screens/auth';
import { screenOptions } from './Navigators';
import OnBoarding from 'screens/auth/Onboarding';
import Login from 'screens/auth/Login';
import ForgotPassword from 'screens/auth/ForgotPassword';
import Verification from 'screens/auth/Verification';
import ResetPassword from 'screens/auth/ResetPassword';
import MapLocationScreen from 'screens/pet/MapLocation';
import PetProfileScreen from 'screens/pet/PetProfile';
import CompletePetProfile from 'screens/pet/CompletePetProfile';
import UserType from 'screens/auth/UserType';

export const AuthNavigator = () => {
  useBackHandler();
  const { t } = useTranslation();

  // const { isUserVisitedApp, appLanguage } = useUserLoginStatus();

  const Stack = createNativeStackNavigator();

  const screens = {
    // ...(isUserVisitedApp
    //   ? {}
    //   : {
    //       [SCREENS.ONBOARDING]: {
    //         component: OnBoarding,
    //         options: { headerShown: false },
    //       },
    //     }),
    // ...(appLanguage
    //   ? {}
    //   : {
    //       [SCREENS.LANGUAGE]: {
    //         component: Language,
    //         options: { headerShown: false },
    //       },
    //     }),
    [SCREENS.ONBOARDING]: {
      component: OnBoarding,
      options: { headerShown: false },
    },
    [SCREENS.UserType]: {
      component: UserType,
      options: { headerShown: false },
    },
    [SCREENS.LOGIN]: {
      component: Login,
      options: { headerShown: false },
    },
    [SCREENS.SIGN_UP]: {
      component: SignUp,
      options: { headerShown: false },
    },
    [SCREENS.FORGOT_PASSWORD]: {
      component: ForgotPassword,
      options: { headerShown: false, headerTitle: t(COMMON_TEXT.FORGOT_PASSWORD) },
    },
    [SCREENS.RESET_PASSWORD]: {
      component: ResetPassword,
      options: { headerShown: false, headerTitle: t(COMMON_TEXT.RESET_PASSWORD) },
    },
    [SCREENS.VERIFICATION]: {
      component: Verification,
      options: { headerShown: false },
    },
    [SCREENS.MAPLOCATIONSCREEN]: {
      component: MapLocationScreen,
      options: { headerShown: false },
    },
    [SCREENS.CREATEPETPROFILE]: {
      component: PetProfileScreen,
      options: { headerShown: false },
    },
    [SCREENS.COMPLETEPETPROFILE]: {
      component: CompletePetProfile,
      options: { headerShown: false },
    },
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {Object.entries(screens).map(([name, { component, options }]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerBackButtonDisplayMode: 'minimal',
            ...options,
          }}
        />
      ))}
    </Stack.Navigator>
  );
};
