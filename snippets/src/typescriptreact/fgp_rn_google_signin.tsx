// ${1:${TM_FILENAME_BASE}}.tsx
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";

// ⚙️ Google Sign-In configuration
GoogleSignin.configure({
  webClientId: "${2:xxx.apps.googleusercontent.com}",
  iosClientId: "${3:xxx.apps.googleusercontent.com}",
  offlineAccess: true,
});

export default function ${1:${TM_FILENAME_BASE}}() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [logText, setLogText] = useState<string>("🪵 Logs will appear here");

  // 🔹 Append logs to on-screen log box
  const appendLog = (label: string, data: any) => {
    const json = JSON.stringify(data, Object.getOwnPropertyNames(data), 2);
    setLogText((prev) => `\${prev}\n\n\${label}:\n\${json}`);
  };

  // Check for an existing session
  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await GoogleSignin.getCurrentUser();
      if (currentUser) {
        setUserInfo(currentUser);
        appendLog("Current user", currentUser);
      }
    };
    checkUser();
  }, []);

  // 🔹 Sign in
  const signIn = async () => {
    try {
      setLoading(true);
      setLogText("⏳ Signing in...");

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      appendLog("Full response", response);

      if (isSuccessResponse(response)) {
        setUserInfo(response.data);
        appendLog("Sign-in successful", response.data);
      } else {
        appendLog("Sign-in canceled", response);
      }
    } catch (error: any) {
      appendLog("Sign-in error", error);

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            appendLog("SIGN_IN_CANCELLED", error);
            break;
          case statusCodes.IN_PROGRESS:
            appendLog("IN_PROGRESS", error);
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            appendLog("PLAY_SERVICES_NOT_AVAILABLE", error);
            break;
          default:
            appendLog("Unknown error", error);
        }
      } else {
        appendLog("General error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Get profile of the current signed-in user
  const getProfile = async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      if (currentUser) {
        setUserInfo(currentUser);
        appendLog("Profile fetched", currentUser);
      } else {
        appendLog("No active session", {});
      }
    } catch (error) {
      appendLog("Error fetching profile", error);
    }
  };

  // 🔹 Sign out
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      appendLog("Signed out successfully", { ok: true });
    } catch (error) {
      appendLog("Error signing out", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        {userInfo ? (
          <>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Welcome, {userInfo.user.name}</Text>
            {userInfo.user.photo && (
              <Image
                source={{ uri: userInfo.user.photo }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  marginBottom: 10,
                }}
              />
            )}
            <Text>{userInfo.user.email}</Text>

            <View style={{ marginTop: 10, gap: 10 }}>
              <Button title="Get Profile" onPress={getProfile} />
              <Button title="Sign Out" onPress={signOut} />
            </View>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Sign in with Google</Text>
            <Button title={loading ? "Loading..." : "Sign In"} onPress={signIn} />
          </>
        )}
      </View>

      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>🪵 Logs:</Text>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
          padding: 10,
        }}
      >
        <Text selectable style={{ fontFamily: "monospace", fontSize: 12 }}>
          {logText}
        </Text>
      </ScrollView>
    </View>
  );
}
