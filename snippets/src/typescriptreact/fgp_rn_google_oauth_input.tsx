import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const DEFAULT_CLIENT_ID = "${1:xxx.apps.googleusercontent.com}";

export default function GoogleAuthTest() {
  const [logs, setLogs] = useState<string[]>([]);
  const [clientId, setClientId] = useState(DEFAULT_CLIENT_ID);
  const [configured, setConfigured] = useState(false);

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

  const configureGoogle = () => {
    if (!clientId.trim()) {
      addLog("❌ webClientId requerido");
      return;
    }

    GoogleSignin.configure({
      webClientId: clientId.trim(),
    });

    setConfigured(true);
    addLog({ webClientId: clientId });
    addLog("⚙️ Google configured");
  };

  useEffect(() => {
    configureGoogle();
  }, []);

  const signIn = async () => {
    if (!configured) {
      addLog("⚠️ Configura primero el webClientId");
      return;
    }

    try {
      addLog("⏳ Signing in...");
      await GoogleSignin.hasPlayServices();

      const res = await GoogleSignin.signIn();
      addLog(res);

      addLog("✅ Sign in completed");
    } catch (err: any) {
      const parsedError = {
        message: err?.message,
        code: err?.code,
      };

      addLog("❌ Error");
      addLog(parsedError);
    }
  };

  const signOut = async () => {
    try {
      addLog("⏳ Signing out...");
      await GoogleSignin.signOut();
      addLog("✅ Signed out");
    } catch (err) {
      addLog(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter webClientId"
        placeholderTextColor="#64748b"
        value={clientId}
        onChangeText={(text) => {
          setClientId(text);
          setConfigured(false);
        }}
        style={styles.input}
        multiline
      />

      <Button title="Configure Google" onPress={configureGoogle} />

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
  input: {
    backgroundColor: "#020617",
    color: "#e2e8f0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttons: {
    gap: 12,
    alignItems: "center",
    marginTop: 10,
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
