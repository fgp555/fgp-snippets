// ${TM_FILENAME_BASE}.tsx

import { Slot, usePathname } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const pathname = usePathname();
  console.log("pathname:", pathname);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <Redirect href="/user" /> */}
      <StatusBar />
      <Slot />
    </GestureHandlerRootView>
  );
}
