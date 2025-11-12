import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IMAGES, SCREENS } from 'constants/index';
import { COLORS } from 'utils/colors';
import { View, StyleSheet, Image } from 'react-native';
import { FontSize, FontWeight } from 'types/fontTypes';
import { isIOS, screenHeight } from 'utils/index';
import { Home } from 'screens/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Services from 'screens/petowner/services';
import MyPetProfile from 'screens/petowner/PetProfile';
import MyBooking from 'screens/petowner/MyBooking';
import MenuScreen from 'screens/petowner/Menu';

//PROVIERS SCREENS
import DashboardScreen from 'screens/provider/DashboardScreen';
import ProfileScreen from 'screens/provider/ProfileScreen';
import AllAppointmentsScreen from 'screens/provider/AllAppointmentsScreen';
import WalletScreens from 'screens/provider/WalletScreens';
import { useAppSelector } from 'types/reduxTypes';
import { useContext } from 'react';
import { ThemeContext } from 'theme/ThemeContext';
import FloatingWotNot from 'components/common/FloatingWotNot';
import { navigate } from '.';

const screens = {
  [SCREENS.HOME]: Home,
  [SCREENS.services]: Services,
  [SCREENS.MyPetProfile]: MyPetProfile,
  [SCREENS.MyBooking]: MyBooking,
  [SCREENS.MENU]: MenuScreen,
};

const ProviderScreens = {
  [SCREENS.DashboardScreen]: DashboardScreen,
  [SCREENS.AllAppointmentsScreen]: AllAppointmentsScreen,
  [SCREENS.WalletScreens]: WalletScreens,
  [SCREENS.ProfileScreen]: ProfileScreen,
};

const getIconConfig = (routeName: string) => {
  switch (routeName) {
    case SCREENS.HOME:
      return IMAGES.homeIcon;
    case SCREENS.services:
      return IMAGES.GroupIcon;
    case SCREENS.MyPetProfile:
      return IMAGES.petIcon;
    case SCREENS.MyBooking:
      return IMAGES.calanderIcon;
    case SCREENS.PROFILE:
      return IMAGES.menuIcon;
    case SCREENS.MENU:
      return IMAGES.menuIcon;

    //PROVIDER SCREENS
    case SCREENS.ProfileScreen:
      return IMAGES.profileIcon;
    case SCREENS.AllAppointmentsScreen:
      return IMAGES.BookingIcon;
    case SCREENS.WalletScreens:
      return IMAGES.WalletIcon;
    default:
      return IMAGES.homeIcon;
  }
};

export const BottomNavigator = () => {
  const insets = useSafeAreaInsets();
  const Bottom = createBottomTabNavigator();
  const role = useAppSelector(state => state.app.userRole);
  const isProvider = role == 'provider';

  const { theme } = useContext(ThemeContext);

  const renderedPages = isProvider ? Object.entries(ProviderScreens) : Object.entries(screens);

  return (
    <>
      <Bottom.Navigator
        screenOptions={({ route }) => {
          const icon = getIconConfig(route.name);
          return {
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme?.colors?.background,
              height: screenHeight(isIOS() ? 10 : 10) + insets.bottom,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              paddingTop: 18,
            },
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  styles.iconContainer,
                  {
                    padding: 18,
                    borderRadius: 12,
                    backgroundColor: focused ? '#E9FEFF' : theme?.colors?.background,
                    elevation: 5,
                    shadowColor: focused ? '#ccc' : theme?.colors?.background,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                  },
                ]}
              >
                <Image
                  source={icon}
                  style={[styles.iconImage, { tintColor: focused ? '#008081' : COLORS.BORDER }]}
                  resizeMode='contain'
                />
              </View>
            ),
            tabBarLabel: ({ focused }) => focused && <></>,
            tabBarHideOnKeyboard: true,
          };
        }}
      >
        {renderedPages.map(([screenName, component]) => (
          <Bottom.Screen key={screenName} name={screenName} component={component} />
        ))}
      </Bottom.Navigator>
      <FloatingWotNot onPress={() => navigate(SCREENS.DASHBOARD)} />
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
  },
  iconImage: {
    height: 25,
    width: 25,
  },
  indicator: {
    height: 4,
    width: 15,
    marginTop: 5,
    borderRadius: 10,
  },
  label: {
    color: COLORS.WHITE,
    fontSize: FontSize.ExtraSmall,
    fontWeight: FontWeight.SemiBold,
  },
});
