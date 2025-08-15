// hooks/usePushNotifications.ts

import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

if (!(globalThis as any)._hasSetNotificationHandler) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError("Permission not granted to get push token for push notification!");
      return;
    }
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

function redirect(notification: Notifications.Notification) {
  const url: any = notification.request.content.data?.url;
  if (url) {
    router.push(url);
  }
}

type PushData = Record<string, any>;

export function usePushNotifications(
  endpointUrl: string | null = null,
  data: PushData = {},
  authToken: string | null = null // token para Authorization Bearer
) {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    let handledNotificationId: string | null = null;

    // Si la app se abrió por una notificación (estado quit → foreground)
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response?.notification && response.notification.request.identifier !== handledNotificationId) {
        handledNotificationId = response.notification.request.identifier;
        redirect(response.notification);
      }
    });

    // Escuchar interacciones en vivo (background → foreground o foreground)
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      if (response.notification.request.identifier !== handledNotificationId) {
        handledNotificationId = response.notification.request.identifier;
        redirect(response.notification);
      }
    });

    // Si quieres escuchar cuando llega una notificación mientras la app está abierta
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      // Aquí podrías mostrar algo en UI, guardar estado, etc.
    });

    return () => {
      responseListener.remove();
      notificationListener.remove();
    };
  }, []);

  // Enviar token + data al endpoint cada vez que cambie el token o el objeto data
  useEffect(() => {
    if (expoPushToken && endpointUrl) {
      const payload = { ...data, token: expoPushToken };
      fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify(payload),
      }).catch(console.error);
    }
  }, [expoPushToken, endpointUrl, data, authToken]);

  return expoPushToken;
}

/* 

// opción 1: sin parámetros
  usePushNotifications();

// opción 2: con endpoint y datos
  const endpointUrl = "http://192.168.18.21:3000/save-token";
  const data = { email: "user123@gmail.com" }; 
  usePushNotifications(endpointUrl, data);

// opción 3: con endpoint, datos y token de backend
  const endpointUrl = "http://192.168.18.21:3000/save-token";
  const data = { email: "user123@gmail.com", name: "John Doe" }; 
  const backendToken = "TU_TOKEN_DEL_BACKEND";
  usePushNotifications(endpointUrl, data, backendToken);



# Notificaciones de la Expo (code example)
https://docs.expo.dev/push-notifications/push-notifications-setup/
https://docs.expo.dev/versions/latest/sdk/notifications/
*/
