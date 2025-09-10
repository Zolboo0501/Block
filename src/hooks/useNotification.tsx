/* eslint-disable react-hooks/exhaustive-deps */
import { keys } from '@storage';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useMMKVBoolean } from 'react-native-mmkv';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';

const useNotification = () => {
  const [__, setIsNewNotify] = useMMKVBoolean(keys.isNewNotify);
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      notifee.requestPermission();
    }

    const unsubscribeMessage = messaging().onMessage(handleForegroundMessage);
    const unsubscribeNotifeeEvent =
      notifee.onForegroundEvent(handleNotifeeEvent);
    const unsubscribeNotificationTap = messaging().onNotificationOpenedApp(
      handleNotificationPress,
    );

    notifee.onBackgroundEvent(handleNotifeeBackgroundEvent);
    messaging().setBackgroundMessageHandler(handleBackgroundMessage);

    return () => {
      unsubscribeMessage();
      unsubscribeNotifeeEvent();
      unsubscribeNotificationTap();
    };
  }, []);

  // user Press background event
  const handleNotificationPress = (remoteMessage: any) => {
    console.log('User tapped the notification (background)', remoteMessage);
  };

  // User foreground Action event
  const handleNotifeeEvent = ({ type, detail }: any) => {
    console.log(type, 'type');
    console.log(detail, 'detail');
    if (type === EventType.PRESS) {
      navigation.navigate('Зээл', { contractId: '4Uvb62at7ZPBdoEf_6laC' });
    }
  };

  const handleNotifeeBackgroundEvent = async ({ type }: any) => {
    console.log('Background event:', type);
    if (type === EventType.DISMISSED) {
      console.log('Notification dismissed');
    } else if (type === EventType.ACTION_PRESS) {
      console.log('Notification pressed');
    }
  };

  const handleBackgroundMessage = async (remoteMessage: any) => {
    setIsNewNotify(true);
    console.log('Message handled in the background:', remoteMessage);
  };

  const handleForegroundMessage = async (message: any) => {
    setIsNewNotify(true);
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      vibration: true,
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      title: message?.notification?.title,
      body: message?.notification?.body,
      android: {
        channelId,
        largeIcon: 'ic_notification_icon',
        smallIcon: 'ic_notification_icon',
        circularLargeIcon: true,
        pressAction: { id: 'default' },
      },
      ios: {
        sound: 'default',
        critical: true,
      },
    });
  };
};

export default useNotification;
