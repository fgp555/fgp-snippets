// ${TM_FILENAME_BASE}.tsx

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const  ${1:${TM_FILENAME_BASE}}Params = () => {
  const { ${2:id} } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text> ${1:${TM_FILENAME_BASE}} {${2:id}}</Text>
    </View>
  );
};

export default  ${1:${TM_FILENAME_BASE}}Params;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
