// ${TM_FILENAME_BASE}.tsx

import FontAwesome6 from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function ${1:Tabs}Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "teal" }}
      // controla qué pasa cuando el usuario presiona el botón de "atrás" en Android
      backBehavior="order">
      <Tabs.Screen
        name="index"
        options={{
          title: "Home Title",
          tabBarLabel: "Home Tab Bar",
          tabBarIcon: ({ color, size }) => <FontAwesome6 size={size} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          // href: null,
          headerShown: false,
          popToTopOnBlur: true,
          tabBarIcon: ({ color, size }) => <FontAwesome6 size={size} name="shopping-basket" color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          tabBarBadge: 1,
          tabBarBadgeStyle: { backgroundColor: "red", color: "white" },
          tabBarIcon: ({ color, size }) => <FontAwesome6 size={size} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
