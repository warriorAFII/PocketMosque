import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { DataContextProvider } from "./src/context/DataContext";
import { useFonts } from "expo-font";
import PocketMosque from "./src/PocketMosque";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { registerForPushNotificationsAsync } from "./src/utils/useNotifications";
import * as Sentry from "sentry-expo";

if (process.env.EXPO_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: __DEV__ ? true : false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
    integrations: [
      new Sentry.Native.ReactNativeTracing({
        enableAppStartTracking: false,
      }),
    ],
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const [fontsLoaded] = useFonts({
    Righteous_400Regular: require("./src/assets/fonts/Righteous-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <DataContextProvider>
        <PocketMosque />
      </DataContextProvider>
    </SafeAreaProvider>
  );
}
