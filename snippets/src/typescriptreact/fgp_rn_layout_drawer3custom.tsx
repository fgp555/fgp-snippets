import { FontAwesome6 } from "@expo/vector-icons";
import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import Constants from "expo-constants";
import { usePathname, useRouter } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={CustomDrawer}
      screenOptions={({ navigation }) => ({
        drawerPosition: "left",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15 }}>
            <FontAwesome6 name="bars" size={24} color="#b00" />
          </TouchableOpacity>
        ),
        headerTintColor: "#b00",
        headerTitleAlign: "center",
        // headerStyle: { backgroundColor: "#b008" },
      })}
    ></Drawer>
  );
}

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const router = useRouter() as any;
  const pathname = usePathname();

  const isAdmin = true;
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.fgp.app";
  const backendDomain = "api.fgp.com";
  const androidVersion = Constants.expoConfig?.version;
  const imgLogo = "https://i.postimg.cc/FRn26Vhg/fgp-team-logo.png";

  const handleLogout = () => {
    console.log("handleLogout");
    router.push("/");
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* <Image source={require("@/src/assets/images/logo-business.png")} style={styles.img} /> */}
          <Image source={{ uri: imgLogo }} style={styles.img} />
        </View>
        {isAdmin && (
          <>
            <TouchableOpacity
              onPress={() => router.push("/user/list")}
              style={[styles.buttonContainer, pathname === "/user/list" && styles.activeButton]}
            >
              <View style={styles.button}>
                <FontAwesome6
                  name="users"
                  size={16}
                  color={pathname === "/user/list" ? "#fff" : "#333"}
                  style={styles.icon}
                />
                <Text style={[styles.buttonText, pathname === "/user/list" && styles.activeButtonText]}>Usuarios</Text>
              </View>
              <FontAwesome6
                name="chevron-right"
                size={16}
                color={pathname === "/user/list" ? "#fff" : "#333"}
                style={styles.icon}
              />
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          style={[styles.buttonContainer, pathname === "/profile" && styles.activeButton]}
        >
          <View style={styles.button}>
            <FontAwesome6 name="user" size={16} color={pathname === "/profile" ? "#fff" : "#333"} style={styles.icon} />
            <Text style={[styles.buttonText, pathname === "/profile" && styles.activeButtonText]}>Mi Perfil</Text>
          </View>
          <FontAwesome6
            name="chevron-right"
            size={16}
            color={pathname === "/profile" ? "#fff" : "#333"}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
          <FontAwesome6 name="right-from-bracket" size={16} style={styles.icon} color={"#b00"} />
          <Text style={[styles.buttonText, styles.logoutButtonText]}>Cerrar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/about")}
          style={[styles.buttonContainer, pathname === "/about" && styles.activeButton]}
        >
          <View style={styles.button}>
            <FontAwesome6
              name="circle-info"
              size={16}
              color={pathname === "/about" ? "#fff" : "#333"}
              style={styles.icon}
            />
            <Text style={[styles.buttonText, pathname === "/about" && styles.activeButtonText]}>Acerca de</Text>
          </View>
          <FontAwesome6
            name="chevron-right"
            size={16}
            color={pathname === "/about" ? "#fff" : "#333"}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(playStoreUrl)} style={[styles.buttonContainer]}>
          <View style={styles.button}>
            <FontAwesome6 name="google-play" size={16} color={"#333"} style={styles.icon} />
            <Text style={[styles.buttonText]}>Actualizar</Text>
          </View>
          <FontAwesome6 name="up-right-from-square" size={16} color={"#333"} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`https://${backendDomain}`)} style={[styles.buttonContainer]}>
          <View style={styles.button}>
            <FontAwesome6 name="globe" size={16} color={"#333"} style={styles.icon} />
            <Text style={[styles.buttonText]}>{backendDomain}</Text>
          </View>
          <FontAwesome6 name="up-right-from-square" size={16} color={"#333"} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer]}>
          <View style={styles.button}>
            <FontAwesome6 name="download" size={16} color={"#777"} style={styles.icon} />
            <Text
              style={[
                styles.buttonText,
                {
                  color: "#777",
                },
              ]}
            >
              build {androidVersion}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  img: {
    width: 281,
    height: 72,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    marginVertical: 5,
    paddingVertical: 3,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: "#b00",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  activeButtonText: {
    color: "#fff",
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  logoutButton: {},
  logoutButtonText: {
    color: "#b00",
    textAlign: "center",
  },
  profileContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  profileButton: {
    backgroundColor: "#2196f3",
  },
  profileButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
