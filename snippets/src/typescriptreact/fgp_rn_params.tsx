// ${TM_FILENAME_BASE}.tsx

import { Stack, useLocalSearchParams } from "expo-router";
import React, { StyleSheet, Text, View } from "react-native";

export default function ${1:${TM_FILENAME_BASE}}Params() {
  const { ${2:id} } = useLocalSearchParams();
  // const params = useLocalSearchParams<{ ${2:id}: string }>();

  return (
    <View style={styles.container}>
       <Stack.Screen name="${3:${1:${TM_FILENAME_BASE}}}/[${2:id}]" options={{ title: "${1:${TM_FILENAME_BASE}} " + ${2:id} }} />

       <Text> ${1:${TM_FILENAME_BASE}} {${2:id}}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
