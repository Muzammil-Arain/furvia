import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COMMON_TEXT, SCREENS } from 'constants/index';
import {
  Chat,
  Filter,
  Messages,
  Search,
  Reviews,
  AddReview,
  NotificationListing,
  Profile,
  EditProfile,
  Language,
  ContactUs,
  Cart,
  Settings,
  Help,
  Location,
  Home,
  ChangePassword,
  AddCard,
  Wallet,
  ProductDetail,
  Checkout,
} from 'screens/user';
import { BottomNavigator } from './BottomNavigator';
import { useBackHandler, useTranslation } from 'hooks/index';
import { screenOptions } from '.';
import { PrivacyPolicy } from 'screens/common';
import DashboardScreen from 'screens/provider/DashboardScreen';
import services from 'screens/petowner/services';
import TrainersScreen from 'screens/petowner/Trainer';

export const AppNavigator = () => {
  useBackHandler();
  const Stack = createNativeStackNavigator();
  const { t } = useTranslation();

  const screens = {
    [SCREENS.BOTTOM_STACK]: {
      component: BottomNavigator,
      options: { headerShown: false },
    },
    [SCREENS.HOME]: {
      component: Home,
      options: { headerShown: false },
    },
    [SCREENS.NOTIFICATION_LISTING]: {
      component: NotificationListing,
      options: { headerShown: false },
    },

    [SCREENS.ADD_REVIEW]: {
      component: AddReview,
      options: { headerShown: true, headerTitle: 'Add Review' },
    },
    [SCREENS.LOCATION]: {
      component: Location,
      options: { headerShown: false },
    },
    [SCREENS.CHAT]: {
      component: Chat,
      options: { headerShown: false },
    },
    [SCREENS.ADD_CARD]: {
      component: AddCard,
      options: { headerShown: true, headerTitle: 'Payment Details' },
    },
    [SCREENS.WALLET]: {
      component: Wallet,
      options: { headerShown: true, headerTitle: 'My Wallet' },
    },
    [SCREENS.PRODUCT_DETAIL]: {
      component: ProductDetail,
      options: { headerShown: false },
    },
    [SCREENS.PROFILE]: {
      component: Profile,
      options: { headerShown: true, headerTitle: 'My Profile' },
    },
    [SCREENS.EDIT_PROFILE]: {
      component: EditProfile,
      options: { headerShown: true, headerTitle: t(COMMON_TEXT.EDIT_PROFILE) },
    },
    [SCREENS.PRIVACY_POLICY]: {
      component: PrivacyPolicy,
      options: { headerShown: true, headerTitle: t(COMMON_TEXT.PRIVACY_POLICY) },
    },
    [SCREENS.TERMS_AND_CONDITIONS]: {
      component: EditProfile,
      options: { headerShown: true, headerTitle: t(COMMON_TEXT.TERMS_AND_CONDITIONS) },
    },
    [SCREENS.CHANGE_PASSWORD]: {
      component: ChangePassword,
      options: { headerShown: true, headerTitle: t(COMMON_TEXT.CHANGE_PASSWORD) },
    },
    [SCREENS.SEARCH]: {
      component: Search,
      options: { headerShown: false },
    },
    [SCREENS.NOTIFICATIONS]: {
      component: NotificationListing,
      options: { headerShown: true, headerTitle: t(COMMON_TEXT.NOTIFICATIONS) },
    },
    [SCREENS.FILTER]: {
      component: Filter,
      options: { headerShown: true, headerTitle: t(COMMON_TEXT.FILTERS) },
    },
    [SCREENS.MESSAGES]: {
      component: Messages,
      options: { headerShown: false },
    },
    [SCREENS.SETTINGS]: {
      component: Settings,
      options: { headerShown: true, headerTitle: t(COMMON_TEXT.SETTINGS) },
    },
    [SCREENS.LANGUAGE]: {
      component: Language,
      options: { headerShown: true, headerTitle: t(COMMON_TEXT.LANGUAGE) },
    },
    [SCREENS.HELP]: {
      component: Help,
      options: { headerShown: false },
    },
    [SCREENS.CONTACT_US]: {
      component: ContactUs,
      options: { headerShown: true, headerTitle: t(COMMON_TEXT.CONTACT_US) },
    },
    [SCREENS.REVIEWS]: {
      component: Reviews,
      options: { headerShown: false },
    },
    [SCREENS.CART]: {
      component: Cart,
      options: { headerShown: true, headerTitle: 'Cart' },
    },
    [SCREENS.CHECKOUT]: {
      component: Checkout,
      options: { headerShown: true, headerTitle: 'Checkout' },
    },
    [SCREENS.DashboardScreen]: {
      component: DashboardScreen,
      options: { headerShown: false },
    },
    [SCREENS.services]: {
      component: services,
      options: { headerShown: false },
    },
    [SCREENS.TrainersScreen]: {
      component: TrainersScreen,
      options: { headerShown: false },
    },
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {Object.entries(screens).map(
        ([name, { component, options }]: [string, { component: any; options: any }]) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={{
              headerBackButtonDisplayMode: 'minimal',
              ...options,
            }}
          />
        ),
      )}
    </Stack.Navigator>
  );
};
