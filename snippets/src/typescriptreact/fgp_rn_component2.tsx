
//  ${1:${TM_FILENAME_BASE}}.tsx

import { StatusBar } from "expo-status-bar";
import React, { StyleSheet, Text, View } from "react-native";

export default function  ${1:${TM_FILENAME_BASE}}() {
  return (
    <View style={styles.container}>
      <Text> ${1:${TM_FILENAME_BASE}}</Text>
      <Text>Hello world!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
