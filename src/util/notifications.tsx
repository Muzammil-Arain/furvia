import notifee, {
  AndroidImportance,
  EventType,
  Notification,
  NotificationAndroid,
  NotificationIOS,
  EventDetail,
  Event,
} from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ==== Types ====
interface DisplayNotificationProps {
  notificationData?: FirebaseMessagingTypes.RemoteMessage;
  iosSetting?: NotificationIOS;
  androidSetting?: NotificationAndroid;
  customButtons?: NotificationAndroid['actions'];
}

// ==== Notification Display ====
export async function displayNotification({
  notificationData,
  iosSetting,
  androidSetting,
  customButtons,
}: DisplayNotificationProps): Promise<void> {
  const notification = notificationData?.notification;

  try {
    await notifee.requestPermission({
      sound: true,
      announcement: true,
      alert: true,
    });

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: notification?.title || 'default',
      name: notification?.title || 'default',
      importance: AndroidImportance.HIGH,
      badge: true,
      sound: 'default',
      vibration: true,
    });

    // Display a notification
    await notifee.displayNotification({
      title: notification?.title || '',
      body: notification?.body || '',
      data: notification as unknown as Record<string, string>,
      ios: {
        sound: 'default',
        ...iosSetting,
      },
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        actions: customButtons,
        ...androidSetting,
      },
    });
  } catch (error) {
    console.log('Notifee error:', error);
  }
}

// ==== Handle Notification Tap ====
export const handleNotificationOpenedApp = (
  detail: Record<string, any> | undefined,
  isWait = 0,
): void => {
  const notificationData = detail;

  setTimeout(() => {
    switch (notificationData?.object) {
      case 'booking_created':
        // navigate(SCREENS.MYBOOKING, { from: 'Upcoming' });
        break;
      case 'booking_accepted':
        // navigate(SCREENS.MYBOOKING, { from: 'On_going' });
        break;
      case 'booking_cancelled':
        // navigate(SCREENS.MYBOOKING, { from: 'Cancelled' });
        break;
      default:
        console.log('Unknown object:', notificationData?.object);
        break;
    }
  }, isWait);
};

// ==== Foreground FCM Message ====
export const messageHandler = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> => {
  await displayNotification({ notificationData: remoteMessage });
};

// ==== Foreground Event ====
export const onForegroundEvent = () => {
  return notifee.onForegroundEvent(({ type, detail }: Event) => {
    if (type === EventType.PRESS) {
      handleNotificationOpenedApp(detail?.notification?.data);
    }
  });
};

// ==== Background Event ====
notifee.onBackgroundEvent(async ({ type, detail }: Event) => {
  if (type === EventType.PRESS) {
    handleNotificationOpenedApp(detail?.notification?.data);
  }
});

// ==== Request Permission ====
export async function requestNotificationPermission(): Promise<void> {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      // store.dispatch(setIsNotificationAllowed(true));
    }
  } else {
    const response = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (response === PermissionsAndroid.RESULTS.GRANTED) {
      // store.dispatch(setIsNotificationAllowed(true));
    }
  }
}

// ==== Get FCM Token ====
export const getFCMToken = async (): Promise<string> => {
  try {
    const token = await messaging().getToken();
    await AsyncStorage.setItem('token', JSON.stringify(token));
    return token;
  } catch (e) {
    console.log('getFCMToken error:', e);
    return '';
  }
};
