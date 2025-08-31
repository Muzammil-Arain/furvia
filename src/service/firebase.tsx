import { useEffect } from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {
  handleNotificationOpenedApp,
  messageHandler,
  onForegroundEvent,
  requestNotificationPermission,
} from '../util/notifications';

interface RemoteMessageData {
  custom?: string;
}

const useFirebaseMessaging = () => {
  useEffect(() => {
    requestNotificationPermission();

    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        if (remoteMessage) {
          messageHandler(remoteMessage);
        }
      },
    );

    // ✅ When app is opened from background
    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage) {
          let data: RemoteMessageData = {};
          const customPayload = remoteMessage.data?.custom;

          if (customPayload) {
            try {
              data = JSON.parse(customPayload) as RemoteMessageData;
            } catch (err) {
              console.warn('Invalid JSON in custom payload:', err);
            }
          }

          handleNotificationOpenedApp(data);
        }
      });

    // ✅ When app is opened from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          let data: RemoteMessageData = {};
          const customPayload = remoteMessage.data?.custom;

          if (customPayload) {
            try {
              data = JSON.parse(customPayload) as RemoteMessageData;
            } catch (err) {
              console.warn('Invalid JSON in custom payload:', err);
            }
          }

          handleNotificationOpenedApp(data, 5000);
        }
      });

    // ✅ Foreground event listener
    const unsubscribeForegroundEvent = onForegroundEvent();

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
      unsubscribeForegroundEvent();
    };
  }, []);

  return null;
};

export default useFirebaseMessaging;