// ${TM_FILENAME_BASE}.tsx

import { Stack } from "expo-router";

export default function $1Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />

      <Stack.Screen
        name="products/[id]"
        // options={({ route }) => ({ title: "products " + (route.params as { id: string })?.id })}
        options={{ animation: "fade_from_bottom" }}
      />

      <Stack.Screen name="products/[category]/[productId]" options={{ title: "Product Details" }} />
    </Stack>
  );
}
