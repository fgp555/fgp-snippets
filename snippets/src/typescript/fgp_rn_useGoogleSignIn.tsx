// useGoogleSignIn.ts
import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
    User,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

GoogleSignin.configure({
  webClientId: "${1:xxx.apps.googleusercontent.com}",
  iosClientId: "${2:xxx.apps.googleusercontent.com}",
  offlineAccess: true,
});

export function useGoogleSignIn() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string>("🪵 Logs will appear here");

  const appendLog = (label: string, data: any) => {
    const json = JSON.stringify(data, Object.getOwnPropertyNames(data), 2);
    setLogs((prev) => `${prev}\n\n${label}:\n${json}`);
  };

  // ✅ Check for existing session
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await GoogleSignin.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        appendLog("Current user", currentUser);
      }
    };
    loadUser();
  }, []);

  // ✅ Sign in
  const signIn = async () => {
    try {
      setLoading(true);
      setLogs("⏳ Signing in...");

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();

      appendLog("Full response", response);

      if (isSuccessResponse(response)) {
        setUser(response.data);
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

  // ✅ Get profile of the current user
  const getProfile = async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        appendLog("Profile fetched", currentUser);
      } else {
        appendLog("No active session", {});
      }
    } catch (error) {
      appendLog("Error fetching profile", error);
    }
  };

  // ✅ Sign out
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
      appendLog("Signed out successfully", { ok: true });
    } catch (error) {
      appendLog("Error signing out", error);
    }
  };

  return {
    user,
    loading,
    logs,
    signIn,
    getProfile,
    signOut,
  };
}


/* 

// components/OAuthGoogleSignIn.tsx
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import React from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";
import { useGoogleSignIn } from "../hooks/useGoogleSignIn";

export default function OAuthGoogleSignIn() {
  const { user, loading, logs, signIn, signOut, getProfile } = useGoogleSignIn();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        {user ? (
          <>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Welcome, {user.user.name}</Text>

            {user.user.photo && (
              <Image
                source={{ uri: user.user.photo }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  marginBottom: 10,
                }}
              />
            )}

            <Text style={{ marginBottom: 20 }}>{user.user.email}</Text>

            <View style={{ width: "60%", gap: 10 }}>
              <Button title="Get Profile" onPress={getProfile} />
              <Button title="Sign Out" onPress={signOut} color="#DB4437" />
            </View>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Sign in with Google</Text>

            <GoogleSigninButton
              style={{ width: 220, height: 55 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
              disabled={loading}
            />
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
          {logs}
        </Text>
      </ScrollView>
    </View>
  );
}


*/