import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

GoogleSignin.configure({
  webClientId: "${1:xxx.apps.googleusercontent.com}",
});

export default function GoogleAuthTest() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: any) => {
    let formatted;

    if (msg instanceof Error) {
      formatted = `${msg.name}: ${msg.message}`;
    } else if (typeof msg === "string") {
      formatted = msg;
    } else {
      formatted = JSON.stringify(msg, null, 2);
    }

    setLogs((prev) => [formatted, ...prev]);
  };

  const signIn = async () => {
    try {
      addLog("⏳ Signing in...");
      await GoogleSignin.hasPlayServices();

      const res = await GoogleSignin.signIn();
      addLog(res);
      console.log(res);

      addLog("✅ Sign in completed");
    } catch (err) {
      console.log(err);
      addLog("❌ General error");
      addLog(err);
    }
  };

  const signOut = async () => {
    try {
      addLog("⏳ Signing out...");
      await GoogleSignin.signOut();
      addLog("✅ Signed out");
    } catch (err) {
      addLog({ error: err });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />

        <Button title="Logout" onPress={signOut} />
      </View>

      <ScrollView style={styles.logsContainer}>
        {logs.map((l, i) => (
          <Text key={i} selectable style={styles.logText}>
            {l}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  buttons: {
    gap: 12,
    alignItems: "center",
  },
  googleButton: {
    width: 250,
    height: 48,
  },
  logsContainer: {
    marginTop: 20,
    backgroundColor: "#020617",
    borderRadius: 10,
    padding: 10,
  },
  logText: {
    fontSize: 12,
    color: "#e2e8f0",
    marginBottom: 10,
    fontFamily: "monospace",
  },
});
