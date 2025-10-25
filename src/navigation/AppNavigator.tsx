import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COMMON_TEXT, SCREENS } from 'constants/index';
import {
  Chat,
  Filter,
  Search,
  Reviews,
  AddReview,
  NotificationListing,
  Profile,
  Language,
  ContactUs,
  Cart,
  Settings,
  Help,
  Location,
  Home,
  AddCard,
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
import GromingService from 'screens/services/gromingservice';
import MyPetProfile from 'screens/petowner/PetProfile';
import PetProfileDetails from 'screens/petowner/EditPetprofile';
import MyBooking from 'screens/petowner/MyBooking';
import RescheduleBooking from 'screens/petowner/RescheduleBooking';
import ReferralProgram from 'screens/petowner/ReferralProgram';
import Wallet from 'screens/petowner/Wallet';
import TrainerDetails from 'screens/petowner/TrainerDetails';
import ServiceDetails from 'screens/services/ServiceDetails';
import BookService from 'screens/booking/BookService';
import CheckoutScreen from 'screens/booking/Checkout';
import PaymentMethodScreen from 'screens/booking/PaymentMethod';
import BookingComplete from 'screens/booking/BookingComplete';
import AddAddress from 'screens/petowner/AddAddress';
import ChangePassword from 'screens/user/ChangePassword';
import TermsAndConditions from 'screens/common/PrivacyPolicy/TermsAndConditions';
import HelpAndSupport from 'screens/common/PrivacyPolicy/HelpAndSupport';
import SubmitQuery from 'screens/common/PrivacyPolicy/SubmitQuery';
import TestimonialsScreen from 'screens/petowner/Testimonials';
import EditProfile from 'screens/user/EditProfile';
import Dashboard from 'screens/community/Dashboard';
import CreateEvent from 'screens/community/CreateEvent';
import StoryView from 'screens/community/ViewStory';
import GroupsScreen from 'screens/community/GroupsScreen';
import CommentScreen from 'screens/community/CommentsScreen';
import GroupChatScreen from 'screens/chat/GroupChatScreen';
import CreateGroupScreen from 'screens/community/CreateGroupScreen';
import AppointmentDetailsScreen from 'screens/provider/AppointmentDetailsScreen';
import AllAppointmentsScreen from 'screens/provider/AllAppointmentsScreen';
import ProfileDetailsScreen from 'screens/provider/ProfileDetailsScreen';
import ProfileScreen from 'screens/provider/ProfileScreen';
import WalletScreens from 'screens/provider/WalletScreens';
import ChatListScreen from '../screens/chat/ChatListScreen';
import UserChatScreen from 'screens/chat/UserChatScreen';
import NotificationScreen from 'screens/common/NoticiationList';
import JobInProgressScreen from 'screens/provider/JobInProgressScreen';
import JobCompletedScreen from 'screens/provider/JobCompletedScreen';
import NavigationScreen from 'screens/provider/NavigationScreen';
import SetupProfileScreen from 'screens/provider/SetupProfile/SetupProfileScreen';
import ParkInfoScreen from 'screens/community/ParkInfoScreen';
import ParksScreen from 'screens/community/Parks';

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
    [SCREENS.GromingService]: {
      component: GromingService,
      options: { headerShown: false },
    },
    [SCREENS.MyPetProfile]: {
      component: MyPetProfile,
      options: { headerShown: false },
    },
    [SCREENS.PetProfileDetails]: {
      component: PetProfileDetails,
      options: { headerShown: false },
    },
    [SCREENS.MyBooking]: {
      component: MyBooking,
      options: { headerShown: false },
    },
    [SCREENS.RescheduleBooking]: {
      component: RescheduleBooking,
      options: { headerShown: false },
    },
    [SCREENS.ReferralProgram]: {
      component: ReferralProgram,
      options: { headerShown: false },
    },
    [SCREENS.Wallet]: {
      component: Wallet,
      options: { headerShown: false },
    },
    [SCREENS.CreateGroupScreen]: {
      component: CreateGroupScreen,
      options: { headerShown: false },
    },
    [SCREENS.TrainerDetails]: {
      component: TrainerDetails,
      options: { headerShown: false },
    },
    [SCREENS.ServiceDetails]: {
      component: ServiceDetails,
      options: { headerShown: false },
    },
    [SCREENS.BookService]: {
      component: BookService,
      options: { headerShown: false },
    },
    [SCREENS.CheckoutScreen]: {
      component: CheckoutScreen,
      options: { headerShown: false },
    },
    [SCREENS.PaymentMethodScreen]: {
      component: PaymentMethodScreen,
      options: { headerShown: false },
    },
    [SCREENS.BookingComplete]: {
      component: BookingComplete,
      options: { headerShown: false },
    },
    [SCREENS.CHANGE_PASSWORD]: {
      component: ChangePassword,
      options: { headerShown: false },
    },
    [SCREENS.AddAddress]: {
      component: AddAddress,
      options: { headerShown: false },
    },
    [SCREENS.TermsAndConditions]: {
      component: TermsAndConditions,
      options: { headerShown: false },
    },
    [SCREENS.HelpAndSupport]: {
      component: HelpAndSupport,
      options: { headerShown: false },
    },
    [SCREENS.SubmitQuery]: {
      component: SubmitQuery,
      options: { headerShown: false },
    },
    [SCREENS.TestimonialsScreen]: {
      component: TestimonialsScreen,
      options: { headerShown: false },
    },
    [SCREENS.EDIT_PROFILE]: {
      component: EditProfile,
      options: { headerShown: false },
    },
    [SCREENS.Dashboard]: {
      component: Dashboard,
      options: { headerShown: false },
    },
    [SCREENS.CreateEvent]: {
      component: CreateEvent,
      options: { headerShown: false },
    },
    [SCREENS.StoryView]: {
      component: StoryView,
      options: { headerShown: false },
    },
    // [SCREENS.MESSAGES]: {
    //   component: GroupChatScreen,
    //   options: { headerShown: false },
    // },
    //extra
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
    [SCREENS.PRODUCT_DETAIL]: {
      component: ProductDetail,
      options: { headerShown: false },
    },
    [SCREENS.PROFILE]: {
      component: Profile,
      options: { headerShown: true, headerTitle: 'My Profile' },
    },

    [SCREENS.PRIVACY_POLICY]: {
      component: PrivacyPolicy,
      options: { headerShown: true, headerTitle: t(COMMON_TEXT.PRIVACY_POLICY) },
    },
    // [SCREENS.TERMS_AND_CONDITIONS]: {
    //   component: EditProfile,
    //   options: { headerShown: true, headerTitle: t(COMMON_TEXT.TERMS_AND_CONDITIONS) },
    // },
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

    [SCREENS.services]: {
      component: services,
      options: { headerShown: false },
    },
    [SCREENS.TrainersScreen]: {
      component: TrainersScreen,
      options: { headerShown: false },
    },
    [SCREENS.GroupsScreen]: {
      component: GroupsScreen,
      options: { headerShown: false },
    },
    [SCREENS.CommentsScreen]: {
      component: CommentScreen,
      options: { headerShown: false },
    },
    [SCREENS.JobInProgressScreen]: {
      component: JobInProgressScreen,
      options: { headerShown: false },
    },
     [SCREENS.ParkInfoScreen]: {
      component: ParkInfoScreen,
      options: { headerShown: false },
    },
      [SCREENS.ParksScreen]: {
      component: ParksScreen,
      options: { headerShown: false },
    },

    //PROVIDERS SCREENS
    [SCREENS.DashboardScreen]: {
      component: DashboardScreen,
      options: { headerShown: false },
    },
    [SCREENS.AppointmentDetailsScreen]: {
      component: AppointmentDetailsScreen,
      options: { headerShown: false },
    },
    [SCREENS.AllAppointmentsScreen]: {
      component: AllAppointmentsScreen,
      options: { headerShown: false },
    },
    [SCREENS.ProfileDetailsScreen]: {
      component: ProfileDetailsScreen,
      options: { headerShown: false },
    },
    [SCREENS.ProfileScreen]: {
      component: ProfileScreen,
      options: { headerShown: false },
    },
    [SCREENS.WalletScreens]: {
      component: WalletScreens,
      options: { headerShown: false },
    },
    [SCREENS.JobCompletedScreen]: {
      component: JobCompletedScreen,
      options: { headerShown: false },
    },
    [SCREENS.NavigationScreen]: {
      component: NavigationScreen,
      options: { headerShown: false },
    },
     [SCREENS.SetupProfileScreen]: {
      component: SetupProfileScreen,
      options: { headerShown: false },
    },

    //COMMON SCREENS
    [SCREENS.ChatListScreen]: {
      component: ChatListScreen,
      options: { headerShown: false },
    },
    [SCREENS.UserChatScreen]: {
      component: UserChatScreen,
      options: { headerShown: false },
    },
    [SCREENS.GroupChatScreen]: {
      component: GroupChatScreen,
      options: { headerShown: false },
    },
    [SCREENS.NotificationScreen]: {
      component: NotificationScreen,
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
