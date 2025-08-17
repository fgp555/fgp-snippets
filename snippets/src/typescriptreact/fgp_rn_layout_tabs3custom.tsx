// ${TM_FILENAME_BASE}.tsx

import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs, useNavigation, usePathname, useRouter } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabsCustomLayout() {
  const navigation = useNavigation();
  const router = useRouter() as any;
  const pathname = usePathname(); // Obtiene la ruta actual

  const isAdmin = true;
  // const showTabs = true;
  const showTabs = !pathname.startsWith("/user/");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Users",
    });
  }, [navigation]);

  return (
    <>
      <Tabs screenOptions={{ tabBarStyle: { display: "none" }, headerShown: false }} />
      {showTabs && (
        <View style={styles.customTabBar}>
          <CustomTabButton
            title="Buscar"
            icon="magnifying-glass"
            onPress={() => router.push("/user")}
            iconColor={pathname === "/user" ? "#b00" : "#64748b"}
          />
          {isAdmin && (
            <>
              <CustomTabButton
                title="Web"
                icon="globe"
                // onPress={() => router.push("/order/create")}
                onPress={() => Linking.openURL(`http://example.com`)}
              />
              <CustomTabButton
                title="Profile"
                icon="user"
                iconColor={pathname === "/user/profile" ? "#b00" : "#64748b"}
                onPress={() => router.push("/user/profile")}
                // onPress={() => Linking.openURL(`http://example.com`)}
              />
            </>
          )}
        </View>
      )}
    </>
  );
}

const CustomTabButton = ({ title, icon, onPress, iconColor = "#64748b" }: any) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesome6 name={icon} size={24} color={iconColor} />
      <Text style={{ ...styles.text, color: iconColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: "#e0e0e0",
    borderTopWidth: 1,
    backgroundColor: "#ffffff",
    gap: 10,
  },
  button: {
    alignItems: "center",
    paddingVertical: 5,
    flex: 1,
  },
  text: {
    color: "#64748b",
    fontSize: 12,
  },
});
